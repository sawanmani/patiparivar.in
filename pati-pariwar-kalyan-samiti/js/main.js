// ============================================
// PATI PARIWAR KALYAN SAMITI - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // Mobile Navigation Toggle with Animation
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      const isActive = hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      
      // Update aria-expanded for accessibility
      hamburger.setAttribute('aria-expanded', isActive);
      
      // Prevent body scroll when nav is open
      document.body.style.overflow = isActive ? 'hidden' : '';
    });
    
    // Close nav when clicking a link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    
    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    
    // Close nav on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });
  }
  
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

