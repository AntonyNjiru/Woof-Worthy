const searchButton = document.getElementById('search-button');
const container = document.querySelector('.container');

// Function for fetching random dog images from the Dog CEO API
async function fetchRandomDogImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return data.message;  // Returns the URL of a random dog image
}

// Function for fetching data from the local API and updating it with random dog images
async function fetchPets() {
    try {
        const response = await fetch('http://localhost:3000/pets');
        const pets = await response.json();
        for (let pet of pets) {
            pet.photo_url = await fetchRandomDogImage(); // Replace each pet's photo URL with a random dog image
        }
        generateHTML(pets);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

// Adding an event listener to the button for fetching the JSON data
searchButton.addEventListener('click', fetchPets);

// Function for generating HTML elements to display pets
function generateHTML(pets) {
    let generatedHTML = '';
    pets.forEach(result => {
        generatedHTML +=
        `
        <div class="animal-grid">
            <div class="card" data-id="${result.id}">
                <div class="img">
                    <img src="${result.photo_url}" alt="${result.name}">
                </div>
                <div class="info">
                    <h2>${result.name}</h2>
                    <div class="single-info">
                        <span>Breed: </span>
                        <span>${result.breed}</span>
                    </div>
                    <div class="single-info">
                        <span>Gender: </span>
                        <span>${result.gender}</span>
                    </div>
                    <div class="single-info">
                        <span>Age: </span>
                        <span>${result.age}</span>
                    </div>
                    <div class="single-info">
                        <span>Adoption Date: </span>
                        <span>${result.adoption_date}</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    container.innerHTML = generatedHTML;
}
