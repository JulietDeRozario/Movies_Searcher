// TODO: Intersection Observer (scroll)
// TODO: Page Github
// TODO: BONUS = animations

const searchBar = document.getElementById('search');

const searchMovies = () => {
  stringSearch = searchBar.value;
  getMovies(stringSearch);
}

const getMovies = (stringSearch) => {
  fetch(`http://www.omdbapi.com/?s=${stringSearch}&apikey=7f27ece4`)
    .then((response) => response.json())
    .then((data) => reloadMovies(data['Search']))
    .catch((error) => console.error(`error: ${error}`))
}

const reloadMovies = (movies) => {
  console.log(movies);
  const section = document.getElementsByClassName('section')[0];
  section.innerHTML = "";
  movies.forEach(movie => {
    let image = movie['Poster'];
    if(image == "N/A"){image = "https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80";}
    section.innerHTML += `
    <div class="col-lg-4 col-md-6 col-sm-6">
      <div class="single-location mb-30">
          <div class="location-img">
              <img id="movie-img" src="${image}">
          </div>
          <div class="location-details">
              <p class="title">${movie['Title']}</p>
              <p><small> -${movie['Year']}</small></p>
              <a href="#" onclick="reloadModal('${movie['imdbID']}')" class="location-btn" data-toggle="modal" data-target="#movieModal">En savoir plus</a>
          </div>
      </div>
    </div>
    `;
  });
}

const reloadModal = (id) => {
  fetch(`http://www.omdbapi.com/?i=${id}&apikey=7f27ece4`)
    .then((response) => response.json())
    .then((data) => openModal(data))
    .catch((error) => console.error(`error: ${error}`))
}

const openModal = (movie) => {
  console.log(movie);
  const modal = document.getElementById('movieModal');
  let image = movie['Poster'];
  if(image == "N/A"){image = "https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80";}
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

