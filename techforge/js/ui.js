/* ============================================================
   TechForge India — shared UI behaviours (header, cart drawer)
   Included on every page after storage.js
   ============================================================ */

function toggleMobileMenu(){
  const m = document.getElementById('mobileMenu');
  if(m) m.classList.toggle('open');
}

function doSiteSearch(inputEl){
  const val = (inputEl.value||'').trim();
  location.href = 'store.html' + (val ? ('?q=' + encodeURIComponent(val)) : '');
}

/* ---------- Cart Drawer ---------- */
function ensureCartDrawer(){
  if(document.getElementById('cartOverlay')) return;
  const div = document.createElement('div');
  div.innerHTML = `
  <div id="cartOverlay" class="cart-overlay hidden">
    <div class="cart-backdrop" onclick="toggleCartDrawer(false)"></div>
    <div class="cart-drawer glass-modal">
      <div class="cart-drawer-head">
        <h2 class="font-black text-lg">🛒 Your Cart</h2>
        <button class="neu-btn" onclick="toggleCartDrawer(false)" aria-label="Close cart">✕</button>
      </div>
      <div class="cart-drawer-body" id="cartDrawerItems"></div>
      <div class="cart-drawer-foot">
        <div class="summary-row"><span>Subtotal</span><span id="cartDrawerTotal">₹0</span></div>
        <a href="cart.html" class="neu-btn primary block mt-4">View Cart & Checkout</a>
      </div>
    </div>
  </div>`;
  document.body.appendChild(div.firstElementChild);
}

function toggleCartDrawer(open){
  ensureCartDrawer();
  const overlay = document.getElementById('cartOverlay');
  overlay.classList.toggle('hidden', !open);
  if(open) renderCartDrawer();
}

function renderCartDrawer(){
  const cart = getCart();
  const wrap = document.getElementById('cartDrawerItems');
  document.getElementById('cartDrawerTotal').textContent = fmtINR(cartSubtotal(cart));
  if(cart.length===0){
    wrap.innerHTML = '<div class="empty-state">Your cart is empty.</div>';
    return;
  }
  wrap.innerHTML = cart.map(c => `
    <div class="cart-line">
      <img src="${c.img}" alt="${c.title}">
      <div style="flex:1">
        <div class="font-bold text-sm line-clamp-2">${c.title}</div>
        <div class="p-price" style="font-size:1rem">${fmtINR(c.price)}</div>
        <div class="qty-stepper neu-in" style="width:max-content;padding:0">
          <button onclick="updateCartQty('${c.id}',-1);renderCartDrawer()">−</button>
          <span class="font-black" style="padding:0 .5rem">${c.qty}</span>
          <button onclick="updateCartQty('${c.id}',1);renderCartDrawer()">+</button>
        </div>
      </div>
    </div>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  ensureCartDrawer();
  updateCartBadge();
});
