// Filter and sort products - Enhanced version with top rated products rendering
function filterProducts() {
    showLoading();
    
    setTimeout(() => {
        const activeCategory = document.querySelector('.filter-pill.active').dataset.category;
        const sortValue = priceSort.value;
        const minPrice = parseInt(priceMin.value);
        const maxPrice = parseInt(priceMax.value);
        
        let filteredProducts = [...products];
        
        // Filter by category
        if (activeCategory !== 'all') {
            filteredProducts = filteredProducts.filter(
                product => product.category === activeCategory
            );
        }
        
        // Filter by price range
        filteredProducts = filteredProducts.filter(
            product => product.price >= minPrice && product.price <= maxPrice
        );
        
        // Sort products
        if (sortValue === 'high-low') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'low-high') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'rating') {
            filteredProducts.sort((a, b) => b.rating - a.rating);
        } else if (sortValue === 'newest') {
            filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        }
        
        // Update pagination
        updatePagination(filteredProducts.length);
        
        // Render filtered products for current page
        renderProducts(getPaginatedProducts(filteredProducts, currentPage));
        
        // Always render top rated products with original unfiltered list
        renderTopRatedProducts(getTopRatedProducts());
        
        hideLoading();
    }, 500);
}

// Enhanced product data for premium electronics
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

// Shopping Cart Module - Enhanced with wishlist functionality
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
    let wishlist = JSON.parse(localStorage.getItem('technex-wishlist')) || [];
    
    // Initialize cart
    function init() {
        setupEventListeners();
        updateCartCount();
        updateWishlistButtons();
    }
    
    // Event listeners
    function setupEventListeners() {
        floatingCart.addEventListener('click', toggleCart);
        closeCartBtn.addEventListener('click', toggleCart);
        cartOverlay.addEventListener('click', toggleCart);
        checkoutBtn.addEventListener('click', proceedToCheckout);
        viewCartBtn.addEventListener('click', viewCartPage);
        continueShoppingBtn.addEventListener('click', toggleCart);
    }
    
    // Toggle cart visibility
    function toggleCart() {
        cartPopup.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        updateCartUI();
    }
    
    // Update wishlist buttons state
    function updateWishlistButtons() {
        wishlist.forEach(productId => {
            document.querySelectorAll(`.wishlist-btn[data-id="${productId}"]`).forEach(btn => {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-heart"></i>';
            });
        });
    }
    
    // Update cart UI
    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'flex';
            cartItemsContainer.appendChild(emptyCartMessage);
        } else {
            emptyCartMessage.style.display = 'none';
            
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
        
        subtotalAmount.textContent = formatPrice(subtotal);
        totalAmount.textContent = formatPrice(subtotal);
        
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
    function addToCart(product, button) {
        // Add to cart
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        // Update button state if provided
        if (button) {
            button.innerHTML = '<i class="fas fa-check"></i> ADDED';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                button.innerHTML = 'ADD TO CART <i class="fas fa-shopping-cart"></i>';
                button.style.backgroundColor = '';
            }, 2000);
        }
        
        updateCartCount();
        showNotification(`${product.name} added to cart`);
        
        // Save to localStorage
        localStorage.setItem('technex-cart', JSON.stringify(cart));
    }
    
    // Toggle wishlist item
    function toggleWishlist(productId) {
        const index = wishlist.indexOf(productId);
        if (index === -1) {
            wishlist.push(productId);
            showNotification('Added to wishlist');
        } else {
            wishlist.splice(index, 1);
            showNotification('Removed from wishlist');
        }
        
        // Update all wishlist buttons for this product
        document.querySelectorAll(`.wishlist-btn[data-id="${productId}"]`).forEach(btn => {
            btn.classList.toggle('active');
            btn.innerHTML = `<i class="${wishlist.includes(productId) ? 'fas' : 'far'} fa-heart"></i>`;
        });
        
        // Save to localStorage
        localStorage.setItem('technex-wishlist', JSON.stringify(wishlist));
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
            alert('Proceeding to checkout with ' + cart.length + ' items');
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
    
    // Public API
    return {
        init,
        addToCart,
        toggleCart,
        toggleWishlist
    };
})();

// Helper function to format price
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(price);
}

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const topRatedCarousel = document.querySelector('.top-rated-carousel');
const priceSort = document.getElementById('price-sort');
const filterPills = document.querySelectorAll('.filter-pill');
const loadingOverlay = document.querySelector('.loading-overlay');
const pageItems = document.querySelectorAll('.page-item:not(.prev):not(.next)');
const prevBtn = document.querySelector('.page-item.prev');
const nextBtn = document.querySelector('.page-item.next');
const priceMin = document.getElementById('price-min');
const priceMax = document.getElementById('price-max');
const rangeMin = document.querySelector('.range-min');
const rangeMax = document.querySelector('.range-max');
const progress = document.querySelector('.progress');
const resetFilters = document.querySelector('.reset-filters');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const searchBtn = document.querySelector('.nav-icons a[href="#"]:first-child');
const userBtn = document.querySelector('.nav-icons a[href="#"]:nth-child(2)');
const cartBtn = document.querySelector('.nav-icons a[href="#"]:last-child');
const viewAllBtn = document.querySelector('.view-all');
const dealButtons = document.querySelectorAll('.deal-btn');
const featuredBtn = document.querySelector('.featured-btn');
const bannerButtons = document.querySelectorAll('.banner-buttons .btn');

// Shopping cart state
let currentPage = 1;
const productsPerPage = 6;

// Initialize the store
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(getPaginatedProducts(products, 1));
    renderTopRatedProducts(getTopRatedProducts());
    renderDealsProducts(getDealProducts());
    setupEventListeners();
    initPriceSlider();
    initTiltEffect();
    Cart.init(); // Initialize the cart module
});

// Helper functions
function getTopRatedProducts() {
    return [...products].filter(product => product.rating >= 4)
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 6);
}

function getDealProducts() {
    return [...products].filter(product => product.originalPrice && 
                        (product.originalPrice - product.price) / product.originalPrice >= 0.15)
                      .slice(0, 3);
}

function getPaginatedProducts(productsArray, page) {
    const startIdx = (page - 1) * productsPerPage;
    const endIdx = startIdx + productsPerPage;
    return productsArray.slice(startIdx, endIdx);
}

function formatCategory(category) {
    const names = {
        smartphone: "Smartphones",
        laptop: "Laptops",
        headphones: "Headphones",
        camera: "Cameras",
        smartwatch: "Smart Watches",
        audio: "Audio",
        tv: "TVs"
    };
    return names[category] || category;
}

// Render functions
function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productGrid.innerHTML = `
            <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 60px 0;">
                <h3>No products found matching your criteria</h3>
                <p>Try adjusting your filters or search terms</p>
                <button class="btn btn-primary" style="margin-top: 20px;" id="reset-filters-btn">Reset All Filters</button>
            </div>
        `;
        
        // Add event listener to reset filters button if it exists
        const resetBtn = document.getElementById('reset-filters-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', resetAllFilters);
        }
        
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card tilt-element';
        productCard.dataset.id = product.id;
        productCard.dataset.category = product.category;
        productCard.dataset.price = product.price;
        productCard.dataset.rating = product.rating;
        
        productCard.innerHTML = `
            ${product.isNew ? '<div class="product-badge">NEW</div>' : ''}
            <div class="product-card-img">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-actions">
                <button class="action-btn quick-view-btn" title="Quick view"><i class="far fa-eye"></i></button>
                <button class="action-btn wishlist-btn" data-id="${product.id}" title="Add to wishlist">
                    <i class="far fa-heart"></i>
                </button>
                <button class="action-btn compare-btn" title="Compare"><i class="fas fa-exchange-alt"></i></button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <span class="product-category">${formatCategory(product.category)}</span>
                <div class="pricing">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <button class="add-to-cart glow-border">ADD TO CART <i class="fas fa-shopping-cart"></i></button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

function renderTopRatedProducts(productsToRender) {
    topRatedCarousel.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card featured-card tilt-element';
        productCard.dataset.id = product.id;
        
        productCard.innerHTML = `
            <div class="top-rated-badge">
                <i class="fas fa-star"></i> TOP RATED
            </div>
            ${product.isNew ? '<div class="product-badge">NEW</div>' : ''}
            <div class="product-card-img">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-actions">
                <button class="action-btn quick-view-btn" title="Quick view"><i class="far fa-eye"></i></button>
                <button class="action-btn wishlist-btn" data-id="${product.id}" title="Add to wishlist">
                    <i class="far fa-heart"></i>
                </button>
                <button class="action-btn compare-btn" title="Compare"><i class="fas fa-exchange-alt"></i></button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="ratings">
                    ${'<i class="fas fa-star"></i>'.repeat(product.rating)}${'<i class="far fa-star"></i>'.repeat(5 - product.rating)}
                    <span class="review-count">(${product.reviews})</span>
                </div>
                <div class="pricing">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <button class="add-to-cart glow-border">ADD TO CART <i class="fas fa-shopping-cart"></i></button>
            </div>
        `;
        
        topRatedCarousel.appendChild(productCard);
    });
}

function renderDealsProducts(productsToRender) {
    const dealCards = document.querySelectorAll('.deal-card');
    
    productsToRender.forEach((product, index) => {
        if (index < dealCards.length) {
            const dealCard = dealCards[index];
            dealCard.dataset.id = product.id;
            
            // Update deal image
            const dealImg = dealCard.querySelector('.deal-img img');
            dealImg.src = product.image;
            dealImg.alt = product.name;
            
            // Update deal info
            dealCard.querySelector('.deal-title').textContent = product.name;
            dealCard.querySelector('.deal-desc').textContent = product.features.join(", ");
            dealCard.querySelector('.deal-current').textContent = formatPrice(product.price);
            dealCard.querySelector('.deal-original').textContent = formatPrice(product.originalPrice);
            
            // Calculate discount percentage
            const discount = Math.round((1 - product.price / product.originalPrice) * 100);
            dealCard.querySelector('.deal-badge').textContent = `${discount}% OFF`;
        }
    });
}

// Initialize price slider
function initPriceSlider() {
    const minVal = 0;
    const maxVal = 2000;
    
    priceMin.value = minVal;
    priceMax.value = maxVal;
    rangeMin.value = minVal;
    rangeMax.value = maxVal;
    progress.style.left = "0%";
    progress.style.right = "0%";
    
    rangeMin.addEventListener("input", updateMinRange);
    rangeMax.addEventListener("input", updateMaxRange);
    priceMin.addEventListener("input", updateMinInput);
    priceMax.addEventListener("input", updateMaxInput);
}

function updateMinRange() {
    const minVal = parseInt(rangeMin.value);
    const maxVal = parseInt(rangeMax.value);
    
    if (minVal > maxVal) {
        rangeMin.value = maxVal;
        priceMin.value = maxVal;
    } else {
        priceMin.value = minVal;
    }
    
    progress.style.left = (rangeMin.value / rangeMin.max) * 100 + "%";
    filterProducts();
}

function updateMaxRange() {
    const minVal = parseInt(rangeMin.value);
    const maxVal = parseInt(rangeMax.value);
    
    if (maxVal < minVal) {
        rangeMax.value = minVal;
        priceMax.value = minVal;
    } else {
        priceMax.value = maxVal;
    }
    
    progress.style.right = 100 - (rangeMax.value / rangeMax.max) * 100 + "%";
    filterProducts();
}

function updateMinInput() {
    const minVal = parseInt(priceMin.value);
    const maxVal = parseInt(priceMax.value);
    
    if (minVal < 0) {
        priceMin.value = 0;
        rangeMin.value = 0;
    } else if (minVal > 5000) {
        priceMin.value = 5000;
        rangeMin.value = 5000;
    } else {
        rangeMin.value = minVal;
    }
    
    if (parseInt(priceMin.value) > parseInt(priceMax.value)) {
        priceMax.value = priceMin.value;
        rangeMax.value = priceMin.value;
    }
    
    progress.style.left = (rangeMin.value / rangeMin.max) * 100 + "%";
    filterProducts();
}

function updateMaxInput() {
    const minVal = parseInt(priceMin.value);
    const maxVal = parseInt(priceMax.value);
    
    if (maxVal < 0) {
        priceMax.value = 0;
        rangeMax.value = 0;
    } else if (maxVal > 5000) {
        priceMax.value = 5000;
        rangeMax.value = 5000;
    } else {
        rangeMax.value = maxVal;
    }
    
    if (parseInt(priceMax.value) < parseInt(priceMin.value)) {
        priceMin.value = priceMax.value;
        rangeMin.value = priceMax.value;
    }
    
    progress.style.right = 100 - (rangeMax.value / rangeMax.max) * 100 + "%";
    filterProducts();
}

// Update pagination
function updatePagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    
    // Get the pagination container (assuming it has class 'pagination')
    const paginationContainer = document.querySelector('.pagination');
    
    // Clear all page items except prev/next buttons
    const allPageItems = paginationContainer.querySelectorAll('.page-item');
    allPageItems.forEach(item => {
        if (!item.classList.contains('prev') && !item.classList.contains('next')) {
            item.remove();
        }
    });
    
    // Create new page items
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('div');
        pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageItem.textContent = i;
        pageItem.addEventListener('click', () => {
            currentPage = i;
            filterProducts();
            window.scrollTo({ top: productGrid.offsetTop - 100, behavior: 'smooth' });
        });
        nextBtn.before(pageItem);
    }
    
    // Update prev/next button states
    prevBtn.style.visibility = currentPage === 1 ? 'hidden' : 'visible';
    nextBtn.style.visibility = currentPage === totalPages ? 'hidden' : 'visible';
}

// Quick view modal
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
                            ${'<i class="fas fa-star"></i>'.repeat(product.rating)}${'<i class="far fa-star"></i>'.repeat(5 - product.rating)}
                        </div>
                        <span style="color: #666;">(${product.reviews} reviews)</span>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <span style="font-size: 24px; font-weight: bold; color: var(--primary);">
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
                    
                    <button class="add-to-cart-modal" style="
                        padding: 12px 24px;
                        background: var(--primary);
                        color: white;
                        border: none;
                        border-radius: 4px;
                        font-weight: 500;
                        cursor: pointer;
                        transition: background 0.3s;
                        width: 100%;
                        margin-bottom: 15px;
                    ">
                        ADD TO CART
                    </button>
                    
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
                    ">
                        BUY NOW
                    </button>
                </div>
            </div>
            
            <div style="margin-top: 30px;">
                <h3 style="margin-bottom: 15px;">Product Details</h3>
                <p style="color: #555; line-height: 1.6;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
                    Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
                    rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna 
                    non est bibendum non venenatis nisl tempor.
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
    modal.querySelector('.add-to-cart-modal').addEventListener('click', () => {
        Cart.addToCart(product);
    });
    
    // Buy now from modal
    modal.querySelector('.buy-now-btn').addEventListener('click', () => {
        alert(`Proceeding to checkout with ${product.name}`);
    });
}

// Reset all filters
function resetAllFilters() {
    showLoading();
    
    // Reset price range
    priceMin.value = 0;
    priceMax.value = 2000;
    rangeMin.value = 0;
    rangeMax.value = 2000;
    progress.style.left = "0%";
    progress.style.right = "0%";
    
    // Reset category filter
    filterPills.forEach(p => p.classList.remove('active'));
    document.querySelector('.filter-pill[data-category="all"]').classList.add('active');
    
    // Reset sort
    priceSort.value = '';
    
    // Reset pagination
    currentPage = 1;
    
    setTimeout(() => {
        renderProducts(getPaginatedProducts(products, 1));
        updatePagination(products.length);
        hideLoading();
    }, 500);
}

// Loading functions
function showLoading() {
    document.body.classList.add('loading');
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    document.body.classList.remove('loading');
    loadingOverlay.classList.remove('active');
}

// Initialize 3D tilt effect
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-element');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            element.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Search functionality
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const searchTerm = prompt("Enter search term:");
        if (searchTerm) {
            const filtered = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
            renderProducts(getPaginatedProducts(filtered, 1));
            updatePagination(filtered.length);
        }
    });
    
    // User account
    userBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert("Account functionality would go here");
    });
    
    // Cart view
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        Cart.toggleCart();
    });
    
    // Price sorting
    priceSort.addEventListener('change', filterProducts);
    
    // Category filtering
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentPage = 1;
            filterProducts();
        });
    });
    
    // Reset filters
    resetFilters.addEventListener('click', resetAllFilters);
    
    // View all top rated
    viewAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.filter-pill[data-category="all"]').click();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Deal buttons
    dealButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const dealCard = e.target.closest('.deal-card');
            const productId = parseInt(dealCard.dataset.id);
            const product = products.find(p => p.id === productId);
            Cart.addToCart(product);
        });
    });
    
    // Featured deal button
    featuredBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const product = products.find(p => p.name.includes("iPhone 14 Pro Max"));
        Cart.addToCart(product);
    });
    
    // Banner buttons
    bannerButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent.includes("Shop Now")) {
                document.querySelector('.filter-pill[data-category="all"]').click();
            } else {
                document.querySelector('.deals-section').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Dynamic event delegation for product cards
    document.addEventListener('click', (e) => {
        // Add to cart
        if (e.target.closest('.add-to-cart')) {
            const button = e.target.closest('.add-to-cart');
            const productCard = button.closest('.product-card');
            const productId = parseInt(productCard.dataset.id);
            const product = products.find(p => p.id === productId);
            Cart.addToCart(product, button);
        }
        
     
        
        // Quick view
        if (e.target.closest('.quick-view-btn') || e.target.closest('.quick-view-btn i')) {
            const button = e.target.closest('.quick-view-btn');
            const productCard = button.closest('.product-card');
            const productId = parseInt(productCard.dataset.id);
            const product = products.find(p => p.id === productId);
            showQuickView(product);
        }
        
        // Compare
        if (e.target.closest('.compare-btn') || e.target.closest('.compare-btn i')) {
            const button = e.target.closest('.compare-btn');
            const productCard = button.closest('.product-card');
            const productId = parseInt(productCard.dataset.id);
            alert(`Product ${productId} added to comparison`);
        }
    });
    
    // Pagination controls
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            filterProducts();
            window.scrollTo({ top: productGrid.offsetTop - 100, behavior: 'smooth' });
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(products.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            filterProducts();
            window.scrollTo({ top: productGrid.offsetTop - 100, behavior: 'smooth' });
        }
    });
}

// Countdown timer for featured deal
function updateCountdown() {
    const now = new Date();
    const endTime = new Date();
    endTime.setDate(now.getDate() + 2); // Set to 2 days from now
    endTime.setHours(23, 59, 59, 999);
    
    const diff = endTime - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.querySelector('.featured-timer-value:nth-child(1)').textContent = days.toString().padStart(2, '0');
    document.querySelector('.featured-timer-value:nth-child(2)').textContent = hours.toString().padStart(2, '0');
    document.querySelector('.featured-timer-value:nth-child(3)').textContent = minutes.toString().padStart(2, '0');
    document.querySelector('.featured-timer-value:nth-child(4)').textContent = seconds.toString().padStart(2, '0');
    
    // Also update deal timers
    document.querySelectorAll('.deal-timer .timer-value').forEach((el, index) => {
        if (index % 3 === 0) el.textContent = days.toString().padStart(2, '0');
        else if (index % 3 === 1) el.textContent = hours.toString().padStart(2, '0');
        else el.textContent = minutes.toString().padStart(2, '0');
    });
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();












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