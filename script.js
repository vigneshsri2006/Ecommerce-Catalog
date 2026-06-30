const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");

let allProducts = [];

// Products Load
async function loadProducts() {
    try {
        const response = await fetch("products.json");
        allProducts = await response.json();
        displayProducts(allProducts);
    } catch (error) {
        productsContainer.innerHTML = "<h2>Failed to load products.</h2>";
        console.error(error);
    }
}

// Display Products
// Display Products
function displayProducts(products) {
    productsContainer.innerHTML = "";

    products.forEach(product => {
        productsContainer.innerHTML += `
            <div class="card">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Category: ${product.category}</p>
                <p>⭐ ${product.rating}</p>
                <h3>₹${product.price}</h3>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

// Search
if (searchInput) {
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();

        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchText)
        );

        displayProducts(filteredProducts);
    });
}
// Start
loadProducts();

function addToCart(id) {

    const product = allProducts.find(item => item.id === id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(product.name + " added to cart!");
}

