document.addEventListener('DOMContentLoaded', init);

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const container = document.querySelector('.container');

async function init() {
    setupEventListeners();
    await fetchPets();
}

async function fetchRandomDogImage() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error fetching random dog image:', error);
        return 'default-image-url.jpg';  // Fallback image URL
    }
}

async function fetchPets(searchTerm = '') {
    try {
        const response = await fetch('http://localhost:3000/pets');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        let pets = await response.json();
        
        console.log("All Pets:", pets);

        if (searchTerm) {
            searchTerm = searchTerm.toLowerCase();
            pets = pets.filter(pet => 
                pet.breed.toLowerCase().includes(searchTerm) || 
                pet.gender.toLowerCase().includes(searchTerm)
            );
            console.log("Filtered Pets:", pets);
        }

        await Promise.all(pets.map(async (pet) => {
            pet.photo_url = await fetchRandomDogImage();  // Update image URL
        }));

        generateHTML(pets);
    } catch (error) {
        console.error('Failed to fetch pets data:', error);
        container.innerHTML = '<p>Error loading pets. Please try again later.</p>';
    }
}

function generateHTML(pets) {
    let generatedHTML = '';
    pets.forEach(pet => {
        const likedClass = isLiked(pet.id) ? 'liked' : '';
        generatedHTML += `
            <div class="animal-grid">
                <div class="card" data-id="${pet.id}">
                    <div class="img">
                        <img src="${pet.photo_url}" alt="${pet.name}">
                    </div>
                    <div class="info">
                        <h2>${pet.name}</h2>
                        <div class="single-info"><span>Breed: </span><span>${pet.breed}</span></div>
                        <div class="single-info"><span>Gender: </span><span>${pet.gender}</span></div>
                        <div class="single-info"><span>Age: </span><span>${pet.age}</span></div>
                        <div class="single-info"><span>Adoption Date: </span><span>${pet.adoption_date}</span></div>
                        <span class="heart-icon ${likedClass}" data-id="${pet.id}">&#9829;</span>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = generatedHTML;
    attachLikeEventListeners();
}

function attachLikeEventListeners() {
    document.querySelectorAll('.heart-icon').forEach(icon => {
        icon.removeEventListener('click', handleLike); 
        icon.addEventListener('click', handleLike);
    });
}

function handleLike(event) {
    const petId = parseInt(event.target.getAttribute('data-id'));
    toggleLike(petId);
    event.target.classList.toggle('liked');
}

function setupEventListeners() {
    searchButton.addEventListener('click', () => fetchPets(searchInput.value));
}

function toggleLike(petId) {
    const likes = getLikes();
    const index = likes.indexOf(petId);
    if (index !== -1) {
        likes.splice(index, 1);
    } else {
        likes.push(petId);
    }
    localStorage.setItem('likes', JSON.stringify(likes));
}

function getLikes() {
    return JSON.parse(localStorage.getItem('likes') || '[]');
}

function isLiked(petId) {
    const likes = getLikes();
    return likes.includes(petId);
}
