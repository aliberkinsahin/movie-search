class UI {

    constructor() {
        this.mainSection = document.querySelector(".main-section")
        this.header = document.getElementById("main-section-header")
        this.imagePath = "https://image.tmdb.org/t/p/w500"
    }
    showMovies(moviesArr) {

        this.removeMoviesFromUI()

        moviesArr.forEach(movie => {
            let overviewSliced
            if (window.screen.width < 600) overviewSliced = movie.overview.slice(0, 125) + "..."
            else overviewSliced = movie.overview
            
            const color = this.rateColoring(movie.vote_average)

            const div  = document.createElement("div")
            div.className = "movie-card"
            div.innerHTML = `
                <img id="movieImage" src="${this.imagePath + movie.poster_path}" alt="${movie.id}">
                <ul class="movie-infos">
                    <li class="movie-info__title">${movie.title}</li>
                    
                    <li class="movie-info__release">${movie.release_date}</li>
                    <li class="movie-info__rate">Rate: <strong style="color: ${color} ;">${movie.vote_average}</strong> (${movie.vote_count})</li>
                    <li class="movie-info__overview">${overviewSliced}</li>
                    <div class="movie-info__buttons">
                        <li class="${movie.id}"><a href="#!" id="detailsButton" onclick="window.open("details.html", "_blank")">Details</a></li>
                        <li class="${movie.id}" id="${movie.title}"><a href="#" id="similarsButton">Similar Movies</a></li>
                    </div>
                </ul>
            `
            this.mainSection.appendChild(div)
        })
    }

    showMovieDetails(movieDetails) {
        const detailsSection = document.querySelector(".details-section")
        
        const color = this.rateColoring(movieDetails.vote_average)
        const profitColor = (movieDetails.revenue - movieDetails.budget >= 0) ? "green" : "red"

        const div = document.createElement("div")
        div.className = "movie-details"
        div.innerHTML = `
            <div class="movie-details__image">
                <img id="movie-details__image" src="${this.imagePath +movieDetails.poster_path}" alt="${movieDetails.title}">
            </div>

            <div class="movie-details__links">
                <ul>
                    <li><a href="${movieDetails.homepage}" target="_blank" id="homepageButton">Homepage</a></li>
                    <li><a href="https://www.imdb.com/title/${movieDetails.imdb_id}" target="_blank" id="imdbButton">IMDB</a></li>
                </ul>
            </div>

            <div class="movie-details__infos">
                <ul>
                    <li class="movie-details__title">${movieDetails.title}<span> (${movieDetails.runtime}mins)</span></li>            
                    <li class="movie-details__release">${movieDetails.release_date}</li>
                    <li class="movie-details__rate">Rate: <strong style="color: ${color};">${movieDetails.vote_average}</strong> (${movieDetails.vote_count})</li>
                    <li class="movie-details__popularity">Popularity: ${movieDetails.popularity}</li>
                    <li class="movie-details__budget">Budget: ${movieDetails.budget.toLocaleString()} $</li>
                    <li class="movie-details__revenue">Revenue: ${movieDetails.revenue.toLocaleString()} $</li>
                    <li class="movie-details__revenue"><span style="color: ${profitColor}">Profit</span>: ${(movieDetails.revenue - movieDetails.budget).toLocaleString()} $</li>
                    <li class="movie-details__overview">${movieDetails.overview}</li>
                </ul>
            </div>
        `
        detailsSection.appendChild(div)
    }

    rateColoring(rate) {
        let color

        if (rate >= 8) color = "green"
        else if (rate >= 6) color = "orange"
        else color = "red"

        return color
    }

    removeMoviesFromUI() {
        while(this.mainSection.lastElementChild.className !== "h-divider") {
            this.mainSection.removeChild(this.mainSection.lastElementChild)
        }
    }

    setHeader(headerText) {
        this.header.textContent = headerText
    }
}