//grabbing html elements for DOM manipulation
//api link 
const api = 'https://api-staging.adoptapet.com/search/search_form?key=hg4nsv85lppeoqqixy3tnlt3k8lj6o0c&v=3&output=json&species=dog';
//grabbing the search button
const searchButton = document.getElementById('search-button');
//grabbing the input form(getting the search value of the type of dog)
const input = document.querySelector('#search-input');
//grabbing area for result output
const container = document.querySelector('.container');
