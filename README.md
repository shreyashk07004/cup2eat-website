# CUP2EAT: Demo Website

A one-page website for CUP2EAT edible cups, built with plain HTML, CSS and JavaScript. It has no build step: double-click `index.html` to open it.

```
cup2eat-website/
├── index.html          the page
├── 404.html            "Someone ate this page" error page
├── privacy.html        short privacy note
├── css/styles.css      all styling (design tokens from DESIGN.md at the top)
├── js/content.js       ← EDIT THIS: prices, phone, products, reviews, FAQ…
├── js/main.js          behaviour (menu, slider, form → WhatsApp). No need to edit.
└── assets/
    ├── logo.svg, favicon.svg, apple-touch-icon.png, og-image.png
    ├── icons/          custom SVG icons (cup, chai, cone, bean, cardamom, truck, seal, leaf, bite)
    └── images/         placeholder images, all named *-REPLACE.svg
```

---

## 1. Editing text, prices and contact details

Open **`js/content.js`** in any text editor (Notepad works). Everything that changes often is in that file:

| What | Where in `content.js` |
|---|---|
| Phone / WhatsApp number | `contact.phoneDisplay` (what people see) and `contact.phoneIntl` (`91` + 10 digits, used in links) |
| Instagram link | `contact.instagram` |
| FSSAI number | `contact.fssaiNumber` |
| Catalogue PDF link | `contact.catalogueLink` |
| Default WhatsApp message | `whatsappDefault` |
| Flavour cards | `products` |
| Pricing cards | `pricing`. Write `price` as a plain number (`3999`, without ₹ or commas). The price per cup is worked out for you. |
| Journey / event photos | `journey` |
| Customer reviews | `reviews`. Delete `sample: true` once a review is real, and the "Sample review" label disappears. |
| FAQ | `faq` |

Keep the quotes `"…"` and commas, then save the file and refresh the browser.

### Clean demo mode vs. placeholder mode
The first setting in `content.js` controls how unfinished content appears:

| `showPlaceholders` | What visitors see |
|---|---|
| `false` (default) | A **clean, presentable site**. Sample reviews are replaced by an "View feedback on Instagram" card. Unanswered FAQs, the FSSAI number line and the catalogue link are hidden. The Sample Box shows "Price on request". Journey cards and the founder portrait show emblems instead of grey photo boxes. |
| `true` | Every `[[PLACEHOLDER]]` / `[[CONFIRM]]` item appears in a dashed gold box, so the owner can see exactly what is missing. |

Everything reappears automatically once real content is entered. For example, once you add a real review (and remove `sample: true`), the slider comes back.

Fixed text such as the headings, hero text, comparison table and founder story lives in `index.html`. Search for the words you want to change. Every spot that needs owner input has a `<!-- REPLACE: … -->` comment.

## 2. Replacing placeholder images

Each placeholder image has `data-placeholder="true"` and a `<!-- REPLACE -->` comment. Save the real photo as **WebP** (or JPG), then either:
- give it the same name and update the path in `content.js` / `index.html`, or
- point the path at your new filename.

| File | What photo should go there | Size |
|---|---|---|
| Hero illustration (inline SVG in `index.html`, marked REPLACE) | Three cups on a wooden plank: chocolate with latte, vanilla with chai, elaichi with ice cream. Warm light, steam. Save as `assets/images/hero-cups.webp`, ≤ 200 KB, then replace the `<svg class="hero__cups">` block with `<img src="assets/images/hero-cups.webp" width="1120" height="940" alt="…" class="hero__cups">` (no `loading="lazy"`) | 1120×940 |
| `images/cup-chocolate-REPLACE.svg` | Chocolate cup, ideally on a transparent background | 480×480 |
| `images/cup-vanilla-REPLACE.svg` | Vanilla cup | 480×480 |
| `images/cup-elaichi-REPLACE.svg` | Elaichi cup | 480×480 |
| `images/cup-choco-coated-REPLACE.svg` | Chocolate-coated cup with ice cream | 480×480 |
| `images/journey-lsr-stall-REPLACE.svg` | Stall at the Lady Shri Ram College fest | 800×600 |
| `images/journey-event-stall-REPLACE.svg` | Event stall with the FSSAI banner | 800×600 |
| `images/journey-startup-mahakumbh-REPLACE.svg` | Varun at Startup Mahakumbh 2025, Bharat Mandapam | 800×600 |
| `images/journey-spectra-award-REPLACE.svg` | SPECTRA 2025 1st-position certificate | 800×600 |
| `images/journey-iitf-REPLACE.svg` | IITF visit, Pragati Maidan | 800×600 |
| `images/journey-dispatch-REPLACE.svg` | Packed boxes ready to ship | 800×600 |
| `images/founder-varun-khera-REPLACE.svg` | Square portrait of Varun Khera | 600×600 |
| `assets/logo.svg` | The original logo file, if available (the current one is a recreation) | — |
| `assets/og-image.png` | Social share preview. Regenerate it once you have real photos. | 1200×630 |

## 3. Deploying for free on Netlify (drag and drop)

1. Go to **https://app.netlify.com/drop** and log in (free).
2. Drag the whole **`cup2eat-website`** folder onto the page.
3. Netlify gives you a link like `https://something.netlify.app`. The site is live.
4. Optional: in *Site settings → Domain*, rename it or connect your own domain.
5. Once you have the final URL, open `index.html` and replace `[[PLACEHOLDER: website URL]]` in `og:url`. Also change `assets/og-image.png` in the `og:image` and `twitter:image` tags to the full address (e.g. `https://yourdomain.in/assets/og-image.png`) so WhatsApp and Instagram show the preview.

To update the site later, drag the folder onto *Deploys* again.
GitHub Pages and Vercel also work, since the site is just static files. Netlify serves `404.html` automatically.

## 4. How ordering works

The site has no checkout and no payment.
- Every "Order", "Enquire" and pricing button opens WhatsApp with a ready-made message.
- The bulk enquiry form checks the fields (it needs a 10-digit Indian mobile number), then opens WhatsApp with all the answers filled in. **Nothing is stored or sent anywhere else.**

---

## 5. Owner checklist: every `[[PLACEHOLDER]]` / `[[CONFIRM]]` item

| # | Item | Where |
|---|---|---|
| 1 | FSSAI registration number | `content.js` → `contact.fssaiNumber` |
| 2 | Sample Box price | `content.js` → `pricing[0].price` |
| 3 | Sample Box contents | `content.js` → `pricing[0].features[0]` |
| 4 | Catalogue PDF link | `content.js` → `contact.catalogueLink` |
| 5 | Google Maps link (optional, currently not shown) | `content.js` → `contact.mapLink` |
| 6 | Website URL for social previews | `index.html` → `og:url` |
| 7 | FAQ: how long the cup stays crisp with hot drinks | `content.js` → `faq[0]` |
| 8 | FAQ: vegetarian / egg status | `content.js` → `faq[1]` |
| 9 | FAQ: shelf life and storage | `content.js` → `faq[2]` |
| 10 | FAQ: delivery time | `content.js` → `faq[5]` |
| 11 | FAQ: custom branding / flavours | `content.js` → `faq[7]` |
| 12 | 3 real customer reviews (from the Instagram "Feedback" highlight) | `content.js` → `reviews` |
| 13 | Confirm the founder story | `index.html` → `#about` |
| 14 | Review the privacy text | `privacy.html` |
| 15 | Real photos (see table in section 2) and the original logo | `assets/` |
| 16 | Business email (optional) | `content.js` → `contact.email` |

## 6. Design notes and choices

- Colours, fonts, spacing and motion follow `DESIGN.md`. The tokens are copied verbatim at the top of `css/styles.css`.
- Icons come from an inline SVG sprite drawn in Lucide's line style rather than the Lucide CDN script. This keeps total JavaScript around 26 KB, inside the 50 KB budget.
- The WhatsApp buttons are WhatsApp green with dark text, because white on #25D366 fails WCAG AA contrast. They use a generic chat-bubble icon instead of WhatsApp's trademarked logo.
- Section backgrounds alternate emerald and cream. The founder section is cream-50 and the FAQ is cream-100, swapped from DESIGN.md §8, so that no two sections of the same cream sit next to each other.
- `prefers-reduced-motion` turns off the float, steam, parallax, shimmer and count-up animations.
- **Lighthouse (mobile, gzip server):** Accessibility 100, Best Practices 100, SEO 100, Performance about 86. Real first paint on a desktop is about 0.6 s. The remaining Performance gap is mostly the extra connection to Google Fonts under Lighthouse's simulated slow 4G. Self-hosting the four fonts in `assets/fonts/` would close it, but the brief asks for Google Fonts, so they are kept. `content-visibility` was tried and rejected because it made the nav links land in the wrong place.
