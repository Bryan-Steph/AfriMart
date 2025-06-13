document.addEventListener('DOMContentLoaded', function() {
  // Mobile filter toggle
  const filterToggle = document.getElementById('filterToggle');
  const mobileFilterOverlay = document.getElementById('mobileFilterOverlay');
  const closeMobileFilter = document.getElementById('closeMobileFilter');
  
  // Filter toggle functionality
  filterToggle.addEventListener('click', function() {
    if (window.innerWidth < 1024) { // Only for mobile
      // Clone desktop filters to mobile overlay
      const desktopFilters = document.querySelector('.bg-white.rounded-lg.shadow').cloneNode(true);
      const mobileFilterContent = mobileFilterOverlay.querySelector('.p-4');
      mobileFilterContent.innerHTML = '';
      mobileFilterContent.appendChild(desktopFilters);
      
      // Initialize accordions in mobile filters
      initFilterAccordions(mobileFilterContent);
      
      // Show mobile overlay
      mobileFilterOverlay.classList.remove('hidden');
      setTimeout(() => {
        mobileFilterOverlay.querySelector('.absolute').classList.remove('translate-x-full');
      }, 10);
      
      // Prevent body scrolling when filter is open
      document.body.style.overflow = 'hidden';
    }
  });
  
  // Close mobile filter with close button
  closeMobileFilter.addEventListener('click', function() {
    closeFilterOverlay();
  });
  
  // Close mobile filter by clicking outside
  mobileFilterOverlay.addEventListener('click', function(e) {
    if (e.target === mobileFilterOverlay) {
      closeFilterOverlay();
    }
  });
  
  // Function to close filter overlay
  function closeFilterOverlay() {
    mobileFilterOverlay.querySelector('.absolute').classList.add('translate-x-full');
    setTimeout(() => {
      mobileFilterOverlay.classList.add('hidden');
      // Restore body scrolling when filter is closed
      document.body.style.overflow = '';
    }, 300);
  }
  
  // Filter accordion functionality
  function initFilterAccordions(container) {
    const filterGroups = container.querySelectorAll('.filter-group');
    
    filterGroups.forEach(group => {
      const header = group.querySelector('.filter-group-header');
      const content = group.querySelector('.filter-group-content');
      const icon = header.querySelector('i');
      
      // Initialize closed
      content.style.display = 'none';
      icon.classList.add('-rotate-90');
      
      header.addEventListener('click', function() {
        if (content.style.display === 'none') {
          content.style.display = 'block';
          icon.classList.remove('-rotate-90');
        } else {
          content.style.display = 'none';
          icon.classList.add('-rotate-90');
        }
      });
    });
  }
  
  // Initialize desktop filter accordions
  initFilterAccordions(document);
  
  // Carousel functionality
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  let currentIndex = 0;
  const slideWidth = carouselSlides[0].getBoundingClientRect().width;
  
  function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  
  nextBtn.addEventListener('click', function() {
    if (currentIndex < carouselSlides.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });
  
  prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
  
  // Category navigation scroll behavior
  const categoryLinks = document.querySelectorAll('.category-link');
  const categoryScroller = document.querySelector('.category-scroller');
  
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      categoryLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Center the active link in the scroller
      const scrollerWidth = categoryScroller.offsetWidth;
      const linkPosition = this.offsetLeft;
      const linkWidth = this.offsetWidth;
      
      categoryScroller.scrollTo({
        left: linkPosition - (scrollerWidth / 2) + (linkWidth / 2),
        behavior: 'smooth'
      });
    });
  });

  // Close mobile filter when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !mobileFilterOverlay.classList.contains('hidden')) {
      closeFilterOverlay();
    }
  });
});
  // Mobile filter toggle
  const filterToggle = document.getElementById('filterToggle');
  const mobileFilterOverlay = document.getElementById('mobileFilterOverlay');
  const closeMobileFilter = document.getElementById('closeMobileFilter');
  
  filterToggle.addEventListener('click', function() {
    if (window.innerWidth < 1024) { // Only for mobile
      // Clone desktop filters to mobile overlay
      const desktopFilters = document.querySelector('.bg-white.rounded-lg.shadow').cloneNode(true);
      const mobileFilterContent = mobileFilterOverlay.querySelector('.p-4');
      mobileFilterContent.innerHTML = '';
      mobileFilterContent.appendChild(desktopFilters);
      
      // Initialize accordions in mobile filters
      initFilterAccordions(mobileFilterContent);
      
      // Show mobile overlay
      mobileFilterOverlay.classList.remove('hidden');
      setTimeout(() => {
        mobileFilterOverlay.querySelector('.absolute').classList.remove('translate-x-full');
      }, 10);
    }
  });
  
  closeMobileFilter.addEventListener('click', function() {
    mobileFilterOverlay.querySelector('.absolute').classList.add('translate-x-full');
    setTimeout(() => {
      mobileFilterOverlay.classList.add('hidden');
    }, 300);
  });
  
  // Filter accordion functionality
  function initFilterAccordions(container) {
    const filterGroups = container.querySelectorAll('.filter-group');
    
    filterGroups.forEach(group => {
      const header = group.querySelector('.filter-group-header');
      const content = group.querySelector('.filter-group-content');
      const icon = header.querySelector('i');
      
      // Initialize closed
      content.style.display = 'none';
      icon.classList.add('-rotate-90');
      
      header.addEventListener('click', function() {
        if (content.style.display === 'none') {
          content.style.display = 'block';
          icon.classList.remove('-rotate-90');
        } else {
          content.style.display = 'none';
          icon.classList.add('-rotate-90');
        }
      });
    });
  }
  
  // Initialize desktop filter accordions
  initFilterAccordions(document);
  
  // Carousel functionality
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  let currentIndex = 0;
  const slideWidth = carouselSlides[0].getBoundingClientRect().width;
  
  function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  
  nextBtn.addEventListener('click', function() {
    if (currentIndex < carouselSlides.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });
  
  prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
  
  // Category navigation scroll behavior
  const categoryLinks = document.querySelectorAll('.category-link');
  const categoryScroller = document.querySelector('.category-scroller');
  
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      categoryLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Center the active link in the scroller
      const scrollerWidth = categoryScroller.offsetWidth;
      const linkPosition = this.offsetLeft;
      const linkWidth = this.offsetWidth;
      
      categoryScroller.scrollTo({
        left: linkPosition - (scrollerWidth / 2) + (linkWidth / 2),
        behavior: 'smooth'
      });
    });
  });