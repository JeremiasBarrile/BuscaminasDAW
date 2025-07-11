/* Variables contador minas */
minesCounter.textContent = (currLevel.mines) ;  // No hay minas marcadas
let markedMines = 0;                   // Contador minas marcadas

let firstClick = true;                                  //Bandera de primer click en juego
let mines = [];

//Compara el arreglo de las minas con un arreglo de tipo [0,1]
function checkRepeated(arr,arrPair){
  for(let i=0; i < arr.length; i++){
      if(arr[i][0] === arrPair[0] && arr[i][1] === arrPair[1]){
       return true; 
      }
  }
  return false;
}

//Compara id pasado con el arreglo de minas generadas
function compare(id,mines){ 
    const posStr = id.substring(2); // "0_1"
    const [row, col] = posStr.split("_").map(Number); // [0, 1]
    return checkRepeated(mines,[row, col]);
}






  //Evento click boton Reset
reset.addEventListener("click", ()=> {
    generateHtmlMatrix(currLevel);
    updateMinesCounter();
    firstClick = true;
})


        //FLUJO PRINCIPAL//
//Evento al presionar cada cuadrado
document.addEventListener("click", (e) => {
  if (e.target.id.startsWith("sq")) {
    const clicked = e.target;
    const id = clicked.id;
    if (!clicked.classList.contains("flagged") && !clicked.classList.contains("questioned") ){ //No se puede apretar un boton con bandera o signo de pregunta
      if(firstClick){
        do {                                //Con estas tres lineas de codigo nos evitamos estar pasando la variable id del elemento presionado
          mines = generateMines(currLevel);      // a cada una de las funciones y lo solucionamos en 3 lineas
        } while (compare(id,mines));         //repite la generación de la matriz minas hasta que no se repita la presionada con la generada.
        firstClick = false;                 // Bandera corta la unica ejecucion de generacion de minas en el primer click.
      }
      if(compare(id,mines)){                //Compara posicion presionada con arreglo de minas
        showMines();
      }else{
        clicked.className = "used";         // Clase "used" elimina todo el contenido interno
      }
    }
  }
});
/* funcionalidad boton derecho (contexmenu) en celdas con cambio de clase según su estado*/
document.addEventListener("contextmenu", (e) =>{
  e.preventDefault(); //Evita que aparesca el menu del navegador
    if (e.target.id.startsWith("sq")) {
    const clicked = e.target;
    if(clicked.classList.contains("none")){
      clicked.className = "flagged square"; // reemplaza todas las clases por una unica clase "flagged" evitando usar: clicked.classList.remove("none"); clicked.classList.add("flagged");
      updateMinesCounter("--");
    } else if(clicked.classList.contains("flagged")){
      clicked.className = "questioned square";
      updateMinesCounter("++");
    } else if(clicked.classList.contains("questioned")){
      clicked.className = "none square";
    } }
});
