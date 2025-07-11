import { gameLevels } from './const.js';
import { gameLink } from './game.js';
import { obtainPos } from './utils.js';

let currLevel = {...gameLevels.principiante};          //nivel actual por Defecto

let gameMatrix = []; //Matriz de juego global 

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
    const posId = obtainPos(id); //obtiene la posicion del click decodificando el string "sq1_1"
    gameLink(currLevel,posId);
    }
  });

