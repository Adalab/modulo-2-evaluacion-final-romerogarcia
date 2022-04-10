'use strcit';
//Constantes y variables
const input = document.querySelector('.js-input');
const btnShare  = document.querySelector('.js-btn-share');
const btnReset = document.querySelector('.js-btn-reset');
const dataList = document.querySelector('.js-list');
const favoriteUl = document.querySelector('.js-favorite');
let listCocktails = [];
let listFavorite = [];

//evento que queremos que ejecute cuando hacemos click en el botón buscar
btnShare.addEventListener("click", handlerCocktails);
btnReset.addEventListener("click", resetFavotites);


//función jefa para ejecutar las demás funciones 
function handlerCocktails(event) {
  event.preventDefault();
  getApi();
  renderCocktail(listCocktails);
  //resetFavorites();
  //removeFavs();
}

/////////////////FUNCIONES/////////////
//función para filtar la bebida escrita con los datos
function renderCocktail(data) {
  let html = '';
  for(const drink of data) {
      const img = newImg(drink);//parámetro de drink
      html += `<li id="${drink.idDrink}" class="drinkItem fav-color"><h2 class="drink_title">${drink.strDrink}</h2><img class="drink_img" src=${img} alt=""></li>`;//añadimos los datos del api al html
      //style="background-color:"${drink.idCocktailSelected}"
      dataList.innerHTML = html; 
    }
    //hacemos click en un item
    const allDrinksItems = document.querySelectorAll('.drinkItem');//donde guardamos el valor de los li
    for (const item of allDrinksItems) {

      console.log('holi');

      item.addEventListener("click", favouriteList);
    };
    

  //cambio de clases con colores
  /*let favCockctail = document.querySelectorById('.js_favoriteCocktail');
    for(const item of listFavorite) {
      console.log('holi');
      item.classList.remove('fav_drink');
      item.classList.add('not_fav');
    };
    favCockctail();*/

    //document.querySelectorById('${drink.idDrink}').item.classList.add('fav_drink');
    //document.querySelectorById('${drink.idDrink}').item.classList.remove('not_fav');
  };

//función para pintar los favoritos
function renderFavorites(data) {
    let html = '';
    for(const drink of data) {
        const img = newImg(drink);//parámetro de drink
        html += `<li id="${drink.idDrink}" class="drinkItem"><h2 class="drink_title">${drink.strDrink}</h2><img class="drink_img" src=${img} alt=""></li>`;//añadimos los datos del api al html
        favoriteUl.innerHTML = html; 
      }
  };

//función para añadir a favoritos
function favouriteList(event) {
    const idCocktailSelected = event.currentTarget.id;
    
    const cocktailClick = listCocktails.find(fav => 
      {
        return fav.idDrink === idCocktailSelected;
      });
      const favoriteFound = listFavorite.findIndex(fav => {
        return fav.idDrink === idCocktailSelected;
      });
      if(favoriteFound === -1){
        listFavorite.push(cocktailClick);
        console.log('me has añadido a fav');
      } else {
        listFavorite.splice(favoriteFound, 1);
        console.log('no me has añadido a fav');
      }
      //como estamos modificando, debemos hacer que se guarde la lista
      localStorage.setItem("dataList", JSON.stringify(listFavorite));
      renderFavorites(listFavorite);
  };

//función para generar los datos del Api Cocktails
function getApi() {
    const inputSearch = input.value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`) 
    .then(response => response.json())
    .then(data => {
      //guardar  la info de cocteles
      listCocktails = data.drinks;
      renderCocktail(listCocktails);
    });
};

//función para crear una img cuando no contiene img
function newImg (drink) {
  if(drink.strDrinkThumb === "") {
   return 
   "https://via.placeholder.com/210x295/a2deaf/666666/?text=Drink";
  } else {
    return drink.strDrinkThumb;
  }
};

////////////////reset///////////////////
/*function removeFavs() {
  document.getElementById('js-favorite').reset();
  console.log('dando reset');
}*/


//función que recoge los datos de fav
function RemoveClick () {
  console.log('holi');
  renderFavorites();//llamo a la función que tiene los datos de la lista de favoritos
};

//función resetear los datos de la lista de favoritos
function resetFavotites() {
  const resetItems = document.querySelector('.js-btn-reset');
  console.log('hago click reset');
  for(const resetFav of resetItems ) {
    resetFav.addEventListener("click", RemoveClick)
  }
};

///////////////////ALMACENAMIENTO LOCALSTORAGE////////
const listCocktailsStorage = JSON.parse(localStorage.getItem('dataList')); 

if (listCocktailsStorage !== null) {
  listFavorite = listCocktailsStorage;
  renderFavorites(listFavorite);
};


