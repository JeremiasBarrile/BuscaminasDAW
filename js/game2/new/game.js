import { directions } from "./const.js";
import { randomInt, checkRepeated, removeRepeatedPairs, shuffleArray, getNeighbor} from "./utils.js";

let firstClick = true;
let matrix =[];

//Generar matriz celdas-objeto - Cada cerda almacena el estado del juego (visible, flagged, revelado)
function generateMatrix(levelConfig){
    const { rows, columns } = levelConfig;
    const matrix = [];
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < columns; c++) {
            row.push({
            isMine: false,
            minesAround: 0,
            revealed: false,
            flagged: false,
            row: r,
            col: c
            });
        }
        matrix.push(row);
    }
    return matrix;
};
//Genera SafeZone (reemplazar arreglos por Set)
function generateSafeZone(levelConfig, pos) {
  let minSafeSize = 2
  const { rows, columns } = levelConfig;
  const safeZone = [];
  safeZone.push(pos);
do {
  let randomPos = safeZone[randomInt(0,safeZone.length - 1)]; //obtene posicion random del arreglo safeZone
  const dir = directions[randomInt(0,7)];//Obtene posicion rando de las direcciones que envuelven a una posicion
  const newRow = randomPos[0] + dir[0];
  const newCol = randomPos[1] + dir[1];

  const isInside = newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns;
  const notRepeated = !checkRepeated(safeZone,[newRow,newCol]);
  if( isInside && notRepeated){
    safeZone.push([newRow,newCol]);
    minSafeSize--;
  }
} while (minSafeSize > 0); // Genera las primeras posiciones, al salir de este While, generará los contornos que rodean cada posicion del array safezone
const secondSafeZone = [...safeZone];
for(let i=0; i< safeZone.length; i++){
  for(let j=0; j< directions.length; j++){
    const outsideRow = safeZone[i][0] + directions[j][0];
    const outsideCol = safeZone[i][1] + directions[j][0];
    secondSafeZone.push([outsideRow,outsideCol]);
  }
}
  return removeRepeatedPairs(secondSafeZone);;
};
// Posiciones las Minas, evitando safezone 
function generateMines(matrix, safeZone, level) {
  const totalMines = level.mines;
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Convertimos safeZone a Set para búsqueda rápida
  const safeSet = new Set(safeZone.map(([r, c]) => `${r}-${c}`));

  // 1. Generar lista de posiciones disponibles (excluyendo la zona segura)
  const availablePositions = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${r}-${c}`;
      if (!safeSet.has(key)) {
        availablePositions.push([r, c]);
      }
    }
  }

  // 2. Mezclar las posiciones disponibles
  const shuffled = shuffleArray(availablePositions);
  console.log("Minas:",shuffled);

  // 3. Tomar las primeras N posiciones y colocar minas
  for (let i = 0; i < totalMines && i < shuffled.length; i++) {
    const [r, c] = shuffled[i];
    matrix[r][c].isMine = true;
  }

  return matrix; // opcional, si querés usar en cadena
}

function completeMatrix(matrix){ //Completa la matriz con con cantidad de Minas al rededor
  const rows = matrix.length;
  const columns = matrix[0].length;

  for(let r=0; r < rows; r++){
    for(let c=0; c < columns; c++){
      const cell = matrix[r][c];
      if(!cell.isMine){ //Si la celda no es una mina ejecuta el codigo interno
        let counter=0;
        for(let d=0;d < directions.length; d++){
          const posRow = r + directions[d][0];
          const posColumn = c + directions[d][1];

          //const isInside = newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns;
          if(posRow >= 0 && posRow < rows && posColumn >= 0 && posColumn < columns){
            if(matrix[posRow][posColumn].isMine){
              counter++;
            }
          }
        }
      cell.minesAround = counter;
      }
    }
  }
  return matrix;
}

function startGame(matrix,level,pos){
    matrix = generateMatrix(level);         //Genera Matriz vacia
    let safeZone = generateSafeZone(level, pos);    //genera zona segura al rededor de la posicion seleccionada
    matrix = generateMines(matrix, safeZone, level)
    matrix = completeMatrix(matrix);

    //console.log(safeZone);
    //console.log (matrix);
    return matrix;
    // console.log(matrix);
    // console.log(matrix[0])
    // console.log(matrix[0][7].isMine)
    // console.log(safeZone);
};

//startGame({ rows: 8, columns: 8, mines: 10 }, [5,4]);

export function gameLink(level,pos){
  if(firstClick){
    matrix = startGame(matrix,level,pos);
    firstClick = false;                 // Bandera corta la unica ejecucion de generacion de minas en el primer click.
  }
   showCell(matrix,pos);
}

function showCell(matrix,pos){
  const x = pos[0];
  const y = pos[1];
  const cell = document.getElementById(`sq${x}_${y}`);

  if(!matrix[x][y].isMine){
    matrix.revealed = true;
    cell.className = "used";
    cell.textContent = matrix[x][y].minesAround;
    showAround(matrix,pos)
  }
  
};

function showAround(matrix,[x,y]){
  for(let i=0; i < directions.length; i++ ){
    let neighbor = getNeighbor(matrix,[x,y],i);
    if(neighbor!== null){
      if (neighbor !== null && !neighbor.revealed && !neighbor.isMine && !neighbor.flagged) {
        neighbor.revealed = true;
        const x = neighbor.row;
        const y = neighbor.col;
        const cell = document.getElementById(`sq${x}_${y}`);
        cell.className = "used";
        cell.textContent = neighbor.minesAround;
        
        showAround(matrix,[x,y])
     }
    }
  }
};