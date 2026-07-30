/* ============================================================
   TechForge India — storage layer
   Everything here uses localStorage so the site works fully
   offline / when hosted as static files, with no backend.
   Swap these functions for real API calls when you're ready
   to connect a backend — the rest of the site won't need to change.
   ============================================================ */

const LS_KEYS = {
  PRODUCTS: 'tf_products_override',
  CART: 'tf_cart',
  WISHLIST: 'tf_wishlist',
  ORDERS: 'tf_orders',
  LEADS: 'tf_leads',
  ANALYTICS: 'tf_analytics',
  REVIEWS: 'tf_reviews',
  ADMIN_SESSION: 'tf_admin_session',
};

function lsGet(key, fallback){
  try{ const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch(e){ return fallback; }
}
function lsSet(key, value){
  try{ localStorage.setItem(key, JSON.stringify(value)); }catch(e){}
}

/* ---------- Products (defaults + admin overrides merged) ---------- */
function getProducts(){
  const overrides = lsGet(LS_KEYS.PRODUCTS, null);
  if(!overrides) return DEFAULT_PRODUCTS.slice();
  // overrides is a full array saved by admin edits
  return overrides;
}
function saveProducts(products){ lsSet(LS_KEYS.PRODUCTS, products); }
function getProductById(id){ return getProducts().find(p=>p.id===id); }
function resetProductsToDefault(){ localStorage.removeItem(LS_KEYS.PRODUCTS); }

/* ---------- Cart ---------- */
function getCart(){ return lsGet(LS_KEYS.CART, []); }
function saveCart(cart){ lsSet(LS_KEYS.CART, cart); updateCartBadge(); }
function cartCount(cart){ return (cart||getCart()).reduce((a,c)=>a+c.qty,0); }
function cartSubtotal(cart){ return (cart||getCart()).reduce((s,i)=>s+i.price*i.qty,0); }

function addToCart(id, qty=1){
  const p = getProductById(id);
  if(!p) return;
  if(p.stock < 1){ showToast('Out of stock', 'error'); return; }
  const cart = getCart();
  const ex = cart.find(i=>i.id===id);
  if(ex){
    if(ex.qty >= p.stock){ showToast('Max available stock reached', 'error'); return; }
    ex.qty += qty;
  } else {
    cart.push({ id:p.id, title:p.title, price:p.price, img:p.img, qty });
  }
  saveCart(cart);
  showToast('Added to cart');
  logEvent('add_to_cart', { item_id:id, item_name:p.title, value:p.price*qty });
}
function updateCartQty(id, delta){
  const p = getProductById(id);
  let cart = getCart().map(i=>{
    if(i.id!==id) return i;
    let n = i.qty + delta;
    if(n < 1) return null;
    if(p && n > p.stock) n = p.stock;
    return { ...i, qty:n };
  }).filter(Boolean);
  saveCart(cart);
  return cart;
}
function removeFromCart(id){
  const cart = getCart().filter(i=>i.id!==id);
  saveCart(cart);
  return cart;
}
function clearCart(){ saveCart([]); }

function updateCartBadge(){
  document.querySelectorAll('[data-cart-count]').forEach(el=>{
    const n = cartCount();
    el.textContent = n;
    el.classList.toggle('hidden', n===0);
  });
}

/* ---------- Coupons ---------- */
const COUPONS = {
  'TECH10': { type:'percent', value:10, label:'10% off' },
  'WELCOME500': { type:'flat', value:500, label:'₹500 off' },
};
function applyCoupon(code, subtotal){
  const c = COUPONS[(code||'').trim().toUpperCase()];
  if(!c) return { valid:false, discount:0 };
  const discount = c.type==='percent' ? Math.round(subtotal * c.value/100) : c.value;
  return { valid:true, discount:Math.min(discount, subtotal), label:c.label, code:code.trim().toUpperCase() };
}

/* ---------- Wishlist ---------- */
function getWishlist(){ return lsGet(LS_KEYS.WISHLIST, []); }
function toggleWishlist(id){
  let list = getWishlist();
  if(list.includes(id)) list = list.filter(x=>x!==id);
  else { list.push(id); logEvent('add_to_wishlist',{item_id:id}); }
  lsSet(LS_KEYS.WISHLIST, list);
  return list;
}
function isWishlisted(id){ return getWishlist().includes(id); }

/* ---------- Orders ---------- */
function placeOrderRecord(order){
  const orders = lsGet(LS_KEYS.ORDERS, []);
  orders.unshift(order);
  lsSet(LS_KEYS.ORDERS, orders);
}
function getOrders(){ return lsGet(LS_KEYS.ORDERS, []); }
function getOrderById(id){ return getOrders().find(o=>o.id===id); }

/* ---------- Leads (newsletter) ---------- */
function saveLead(email){
  const leads = lsGet(LS_KEYS.LEADS, []);
  leads.push({ email, ts:Date.now() });
  lsSet(LS_KEYS.LEADS, leads);
  logEvent('newsletter_signup', { email });
}
function getLeads(){ return lsGet(LS_KEYS.LEADS, []); }

/* ---------- Reviews ---------- */
function getReviews(productId){
  const all = lsGet(LS_KEYS.REVIEWS, {});
  return all[productId] || [];
}
function addReview(productId, review){
  const all = lsGet(LS_KEYS.REVIEWS, {});
  if(!all[productId]) all[productId] = [];
  all[productId].unshift(review);
  lsSet(LS_KEYS.REVIEWS, all);
  logEvent('review_submitted', { item_id:productId, rating:review.rating });
}

/* ---------- Analytics (simulates a GA4/GTM dataLayer + local event log) ---------- */
function logEvent(eventName, params){
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event:eventName, ...params });
  const log = lsGet(LS_KEYS.ANALYTICS, []);
  log.push({ type:eventName, ts:Date.now(), path:location.pathname, ...params });
  if(log.length > 1000) log.splice(0, log.length-1000);
  lsSet(LS_KEYS.ANALYTICS, log);
}
function getAnalytics(){ return lsGet(LS_KEYS.ANALYTICS, []); }
function clearAnalytics(){ localStorage.removeItem(LS_KEYS.ANALYTICS); }

/* ---------- Admin session ---------- */
function isAdminAuthed(){ return sessionStorage.getItem(LS_KEYS.ADMIN_SESSION) === '1'; }
function setAdminAuthed(v){ v ? sessionStorage.setItem(LS_KEYS.ADMIN_SESSION,'1') : sessionStorage.removeItem(LS_KEYS.ADMIN_SESSION); }

/* ---------- Utilities ---------- */
function fmtINR(n){ return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n); }
function qs(name){ return new URLSearchParams(location.search).get(name); }
function starString(rating){
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5-full);
}
function timeAgo(ts){
  const s = Math.floor((Date.now()-ts)/1000);
  if(s<60) return 'just now';
  if(s<3600) return Math.floor(s/60)+'m ago';
  if(s<86400) return Math.floor(s/3600)+'h ago';
  return Math.floor(s/86400)+'d ago';
}

function showToast(msg, type='success'){
  let toast = document.getElementById('toast');
  if(!toast){
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'glass-modal hidden';
    toast.innerHTML = '<span id="toastIcon"></span><span id="toastMsg"></span>';
    document.body.appendChild(toast);
  }
  document.getElementById('toastIcon').textContent = type==='error' ? '⚠️' : '✅';
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>toast.classList.add('hidden'), 2800);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  logEvent('page_view', { title: document.title });
});
