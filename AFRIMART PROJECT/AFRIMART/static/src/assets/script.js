document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const overlay = document.getElementById('overlay');
  
    function toggleMobileMenu() {
      mobileMenu.classList.toggle('active');
      overlay.classList.toggle('active');
    }
  
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    closeMenuBtn.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', toggleMobileMenu);
  
    // Mobile Dropdowns
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    
    mobileDropdowns.forEach(dropdown => {
      const button = dropdown.querySelector('button');
      
      button.addEventListener('click', function() {
        dropdown.classList.toggle('active');
      });
    });
  
    // Search Functionality
    const searchBar = document.getElementById('searchBar');
    const searchResults = document.getElementById('searchResults');
    
    searchBar.addEventListener('input', function() {
      const query = this.value.trim();
      
      if (query.length > 2) {
        // Simulate API call
        setTimeout(() => {
          const results = getSearchResults(query);
          displayResults(results);
        }, 300);
      } else {
        searchResults.style.display = 'none';
      }
    });
  
    function getSearchResults(query) {
      // Mock data - replace with actual API call
      const mockProducts = [
        { id: 1, name: "Fresh Tomatoes", price: "500 FCFA" },
        { id: 2, name: "Plantains", price: "1000 FCFA" },
        { id: 3, name: "African Eggplant", price: "750 FCFA" },
        { id: 4, name: "Pepper", price: "300 FCFA" }
      ];
  
      return mockProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    function displayResults(results) {
      searchResults.innerHTML = '';
      
      if (results.length === 0) {
        searchResults.innerHTML = '<div class="p-4 text-gray-500">No products found</div>';
      } else {
        results.forEach(product => {
          const item = document.createElement('a');
          item.href = `product.html?id=${product.id}`;
          item.className = 'search-result-item';
          item.innerHTML = `
            <div class="flex justify-between items-center">
              <span>${product.name}</span>
              <span class="text-primary font-medium">${product.price}</span>
            </div>
          `;
          searchResults.appendChild(item);
        });
      }
      
      searchResults.style.display = 'block';
    }
  
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
      if (!searchBar.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  
    // Login-Gated Actions
    const protectedButtons = ['compareBtn', 'wishlistBtn', 'cartBtn', 'profileBtn'];
    
    protectedButtons.forEach(id => {
      document.getElementById(id).addEventListener('click', function(e) {
        if (!isLoggedIn()) {
          e.preventDefault();
          window.location.href = 'login.html';
        }
      });
    });
  
    function isLoggedIn() {
      // Replace with actual authentication check
      return false;
    }
  });


  // Nav Support Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const categoriesBtn = document.getElementById('categoriesBtn');
    const categoriesMenu = document.getElementById('categoriesMenu');
    const categoriesDropdown = document.querySelector('.categories-dropdown');
    const searchResults = document.getElementById('searchResults');
  
    // State Management
    let isMobileView = window.innerWidth < 768;
    let isCategoriesOpen = false;
  
    // Toggle Sidebar
    const toggleSidebar = () => {
      sidebar.classList.toggle('active');
      sidebarOverlay.classList.toggle('active');
      document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    };
  
    // Toggle Categories
    const toggleCategories = (e) => {
      if (e) e.stopPropagation();
      
      if (isMobileView) {
        // Mobile behavior - bottom sheet
        categoriesMenu.classList.toggle('active');
        categoriesDropdown.classList.toggle('active');
        document.body.style.overflow = categoriesMenu.classList.contains('active') ? 'hidden' : '';
      } else {
        // Desktop behavior - regular dropdown
        isCategoriesOpen = !isCategoriesOpen;
        categoriesMenu.style.maxHeight = isCategoriesOpen ? `${categoriesMenu.scrollHeight}px` : '0';
        categoriesDropdown.classList.toggle('active', isCategoriesOpen);
      }
    };
  
    // Close All Menus
    const closeAllMenus = () => {
      sidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
      
      if (isMobileView) {
        categoriesMenu.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        categoriesMenu.style.maxHeight = '0';
      }
      
      categoriesDropdown.classList.remove('active');
      isCategoriesOpen = false;
    };
  
    // Event Listeners
    sidebarToggle.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', closeAllMenus);
    categoriesBtn.addEventListener('click', toggleCategories);
  
    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
      if (!categoriesDropdown.contains(e.target)) {
        if (isMobileView) {
          categoriesMenu.classList.remove('active');
        } else {
          categoriesMenu.style.maxHeight = '0';
        }
        categoriesDropdown.classList.remove('active');
        isCategoriesOpen = false;
        document.body.style.overflow = '';
      }
    });
  
    // Prevent menu from closing when clicking inside
    categoriesMenu.addEventListener('click', (e) => e.stopPropagation());
  
    // Handle window resize
    window.addEventListener('resize', () => {
      isMobileView = window.innerWidth < 768;
      
      // Reset menus on viewport change
      closeAllMenus();
      
      // Ensure proper menu state after resize
      if (!isMobileView) {
        categoriesMenu.style.maxHeight = '';
        categoriesMenu.classList.remove('active');
      }
    });
  
    // Ensure search results appear above categories
    if (searchResults) {
      searchResults.style.zIndex = '60';
    }
  });


  document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const playPauseBtn = document.querySelector('.play-pause');
    const nextBtn = document.querySelector('.next-slide');
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Initialize first slide
    slides[0].classList.add('active');
    dots[0].classList.replace('bg-white/50', 'bg-white');
    
    // Auto-rotate slides
    function startCarousel() {
      autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function nextSlide() {
      goToSlide((currentIndex + 1) % slides.length);
    }
    
    function goToSlide(index) {
      slides[currentIndex].classList.remove('active');
      dots[currentIndex].classList.replace('bg-white', 'bg-white/50');
      
      currentIndex = index;
      
      slides[currentIndex].classList.add('active');
      dots[currentIndex].classList.replace('bg-white/50', 'bg-white');
    }
    
    // Play/Pause functionality
    let isPlaying = true;
    startCarousel();
    
    playPauseBtn.addEventListener('click', function() {
      isPlaying = !isPlaying;
      if (isPlaying) {
        startCarousel();
        playPauseBtn.innerHTML = '<i class="bi bi-pause text-xl"></i>';
      } else {
        clearInterval(autoSlideInterval);
        playPauseBtn.innerHTML = '<i class="bi bi-play text-xl"></i>';
      }
    });
    
    // Manual navigation
    nextBtn.addEventListener('click', function() {
      nextSlide();
      if (!isPlaying) {
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="bi bi-pause text-xl"></i>';
        startCarousel();
      }
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });
  });

  // Products Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('productsSlider');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const productCards = document.querySelectorAll('.product-card');
    const cardWidth = productCards[0].offsetWidth + 24; // width + gap
    
    let currentPosition = 0;
    const maxPosition = -(productCards.length * cardWidth - slider.offsetWidth);
  
    nextBtn.addEventListener('click', function() {
      currentPosition = Math.max(currentPosition - cardWidth * 3, maxPosition);
      slider.scrollTo({
        left: -currentPosition,
        behavior: 'smooth'
      });
    });
  
    prevBtn.addEventListener('click', function() {
      currentPosition = Math.min(currentPosition + cardWidth * 3, 0);
      slider.scrollTo({
        left: -currentPosition,
        behavior: 'smooth'
      });
    });
  
    // Auto-scroll on mobile touch
    let isDown = false;
    let startX;
    let scrollLeft;
  
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
  
    slider.addEventListener('mouseleave', () => {
      isDown = false;
    });
  
    slider.addEventListener('mouseup', () => {
      isDown = false;
    });
  
    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const pauseBtn = document.getElementById('pauseBtn');
    const pauseIcon = document.getElementById('pauseIcon');
    
    // Sample data - replace with your images and text
    const items = [
      { 
        image: 'src/assets/images/a1.jpg',
        title: 'Seth Rogen',
        subtitle: 'The Zane Lowe Interview'
      },
      {
        image: 'src/assets/images/a2.jpg',
        title: 'Vendor: Claris',
        subtitle: 'Fashion'
      },
      {
        image: 'src/assets/images/a3.jpg',
        title: 'Vendor: Joeboy',
        subtitle: 'Electronics'
      },
      {
        image: 'src/assets/images/a4.jpg',
        title: 'Vendor: Ma Na',
        subtitle: 'Home & Living'
      },
      {
        image: 'src/assets/images/a5.jpg',
        title: 'Vendor: Joseph',
        subtitle: 'Jeweries'
      },
      {
        image: 'src/assets/images/a6.jpg',
        title: 'Vendor: Jibola',
        subtitle: 'Cooking spices'
      },
      {
        image: 'src/assets/images/a7.jpg',
        title: 'Vendor: Jibola',
        subtitle: 'Plates and utensils'
      },
      {
        image: 'src/assets/images/a8.jpg',
        title: 'Vendor: Websi',
        subtitle: 'Tomaotoes'
      },
      {
        image: 'src/assets/images/a9.jpg',
        title: 'Vendorr: Leon',
        subtitle: 'clothing'
      },
  
    ];

    // Create carousel items
    items.forEach((item, i) => {
      const angle = (i * (360 / items.length));
      const itemEl = document.createElement('div');
      itemEl.className = 'carousel-item';
      itemEl.style.backgroundImage = `url('${item.image}')`;
      itemEl.style.transform = `rotateY(${angle}deg) translateZ(600px)`;
      itemEl.innerHTML = `
        <div class="carousel-text">
          <h2 class="text-2xl font-bold mb-2">${item.title}</h2>
          <p class="text-lg">${item.subtitle}</p>
        </div>
      `;
      carousel.appendChild(itemEl);
    });

    // Animation variables
    let angle = 0;
    let speed = 0.2;
    let isPlaying = true;
    let animationId;
    let normalSpeed = 0.2;
    let hoverSpeed = 0.05;
    let currentSpeed = normalSpeed;

    // Mouse enter/leave events for speed control
    carousel.addEventListener('mouseenter', () => {
      currentSpeed = hoverSpeed;
    });
    
    carousel.addEventListener('mouseleave', () => {
      currentSpeed = normalSpeed;
    });

    // Pause/play functionality
    pauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        pauseIcon.className = 'bi bi-pause-fill';
        animate();
      } else {
        pauseIcon.className = 'bi bi-play-fill';
        cancelAnimationFrame(animationId);
      }
    });

    // Animation loop
    function animate() {
      angle += currentSpeed;
      carousel.style.transform = `rotateY(${angle}deg)`;
      animationId = requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Handle window resize
    function handleResize() {
      const items = document.querySelectorAll('.carousel-item');
      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.8;
      
      items.forEach((item, i) => {
        const angle = (i * (360 / items.length));
        item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();
  });