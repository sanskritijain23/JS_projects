document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: 'Product 1', price: 10.99 },
        { id: 2, name: 'Product 2', price: 15.99 },
        { id: 3, name: 'Product 3', price: 7.99 }
    ];
    const cart = [];
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartTotalMessage = document.getElementById('cart-total-message');
    const totalPriceDisplay = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <div class="flex justify-between items-center border p-3 rounded-lg">
                <span>
                    ${product.name} - $${product.price.toFixed(2)}
                </span>
                <button
                    data-id="${product.id}"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg">
                    Add to Cart
                </button>
            </div>
        `;
        productList.appendChild(productDiv);
    });
    productList.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            const productId = parseInt(
                event.target.getAttribute('data-id')
            );
            const product = products.find(
                p => p.id === productId
            );
            addToCart(product);
        }
    });
    function addToCart(product) {
        cart.push(product);
        renderCart();
    }
    function renderCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;
        if (cart.length) {
            emptyCartMessage.classList.add('hidden');
            cartTotalMessage.classList.remove('hidden');
            cart.forEach(item => {
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.textContent =
                    `${item.name} - $${item.price.toFixed(2)}`;
                    cartItems.appendChild(cartItem);
            });
            totalPriceDisplay.textContent =
                `$${totalPrice.toFixed(2)}`;
        }
        else {
            emptyCartMessage.classList.remove('hidden');
            cartTotalMessage.classList.add('hidden');
            totalPriceDisplay.textContent = '$0.00';
        }
    }
    checkoutButton.addEventListener('click', function() {
        cart.length = 0;
        alert("Checkout Successfully");
        renderCart();
    });
    renderCart();
});