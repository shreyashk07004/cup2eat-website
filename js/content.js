/* =====================================================================
   CUP2EAT — SITE CONTENT
   ---------------------------------------------------------------------
   This is the ONE file to edit for prices, phone numbers, links,
   products, reviews, journey items and FAQ answers.

   • Keep the quotes "..." around every piece of text.
   • Anything that still starts with [[PLACEHOLDER or [[CONFIRM must be
     filled in by the owner before the site goes live.
   • Save the file and refresh the browser to see your changes.
   ===================================================================== */

window.CUP2EAT = {

  /* ---------- Presentation switch ----------
     false → "clean demo" mode: every unfinished item is hidden or replaced
             with a neutral fallback (sample reviews, unanswered FAQs, the
             FSSAI no., catalogue link, placeholder photos…). Use this when
             showing the site to people.
     true  → show every [[PLACEHOLDER]] / [[CONFIRM]] in a dashed gold box,
             so the owner can see exactly what still needs filling in. */
  showPlaceholders: false,

  /* ---------- Contact & links ---------- */
  contact: {
    phoneDisplay: "+91 98181 92575",          // shown on the page
    phoneIntl:    "919818192575",             // used for WhatsApp + call links (country code, no + or spaces)
    instagram:    "https://www.instagram.com/cup2eat/",
    instagramHandle: "@cup2eat",
    location:     "Ghaziabad, Delhi NCR, India",
    deliveryLine: "Ghaziabad, Delhi NCR · Delivering across India",
    fssaiNumber:  "[[PLACEHOLDER: FSSAI reg. no.]]",
    mapLink:      "[[PLACEHOLDER: map link]]",
    catalogueLink:"[[PLACEHOLDER: catalogue PDF link]]",
    email:        ""                          // optional — leave "" to hide
  },

  /* Default WhatsApp message (floating button, navbar, bottom bar) */
  whatsappDefault: "Hi CUP2EAT, I'd like to know about edible cups.",

  /* ---------- Flavours (product cards) ---------- */
  /* pill: chocolate | vanilla | elaichi | coated  (controls the tag colour) */
  products: [
    {
      name: "Edible Cup: Chocolate",
      pill: "chocolate", pillLabel: "Chocolate · 100 ml",
      image: "assets/images/cup-chocolate-REPLACE.svg",
      alt: "Chocolate edible wafer cup filled with a frothy latte",
      description: "A rich cocoa wafer cup. Every sip of coffee ends with a chocolatey crunch.",
      bestFor: ["Coffee", "Ice cream", "Desserts"]
    },
    {
      name: "Edible Cup: Vanilla",
      pill: "vanilla", pillLabel: "Vanilla · 100 ml",
      image: "assets/images/cup-vanilla-REPLACE.svg",
      alt: "Golden vanilla edible wafer cup filled with hot chai",
      description: "Our classic golden wafer cup. Light, sweet and loved by everyone.",
      bestFor: ["Chai", "Coffee", "Ice cream"]
    },
    {
      name: "Edible Cup: Elaichi",
      pill: "elaichi", pillLabel: "Elaichi · 100 ml",
      image: "assets/images/cup-elaichi-REPLACE.svg",
      alt: "Cardamom flavoured edible cup filled with masala chai",
      description: "A cardamom-flavoured cup, made for masala chai.",
      bestFor: ["Masala chai", "Kadak chai"]
    },
    {
      name: "Chocolate-Coated Edible Cup",
      pill: "coated", pillLabel: "Premium · Choco-coated",
      image: "assets/images/cup-choco-coated-REPLACE.svg",
      alt: "Chocolate-coated edible cup holding scoops of ice cream",
      description: "Our premium cup with a chocolate coating. Ice cream tastes even better when you can eat the cup too!",
      bestFor: ["Ice cream", "Desserts", "Events"]
    }
  ],

  /* ---------- Pricing ---------- */
  /* price: a number (no commas) — or a [[PLACEHOLDER]] text.
     cups: how many cups in the pack (used to work out the price per cup). */
  pricing: [
    {
      id: "sample",
      name: "Sample Box",
      tagline: "Try before you buy",
      price: "[[PLACEHOLDER: price]]",
      cups: null,
      features: ["[[PLACEHOLDER: contents]]", "Taste every flavour first", "Perfect for first-time buyers"],
      cta: "Try a Sample Box",
      featured: false
    },
    {
      id: "wholesale",
      name: "Wholesale Pack",
      tagline: "396 cups · 100 ml",
      price: 3999,
      cups: 396,
      features: ["Mix of Chocolate, Vanilla & Elaichi", "100 ml cups", "Delivery included all over India"],
      cta: "Get Wholesale Price",
      featured: true,
      ribbon: "Best Value"
    },
    {
      id: "coated",
      name: "Chocolate-Coated Pack",
      tagline: "200 cups · premium",
      price: 4000,
      cups: 200,
      features: ["Chocolate-coated edible cups", "For cafés, events & businesses", "Made for chocolate lovers"],
      cta: "Order Choco-Coated",
      featured: false
    }
  ],
  pricingFootnote: "Prices include delivery anywhere in India. Prices valid as per current offer; for custom quantities or flavours, request a quote.",

  /* ---------- Journey / Seen at ---------- */
  /* icon: shown instead of the photo while the image is still a -REPLACE placeholder
     (choose from: graduation, store, gem, award, pin, truck, heart, gift, cup) */
  journey: [
    { tag: "College fests", icon: "graduation", caption: "Loved by students at Lady Shri Ram College (LSR), Delhi",
      image: "assets/images/journey-lsr-stall-REPLACE.svg", alt: "CUP2EAT stall at a college fest at Lady Shri Ram College" },
    { tag: "Live stalls", icon: "store", caption: "Live stalls at fests & events across Delhi NCR",
      image: "assets/images/journey-event-stall-REPLACE.svg", alt: "CUP2EAT event stall with FSSAI banner" },
    { tag: "Startup Mahakumbh 2025", icon: "gem", caption: "Founder Varun Khera at Startup Mahakumbh 2025, Bharat Mandapam, New Delhi",
      image: "assets/images/journey-startup-mahakumbh-REPLACE.svg", alt: "Founder Varun Khera at Startup Mahakumbh 2025" },
    { tag: "Award", icon: "award", caption: "1st Position: Business Plan Competition, SPECTRA 2025, IPEM Ghaziabad",
      image: "assets/images/journey-spectra-award-REPLACE.svg", alt: "First position certificate at SPECTRA 2025 business plan competition" },
    { tag: "Pragati Maidan · IITF", icon: "pin", caption: "This year a visitor, very soon an exhibitor 🙏",
      image: "assets/images/journey-iitf-REPLACE.svg", alt: "Founder visiting the India International Trade Fair at Pragati Maidan" },
    { tag: "Pan-India dispatch", icon: "truck", caption: "From Ghaziabad to Odisha: CUP2EAT is reaching more people, one order at a time.",
      image: "assets/images/journey-dispatch-REPLACE.svg", alt: "Packed CUP2EAT boxes ready for dispatch" }
  ],

  /* ---------- Customer feedback ---------- */
  /* REPLACE: these are SAMPLE reviews. Swap in real feedback from the
     Instagram "Feedback" highlight, then delete the "sample: true" line. */
  reviews: [
    { quote: "[[PLACEHOLDER: real customer quote about the taste or the reaction of guests]]",
      name: "[[PLACEHOLDER: customer name]]", role: "[[PLACEHOLDER: café / event, city]]", sample: true },
    { quote: "[[PLACEHOLDER: real customer quote about ordering or delivery]]",
      name: "[[PLACEHOLDER: customer name]]", role: "[[PLACEHOLDER: café / event, city]]", sample: true },
    { quote: "[[PLACEHOLDER: real customer quote about using the cups at an event]]",
      name: "[[PLACEHOLDER: customer name]]", role: "[[PLACEHOLDER: café / event, city]]", sample: true }
  ],

  /* ---------- FAQ ---------- */
  faq: [
    { q: "How long does the cup stay crisp with hot chai or coffee?", a: "[[CONFIRM WITH OWNER]]" },
    { q: "Are the cups vegetarian? Do they contain egg?",              a: "[[CONFIRM WITH OWNER]]" },
    { q: "What is the shelf life and how should I store them?",       a: "[[CONFIRM WITH OWNER]]" },
    { q: "What is the minimum order?",                                 a: "Our Wholesale Pack is 396 cups; smaller sample boxes are available." },
    { q: "Do you deliver to my city?",                                 a: "Yes, we deliver all over India and delivery is included in the price." },
    { q: "How long does delivery take?",                               a: "[[CONFIRM WITH OWNER]]" },
    { q: "Are CUP2EAT cups food-safe?",                                a: "Yes, CUP2EAT is FSSAI registered." },
    { q: "Can I get custom branding or flavours for my café or event?", a: "[[CONFIRM WITH OWNER]]" }
  ]
};
