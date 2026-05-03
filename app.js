const API_URL = 'https://api.freeapi.app/api/v1/public/cats/cat/random';

// DOM Elements
const catImage = document.getElementById('cat-image');
const placeholder = document.getElementById('placeholder');
const breedName = document.getElementById('breed-name');
const temperamentTags = document.getElementById('temperament-tags');
const origin = document.getElementById('origin');
const description = document.getElementById('description');
const newCatBtn = document.getElementById('new-cat-btn');
const saveCatBtn = document.getElementById('save-cat-btn');
const spinner = document.getElementById('spinner');
const btnText = document.getElementById('btn-text');
const errorMessage = document.getElementById('error-message');
const galleryContainer = document.getElementById('gallery-container');
const galleryGrid = document.getElementById('gallery-grid');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');

// State
let currentCatUrl = '';
let savedCats = [];

/**
 * Fetch a random cat from the API
 */
async function fetchCat() {
    toggleLoading(true);
    errorMessage.classList.add('hidden');
    catImage.classList.remove('loaded');

    try {
        const response = await fetch(API_URL, { 
            method: 'GET',
            headers: { 'accept': 'application/json' }
        });
        
        if (!response.ok) throw new Error('Failed to fetch cat');
        
        const result = await response.json();
        const data = result.data;

        if (!data) throw new Error('Invalid data received');

        // Update: The API response structure matches the user's provided JSON
        // data.image is the URL, and other fields are direct properties of data
        currentCatUrl = data.image || data.url; // Support both just in case
        
        if (!currentCatUrl) throw new Error('No image URL found');

        breedName.textContent = data.name || 'Unknown Breed';
        origin.textContent = data.origin ? `Origin: ${data.origin}` : '';
        description.textContent = data.description || 'No description available for this cutie.';
        
        // Temperament tags
        temperamentTags.innerHTML = '';
        if (data.temperament) {
            const tags = data.temperament.split(',').map(t => t.trim());
            tags.forEach(tag => {
                const pill = document.createElement('span');
                pill.className = 'bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full';
                pill.textContent = tag;
                temperamentTags.appendChild(pill);
            });
        }

        // Set image source and wait for load
        catImage.src = currentCatUrl;
        catImage.onload = () => {
            catImage.classList.add('loaded');
            toggleLoading(false);
        };
        
        // Fallback for image loading error
        catImage.onerror = () => {
            console.error('Failed to load image from:', currentCatUrl);
            errorMessage.textContent = "Image failed to load. Try another cat! 🐱";
            errorMessage.classList.remove('hidden');
            toggleLoading(false);
        };

    } catch (error) {
        console.error('Error fetching cat:', error);
        errorMessage.textContent = "Couldn't fetch cat. Try again.";
        errorMessage.classList.remove('hidden');
        toggleLoading(false);
    }
}

/**
 * Toggle loading states for UI elements
 */
function toggleLoading(isLoading) {
    if (isLoading) {
        newCatBtn.disabled = true;
        spinner.classList.remove('hidden');
        btnText.classList.add('hidden');
        placeholder.classList.remove('hidden');
    } else {
        newCatBtn.disabled = false;
        spinner.classList.add('hidden');
        btnText.classList.remove('hidden');
        placeholder.classList.add('hidden');
    }
}

/**
 * Save current cat to gallery
 */
function saveCat() {
    if (!currentCatUrl || savedCats.includes(currentCatUrl)) return;
    
    savedCats.push(currentCatUrl);
    updateGallery();
}

/**
 * Update gallery thumbnails
 */
function updateGallery() {
    if (savedCats.length > 0) {
        galleryContainer.classList.remove('hidden');
    }

    galleryGrid.innerHTML = '';
    savedCats.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.className = 'thumbnail hover:opacity-80 transition-opacity';
        img.alt = 'Saved cat';
        img.onclick = () => openModal(url);
        galleryGrid.appendChild(img);
    });
}

/**
 * Modal functions
 */
function openModal(url) {
    modalImage.src = url;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeCatModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// Event Listeners
newCatBtn.addEventListener('click', fetchCat);
saveCatBtn.addEventListener('click', saveCat);

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target === closeModal) {
        closeCatModal();
    }
});

// Initial Fetch
fetchCat();
