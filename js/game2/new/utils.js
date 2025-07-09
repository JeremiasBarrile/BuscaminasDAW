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

//Elimina Ternas ordenadas repetidas
export function removeRepeatedPairs(arr) {
  const unique = Array.from(
    new Set(arr.map(pair => pair.join(','))) // convierte cada terna a string
  ).map(str => str.split(',').map(Number)); // vuelve a convertirlas en arrays de números

  return unique;
}