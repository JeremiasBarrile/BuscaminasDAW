const matrix = document.getElementById("matrix");
let firstClick = true;
let mines = [];

const niveles = {
  PRINCIPIANTE: {
    filas: 9,
    columnas: 9,
    minas: 10
  },
  INTERMEDIO: {
    filas: 16,
    columnas: 16,
    minas: 40
  },
  AVANZADO: {
    filas: 30,
    columnas: 16,
    minas: 99
  }
};


function generateMatrix(rows, columns) {
    matrix.innerHTML = "";
    matrix.style.gridTemplateColumns = `repeat(${columns}, 23px)`;
    matrix.style.gridTemplateRows = `repeat(${rows}, 23px)`;
  
    for (let i = 0; i < rows; i++) {
      for (let j= 0; j < columns; j++){
        const square = document.createElement("div");
        square.id =`sq${i}_${j}`; // Genera squares con id "sq{fila}_{columna}"
        square.style.width = "23px";
        square.style.height = "23px";
        square.style.backgroundColor = "#a0a0a0";
        matrix.appendChild(square);
      }
    }
}

function generateMines(mines,rows,columns){
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
    if(checkRepeated(mines,[row, col])){
      return true;
    } else {
      return false;
    }
}

function showMines() {
  for (let i = 0; i < mines.length; i++) {
    let a = mines[i][0];
    let b = mines[i][1];
    let id = `sq${a}_${b}`;
    let clicked = document.getElementById(id);
    if (clicked) {
      clicked.style.backgroundColor = "#9B2A88";
    }
  }
}

generateMatrix(8, 8); //Genera la Matriz html

        //FLUJO PRINCIPAL//
//Evento al presionar cada cuadrado
document.addEventListener("click", (e) => {
  if (e.target.id.startsWith("sq")) {
    const clicked = e.target;
    const id = clicked.id;
    if(firstClick){
       do {                                //Con estas tres lineas de codigo nos evitamos estar pasando la variable id del elemento presionado
         mines = generateMines(8,8,8);      // a cada una de las funciones y lo solucionamos en 3 lineas
       } while (compare(id,mines));         //repite la generación de la matriz minas hasta que no se repita la presionada con la generada.
      firstClick = false;                 // Bandera corta la unica ejecucion de generacion de minas en el primer click.
    }
    if(compare(id,mines)){
       
       showMines();
    }else {
    clicked.style.backgroundColor = "#d0d0d0";
    clicked.style.border = "inset 2px #888";
    }
  }
});



