//---------PASOS A REALIZAR BUSCADOR------
//1. Obtener los datos del HTML que vamos a usar x
//2. Recoger los cocteles del servidor (fetch) x
//3. Guardar la información de los cocteles x
//4. Pintar estos cocteles en el html x
//5. Usuaria escribe en el input el nombre del coctel  x
//6. Click en el botón buscar (se genera un evento click) x
//7. Aparece el coctel que la uausaria a escrito x



//----------vamos a necesitar de eventos
//-evento click x

//----------funciones para: 
//- fetch x
//- escuchar los cocteles
//- pintar en el HTML x
//- handler x 
//- filtrar los cocteles x
//- cuando no hay img x


//----------PASOS A REALIZAR FAVORITOS-------
//Una vez ya tenemos los resultados de la búsqueda
//1. Crear el listado de los favoritos x
//2. Escuchar cuando la usuaria hace click en un coctel x
//3. Obtener a que coctel le dio click x
//4. Existe en el listado de favoritos 
//5. Si existe lo elimino del listado de favoritos
//6. si no existe la agregamos al listado de favoritos
//7. cambiar/añadir una clase para que cuando se seleccione cambie el color/fuente

//-------funcione para:
//evento click


'use strcit';
//Constantes elementos que necesitamos
const input = document.querySelector('.js-input');
const btnShare  = document.querySelector('.js-btn-share');
const btnReset = document.querySelector('.js-btn-reset');
const dataList = document.querySelector('.js-list');
const favoriteUl = document.querySelector('.js-favorite');
let listCocktails = [];
let listFavorite = [];


//evento que queremos que ejecute
btnShare.addEventListener("click", handlerCocktails);


/////////////////FUNCIONES//////////
//función para filtar la bebida escrita con los datos
function filteredCocktail(data) {
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
  }

//función para añadir los favoritos a la lista del html
function renderFavorites(data) {
    let html = '';
    for(const drink of data) {
        const img = newImg(drink);//parámetro de drink
        html += `<li id="${drink.idDrink}" class="drinkItem"><h2 class="drink_title">${drink.strDrink}</h2><img class="drink_img" src=${img} alt=""></li>`;//añadimos los datos del api al html
        favoriteUl.innerHTML = html; 
      }
  }

//función para añadir a favoritos
function favouriteList(event) {
    const idCocktailSelected = event.currentTarget.id;
    
    const cocktailClick = listCocktails.find(fav => 
      {
        return fav.idDrink === idCocktailSelected;
      });

      //saber si esta o no 
      const favoriteFound = listFavorite.findIndex(fav => {
        return fav.idDrink === idCocktailSelected;
      });
     //si no esta añadimos y meterlo en el array de fav
      if(favoriteFound === -1){
        listFavorite.push(cocktailClick);
        console.log('me has añadido a fav');
      } else {
        //si esta eliminame el elemento
        listFavorite.splice(favoriteFound, 1);
        console.log('no me has añadido a fav');
      }
      //como estamos modificando, debemos hacer que se guarde la lista
      localStorage.setItem("dataList", JSON.stringify(listFavorite));
      renderFavorites(listFavorite);
  }
  

//función para generar los datos del Api Cocktails
function getApi() {
    const inputSearch = input.value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`) 
    .then(response => response.json())
    .then(data => {
      //guardar  la info de cocteles
      listCocktails = data.drinks;
      filteredCocktail(listCocktails);
    });
}

//función para crear una img cuando no contiene img
function newImg (drink) {
  //(if)si strDrinkThumb no tiene mostramos una imagen predeterminada === null
  if(drink.strDrinkThumb === "") {
   return 
   "https://via.placeholder.com/210x295/a2deaf/666666/?text=Drink";
  } else {
    return drink.strDrinkThumb;
  }
  //(else) al contrario mostramos img de strDrinkThumb 
}

//función jefa para ejecutar las demás funciones 
function handlerCocktails(event) {
  event.preventDefault();
  getApi();
  filteredCocktail(listCocktails);
}


///////////////////ALMACENAMIENTO LOCALSTORAGE////////
const listCocktailsStorage = JSON.parse(localStorage.getItem('dataList')); 

if (listCocktailsStorage !== null) {
  listFavorite = listCocktailsStorage;
  renderFavorites(listFavorite);
} 


