// Service Details Data
const serviceDetails = {
  hear: {
    title: "Cadillac Hearse",
    description: "Our fleet of luxury Cadillac hearses provides the utmost dignity and respect during final journeys. Each vehicle is impeccably maintained, climate-controlled, and driven by compassionate professionals. We accommodate religious customs, processions, and private family transfers.",
    features: ["Premium Cadillac chassis", "Silent electric climate system", "Customizable floral rack", "Professional chauffeur attire"]
  },
  floral: {
    title: "Wreaths & Floral Arrangements",
    description: "Express love and honor memory with handcrafted floral tributes. From classic standing sprays to custom-designed wreaths, we collaborate with local artisans to create meaningful arrangements that reflect personality, faith, or a favorite color palette.",
    features: ["Fresh seasonal blooms", "Silk preservation options", "Casket covers & pillows", "Memorial wreaths with ribbons"]
  },
  programs: {
    title: "Funeral Programs & Announcements",
    description: "Celebrate a life well-lived with elegant printed programs, prayer cards, and digital death announcements. Our design team works with families to incorporate photos, poetry, and order of service details to produce a timeless keepsake.",
    features: ["Bespoke templates", "Same-day rush service", "Bi-fold & booklet styles", "Online obituary publishing"]
  },
  tomb: {
    title: "Site Acquisition, Tomb Construction & Tombstones",
    description: "We assist with cemetery plot acquisition, mausoleum construction, and personalized granite or bronze memorials. Our experts coordinate with cemeteries, handle permits, and ensure lasting tributes that withstand generations.",
    features: ["Plot selection assistance", "Above-ground crypts", "Engraved headstones & markers", "Seasonal grave maintenance plans"]
  },
  rentals: {
    title: "Chairs, Tables & Tents Rentals",
    description: "Create a comfortable memorial reception or funeral gathering with our premium event rentals. From intimate family setups to larger outdoor services, we deliver setup and teardown with discretion and care.",
    features: ["Cross-back chairs & folding tables", "Water-resistant tents (10x10 to 30x60)", "Linen & tableware add-ons", "Heating/cooling for tents"]
  },
  casket: {
    title: "Casket Selection Gallery",
    description: "Honor your loved one with a casket that reflects their spirit. We offer a curated selection of handcrafted caskets in various materials, finishes, and price ranges. Our consultants provide transparent pricing and guidance without pressure.",
    features: [
      "Solid oak, mahogany, cherry, and walnut",
      "Metal caskets (bronze, copper, stainless steel)",
      "Eco-friendly biodegradable caskets (woven willow, bamboo)",
      "Custom personalization: interior linens, appliqués, memorial engraving"
    ]
  }
};

// DOM Elements
const modal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModalSpan = document.querySelector('.modal-close');
const modalContactBtn = document.getElementById('modalContactBtn');

// Open modal with service data
function openModal(serviceKey) {
  const data = serviceDetails[serviceKey];
  if (!data) return;

  modalTitle.innerText = data.title;
  let featuresHtml = '';
  if (data.features && data.features.length) {
    featuresHtml = '<ul class="modal-detail-list">' + data.features.map(f => `<li><i class="fas fa-check-circle" style="color:#b25e3c; margin-right: 10px;"></i>${f}</li>`).join('') + '</ul>';
  }
  modalBody.innerHTML = `<p>${data.description}</p>${featuresHtml}<p style="margin-top: 1rem; font-style: italic; border-top: 1px solid #eeded2; padding-top: 1rem;">✨ For pricing and immediate availability, our caring team is ready to assist.</p>`;
  modal.style.display = 'flex';
  modalContactBtn.setAttribute('data-service-name', data.title);
}

// Attach click listeners to all service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', (e) => {
    e.stopPropagation();
    const serviceAttr = card.getAttribute('data-service');
    if (serviceAttr && serviceDetails[serviceAttr]) {
      openModal(serviceAttr);
    }
  });
});

// Close modal (X)
closeModalSpan.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Contact button inside modal: close, scroll to contact, prefill dropdown
modalContactBtn.addEventListener('click', () => {
  const serviceName = modalContactBtn.getAttribute('data-service-name') || 'Casket Selection or other service';
  modal.style.display = 'none';
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  const interestSelect = document.getElementById('serviceInterest');
  if (interestSelect) {
    const options = Array.from(interestSelect.options);
    let matched = false;
    for (let opt of options) {
      if (opt.value && serviceName.toLowerCase().includes(opt.value.toLowerCase()) || opt.value.toLowerCase().includes(serviceName.toLowerCase().split(' ')[0])) {
        interestSelect.value = opt.value;
        matched = true;
        break;
      }
    }
    if (!matched && serviceName.toLowerCase().includes('casket')) {
      interestSelect.value = "Casket Selection";
    } else if (!matched) {
      interestSelect.value = "";
    }
  }
  const feedbackMsg = document.getElementById('formFeedback');
  if (feedbackMsg) {
    feedbackMsg.style.color = '#b25e3c';
    feedbackMsg.innerText = `✓ We noted your interest in "${serviceName}". Fill the form to get a detailed quote.`;
    setTimeout(() => {
      if (feedbackMsg.innerText.includes("noted your interest")) feedbackMsg.innerText = '';
    }, 5000);
  }
  document.getElementById('name')?.focus();
});

// Contact form submission
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!name || !email) {
    feedback.style.color = '#b1624b';
    feedback.innerText = '❌ Please enter your name and email address.';
    return;
  }
  feedback.style.color = '#5c7c6e';
  feedback.innerHTML = '✓ Thank you, ' + name + '. A caring staff member will reach out within 1 hour. (demo)';
  form.reset();
  setTimeout(() => {
    if (feedback.innerHTML.includes('Thank you')) {
      setTimeout(() => { if(feedback.innerHTML.includes('Thank you')) feedback.innerHTML = ''; }, 4000);
    }
  }, 100);
});