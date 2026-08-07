// ===== AUTHENTICATION SYSTEM =====
let currentUser = null;
let generatedOTP = null;
let otpLoginEmail = null;
let otpMode = null;
let resetEmail = null;
let resetOTP = null;
let users = JSON.parse(localStorage.getItem('cartrescue_users')) || [
    {
        id: 1,
        name: "Demo User",
        email: "demo@cartrescue.com",
        phone: "9876543210",
        password: "demo123",
        createdAt: new Date().toISOString()
    }
];

// Save demo user if creating fresh
if (!localStorage.getItem('cartrescue_users')) {
    localStorage.setItem('cartrescue_users', JSON.stringify(users));
}

// Initialize page on load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

// Check if user is already logged in
function checkAuth() {
    const storedUser = localStorage.getItem('cartrescue_currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        showMainPage();
    } else {
        showAuthContainer();
    }
}

// Show Auth Container
function showAuthContainer() {
    document.getElementById('authContainer').classList.remove('hidden');
    document.getElementById('mainPage').classList.add('hidden');
    switchToLogin();
}

// Show Main Page
function showMainPage() {
    document.getElementById('authContainer').classList.add('hidden');
    document.getElementById('mainPage').classList.remove('hidden');
    loadProducts('all');
    resetTimer();
    updateUserDisplay();
}

// ===== PAGE NAVIGATION =====
function switchToLogin(event) {
    if (event) event.preventDefault();
    hideAllAuthPages();
    document.getElementById('loginPage').classList.add('active');
}

function switchToSignup(event) {
    if (event) event.preventDefault();
    hideAllAuthPages();
    document.getElementById('signupPage').classList.add('active');
}

function switchToOTP(mode, email) {
    otpMode = mode;
    otpLoginEmail = email;
    hideAllAuthPages();
    document.getElementById('otpPage').classList.add('active');
    generatedOTP = generateOTP();
    document.getElementById('otpGenerated').textContent = `Demo OTP for ${email}: ${generatedOTP}`;
}

function switchToForgotPassword(event) {
    if (event) event.preventDefault();
    hideAllAuthPages();
    document.getElementById('forgotPasswordPage').classList.add('active');
}

function switchToResetPassword(email) {
    resetEmail = email;
    hideAllAuthPages();
    document.getElementById('resetPasswordPage').classList.add('active');
}

function hideAllAuthPages() {
    document.querySelectorAll('.auth-page').forEach(page => {
        page.classList.remove('active');
    });
}

// ===== LOGIN HANDLER =====
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('cartrescue_currentUser', JSON.stringify(user));
        showNotification('Login successful! Welcome back!');
        setTimeout(() => {
            showMainPage();
        }, 500);
    } else {
        showNotification('Invalid email or password', 'error');
    }
    
    document.getElementById('loginForm').reset();
}

function startEmailOTPLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    if (!email) {
        showNotification('Enter your email to receive OTP', 'error');
        return;
    }
    otpLoginEmail = email;
    switchToOTP('login', email);
    showNotification('OTP sent to your email (demo)');
}

// ===== SIGNUP HANDLER =====
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validation
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showNotification('Email already registered!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters long!', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        phone,
        password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('cartrescue_users', JSON.stringify(users));
    
    showNotification('Account created! Please verify OTP');
    setTimeout(() => {
        switchToOTP('signup', email);
    }, 500);
    
    document.getElementById('signupForm').reset();
}

// ===== OTP VERIFICATION =====
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function handleOTPVerification(event) {
    event.preventDefault();
    
    const enteredOTP = document.getElementById('otpInput').value;
    
    if (enteredOTP === generatedOTP) {
        if (otpMode === 'login') {
            let user = users.find(u => u.email === otpLoginEmail);
            if (!user) {
                user = {
                    id: Date.now(),
                    name: otpLoginEmail.split('@')[0],
                    email: otpLoginEmail,
                    phone: '',
                    password: '',
                    createdAt: new Date().toISOString()
                };
                users.push(user);
                localStorage.setItem('cartrescue_users', JSON.stringify(users));
            }
            currentUser = user;
        } else {
            currentUser = users.find(u => u.email === otpLoginEmail);
        }
        localStorage.setItem('cartrescue_currentUser', JSON.stringify(currentUser));
        showNotification('Email verified successfully!');
        setTimeout(() => {
            showMainPage();
        }, 500);
    } else {
        showNotification('Invalid OTP. Please try again!', 'error');
    }
    
    document.getElementById('otpForm').reset();
}

function resendOTP(event) {
    event.preventDefault();
    generatedOTP = generateOTP();
    document.getElementById('otpGenerated').textContent = `Demo OTP (Resent): ${generatedOTP}`;
    showNotification('OTP resent successfully!');
}

// ===== FORGOT PASSWORD =====
function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('forgotEmail').value;
    const userExists = users.find(u => u.email === email);
    
    if (userExists) {
        resetEmail = email;
        resetOTP = generateOTP();
        showNotification('OTP sent to your email');
        setTimeout(() => {
            switchToResetPassword(email);
            // Display OTP for demo purposes
            const resetOtpDisplay = document.createElement('small');
            resetOtpDisplay.textContent = `Demo OTP: ${resetOTP}`;
            resetOtpDisplay.style.cssText = 'color: #2563eb; margin-top: 8px; display: block; text-align: center;';
            document.querySelector('#resetPasswordForm .form-group').appendChild(resetOtpDisplay);
        }, 500);
    } else {
        showNotification('Email not found!', 'error');
    }
    
    document.getElementById('forgotPasswordForm').reset();
}

// ===== RESET PASSWORD =====
function handleResetPassword(event) {
    event.preventDefault();
    
    const otpInput = document.getElementById('resetOTP').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;
    
    if (otpInput !== resetOTP) {
        showNotification('Invalid OTP!', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification('Password must be at least 6 characters long!', 'error');
        return;
    }
    
    // Update user password
    const userIndex = users.findIndex(u => u.email === resetEmail);
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('cartrescue_users', JSON.stringify(users));
        
        showNotification('Password reset successfully!');
        setTimeout(() => {
            switchToLogin();
            document.getElementById('resetPasswordForm').reset();
        }, 500);
    }
}

// ===== LOGOUT =====
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        cartItems = [];
        localStorage.removeItem('cartrescue_currentUser');
        showNotification('Logged out successfully');
        setTimeout(() => {
            showAuthContainer();
            document.getElementById('loginForm').reset();
        }, 500);
    }
}

// ===== USER MENU =====
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.toggle('active');
    document.addEventListener('click', closeUserMenuOnClickOutside);
}

function closeUserMenuOnClickOutside(event) {
    const userMenu = document.getElementById('userMenu');
    const userBtn = document.querySelector('.user-profile-btn');
    
    if (!userMenu.contains(event.target) && !userBtn.contains(event.target)) {
        userMenu.classList.remove('active');
    }
}

function updateUserDisplay() {
    if (currentUser) {
        document.getElementById('userName').textContent = currentUser.name.split(' ')[0];
        document.getElementById('userMenuName').textContent = currentUser.name;
        document.getElementById('userMenuEmail').textContent = currentUser.email;
    }
}

function viewProfile() {
    showNotification('Profile page coming soon!');
    document.getElementById('userMenu').classList.remove('active');
}

function viewOrders() {
    showNotification('Orders page coming soon!');
    document.getElementById('userMenu').classList.remove('active');
}

function viewSettings() {
    showNotification('Settings page coming soon!');
    document.getElementById('userMenu').classList.remove('active');
}

// ===== SHOPPING FUNCTIONALITY =====
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 2999,
        category: "electronics",
        rating: 4.5,
        reviews: 128,
        image: "https://loremflickr.com/320/240/headphones?lock=101"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 4999,
        category: "electronics",
        rating: 4.7,
        reviews: 95,
        image: "https://loremflickr.com/320/240/smartwatch?lock=102"
    },
    {
        id: 3,
        name: "Sports Shoes",
        price: 3499,
        category: "fashion",
        rating: 4.6,
        reviews: 156,
        image: "https://loremflickr.com/320/240/sports-shoes?lock=103"
    },
    {
        id: 4,
        name: "Running Sneakers",
        price: 2899,
        category: "fashion",
        rating: 4.4,
        reviews: 82,
        image: "https://loremflickr.com/320/240/running-shoes?lock=104"
    },
    {
        id: 5,
        name: "USB-C Cable",
        price: 599,
        category: "accessories",
        rating: 4.3,
        reviews: 234,
        image: "https://loremflickr.com/320/240/usb-c-cable?lock=105"
    },
    {
        id: 6,
        name: "Phone Case",
        price: 899,
        category: "accessories",
        rating: 4.5,
        reviews: 167,
        image: "https://loremflickr.com/320/240/phone-case?lock=106"
    },
    {
        id: 7,
        name: "Wireless Mouse",
        price: 1499,
        category: "electronics",
        rating: 4.6,
        reviews: 112,
        image: "https://loremflickr.com/320/240/wireless-mouse?lock=107"
    },
    {
        id: 8,
        name: "Mechanical Keyboard",
        price: 5999,
        category: "electronics",
        rating: 4.8,
        reviews: 203,
        image: "https://loremflickr.com/320/240/mechanical-keyboard?lock=108"
    },
    {
        id: 9,
        name: "Premium T-Shirt",
        price: 1299,
        category: "fashion",
        rating: 4.4,
        reviews: 89,
        image: "https://loremflickr.com/320/240/t-shirt?lock=109"
    },
    {
        id: 10,
        name: "Laptop Stand",
        price: 2199,
        category: "accessories",
        rating: 4.7,
        reviews: 145,
        image: "https://loremflickr.com/320/240/laptop-stand?lock=110"
    },
    {
        id: 11,
        name: "iPhone 15 Pro",
        price: 79999,
        category: "electronics",
        rating: 4.9,
        reviews: 542,
        image: "https://loremflickr.com/320/240/iphone?lock=111"
    },
    {
        id: 12,
        name: "Samsung Galaxy S24",
        price: 74999,
        category: "electronics",
        rating: 4.8,
        reviews: 438,
        image: "https://loremflickr.com/320/240/samsung-galaxy?lock=112"
    },
    {
        id: 13,
        name: "iPad Air",
        price: 54999,
        category: "electronics",
        rating: 4.7,
        reviews: 289,
        image: "https://loremflickr.com/320/240/ipad?lock=113"
    },
    {
        id: 14,
        name: "MacBook Pro 14\"",
        price: 189999,
        category: "electronics",
        rating: 4.9,
        reviews: 367,
        image: "https://loremflickr.com/320/240/macbook-pro?lock=114"
    },
    {
        id: 15,
        name: "Dell XPS 15 Laptop",
        price: 149999,
        category: "electronics",
        rating: 4.8,
        reviews: 215,
        image: "https://loremflickr.com/320/240/dell-xps?lock=115"
    },
    {
        id: 16,
        name: "Sony WH-1000XM5",
        price: 24999,
        category: "electronics",
        rating: 4.9,
        reviews: 612,
        image: "https://loremflickr.com/320/240/headphones?lock=116"
    },
    {
        id: 17,
        name: "Canon EOS R7 Camera",
        price: 89999,
        category: "electronics",
        rating: 4.8,
        reviews: 178,
        image: "https://loremflickr.com/320/240/camera?lock=117"
    },
    {
        id: 18,
        name: "DJI Air 3S Drone",
        price: 119999,
        category: "electronics",
        rating: 4.7,
        reviews: 156,
        image: "https://loremflickr.com/320/240/drone?lock=118"
    },
    {
        id: 19,
        name: "Gaming Laptop ASUS ROG",
        price: 159999,
        category: "electronics",
        rating: 4.9,
        reviews: 334,
        image: "https://loremflickr.com/320/240/gaming-laptop?lock=119"
    },
    {
        id: 20,
        name: "Monitor 4K 27 inch",
        price: 34999,
        category: "electronics",
        rating: 4.6,
        reviews: 201,
        image: "https://loremflickr.com/320/240/monitor?lock=120"
    },
    {
        id: 21,
        name: "SSD 1TB NVMe",
        price: 8999,
        category: "electronics",
        rating: 4.7,
        reviews: 423,
        image: "https://loremflickr.com/320/240/ssd?lock=121"
    },
    {
        id: 22,
        name: "Graphics Card RTX 4070",
        price: 59999,
        category: "electronics",
        rating: 4.8,
        reviews: 287,
        image: "https://loremflickr.com/320/240/graphics-card?lock=122"
    },
    {
        id: 23,
        name: "Pixel Watch 2",
        price: 19999,
        category: "electronics",
        rating: 4.6,
        reviews: 134,
        image: "https://loremflickr.com/320/240/smartwatch?lock=123"
    },
    {
        id: 24,
        name: "Apple AirPods Pro",
        price: 24999,
        category: "electronics",
        rating: 4.7,
        reviews: 523,
        image: "https://loremflickr.com/320/240/airpods?lock=124"
    },
    {
        id: 25,
        name: "External HDD 4TB",
        price: 5999,
        category: "electronics",
        rating: 4.5,
        reviews: 312,
        image: "https://loremflickr.com/320/240/external-hard-drive?lock=125"
    },
    {
        id: 26,
        name: "USB Hub 7-Port",
        price: 1999,
        category: "accessories",
        rating: 4.4,
        reviews: 189,
        image: "https://loremflickr.com/320/240/usb-hub?lock=126"
    },
    {
        id: 27,
        name: "Webcam Logitech 4K",
        price: 12999,
        category: "electronics",
        rating: 4.6,
        reviews: 267,
        image: "https://loremflickr.com/320/240/webcam?lock=127"
    },
    {
        id: 28,
        name: "Portable Speaker JBL",
        price: 8999,
        category: "electronics",
        rating: 4.5,
        reviews: 401,
        image: "https://loremflickr.com/320/240/portable-speaker?lock=128"
    },
    {
        id: 29,
        name: "Power Bank 30000mAh",
        price: 3499,
        category: "accessories",
        rating: 4.6,
        reviews: 568,
        image: "https://loremflickr.com/320/240/power-bank?lock=129"
    },
    {
        id: 30,
        name: "WiFi Router Mesh",
        price: 14999,
        category: "electronics",
        rating: 4.7,
        reviews: 245,
        image: "https://loremflickr.com/320/240/wifi-router?lock=130"
    },
    {
        id: 31,
        name: "Printer HP LaserJet",
        price: 24999,
        category: "electronics",
        rating: 4.6,
        reviews: 156,
        image: "https://loremflickr.com/320/240/printer?lock=131"
    },
    {
        id: 32,
        name: "Bluetooth Speaker UE",
        price: 6999,
        category: "electronics",
        rating: 4.5,
        reviews: 289,
        image: "https://loremflickr.com/320/240/bluetooth-speaker?lock=132"
    }
];

// Shopping Cart
let cartItems = [];
let discountApplied = false;
const DISCOUNT_PERCENT = 10;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadProducts('all');
    resetTimer();
});

// Load products to page
function loadProducts(category = 'all') {
    const container = document.getElementById('productsContainer');
    if (!container) {
        console.error('Products container not found');
        return;
    }
    
    container.innerHTML = '';
    
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    console.log(`Loading ${filtered.length} products for category: ${category}`);

    if (filtered.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found for this category</p>';
        return;
    }

    filtered.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'card';
        productCard.innerHTML = `
            <div class="card-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="rating-badge">${product.rating} ⭐</div>
            </div>
            <div class="card-content">
                <h3>${product.name}</h3>
                <div class="rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                    <span class="review-count">(${product.reviews} reviews)</span>
                </div>
                <p class="price">₹${product.price.toLocaleString()}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Filter products by category
function filterByCategory(category) {
    console.log('Filtering by category:', category);
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
    loadProducts(category);
}

// Search products
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const container = document.getElementById('productsContainer');
    const cards = container.querySelectorAll('.card');

    cards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`${product.name} added to cart!`);
    resetTimer();
}

// Update cart display
function updateCart() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItemsContainer.innerHTML = cartItems.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">₹${item.price.toLocaleString()}</p>
                </div>
                <div class="item-quantity">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    updateCartSummary();
}

// Increase quantity
function increaseQuantity(productId) {
    const item = cartItems.find(i => i.id === productId);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

// Decrease quantity
function decreaseQuantity(productId) {
    const item = cartItems.find(i => i.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCart();
}

// Clear all cart
function clearCart() {
    if (cartItems.length === 0) return;
    if (confirm('Are you sure you want to clear the cart?')) {
        cartItems = [];
        discountApplied = false;
        updateCart();
    }
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = discountApplied ? Math.floor(subtotal * DISCOUNT_PERCENT / 100) : 0;
    const total = subtotal - discount;

    document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString()}`;
    document.getElementById('discount').textContent = `₹${discount.toLocaleString()}`;
    document.getElementById('total').textContent = `₹${total.toLocaleString()}`;
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Apply discount
function applyDiscount() {
    discountApplied = true;
    updateCartSummary();
    closePopup();
    showNotification('10% discount applied to your order!');
}

// Checkout
function checkout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = document.getElementById('total').textContent;
    alert(`Order placed successfully!\nTotal: ${total}\n\nThank you for your purchase!`);
    cartItems = [];
    discountApplied = false;
    updateCart();
    toggleCart();
}

// Close popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification' + (type === 'error' ? ' notification-error' : '');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Reset timer for popup
let timer;
function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (cartItems.length > 0 && !discountApplied) {
            document.getElementById('popup').style.display = 'block';
        }
    }, 15000); // 15 seconds
}