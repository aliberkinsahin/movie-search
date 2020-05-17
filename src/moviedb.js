class MovieDB {
    constructor() {
        this.apikey = ""
        this.urlPopMovies = 
        this.language = ""
        this.urlSearchMovie = "https://api.themoviedb.org/3/search/movie?"
        this.endPoint = ""

    }
    
    async getSearchedMovies(movieText) {
        const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=a93b9c34a26b94dfc9605da243368cdc&language=en-US&query="+ movieText +"&page=1&include_adult=false")
        const moviesJson = await response.json()
        return moviesJson
    }

    async getSimilarMovies(movieID) {
        const response = await fetch("https://api.themoviedb.org/3/movie/"+ movieID +"/similar?api_key=a93b9c34a26b94dfc9605da243368cdc&language=en-US&page=1")
        const moviesJson = await response.json()
        return moviesJson
    }

    async getTopMovies() {
        
        const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=a93b9c34a26b94dfc9605da243368cdc&language=en-US&page=1")
        const moviesJson = await response.json()

        return moviesJson
    }

    async getMovieDetails(movieID) {
        const response = await fetch("https://api.themoviedb.org/3/movie/"+ movieID +"?api_key=a93b9c34a26b94dfc9605da243368cdc&language=en-US")
        const detailsJson = await response.json()
        return detailsJson
    }
}