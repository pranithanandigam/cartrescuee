/* =====================================================
   CART RESCUE JAVASCRIPT
===================================================== */


/* =====================================================
   PRODUCTS
===================================================== */

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2999,
        rating: 4.5,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 4999,
        rating: 4.7,
        reviews: 95,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },

    {
        id: 3,
        name: "Sports Shoes",
        category: "Fashion",
        price: 3499,
        rating: 4.6,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },

    {
        id: 4,
        name: "Running Sneakers",
        category: "Fashion",
        price: 2899,
        rating: 4.4,
        reviews: 82,
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3"
    },

    {
        id: 5,
        name: "USB-C Cable",
        category: "Accessories",
        price: 599,
        rating: 4.3,
        reviews: 234,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90"
    },

    {
        id: 6,
        name: "Phone Case",
        category: "Accessories",
        price: 899,
        rating: 4.5,
        reviews: 167,
        image: "https://images.unsplash.com/photo-1601593346740-925612772716"
    },

    {
        id: 7,
        name: "Wireless Mouse",
        category: "Electronics",
        price: 1499,
        rating: 4.6,
        reviews: 112,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db"
    },

    {
        id: 8,
        name: "Laptop Backpack",
        category: "Accessories",
        price: 1799,
        rating: 4.4,
        reviews: 91,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    }

];


let cart = [];

let currentCategory = "All";



/* =====================================================
   DISPLAY PRODUCTS
===================================================== */

function displayProducts(list = products) {

    const grid =
        document.getElementById("productGrid");

    grid.innerHTML = "";


    if (list.length === 0) {

        grid.innerHTML = `
            <div class="empty-cart">
                <h2>No products found</h2>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }


    list.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


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



/* =====================================================
   SEARCH
===================================================== */

function searchProducts() {

    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    let result =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                currentCategory === "All" ||
                product.category === currentCategory;


            return matchesSearch &&
                   matchesCategory;

        });


    displayProducts(result);

}



/* =====================================================
   CATEGORY FILTER
===================================================== */

function filterCategory(category, button) {

    currentCategory = category;


    document
        .querySelectorAll(".category")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    searchProducts();

}



/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(id) {

    const product =
        products.find(p => p.id === id);


    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();


    openCart();

}



/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i
                    class="fa-solid fa-cart-shopping"
                    style="font-size:50px">
                </i>

                <h3>Your cart is empty</h3>

                <p>Add some products to continue.</p>

            </div>
        `;

    }


    let subtotal = 0;

    let count = 0;


    cart.forEach(item => {

        subtotal +=
            item.price * item.quantity;

        count += item.quantity;


        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}">


            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>


                <div class="cart-item-price">

                    ₹${item.price.toLocaleString("en-IN")}

                </div>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)">

                        −

                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="changeQuantity(${item.id}, 1)">

                        +

                    </button>

                </div>

            </div>


            <button
                class="delete-btn"
                onclick="removeFromCart(${item.id})">

                <i class="fa-solid fa-trash"></i>

            </button>
        `;


        cartItems.appendChild(div);

    });


    const discount =
        subtotal * 0.10;


    const total =
        subtotal - discount;


    document.getElementById("cartCount")
        .innerText = count;


    document.getElementById("subtotal")
        .innerText = formatMoney(subtotal);


    document.getElementById("discount")
        .innerText = formatMoney(discount);


    document.getElementById("total")
        .innerText = formatMoney(total);

}



/* =====================================================
   QUANTITY
===================================================== */

function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    updateCart();

}



/* =====================================================
   REMOVE
===================================================== */

function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);


    updateCart();

}



/* =====================================================
   CLEAR CART
===================================================== */

function clearCart() {

    if (cart.length === 0) {

        alert("Cart is already empty.");

        return;

    }


    if (
        confirm("Are you sure you want to clear the cart?")
    ) {

        cart = [];

        updateCart();

    }

}



/* =====================================================
   CART OPEN / CLOSE
===================================================== */

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("open");


    document
        .getElementById("cartOverlay")
        .classList.add("show");

}


function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("open");


    document
        .getElementById("cartOverlay")
        .classList.remove("show");

}



/* =====================================================
   CHECKOUT
===================================================== */

function startCheckout() {

    if (cart.length === 0) {

        alert("Please add a product to your cart first.");

        return;

    }


    closeCart();


    loadSavedAddress();


    updateCheckoutTotal();


    document
        .getElementById("checkoutModal")
        .style.display = "block";

}


function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .style.display = "none";

}



/* =====================================================
   CHECKOUT TOTAL
===================================================== */

function updateCheckoutTotal() {

    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            item.price * item.quantity;

    });


    const discount =
        subtotal * 0.10;


    const delivery =
        document.querySelector(
            'input[name="delivery"]:checked'
        );


    const deliveryCharge =
        delivery
            ? Number(delivery.dataset.charge)
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
            : formatMoney(deliveryCharge);


    document.getElementById(
        "checkoutTotal"
    ).innerText =
        formatMoney(total);

}



/* =====================================================
   CONFIRM ORDER
===================================================== */

function confirmOrder() {

    const name =
        document
        .getElementById("fullName")
        .value
        .trim();


    const phone =
        document
        .getElementById("phone")
        .value
        .trim();


    const door =
        document
        .getElementById("doorNo")
        .value
        .trim();


    const street =
        document
        .getElementById("street")
        .value
        .trim();


    const city =
        document
        .getElementById("city")
        .value
        .trim();


    const state =
        document
        .getElementById("state")
        .value
        .trim();


    const pincode =
        document
        .getElementById("pincode")
        .value
        .trim();


    const landmark =
        document
        .getElementById("landmark")
        .value
        .trim();


    /* REQUIRED FIELD CHECK */

    if (
        name === "" ||
        phone === "" ||
        door === "" ||
        street === "" ||
        city === "" ||
        state === "" ||
        pincode === ""
    ) {

        alert(
            "Please fill all required delivery details."
        );

        return;

    }


    /* PHONE */

    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        return;

    }


    /* PIN */

    if (!/^[0-9]{6}$/.test(pincode)) {

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


    /* ADDRESS TEXT */

    const addressText =
        name + "\n" +
        "Door No: " + door + "\n" +
        street + "\n" +
        city + ", " +
        state + " - " +
        pincode + "\n" +
        "Phone: " + phone + "\n" +
        "Landmark: " +
        (landmark || "Not provided") + "\n" +
        "Address Type: " +
        addressType;


    /* SAVE ADDRESS */

    localStorage.setItem(
        "cartRescueAddress",
        addressText
    );


    /* ORDER ID */

    const orderId =
        "CR-" +
        Date.now()
        .toString()
        .slice(-8);


    localStorage.setItem(
        "cartRescueOrderId",
        orderId
    );


    localStorage.setItem(
        "cartRescueOrderTotal",
        total
    );


    localStorage.setItem(
        "cartRescuePayment",
        payment
    );


    localStorage.setItem(
        "cartRescueDelivery",
        delivery
    );


    /* EXPECTED DATE */

    const expectedDate =
        getExpectedDate(delivery);


    localStorage.setItem(
        "cartRescueExpectedDate",
        expectedDate
    );


    /* UPDATE SUCCESS MODAL */

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
        addressText;


    /* UPDATE TRACKING */

    document.getElementById(
        "trackingOrderId"
    ).innerText =
        "Order #" + orderId;


    document.getElementById(
        "trackingAmount"
    ).innerText =
        total;


    document.getElementById(
        "trackingAddress"
    ).innerText =
        addressText;


    document.getElementById(
        "trackingDate"
    ).innerText =
        expectedDate;


    let productName =
        cart.length > 0
            ? cart[0].name
            : "Your Order";


    document.getElementById(
        "trackingProduct"
    ).innerText =
        productName;


    /* CLOSE CHECKOUT */

    closeCheckout();


    /* SHOW SUCCESS */

    document.getElementById(
        "successModal"
    ).style.display =
        "block";


    /* Keep cart for moment then clear */

    cart = [];

    updateCart();

}



/* =====================================================
   EXPECTED DATE
===================================================== */

function getExpectedDate(delivery) {

    const date =
        new Date();


    if (delivery === "Same Day Delivery") {

        date.setDate(
            date.getDate()
        );

    }

    else if (delivery === "Express Delivery") {

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



/* =====================================================
   CLOSE SUCCESS
===================================================== */

function closeSuccess() {

    document.getElementById(
        "successModal"
    ).style.display =
        "none";

}



/* =====================================================
   TRACKING
===================================================== */

function openTracking() {

    const orderId =
        localStorage.getItem(
            "cartRescueOrderId"
        );


    const total =
        localStorage.getItem(
            "cartRescueOrderTotal"
        );


    const address =
        localStorage.getItem(
            "cartRescueAddress"
        );


    const expectedDate =
        localStorage.getItem(
            "cartRescueExpectedDate"
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
        total || "₹0";


    document.getElementById(
        "trackingAddress"
    ).innerText =
        address || "No address saved.";


    document.getElementById(
        "trackingDate"
    ).innerText =
        expectedDate || "--";


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



/* =====================================================
   SAVED ADDRESS
===================================================== */

function openAddress() {

    document.getElementById(
        "profileMenu"
    ).classList.remove("show");


    loadSavedAddress();


    document.getElementById(
        "checkoutModal"
    ).style.display =
        "block";

}


function loadSavedAddress() {

    const saved =
        localStorage.getItem(
            "cartRescueAddress"
        );


    if (!saved) return;


    const lines =
        saved.split("\n");


    if (lines.length >= 1) {

        document.getElementById(
            "fullName"
        ).value =
            lines[0];

    }


    if (lines.length >= 2) {

        document.getElementById(
            "doorNo"
        ).value =
            lines[1]
                .replace("Door No: ", "");

    }


    if (lines.length >= 3) {

        document.getElementById(
            "street"
        ).value =
            lines[2];

    }


    if (lines.length >= 4) {

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


    if (lines.length >= 5) {

        document.getElementById(
            "phone"
        ).value =
            lines[4]
                .replace("Phone: ", "");

    }


    if (lines.length >= 6) {

        document.getElementById(
            "landmark"
        ).value =
            lines[5]
                .replace("Landmark: ", "")
                .replace("Not provided", "");

    }

}



/* =====================================================
   PROFILE
===================================================== */

function toggleProfile() {

    document
        .getElementById("profileMenu")
        .classList.toggle("show");

}



/* =====================================================
   FORMAT MONEY
===================================================== */

function formatMoney(amount) {

    return "₹" +
        Math.round(amount)
        .toLocaleString("en-IN");

}



/* =====================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
===================================================== */

window.onclick = function(event) {

    if (
        event.target.classList.contains("modal")
    ) {

        event.target.style.display =
            "none";

    }

}



/* =====================================================
   INITIAL LOAD
===================================================== */

displayProducts();

updateCart();