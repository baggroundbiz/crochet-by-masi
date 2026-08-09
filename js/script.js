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
    
    // If using Formspree or FormSubmit, put the URL here. 
    // Example: "https://formsubmit.co/your-email@example.com"
    // Leave it as "" if you don't have a form backend yet.
    formEndpoint: "" 
};

// ========================================
// PRODUCT DATABASE
// Add, edit, or remove products here.
// Categories should be: "flowers", "amigurumi", "gifts", "home"
// ========================================
const products = [
    {
        id: 1,
        name: "Crochet Rose Bouquet",
        category: "flowers",
        price: 1299,
        description: "A beautiful handmade bouquet of everlasting crochet roses.",
        image: "https://images.unsplash.com/photo-1628157732272-2d8c90ebdb5c?q=80&w=600&auto=format&fit=crop",
        available: true,
        featured: true
    },
    {
        id: 2,
        name: "Mini Crochet Bear",
        category: "amigurumi",
        price: 799,
        description: "An adorable, soft, and huggable mini bear. Perfect for gifting.",
        image: "https://images.unsplash.com/photo-1520986606214-8b456906c813?q=80&w=600&auto=format&fit=crop",
        available: true,
        featured: true
    },
    {
        id: 3,
        name: "Crochet Flower Pot",
        category: "home",
        price: 899,
        description: "A cute little potted plant that needs zero watering.",
        image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=600&auto=format&fit=crop",
        available: true,
        featured: true
    },
    {
        id: 4,
        name: "Daisy Coasters (Set of 4)",
        category: "home",
        price: 599,
        description: "Protect your tables with these lovely floral coasters.",
        image: "https://images.unsplash.com/photo-1616874535244-73aea5daadb4?q=80&w=600&auto=format&fit=crop",
        available: true,
        featured: false
    },
    {
        id: 5,
        name: "Custom Gift Creation",
        category: "gifts",
        price: "On Request",
        description: "A completely custom piece designed just for your loved one.",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop",
        available: true,
        featured: true
    },
    {
        id: 6,
        name: "Sleepy Bunny Plush",
        category: "amigurumi",
        price: 1199,
        description: "A sleepy bunny with long ears, perfect for nurseries.",
        image: "https://images.unsplash.com/photo-1603403328080-2a8d56b099b2?q=80&w=600&auto=format&fit=crop",
        available: true,
        featured: false
    },
    {
        id: 7,
        name: "Sunflower Keychain",
        category: "gifts",
        price: 349,
        description: "Carry a little sunshine with you wherever you go.",
        image: "https://images.unsplash.com/photo-1596431980862-23097b65349e?q=80&w=600&auto=format&fit=crop",
        available: true,
        featured: false
    },
    {
        id: 8,
        name: "Tulip Bouquet",
        category: "flowers",
        price: 1499,
        description: "Vibrant crochet tulips wrapped beautifully for gifting.",
        image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=600&auto=format&fit=crop",
        available: true,
        featured: false
    }
];

// ========================================
// CORE LOGIC (Do not edit below unless necessary)
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initDynamicLinks();
    initFooterYear();
    
    // Page specific initialization
    if (document.getElementById('featured-products-grid')) {
        renderProducts(products.filter(p => p.featured), 'featured-products-grid');
    }
    
    if (document.getElementById('shop-products-grid')) {
        initShop();
    }
    
    if (document.getElementById('custom-order-form')) {
        initForm();
    }
});

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
function renderProducts(productsToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (productsToRender.length === 0) {
        document.getElementById('no-products-msg')?.classList.remove('hidden');
        return;
    }
    
    document.getElementById('no-products-msg')?.classList.add('hidden');

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
    renderProducts(products, 'shop-products-grid');
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('product-search');
    
    let currentCategory = 'all';
    let currentSearch = '';

    // Check URL parameters for category
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
            filtered = filtered.filter(p => p.category === currentCategory);
        }

        if (currentSearch.trim() !== '') {
            const query = currentSearch.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.description.toLowerCase().includes(query)
            );
        }

        renderProducts(filtered, 'shop-products-grid');
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
        // No backend configured. Hide form, show fallback.
        form.classList.add('hidden');
        fallbackUI.classList.remove('hidden');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
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
