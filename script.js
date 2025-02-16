document.addEventListener("DOMContentLoaded", function () {
    // API URL for fetching product data
    const apiUrl = "https://script.google.com/macros/s/AKfycbwvvUvrysDlkxR5Sb1zbiUL8HHPCLKtMRGQwSUNHcouy9UPavszV49DgayBDdrgZVnk/exec";

    // 🔹 Mobile Menu Toggle
    const menuBtn = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuBtn) {
        menuBtn.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            navMenu.style.display = navMenu.classList.contains("active") ? "block" : "none";
        });
    }

    // 🔹 Select elements for loaders & product sections
    const featuredLoader = document.getElementById("featured-loader");
    const collectionLoader = document.getElementById("collection-loader");
    const featuredGallery = document.getElementById("featured-gallery");
    const productGallery = document.getElementById("product-gallery");

    // 🔹 Ensure loaders are visible initially & hide products
    if (featuredLoader && collectionLoader) {
        featuredLoader.style.display = "flex";
        collectionLoader.style.display = "flex";
    }
    if (featuredGallery && productGallery) {
        featuredGallery.style.display = "none";
        productGallery.style.display = "none";
    }

    // 🔹 Fetch data once and use for both sections
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Exclude empty rows
            const filteredData = data.filter(product =>
                product['Product ID'] && product['Product Name'] && product['Image URL']
            );

            // Display products in 'Our Collection' & 'Featured Products'
            displayProducts(filteredData);
            displayFeaturedProducts(filteredData);
        })
        .catch(error => console.error("Error fetching data:", error))
        .finally(() => {
            // 🔹 Hide loaders & show products after fetching (with a slight delay for smooth transition)
            setTimeout(() => {
                if (featuredLoader && collectionLoader) {
                    featuredLoader.style.display = "none";
                    collectionLoader.style.display = "none";
                }
                if (featuredGallery && productGallery) {
                    featuredGallery.style.display = "grid";
                    productGallery.style.display = "grid";
                }
            }, 500); // Delay ensures smooth transition
        });

    // 🔹 Function to display products in "Our Collection"
    function displayProducts(products) {
        if (!productGallery) return;
        productGallery.innerHTML = ""; // Clear existing content

        products.forEach(product => {
            let productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="${product['Image URL']}" alt="${product['Product Name']}">
                <h3>${product['Product Name']}</h3>
                <p>Category: ${product['Category']}</p>
                <p>Price: ${product['Price']} BDT</p>
                <button onclick="viewProduct('${product['Product ID']}')">View Details</button>
            `;

            productGallery.appendChild(productCard);
        });
    }

    // 🔹 Function to display latest 3 products in "Featured Products"
    function displayFeaturedProducts(products) {
        if (!featuredGallery) return;
        featuredGallery.innerHTML = ""; // Clear existing content

        const featuredProducts = products.slice(-3); // Get latest 3 products

        featuredProducts.forEach(product => {
            let productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="${product['Image URL']}" alt="${product['Product Name']}">
                <h3>${product['Product Name']}</h3>
                <p>Category: ${product['Category']}</p>
                <p>Price: ${product['Price']} BDT</p>
                <button onclick="viewProduct('${product['Product ID']}')">View Details</button>
            `;

            featuredGallery.appendChild(productCard);
        });
    }

    // 🔹 Auto-Sliding Image Functionality for the Hero Section
    let sliderImages = document.querySelectorAll(".slider img");
    let currentIndex = 0;

    function changeSlide() {
        if (sliderImages.length === 0) return; // Avoid errors if no images

        sliderImages[currentIndex].classList.remove("active"); // Hide current image
        currentIndex = (currentIndex + 1) % sliderImages.length; // Move to next image
        sliderImages[currentIndex].classList.add("active"); // Show new image
    }

    setInterval(changeSlide, 3000); // Change slide every 3 seconds
});

// 🔹 Function to navigate to Product Details Page
function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}
