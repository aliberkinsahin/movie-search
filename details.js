const mainSection = document.querySelector(".main-section")
const scrollButton = document.querySelector("#scroll-to-top-button")

const ui = new UI()
const database = new MovieDB()
const movieID = localStorage.getItem("id")

eventListeners()

function eventListeners() {
    document.addEventListener("DOMContentLoaded", showDetails)

    scrollButton.addEventListener("click", () => {
        window.scrollTo({
            top:0,
            left:0
        })
    })
}

function showDetails(e) {
    const queryString = window.location.search
    const urlParameters = new URLSearchParams(queryString)
    let movieID = urlParameters.get("movieID")

    database.getMovieDetails(movieID)
    .then(details => {
        document.title = details.title + " | Details"
        ui.showMovieDetails(details)
    }).catch(err => {
        // Show alert for 404 code
        console.log(err)
    })
}



