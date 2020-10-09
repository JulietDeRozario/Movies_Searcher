const apiKey = prompt("Entrez votre clé api:");
const searchBar = document.getElementById('search');
const select = document.getElementById('select');
let page;

// Get the entry value
const searchMovies = () => {
  let stringSearch = searchBar.value;
  let type = select.value
  getMovies(stringSearch, type);
}

// Get the movies that contain the searched keywords
const getMovies = (stringSearch, type) => {
  page = 1; 
  const section = document.getElementsByClassName('section')[0];
  section.innerHTML = "";
  let url;
  if(type === "all"){
    url = `https://www.omdbapi.com/?s=${stringSearch}&apikey=${apiKey}`;
  }else if (type === "series" || type === "episode" || type === "movie"){
    url = `https://www.omdbapi.com/?s=${stringSearch}&type=${type}&apikey=${apiKey}`;
  }
  fetch(url)
    .then((response) => response.json())
    .then((data) => reloadMovies(data['Search'], stringSearch))
    .catch((error) => console.error(`error: ${error}`))
}

// Load the movies' informations in the HTML
const reloadMovies = (movies, stringSearch) => {
  const section = document.getElementsByClassName('section')[0];
  if(!movies){
    section.innerHTML += `
    <h4 class="mx-auto mb-5 text-muted">Aucun film ne correspond à votre recherche...</h4>
    <img src="https://842930.smushcdn.com/1760858/wp-content/uploads/2020/05/404-10-mirror.png?lossy=1&strip=1&webp=1">
    `;
  }else{
    movies.forEach(movie => {
      let image = movie['Poster'];
      if(image == "N/A"){image = "https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"}
      section.innerHTML += `
      <div class="col-lg-4 col-md-6 col-sm-6 fade-in">
        <div class="single-location mb-30">
            <div class="location-img">
                <img id="movie-img" src="${image}">
            </div>
            <div class="location-details">
                <p class="title">${movie['Title']}</p>
                <p><small> -${movie['Year']}</small></p>
                <a onclick="reloadModal('${movie['imdbID']}')" class="location-btn" data-toggle="modal" data-target="#movieModal">En savoir plus</a>
            </div>
        </div>
      </div>
      `;
    });
    document.getElementsByClassName("buttonMore")[0].innerHTML = `
      <button class="btn btn-secondary" onclick="loadMoreMovies('${stringSearch}')" id="more">Voir plus</button>
    `;
  }
  createInspector();
}

// Get the plot of the movie to add it in the modal
const reloadModal = (id) => {
  fetch(`https://www.omdbapi.com/?i=${id}&apikey=7f27ece4`)
    .then((response) => response.json())
    .then((data) => openModal(data))
    .catch((error) => console.error(`error: ${error}`))
}

// Update the modal innerHTML with new informations
const openModal = (movie) => {
  const modal = document.getElementById('movieModal');
      let image = movie['Poster'];
      if(image == "N/A"){image = "https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"}
  modal.innerHTML =`
  <div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="modalTitle">${movie['Title']} <small> -${movie['Year']}</small></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-4">
                    <img id="modal-img" src="${image}">
                </div>
                <div class="col-md-8">
                  <h6>Réalisateur: ${movie['Director']}</h6>
                  <p>"${movie['Plot']}"</p>
                  <h6>Acteurs: ${movie['Actors']}</h6>
                </div>
            </div>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        </div>
    </div>
  </div>
  `;
}

// Load more movies from the same keywords at the end of the page
const loadMoreMovies = (stringSearch) => {
  page += 1; 
  fetch(`https://www.omdbapi.com/?s=${stringSearch}&page=${page}&apikey=7f27ece4`)
    .then((response) => response.json())
    .then((data) => reloadMovies(data['Search']))
    .catch((error) => console.error(`error: ${error}`))
}

// Intersection Observer
const createInspector = () => {
  const allMovies = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -200px 0px",
  };
  
  const appearOnScroll = new IntersectionObserver((
    entries,
    appearOnScroll
    ) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting){
          return;
        } else {
          entry.target.classList.add('appear');
          appearOnScroll.unobserve(entry.target);
        }
      })
    }, appearOptions)
  
  allMovies.forEach(movie => {
    appearOnScroll.observe(movie);
  })
}


