import { gameLevels } from './const.js';


let currLevel = {...gameLevels.principiante};          //nivel actual por Defecto
let firstClick = true;   

//Genera grilla HTML
function generateGrid(levelConfig) {
  const {rows,columns} = levelConfig;     //Antes se ingresaban dos variables en la funcion, se reemplazo por el objeto levelConfig y se extraen las variables rows y columns
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${columns}, 23px)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 23px)`;
    for (let i = 0; i < rows; i++) {
      for (let j= 0; j < columns; j++){
        const square = document.createElement("div");
        square.id =`sq${i}_${j}`; // Genera squares con id "sq{fila}_{columna}"
        square.className = "none square";
        grid.appendChild(square);//Genera cada div del square como un tag hijo de matrix
      }
    }
};

generateGrid(currLevel);
        //FLUJO PRINCIPAL//
//Evento al presionar cada cuadrado
document.addEventListener("click", (e) => {
  if (e.target.id.startsWith("sq")) {
    const clicked = e.target;
    const id = clicked.id;
    if (!clicked.classList.contains("flagged") && !clicked.classList.contains("questioned") ){ //No se puede apretar un boton con bandera o signo de pregunta
      if(firstClick){
        do {                                //Con estas tres lineas de codigo nos evitamos estar pasando la variable id del elemento presionado
         // mines = generateMines(currLevel);      // a cada una de las funciones y lo solucionamos en 3 lineas
        } while (compare(id,mines));         //repite la generación de la matriz minas hasta que no se repita la presionada con la generada.
        firstClick = false;                 // Bandera corta la unica ejecucion de generacion de minas en el primer click.
      }
    //   if(compare(id,mines)){                //Compara posicion presionada con arreglo de minas
    //     showMines();
    //   }else{
    //     clicked.className = "used";         // Clase "used" elimina todo el contenido interno
    //   }
    }
  }
});

