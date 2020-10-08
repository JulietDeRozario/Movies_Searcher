const searchBar = document.getElementById('search');

const searchMovies = () => {
  stringSearch = searchBar.value;
  getMovies(stringSearch);
}

const getMovies = (stringSearch) => {
  fetch(`http://www.omdbapi.com/?s=${stringSearch}&apikey=7f27ece4`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(`error: ${error}`))
}
