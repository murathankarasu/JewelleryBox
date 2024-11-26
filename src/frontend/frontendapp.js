const API_URL = "http://localhost:3000/products";
const productContainer = document.getElementById("product-container");

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("API'den ürün verileri alınamadı");
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Ürünler alınırken hata oluştu:", error.message);
    }
}

function displayProducts(products) {
    productContainer.innerHTML = "";
    const visibleProducts = products.slice(0, 4);

    visibleProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");

        let currentImage = product.images.yellow;
        let currentColor = "Yellow Gold";

        productCard.innerHTML = `
            <img src="${currentImage}" alt="${product.name}">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <div class="color-picker">
                <button class="yellow" onclick="changeImage(this, '${product.images.yellow}', 'Yellow Gold')"></button>
                <button class="rose" onclick="changeImage(this, '${product.images.rose}', 'Rose Gold')"></button>
                <button class="white" onclick="changeImage(this, '${product.images.white}', 'White Gold')"></button>
            </div>
            <div class="selected-color">${currentColor}</div>
            <div class="star-rating">${generateStars(product.popularityScore)}</div>
        `;

        productContainer.appendChild(productCard);
    });

    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton");

    nextButton.addEventListener("click", () => {
        productContainer.scrollBy({
            left: 300 * 4,
            behavior: "smooth",
        });
    });

    prevButton.addEventListener("click", () => {
        productContainer.scrollBy({
            left: -300 * 4,
            behavior: "smooth",
        });
    });

    products.slice(4).forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");

        let currentImage = product.images.yellow;
        let currentColor = "Yellow Gold";

        productCard.innerHTML = `
            <img src="${currentImage}" alt="${product.name}">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <div class="color-picker">
                <button class="yellow" onclick="changeImage(this, '${product.images.yellow}', 'Yellow Gold')"></button>
                <button class="rose" onclick="changeImage(this, '${product.images.rose}', 'Rose Gold')"></button>
                <button class="white" onclick="changeImage(this, '${product.images.white}', 'White Gold')"></button>
            </div>
            <div class="selected-color">${currentColor}</div>
            <div class="star-rating">${generateStars(product.popularityScore)}</div>
        `;

        productContainer.appendChild(productCard);
    });
}

function generateStars(score) {
    const maxStars = 5;
    const filledStars = Math.round((score / 100) * maxStars); // Puanı 5 üzerinden hesapla
    let starsHTML = "";
    for (let i = 1; i <= maxStars; i++) {
        if (i <= filledStars) {
            starsHTML += '<span class="star">★</span>';
        } else {
            starsHTML += '<span class="star empty">☆</span>';
        }
    }
    return starsHTML;
}

function changeImage(button, newImage, colorName) {
    const productCard = button.closest(".product");
    const img = productCard.querySelector("img");
    img.src = newImage;

    const selectedColorText = productCard.querySelector(".selected-color");
    selectedColorText.textContent = colorName;

    const colorButtons = productCard.querySelectorAll(".color-picker button");
    colorButtons.forEach((btn) => {
        btn.style.outline = "none";
    });
    button.style.outline = "2px solid black";
}

const filterButton = document.getElementById("filterButton");
const filterPopup = document.getElementById("filterPopup");
const applyFiltersButton = document.getElementById("applyFilters");

filterButton.addEventListener("click", () => {
    filterPopup.classList.toggle("hidden");
});

applyFiltersButton.addEventListener("click", () => {
    const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
    const minPopularity = parseFloat(document.getElementById("minPopularity").value) || 0;

    const filteredProducts = allProducts.filter((product) => {
        const price = parseFloat(product.price);
        const popularity = product.popularityScore;
        return price >= minPrice && price <= maxPrice && popularity >= minPopularity;
    });

    displayProducts(filteredProducts);
    filterPopup.classList.add("hidden");
});
fetchProducts();
