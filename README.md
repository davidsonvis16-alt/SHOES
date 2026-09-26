# Maison Kiatu — website

Multi-page React (JSX) shop for a pre-owned sneaker store in Nairobi. Built with Vite and React Router, phone-first.

> **Everything shop-specific is placeholder.** The name "Maison Kiatu", the phone number (+254 700 000 000), email
> (`hello@maisonkiatu.example`), address, hours and M-Pesa till are all made up. Edit `src/data/store.js` before going live.

## Run it

```bash
npm install
npm run dev        # open the URL it prints (also works on your phone on the same Wi-Fi)
npm run build      # production files go to /dist
npm run preview    # test the production build
```

## Pages

| Route | Page |
|---|---|
| `/` | Home: cover pair, the rack, shoe-care film, category index, story, how to order, size request, visit (map) |
| `/shop` | All pairs, with search, category, brand, size, sort and hide-sold filters. `/shop?cat=running` works too |
| `/product/:id` | Product page: photos, size, condition, notes, add to bag, ask on WhatsApp, payment logos, related pairs |
| `/gallery` | Every photo in a masonry grid with a lightbox (arrow keys / Esc) |
| `/bag` | Bag: pick-up or delivery, name, note, **Order on WhatsApp** |
| `/how-to-order` | Steps, condition grades (`#grades`), payment, FAQ |
| `/about`, `/contact` | Story and values; contact list and WhatsApp message form |
| `/credits` | Photo, video and logo credits (required by the CC BY-SA licences) |

## Design

Warm paper (`--paper`), ink and a single cocoa accent. Bodoni Moda for headlines, Archivo for everything else.
Tokens are at the top of `src/styles.css`.

## Edit the content

- **Shop details** (name, phone, email, Instagram, address, hours, M-Pesa till, payment options): `src/data/store.js`
- **Products** (name, size, condition, price, notes, photos, sold): `src/data/products.js`
  - Prices and notes are **samples**. Mark a pair as sold with `sold: true`.

## Photos, video and logos

The current images are freely licensed stand-ins from Wikimedia Commons, credited on `/credits`
(data in `src/data/credits.js`). **Replace them with photos of the shop's actual pairs**: for a second-hand shop,
real photos of the exact pair are what make it trustworthy. When you replace a file, remove its line from `credits.js`.

```
public/images/products/<id>-1.jpg, <id>-2.jpg …   listed in each product's `images`
public/images/story.jpg, about.jpg                  Home story and About photos
public/images/logos/mpesa.svg visa.svg mastercard.svg
public/video/care.mp4, care-poster.jpg              muted loop on Home, About and Gallery
```

## Ordering flow

This site takes no payments. Customers add pairs to the bag and tap **Order on WhatsApp**, which opens WhatsApp with
the pairs, sizes, total, pick-up or delivery choice and their name filled in. The shop confirms, then the customer pays
by M-Pesa, or card or cash in store.

## Deploy

- **Netlify:** drag the `dist` folder in, or connect the repo. `public/_redirects` is already set up.
- **Vercel:** import the project. `vercel.json` is already set up.
