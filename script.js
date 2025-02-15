document.addEventListener("DOMContentLoaded", function () {
    // API URL for fetching product data
    const apiUrl = "https://script.google.com/macros/s/AKfycbwvvUvrysDlkxR5Sb1zbiUL8HHPCLKtMRGQwSUNHcouy9UPavszV49DgayBDdrgZVnk/exec";

    // Mobile Menu Toggle
    const menuBtn = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuBtn.addEventListener("click", function () {
        if (navMenu.classList.contains("active")) {
            navMenu.style.display = "none"; // Close Menu
            navMenu.classList.remove("active");
        } else {
            navMenu.style.display = "block"; // Open Menu
            navMenu.classList.add("active");
        }
    });

    // Select elements for loading animations and product sections
    const featuredLoader = document.getElementById("featured-loader");
    const collectionLoader = document.getElementById("collection-loader");
    const featuredGallery = document.getElementById("featured-gallery");
    const productGallery = document.getElementById("product-gallery");

    // Show loaders initially & hide product sections
    featuredLoader.style.display = "flex";
    collectionLoader.style.display = "flex";
    featuredGallery.style.display = "none";
    productGallery.style.display = "none";

    // Fetch products data once and use it for both sections
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Filter out empty rows
        const filteredData = data.filter(product => 
            product['Product ID'] && product['Product Name'] && product['Image URL']
        );

        // Display products in 'Our Collection'
        displayProducts(filteredData);

        // Display latest 3 products in 'Featured Products'
        displayFeaturedProducts(filteredData);
      })
      .catch(error => console.error("Error fetching data:", error))
      .finally(() => {
        // Hide loaders and show product sections after fetching
        featuredLoader.style.display = "none";
        collectionLoader.style.display = "none";
        featuredGallery.style.display = "grid";
        productGallery.style.display = "grid";
      });

    // Function to display products in "Our Collection"
    function displayProducts(products) {
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

    // Function to display latest 3 products in "Featured Products"
    function displayFeaturedProducts(products) {
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

    // Auto-Sliding Image Functionality for the Hero Section
    let sliderImages = document.querySelectorAll(".slider img");
    let currentIndex = 0;

    function changeSlide() {
        sliderImages[currentIndex].classList.remove("active"); // Hide current image
        currentIndex = (currentIndex + 1) % sliderImages.length; // Move to next image
        sliderImages[currentIndex].classList.add("active"); // Show new image
    }

    setInterval(changeSlide, 3000); // Change slide every 3 seconds
});

// Function to navigate to Product Details Page
function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}
