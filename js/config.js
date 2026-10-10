/* =====================================================================
   SITE SETTINGS — the ONE file to edit for contact details and prices.
   Every WhatsApp button, email link and price on the site reads from here.
   ===================================================================== */

window.SITE_CONFIG = {
  businessName: "Hakim Digital Studio",

  // WhatsApp number in INTERNATIONAL format, digits only.
  // No "+", no spaces, no dashes, no leading zeros.
  // Example (UAE mobile 055 831 1047): "971558311047"
  // These details were carried over from your previous website — please confirm they are correct.
  whatsappNumber: "971558311047",

  // Public contact email (used for the "Email me" links).
  email: "hakimwebsites.ug@gmail.com",

  // Message pre-filled when someone taps a general WhatsApp button.
  defaultWhatsAppMessage:
    "Hello Hakim Digital Studio, I am interested in getting a website for my business. Could you tell me about your packages?",

  // OPTIONAL: a form-handling service endpoint (for example a Formspree or Web3Forms URL).
  // Leave as "" and the contact form sends the enquiry to WhatsApp instead.
  formEndpoint: "",

  // Package prices in AED. Change the numbers here and every price on the site updates.
  prices: {
    starter: 399,
    business: 799,
    careFrom: 149
  }
};
