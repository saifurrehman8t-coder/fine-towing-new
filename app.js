/**
 * Fine Towing Service Lahore - Interactive Engine
 * Handles Rate Calculation, FAQ accordions, dispatch actions, location filters
 */

document.addEventListener('DOMContentLoaded', () => {
  initRateCalculator();
  initFaqAccordion();
  initMobileMenu();
  initLiveDispatchTimer();
  initSmoothScroll();
});

// Towing Rate Estimator Logic
function initRateCalculator() {
  const vehicleSelect = document.getElementById('calc-vehicle');
  const distanceRange = document.getElementById('calc-distance');
  const distanceVal = document.getElementById('calc-distance-val');
  const priceDisplay = document.getElementById('calc-price-output');
  const timeDisplay = document.getElementById('calc-time-output');

  if (!distanceRange || !priceDisplay) return;

  const baseRates = {
    sedan: { base: 2500, perKm: 150 },
    suv: { base: 3500, perKm: 180 },
    luxury: { base: 5000, perKm: 250 },
    heavy: { base: 7000, perKm: 300 }
  };

  function updateEstimate() {
    const vehicleType = vehicleSelect ? vehicleSelect.value : 'sedan';
    const distanceKm = parseInt(distanceRange.value, 10);
    
    if (distanceVal) {
      distanceVal.textContent = `${distanceKm} km`;
    }

    const rateConfig = baseRates[vehicleType] || baseRates.sedan;
    const totalEstimate = rateConfig.base + (distanceKm * rateConfig.perKm);

    // Estimate arrival & transit time
    const estTimeMinutes = 15 + Math.round(distanceKm * 2.5);

    // Format PKR price
    priceDisplay.textContent = `PKR ${totalEstimate.toLocaleString('en-PK')}`;
    if (timeDisplay) {
      timeDisplay.textContent = `~${estTimeMinutes} Mins Total ETA`;
    }
  }

  if (vehicleSelect) vehicleSelect.addEventListener('change', updateEstimate);
  if (distanceRange) distanceRange.addEventListener('input', updateEstimate);

  // Initial run
  updateEstimate();
}

// FAQ Accordion Toggle
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach((other) => other.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Mobile Menu Navigation Drawer
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.style.display === 'flex';
    navMenu.style.display = isOpen ? 'none' : 'flex';
    if (!isOpen) {
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = '#0F172A';
      navMenu.style.padding = '1.5rem';
      navMenu.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
    }
  });
}

// Live Dispatch ETA Counter Simulation
function initLiveDispatchTimer() {
  const etaSpan = document.getElementById('live-eta-counter');
  if (!etaSpan) return;

  let mins = 18;
  setInterval(() => {
    // Random fluctuation between 15 and 25 mins
    mins = Math.floor(Math.random() * 10) + 15;
    etaSpan.textContent = `${mins} mins`;
  }, 12000);
}

// Smooth Scrolling for Internal Hash Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// WhatsApp Dispatch Action Helper
function triggerWhatsAppDispatch(serviceType = 'Emergency Towing') {
  const phone = '923075090646';
  const message = encodeURIComponent(
    `Hello Fine Towing Service Lahore! I need urgent breakdown recovery assistance.\n\n` +
    `Service Needed: ${serviceType}\n` +
    `Location: Lahore\n` +
    `Please dispatch a driver immediately.`
  );
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}
window.triggerWhatsAppDispatch = triggerWhatsAppDispatch;
