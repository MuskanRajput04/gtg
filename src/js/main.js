// Start Header Section Script
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const header = document.querySelector('header');
const banner = document.querySelector('.banner');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;
  const winWidth = window.innerWidth;

  if (scrollTop > 500 && winWidth >= 320) {
    header.classList.add("is-sticky");
    header.classList.remove("sticky-down");
  } else {
    header.classList.remove("is-sticky");
    header.classList.add("sticky-down");
  }
});

const navLinks = document.querySelectorAll('.nav-list a:not(.dropdown-toggle)');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Shop Dropdown Toggle
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.dropdown');

if(dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
}

document.addEventListener('click', (e) => {
    if(dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});
// End Header Section Script

// Start Collection Section Script
document.querySelectorAll(".collection-item .ques").forEach(ques => {
  ques.addEventListener("click", function () {
    const item = this.closest(".collection-item");
    const isOpen = item.classList.contains("active");

    document.querySelectorAll(".collection-item").forEach(el => {
      el.classList.remove("active");
    });

    if (!isOpen) {
      item.classList.add("active");
    }
  });
});
// End Collection Section Script

// Start Choice Section Script
const brandCards = document.querySelectorAll(".choice-table .brand-card");
const choiceTable = document.querySelector(".choice-table");

brandCards.forEach((card, index) => {
    card.addEventListener("click", () => {
        document.querySelectorAll(".choice-table th, .choice-table td").forEach(cell => {
            cell.classList.remove("selected-column");
        });

        if (choiceTable) {
            const rows = choiceTable.querySelectorAll("tr");
            rows.forEach(row => {
                const cells = row.querySelectorAll("th, td");
                if (cells[index + 1]) {
                    cells[index + 1].classList.add("selected-column");
                }
            });
        }
    });
});

window.addEventListener("load", () => {
    if (choiceTable) {
        const rows = choiceTable.querySelectorAll("tr");
        rows.forEach(row => {
            const cells = row.querySelectorAll("th, td");
            if (cells[1]) {
                cells[1].classList.add("selected-column");
            }
        });
    }
});
// End Choice Section Script

// Start Product Section Script
// Gallery Data
const galleryImages = [
    { src: './src/assets/img/GTG-Original.png', alt: 'GTG - Original' },
    { src: './src/assets/img/Arose-perfume.png', alt: 'Arose - perfume' },
    { src: './src/assets/img/Bella-perfume.png', alt: 'Bella - perfume' },
    { src: './src/assets/img/Daisies-perfume.png', alt: 'Daisies - perfume' },
    { src: './src/assets/img/Arose-perfume.png', alt: 'Arose - perfume' },
    { src: './src/assets/img/Bella-perfume.png', alt: 'Bella - perfume' },
    { src: './src/assets/img/Daisies-perfume.png', alt: 'Daisies - perfume' },
];

// Fragrances Data
const fragrances = {
    single: [
        { name: 'Original', value: 'original', image: './src/assets/img/GTG-Original.png', badge: true },
        { name: 'Lily', value: 'lily', image: './src/assets/img/GTG-Lily.png', badge: false },
        { name: 'Rose', value: 'rose', image: './src/assets/img/GTG-Rose.png', badge: false }
    ],
    double1: [
        { name: 'Original', value: 'original', image: './src/assets/img/GTG-Original.png', badge: true },
        { name: 'Lily', value: 'lily', image: './src/assets/img/GTG-Lily.png', badge: false },
        { name: 'Rose', value: 'rose', image: './src/assets/img/GTG-Rose.png', badge: false }
    ],
    double2: [
        { name: 'Original', value: 'original', image: './src/assets/img/GTG-Original.png', badge: true },
        { name: 'Lily', value: 'lily', image: './src/assets/img/GTG-Lily.png', badge: false },
        { name: 'Rose', value: 'rose', image: './src/assets/img/GTG-Rose.png', badge: false }
    ]
};

// Purchase Types Data
const purchaseTypes = {
    single: {
        title: 'Single Subscription',
        price: '$99.99',
        originalPrice: '$146',
        boxes: [
            { label: 'Every 30 Days', image: './src/assets/img/GTG-Original.png' },
            { label: 'One Time <b>(Free)</b>', image: './src/assets/img/perfume-set.png' }
        ],
        benefits: [
            '1 Bottle Shipped Monthly',
            '<b>Free</b> Sampler For Original, Lily And Rose Fragrances',
            '<b>50% OFF Shipping</b>',
            'Pause Or Cancel Anytime After 3 Months Minimum',
            '28 Day Money Back Guarantee*'
        ]
    },
    double: {
        title: 'Double Subscription',
        price: '$169.99',
        originalPrice: '$146',
        boxes: [
             { label: 'Every 30 Days', image: './src/assets/img/GTG-Original.png' },
            { label: 'One Time <b>(Free)</b>', image: './src/assets/img/perfume-set.png' }
        ],
        benefits: [
            '1 Bottle Shipped Monthly',
            '<b>Free</b> Sampler For Original, Lily And Rose Fragrances',
            '<b>50% OFF Shipping</b>',
            'Pause Or Cancel Anytime After 3 Months Minimum',
            '28 Day Money Back Guarantee*'
        ]
    }
};

let currentImageIndex = 0;

function initProductSection() {
    if (!document.querySelector('.product')) return;
    
    initGallery();
    initFragranceSelections();
    initSubscriptionCards();
    initRadioListeners();
    // Call updateAddToCartLink after a short delay to ensure all elements are created
    setTimeout(() => {
        updateAddToCartLink();
    }, 100);
}

// FIXED: Gallery now fully functional
function initGallery() {
    const mainImage = document.getElementById('mainImage');
    const galleryDots = document.getElementById('galleryDots');
    const galleryThumbnails = document.getElementById('galleryThumbnails');

    if (!mainImage || !galleryDots || !galleryThumbnails) return;

    // Clear existing content
    galleryDots.innerHTML = '';
    galleryThumbnails.innerHTML = '';

    // Create dots
    galleryImages.forEach((img, index) => {
        const dot = document.createElement('button');
        dot.className = `gallery-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `View image ${index + 1}`);
        dot.addEventListener('click', () => goToImage(index));
        galleryDots.appendChild(dot);
    });

    // Create thumbnails
    galleryImages.forEach((img, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        const img_el = document.createElement('img');
        img_el.src = img.src;
        img_el.alt = img.alt;
        thumbnail.appendChild(img_el);
        thumbnail.addEventListener('click', () => goToImage(index));
        galleryThumbnails.appendChild(thumbnail);
    });

    // Arrow buttons
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToImage((currentImageIndex - 1 + galleryImages.length) % galleryImages.length);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToImage((currentImageIndex + 1) % galleryImages.length);
        });
    }
}

function goToImage(index) {
    currentImageIndex = index;
    const mainImage = document.getElementById('mainImage');
    
    if (!mainImage) return;
    
    mainImage.src = galleryImages[index].src;
    mainImage.alt = galleryImages[index].alt;

    // Update dots
    document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    // Update thumbnails
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Subscription Cards
function initSubscriptionCards() {
    const radioButtons = document.querySelectorAll('input[name="purchaseType"]');
    
    radioButtons.forEach(button => {
        button.addEventListener('change', () => {
            const type = button.value;
            updateSubscriptionContent(type);
            updateAddToCartLink(); // Update cart link when purchase type changes
        });
    });

    const checkedType = document.querySelector('input[name="purchaseType"]:checked');
    if (checkedType) {
        updateSubscriptionContent(checkedType.value);
    }
}

function updateSubscriptionContent(type) {
    const cards = document.querySelectorAll('.subscription-card');
    cards.forEach(card => {
        const cardType = card.dataset.type;
        
        if (cardType === type) {
            card.classList.add('active');
            const content = card.querySelector('.subscription-content');
            if (content) content.style.display = 'flex';
        } else {
            card.classList.remove('active');
            const content = card.querySelector('.subscription-content');
            if (content) content.style.display = 'none';
        }
    });

    updateIncludedContent(type);
}

function updateIncludedContent(type) {
    const data = purchaseTypes[type];
    
    if (type === 'single') {
        const singleIncluded = document.getElementById('singleIncluded');
        const singleBenefits = document.getElementById('singleBenefits');
        
        if (singleIncluded) {
            singleIncluded.innerHTML = '';
            data.boxes.forEach(box => {
                const boxDiv = document.createElement('div');
                boxDiv.className = 'included-box';
                boxDiv.innerHTML = `
                    <span>${box.label}</span>
                    <img src="${box.image}" alt="${box.label}">
                `;
                singleIncluded.appendChild(boxDiv);
            });
        }
        
        if (singleBenefits) {
            singleBenefits.innerHTML = '';
            data.benefits.forEach(benefit => {
                const li = document.createElement('li');
                li.innerHTML = benefit;
                singleBenefits.appendChild(li);
            });
        }
    } 
    else if (type === 'double') {
        const doubleIncluded = document.getElementById('doubleIncluded');
        const doubleBenefits = document.getElementById('doubleBenefits');
        
        if (doubleIncluded) {
            doubleIncluded.innerHTML = '';
            data.boxes.forEach(box => {
                const boxDiv = document.createElement('div');
                boxDiv.className = 'included-box';
                boxDiv.innerHTML = `
                    <span>${box.label}</span>
                    <img src="${box.image}" alt="${box.label}">
                `;
                doubleIncluded.appendChild(boxDiv);
            });
        }
        
        if (doubleBenefits) {
            doubleBenefits.innerHTML = '';
            data.benefits.forEach(benefit => {
                const li = document.createElement('li');
                li.innerHTML = benefit;
                doubleBenefits.appendChild(li);
            });
        }
    }
}

// Fragrance Selections
function initFragranceSelections() {
    const singleFragrances = document.getElementById('singleFragrances');
    if (singleFragrances) {
        populateFragranceOptions(singleFragrances, fragrances.single, 'fragrance-single');
    }

    const doubleFragrances1 = document.getElementById('doubleFragrances1');
    if (doubleFragrances1) {
        populateFragranceOptions(doubleFragrances1, fragrances.double1, 'fragrance-double1');
    }

    const doubleFragrances2 = document.getElementById('doubleFragrances2');
    if (doubleFragrances2) {
        populateFragranceOptions(doubleFragrances2, fragrances.double2, 'fragrance-double2');
    }
}

function populateFragranceOptions(container, options, groupName) {
    options.forEach((option, index) => {
        const label = document.createElement('label');
        label.className = 'fragrance-option';

        const radioTextDiv = document.createElement('div');
        radioTextDiv.style.display = 'flex';
        radioTextDiv.style.flexDirection = 'row';
        radioTextDiv.style.alignItems = 'center';
        radioTextDiv.style.gap = '0.5rem';
        radioTextDiv.style.width = '100%';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = groupName;
        input.value = option.value;
        if (index === 0) input.checked = true;
        input.addEventListener('change', updateAddToCartLink); // Listen for changes

        const checkmark = document.createElement('span');
        checkmark.className = 'radio-checkmark';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'fragrance-name';
        nameSpan.textContent = option.name;

        radioTextDiv.appendChild(input);
        radioTextDiv.appendChild(checkmark);
        radioTextDiv.appendChild(nameSpan);

        const img = document.createElement('img');
        img.src = option.image;
        img.alt = option.name;
        img.className = 'fragrance-img';

        label.appendChild(radioTextDiv);
        label.appendChild(img);

        if (option.badge) {
            const badge = document.createElement('span');
            badge.className = 'best-seller-badge';
            badge.textContent = 'Best Seller';
            label.appendChild(badge);
        }

        container.appendChild(label);
    });
}

// Radio Listeners
function initRadioListeners() {
    const radioButtons = document.querySelectorAll('input[name="purchaseType"]');
    radioButtons.forEach(button => {
        button.addEventListener('change', updateAddToCartLink);
    });
}

// FIXED: Dynamic Add to Cart Link with 9 variations
function updateAddToCartLink() {
    const purchaseTypeEl = document.querySelector('input[name="purchaseType"]:checked');
    if (!purchaseTypeEl) return;
    
    const purchaseType = purchaseTypeEl.value;
    let fragrance1 = '';
    let fragrance2 = '';

    if (purchaseType === 'single') {
        const singleFragrance = document.querySelector('input[name="fragrance-single"]:checked');
        fragrance1 = singleFragrance ? singleFragrance.value : 'original';
        fragrance2 = 'none';
    } else if (purchaseType === 'double') {
        const doubleFragrance1 = document.querySelector('input[name="fragrance-double1"]:checked');
        const doubleFragrance2 = document.querySelector('input[name="fragrance-double2"]:checked');
        fragrance1 = doubleFragrance1 ? doubleFragrance1.value : 'original';
        fragrance2 = doubleFragrance2 ? doubleFragrance2.value : 'original';
    }

    // Generate unique cart link (9 possible variations)
    // Single: original, lily, rose (3 variations)
    // Double: 9 combinations of fragrances
    const cartLink = `https://example.com/cart?type=${purchaseType}&frag1=${fragrance1}&frag2=${fragrance2}`;
    
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.href = cartLink;
        addToCartBtn.setAttribute('href', cartLink);
        console.log('Cart link updated:', cartLink); // For debugging
        console.log('Button element:', addToCartBtn); // Check if button exists
    } else {
        console.error('Add to cart button not found!');
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    initProductSection();
});
// End Product Section Script

// Start Fact Section Script
document.querySelectorAll('.fact-count').forEach(counter => {
    let target = parseInt(counter.innerText);
    let count = 0;

    let interval = setInterval(() => {
        count++;
        counter.innerText = count + '%';

        if (count === target) clearInterval(interval);
    }, 20); 
});
// End Fact Section Script