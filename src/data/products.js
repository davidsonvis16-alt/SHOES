// ───────────────────────────────────────────────────────────────
//  PRODUCTS — every second-hand pair is one size, one listing.
//  Prices and notes below are SAMPLES: replace them with the client's real pairs.
//  Photos live in /public/images/products/. List them in `images`, first one is the cover.
//  The current photos are freely licensed stand-ins (see /credits). Swap in photos of the
//  actual pairs as soon as you have them; that matters more than anything else on the site.
//  condition: 10 = deadstock, 9 = like new, 8 = excellent, 7 = good, 6 = fair
//  Set sold: true to keep a pair visible with a Sold label.
// ───────────────────────────────────────────────────────────────
const img = (...names) => names.map((n) => `/images/products/${n}.jpg`);

export const CATEGORIES = [
  { name: 'Sneakers', slug: 'sneakers' },
  { name: 'Running', slug: 'running' },
  { name: 'Boots', slug: 'boots' },
  { name: 'Slides', slug: 'slides' },
  { name: 'Skate', slug: 'skate' },
  { name: 'Lifestyle', slug: 'lifestyle' },
];

export const PRODUCTS = [
  { id: 'aj1-bloodline', brand: 'Jordan', name: 'Air Jordan 1 Retro High OG', nick: 'Bloodline', colorway: 'Black / White / Gym Red', category: 'Sneakers', size: 43, condition: 9, price: 7200, featured: true, images: img('aj1-bloodline-1'), note: 'Worn twice. No creasing on the toe box, red laces included.' },
  { id: 'samba-og-white', brand: 'adidas', name: 'adidas Samba OG', colorway: 'Cloud White / Core Black / Gum', category: 'Lifestyle', size: 41, condition: 9, price: 5800, featured: true, images: img('samba-og-white-1'), note: 'Clean leather, gum sole barely marked.' },
  { id: 'dunk-low-red-grey', brand: 'Nike', name: 'Nike Dunk Low Retro', colorway: 'Gym Red / Wolf Grey / White', category: 'Sneakers', size: 40, condition: 9, price: 5500, featured: true, images: img('dunk-low-red-grey-1') },
  { id: 'aj4-seafoam', brand: 'Jordan', name: 'Air Jordan 4 Retro', nick: 'Seafoam', colorway: 'White / Oil Green / Black', category: 'Sneakers', size: 39, condition: 10, price: 8500, images: img('aj4-seafoam-1'), note: 'Unworn, with the original box.' },
  { id: 'aj4-white-cement', brand: 'Jordan', name: 'Air Jordan 4 Retro', nick: 'White Cement', colorway: 'White / Cement Grey / Black', category: 'Sneakers', size: 44, condition: 8, price: 7500, images: img('aj4-white-cement-1'), note: 'Light creasing, paint on the midsole is intact.' },
  { id: 'af1-white', brand: 'Nike', name: 'Nike Air Force 1 ’07', colorway: 'Triple White', category: 'Sneakers', size: 42, condition: 8, price: 4500, images: img('af1-white-1') },
  { id: 'dunk-grey-fog', brand: 'Nike', name: 'Nike Dunk Low', nick: 'Grey Fog', colorway: 'White / Grey Fog', category: 'Sneakers', size: 38, condition: 10, price: 6200, images: img('dunk-grey-fog-1'), note: 'Still in the paper.' },
  { id: 'nb550-burgundy', brand: 'New Balance', name: 'New Balance 550', colorway: 'White / Burgundy', category: 'Sneakers', size: 43, condition: 8, price: 5200, images: img('nb550-burgundy-1') },
  { id: 'nb1906r-silver', brand: 'New Balance', name: 'New Balance 1906R', colorway: 'Silver Metallic / White', category: 'Running', size: 42, condition: 9, price: 6800, images: img('nb1906r-silver-1') },
  { id: 'nb2002r', brand: 'New Balance', name: 'New Balance 2002R', colorway: 'Mushroom / Taupe', category: 'Lifestyle', size: 41, condition: 8, price: 5900, images: img('nb2002r-1') },
  { id: 'pegasus-38', brand: 'Nike', name: 'Nike Air Zoom Pegasus 38', colorway: 'White / Black / Pink', category: 'Running', size: 43, condition: 9, price: 3800, images: img('pegasus-38-1') },
  { id: 'ultraboost-4', brand: 'adidas', name: 'adidas Ultraboost 4.0', colorway: 'Core Black', category: 'Running', size: 44, condition: 7, price: 3500, images: img('ultraboost-4-1'), note: 'Plenty of boost left. Some dust on the knit, washes out.' },
  { id: 'timberland-6in', brand: 'Timberland', name: 'Timberland 6-Inch Premium Boot', colorway: 'Wheat Nubuck', category: 'Boots', size: 43, condition: 8, price: 6500, images: img('timberland-6in-1') },
  { id: 'yeezy-slide-azure', brand: 'adidas', name: 'adidas Yeezy Slide', colorway: 'Azure', category: 'Slides', size: 42, condition: 9, price: 3200, images: img('yeezy-slide-azure-1', 'yeezy-slide-azure-2') },
  { id: 'vans-sk8-hi', brand: 'Vans', name: 'Vans Sk8-Hi', colorway: 'Brown / True White', category: 'Skate', size: 42, condition: 7, price: 2500, images: img('vans-sk8-hi-1'), note: 'Broken in properly. Suede is soft, soles have grip.' },
  { id: 'chuck-70', brand: 'Converse', name: 'Converse Chuck 70 Hi', colorway: 'Black / Egret', category: 'Lifestyle', size: 42, condition: 8, price: 3000, images: img('chuck-70-1') },
  { id: 'samba-black', brand: 'adidas', name: 'adidas Samba Classic', colorway: 'Black / White', category: 'Lifestyle', size: 42, condition: 6, price: 2400, images: img('samba-black-1'), note: 'Well worn, priced for it. Leather has character.' },
  { id: 'af1-worn', brand: 'Nike', name: 'Nike Air Force 1 Low', colorway: 'White', category: 'Sneakers', size: 44, condition: 6, price: 2200, images: img('af1-worn-1'), note: 'Daily beaters. Creased, cleaned, ready to go again.' },
  { id: 'aj1-low-navy', brand: 'Jordan', name: 'Air Jordan 1 Low', colorway: 'Sail / Navy', category: 'Sneakers', size: 42, condition: 9, price: 5200, sold: true, images: img('aj1-low-navy-1') },
];

export const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))];
export const SIZES = [...new Set(PRODUCTS.map((p) => p.size))].sort((a, b) => a - b);

export const conditionLabel = (c) =>
  c >= 10 ? 'Deadstock' : c >= 9 ? 'Like new' : c >= 8 ? 'Excellent' : c >= 7 ? 'Good' : 'Fair';

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
