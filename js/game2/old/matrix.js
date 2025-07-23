function generateBooleanMatrix(){
    
}

function generateMines(levelConfig){
  const {rows,columns,mines} = levelConfig;
  console.log(columns);
  let arrMines = [];
  while(arrMines.length < mines){
    let x = Math.floor(Math.random() * rows);
    let y = Math.floor(Math.random() * columns);

    if(!checkRepeated(arrMines,[x,y])){ //Compara x e y pasado como arreglo con el arreglo generado de minas (arrMines)
      arrMines.push([x,y]);
    }
  }
  console.log(arrMines);
  return arrMines;
}