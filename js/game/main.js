import { gameLevels } from './levels.js';
import {generateHtmlMatrix, updateMinesCounter} from './dom.js';

let currLevel = {...gameLevels.principiante};          //nivel actual por Defecto
console.log(currLevel)



generateHtmlMatrix(currLevel);

//Selector nivel de modo de juego
level.addEventListener("change", () => {
  const selectedLevel = level.value;
  if (gameLevels[selectedLevel]) {                //Validador en caso de que se agrege una opcion mas en el form de niveles disponibles y no se encuentre cargada en el objeto gameLevels
    currLevel = { ...gameLevels[selectedLevel] }; //Actualiza currLevel 
    generateHtmlMatrix(currLevel);
    updateMinesCounter();                         //Actualiza contador por defecto () resetea al numero de minas del nivel
    firstClick = true;
  } else {
    console.warn("Nivel no reconocido:", selectedLevel);
  }
});
