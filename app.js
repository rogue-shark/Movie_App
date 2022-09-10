//getting home url sorted by popularity in descending order "&" adding api_key "&" page=1
const api_url = " https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1"
//getting image
const img_url = "https://image.tmdb.org/t/p/w1280"
//search url "&" query=
const search_url = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='


const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const home = document.getElementById('home')


//get initial(popular) movies
getMovies(api_url)
//we are giving paramater as 'url' b/c we can either run this function for api_url or search_url
async function getMovies(url) {
    const response = await fetch(url)
    const data = await response.json()

    showMovies(data.results)
    console.log(data.results) //extracting 'results' value from .json() object
}

//3. working with dom  
function showMovies(movies) {
    main.innerHTML = '' //clears main data

    movies.forEach(movie => {
        //destructuring -- i.e directly assigning variable names instead of doing object.value for every value that we want to store in a varible
        const { title, poster_path, vote_average, overview} = movie

        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')

        movieElement.innerHTML = `<div class="movie">
        <img
          src="${img_url + poster_path}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${displayRatingColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="summary">
          <h3>${overview}</h3>
        </div>
      </div>`

      main.appendChild(movieElement)
    });
}

//4. to disply different vote colors
function displayRatingColor(vote) {
    return vote >= 8 ? 'green' 
         : vote >= 5 ? 'orange'
         : 'red'
}


//2. searching
form.addEventListener('submit', (event) => {
    event.preventDefault(); //since it's a submit and it dosen't submit to the page
    const searchTerm = search.value
    //exists and not equal to anything
    if(searchTerm && searchTerm !== '') {
        getMovies(search_url + searchTerm)

        search.value = '' //clear value
    }else {
        window.location.reload() //reloads page
    }

})

//home button
home.addEventListener('click', () => {
    window.location.reload()
})
