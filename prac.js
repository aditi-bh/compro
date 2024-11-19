const cartButton = document.querySelector("#cartbut");
const cart = document.querySelector("#cart");
const productList = document.querySelector("#product-list");
const cartIcon = document.getElementById('cart-icon');

// array to hold cart items
let cartItems = [];

// fetch products from an API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products);
        console.log(products);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        cart.innerHTML = "Failed to load products. Please try again later.";
    }
}

// function to display products
function displayProducts(products) {
    productList.innerHTML = ''; 
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item'); 
        const id = document.createElement('span');
        id.textContent = product.id;
        const title = document.createElement('span');
        title.textContent = product.title;
        const image = document.createElement('img');
        image.src = product.image;
        const price = document.createElement('span');
        price.textContent = product.price;
        

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.addEventListener("click", () => addToCart(product.title));

        productItem.appendChild(id);
        productItem.appendChild(image);
        productItem.appendChild(title);
        productItem.appendChild(price);
        productItem.appendChild(addToCartButton);

        productList.appendChild(productItem);
        
    });
}

// function for adding products to cart
function addToCart(productTitle) {
    if (!cartItems.includes(productTitle)) {
        cartItems.push(productTitle); 
        updateCartDisplay();
        updateCartCount(); 
        console.log(`${productTitle} added to cart`);
    } else {
        console.log(`${productTitle} is already in the cart`);
    }
}

// function to update the cart count
function updateCartCount() {
    const cartCount = document.querySelector("#cart-count");
    cartCount.textContent = cartItems.length; 
}

// function to update the cart display
function updateCartDisplay() {
    cart.innerHTML = ''; 
    if (cartItems.length === 0) {
        cart.innerHTML = "Your cart is empty.";
    } else {
        cart.innerHTML = cartItems.map(item => `${item} added to cart`).join('<br>');
    }
}
cartIcon.addEventListener('click', function() {
    if (cart.style.display === 'none' || cart.style.display === '') {
        cart.style.display = 'block';
    } else {
        cart.style.display = 'none';
    }
});


// fetch products
fetchProducts();