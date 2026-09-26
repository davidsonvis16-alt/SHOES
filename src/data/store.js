// ───────────────────────────────────────────────────────────────
//  STORE DETAILS — edit here and the whole site updates.
//  Everything below is PLACEHOLDER: a made-up shop name, number, email and address.
//  Swap in the real details before the site goes live.
// ───────────────────────────────────────────────────────────────
export const STORE = {
  name: 'Maison Kiatu',
  wordmark: 'MAISON KIATU',
  wordmarkSup: 'NBO',
  tagline: 'Pre-owned sneakers, chosen one pair at a time.',
  phoneDisplay: '+254 700 000 000',
  phoneIntl: '254700000000', // used for WhatsApp + tel: links
  email: 'hello@maisonkiatu.example',
  instagram: 'maisonkiatu',
  instagramUrl: 'https://www.instagram.com/',
  street: 'Unit 4, The Yard, Argwings Kodhek Rd',
  area: 'Kilimani, Nairobi',
  address: 'Unit 4, The Yard, Argwings Kodhek Rd, Kilimani, Nairobi',
  mapsQuery: 'Kilimani, Nairobi, Kenya', // change to the exact shop pin/name for a precise map
  hours: 'Mon–Sat 10:00–19:00 · Sun 12:00–17:00',
  hoursShort: 'Open daily',
  // M-Pesa Till / Paybill — leave empty until the client gives you the number.
  mpesaTill: '000 000',
};

export const PAYMENTS = [
  { name: 'M-Pesa', logo: '/images/logos/mpesa.svg', note: 'Till number after we confirm your pair' },
  { name: 'Visa', logo: '/images/logos/visa.svg', note: 'Card, in store' },
  { name: 'Mastercard', logo: '/images/logos/mastercard.svg', note: 'Card, in store' },
];

export const telLink = `tel:+${STORE.phoneIntl}`;
export const mailLink = `mailto:${STORE.email}`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE.mapsQuery)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(STORE.mapsQuery)}&output=embed`;

export const waLink = (text = `Hi ${STORE.name}!`) =>
  `https://wa.me/${STORE.phoneIntl}?text=${encodeURIComponent(text)}`;

export const formatKES = (n) => `KES ${Number(n).toLocaleString('en-KE')}`;
