# 🛒 Cart Rescue

## 📌 Project Overview

Cart Rescue is a web-based e-commerce application designed to provide
users with a simple and convenient online shopping experience.

The system allows users to browse fashion and accessory products,
select product sizes or colors, add products to the shopping cart,
provide delivery details, and confirm their orders.

A key feature of Cart Rescue is the Cart Reminder System, which
notifies users when a product has remained in their cart for two days,
helping them remember products they have not yet purchased.

---

## 🎯 Problem Statement

In online shopping applications, users often add products to their
shopping carts but forget to complete the purchase. This can result
in abandoned carts and missed purchases.

Traditional shopping applications may not provide sufficient reminders
for products that remain in the cart for a long period.

Cart Rescue addresses this problem by providing a shopping cart
management system with an automatic reminder feature that alerts users
when an item has been waiting in the cart for two days.

---

## 💡 Proposed Solution

Cart Rescue provides an interactive shopping platform where users can:

- Browse different products
- Select categories
- Select sizes and colors
- Add products to the cart
- View and manage cart items
- Enter delivery address
- Select payment method
- Confirm orders
- Receive reminders for items left in the cart for two days

---

## ✨ Key Features

### 👤 User Login
Users can access the application through a login page.

### 👗 Fashion Products
The application provides different fashion products for men and women.

Examples:

- Women's Dresses
- Women's Kurtis
- Women's T-Shirts
- Women's Jeans
- Men's T-Shirts
- Men's Shirts
- Men's Jeans

### 🕶️ Accessories

The system also provides accessories such as:

- Sunglasses
- Shoes
- Slippers

### 📏 Size and Color Selection

Users can select available sizes for clothing and footwear.

Examples:

- S
- M
- L
- XL
- XXL
- Shoe sizes 4–11

Users can also select available colors for selected products.

### 🛒 Shopping Cart

Users can:

- Add products
- View products
- Select quantity
- Remove products
- Clear the cart
- View the total price

### 📍 Delivery Address

Users can provide:

- Full Name
- Phone Number
- Door/House Number
- Street
- Area
- City
- State
- Pincode

### 💳 Payment Method

Users can select a payment method such as:

- Cash on Delivery
- UPI
- Debit/Credit Card

### 📦 Order Confirmation

After entering the required details, users can confirm their order.
The system displays the customer details, delivery address, payment
method, and order total.

### 🔔 Cart Reminder

If an item remains in the shopping cart for two days, the system
displays a reminder notification asking the user to complete the order.

### 🚪 Logout

Users can securely leave the shopping session using the logout option.

---

## 🔄 System Workflow

```text
             ┌─────────────────┐
             │    Login Page   │
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │   Home Page     │
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │ Select Category  │
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │ Select Product   │
             │ Size / Color     │
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │   Add to Cart    │
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │   View Cart      │
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │ Delivery Address │
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │ Payment Method   │
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │ Confirm Order    │
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │ Order Confirmed  │
             └─────────────────┘
