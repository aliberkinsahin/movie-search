const searchInput = document.getElementById("searchInput")
const searchForm = document.querySelector(".search-button")
const mainSection = document.querySelector(".main-section")
const scrollButton = document.querySelector("#scroll-to-top-button")

const ui = new UI()
const database = new MovieDB()

eventListeners()

function eventListeners() {
    document.addEventListener("DOMContentLoaded", showTopMovies)
    searchForm.addEventListener("click", searchMovie)
    mainSection.addEventListener("click", cardButtonsClicked)
    

    scrollButton.addEventListener("click", () => {
        window.scrollTo({
            top:0,
            left:0
        })
    })
}

function showTopMovies() {
    let popularMoviesArr

    database.getTopMovies()
    .then(movies => {
        popularMoviesArr = movies.results
        ui.showMovies(popularMoviesArr)
        ui.setHeader("Popular Movies")
    }).catch(err => console.log(err))
}

function searchMovie(e) {
    if (searchInput.value !== "") {
        const movieName = searchInput.value.trim()
        database.getSearchedMovies(movieName)
        .then(movies => {
            searchedMoviesArr = movies.results
            console.log(searchedMoviesArr)
            ui.showMovies(searchedMoviesArr)
            ui.setHeader("Search Results")
        }).catch(err => console.log(err))
    }
    else {
        // Show alert for input value null
    }
    e.preventDefault()
}

function cardButtonsClicked(e) {
    if (e.target.id === "detailsButton"){
        let movieID = e.target.parentElement.className
        database.getMovieDetails(movieID)
        .then(() => {
            window.open("details.html?movieID=" + movieID, "_blank")  
        }).catch(err => {
            console.error(err)
        })
    }
    else if (e.target.id === "similarsButton") {
        let movieID = e.target.parentElement.className
        database.getSimilarMovies(movieID)
        .then(similars => {
            ui.showMovies(similars.results)
            ui.setHeader(`Similar Movies: "${e.target.parentElement.id}"`)
        }).catch(err => console.error(err))
    }
}



