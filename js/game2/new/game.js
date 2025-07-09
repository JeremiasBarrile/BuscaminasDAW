import { directions } from "./const.js";
import { randomInt, checkRepeated, removeRepeatedPairs} from "./utils.js";

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
            flagged: false
            });
        }
        matrix.push(row);
    }
    return matrix;
};
//Genera SafeZone
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
  //removeRepeatedPairs(safeZone); //Elimina las posiciones repetidas
  return secondSafeZone;
};



function startGame(level,pos){
    const rows = 8;
    const columns = 8;
    let matrix = generateMatrix(level);         //Genera Matriz vacia
    let safeZone = generateSafeZone(level, pos);    //genera zona segura al rededor de la posicion seleccionada
    console.log(safeZone);
    // console.log(matrix);
    // console.log(matrix[0])
    // console.log(matrix[0][7].isMine)
    // console.log(safeZone);
};

startGame({ rows: 8, columns: 8, mines: 10 }, [5,4]);

