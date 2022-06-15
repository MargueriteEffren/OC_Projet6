



const GenresList = ["Films_les_mieux_notes", "Comedy", "Crime", "Romance"]


createAllDivMovies();

for (let i = 1; i < GenresList.length; i++){
      console.log(GenresList[i]);
      fetchDataByGenre(GenresList[i],1);
      arrowsOther(GenresList[i]);
}

//récupère la première page des films les mieux notés
fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes")
            .then(response => response.json())
            .then(data => {for (let i = 0; i < data.results.length; i++){
                    const getImageUrl_2 = data.results[i].image_url
                    const billboardGenre = document.getElementById("Film"+ i + "Films_les_mieux_notes");
                    billboardGenre.src = getImageUrl_2
                  }
                  //affichage des éléments du meilleur film:
                  //titre
                    const getMovieTitle = data.results[0].title;
                    const bestMovieTitle = document.getElementById('Meilleur_film');
                    bestMovieTitle.innerHTML = "<h2>Meilleur Film: "+getMovieTitle+"</h2><div id=\"Meilleur_film_content\"><img id=\"img_Meilleur_film\" alt = \"affiche du Meilleur Film\"></div>"; 
                    //affiche
                    const getImageUrl = data.results[0].image_url;
                    const billboardBestMovie = document.getElementById('img_Meilleur_film');
                    billboardBestMovie.src = getImageUrl;
                      //cherche le lien vers la page où se trouve le résumé:
                      const movieURL = data.results[0].url;
                      console.log(movieURL);
                    fetch(""+movieURL+"")
                        .then(response2 => response2.json())
                        .then(data2 => {
                               console.log(data2);
                               movieSumUP = data2.description;
                               //met un résumé du meilleur film
                               const sumUp = document.createElement("p");
                               console.log(sumUp);
                               sumUp.innerHTML = movieSumUP;
                               const meilleurFilmContent = document.getElementById("Meilleur_film_content");
                               meilleurFilmContent.appendChild(sumUp);
                               meilleurFilmContent.style.display = "flex"; 
                              })                    
                  })
//récupère la page suivantes des films les mieux notés
fetchBestMovies(2);

//met des flèches de défilement aux films les mieux notés
arrowsBest('bestRated');



// flèches de défilement pour les films les mieux notés:
function arrowsBest(Genre){
      //flèche de droite
      const fwdArrow = document.getElementById("fwd_"+Genre);
      let fwdArrowClick = 2;

      fwdArrow.addEventListener("click",function() {
            fetchBestMoviesFirstPart(++fwdArrowClick);
            console.log("fwdArrowClick = "+fwdArrowClick);
            fetchBestMovies(fwdArrowClick + 1);
      })

      //flèche de gauche
      const backArrow = document.getElementById('back_'+Genre);

      backArrow.addEventListener("click",function(noRightClick) {
            if (fwdArrowClick == 1) {
            noRightClick.preventDefault();      
      } else {
            fwdArrowClick = fwdArrowClick - 1; //diminue le numéro de page consultée
            console.log("fwdArrowClick = "+fwdArrowClick);
            fetchBestMoviesFirstPart(fwdArrowClick);
            console.log(fwdArrowClick);
            fetchBestMovies(fwdArrowClick + 1);
      }
      })
}

// flèches de défilement pour les films des autres catégories:

function arrowsOther(Genre){
      //flèche de droite
      const otherFwdArrow = document.getElementById("fwd_"+Genre);
      let otherFwdArrowClick = 2;

      otherFwdArrow.addEventListener("click",function() {
            fetchDataByGenre(Genre,++otherFwdArrowClick);
            console.log("otherfwdArrowClick = "+otherFwdArrowClick);
      })

      //flèche de gauche
      const otherBackArrow = document.getElementById('back_'+Genre);

      otherBackArrow.addEventListener("click",function(noRightClick) {
            if (otherFwdArrowClick == 1) {
            noRightClick.preventDefault();      
      } else {
            otherFwdArrowClick = otherFwdArrowClick - 1; //diminue le numéro de page consultée
            console.log("otherfwdArrowClick = "+otherFwdArrowClick);
            const pageNumber = otherFwdArrowClick;
            fetchDataByGenre(Genre, pageNumber);
            console.log(otherFwdArrowClick);
      }
      })
}

//récupération des films les mieux notés toutes catégories confondues 2e page
function fetchBestMovies(page){
      
      //récupération des films les mieux notés toutes catégories confondues 2eme page

      fetch("http://localhost:8000/api/v1/titles/?page="+page+"&sort_by=-imdb_score&sort_by=-votes")
            .then(response => response.json())
            .then(data => {for (let i = 0; i < data.results.length; i++){
                    const getImageUrl_2 = data.results[i].image_url
                    const secondIndex = 5 + i;
                    if (document.getElementById("Film"+ secondIndex + "Films_les_mieux_notes") != null) {
                    const billboardGenre = document.getElementById("Film"+secondIndex+"Films_les_mieux_notes");
                    billboardGenre.src = getImageUrl_2
                    } else {
                        continue
                    }
                  }
                  })
}

function fetchBestMoviesFirstPart(page){
      
      //récupération des films les mieux notés toutes catégories confondues 2eme page

      fetch("http://localhost:8000/api/v1/titles/?page="+page+"&sort_by=-imdb_score&sort_by=-votes")
            .then(response => response.json())
            .then(data => {for (let i = 0; i < data.results.length; i++){
                    const getImageUrl_2 = data.results[i].image_url
                    const secondIndex = i;
                    if (document.getElementById("Film"+ secondIndex + "Films_les_mieux_notes") != null) {
                    const billboardGenre = document.getElementById("Film"+ secondIndex + "Films_les_mieux_notes");
                    billboardGenre.src = getImageUrl_2
                    } else {
                        continue
                    }
                  }
                  })
}

//récupération des films les mieux notés par genre

function fetchDataByGenre(Genre,page){

      let imageURLsList = [];
      let secondPage = page + 1;
      let fetchURLsList = ["http://localhost:8000/api/v1/titles/?genre="+Genre+"&page="+page+"&sort_by=-imdb_score&sort_by=-votes",
                            "http://localhost:8000/api/v1/titles/?genre="+Genre+"&page="+secondPage+"&sort_by=-imdb_score&sort_by=-votes"];

      fetch(fetchURLsList[0])
            .then(response2 => response2.json())
            .then(data => {console.table(data);
                  for (let i = 0; i < data.results.length; i++){
              const getImageUrl_2 = data.results[i].image_url;
              console.log(getImageUrl_2);
              imageURLsList.push(getImageUrl_2);
              if (document.getElementById("Film"+ i + Genre) != null) {
                  const billboardGenre = document.getElementById("Film"+ i + Genre);
                  billboardGenre.src = getImageUrl_2
              } else {
                  continue
              }
              }
            })

      fetch(fetchURLsList[1])
            .then(response2 => response2.json())
            .then(data => {console.table(data);
                  for (let i = 0; i < data.results.length; i++){
              const getImageUrl_2 = data.results[i].image_url;
              console.log(getImageUrl_2);
              imageURLsList.push(getImageUrl_2);
              const secondIndex = 5 + i;
              if (document.getElementById("Film"+ secondIndex + Genre) != null) {
                    const billboardComedy2 = document.getElementById("Film"+ secondIndex + Genre);
                    billboardComedy2.src = getImageUrl_2
              } else {
                  continue
              }
              }
              })

      console.log(imageURLsList)
    }
    


function createAllDivMovies() {
      for (let i in GenresList) {
            createDivMovies(GenresList[i]);
           }
      }

function createDivMovies(Genre) {
      const spreadMoviesList = [0,1,2,3,4,5,6];
      for (let i of spreadMoviesList) {
            const image = document.createElement("img");
            image.className = "film";
            const imageId = "Film";
            image.id = imageId + i + Genre;
            const idComedy = document.getElementById(Genre);
            idComedy.appendChild(image);
          }
      }