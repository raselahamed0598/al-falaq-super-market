let cart = [];

function addToCart(name, price) {
    price = Number(price);

    let item = cart.find(function(product) {
        return product.name === name;
    });

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart! 🛒");
}


function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.innerText = "0";
        return;
    }

    let total = 0;

    cart.forEach(function(item, index) {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        let div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML =
            "<div>" +
            "<strong>" + item.name + "</strong><br>" +
            "AED " + item.price + " × " + item.quantity +
            "</div>" +

            "<div class='quantity-buttons'>" +

            "<button onclick='decreaseQuantity(" + index + ")'>−</button>" +

            "<span>" + item.quantity + "</span>" +

            "<button onclick='increaseQuantity(" + index + ")'>+</button>" +

            "</div>" +

            "<strong>AED " + itemTotal.toFixed(2) + "</strong>" +

            "<button class='remove-btn' onclick='removeFromCart(" + index + ")'>" +
            "Remove" +
            "</button>";

        cartItems.appendChild(div);
    });

    cartTotal.innerText = total.toFixed(2);
}


function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}


function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}


function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty! 🛒");
        return;
    }

    let form = document.getElementById("checkout-form");

    form.style.display = "block";

    form.scrollIntoView({
        behavior: "smooth"
    });
}


function placeOrder() {

    let name =
        document.getElementById("customer-name").value.trim();

    let phone =
        document.getElementById("customer-phone").value.trim();

    let address =
        document.getElementById("customer-address").value.trim();


    if (name === "" || phone === "" || address === "") {

        alert("Please fill in all information.");

        return;
    }


    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    let total = 0;

    let message =
        "🛒 AL FALAQ SUPER MARKET - NEW ORDER\n\n";


    message +=
        "👤 Customer: " + name + "\n";

    message +=
        "📞 Phone: " + phone + "\n";

    message +=
        "📍 Address: " + address + "\n\n";


    message +=
        "📦 ORDER DETAILS\n";


    cart.forEach(function(item) {

        let itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        message +=
            item.name +
            " × " +
            item.quantity +
            " = AED " +
            itemTotal.toFixed(2) +
            "\n";
    });


    // Delivery Charge
    let deliveryCharge = 5;

    // Grand Total
    let grandTotal =
        total + deliveryCharge;


    message +=
        "\n💵 Subtotal: AED " +
        total.toFixed(2);


    message +=
        "\n🚚 Delivery: AED " +
        deliveryCharge.toFixed(2);


    message +=
        "\n💰 GRAND TOTAL: AED " +
        grandTotal.toFixed(2);


    let whatsappNumber =
        "971521104489";


    let url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    alert(
        "✅ Order Ready!\n\n" +
        "Total: AED " +
        grandTotal.toFixed(2) +
        "\n\nWhatsApp-এ আপনার order পাঠানো হচ্ছে।"
    );


    window.open(url, "_blank");


    // Clear Cart
    cart = [];

    updateCart();
}


function shopNow() {

    document
        .querySelector(".products")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function searchProducts() {

    let text =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    let products =
        document.querySelectorAll(".product");


    products.forEach(function(product) {

        let name =
            product
                .querySelector("h3")
                .innerText
                .toLowerCase();


        if (name.includes(text)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });
}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

    }
);