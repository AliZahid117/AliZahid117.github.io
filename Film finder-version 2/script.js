const tmdbKey = "26a2dedfd493400258d8dfc46172752c";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
    const genreRequestEndpoint = "/genre/movie/list";
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            //console.log(jsonResponse)
            const genres = jsonResponse.genres;
            return genres;
        }
    } catch (error) {
        console.log(error);
    }
};


const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = "/discover/movie";
    const totalPages = 200; // Set this to the maximum number of pages you want to fetch from
    const randomPage = Math.floor(Math.random() * totalPages) + 1; // Generate a random page number
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${randomPage}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const movies = jsonResponse.results;
            return movies;
        }
    } catch (errors) {
        console.log(errors);
    }
};
//getMovies();

const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
    //*
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbKey}`);
    const jsonResponse = await response.json();

    // Convert the rating to a percentage
    jsonResponse.vote_average = Math.floor(jsonResponse.vote_average * 10);
    //*
    return jsonResponse;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const movieInfo = jsonResponse;
            return movieInfo;
        }
    } catch (error) {
        console.log(error);
    }


};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
    const movieInfo = document.getElementById("movieInfo");
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    }
    const movies = await getMovies();
    const randomMovie = getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);

    displayMovie(info);
    likeBtn.onclick = () => likeMovie2(info);
    dislikeBtn.onclick = () => dislikeMovie2(info);
    likeBtn.disabled = false; // Re-enable the like button
    dislikeBtn.disabled = false; // Re-enable the dislike button
    document.getElementById('movieYear').textContent = "Release year: " + info.release_date.split('-')[0];
    document.getElementById('movieRating').textContent = `Score: ${info.vote_average}%`;
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;


//! for adding a like and dislike feature

const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');

let likedMovies = [];
let dislikedMovies = [];

const likeMovie2 = (movie) => {
    likedMovies.push(movie);
    localStorage.setItem('likedMovies', JSON.stringify(likedMovies)); // Store liked movies in local storage
    displayLikedMovies();
    likeBtn.disabled = true; // Disable the like button
    dislikeBtn.disabled = true; // Disable the dislike button
};

const dislikeMovie2 = (movie) => {
    dislikedMovies.push(movie);
    localStorage.setItem('dislikedMovies', JSON.stringify(dislikedMovies)); // Store disliked movies in local storage
    displayDislikedMovies();
    likeBtn.disabled = true; // Disable the like button
    dislikeBtn.disabled = true; // Disable the dislike button
};

const displayLikedMovies = () => {
    const likedMoviesList = document.getElementById('likedMoviesList');
    likedMoviesList.innerHTML = ''; // Clear the current list
    likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || []; // Get liked movies from local storage
    likedMovies.forEach((movie, index) => {
        const movieElement = document.createElement('li');
        movieElement.textContent = movie.title;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-button'); // Add class to button
        removeBtn.onclick = () => {
            likedMovies.splice(index, 1);
            localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
            displayLikedMovies();
            likeBtn.disabled = false; // Re-enable the like button
            dislikeBtn.disabled = false; // Re-enable the dislike button
        };
        movieElement.appendChild(removeBtn);
        likedMoviesList.appendChild(movieElement);
    });
};

const displayDislikedMovies = () => {
    const dislikedMoviesList = document.getElementById('dislikedMoviesList');
    dislikedMoviesList.innerHTML = ''; // Clear the current list
    dislikedMovies = JSON.parse(localStorage.getItem('dislikedMovies')) || []; // Get disliked movies from local storage
    dislikedMovies.forEach((movie, index) => {
        const movieElement = document.createElement('li');
        movieElement.textContent = movie.title;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-button'); // Add class to button
        removeBtn.onclick = () => {
            dislikedMovies.splice(index, 1);
            localStorage.setItem('dislikedMovies', JSON.stringify(dislikedMovies));
            displayDislikedMovies();
            likeBtn.disabled = false; // Re-enable the like button
            dislikeBtn.disabled = false; // Re-enable the dislike button
        };
        movieElement.appendChild(removeBtn);
        dislikedMoviesList.appendChild(movieElement);
    });
};

//! will display liked and disliked movies when the page loads
window.onload = () => {
    displayLikedMovies();
    displayDislikedMovies();
};

const fetchMovie = async (movieId) => {
    //console.log("fetchMovie",movieId); // Check the movie ID
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbKey}`);
    const movieData = await response.json();

    //console.log(movieData); // Check the movie data

    const movie = {
        title: movieData.title,
        year: movieData.release_date.split('-')[0], // Get the year from the release date
        rating: movieData.vote_average * 10, // Get the rating
        // Add other properties as needed
    };

    // Display the movie year and rating
    const movieYearElement = document.getElementById('movieYear');
    const movieRatingElement = document.getElementById('movieRating');
    //console.log(movieYearElement, movieRatingElement); // Check the elements

    movieYearElement.textContent = movie.year;
    movieRatingElement.textContent = movie.rating;
    return movie;
};


