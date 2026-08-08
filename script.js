/* =========================================
   CART RESCUE
   ========================================= */


/* PRODUCTS */

const products = [

    /* WOMEN */

    {
        id: 1,
        name: "Women's Party Dress",
        category: "Women",
        type: "Dress",
        price: 1999,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
        options: ["S", "M", "L", "XL"]
    },

    {
        id: 2,
        name: "Women's Kurti",
        category: "Women",
        type: "Kurti",
        price: 1299,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
        options: ["S", "M", "L", "XL", "XXL"]
    },

    {
        id: 3,
        name: "Women's Jeans",
        category: "Women",
        type: "Jeans",
        price: 1499,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
        options: ["26", "28", "30", "32", "34", "36"]
    },

    {
        id: 4,
        name: "Women's T-Shirt",
        category: "Women",
        type: "T-Shirt",
        price: 799,
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
        options: ["S", "M", "L", "XL"]
    },


    /* MEN */

    {
        id: 5,
        name: "Men's T-Shirt",
        category: "Men",
        type: "T-Shirt",
        price: 899,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        options: ["S", "M", "L", "XL", "XXL"]
    },

    {
        id: 6,
        name: "Men's Formal Shirt",
        category: "Men",
        type: "Shirt",
        price: 1299,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
        options: ["S", "M", "L", "XL", "XXL"]
    },

    {
        id: 7,
        name: "Men's Jeans",
        category: "Men",
        type: "Jeans",
        price: 1599,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
        options: ["28", "30", "32", "34", "36", "38"]
    },

    {
        id: 8,
        name: "Men's Casual Shirt",
        category: "Men",
        type: "Shirt",
        price: 1199,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
        options: ["S", "M", "L", "XL", "XXL"]
    },


    /* ACCESSORIES */

    {
        id: 9,
        name: "Classic Sunglasses",
        category: "Accessories",
        type: "Sunglasses",
        price: 999,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
        options: [
            "Black",
            "Brown",
            "Blue"
        ]
    },

    {
        id: 10,
        name: "Premium Sunglasses",
        category: "Accessories",
        type: "Sunglasses",
        price: 1499,
        image: "https://images.unsplash.com/photo-1508296695146-257a814070b4",
        options: [
            "Black",
            "Gold",
            "Silver"
        ]
    },

    {
        id: 11,
        name: "Running Shoes",
        category: "Accessories",
        type: "Shoes",
        price: 2899,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        options: [
            "6",
            "7",
            "8",
            "9",
            "10",
            "11"
        ]
    },

    {
        id: 12,
        name: "Women's Slippers",
        category: "Accessories",
        type: "Slippers",
        price: 699,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
        options: [
            "4",
            "5",
            "6",
            "7",
            "8"
        ]
    }

];


/* =========================================
   CART
   ========================================= */

let cart = [];

try {

    cart =
        JSON.parse(
            localStorage.getItem(
                "cartRescueCart"
            )
        ) || [];

} catch (error) {

    cart = [];

}


/* =========================================
   DISPLAY PRODUCTS
   ========================================= */

function displayProducts(list) {

    const container =
        document.getElementById("products");

    container.innerHTML = "";


    list.forEach(function(product) {

        const div =
            document.createElement("div");

        div.className = "product";


        let options = "";

        product.options.forEach(
            function(option) {

                options +=
                    `<option value="${option}">
                        ${option}
                    </option>`;

            }
        );


        div.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p class="product-category">
                    ${product.type}
                </p>

                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <select
                    id="option-${product.id}"
                >
                    ${options}
                </select>

                <button
                    class="add-btn"
                    onclick="addToCart(${product.id})"
                >
                    🛒 Add to Cart
                </button>

            </div>
        `;


        container.appendChild(div);

    });

}


/* =========================================
   ADD TO CART
   ========================================= */

function addToCart(id) {

    const product =
        products.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!product) {

        return;

    }


    const optionElement =
        document.getElementById(
            "option-" + id
        );


    const selectedOption =
        optionElement.value;


    const existing =
        cart.find(
            function(item) {

                return (
                    item.id === id &&
                    item.option === selectedOption
                );

            }
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            type: product.type,

            price: product.price,

            option: selectedOption,

            quantity: 1,

            /*
             * Save the date/time
             * when item entered cart.
             */

            addedDate: Date.now()

        });

    }


    saveCart();

    updateCart();


    alert(
        product.name +
        " added to your cart!"
    );

}


/* =========================================
   SAVE
   ========================================= */

function saveCart() {

    localStorage.setItem(
        "cartRescueCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   UPDATE CART
   ========================================= */

function updateCart() {

    const container =
        document.getElementById(
            "cartItems"
        );

    const count =
        document.getElementById(
            "cartCount"
        );

    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    container.innerHTML = "";


    let total = 0;

    let countItems = 0;


    if (cart.length === 0) {

        container.innerHTML = `
            <p style="text-align:center;">
                Your cart is empty.
            </p>
        `;

    }


    cart.forEach(
        function(item, index) {

            total +=
                item.price *
                item.quantity;

            countItems +=
                item.quantity;


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "cart-item";


            div.innerHTML = `

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Type:
                    ${item.type}
                </p>

                <p>
                    Selected:
                    ${item.option}
                </p>

                <p>
                    Quantity:
                    ${item.quantity}
                </p>

                <p>
                    Price:
                    ₹${item.price}
                </p>

                <button
                    class="remove-btn"
                    onclick="removeItem(${index})"
                >
                    Remove
                </button>

            `;


            container.appendChild(div);

        }
    );


    count.textContent =
        countItems;


    totalElement.textContent =
        total.toLocaleString("en-IN");

}


/* =========================================
   REMOVE
   ========================================= */

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();

}


/* =========================================
   CLEAR
   ========================================= */

function clearCart() {

    if (cart.length === 0) {

        return;

    }


    if (
        confirm(
            "Clear all items from cart?"
        )
    ) {

        cart = [];

        saveCart();

        updateCart();

    }

}


/* =========================================
   CART OPEN / CLOSE
   ========================================= */

function openCart() {

    document
        .getElementById("cartBox")
        .classList.add("open");

    updateCart();

}


function closeCart() {

    document
        .getElementById("cartBox")
        .classList.remove("open");

}


/* =========================================
   CATEGORY
   ========================================= */

function showAll() {

    displayProducts(products);

}


function showCategory(category) {

    const result =
        products.filter(
            function(product) {

                return (
                    product.category ===
                    category
                );

            }
        );


    displayProducts(result);

}


/* =========================================
   SEARCH
   ========================================= */

document
    .getElementById("searchBox")
    .addEventListener(
        "input",
        function() {

            const text =
                this.value
                    .toLowerCase()
                    .trim();


            const result =
                products.filter(
                    function(product) {

                        return (
                            product.name
                                .toLowerCase()
                                .includes(text) ||

                            product.type
                                .toLowerCase()
                                .includes(text)
                        );

                    }
                );


            displayProducts(result);

        }
    );


/* =========================================
   ADDRESS
   ========================================= */

function openAddress() {

    if (cart.length === 0) {

        alert(
            "Please add an item to your cart first."
        );

        return;

    }


    document
        .getElementById(
            "addressModal"
        )
        .classList.add("show");

}


function closeAddress() {

    document
        .getElementById(
            "addressModal"
        )
        .classList.remove("show");

}


/* =========================================
   CONFIRM ORDER
   ========================================= */

document
    .getElementById(
        "addressForm"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "fullName"
                ).value;


            const phone =
                document.getElementById(
                    "phone"
                ).value;


            const door =
                document.getElementById(
                    "doorNo"
                ).value;


            const street =
                document.getElementById(
                    "street"
                ).value;


            const area =
                document.getElementById(
                    "area"
                ).value;


            const city =
                document.getElementById(
                    "city"
                ).value;


            const state =
                document.getElementById(
                    "state"
                ).value;


            const pincode =
                document.getElementById(
                    "pincode"
                ).value;


            const payment =
                document.getElementById(
                    "payment"
                ).value;


            if (
                phone.length !== 10 ||
                !/^[0-9]+$/.test(phone)
            ) {

                alert(
                    "Please enter a valid 10 digit phone number."
                );

                return;

            }


            if (
                pincode.length !== 6 ||
                !/^[0-9]+$/.test(pincode)
            ) {

                alert(
                    "Please enter a valid 6 digit pincode."
                );

                return;

            }


            let total = 0;


            cart.forEach(
                function(item) {

                    total +=
                        item.price *
                        item.quantity;

                }
            );


            alert(

                "🎉 ORDER CONFIRMED!\n\n" +

                "Customer: " +
                name +
                "\n" +

                "Phone: " +
                phone +
                "\n\n" +

                "Delivery Address:\n" +

                door +
                ", " +
                street +
                ", " +
                area +
                ", " +
                city +
                ", " +
                state +
                " - " +
                pincode +
                "\n\n" +

                "Payment: " +
                payment +
                "\n\n" +

                "Order Total: ₹" +
                total.toLocaleString(
                    "en-IN"
                ) +

                "\n\n" +

                "Thank you for shopping with Cart Rescue!"

            );


            cart = [];

            saveCart();

            updateCart();

            closeAddress();

            closeCart();

        }
    );


/* =========================================
   2 DAY CART REMINDER
   ========================================= */

const TWO_DAYS =
    2 *
    24 *
    60 *
    60 *
    1000;


function checkCartReminder() {

    if (cart.length === 0) {

        return;

    }


    const now =
        Date.now();


    for (
        let i = 0;
        i < cart.length;
        i++
    ) {

        const item =
            cart[i];


        if (!item.addedDate) {

            item.addedDate =
                now;

            continue;

        }


        const waitingTime =
            now -
            item.addedDate;


        if (
            waitingTime >=
            TWO_DAYS
        ) {

            showReminder(item);

            break;

        }

    }


    saveCart();

}


/* =========================================
   SHOW REMINDER
   ========================================= */

function showReminder(item) {

    const popup =
        document.getElementById(
            "reminderPopup"
        );


    const text =
        document.getElementById(
            "reminderText"
        );


    text.innerHTML =

        "Your item <strong>" +
        item.name +
        "</strong> has been waiting in your cart for <strong>2 days</strong>.<br><br>" +

        "Don't forget to complete your order! 🛒";


    popup.classList.add("show");

}


/* =========================================
   CLOSE REMINDER
   ========================================= */

function closeReminder() {

    document
        .getElementById(
            "reminderPopup"
        )
        .classList.remove("show");

}


/* =========================================
   LOGOUT
   ========================================= */

function logout() {

    if (
        confirm(
            "Are you sure you want to logout?"
        )
    ) {

        window.location.href =
            "login.html";

    }

}


/* =========================================
   START
   ========================================= */

displayProducts(products);

updateCart();

checkCartReminder();


/*
 * Check every minute.
 */

setInterval(
    checkCartReminder,
    60 * 1000
);