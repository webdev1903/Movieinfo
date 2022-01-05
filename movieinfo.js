async function searchmovie() {
  document.querySelector("#popup").style.display = "flex";
  try {
    let input = document.querySelector("#movie").value;
    if (input.length <= 2) {
      return false;
    }
    let url = `https://www.omdbapi.com/?&apikey=24b04753&s=${input}`;
    let res = await fetch(url);
    let data = await res.json();
    let arr = data.Search;
    console.log(arr);
    popupdisplay(arr);
  } catch {
    alert("movie not found");
  }
}

function popupdisplay(arr) {
  let suggestionbox = document.createElement("div");
  suggestionbox.setAttribute("id", "suggestionbox");
  arr.forEach(function (elem) {
    let maindiv = document.createElement("div");
    let imgdiv = document.createElement("div");
    let image = document.createElement("img");
    image.src = elem.Poster;
    imgdiv.append(image);
    let infodiv = document.createElement("div");
    let h4 = document.createElement("h4");
    h4.textContent = elem.Title;
    let span1 = document.createElement("span");
    span1.innerHTML = elem.Type;
    let span2 = document.createElement("span");
    span2.innerHTML = " " + elem.Year;
    infodiv.append(h4, span1, span2);
    maindiv.append(imgdiv, infodiv);
    maindiv.addEventListener("click", function () {
      catchsuggested(elem.Title);
    });
    suggestionbox.append(maindiv);
  });
  document.querySelector("#popup").append(suggestionbox);
}
let id;
function debounce(func, delay) {
  if (id) {
    clearTimeout(id);
  }
  id = setTimeout(function () {
    func();
  }, delay);
}
trending();
async function trending() {
  let url =
    "https://api.themoviedb.org/4/list/1?api_key=a1b3d878606a89d0a2a56cd953476d31";
  let res = await fetch(url);
  let data = await res.json();
  let arr = data.results;
  console.log(data.results);
  trendingdisplay(arr);
}

function trendingdisplay(arr) {
  let trendingdiv = document.createElement("div");
  trendingdiv.setAttribute("id", "trending");
  let th1 = document.createElement("h1");
  th1.textContent = "Trending Movies";
  th1.style.width = "100%";
  th1.style.color = "black";
  document.querySelector("#trendingdiv").append(th1);
  arr.forEach(function (elem) {
    let maindiv = document.createElement("div");
    let imgdiv = document.createElement("div");
    let image = document.createElement("img");
    image.src = "https://image.tmdb.org/t/p/w500" + elem.backdrop_path;
    let title = document.createElement("h3");
    title.textContent = elem.title;
    let type = document.createElement("p");
    type.innerHTML = `<b>Type</b>:${elem.media_type}`;
    let ratings = document.createElement("p");
    ratings.innerHTML = ` <b>Ratings</b>:${elem.vote_average}`;
    ratings.setAttribute("class", "spanclass");
    type.setAttribute("class", "spanclass");
    let summary = document.createElement("p");
    summary.innerHTML = `<b>Plot</b>: ${elem.overview}`;
    imgdiv.append(image);
    imgdiv.setAttribute("id", "img1div");
    maindiv.append(imgdiv, title, type, ratings, summary);
    maindiv.setAttribute("Id", "maindiv");
    // trendingdiv.append(maindiv);
    document.querySelector("#trendingdiv").append(maindiv);
  });
}

async function catchsuggested(title) {
  console.log(title);
  let url = `https://www.omdbapi.com/?t=${title}&apikey=24b04753`;
  let api = await fetch(url);
  let res = await api.json();
  console.log(res);
  displaysuggested(res);
}

function displaysuggested(obj) {
  document.querySelector("#popup").style.display = "none";
  document.querySelector("#trendingdiv").style.display = "none";
  if (Math.round(obj.imdbRating) >= 8) {
    console.log("works");
    obj.Title += ` <i>(Reccommended)</i>`;
  }
  let info = `<div id="poster"><img src = "${obj.Poster}"/></div>
        <div id="primary-info">
            <h2 id="recbox">${obj.Title} </h2>
            <h3><b>Rated:</b> ${obj.Rated}</h3>
            <p><b>Year:</b> ${obj.Year}</p>
            <p><b>Released:</b> ${obj.Released}</p>
            <p><b>Runtime:</b> ${obj.Runtime}</p>
            <p><b>Type:</b> ${obj.Type}</p>
            <p><b>Genre:</b> ${obj.Genre}</p>
        </div>
        <div>
            <p><b>IMDB Rating:</b> ${obj.imdbRating} | ${obj.imdbVotes} votes</p>
           
        </div>
        <div id="secondary">
            <p><b>Actors:</b> ${obj.Actors}</p>
            <p><b>Awards:</b> ${obj.Awards}</p>
            <p><b>BoxOffice:</b> ${obj.BoxOffice}</p>
            <p><b>Country:</b> ${obj.Country}</p>
            <p><b>DVD:</b> ${obj.DVD}</p>
        </div>
        <div>
            <p><b>Director:</b> ${obj.Director}</p>
            <p><b>Production:</b> ${obj.Production}</p>
            <p><b>Writer:</b> ${obj.Writer}</p>
            <p><b>Genre:</b> ${obj.Genre}</p>
            <p><b>Language:</b> ${obj.Language}</p>
            <p><b>Metascore:</b> ${obj.Metascore}</p>
            
        </div>
        <div>
            <p><b>Plot:</b> ${obj.Plot}</p>
        </div>`;

  document.querySelector("#info").innerHTML = info;
}
