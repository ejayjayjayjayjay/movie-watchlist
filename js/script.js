const searchBar = document.getElementById("search-bar")
const searchButton = document.getElementById("search-button")
const movieContainer = document.getElementById("movie-container")

async function handleClick() {
    const res = await fetch(
        `https://www.omdbapi.com/?apikey=6497dd60&s=${searchBar.value}&r=json`
    );
    const data = await res.json()
    let movieHtml = ``
    if (data.Search) {
        const movieDetails = await Promise.all(data.Search.map(async (movie) => {
            const detailResponse = await fetch(`https://www.omdbapi.com/?apikey=6497dd60&i=${movie.imdbID}&plot=short&r=json`)
            const details = await detailResponse.json()
            return `
                <div class="card">
                    <img src="${movie.Poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <div class="card-inner">
                            <h1 class="card-title">${movie.Title}</h1>
                            <p class="card-text">Year: ${movie.Year}</p>
                        </div>
                        <div class="card-details">
                            <p class="card-text">Runtime: ${details.Runtime}</p>
                            <p class="card-text">Genre: ${details.Genre}</p>
                            <button class="btn-watchlist" data-movie='${JSON.stringify(details)}'>+ Watchlist</button>
                        </div>
                        <p class="card-text">Plot: ${details.Plot}</p>
                    </div>
                </div>
            `
        }));
        movieHtml = movieDetails.join('');
    } else {
        movieHtml = `<p>No results found</p>`
    }
    movieContainer.innerHTML = movieHtml

    const btnWatchlist = document.querySelectorAll(".btn-watchlist")
    btnWatchlist.forEach(button => {
        button.addEventListener("click", function() {
            const movie = JSON.parse(this.getAttribute('data-movie'));
            let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
            watchlist.push(movie);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            console.log("Added to Watchlist!");
        });
    });

    console.log(data.Search)
}

searchButton.addEventListener("click", handleClick)
