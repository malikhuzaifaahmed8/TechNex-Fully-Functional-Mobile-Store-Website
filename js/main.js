// Navbar toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
if(menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Search toggle
const searchToggle = document.querySelector('.search-toggle');
const searchBar = document.querySelector('.search-bar');
if(searchToggle && searchBar) {
    searchToggle.addEventListener('click', () => {
        searchBar.classList.toggle('active');
    });
}

// Cart toggle
const cartToggle = document.querySelector('.cart-toggle');
const cartBox = document.querySelector('.cart-box');
if(cartToggle && cartBox) {
    cartToggle.addEventListener('click', () => {
        cartBox.classList.toggle('open');
    });
}