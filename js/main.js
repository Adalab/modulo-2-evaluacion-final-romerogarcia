//---------PASOS A REALIZAR BUSCADOR------
//1. Obtener los datos del HTML que vamos a usar x
//2. Recoger los cocteles del servidor (fetch) x
//3. Guardar la información de los cocteles x
//4. Pintar estos cocteles en el html x
//5. Usuaria escribe en el input el nombre del coctel  x
//6. Click en el botón buscar (se genera un evento click) x
//7. Aparece el coctel que la uausaria a escrito 



//----------vamos a necesitar de eventos
//-evento click x

//----------funciones para: 
//- fetch x
//- escuchar los cocteles
//- pintar en el HTML x
//- handler x 
//- filtrar los cocteles x
//- cuando no hay img


//----------PASOS A REALIZAR FAVORITOS-------
//Una vez ya tenemos los resultados de la búsqueda
//1. Crear el listado de los favoritos
//2. Escuchar cuando la usuaria hace click en un coctel
//3. Obtener a que coctel le dio click
//4. Existe en el listado de favoritos
//5. Si existe lo elimino del listado de favoritos
//6. si no existe la agregamos al lsitado de favoritos
//7. cambiar/añadir una clase para que cuando se seleccione cambie el color/fuente

//-------funcione para:
//evento click


'use strcit';
//Constantes elementos que necesitamos
const input = document.querySelector('.js-input');
const btnShare  = document.querySelector('.js-btn-share');
const btnReset = document.querySelector('.js-btn-reset');
const dataList = document.querySelector('.js-list');
//donde guardamos los cocteles
let listCocktails = '';
/*"drink":[{
//"idDrink":"11007"
//"strDrink":"Margarita"
//"strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/srpxxp1441209622.jpg"}]*/

//evento que queremos que ejecute
//queremos que cuando demos en el botón click, se ejecute la funcio jefa que pinta los elemento en html
btnShare.addEventListener("click", handlerCocktails);



//función para filtar la bebida escrita con los datos
function filteredCocktail(data) {
    for(const drink of data) {
      dataList.innerHTML += `<li><h2>${drink.strDrink}</h2><img class="drink_img" src=${drink.strDrinkThumb} alt=""></li>`;//añadimos los datos del api al html
    }
  }
  

//función para generar los datos del Api Cocktails
function getApi() {
    const inputSearch = input.value;
    fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`) 
    .then(response => response.json())
    .then(data => {
      //guardar  la ingo de cocteles
      listCocktails = data.listCocktails;
      filteredList(listCocktails);
      console.log('holi');
    });
}

//función para crear una img cuando no contiene img
function newImg () {
  //(if)si strDrinkThumb no tiene mostramos una imagen predeterminada === null
  //https://via.placeholder.com/210x295/ffffff/666666/?text=TV

  //(else) al contrario mostramos img de strDrinkThumb 
}



//función jefa para ejecutar las demás funciones 
function handlerCocktails(event) {
  event.preventDefault();
  getApi();
  console.log('hello');
    
}
