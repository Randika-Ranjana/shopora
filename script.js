document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const homeLink = document.getElementById('home-link');
    const productsLink = document.getElementById('products-link');
    const cartLink = document.getElementById('cart-link');
    const shopNowBtn = document.getElementById('shop-now-btn');
    const homeSection = document.getElementById('home-section');
    const productsSection = document.getElementById('products-section');
    const cartSection = document.getElementById('cart-section');
    const checkoutSection = document.getElementById('checkout-section');
    const confirmationSection = document.getElementById('confirmation-section');
    const productsContainer = document.getElementById('products-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const cartCount = document.getElementById('cart-count');
    const categoryFilter = document.getElementById('category-filter');
    const searchBox = document.getElementById('search-box');
    const checkoutBtn = document.getElementById('checkout-btn');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const categoryCards = document.querySelectorAll('.category-card');
    
    // Price elements
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const checkoutSubtotalElement = document.getElementById('checkout-subtotal');
    const checkoutTaxElement = document.getElementById('checkout-tax');
    const checkoutTotalElement = document.getElementById('checkout-total');
    
    // Product data
    const products = [
        {
            id: 1,
            name: 'Wireless Headphones',
            price: 32990,
            category: 'electronics',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 65990,
            category: 'electronics',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 3,
            name: 'Laptop Backpack',
            price: 16490,
            category: 'clothing',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 4,
            name: 'Cotton T-Shirt',
            price: 6590,
            category: 'clothing',
            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 5,
            name: 'Coffee Maker',
            price: 26390,
            category: 'home',
            image: 'https://images.unsplash.com/photo-1556910006-9f4f7f4c2e4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 6,
            name: 'Blender',
            price: 19790,
            category: 'home',
            image: 'https://cdn.pixabay.com/photo/2021/03/09/18/22/woman-6082552_1280.jpg'
        },
        {
            id: 7,
            name: 'Smartphone',
            price: 230490,
            category: 'electronics',
            image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 8,
            name: 'Running Shoes',
            price: 29590,
            category: 'clothing',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
            id: 9,
            name: 'Desk Lamp',
            price: 9890,
            category: 'home',
            image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
            id: 10,
            name: 'Jeans',
            price: 13190,
            category: 'clothing',
            image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
    ];
    
    // Cart state
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Initialize the app
    function init() {
        renderProducts();
        updateCartCount();
        setupEventListeners();
        showSection(homeSection);
        initBannerSlider(); // Initialize the banner slider
    }
    
    // ====================== Banner Slider Function ======================
    function initBannerSlider() {
        const bannerCards = document.querySelectorAll('.banner-slider .banner-card');
        let currentIndex = 0;
        let sliderInterval;
        
        // Function to show the current banner card
        const showBanner = (index) => {
            // Remove active class from all cards
            bannerCards.forEach(card => {
                card.classList.remove('active');
                card.style.opacity = '0';
            });
            
            // Add active class to current card
            bannerCards[index].classList.add('active');
            
            // Fade in effect
            setTimeout(() => {
                bannerCards[index].style.opacity = '1';
            }, 10);
        };
        
        // Auto-rotate banners
        const rotateBanners = () => {
            currentIndex = (currentIndex + 1) % bannerCards.length;
            showBanner(currentIndex);
        };
        
        // Initialize the slider
        const startSlider = () => {
            showBanner(currentIndex);
            sliderInterval = setInterval(rotateBanners, 3000); // Rotate every 3 seconds
        };
        
        // Start the slider
        startSlider();
        
        // Pause on hover
        const bannerSliderContainer = document.querySelector('.banner-slider');
        if (bannerSliderContainer) {
            bannerSliderContainer.addEventListener('mouseenter', () => {
                clearInterval(sliderInterval);
            });
            
            bannerSliderContainer.addEventListener('mouseleave', () => {
                clearInterval(sliderInterval);
                sliderInterval = setInterval(rotateBanners, 3000);
            });
        }
    }
    // ====================== End Banner Slider ======================
    
    // Set up event listeners
    function setupEventListeners() {
        // Navigation links
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(homeSection);
        });
        
        productsLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(productsSection);
        });
        
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(cartSection);
            renderCart();
        });
        
        // Buttons
        shopNowBtn.addEventListener('click', () => {
            showSection(productsSection);
        });
        
        checkoutBtn.addEventListener('click', () => {
            showSection(checkoutSection);
            renderCheckout();
        });
        
        continueShoppingBtn.addEventListener('click', () => {
            showSection(homeSection);
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateProductCardStates();
        });
        
        // Filter controls
        categoryFilter.addEventListener('change', renderProducts);
        searchBox.addEventListener('input', renderProducts);
        
        // Category cards
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                categoryFilter.value = card.dataset.category;
                showSection(productsSection);
                renderProducts();
            });
        });
        
        // Checkout form
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showSection(confirmationSection);
        });
        
        // Payment method toggle
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const creditCardInfo = document.getElementById('credit-card-info');
                if (this.value === 'credit') {
                    creditCardInfo.style.display = 'block';
                } else {
                    creditCardInfo.style.display = 'none';
                }
            });
        });
    }
    
    // Show a specific section and hide others
    function showSection(section) {
        const sections = [homeSection, productsSection, cartSection, checkoutSection, confirmationSection];
        sections.forEach(sec => {
            if (sec === section) {
                sec.classList.remove('hidden');
                sec.classList.add('fade-in');
            } else {
                sec.classList.add('hidden');
                sec.classList.remove('fade-in');
            }
        });
    }
    
    // Render products based on filters
    function renderProducts() {
        const category = categoryFilter.value;
        const searchTerm = searchBox.value.toLowerCase();
        
        const filteredProducts = products.filter(product => {
            const matchesCategory = category === 'all' || product.category === category;
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                                 product.category.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
        
        productsContainer.innerHTML = '';
        
        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = '<p class="no-products">No products found. Try a different search.</p>';
            return;
        }
        
        filteredProducts.forEach(product => {
            const isInCart = cart.some(item => item.id === product.id);
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card slide-in';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <span class="category">${product.category}</span>
                    <div class="price">Rs. ${(product.price / 100).toFixed(2)}</div>
                    <button class="add-to-cart ${isInCart ? 'added' : ''}" data-id="${product.id}">
                        ${isInCart ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
        
        // Add event listeners to the add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                toggleCartItem(productId);
            });
        });
    }
    
    // Toggle item in cart (add or remove)
    function toggleCartItem(productId) {
        const product = products.find(p => p.id === productId);
        const existingItemIndex = cart.findIndex(item => item.id === productId);
        
        if (existingItemIndex !== -1) {
            // If item exists in cart, remove it
            cart.splice(existingItemIndex, 1);
        } else {
            // If item doesn't exist, add it with quantity 1
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateProductCardStates();
        
        // If we're on the cart page, update it
        if (!cartSection.classList.contains('hidden')) {
            renderCart();
        }
    }
    
    // Update all product card states based on current cart
    function updateProductCardStates() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            const productId = parseInt(button.dataset.id);
            const isInCart = cart.some(item => item.id === productId);
            
            button.textContent = isInCart ? 'Added to Cart' : 'Add to Cart';
            button.classList.toggle('added', isInCart);
        });
    }
    
    // Update cart count
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    // Render cart items
    function renderCart() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty.</p>
                    <button id="empty-cart-btn" class="add-to-cart">Continue Shopping</button>
                </div>
            `;
            
            document.getElementById('empty-cart-btn').addEventListener('click', () => {
                showSection(productsSection);
            });
            
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = 0.5;
            
            // Reset totals
            updateCartTotals(0);
            
            return;
        }
        
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = 1;
        
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="category">${item.category}</p>
                    <p class="price">Rs. ${(item.price / 100).toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Add event listeners for quantity buttons and remove buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                updateItemQuantity(productId, -1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                updateItemQuantity(productId, 1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                removeCartItem(productId);
            });
        });
        
        updateCartTotals(subtotal);
    }
    
    // Update item quantity
    function updateItemQuantity(productId, change) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += change;
            
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
            updateProductCardStates();
        }
    }
    
    // Remove item from cart
    function removeCartItem(productId) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
            updateProductCardStates();
        }
    }
    
    // Update cart totals
    function updateCartTotals(subtotal) {
        const tax = subtotal * 0.08; // 8% tax rate
        const total = subtotal + tax + 399; // Rs. 399 shipping
        
        subtotalElement.textContent = `Rs. ${(subtotal / 100).toFixed(2)}`;
        taxElement.textContent = `Rs. ${(tax / 100).toFixed(2)}`;
        totalElement.textContent = `Rs. ${(total / 100).toFixed(2)}`;
    }
    
    // Render checkout items
    function renderCheckout() {
        checkoutItemsContainer.innerHTML = '';
        
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <div class="name">${item.name} x${item.quantity}</div>
                <div class="price">Rs. ${(itemTotal / 100).toFixed(2)}</div>
            `;
            
            checkoutItemsContainer.appendChild(orderItem);
        });
        
        const tax = subtotal * 0.08; // 8% tax rate
        const total = subtotal + tax + 399; // Rs. 399 shipping
        
        checkoutSubtotalElement.textContent = `Rs. ${(subtotal / 100).toFixed(2)}`;
        checkoutTaxElement.textContent = `Rs. ${(tax / 100).toFixed(2)}`;
        checkoutTotalElement.textContent = `Rs. ${(total / 100).toFixed(2)}`;
    }
    
    // Initialize the application
    init();
});