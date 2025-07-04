
const matrix = document.getElementById("matrix");
const level = document.getElementById("level");
const reset = document.getElementById("reset")
const minesCounter = document.getElementById("minesCounter");


export function generateHtmlMatrix(levelConfig) {
  const {rows,columns} = levelConfig;     //Antes se ingresaban dos variables en la funcion, se reemplazo por el objeto levelConfig y se extraen las variables rows y columns
    matrix.innerHTML = "";
    matrix.style.gridTemplateColumns = `repeat(${columns}, 23px)`;
    matrix.style.gridTemplateRows = `repeat(${rows}, 23px)`;
    for (let i = 0; i < rows; i++) {
      for (let j= 0; j < columns; j++){
        const square = document.createElement("div");
        square.id =`sq${i}_${j}`; // Genera squares con id "sq{fila}_{columna}"
        square.className = "none square";
        matrix.appendChild(square);//Genera cada div del square como un tag hijo de matrix
      }
    }
}

function showMines() {
  for (let i = 0; i < mines.length; i++) {
    let a = mines[i][0];
    let b = mines[i][1];
    let id = `sq${a}_${b}`;
    let clicked = document.getElementById(id);
    if (clicked) {
      clicked.className = "mine-hit square";
    }
  }
}

/*Actualizador contador minas */ 
//             ++: Suma 1
//             --: Resta 1
//              (): Reset
export function updateMinesCounter(action){
  let result;
  if(action=== "++"){
    markedMines--;
    result = currLevel.mines - markedMines;
    minesCounter.textContent = result;
  } else if(action === "--"){
    markedMines++;
    result = currLevel.mines - markedMines;
    minesCounter.textContent = result;
  } else {
    markedMines = 0;
    minesCounter.textContent = currLevel.mines;
  }
}