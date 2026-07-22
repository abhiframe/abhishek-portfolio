/* =========================================================
   MOBILE NAVIGATION TOGGLE
   ========================================================= */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close mobile menu after a link is tapped
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    });
  });
}

/* =========================================================
   SCROLL REVEAL (fade in + slide up)
   ========================================================= */
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // Fallback: show everything immediately
  revealElements.forEach((el) => el.classList.add('is-visible'));
}

/* =========================================================
   SHOWREEL MODAL
   ========================================================= */
const showreelBtn = document.getElementById('showreel-btn');
const showreelCard = document.getElementById('showreel-card');
const showreelModal = document.getElementById('showreel-modal');
const showreelIframe = document.getElementById('showreel-iframe');
const modalClose = document.getElementById('modal-close');

// Temporary showreel video — swap this ID whenever the real reel is ready.
const SHOWREEL_VIDEO_ID = 'HCkgL4WKKH8';
const SHOWREEL_EMBED_URL = `https://www.youtube.com/embed/${SHOWREEL_VIDEO_ID}?autoplay=1&rel=0`;

let lastFocusedElement = null;

function openShowreelModal() {
  if (!showreelModal || !showreelIframe) return;

  lastFocusedElement = document.activeElement;

  // Video only loads/plays once the popup is actually opened.
  showreelIframe.src = SHOWREEL_EMBED_URL;

  showreelModal.classList.add('is-open');
  showreelModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  if (modalClose) modalClose.focus();
}

function closeShowreelModal() {
  if (!showreelModal || !showreelIframe) return;

  showreelModal.classList.remove('is-open');
  showreelModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  // Reset the iframe src so the video fully stops playing.
  showreelIframe.src = '';

  if (lastFocusedElement) lastFocusedElement.focus();
}

if (showreelBtn) {
  showreelBtn.addEventListener('click', openShowreelModal);
}

if (showreelCard) {
  showreelCard.addEventListener('click', openShowreelModal);
}

if (modalClose) {
  modalClose.addEventListener('click', closeShowreelModal);
}

if (showreelModal) {
  // Clicking the dark overlay (outside the dialog) closes the popup.
  showreelModal.addEventListener('click', (event) => {
    if (event.target === showreelModal) {
      closeShowreelModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && showreelModal && showreelModal.classList.contains('is-open')) {
    closeShowreelModal();
  }
});