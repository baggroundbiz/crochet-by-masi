// ========================================
// CROCHET BY MASI — WEBSITE SETTINGS
// EDIT THESE VALUES
// ========================================

const SITE_CONFIG = {
    // Replace with your actual Instagram handle (without the @)
    instagram: "crochetbymasi", 
    
    // Replace with your WhatsApp number (include country code, no + or spaces. e.g. 919876543210)
    whatsapp: "910000000000", 
    
    // Replace with your email address
    email: "hello@crochetbymasi.com", 
    
    // Form endpoint for Custom Orders (e.g., Formspree URL)
    formEndpoint: "", 

    // YOUR GOOGLE APPS SCRIPT WEB APP URL GOES HERE:
    sheetApiUrl: "https://script.google.com/macros/s/AKfycbx3Ron554XN3yUGhGL0ihZktsu07U0tU9jCm_Ip-0DQFxcVjUnY-idBFoVIeKeDjI3xgQ/exec" 
};

// ========================================
// PRODUCT DATABASE (Populated by Google Sheets)
// ========================================
let products = [];

// ========================================
// CORE LOGIC 
// ========================================

document.addEventListener('DOMContentLoaded', async () => {
    initNavigation();
    initDynamicLinks();
    initFooterYear();
    
    // If the page needs products, fetch them first
    if (document.getElementById('featured-products-grid') || document.getElementById('shop-products-grid')) {
        await fetchProductsFromSheet();
    }
    
    if (document.getElementById('featured-products-grid')) {
        renderProducts(products.filter(p => p.featured === true), 'featured-products-grid', 'featured-loader');
    }
    
    if (document.getElementById('shop-products-grid')) {
        initShop();
    }
    
    if (document.getElementById('custom-order-form')) {
        initForm();
    }
});

// Fetch Data From Google Sheets
async function fetchProductsFromSheet() {
    try {
        if (!SITE_CONFIG.sheetApiUrl || SITE_CONFIG.sheetApiUrl === "PASTE_YOUR_WEB_APP_URL_HERE") {
            throw new Error("API URL not configured yet.");
        }

        const response = await fetch(SITE_CONFIG.sheetApiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        products = data.map(p => ({
            ...p,
            available: p.available === true || p.available === "TRUE",
            featured: p.featured === true || p.featured === "TRUE"
        }));

    } catch (error) {
        console.error("Failed to load products from Google Sheets:", error);
        // Show error message on shop page if fetch fails
        const errorMsg = document.getElementById('fetch-error-msg');
        if (errorMsg) errorMsg.classList.remove('hidden');
    }
}

// Mobile Navigation
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.site-header');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Sticky Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Populate Social / Contact Links
function initDynamicLinks() {
    const instaLinks = document.querySelectorAll('.instagram-link');
    const whatsappLinks = document.querySelectorAll('.whatsapp-link');
    const emailLinks = document.querySelectorAll('.email-link');
    const dynamicInstaTexts = document.querySelectorAll('.dynamic-insta-text');

    const instaUrl = `https://instagram.com/${SITE_CONFIG.instagram}`;
    const defaultWhatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}`;
    const emailUrl = `mailto:${SITE_CONFIG.email}`;

    instaLinks.forEach(link => link.setAttribute('href', instaUrl));
    emailLinks.forEach(link => link.setAttribute('href', emailUrl));
    whatsappLinks.forEach(link => link.setAttribute('href', defaultWhatsappUrl));
    
    dynamicInstaTexts.forEach(el => {
        el.textContent = `Follow @${SITE_CONFIG.instagram}`;
    });
}

// Render Products into a Grid
function renderProducts(productsToRender, containerId, loaderId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Hide the loader gracefully
    const loader = document.getElementById(loaderId);
    if (loader) {
        loader.classList.add('hidden');
    }
    
    // Clear existing products (keep loader if needed, but it's hidden)
    container.innerHTML = ''; 
    
    if (productsToRender.length === 0) {
        const noMsg = document.getElementById('no-products-msg');
        if (noMsg) noMsg.classList.remove('hidden');
        return;
    }
    
    const noMsg = document.getElementById('no-products-msg');
    if (noMsg) noMsg.classList.add('hidden');

    productsToRender.forEach(product => {
        const formattedPrice = typeof product.price === 'number' ? `₹${product.price}` : product.price;
        
        // WhatsApp Order Message
        const orderMessage = encodeURIComponent(`Hi Masi! I'd like to order / enquire about the ${product.name}.`);
        const orderLink = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${orderMessage}`;
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-wrapper">
                ${!product.available ? '<span class="product-badge" style="background:#587472;">Sold Out</span>' : ''}
                <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title decorative-font">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${formattedPrice}</span>
                </div>
                <div class="product-actions" style="display: flex; gap: 0.5rem; flex-direction: column;">
                    <a href="${orderLink}" class="btn btn-primary btn-block" target="_blank" rel="noopener noreferrer">DM to Order</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Shop Filtering and Search
function initShop() {
    renderProducts(products, 'shop-products-grid', 'shop-loader');
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('product-search');
    
    let currentCategory = 'all';
    let currentSearch = '';

    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        currentCategory = categoryParam;
        updateFilterUI(categoryParam);
        filterAndRender();
    }

    function updateFilterUI(category) {
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function filterAndRender() {
        let filtered = products;

        if (currentCategory !== 'all') {
            filtered = filtered.filter(p => p.category.toLowerCase() === currentCategory);
        }

        if (currentSearch.trim() !== '') {
            const query = currentSearch.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.description.toLowerCase().includes(query)
            );
        }

        renderProducts(filtered, 'shop-products-grid', 'shop-loader');
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentCategory = e.target.dataset.filter;
            updateFilterUI(currentCategory);
            filterAndRender();
        });
    });

    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        filterAndRender();
    });
}

// Form Handling Logic
function initForm() {
    const form = document.getElementById('custom-order-form');
    const fallbackUI = document.getElementById('form-fallback');
    const successUI = document.getElementById('form-success');
    const loadingUI = document.getElementById('form-loading');
    const submitBtn = document.getElementById('submit-btn');

    if (!SITE_CONFIG.formEndpoint || SITE_CONFIG.formEndpoint === "") {
        form.classList.add('hidden');
        fallbackUI.classList.remove('hidden');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        submitBtn.disabled = true;
        submitBtn.classList.add('hidden');
        loadingUI.classList.remove('hidden');

        const formData = new FormData(form);

        fetch(SITE_CONFIG.formEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                form.classList.add('hidden');
                loadingUI.classList.add('hidden');
                successUI.classList.remove('hidden');
                form.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        }).catch(error => {
            alert("Oops! There was a problem submitting your form. Please try contacting us via WhatsApp or Instagram directly.");
            submitBtn.disabled = false;
            submitBtn.classList.remove('hidden');
            loadingUI.classList.add('hidden');
        });
    });
}

// Set copyright year
function initFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}
