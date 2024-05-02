//grabbing html elements for DOM manipulation
//api link 
const api = 'https://api-staging.adoptapet.com/search/pet_search?key=hg4nsv85lppeoqqixy3tnlt3k8lj6o0c&v=3&output=json&city_or_zip=47374&geo_range=50&species=dog&breed_id=real=801&sex=m&age=young&color_id=54&pet_size_range_id=2&hair=&bonded_pair=&special_needs=&include_mixes=&added_after=&start_number=1&end_number=50&meta_only=0';
//grabbing the search button
const searchButton = document.getElementById('search-button');
//grabbing the input form(getting the search value of the type of dog)
let input = document.querySelector('#search-input');
//grabbing area for result output
const container = document.querySelector('.container');

//function from fetching data from the api
async function fetchPets(){
    try{
        //fetcing the data from api
        const response = await fetch(api);
        //converting data to json
        const petData = await response.json();
        console.log(petData);
        //calling a function for generating html elements
        generateHTML(petData.pets);
    }catch(error){
        console.error(error)
    }
    
}

//adding an event listener to the button for fetching the json data
searchButton.addEventListener('click', fetchPets);

//function for generating html elements
function generateHTML(results){
    //variable containing the html elements
    let generatedHTML = '';
    results.forEach(result => {
        generatedHTML += 
        `
        <div class="animal-grid">
            <div class="card" data-id="${result.pet_id}">
                <div class="img">
                    <img src="${result.large_results_photo_url}" alt="Pet Image">
                </div>
                <div class="info">
                    <h2>${result.pet_name}</h2>
                    <div class="single-info">
                        <span>Breed: </span>
                        <span>${result.primary_breed}</span>
                    </div>
                    <div class="single-info">
                        <span>Gender: </span>
                        <span>${result.sex}</span>
                    </div>
                    <div class="single-info">
                        <span>Age: </span>
                        <span>${result.age}</span>
                    </div>
                    <div class="single-info">
                        <span>Adoption Date: </span>
                        <span>10-04-2022</span>
                    </div>
                </div>
            </div>
        </div>
        `
    });
    container.innerHTML = generatedHTML;
}
