'use strcit';
//Constantes y variables
const input = document.querySelector('.js-input');
const btnShare = document.querySelector('.js-btn-share');
const btnReset = document.querySelector('.js-btn-reset');
const btnLog = document.querySelector('.js-btnLog');
const dataList = document.querySelector('.js-list');
const favoriteUl = document.querySelector('.js-favorite');
let listCocktails = [];
let listFavorite = [];

//función botón log
/*function log () {
  for(const logData of listCocktails) {
    console.log(logData.strDrink);
  }
}*/

//evento que queremos que ejecute cuando hacemos click en el botón buscar
btnShare.addEventListener('click', handlerCocktails);
btnReset.addEventListener('click', resetFavotites);
//btnLog.addEventListener("click", log);

//función jefa para ejecutar las demás funciones
function handlerCocktails(event) {
  event.preventDefault();
  getApi();
  renderCocktail(listCocktails);
  //log();
}

/////////////////FUNCIONES/////////////
//función para pintar el coctel
function renderCocktail(data) {
  let html = '';
  for (const drink of data) {
    const img = newImg(drink); //parámetro de drink
    const favoriteFound = listFavorite.findIndex((fav) => {
      return fav.idDrink === drink.idDrink;
    });

    if (favoriteFound === -1) {
      html += `<li id="${drink.idDrink}" class="drinkItem"><h2 class="drink_title">${drink.strDrink}</h2><img class="drink_img" src=${img} alt=""></li>`;
    } else {
      html += `<li id="${drink.idDrink}" class="drinkItem fav_drink"><h2 class="drink_title">${drink.strDrink}</h2><img class="drink_img" src=${img} alt=""></li>`;
    }
    dataList.innerHTML = html; //const
  }
  //hacemos click en un item
  const allDrinksItems = document.querySelectorAll('.drinkItem'); //donde guardamos el valor de los li
  for (const item of allDrinksItems) {
    item.addEventListener('click', favouriteList);
  }
}

//función para pintar los favoritos
function renderFavorites(data) {
  let html = '';
  for (const drink of data) {
    const img = newImg(drink); //parámetro de drink
    html += `<li id="${drink.idDrink}" class="drinkItem"><h2 class="drink_title">${drink.strDrink}</h2><img class="drink_img" src=${img} alt=""></li>`; //añadimos los datos del api al html
  }
  favoriteUl.innerHTML = html; //const
}

//función para añadir a favoritos
function favouriteList(event) {
  const idCocktailSelected = event.currentTarget.id;
  const cocktailClick = listCocktails.find((fav) => {
    return fav.idDrink === idCocktailSelected;
  });
  const favoriteFound = listFavorite.findIndex((fav) => {
    return fav.idDrink === idCocktailSelected;
  });
  if (favoriteFound === -1) {
    listFavorite.push(cocktailClick);
  } else {
    listFavorite.splice(favoriteFound, 1);
  }
  //como estamos modificando, debemos hacer que se guarde la lista
  localStorage.setItem('dataList', JSON.stringify(listFavorite));
  renderFavorites(listFavorite);
}

//función para generar los datos del Api Cocktails
function getApi() {
  const inputSearch = input.value;
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`
  )
    .then((response) => response.json())
    .then((data) => {
      //guardar  la info de cocteles
      listCocktails = data.drinks;
      renderCocktail(listCocktails);
    });
}

//función para crear una img cuando no contiene img
function newImg(drink) {
  if (drink.strDrinkThumb === '') {
    return;
    ('https://via.placeholder.com/210x295/a2deaf/666666/?text=Drink');
  } else {
    return drink.strDrinkThumb;
  }
}

////////////////reset///////////////////
//función resetear los datos de la lista de favoritos
function resetFavotites() {
  listFavorite = [];
  console.log('hago click reset');
  renderFavorites(listFavorite);
}

///////////////////ALMACENAMIENTO LOCALSTORAGE////////
const listCocktailsStorage = JSON.parse(localStorage.getItem('dataList'));
if (listCocktailsStorage !== null) {
  listFavorite = listCocktailsStorage;
  renderFavorites(listFavorite);
}
