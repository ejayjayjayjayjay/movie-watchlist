// Function to display movies from local storage
function displayMovies() {
    const movieList = document.getElementById('movie-list')
    const movies = JSON.parse(localStorage.getItem('watchlist')) || []
    let movieHTML = ''

    movies.forEach((movie, index) => {
        movieHTML += `
            <div class="card" data-index="${index}">
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h2>${movie.Title}</h2>
                <button class="remove" data-index="${index}">Remove</button>
            </div>
        `
    })
    movieList.innerHTML = movieHTML

    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute('data-index')
            removeMovie(index)
        })
    })
}

// Function to remove a movie from the watchlist
function removeMovie(index) {
    let movies = JSON.parse(localStorage.getItem('watchlist')) || []
    movies.splice(index, 1)
    localStorage.setItem('watchlist', JSON.stringify(movies))
    displayMovies()
}

// Call the function to display movies on page load
displayMovies()