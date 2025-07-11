 import { directions } from "./const.js";

//Genera numeros aleatorios enteros entre el rango min y max
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Compara el arreglo con una posicion tipo [0,1]
export function checkRepeated(arr,arrPair){
  for(let i=0; i < arr.length; i++){
      if(arr[i][0] === arrPair[0] && arr[i][1] === arrPair[1]){
       return true; 
      }
  }
  return false;
}

//Elimina Ternas ordenadas repetidas con Set se puede evitar.
export function removeRepeatedPairs(arr) {
  const unique = Array.from(
    new Set(arr.map(pair => pair.join(','))) // convierte cada terna a string
  ).map(str => str.split(',').map(Number)); // vuelve a convertirlas en arrays de números

  return unique;
}

//Mezcla el arreglo 
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//decodifica string id
export function obtainPos(id){
    const posStr = id.substring(2); // "0_1"
    const [row, col] = posStr.split("_").map(Number); // [0, 1]
    return[row,col]
}

export function getNeighbor(matrix, [row, col], dirIndex) { //chequear IA
  const [dRow, dCol] = directions[dirIndex];
  const newRow = row + dRow;
  const newCol = col + dCol;

  const numRows = matrix.length;
  const numCols = matrix[0].length;

  const isInside = newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols;

  return isInside ? matrix[newRow][newCol] : null; //Devuelve el objeto/null vecino a la posicionpasada
}