// ============================================
// PATI PARIWAR KALYAN SAMITI - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Store current page name for active nav highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // ==========================================
  // Component Loader (Header, Footer, Modal)
  // ==========================================
  async function loadComponent(selector, url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      const html = await response.text();
      document.querySelector(selector).innerHTML = html;
      
      // After loading header, set active nav state and init hamburger
      if (selector === '#header-container') {
        setActiveNav();
        initHamburger();
      }
      
      // After loading modal, initialize it
      if (selector === '#modal-container') {
        initContactModal();
      }
    } catch (error) {
      console.error('Error loading component:', error);
    }
  }

  // ==========================================
  // Active Navigation State
  // ==========================================
  function setActiveNav() {
    const navLinks = document.querySelectorAll('.nav-list a[data-page]');
    const pageMap = {
      'index.html': 'index',
      'aims-objectives.html': 'aims-objectives',
      'activities.html': 'activities',
      'resources.html': 'resources',
      'national-meet.html': 'national-meet',
      'contact.html': 'contact'
    };
    
    const currentPageKey = pageMap[currentPage] || 'index';
    
    navLinks.forEach(link => {
      if (link.dataset.page === currentPageKey) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ==========================================
  // Mobile Hamburger Menu
  // ==========================================
  function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    
    if (!hamburger || !mainNav) return;
    
    hamburger.addEventListener('click', function() {
      const isActive = hamburger.classList.toggle('active');
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('nav-open');
      document.body.classList.toggle('menu-open');
      document.body.style.overflow = mainNav.classList.contains('nav-open') ? 'hidden' : '';
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mainNav.classList.contains('nav-open')) {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('nav-open');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (mainNav.classList.contains('nav-open') && 
          !mainNav.contains(e.target) && 
          !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('nav-open');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
      }
    });
  }
  
  // ==========================================
  // Contact Modal Functionality
  // ==========================================
  function initContactModal() {
    const modal = document.getElementById('contact-modal');
    const modalClose = document.getElementById('modal-close');
    const modalForm = document.getElementById('modal-contact-form');
    const getHelpButtons = document.querySelectorAll('[data-open-modal="contact"]');
    
    if (!modal) return;
    
    // Open modal functions
    function openModal() {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      
      // Focus first input
      const firstInput = modal.querySelector('input, textarea');
      if (firstInput) firstInput.focus();
    }
    
    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      
      // Reset form
      if (modalForm) {
        modalForm.reset();
        modalForm.querySelectorAll('.form-group').forEach(group => {
          group.classList.remove('error');
          const existingError = group.querySelector('.error-message');
          if (existingError) existingError.remove();
        });
      }
    }
    
    // Open modal from buttons
    getHelpButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
      });
    });
    
    // Also open from floating helpline button if it has the attribute
    const floatingBtn = document.querySelector('.floating-helpline');
    if (floatingBtn && floatingBtn.dataset.openModal === 'contact') {
      floatingBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
      });
    }
    
    // Close modal
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
    
    // Form validation for modal form
    if (modalForm) {
      modalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const nameInput = modalForm.querySelector('#modal-name');
        const phoneInput = modalForm.querySelector('#modal-phone');
        const cityInput = modalForm.querySelector('#modal-city');
        const issueInput = modalForm.querySelector('#modal-issue');
        
        // Clear previous errors
        modalForm.querySelectorAll('.form-group').forEach(group => {
          group.classList.remove('error');
          const existingError = group.querySelector('.error-message');
          if (existingError) existingError.remove();
        });
        
        // Validate Name
        if (!nameInput || nameInput.value.trim() === '') {
          showError(nameInput, 'Name is required', modalForm);
          isValid = false;
        }
        
        // Validate Phone (Indian format)
        const phoneRegex = /^(\+91|0)?[6789]\d{9}$/;
        if (!phoneInput || !phoneRegex.test(phoneInput.value.trim())) {
          showError(phoneInput, 'Please enter a valid 10-digit Indian mobile number', modalForm);
          isValid = false;
        }
        
        // Validate City
        if (!cityInput || cityInput.value.trim() === '') {
          showError(cityInput, 'City is required', modalForm);
          isValid = false;
        }
        
        // Validate Issue
        if (!issueInput || issueInput.value.trim() === '') {
          showError(issueInput, 'Please describe your issue', modalForm);
          isValid = false;
        }
        
        if (isValid) {
          showSuccess(modalForm, closeModal);
        }
      });
    }
    
    function showError(input, message, form) {
      const formGroup = input.closest('.form-group');
      if (formGroup) {
        formGroup.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.setAttribute('role', 'alert');
        formGroup.appendChild(errorDiv);
        input.setAttribute('aria-invalid', 'true');
      }
    }
    
    function showSuccess(form, closeCallback) {
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Message Sent!';
      submitBtn.disabled = true;
      submitBtn.style.background = '#0F6E56';
      
      setTimeout(() => {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        closeCallback();
      }, 3000);
    }
  }
  
  // Load shared components
  loadComponent('#header-container', 'components/header.html');
  loadComponent('#footer-container', 'components/footer.html');
  loadComponent('#modal-container', 'components/contact-modal.html');
  
  // ==========================================
  // Scroll Reveal Animation
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < triggerBottom) {
        element.classList.add('active');
      }
    });
  };
  
  // Initial check on load
  revealOnScroll();
  
  // Check on scroll
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        revealOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // ==========================================
  // Contact Form Validation
  // ==========================================
  const contactForms = document.querySelectorAll('.contact-form, #contact-form');
  
  contactForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const nameInput = form.querySelector('#name');
      const phoneInput = form.querySelector('#phone');
      const cityInput = form.querySelector('#city');
      const issueInput = form.querySelector('#issue');
      
      // Clear previous errors
      form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
        const existingError = group.querySelector('.error-message');
        if (existingError) existingError.remove();
      });
      
      // Validate Name
      if (!nameInput || nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false;
      }
      
      // Validate Phone (Indian format: +91 or 0 followed by 10 digits)
      const phoneRegex = /^(\+91|0)?[6789]\d{9}$/;
      if (!phoneInput || !phoneRegex.test(phoneInput.value.trim())) {
        showError(phoneInput, 'Please enter a valid 10-digit Indian mobile number');
        isValid = false;
      }
      
      // Validate City
      if (!cityInput || cityInput.value.trim() === '') {
        showError(cityInput, 'City is required');
        isValid = false;
      }
      
      // Validate Issue
      if (!issueInput || issueInput.value.trim() === '') {
        showError(issueInput, 'Please describe your issue');
        isValid = false;
      }
      
      if (isValid) {
        // Show success message (in real implementation, this would submit the form)
        showSuccess(form);
      }
    });
  });
  
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
      formGroup.classList.add('error');
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;
      errorDiv.setAttribute('role', 'alert');
      formGroup.appendChild(errorDiv);
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', 'error-' + input.id);
    }
  }
  
  function showSuccess(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Message Sent!';
    submitBtn.disabled = true;
    submitBtn.style.background = '#0F6E56';
    
    setTimeout(() => {
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.background = '';
    }, 3000);
  }
  
  // ==========================================
  // Resources Filter Functionality
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const resourceCards = document.querySelectorAll('.resource-card');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      resourceCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // ==========================================
  // Lightbox for Photo Galleries
  // ==========================================
  const galleryImages = document.querySelectorAll('.gallery-img, .photo-grid img');
  
  if (galleryImages.length > 0) {
    createLightbox();
  }
  
  function createLightbox() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image viewer');
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-img';
    lightboxImg.alt = 'Enlarged view';
    
    const lightboxCaption = document.createElement('div');
    lightboxCaption.className = 'lightbox-caption';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close image viewer');
    closeBtn.type = 'button';
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-prev';
    prevBtn.innerHTML = '&#8249;';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.type = 'button';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-next';
    nextBtn.innerHTML = '&#8250;';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.type = 'button';
    
    lightboxContent.appendChild(closeBtn);
    lightboxContent.appendChild(prevBtn);
    lightboxContent.appendChild(nextBtn);
    lightboxContent.appendChild(lightboxImg);
    lightboxContent.appendChild(lightboxCaption);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    let currentIndex = 0;
    let images = [];
    
    // Collect all gallery images
    function collectImages() {
      images = Array.from(document.querySelectorAll('.gallery-img, .photo-grid img'));
    }
    
    collectImages();
    
    // Open lightbox
    galleryImages.forEach((img, index) => {
      img.addEventListener('click', function() {
        collectImages();
        currentIndex = images.indexOf(img);
        openLightbox(currentIndex);
      });
      
      // Make images keyboard accessible
      img.parentElement.setAttribute('tabindex', '0');
      img.parentElement.setAttribute('role', 'button');
      img.parentElement.setAttribute('aria-label', 'View larger image');
      img.parentElement.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          img.click();
        }
      });
    });
    
    function openLightbox(index) {
      const img = images[index];
      if (!img) return;
      
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || 'Gallery image';
      
      // Get caption from data attribute or alt
      const caption = img.getAttribute('data-caption') || img.alt;
      lightboxCaption.textContent = caption;
      lightboxCaption.style.display = caption ? 'block' : 'none';
      
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus trap for accessibility
      closeBtn.focus();
    }
    
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openLightbox(currentIndex);
    }
    
    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      openLightbox(currentIndex);
    }
    
    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);
    
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox || e.target === lightboxContent) {
        closeLightbox();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;
      
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          showPrev();
          break;
        case 'ArrowRight':
          showNext();
          break;
      }
    });
  }
});

