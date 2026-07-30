/* ============================================================
   TechForge India — seed data
   In a real store this would come from a database / API.
   For this learning project it is the "source of truth";
   admin edits are layered on top of it in localStorage
   (see storage.js -> getProducts()).
   ============================================================ */

const DEFAULT_PRODUCTS = [
  { id:"TF-01", title:"Intel Core i9-14900K Processor", category:"Components", brand:"Intel", price:54999, mrp:64999, stock:15, rating:4.8, reviews:128, badge:"Bestseller",
    img:"https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80",
    desc:"24 Cores (8P+16E), 32 Threads, up to 6.0 GHz. The ultimate gaming and creator CPU with unlocked overclocking headroom and support for DDR5 memory.",
    specs:["24 Cores / 32 Threads","Up to 6.0 GHz Turbo","LGA1700 Socket","125W Base TDP","Supports DDR5-5600"] },
  { id:"TF-02", title:"NVIDIA GeForce RTX 4090 24GB", category:"Components", brand:"NVIDIA", price:185000, mrp:210000, stock:4, rating:4.9, reviews:96, badge:"Low Stock",
    img:"https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80",
    desc:"Ada Lovelace Architecture, DLSS 3 Frame Generation, 24GB G6X memory. The fastest consumer GPU for 4K gaming and AI workloads.",
    specs:["24GB GDDR6X","DLSS 3 + Frame Generation","16384 CUDA Cores","450W TGP","3x DisplayPort 1.4a"] },
  { id:"TF-03", title:"Razer Blade 16 Gaming Laptop", category:"Laptops", brand:"Razer", price:299990, mrp:329990, stock:8, rating:4.7, reviews:54, badge:"New",
    img:"https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80",
    desc:"Intel i9-13950HX, RTX 4080, 32GB RAM, 1TB SSD, dual-mode Mini LED display that switches between 4K/120Hz and FHD/240Hz.",
    specs:["Intel Core i9-13950HX","NVIDIA RTX 4080 12GB","32GB DDR5 RAM","1TB NVMe SSD","16in Mini LED Dual Mode"] },
  { id:"TF-04", title:"LG Odyssey G9 49\" OLED Monitor", category:"Monitors", brand:"LG", price:125000, mrp:139000, stock:6, rating:4.9, reviews:41, badge:"Bestseller",
    img:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
    desc:"Dual QHD, 240Hz, 0.03ms response time, immersive 800R curve. A single monitor that replaces a two-screen setup.",
    specs:["49in Curved OLED","5120x1440 Dual QHD","240Hz / 0.03ms","800R Curvature","2x HDMI 2.1 + DP 1.4"] },
  { id:"TF-05", title:"Corsair Vengeance 32GB DDR5 RAM", category:"Components", brand:"Corsair", price:12999, mrp:15999, stock:40, rating:4.6, reviews:212, badge:"",
    img:"https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80",
    desc:"6000MHz, low-latency DDR5 kit with RGB lighting, ideal for high-refresh gaming and content-creation builds.",
    specs:["2x16GB Kit (32GB)","6000MHz CL36","Intel XMP 3.0","RGB Lighting","Lifetime Warranty"] },
  { id:"TF-06", title:"ASUS ROG Strix 15 Laptop", category:"Laptops", brand:"ASUS", price:159990, mrp:179990, stock:12, rating:4.5, reviews:88, badge:"Sale",
    img:"https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
    desc:"Ryzen 9 processor, RTX 4060 graphics, 165Hz display and a per-key RGB keyboard for serious gaming on a budget.",
    specs:["AMD Ryzen 9 7940HX","NVIDIA RTX 4060 8GB","16GB DDR5 RAM","1TB NVMe SSD","15.6in 165Hz FHD"] },
  { id:"TF-07", title:"Logitech G Pro Wireless Mouse", category:"Accessories", brand:"Logitech", price:9999, mrp:11999, stock:60, rating:4.8, reviews:340, badge:"",
    img:"https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80",
    desc:"Ultra-lightweight esports-grade wireless mouse trusted by professional gamers worldwide.",
    specs:["63g Ultra-Light","HERO 25K Sensor","70hr Battery Life","LIGHTSPEED Wireless","Ambidextrous Shape"] },
  { id:"TF-08", title:"Samsung Odyssey G7 27\" QHD Monitor", category:"Monitors", brand:"Samsung", price:42999, mrp:49999, stock:20, rating:4.6, reviews:76, badge:"",
    img:"https://images.unsplash.com/photo-1616763355603-9755a640a287?auto=format&fit=crop&w=600&q=80",
    desc:"240Hz QHD curved monitor built for competitive gaming with 1ms response time and G-Sync compatibility.",
    specs:["27in QHD Curved 1000R","240Hz / 1ms","G-Sync Compatible","HDR600","Height Adjustable Stand"] },
  { id:"TF-09", title:"AMD Ryzen 9 7950X3D Processor", category:"Components", brand:"AMD", price:59999, mrp:67999, stock:18, rating:4.8, reviews:65, badge:"New",
    img:"https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80",
    desc:"16 Cores with 3D V-Cache technology for class-leading gaming performance and heavy multitasking.",
    specs:["16 Cores / 32 Threads","3D V-Cache","Up to 5.7 GHz Boost","AM5 Socket","120W TDP"] },
  { id:"TF-10", title:"Dell XPS 15 Creator Laptop", category:"Laptops", brand:"Dell", price:189990, mrp:209990, stock:10, rating:4.6, reviews:47, badge:"",
    img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    desc:"4K OLED touch display, Intel i7, RTX 4060 — built for video editors, designers and creators.",
    specs:["Intel Core i7-13700H","RTX 4060 8GB","32GB RAM / 1TB SSD","15.6in 4K OLED Touch","97Wh Battery"] },
  { id:"TF-11", title:"HyperX Cloud III Gaming Headset", category:"Accessories", brand:"HyperX", price:7999, mrp:9499, stock:45, rating:4.5, reviews:190, badge:"Sale",
    img:"https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=600&q=80",
    desc:"DTS Headphone:X spatial audio, memory foam ear cushions, and a detachable noise-cancelling mic.",
    specs:["53mm Drivers","DTS Headphone:X","Detachable Mic","Multi-platform (PC/PS/Xbox)","120g Lightweight"] },
  { id:"TF-12", title:"Seagate FireCuda 2TB NVMe SSD", category:"Components", brand:"Seagate", price:15999, mrp:18999, stock:30, rating:4.7, reviews:150, badge:"",
    img:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80",
    desc:"Gen4 NVMe SSD with read speeds up to 7300MB/s — ideal for large game libraries and 4K video editing.",
    specs:["2TB Capacity","PCIe Gen4 x4","7300MB/s Read","RGB Heatsink Model","5-Year Warranty"] },
];

const BLOG_POSTS = [
  {
    slug:"best-gpu-under-50000-india-2026",
    title:"Best Graphics Cards Under ₹50,000 in India (2026 Guide)",
    excerpt:"Building a 1440p gaming rig on a budget? Here are the GPUs worth your money right now, and the ones to skip.",
    cover:"https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80",
    date:"2026-06-14", author:"TechForge Editorial", category:"Buying Guides", readTime:"6 min read",
    metaDescription:"Compare the best graphics cards under ₹50,000 in India for 1080p and 1440p gaming, with benchmarks, pricing and buying tips.",
    keywords:"best gpu under 50000, graphics card india, budget gaming gpu",
    body:[
      {h:"Why budget GPUs matter more in 2026"},
      {p:"With component prices fluctuating month to month, picking the right graphics card under ₹50,000 comes down to matching resolution, refresh rate and ray-tracing needs rather than chasing the highest benchmark number."},
      {h:"Our top picks"},
      {ul:["A 12GB card if you plan to game at 1440p for the next 3+ years","Prioritise driver support and VRAM over raw clock speed","Check PSU wattage requirements before buying — many budget builds under-provision power"]},
      {h:"Our recommendation"},
      {p:"For most shoppers browsing our Components category, a 12GB mid-range card paired with a Ryzen 5 or Core i5 gives the best price-to-performance ratio in this bracket."},
    ]
  },
  {
    slug:"gaming-laptop-vs-desktop-2026",
    title:"Gaming Laptop vs Desktop PC: Which Should You Buy in 2026?",
    excerpt:"Portability, upgradability, thermals and total cost of ownership — we break down the real trade-offs.",
    cover:"https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80",
    date:"2026-05-28", author:"TechForge Editorial", category:"Buying Guides", readTime:"5 min read",
    metaDescription:"Deciding between a gaming laptop and a desktop PC? Compare cost, performance, upgradability and portability before you buy.",
    keywords:"gaming laptop vs desktop, buy gaming pc india, laptop or desktop for gaming",
    body:[
      {h:"Total cost of ownership"},
      {p:"A desktop generally delivers more performance per rupee because you are not paying for battery, chassis miniaturisation or a built-in display. But a laptop bundles everything you need into one purchase."},
      {h:"Upgradability"},
      {p:"Desktops let you swap a GPU or add storage years later. Laptops are largely fixed at purchase, so buy slightly ahead of your needs if you choose one."},
      {h:"Our verdict"},
      {ul:["Choose a desktop if you want maximum performance per rupee and don't need to move it","Choose a laptop if you study, travel, or LAN with friends regularly","Either way, buy the best display you can afford — it's the hardest part to upgrade later"]},
    ]
  },
  {
    slug:"how-to-build-first-gaming-pc",
    title:"How to Build Your First Gaming PC: A Beginner's Checklist",
    excerpt:"From choosing a CPU-GPU pairing to cable management — a step-by-step checklist for first-time builders.",
    cover:"https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80",
    date:"2026-04-09", author:"TechForge Editorial", category:"Guides", readTime:"8 min read",
    metaDescription:"A step-by-step beginner's guide to building your first gaming PC in India, covering parts selection, assembly and troubleshooting.",
    keywords:"how to build a gaming pc, first pc build guide, pc building checklist india",
    body:[
      {h:"1. Pick your CPU and GPU first"},
      {p:"Everything else — motherboard, RAM speed, PSU wattage — is chosen around your processor and graphics card, so lock these in before anything else."},
      {h:"2. Don't skimp on the power supply"},
      {p:"A reputable 80+ Bronze or Gold PSU from a known brand is cheap insurance against damaged components."},
      {h:"3. Plan your airflow"},
      {ul:["Front intake, rear/top exhaust is the safest default layout","Leave at least one open fan slot for future upgrades","Route cables behind the motherboard tray for better airflow"]},
    ]
  },
];
