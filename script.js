function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const overlay = document.getElementById('overlay');

    // Toggle active classes for sidebar, overlay, and content shift
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('shifted');
    overlay.classList.toggle('active');
}
const sidebarLinks = document.querySelectorAll('.sidebar-list li a');
const sections = document.querySelectorAll('section');

sidebarLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Prevent default behavior of jumping
        event.preventDefault();

        // Remove the 'active' class from all links
        sidebarLinks.forEach(link => link.classList.remove('active'));
        
        // Add the 'active' class to the clicked link
        this.classList.add('active');
        
        // Scroll to the corresponding section
        const targetId = this.getAttribute('href').substring(1);  // Get section ID from href
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Optional: Highlight active link as you scroll through sections
window.addEventListener('scroll', () => {
    let currentSection = null;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) {
            currentSection = section;
        }
    });

    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (currentSection && link.getAttribute('href').substring(1) === currentSection.id) {
            link.classList.add('active');
        }
    });
});



// Function to load content based on clicked section
function loadSection(section) {
    const contentPlaceholder = document.getElementById('content-placeholder');

    let content = '';

    switch (section) {
        case 'reviews':
            content = `
                <div class="section reviews">
                    <h2>Customer Reviews</h2>
                    <p>Here are some reviews from our satisfied customers:</p>
                    <ul class="review-list">
                        <li class="review-item">"I love my new bag!" - <span class="review-author">Sarah</span></li>
                        <li class="review-item">"Great quality and fast shipping!" - <span class="review-author">John</span></li>
                        <li class="review-item">"Beautiful designs and affordable prices." - <span class="review-author">Emily</span></li>
                        <li class="review-item">"The bag quality is good and I love it." - <span class="review-author">Maria</span></li>
                    </ul>
                </div>
            `;
            break;

        case 'about':
            content = `
                <div class="section about">
                    <h2>About Us</h2>
                    <p>At The Elegant Atelier, we create beautiful bags that tell a story. Our beads are sourced from around the world, ensuring that each piece is unique.</p>
                    <h3>Our Mission</h3>
                    <p>To provide handmade bags that reflect individuality and style.</p>
                    <h3>Our Process</h3>
                    <p>Each bag is handcrafted with care, ensuring high quality and attention to detail.</p>
                </div>
            `;
            break;

        case 'shipping':
            content = `
                <div class="section shipping">
                    <h2>Shipping Policy</h2>
                    <p>We offer fast and reliable shipping on all orders. Orders are processed within 2-3 business days.</p>
                    <p>Shipping costs will be calculated at checkout based on your location.</p>
                </div>
            `;
            break;

        case 'contact':
            content = `
                <div class="section contact">
                    <h2>Contact Us</h2>
                    <p>If you have any questions or concerns, please reach out to us:</p>
                    <p>Email: <a href="mailto:support@theelegantatelier.com">support@theelegantatelier.com</a></p>
                    <p>Phone: +123456789</p>
                    <p>Address: 123 The Elegant Atelier Lane, Ateliersville, CA 90210</p>
                </div>
            `;
            break;

        case 'privacy':
            content = `
                <div class="section privacy">
                    <h2>Privacy Policy</h2>
                    <p>Your privacy is important to us. We collect personal information to enhance your shopping experience.</p>
                    <p>We will never share your information with third parties without your consent.</p>
                </div>
            `;
            break;

        case 'refund':
            content = `
                <div class="section refund">
                    <h2>Return and Refund Policy</h2>
                    <p>We accept returns within 30 days of purchase. Items must be unused and in their original packaging.</p>
                    <p>If you receive a defective product, please contact us for a refund or exchange.</p>
                </div>
            `;
            break;
    }

    contentPlaceholder.innerHTML = content;

    // Optionally, you can add styles dynamically if needed
    applyStyles();
}

// Initialize an empty cart array
let cart = [];

// Function to add item to the cart
function addToCart(button) {
    const product = {
        id: button.getAttribute('data-id'),
        name: button.getAttribute('data-name'),
        price: parseFloat(button.getAttribute('data-price')),
        quantity: 1
    };

    // Check if product already exists in the cart
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        // If the product exists, update the quantity
        existingProduct.quantity++;
    } else {
        // If it's a new product, add it to the cart
        cart.push(product);
    }

    // Update the cart display
    updateCartDisplay();
}

// Function to remove item from the cart
function removeFromCart(productId) {
    // Find the product in the cart by its ID
    const productIndex = cart.findIndex(item => item.id === productId);
    
    // If the product is found, remove it from the cart
    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
    }

    // Update the cart display
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const cartCount = document.getElementById('cart-count');
    
    // Clear the current cart items
    cartItemsContainer.innerHTML = '';

    let total = 0;

    // Loop through the cart and add each item to the display
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;

        // Add a remove button next to each item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.setAttribute('data-id', item.id);
        removeButton.onclick = () => removeFromCart(item.id); // Remove item when clicked
        
        listItem.appendChild(removeButton);
        cartItemsContainer.appendChild(listItem);
    });

    // Update the total amount
    totalAmount.textContent = `Total: $${total.toFixed(2)}`;

    // Update the cart item count in the icon
    cartCount.textContent = cart.length;
}

// Handle place order button
document.getElementById('place-order').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Order placed successfully!');
        // Here you can implement actual order placement functionality
    }
});

// Toggle the cart display when the cart icon is clicked
document.getElementById('cart-toggle').addEventListener('click', () => {
    const cartElement = document.getElementById('cart');
    // Toggle the display of the cart (show/hide)
    cartElement.style.display = cartElement.style.display === 'none' ? 'block' : 'none';
});

// Add event listener to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        addToCart(this); // Add product to the cart when button is clicked
    });
});
// Get the search icon, search input, and results container
const searchIcon = document.getElementById('search-icon');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
searchIcon.addEventListener('click', () => {
  // Toggle visibility of the search input
  searchInput.style.display = searchInput.style.display === 'none' || searchInput.style.display === '' ? 'inline-block' : 'none';
  
  // Focus on the search input when shown
  if (searchInput.style.display === 'inline-block') {
    searchInput.focus();
  } else {
    searchResults.style.display = 'none'; // Hide results when input is hidden
  }
});




