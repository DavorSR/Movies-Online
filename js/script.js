// Making const for local created .json file and image path (we get image from external server) 

const movies = "./movies.json";
const imgURL = 'https://www.themoviedb.org';

// Parent element
const main = document.getElementById('watch');


// Call fucntion to see entries

getMovies(movies)

// We fetch fetch data from local .json by calling his relative path

function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {

            showMovies(data.movies);

        })
}



function showMovies(data) {
    // Declare empty element so we can fill it later
    main.innerHTML = '';

    // going through everything element in array
    data.forEach(movies => {
        // Getting every value in array's and setting calling value
        const { title, rating, description, poster } = movies;
        // create new div element for every new entry
        const movieBox = document.createElement('div');
        // adding a class defined in main.scss called movies 
        movieBox.classList.add('movies')
        // Filling movieBox(movies) with content for every entry
        movieBox.innerHTML = `
        
        <img src="${imgURL + poster}" alt="${title}">
        
        <div class="info">
            <h3>${title}</h3>
            <span class="${getRatingColor(rating)}">${rating}</span>
        </div>

        <div class="description">
            <h3>Description</h3>
          ${description}
        </div>`

        main.appendChild(movieBox);


    });
}

// basic if else statment to color rating depend on the score
function getRatingColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red';
    }
}

///////////////////////////////////////

//TMBD getting the api's

const apyKey = 'api_key=e94e7baa546459bf2dbb93a43ae140aa';
const baseURL = 'https://api.themoviedb.org/3';
const apiUrl = baseURL + '/tv/popular?' + apyKey;
const imgApi = 'https://image.tmdb.org/t/p/original';
const shows = document.getElementById('shows');


// console.log(radnom)

getTvShows(apiUrl)

function getTvShows(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showTvShow(data.results);

        })
}

function showTvShow(data) {
    // Declare empty element so we can fill it later
    shows.innerHTML = '';

    // going through everything element in array
    data.forEach(tvShows => {
        // Getting every value in array's and setting calling value
        const { name, poster_path, first_air_date } = tvShows;
        // create new div element for every new entry
        const tvShowBox = document.createElement('div');
        // adding a class defined in main.scss called tvShows 
        tvShowBox.classList.add('tvShows')
        // Filling tvShowBox(tv shows) with content for every entry
        tvShowBox.innerHTML = `
        
        <img src="${imgApi + poster_path}" alt="${name}">
        
        <div class="about">
            <h3>${name}</h3>
            <span>${first_air_date}</span>
        </div>`

        shows.appendChild(tvShowBox);


    });
}


/////////////////////////


var slide = (function () {
    $.ajax({
        'async': false,
        'global': false,
        'url': movies,
        'dataType': "json",
        'success': function (data) {
            slide = data;
        }
    });
    return slide.movies;
})(); 

console.log(slide[2]);




