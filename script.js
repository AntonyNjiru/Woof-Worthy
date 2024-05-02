//grabbing html elements for DOM manipulation
//api link 
const api = 'https://api-staging.adoptapet.com/search/search_form?key=hg4nsv85lppeoqqixy3tnlt3k8lj6o0c&v=3&output=json&species=dog';
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
    }catch(error){
        console.error(error)
    }
    
}

//adding an event listener to the button for fetching the json data
searchButton.addEventListener('click', fetchPets);