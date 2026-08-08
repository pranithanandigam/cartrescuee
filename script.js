/* =========================================================
   CART RESCUE
   COMPLETE JAVASCRIPT
========================================================= */


/* ================= PRODUCTS ================= */

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2999,
        rating: 4.5,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        optionType: "headphone"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 4999,
        rating: 4.7,
        reviews: 95,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        optionType: "watch"
    },

    {
        id: 3,
        name: "Sports Shoes",
        category: "Fashion",
        price: 3499,
        rating: 4.6,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        optionType: "shoe"
    },

    {
        id: 4,
        name: "Running Sneakers",
        category: "Fashion",
        price: 2899,
        rating: 4.4,
        reviews: 82,
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3",
        optionType: "shoe"
    },

    {
        id: 5,
        name: "Phone Case",
        category: "Accessories",
        price: 899,
        rating: 4.5,
        reviews: 167,
        image: "https://images.unsplash.com/photo-1601593346740-925612772716",
        optionType: "phone"
    },

    {
        id: 6,
        name: "Laptop Backpack",
        category: "Accessories",
        price: 1799,
        rating: 4.4,
        reviews: 91,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        optionType: "laptop"
    },

    {
        id: 7,
        name: "Wireless Mouse",
        category: "Electronics",
        price: 1499,
        rating: 4.6,
        reviews: 112,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
        optionType: "none"
    },

    {
        id: 8,
        name: "USB-C Cable",
        category: "Accessories",
        price: 599,
        rating: 4.3,
        reviews: 234,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90",
        optionType: "none"
    }

];


let cart = [];

let currentCategory = "All";


/* =========================================================
   LOGIN
========================================================= */

function login() {

    const username =
        document.getElementById("loginUsername")
        .value.trim();

    const password =
        document.getElementById("loginPassword")
        .value.trim();


    if (username === "admin" && password === "1234") {

        localStorage.setItem(
            "cartRescueLoggedIn",
            "true"
        );

        localStorage.setItem(
            "cartRescueUsername",
            username
        );


        showShop(username);

    }

    else {

        document.getElementById(
            "loginError"
        ).innerText =
            "Invalid username or password.";

    }

}


/* =========================================================
   SHOW SHOP
========================================================= */

function showShop(username) {

    document.getElementById(
        "loginPage"
    ).classList.add("hidden");


    document.getElementById(
        "shopPage"
    ).classList.remove("hidden");


    document.getElementById(
        "usernameDisplay"
    ).innerText = username;


    document.getElementById(
        "profileName"
    ).innerText = username;


    displayProducts();

    updateCart();

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {
        return;
    }


    /* Remove login session */

    localStorage.removeItem(
        "cartRescueLoggedIn"
    );

    localStorage.removeItem(
        "cartRescueUsername"
    );


    /* Empty current cart */

    cart = [];


    /* Close profile */

    document.getElementById(
        "profileMenu"
    ).classList.remove("show");


    /* Close cart */

    closeCart();


    /* Hide shop */

    document.getElementById(
        "shopPage"
    ).classList.add("hidden");


    /* Show login */

    document.getElementById(
        "loginPage"
    ).classList.remove("hidden");


    /* Clear login fields */

    document.getElementById(
        "loginUsername"
    ).value = "";

    document.getElementById(
        "loginPassword"
    ).value = "";


    document.getElementById(
        "loginError"
    ).innerText = "";

}


/* =========================================================
   CHECK LOGIN WHEN PAGE OPENS
========================================================= */

function checkLogin() {

    const loggedIn =
        localStorage.getItem(
            "cartRescueLoggedIn"
        );


    const username =
        localStorage.getItem(
            "cartRescueUsername"
        );


    if (
        loggedIn === "true" &&
        username
    ) {

        showShop(username);

    }

    else {

        document.getElementById(
            "loginPage"
        ).classList.remove("hidden");


        document.getElementById(
            "shopPage"
        ).classList.add("hidden");

    }

}


/* =========================================================
   PRODUCT OPTIONS
========================================================= */

function getOptions(product) {


    /* SHOES */

    if (product.optionType === "shoe") {

        return `

            <div class="product-options">

                <div class="option-group">

                    <label>
                        👟 Select Shoe Size
                    </label>

                    <select
                        id="option-${product.id}">

                        <option value="">
                            Choose Size
                        </option>

                        <option value="Size 6">
                            Size 6
                        </option>

                        <option value="Size 7">
                            Size 7
                        </option>

                        <option value="Size 8">
                            Size 8
                        </option>

                        <option value="Size 9">
                            Size 9
                        </option>

                        <option value="Size 10">
                            Size 10
                        </option>

                        <option value="Size 11">
                            Size 11
                        </option>

                        <option value="Size 12">
                            Size 12
                        </option>

                    </select>

                </div>

            </div>

        `;

    }


    /* PHONE CASE */

    if (product.optionType === "phone") {

        return `

            <div class="product-options">

                <div class="option-group">

                    <label>
                        📱 Phone Brand
                    </label>

                    <select
                        id="brand-${product.id}">

                        <option value="">
                            Select Brand
                        </option>

                        <option value="Apple">
                            Apple
                        </option>

                        <option value="Samsung">
                            Samsung
                        </option>

                        <option value="OnePlus">
                            OnePlus
                        </option>

                        <option value="Google Pixel">
                            Google Pixel
                        </option>

                        <option value="Vivo">
                            Vivo
                        </option>

                        <option value="Oppo">
                            Oppo
                        </option>

                        <option value="Realme">
                            Realme
                        </option>

                        <option value="Motorola">
                            Motorola
                        </option>

                        <option value="Nothing">
                            Nothing
                        </option>

                    </select>

                </div>


                <div class="option-group">

                    <label>
                        📱 Phone Model
                    </label>

                    <select
                        id="model-${product.id}">

                        <option value="">
                            Select Model
                        </option>

                        <option>
                            iPhone 15
                        </option>

                        <option>
                            iPhone 16
                        </option>

                        <option>
                            iPhone 16 Pro
                        </option>

                        <option>
                            Galaxy S24
                        </option>

                        <option>
                            Galaxy S25
                        </option>

                        <option>
                            OnePlus 12
                        </option>

                        <option>
                            OnePlus 13
                        </option>

                        <option>
                            Pixel 9
                        </option>

                        <option>
                            Vivo V40
                        </option>

                        <option>
                            Oppo Reno 12
                        </option>

                        <option>
                            Realme GT
                        </option>

                    </select>

                </div>

            </div>

        `;

    }


    /* LAPTOP */

    if (product.optionType === "laptop") {

        return `

            <div class="product-options">

                <div class="option-group">

                    <label>
                        💻 Laptop Brand
                    </label>

                    <select
                        id="brand-${product.id}">

                        <option value="">
                            Select Brand
                        </option>

                        <option>
                            HP
                        </option>

                        <option>
                            Dell
                        </option>

                        <option>
                            Lenovo
                        </option>

                        <option>
                            ASUS
                        </option>

                        <option>
                            Acer
                        </option>

                        <option>
                            Apple
                        </option>

                    </select>

                </div>


                <div class="option-group">

                    <label>
                        💻 Laptop Model
                    </label>

                    <select
                        id="model-${product.id}">

                        <option value="">
                            Select Model
                        </option>

                        <option>
                            HP Pavilion
                        </option>

                        <option>
                            HP Victus
                        </option>

                        <option>
                            Dell Inspiron
                        </option>

                        <option>
                            Dell XPS
                        </option>

                        <option>
                            Lenovo IdeaPad
                        </option>

                        <option>
                            Lenovo ThinkPad
                        </option>

                        <option>
                            ASUS VivoBook
                        </option>

                        <option>
                            ASUS ROG
                        </option>

                        <option>
                            Acer Aspire
                        </option>

                        <option>
                            MacBook Air
                        </option>

                        <option>
                            MacBook Pro
                        </option>

                    </select>

                </div>

            </div>

        `;

    }


    /* SMART WATCH */

    if (product.optionType === "watch") {

        return `

            <div class="product-options">

                <div class="option-group">

                    <label>
                        ⌚ Smart Watch Type
                    </label>

                    <select
                        id="option-${product.id}">

                        <option value="">
                            Choose Type
                        </option>

                        <option>
                            Fitness Tracker
                        </option>

                        <option>
                            Sports Watch
                        </option>

                        <option>
                            GPS Smart Watch
                        </option>

                        <option>
                            Health Monitoring Watch
                        </option>

                        <option>
                            Premium Smart Watch
                        </option>

                        <option>
                            Kids Smart Watch
                        </option>

                    </select>

                </div>

            </div>

        `;

    }


    /* HEADPHONES */

    if (product.optionType === "headphone") {

        return `

            <div class="product-options">

                <div class="option-group">

                    <label>
                        🎧 Headphone Model
                    </label>

                    <select
                        id="option-${product.id}">

                        <option value="">
                            Choose Model
                        </option>

                        <option>
                            Wireless Over-Ear
                        </option>

                        <option>
                            Wireless On-Ear
                        </option>

                        <option>
                            Noise Cancelling
                        </option>

                        <option>
                            Bluetooth Headphones
                        </option>

                        <option>
                            Gaming Headset
                        </option>

                        <option>
                            Sports Headphones
                        </option>

                        <option>
                            Studio Headphones
                        </option>

                        <option>
                            Neckband
                        </option>

                    </select>

                </div>

            </div>

        `;

    }


    return "";

}


/* =========================================================
   DISPLAY PRODUCTS
========================================================= */

function displayProducts(list = products) {

    const grid =
        document.getElementById(
            "productGrid"
        );


    grid.innerHTML = "";


    if (list.length === 0) {

        grid.innerHTML = `

            <div class="empty-cart">

                <h2>
                    No products found
                </h2>

                <p>
                    Try another search.
                </p>

            </div>

        `;

        return;

    }


    list.forEach(product => {

        const card =
            document.createElement("div");


        card.className =
            "product-card";


        card.innerHTML = `

            <div style="position:relative">

                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}">

                <span class="rating">
                    ${product.rating} ★
                </span>

            </div>


            <div class="product-info">

                <h2 class="product-name">
                    ${product.name}
                </h2>


                <div class="reviews">

                    <span class="stars">
                        ★★★★★
                    </span>

                    (${product.reviews} reviews)

                </div>


                <div class="price">

                    ₹${product.price.toLocaleString("en-IN")}

                </div>


                ${getOptions(product)}


                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})">

                    <i class="fa-solid fa-cart-shopping"></i>

                    Add to Cart

                </button>

            </div>

        `;


        grid.appendChild(card);

    });

}


/* =========================================================
   GET OPTION
========================================================= */

function getSelectedOption(product) {


    if (product.optionType === "none") {

        return "Standard";

    }


    if (
        product.optionType === "shoe" ||
        product.optionType === "watch" ||
        product.optionType === "headphone"
    ) {

        const select =
            document.getElementById(
                `option-${product.id}`
            );


        if (!select || !select.value) {

            return null;

        }


        return select.value;

    }


    if (
        product.optionType === "phone" ||
        product.optionType === "laptop"
    ) {

        const brand =
            document.getElementById(
                `brand-${product.id}`
            );


        const model =
            document.getElementById(
                `model-${product.id}`
            );


        if (
            !brand ||
            !model ||
            !brand.value ||
            !model.value
        ) {

            return null;

        }


        return brand.value +
            " - " +
            model.value;

    }


    return "Standard";

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(id) {

    const product =
        products.find(
            p => p.id === id
        );


    const option =
        getSelectedOption(product);


    if (!option) {

        alert(
            "Please select the required product option."
        );

        return;

    }


    const existing =
        cart.find(
            item =>
                item.id === id &&
                item.selectedOption === option
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            ...product,

            quantity: 1,

            selectedOption: option

        });

    }


    updateCart();

    openCart();

}


/* =========================================================
   UPDATE CART
========================================================= */

function updateCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    container.innerHTML = "";


    let subtotal = 0;

    let count = 0;


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"
                   style="font-size:45px">
                </i>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add products to continue.
                </p>

            </div>

        `;

    }


    cart.forEach((item,index) => {

        subtotal +=
            item.price *
            item.quantity;


        count += item.quantity;


        const div =
            document.createElement("div");


        div.className =
            "cart-item";


        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}">


            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>


                <div class="cart-option">

                    Selected:

                    <strong>
                        ${item.selectedOption}
                    </strong>

                </div>


                <div class="cart-item-price">

                    ₹${item.price.toLocaleString("en-IN")}

                </div>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                </div>

            </div>


            <button
                class="delete-btn"
                onclick="removeFromCart(${index})">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        container.appendChild(div);

    });


    const discount =
        subtotal * 0.10;


    const total =
        subtotal - discount;


    document.getElementById(
        "cartCount"
    ).innerText = count;


    document.getElementById(
        "subtotal"
    ).innerText =
        formatMoney(subtotal);


    document.getElementById(
        "discount"
    ).innerText =
        formatMoney(discount);


    document.getElementById(
        "total"
    ).innerText =
        formatMoney(total);

}


/* =========================================================
   QUANTITY
========================================================= */

function changeQuantity(index, amount) {

    if (!cart[index]) return;


    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index,1);

    }


    updateCart();

}


/* =========================================================
   REMOVE
========================================================= */

function removeFromCart(index) {

    cart.splice(index,1);

    updateCart();

}


/* =========================================================
   CLEAR CART
========================================================= */

function clearCart() {

    if (cart.length === 0) {

        alert("Your cart is already empty.");

        return;

    }


    if (
        confirm(
            "Are you sure you want to clear the cart?"
        )
    ) {

        cart = [];

        updateCart();

    }

}


/* =========================================================
   CART OPEN/CLOSE
========================================================= */

function openCart() {

    document.getElementById(
        "cartSidebar"
    ).classList.add("open");


    document.getElementById(
        "cartOverlay"
    ).classList.add("show");

}


function closeCart() {

    document.getElementById(
        "cartSidebar"
    ).classList.remove("open");


    document.getElementById(
        "cartOverlay"
    ).classList.remove("show");

}


/* =========================================================
   SEARCH
========================================================= */

function searchProducts() {

    const search =
        document.getElementById(
            "searchInput"
        ).value
        .toLowerCase();


    const filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                currentCategory === "All" ||
                product.category ===
                currentCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    displayProducts(filtered);

}


/* =========================================================
   CATEGORY
========================================================= */

function filterCategory(category, button) {

    currentCategory =
        category;


    document
        .querySelectorAll(".category")
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


    button.classList.add(
        "active"
    );


    searchProducts();

}


/* =========================================================
   PROFILE
========================================================= */

function toggleProfile() {

    document.getElementById(
        "profileMenu"
    ).classList.toggle("show");

}


/* =========================================================
   CHECKOUT
========================================================= */

function startCheckout() {

    if (cart.length === 0) {

        alert(
            "Please add a product to the cart first."
        );

        return;

    }


    closeCart();

    loadSavedAddress();

    updateCheckoutTotal();


    document.getElementById(
        "checkoutModal"
    ).style.display = "block";

}


function closeCheckout() {

    document.getElementById(
        "checkoutModal"
    ).style.display = "none";

}


/* =========================================================
   CHECKOUT TOTAL
========================================================= */

function updateCheckoutTotal() {

    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            item.price *
            item.quantity;

    });


    const discount =
        subtotal * 0.10;


    const delivery =
        document.querySelector(
            'input[name="delivery"]:checked'
        );


    const deliveryCharge =
        delivery
            ? Number(
                delivery.dataset.charge
            )
            : 0;


    const total =
        subtotal -
        discount +
        deliveryCharge;


    document.getElementById(
        "checkoutSubtotal"
    ).innerText =
        formatMoney(subtotal);


    document.getElementById(
        "checkoutDiscount"
    ).innerText =
        formatMoney(discount);


    document.getElementById(
        "deliveryCharge"
    ).innerText =
        deliveryCharge === 0
            ? "FREE"
            : formatMoney(
                deliveryCharge
            );


    document.getElementById(
        "checkoutTotal"
    ).innerText =
        formatMoney(total);

}


/* =========================================================
   PLACE ORDER
========================================================= */

function confirmOrder() {

    const name =
        document.getElementById(
            "fullName"
        ).value.trim();


    const phone =
        document.getElementById(
            "phone"
        ).value.trim();


    const door =
        document.getElementById(
            "doorNo"
        ).value.trim();


    const street =
        document.getElementById(
            "street"
        ).value.trim();


    const city =
        document.getElementById(
            "city"
        ).value.trim();


    const state =
        document.getElementById(
            "state"
        ).value.trim();


    const pincode =
        document.getElementById(
            "pincode"
        ).value.trim();


    const landmark =
        document.getElementById(
            "landmark"
        ).value.trim();


    if (
        !name ||
        !phone ||
        !door ||
        !street ||
        !city ||
        !state ||
        !pincode
    ) {

        alert(
            "Please fill all required address fields."
        );

        return;

    }


    if (
        !/^[0-9]{10}$/.test(phone)
    ) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        return;

    }


    if (
        !/^[0-9]{6}$/.test(pincode)
    ) {

        alert(
            "Please enter a valid 6-digit PIN code."
        );

        return;

    }


    const addressType =
        document.querySelector(
            'input[name="addressType"]:checked'
        ).value;


    const delivery =
        document.querySelector(
            'input[name="delivery"]:checked'
        ).value;


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    const total =
        document.getElementById(
            "checkoutTotal"
        ).innerText;


    const address =
        name +
        "\nDoor No: " +
        door +
        "\n" +
        street +
        "\n" +
        city +
        ", " +
        state +
        " - " +
        pincode +
        "\nPhone: " +
        phone +
        "\nLandmark: " +
        (landmark || "Not provided") +
        "\nAddress Type: " +
        addressType;


    /* SAVE ADDRESS */

    localStorage.setItem(
        "cartRescueAddress",
        address
    );


    /* CREATE ORDER ID */

    const orderId =
        "CR-" +
        Math.floor(
            10000000 +
            Math.random() * 90000000
        );


    const expectedDate =
        getExpectedDate(
            delivery
        );


    /* SAVE ORDER */

    localStorage.setItem(
        "cartRescueOrderId",
        orderId
    );


    localStorage.setItem(
        "cartRescueOrderTotal",
        total
    );


    localStorage.setItem(
        "cartRescueExpectedDate",
        expectedDate
    );


    localStorage.setItem(
        "cartRescueOrderAddress",
        address
    );


    localStorage.setItem(
        "cartRescuePayment",
        payment
    );


    localStorage.setItem(
        "cartRescueDelivery",
        delivery
    );


    /* SUCCESS PAGE */

    document.getElementById(
        "orderId"
    ).innerText =
        "#" + orderId;


    document.getElementById(
        "successTotal"
    ).innerText =
        total;


    document.getElementById(
        "expectedDate"
    ).innerText =
        expectedDate;


    document.getElementById(
        "successAddress"
    ).innerText =
        address;


    closeCheckout();


    document.getElementById(
        "successModal"
    ).style.display =
        "block";


    /* EMPTY CART */

    cart = [];

    updateCart();

}


/* =========================================================
   EXPECTED DELIVERY DATE
========================================================= */

function getExpectedDate(delivery) {

    const date =
        new Date();


    if (
        delivery ===
        "Same Day Delivery"
    ) {

        date.setDate(
            date.getDate()
        );

    }

    else if (
        delivery ===
        "Express Delivery"
    ) {

        date.setDate(
            date.getDate() + 2
        );

    }

    else {

        date.setDate(
            date.getDate() + 5
        );

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );

}


/* =========================================================
   SUCCESS
========================================================= */

function closeSuccess() {

    document.getElementById(
        "successModal"
    ).style.display =
        "none";

}


/* =========================================================
   TRACKING
========================================================= */

function openTracking() {

    document.getElementById(
        "profileMenu"
    ).classList.remove("show");


    const orderId =
        localStorage.getItem(
            "cartRescueOrderId"
        );


    if (!orderId) {

        alert(
            "No order found. Please place an order first."
        );

        return;

    }


    document.getElementById(
        "trackingOrderId"
    ).innerText =
        "Order #" + orderId;


    document.getElementById(
        "trackingAmount"
    ).innerText =
        localStorage.getItem(
            "cartRescueOrderTotal"
        ) || "₹0";


    document.getElementById(
        "trackingAddress"
    ).innerText =
        localStorage.getItem(
            "cartRescueOrderAddress"
        ) || "No address saved.";


    document.getElementById(
        "trackingDate"
    ).innerText =
        localStorage.getItem(
            "cartRescueExpectedDate"
        ) || "-";


    document.getElementById(
        "trackingProduct"
    ).innerText =
        "Cart Rescue Order";


    document.getElementById(
        "trackingModal"
    ).style.display =
        "block";

}


function closeTracking() {

    document.getElementById(
        "trackingModal"
    ).style.display =
        "none";

}


/* =========================================================
   SAVED ADDRESS
========================================================= */

function openSavedAddress() {

    document.getElementById(
        "profileMenu"
    ).classList.remove("show");


    const saved =
        localStorage.getItem(
            "cartRescueAddress"
        );


    if (!saved) {

        alert(
            "No saved address found. Please enter your address during checkout."
        );

        return;

    }


    loadSavedAddress();


    document.getElementById(
        "checkoutModal"
    ).style.display =
        "block";

}


/* =========================================================
   LOAD SAVED ADDRESS
========================================================= */

function loadSavedAddress() {

    const saved =
        localStorage.getItem(
            "cartRescueAddress"
        );


    if (!saved) {
        return;
    }


    const lines =
        saved.split("\n");


    if (lines[0]) {

        document.getElementById(
            "fullName"
        ).value =
            lines[0];

    }


    if (lines[1]) {

        document.getElementById(
            "doorNo"
        ).value =
            lines[1]
                .replace(
                    "Door No: ",
                    ""
                );

    }


    if (lines[2]) {

        document.getElementById(
            "street"
        ).value =
            lines[2];

    }


    if (lines[3]) {

        const parts =
            lines[3].split(",");


        if (parts.length >= 2) {

            document.getElementById(
                "city"
            ).value =
                parts[0].trim();


            const statePin =
                parts[1].split("-");


            document.getElementById(
                "state"
            ).value =
                statePin[0].trim();


            if (statePin[1]) {

                document.getElementById(
                    "pincode"
                ).value =
                    statePin[1].trim();

            }

        }

    }


    if (lines[4]) {

        document.getElementById(
            "phone"
        ).value =
            lines[4]
                .replace(
                    "Phone: ",
                    ""
                );

    }


    if (lines[5]) {

        document.getElementById(
            "landmark"
        ).value =
            lines[5]
                .replace(
                    "Landmark: ",
                    ""
                )
                .replace(
                    "Not provided",
                    ""
                );

    }

}


/* =========================================================
   FORMAT MONEY
========================================================= */

function formatMoney(amount) {

    return "₹" +
        Math.round(amount)
        .toLocaleString("en-IN");

}


/* =========================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================================= */

window.addEventListener(
    "click",
    function(event) {

        if (
            event.target.classList.contains(
                "modal"
            )
        ) {

            event.target.style.display =
                "none";

        }

    }
);


/* =========================================================
   ENTER KEY LOGIN
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            !document
                .getElementById("loginPage")
                .classList.contains("hidden")
        ) {

            login();

        }

    }
);


/* =========================================================
   START APPLICATION
========================================================= */

checkLogin();