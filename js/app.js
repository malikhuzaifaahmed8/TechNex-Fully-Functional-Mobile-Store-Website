
        // Enhanced JavaScript with GSAP animations
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize AOS animation
            AOS.init({
                duration: 600,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });

            // Create particles for loader
            function createLoaderParticles() {
                const container = document.getElementById('loader-particles');
                for (let i = 0; i < 20; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('particle');
                    
                    // Random properties
                    const size = Math.random() * 5 + 2;
                    const posX = Math.random() * 100;
                    const posY = Math.random() * 100;
                    const delay = Math.random() * 2;
                    const duration = Math.random() * 3 + 2;
                    
                    // Apply styles
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    particle.style.left = `${posX}%`;
                    particle.style.top = `${posY}%`;
                    particle.style.opacity = Math.random() * 0.5 + 0.1;
                    
                    // Add animation
                    gsap.to(particle, {
                        y: -20,
                        opacity: 0,
                        duration: duration,
                        delay: delay,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });
                    
                    container.appendChild(particle);
                }
            }

            // Create hero slider particles
            function createHeroParticles() {
                const slides = document.querySelectorAll('.slide');
                slides.forEach((slide, index) => {
                    const container = slide.querySelector('.particles');
                    for (let i = 0; i < 15; i++) {
                        const particle = document.createElement('div');
                        particle.classList.add('particle');
                        
                        // Random properties
                        const size = Math.random() * 6 + 2;
                        const posX = Math.random() * 100;
                        const posY = Math.random() * 100;
                        const delay = Math.random() * 2;
                        const duration = Math.random() * 4 + 3;
                        
                        // Apply styles
                        particle.style.width = `${size}px`;
                        particle.style.height = `${size}px`;
                        particle.style.left = `${posX}%`;
                        particle.style.top = `${posY}%`;
                        particle.style.opacity = Math.random() * 0.3 + 0.1;
                        particle.style.backgroundColor = `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})`;
                        
                        // Add animation
                        gsap.to(particle, {
                            x: Math.random() * 40 - 20,
                            y: Math.random() * 40 - 20,
                            opacity: 0.5,
                            duration: duration,
                            delay: delay,
                            repeat: -1,
                            yoyo: true,
                            ease: "sine.inOut"
                        });
                        
                        container.appendChild(particle);
                    }
                });
            }

            // Loading screen with particles
            window.addEventListener('load', function() {
                const loader = document.querySelector('.loader');
                createLoaderParticles();
                createHeroParticles();
                
                gsap.to(loader, {
                    opacity: 0,
                    duration: 0.5,
                    delay: 0.5,
                    onComplete: function() {
                        loader.style.display = 'none';
                    }
                });
            });

            // Header scroll effect with GSAP
            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                if (window.scrollY > 30) {
                    gsap.to(header, {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        duration: 0.3
                    });
                } else {
                    gsap.to(header, {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        boxShadow: '0 1px 0 rgba(0,0,0,0.05)',
                        duration: 0.3
                    });
                }
            });

            // 3D tilt effect for hero slider
            const tiltElements = document.querySelectorAll('.tilt-element');
            tiltElements.forEach(element => {
                element.addEventListener('mousemove', (e) => {
                    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                    gsap.to(element, {
                        rotationY: xAxis,
                        rotationX: yAxis,
                        transformPerspective: 1000,
                        transformOrigin: "center",
                        ease: "power1.out",
                        duration: 0.5
                    });
                });

                element.addEventListener('mouseleave', () => {
                    gsap.to(element, {
                        rotationY: 0,
                        rotationX: 0,
                        ease: "power3.out",
                        duration: 1
                    });
                });
            });

            // Enhanced slider functionality with GSAP
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.slide-prev');
            const nextBtn = document.querySelector('.slide-next');
            let currentSlide = 0;
            let slideInterval;

            function showSlide(n) {
                // Animate out current slide
                gsap.to(slides[currentSlide], {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: function() {
                        slides[currentSlide].classList.remove('active');
                    }
                });

                currentSlide = (n + slides.length) % slides.length;
                
                // Animate in new slide
                slides[currentSlide].classList.add('active');
                gsap.fromTo(slides[currentSlide], 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.inOut" }
                );
                
                // Animate particles for current slide
                const particles = slides[currentSlide].querySelectorAll('.particle');
                gsap.to(particles, {
                    scale: 1.2,
                    opacity: 0.8,
                    duration: 0.5,
                    stagger: 0.05,
                    yoyo: true,
                    repeat: 1
                });
            }

            function nextSlide() {
                showSlide(currentSlide + 1);
                resetSlideInterval();
            }

            function prevSlide() {
                showSlide(currentSlide - 1);
                resetSlideInterval();
            }

            function resetSlideInterval() {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            }

            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);

            // Start auto slide change
            slideInterval = setInterval(nextSlide, 5000);

            // Pause on hover
            const slider = document.querySelector('.slider');
            slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slider.addEventListener('mouseleave', resetSlideInterval);

            // Countdown timer
            function updateCountdown() {
                const now = new Date();
                const endDate = new Date();
                endDate.setDate(now.getDate() + 7); // 7 days from now

                const diff = endDate - now;

                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                // Animate countdown numbers
                gsap.to("#days", {
                    innerText: days.toString().padStart(2, '0'),
                    duration: 0.5,
                    snap: { innerText: 1 },
                    stagger: 0.1
                });
                
                gsap.to("#hours", {
                    innerText: hours.toString().padStart(2, '0'),
                    duration: 0.5,
                    snap: { innerText: 1 },
                    stagger: 0.1
                });
                
                gsap.to("#minutes", {
                    innerText: minutes.toString().padStart(2, '0'),
                    duration: 0.5,
                    snap: { innerText: 1 },
                    stagger: 0.1
                });
                
                gsap.to("#seconds", {
                    innerText: seconds.toString().padStart(2, '0'),
                    duration: 0.5,
                    snap: { innerText: 1 },
                    stagger: 0.1
                });
            }

            setInterval(updateCountdown, 1000);
            updateCountdown();

          
            // Product card hover animations
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        y: -10,
                        boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                        duration: 0.3
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        y: 0,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                        duration: 0.3
                    });
                });
            });

            // 3D product card effect
            const product3DCards = document.querySelectorAll('.product-card-3d');
            product3DCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const xAxis = (card.offsetWidth / 2 - e.offsetX) / 25;
                    const yAxis = (card.offsetHeight / 2 - e.offsetY) / 25;
                    
                    gsap.to(card, {
                        rotationY: xAxis,
                        rotationX: yAxis,
                        transformPerspective: 1000,
                        transformOrigin: "center",
                        ease: "power1.out",
                        duration: 0.5
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        rotationY: 0,
                        rotationX: 0,
                        ease: "power3.out",
                        duration: 1
                    });
                });
            });

            // Newsletter form submission
            const newsletterForm = document.querySelector('.newsletter-form');
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                // Animation for submission
                gsap.to(newsletterForm, {
                    y: -10,
                    opacity: 0,
                    duration: 0.3,
                    onComplete: function() {
                        alert(`Thank you for subscribing with ${email}!`);
                        newsletterForm.reset();
                        gsap.fromTo(newsletterForm, 
                            { y: 10, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.3 }
                        );
                    }
                });
            });

            // Mobile menu functionality
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const mobileMenu = document.querySelector('.mobile-menu');
            const mobileMenuClose = document.querySelector('.mobile-menu-close');
            const overlay = document.querySelector('.mobile-menu-overlay');
            const mainMenu = document.querySelector('.main-menu');

            // Clone desktop menu for mobile
            const mobileMainMenu = document.querySelector('.mobile-main-menu');
            mobileMainMenu.innerHTML = mainMenu.innerHTML;

            // Toggle mobile menu
            function toggleMenu() {
                if (mobileMenu.classList.contains('active')) {
                    gsap.to(mobileMenu, {
                        x: -300,
                        opacity: 0,
                        duration: 0.3,
                        onComplete: function() {
                            mobileMenu.classList.remove('active');
                        }
                    });
                    gsap.to(overlay, {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: function() {
                            overlay.classList.remove('active');
                            document.body.classList.remove('no-scroll');
                        }
                    });
                } else {
                    mobileMenu.classList.add('active');
                    overlay.classList.add('active');
                    document.body.classList.add('no-scroll');
                    
                    gsap.fromTo(mobileMenu, 
                        { x: -300, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.3 }
                    );
                    gsap.to(overlay, {
                        opacity: 1,
                        duration: 0.3
                    });
                }
            }

            mobileMenuBtn.addEventListener('click', toggleMenu);
            overlay.addEventListener('click', toggleMenu);

            // Close menu when clicking on links
            mobileMainMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', toggleMenu);
            });

            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    if (mobileMenu.classList.contains('active')) {
                        toggleMenu();
                    }
                }
            });

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        gsap.to(window, {
                            scrollTo: {
                                y: targetElement,
                                offsetY: 80
                            },
                            duration: 0.8,
                            ease: "power2.inOut"
                        });
                    }
                });
            });
        });
   
         document.addEventListener('DOMContentLoaded', function() {
            // Simple animation - fade in cards on load
            const cards = document.querySelectorAll('.brand-card');
            
            cards.forEach((card, index) => {
                // Initial state
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                // Animate in with delay
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
 
          document.addEventListener('DOMContentLoaded', function() {
            const track = document.querySelector('.promotion-track');
            const cards = document.querySelectorAll('.promotion-card');
            const cardWidth = cards[0].offsetWidth + 25; // width + gap
            
            // Auto-slide variables
            let autoSlideInterval;
            const autoSlideSpeed = 1; // pixels per frame
            let isAutoSliding = true;
            let animationId;
            let position = 0;
            let isDragging = false;
            let startX, currentX;
            
            // Initialize auto-slide
            startAutoSlide();
            
            // Set up event listeners
            setupEventListeners();
            
            function setupEventListeners() {
                // Mouse/touch events
                track.addEventListener('pointerdown', dragStart);
                track.addEventListener('pointermove', drag);
                track.addEventListener('pointerup', dragEnd);
                track.addEventListener('pointerleave', dragEnd);
                track.addEventListener('touchstart', dragStart, { passive: false });
                track.addEventListener('touchmove', drag, { passive: false });
                track.addEventListener('touchend', dragEnd);
                
                // Pause auto-slide on hover
                track.addEventListener('mouseenter', stopAutoSlide);
                track.addEventListener('mouseleave', () => {
                    if (!isDragging) {
                        isAutoSliding = true;
                        startAutoSlide();
                    }
                });
            }
            
            function dragStart(e) {
                stopAutoSlide();
                isDragging = true;
                track.style.cursor = 'grabbing';
                track.classList.add('grabbing');
                startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                cancelAnimationFrame(animationId);
            }
            
            function drag(e) {
                if (!isDragging) return;
                e.preventDefault();
                currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                const diff = currentX - startX;
                position += diff * 1.5; // Increase sensitivity
                startX = currentX;
                updatePosition();
            }
            
            function dragEnd() {
                if (!isDragging) return;
                isDragging = false;
                track.style.cursor = 'grab';
                track.classList.remove('grabbing');
                
                // Snap to nearest card
                const cardIndex = Math.round(-position / cardWidth) % cards.length;
                smoothScrollTo(cardIndex * cardWidth);
                
                // Resume auto-slide after a delay
                setTimeout(() => {
                    isAutoSliding = true;
                    startAutoSlide();
                }, 3000);
            }
            
            function smoothScrollTo(targetPosition) {
                const startPosition = position;
                const change = targetPosition - startPosition;
                const duration = 500;
                let startTime = null;
                
                function animateScroll(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    position = startPosition + change * easeInOutCubic(progress);
                    updatePosition();
                    
                    if (progress < 1) {
                        animationId = requestAnimationFrame(animateScroll);
                    }
                }
                
                animationId = requestAnimationFrame(animateScroll);
            }
            
            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }
            
            function startAutoSlide() {
                if (!isAutoSliding) return;
                cancelAnimationFrame(animationId);
                
                function animate() {
                    position -= autoSlideSpeed;
                    if (-position >= (cards.length - 3) * cardWidth) {
                        position += cardWidth * 3; // Jump back for infinite effect
                    }
                    updatePosition();
                    animationId = requestAnimationFrame(animate);
                }
                
                animationId = requestAnimationFrame(animate);
            }
            
            function stopAutoSlide() {
                cancelAnimationFrame(animationId);
                isAutoSliding = false;
            }
            
            function updatePosition() {
                track.style.transform = `translateX(${position}px)`;
            }
        });


// Helper function to format price
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: price % 1 === 0 ? 0 : 2
    }).format(price);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'add-to-cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Helper function to format price
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: price % 1 === 0 ? 0 : 2
    }).format(price);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'add-to-cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Shopping Cart Module
const Cart = (function() {
    // DOM Elements
    const cartPopup = document.querySelector('.cart-popup');
    const cartOverlay = document.querySelector('.cart-popup-overlay');
    const closeCartBtn = document.querySelector('.close-cart-btn');
    const floatingCart = document.querySelector('.floating-cart');
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const subtotalAmount = document.querySelector('.subtotal-amount');
    const totalAmount = document.querySelector('.total-amount');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const viewCartBtn = document.querySelector('.view-cart');
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    const cartCountElements = document.querySelectorAll('.notification-bubble, .cart-count');
    
    // Cart state
    let cart = JSON.parse(localStorage.getItem('technex-cart')) || [];
    
    // Initialize cart
    function init() {
        setupEventListeners();
        updateCartCount();
    }
    
    // Event listeners
    function setupEventListeners() {
        if (floatingCart) floatingCart.addEventListener('click', toggleCart);
        if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
        if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);
        if (checkoutBtn) checkoutBtn.addEventListener('click', proceedToCheckout);
        if (viewCartBtn) viewCartBtn.addEventListener('click', viewCartPage);
        if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', toggleCart);
    }
    
    // Toggle cart visibility
    function toggleCart() {
        cartPopup.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        updateCartUI();
    }
    
    // Update cart UI
    function updateCartUI() {
        if (!cartItemsContainer) return;
        
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            if (emptyCartMessage) {
                emptyCartMessage.style.display = 'flex';
                cartItemsContainer.appendChild(emptyCartMessage);
            }
        } else {
            if (emptyCartMessage) emptyCartMessage.style.display = 'none';
            
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <span class="cart-item-price">${formatPrice(item.price)}</span>
                        <div class="cart-item-actions">
                            <div class="quantity-selector">
                                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                            <button class="remove-item-btn" data-id="${item.id}">
                                <i class="fas fa-trash-alt"></i> Remove
                            </button>
                        </div>
                    </div>
                `;
                
                cartItemsContainer.appendChild(cartItemElement);
            });
            
            // Add event listeners to new elements
            document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                btn.addEventListener('click', decreaseQuantity);
            });
            
            document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                btn.addEventListener('click', increaseQuantity);
            });
            
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', updateQuantity);
            });
            
            document.querySelectorAll('.remove-item-btn').forEach(btn => {
                btn.addEventListener('click', removeItem);
            });
        }
        
        updateTotals();
    }
    
    // Update cart totals
    function updateTotals() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        if (subtotalAmount) subtotalAmount.textContent = formatPrice(subtotal);
        if (totalAmount) totalAmount.textContent = formatPrice(subtotal);
        
        // Save to localStorage
        localStorage.setItem('technex-cart', JSON.stringify(cart));
    }
    
    // Quantity adjustment functions
    function decreaseQuantity(e) {
        const productId = parseInt(e.target.dataset.id);
        const item = cart.find(item => item.id === productId);
        
        if (item && item.quantity > 1) {
            item.quantity--;
            updateCartUI();
            updateCartCount();
        }
    }
    
    function increaseQuantity(e) {
        const productId = parseInt(e.target.dataset.id);
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity++;
            updateCartUI();
            updateCartCount();
        }
    }
    
    function updateQuantity(e) {
        const productId = parseInt(e.target.dataset.id);
        const newQuantity = parseInt(e.target.value);
        const item = cart.find(item => item.id === productId);
        
        if (item && newQuantity >= 1) {
            item.quantity = newQuantity;
            updateCartUI();
            updateCartCount();
        } else if (item && newQuantity < 1) {
            // If quantity is set to 0 or negative, remove the item
            cart = cart.filter(item => item.id !== productId);
            updateCartUI();
            updateCartCount();
        }
    }
    
    // Remove item from cart
    function removeItem(e) {
        const productId = parseInt(e.target.dataset.id);
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
        updateCartCount();
        showNotification('Item removed from cart');
    }
    
    // Add item to cart
    function addToCart(product) {
        // Add to cart
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ 
                ...product, 
                quantity: 1,
                image: product.image || 'images/default-product.jpg'
            });
        }
        
        updateCartCount();
        showNotification(`${product.name} added to cart`);
        
        // Save to localStorage
        localStorage.setItem('technex-cart', JSON.stringify(cart));
    }
    
    // Update cart count display
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    }
    
    // Checkout and view cart functions
    function proceedToCheckout() {
        if (cart.length > 0) {
            alert('Proceeding to checkout with ' + cart.reduce((total, item) => total + item.quantity, 0) + ' items');
            // In a real implementation, redirect to checkout page
            // window.location.href = '/checkout';
        } else {
            alert('Your cart is empty');
        }
    }
    
    function viewCartPage() {
        toggleCart();
        // In a real implementation, redirect to cart page
        // window.location.href = '/cart';
    }
    
    // Public API
    return {
        init,
        addToCart,
        toggleCart
    };
})();

// Wishlist Module
const Wishlist = (function() {
    let wishlist = JSON.parse(localStorage.getItem('technex-wishlist')) || [];
    const wishlistCountElements = document.querySelectorAll('.wishlist-count');
    
    function isInWishlist(productId) {
        return wishlist.includes(productId.toString());
    }
    
    function toggleWishlist(productId, button) {
        const index = wishlist.indexOf(productId.toString());
        
        if (index === -1) {
            // Add to wishlist
            wishlist.push(productId.toString());
            animateHeart(button, true);
            showNotification('Added to wishlist');
        } else {
            // Remove from wishlist
            wishlist.splice(index, 1);
            animateHeart(button, false);
            showNotification('Removed from wishlist');
        }
        
        updateWishlistCount();
        // Save to localStorage
        localStorage.setItem('technex-wishlist', JSON.stringify(wishlist));
    }
    
    function animateHeart(button, isAdding) {
        const heartIcon = button.querySelector('i') || button;
        
        if (isAdding) {
            // Create animation elements
            const animation = document.createElement('div');
            animation.className = 'heart-animation';
            animation.innerHTML = `
                <div class="heart-particle"></div>
                <div class="heart-particle"></div>
                <div class="heart-particle"></div>
                <div class="heart-particle"></div>
                <div class="heart-particle"></div>
            `;
            
            button.appendChild(animation);
            
            // Change to solid heart
            heartIcon.className = 'fas fa-heart';
            button.classList.add('active');
            
            // Remove animation after it completes
            setTimeout(() => {
                animation.remove();
            }, 1000);
        } else {
            // Change to outline heart
            heartIcon.className = 'far fa-heart';
            button.classList.remove('active');
        }
    }
    
    function updateWishlistCount() {
        const count = wishlist.length;
        wishlistCountElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    }
    
    // Initialize wishlist count
    function init() {
        updateWishlistCount();
    }
    
    return {
        isInWishlist,
        toggleWishlist,
        init
    };
})();

// Initialize 3D tilt effect for product cards
function initTiltEffect() {
    const productCards = document.querySelectorAll('.product-card-3d');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// Initialize all product card interactions
function initProductCards() {
    // Quick view button functionality
    document.querySelectorAll('.btn-shop-now').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-card-name').textContent;
            const productPrice = productCard.querySelector('.curr-price').textContent;
            const originalPrice = productCard.querySelector('del') ? productCard.querySelector('del').textContent : null;
            const productRating = productCard.querySelector('.product-rating').innerHTML;
            const productImage = productCard.querySelector('.product-card-img img').src;
            
            showQuickView({
                id: productCard.dataset.id || Date.now(),
                name: productName,
                price: parseFloat(productPrice.replace('$', '').replace(',', '')),
                originalPrice: originalPrice ? parseFloat(originalPrice.replace('$', '').replace(',', '')) : null,
                rating: (productRating.match(/fa-star/g) || []).length,
                reviews: parseInt((productRating.match(/\((\d+)\)/) || [0, 0])[1]),
                image: productImage,
                features: ['Premium build quality', 'High performance', 'Latest technology']
            });
        });
    });

    // Wishlist button functionality
    document.querySelectorAll('.btn-wishlist').forEach(button => {
        // Initialize wishlist button state
        const productCard = button.closest('.product-card');
        if (productCard && productCard.dataset.id) {
            const productId = productCard.dataset.id;
            if (Wishlist.isInWishlist(productId)) {
                const heartIcon = button.querySelector('i') || button;
                heartIcon.className = 'fas fa-heart';
                button.classList.add('active');
            }
        }

        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            if (productCard && productCard.dataset.id) {
                const productId = productCard.dataset.id;
                Wishlist.toggleWishlist(productId, this);
            }
        });
    });

    // Add to cart button functionality
    document.querySelectorAll('.btn-cart-add').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.id || Date.now();
            const productName = productCard.querySelector('.product-card-name').textContent;
            const productPrice = parseFloat(productCard.querySelector('.curr-price').textContent.replace('$', '').replace(',', ''));
            const productImage = productCard.querySelector('.product-card-img img').src;
            
            // Temporarily show tick icon
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.classList.add('added');
            
            // Add to cart
            Cart.addToCart({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage
            });
            
            // Revert button after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.classList.remove('added');
            }, 2000);
        });
    });
}

// Quick View Modal
function showQuickView(product) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="quick-view-content" style="
            background: white;
            border-radius: 10px;
            width: 80%;
            max-width: 900px;
            max-height: 80vh;
            overflow-y: auto;
            padding: 30px;
            position: relative;
            transform: translateY(20px);
            transition: transform 0.3s ease;
        ">
            <button class="close-btn" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
            ">&times;</button>
            
            <div style="display: flex; gap: 30px; margin-bottom: 20px;">
                <div style="flex: 1;">
                    <img src="${product.image}" alt="${product.name}" style="
                        width: 100%;
                        border-radius: 8px;
                        object-fit: cover;
                    ">
                </div>
                <div style="flex: 1;">
                    <h2 style="margin-bottom: 10px;">${product.name}</h2>
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <div style="color: #FFD600; margin-right: 10px;">
                            ${'<i class="fas fa-star"></i>'.repeat(product.rating)}${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}${'<i class="far fa-star"></i>'.repeat(5 - Math.ceil(product.rating))}
                        </div>
                        <span style="color: #666;">(${product.reviews} reviews)</span>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <span style="font-size: 24px; font-weight: bold; color: #222;">
                            ${formatPrice(product.price)}
                        </span>
                        ${product.originalPrice ? `
                            <span style="text-decoration: line-through; color: #999; margin-left: 10px;">
                                ${formatPrice(product.originalPrice)}
                            </span>
                            <span style="color: #e53935; margin-left: 10px;">
                                ${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                            </span>
                        ` : ''}
                    </div>
                    
                    <p style="margin-bottom: 20px; color: #555;">${product.features.join(", ")}</p>
                    
                    <div class="quick-view-actions" style="display: flex; gap: 10px;">
                        <button class="add-to-cart-modal" style="
                            padding: 12px 24px;
                            background: #222;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            font-weight: 500;
                            cursor: pointer;
                            transition: background 0.3s;
                            flex: 1;
                        ">
                            ADD TO CART
                        </button>
                        <button class="wishlist-btn-modal" style="
                            padding: 12px;
                            background: #f8f9fa;
                            color: ${Wishlist.isInWishlist(product.id) ? '#e53935' : '#495057'};
                            border: none;
                            border-radius: 4px;
                            font-weight: 500;
                            cursor: pointer;
                            transition: all 0.3s;
                        ">
                            <i class="${Wishlist.isInWishlist(product.id) ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                    </div>
                    
                    <button class="buy-now-btn" style="
                        padding: 12px 24px;
                        background: #4CAF50;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        font-weight: 500;
                        cursor: pointer;
                        transition: background 0.3s;
                        width: 100%;
                        margin-top: 15px;
                    ">
                        BUY NOW
                    </button>
                </div>
            </div>
            
            <div style="margin-top: 30px;">
                <h3 style="margin-bottom: 15px;">Product Details</h3>
                <p style="color: #555; line-height: 1.6;">
                    This premium product features cutting-edge technology with high-performance components. 
                    Designed for professionals and enthusiasts alike, it offers exceptional quality and reliability. 
                    The product comes with a manufacturer's warranty and premium customer support.
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Trigger animation
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.quick-view-content').style.transform = 'translateY(0)';
    }, 10);
    
    // Close modal
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.style.opacity = '0';
        modal.querySelector('.quick-view-content').style.transform = 'translateY(20px)';
        setTimeout(() => modal.remove(), 300);
    });
    
    // Add to cart from modal
    modal.querySelector('.add-to-cart-modal').addEventListener('click', function() {
        Cart.addToCart(product);
        this.textContent = 'ADDED TO CART';
        this.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            modal.style.opacity = '0';
            modal.querySelector('.quick-view-content').style.transform = 'translateY(20px)';
            setTimeout(() => modal.remove(), 300);
        }, 1000);
    });
    
    // Wishlist from modal
    modal.querySelector('.wishlist-btn-modal').addEventListener('click', function() {
        const heartIcon = this.querySelector('i');
        Wishlist.toggleWishlist(product.id, this);
        heartIcon.className = Wishlist.isInWishlist(product.id) ? 'fas fa-heart' : 'far fa-heart';
        this.style.color = Wishlist.isInWishlist(product.id) ? '#e53935' : '#495057';
    });
    
    // Buy now from modal
    modal.querySelector('.buy-now-btn').addEventListener('click', function() {
        Cart.addToCart(product);
        alert(`Proceeding to checkout with ${product.name}`);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
    Wishlist.init();
    initTiltEffect();
    initProductCards();
});


 



document.addEventListener('DOMContentLoaded', function() {
    const notifyButtons = document.querySelectorAll('.tech-showcase .cta-button');
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    document.body.appendChild(notification);
    
    notifyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productName = this.closest('.product-content').querySelector('.product-name').textContent;
            const launchDate = this.closest('.launch-info').querySelector('.launch-tag span:last-child').textContent;
            
            // Update notification content
            notification.innerHTML = `
                <div class="notification-content">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="#4CAF50" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                    </svg>
                    <div>
                        <strong>${productName}</strong>
                        <p>We'll notify you when available (${launchDate})</p>
                    </div>
                </div>
            `;
            
            // Show notification with GSAP
            gsap.fromTo(notification,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.3 }
            );
            
            // Hide after 3 seconds
            setTimeout(() => {
                gsap.to(notification, {
                    y: -20,
                    opacity: 0,
                    duration: 0.3
                });
            }, 3000);
            
            // Button animation
            gsap.to(button, {
                backgroundColor: '#4CAF50',
                duration: 0.3,
                onComplete: function() {
                    setTimeout(() => {
                        gsap.to(button, {
                            backgroundColor: '#222',
                            duration: 0.3
                        });
                    }, 2000);
                }
            });
        });
    });
});





document.addEventListener('DOMContentLoaded', function() {
    const miniDealsPopup = document.querySelector('.mini-deals-popup');
    const miniDealsOverlay = document.querySelector('.mini-deals-popup-overlay');
    const closeMiniDeals = document.querySelector('.close-mini-deals');
    
    // Check if popup was recently shown
    const popupLastShown = localStorage.getItem('miniDealsLastShown');
    const now = new Date().getTime();
    
    // Show popup after 1 minute if:
    // - Page was refreshed (performance.navigation.type === 1)
    // - Not shown in last 24 hours
    // - User didn't manually close it
    function showPopup() {
        const wasRefreshed = performance.navigation.type === 1;
        const oneMinuteAgo = now - 60000; // 1 minute in ms
        
        if (wasRefreshed && 
            (!popupLastShown || now - popupLastShown > 86400000) && // 24 hours
            !localStorage.getItem('miniDealsClosed')) {
            
            setTimeout(() => {
                miniDealsPopup.classList.add('active');
                miniDealsOverlay.classList.add('active');
                localStorage.setItem('miniDealsLastShown', now.toString());
            }, 60000); // 1 minute delay
        }
    }
    
    // Close functionality
    function closeMiniDealsPopup() {
        miniDealsPopup.classList.remove('active');
        miniDealsOverlay.classList.remove('active');
        localStorage.setItem('miniDealsClosed', 'true');
        
        // Reset closed status after 24 hours
        setTimeout(() => {
            localStorage.removeItem('miniDealsClosed');
        }, 86400000);
    }
    
    closeMiniDeals.addEventListener('click', closeMiniDealsPopup);
    
    // Shop Now button
    document.querySelector('.mini-shop-now').addEventListener('click', function() {
        // In real implementation, link to product page
        window.location.href = '/products/samsung-s23-ultra';
        closeMiniDealsPopup();
    });
    
    // Initialize
    showPopup();
});






document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const products = [
        {
            id: 1,
            name: "Samsung Galaxy S23 Ultra 5G (256GB, Phantom Black)",
            category: "smartphone",
            price: 1199.99,
            originalPrice: 1299.99,
            image: "images/ultras.png",
            rating: 5,
            reviews: 128,
            isNew: true,
            features: ["200MP Camera", "S Pen Included", "5000mAh Battery"]
        },
        {
            id: 2,
            name: "Apple iPhone 14 Pro Max (1TB, Space Black)",
            category: "smartphone",
            price: 1599.99,
            originalPrice: 1699.99,
            image: "images/file (4).png",
            rating: 5,
            reviews: 215,
            isNew: true,
            features: ["A16 Bionic Chip", "48MP Main Camera", "Dynamic Island"]
        },
        {
            id: 3,
            name: "MacBook Pro 16\" M2 Max (32GB, 1TB)",
            category: "laptop",
            price: 3499.99,
            originalPrice: 3699.99,
            image: "images/file (8).png",
            rating: 5,
            reviews: 89,
            isNew: true,
            features: ["M2 Max Chip", "32-core GPU", "Liquid Retina XDR Display"]
        },
        {
            id: 4,
            name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
            category: "headphones",
            price: 399.99,
            originalPrice: 449.99,
            image: "images/Untitled design (2).png",
            rating: 4,
            reviews: 342,
            isNew: false,
            features: ["Industry-leading ANC", "30-hour battery", "Multi-point pairing"]
        },
        {
            id: 5,
            name: "Canon EOS R5 Mirrorless Camera",
            category: "camera",
            price: 3799.99,
            originalPrice: 4299.99,
            image: "images/9b1bb4e6929cb9c5d0ea22bf33eedffd@small.png",
            rating: 5,
            reviews: 76,
            isNew: false,
            features: ["45MP Full-frame", "8K Video", "IBIS up to 8 stops"]
        },
        {
            id: 6,
            name: "Apple Watch Ultra (GPS + Cellular)",
            category: "smartwatch",
            price: 799.99,
            originalPrice: 849.99,
            image: "images/watch.avif",
            rating: 4,
            reviews: 187,
            isNew: true,
            features: ["49mm Titanium Case", "Dual-frequency GPS", "Oceanic+ app"]
        },
        {
            id: 7,
            name: "Bose QuietComfort Earbuds II",
            category: "audio",
            price: 279.99,
            originalPrice: 299.99,
            image: "images/cq5dam.web.1920.1920.jpeg",
            rating: 4,
            reviews: 156,
            isNew: false,
            features: ["CustomTune technology", "Active Noise Cancelling", "IPX4 rating"]
        },
        {
            id: 8,
            name: "LG C2 Series 65\" OLED evo TV",
            category: "tv",
            price: 1999.99,
            originalPrice: 2499.99,
            image: "images/md08003934-DZ-2-jpg.avif",
            rating: 5,
            reviews: 203,
            isNew: false,
            features: ["4K OLED", "α9 Gen 5 AI Processor", "120Hz refresh rate"]
        },
        {
            id: 9,
            name: "Samsung Galaxy Z Fold 4 (512GB, Graygreen)",
            category: "smartphone",
            price: 1799.99,
            originalPrice: 1899.99,
            image: "images/sam (3).png",
            rating: 4,
            reviews: 94,
            isNew: true,
            features: ["7.6\" Main Display", "S Pen support", "Under-display camera"]
        },
        {
            id: 10,
            name: "Dell XPS 15 (2023) OLED Touch Laptop",
            category: "laptop",
            price: 2499.99,
            originalPrice: 2799.99,
            image: "images/dell laptop.avif",
            rating: 4,
            reviews: 67,
            isNew: true,
            features: ["15.6\" 3.5K OLED", "13th Gen Intel Core i9", "NVIDIA RTX 4070"]
        },
        {
            id: 11,
            name: "Sony A95K 65\" QD-OLED TV",
            category: "tv",
            price: 3499.99,
            originalPrice: 3999.99,
            image: "images/x75k-2.png",
            rating: 5,
            reviews: 112,
            isNew: false,
            features: ["Quantum Dot OLED", "Cognitive Processor XR", "Acoustic Surface Audio"]
        },
        {
            id: 12,
            name: "Apple AirPods Pro (2nd Generation)",
            category: "audio",
            price: 249.99,
            originalPrice: 269.99,
            image: "images/file (14).png",
            rating: 4,
            reviews: 428,
            isNew: true,
            features: ["H2 chip", "Adaptive Transparency", "Personalized Spatial Audio"]
        }
    ];

    // DOM elements
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.querySelector('.search');
    
    // Create search results dropdown
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchContainer.appendChild(searchResults);

    // Function to perform search
    function performSearch(query) {
        if (!query.trim()) {
            searchResults.style.display = 'none';
            return;
        }

      const lowerQuery = query.toLowerCase();
const results = products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) || 
    product.category.toLowerCase().includes(lowerQuery) ||
    product.features.some(feature => feature.toLowerCase().includes(lowerQuery))
).slice(0, 5); // Limit to 5 results

displayResults(results);
    }

   function displayResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'search-result-item';
        noResults.textContent = 'No products found';
        searchResults.appendChild(noResults);
    } else {
        results.forEach(product => {
            const resultItem = document.createElement('a');
            resultItem.className = 'search-result-item';
            
            // Link to shop.html with the product ID or search term
            resultItem.href = `shop.html?search=${encodeURIComponent(product.name)}`;
                // Create product image
                const img = document.createElement('img');
                img.src = product.image;
                img.alt = product.name;
                
                // Create product info container
                const info = document.createElement('div');
                info.className = 'search-result-info';
                
                // Product name
                const name = document.createElement('h4');
                name.textContent = product.name;
                
                // Product price
                const price = document.createElement('p');
                price.className = 'search-result-price';
                price.innerHTML = `$${product.price.toFixed(2)} <span>$${product.originalPrice.toFixed(2)}</span>`;
                
                // Append elements
                info.appendChild(name);
                info.appendChild(price);
                resultItem.appendChild(img);
                resultItem.appendChild(info);
                
                searchResults.appendChild(resultItem);
            });
        }
        
        searchResults.style.display = 'block';
    }

    // Event listeners
    searchInput.addEventListener('input', function() {
        performSearch(this.value);
    });

    searchIcon.addEventListener('click', function() {
        performSearch(searchInput.value);
    });

    searchInput.addEventListener('focus', function() {
        if (this.value.trim()) {
            performSearch(this.value);
        }
    });

    // Hide results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
        } else if (e.key === 'Escape') {
            searchResults.style.display = 'none';
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // Select all cart toggle buttons (navbar + floating)
    const cartButtons = document.querySelectorAll('.toggle-cart');
    const cartPopup = document.querySelector('.cart-popup');
    const cartOverlay = document.querySelector('.cart-popup-overlay');
    const closeCartBtn = document.querySelector('.close-cart-btn');

    // Function to open the cart
    function openCart() {
        cartPopup.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Function to close the cart
    function closeCart() {
        cartPopup.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    // Add click events to all cart buttons
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openCart();
        });
    });

    // Close cart when clicking X, overlay, or pressing Escape
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeCart();
    });
});


// Function to update cart count in both icons
function updateCartCount(count) {
    document.querySelectorAll('.notification-bubble').forEach(bubble => {
        bubble.textContent = count;
    });
}

// Example usage (call this when adding/removing items):
updateCartCount(5); // Updates both navbar and floating cart





document.addEventListener('DOMContentLoaded', function() {
  // Initialize wishlist from localStorage or empty array
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
  // DOM Elements
  const wishlistToggle = document.querySelector('.wishlist-toggle');
  const wishlistPopup = document.querySelector('.wishlist-popup');
  const wishlistOverlay = document.querySelector('.wishlist-popup-overlay');
  const closeWishlist = document.querySelector('.close-wishlist');
  const wishlistItemsContainer = document.querySelector('.wishlist-items');
  const wishlistCount = document.querySelector('.wishlist-count');

  // Update wishlist count display
  function updateWishlistCount() {
    wishlistCount.textContent = wishlist.length;
  }

  // Render wishlist items
  function renderWishlist() {
    if (wishlist.length === 0) {
      wishlistItemsContainer.innerHTML = `
        <div class="empty-wishlist">
          <i class="far fa-heart"></i>
          <p>Your wishlist is empty</p>
        </div>
      `;
      return;
    }

    let html = '';
    wishlist.forEach(item => {
      html += `
        <div class="wishlist-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}">
          <div class="wishlist-item-details">
            <div class="wishlist-item-title">${item.name}</div>
            <div class="wishlist-item-price">$${item.price.toFixed(2)}</div>
            <button class="btn btn-sm move-to-cart">Move to Cart</button>
          </div>
          <div class="remove-wishlist-item">
            <i class="fas fa-times"></i>
          </div>
        </div>
      `;
    });
    wishlistItemsContainer.innerHTML = html;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-wishlist-item').forEach(btn => {
      btn.addEventListener('click', function() {
        const itemId = parseInt(this.closest('.wishlist-item').dataset.id);
        removeFromWishlist(itemId);
      });
    });

    // Add event listeners to move-to-cart buttons
    document.querySelectorAll('.move-to-cart').forEach(btn => {
      btn.addEventListener('click', function() {
        const itemId = parseInt(this.closest('.wishlist-item').dataset.id);
        moveToCart(itemId);
      });
    });
  }

  // Add to wishlist function (call this when heart icon is clicked on product)
  function addToWishlist(product) {
    if (!wishlist.some(item => item.id === product.id)) {
      wishlist.push(product);
      saveWishlist();
      updateWishlistCount();
      renderWishlist();
    }
  }

  // Remove from wishlist
  function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    saveWishlist();
    updateWishlistCount();
    renderWishlist();
  }

  // Move item to cart (you'll need to implement your cart functionality)
  function moveToCart(productId) {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      // Add your cart add function here
      console.log('Moving to cart:', product);
      removeFromWishlist(productId);
    }
  }

  // Save wishlist to localStorage
  function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

  // Toggle wishlist popup
  function toggleWishlist() {
    wishlistPopup.classList.toggle('active');
    wishlistOverlay.classList.toggle('active');
    document.body.style.overflow = wishlistPopup.classList.contains('active') ? 'hidden' : '';
  }

  // Event listeners
  wishlistToggle.addEventListener('click', function(e) {
    e.preventDefault();
    toggleWishlist();
  });

  closeWishlist.addEventListener('click', toggleWishlist);
  wishlistOverlay.addEventListener('click', toggleWishlist);

  // Initialize
  updateWishlistCount();
  renderWishlist();

  // Make addToWishlist available globally to call from product pages
  window.addToWishlist = addToWishlist;
});




// Replace your existing JavaScript with this updated version
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const authTrigger = document.getElementById('authTrigger');
  const authModal = document.querySelector('.auth-modal');
  const authOverlay = document.querySelector('.auth-overlay');
  const authClose = document.getElementById('authClose');
  const tabs = document.querySelectorAll('.tab');
  const authForms = document.querySelectorAll('.auth-form');
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  const loggedInState = document.querySelector('.logged-in-state');
  const profileDropdown = document.querySelector('.profile-dropdown');
  const profileTrigger = document.querySelector('.profile-dropdown-trigger');
  const logoutLink = document.getElementById('logoutLink');
  const profileLink = document.getElementById('profileLink');
  const settingsLink = document.getElementById('settingsLink');
  const switchTabs = document.querySelectorAll('.switch-tab');
  
  // User data storage
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
  const rememberMe = localStorage.getItem('rememberMe') === 'true';

  // Initialize UI
  function initAuthUI() {
    if (currentUser) {
      // Show avatar and hide icon
      authTrigger.style.display = 'none';
      loggedInState.style.display = 'flex'; // Changed to flex for better alignment
      
      // Update dropdown user info
      const dropdownUsername = document.querySelector('.dropdown-username');
      const dropdownEmail = document.querySelector('.dropdown-email');
      dropdownUsername.textContent = currentUser.name;
      dropdownEmail.textContent = currentUser.email;
      
      // Set avatar
      const avatars = document.querySelectorAll('.user-avatar, .dropdown-avatar');
      avatars.forEach(avatar => {
        avatar.src = currentUser.avatar || 'images/default-avatar.jpg';
        avatar.title = currentUser.name;
      });
      
      // Initialize dropdown event listeners
      initDropdown();
    } else {
      // Show icon and hide avatar
      authTrigger.style.display = 'block';
      loggedInState.style.display = 'none';
    }
  }

  // Initialize dropdown functionality
  function initDropdown() {
    // Toggle dropdown on profile click
    profileTrigger.addEventListener('click', function(e) {
      e.stopPropagation();
      const isVisible = profileDropdown.style.opacity === '1';
      
      profileDropdown.style.opacity = isVisible ? '0' : '1';
      profileDropdown.style.visibility = isVisible ? 'hidden' : 'visible';
      profileDropdown.style.transform = isVisible ? 'translateY(10px)' : 'translateY(0)';
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!loggedInState.contains(e.target)) {
        profileDropdown.style.opacity = '0';
        profileDropdown.style.visibility = 'hidden';
        profileDropdown.style.transform = 'translateY(10px)';
      }
    });
  }

  // Toggle auth modal
  function toggleAuthModal() {
    authModal.classList.toggle('active');
    authOverlay.classList.toggle('active');
    document.body.style.overflow = authModal.classList.contains('active') ? 'hidden' : '';
    
    // Reset forms when opening modal
    if (authModal.classList.contains('active')) {
      signupForm.reset();
      loginForm.reset();
      
      // Auto-fill if remember me is checked
      if (rememberMe && currentUser) {
        document.getElementById('loginEmail').value = currentUser.email;
        document.getElementById('rememberMe').checked = true;
      }
    }
  }

  // Switch between tabs
  function switchTab(tabName) {
    // Update tabs
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');
    
    // Update forms
    authForms.forEach(form => form.classList.remove('active'));
    document.getElementById(`${tabName}Form`).classList.add('active');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      switchTab(this.dataset.tab);
    });
  });

  // Switch tabs from footer links
  switchTabs.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      switchTab(this.dataset.tab);
    });
  });

  // Signup
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim().toLowerCase();
    const password = document.getElementById('signupPassword').value.trim();
    
    // Simple validation
    if (name && email && password.length >= 8) {
      // Check if user exists
      if (users.some(user => user.email === email)) {
        showAlert('Email already registered', 'error');
        return;
      }
      
      // Create new user
      const newUser = { 
        name, 
        email, 
        password,
        joined: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4a6bff&color=fff&rounded=true`
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Auto-login
      currentUser = { name, email, avatar: newUser.avatar };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      // Update UI
      initAuthUI();
      toggleAuthModal();
      showAlert(`Welcome, ${name}!`, 'success');
    } else {
      showAlert('Please fill all fields correctly (password min 8 chars)', 'error');
    }
  });

  // Login
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value.trim();
    const remember = document.getElementById('rememberMe').checked;
    
    // Find user
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
      currentUser = { 
        name: user.name, 
        email: user.email,
        avatar: user.avatar
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('rememberMe', remember);
      
      // Update UI
      initAuthUI();
      toggleAuthModal();
      showAlert(`Welcome back, ${user.name}!`, 'success');
    } else {
      showAlert('Invalid email or password', 'error');
    }
  });

  // Logout
  function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    initAuthUI();
    showAlert('You have been logged out', 'info');
  }

  // Profile dropdown interactions
  logoutLink.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
      handleLogout();
    }
  });

  profileLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Profile page would open here');
  });

  settingsLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Settings page would open here');
  });

  // Show alert message
  function showAlert(message, type) {
    // Remove any existing alerts first
    const existingAlert = document.querySelector('.auth-alert');
    if (existingAlert) existingAlert.remove();
    
    const alert = document.createElement('div');
    alert.className = `auth-alert auth-alert-${type}`;
    alert.textContent = message;
    
    // Insert after auth tabs
    const authTabs = document.querySelector('.auth-tabs');
    authModal.insertBefore(alert, authTabs.nextSibling);
    
    // Remove after 3 seconds
    setTimeout(() => {
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 300);
    }, 3000);
  }

  // Event listeners
  authTrigger.addEventListener('click', function(e) {
    e.preventDefault();
    toggleAuthModal();
  });

  authClose.addEventListener('click', toggleAuthModal);
  authOverlay.addEventListener('click', toggleAuthModal);

  // Initialize
  initAuthUI();
  
  // Add alert styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .auth-alert {
      padding: 12px 15px;
      margin-bottom: 20px;
      border-radius: 8px;
      font-size: 14px;
      transition: var(--transition);
    }
    .auth-alert-error {
      background: #ffebee;
      color: #c62828;
      border-left: 4px solid #ef5350;
    }
    .auth-alert-success {
      background: #e8f5e9;
      color: #2e7d32;
      border-left: 4px solid #4caf50;
    }
    .auth-alert-info {
      background: #e3f2fd;
      color: #1565c0;
      border-left: 4px solid #2196f3;
    }
    
    /* Additional fix for dropdown trigger */
    .logged-in-state {
      position: relative;
      display: flex;
      align-items: center;
    }
    
    .profile-dropdown-trigger {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);
});