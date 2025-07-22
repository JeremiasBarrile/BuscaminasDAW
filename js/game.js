
//CONST
var  gameLevels= {
  principiante: { rows: 8, columns: 8, mines: 10 },
  intermedio:   { rows: 16, columns: 16, mines: 40 },
  avanzado:     { rows: 30, columns: 40, mines: 99 }
};
var directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],          [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1]
];

var visitedCells = {};

var matrix = document.getElementById("matrix");
var level = document.getElementById("level");
var reset = document.getElementById("reset");
var minesCounter = document.getElementById("minesCounter");

//nivel actual por Defecto, igual a currLevel = {...gameLevels.principiante};         
var currLevel = gameLevels["principiante"];

/* Variables contador minas */
minesCounter.textContent = (currLevel.mines) ;  // No hay minas marcadas
var flaggedMines = 0;                           // Contador minas marcadas
var firstClick = true;                          //Bandera de primer click en juego
var mines = [];

//  ██████   █████  ███    ███ ███████
// ██       ██   ██ ████  ████ ██
// ██   ███ ███████ ██ ████ ██ █████ 
// ██    ██ ██   ██ ██  ██  ██ ██ 
//  ██████  ██   ██ ██      ██ ███████
function generateMatrix(levelConfig) {
  var {rows,columns} = levelConfig;     //Antes se ingresaban dos variables en la funcion, se reemplazo por el objeto levelConfig y se extraen las variables rows y columns
    matrix.innerHTML = "";
    matrix.style.gridTemplateColumns = `repeat(${columns}, 23px)`;
    matrix.style.gridTemplateRows = `repeat(${rows}, 23px)`;
    for (var i = 0; i < rows; i++) {
      for (var j= 0; j < columns; j++){
        var square = document.createElement("div");
        square.id =`sq${i}_${j}`; // Genera squares con id "sq{fila}_{columna}"
        square.className = "none square";
        matrix.appendChild(square);//Genera cada div del square como un tag hijo de matrix
      }
    }
}
function generateMines(levelConfig){
  var {rows,columns,mines} = levelConfig;
  console.log(columns);
  var arrMines = [];
  while(arrMines.length < mines){
    var x = Math.floor(Math.random() * rows);
    var y = Math.floor(Math.random() * columns);

    if(!checkRepeated(arrMines,[x,y])){ //Compara x e y pasado como arreglo con el arreglo generado de minas (arrMines)
      arrMines.push([x,y]);
    }
  }
  console.log(arrMines);
  return arrMines;
}
//Compara el arreglo de las minas con un arreglo de tipo [0,1]
function checkRepeated(arr,arrPair){
  for(var i=0; i < arr.length; i++){
      if(arr[i][0] === arrPair[0] && arr[i][1] === arrPair[1]){
       return true; 
      }
  }
  return false;
}
function convertIdToArray(id){
  var posStr = id.substring(2); // "0_1"
  var [row, col] = posStr.split("_").map(Number);
  return [row, col];
}
function convertArraytoId(){

}
//Compara id pasado con el arreglo de minas generadas
function compare([row, col],mines){
  if(checkRepeated(mines,[row, col])){
    return true;
  } else {
    return false;
  }
}
function showMines() {
  for (var i = 0; i < mines.length; i++) {
    var a = mines[i][0];
    var b = mines[i][1];
    var id = `sq${a}_${b}`;
    var clicked = document.getElementById(id);
    if (clicked) {
      clicked.className = "mine-hit square";
    }
  }
}
/*Actualizador contador minas */ 
//             ++: Suma 1
//             --: Resta 1
//              (): Reset
function updateMinesCounter(action){
  var result;
  if(action=== "++"){
    flaggedMines--;
    result = currLevel.mines - flaggedMines;
    minesCounter.textContent = result;
  } else if(action === "--"){
    flaggedMines++;
    result = currLevel.mines - flaggedMines;
    minesCounter.textContent = result;
  } else {
    flaggedMines = 0;
    minesCounter.textContent = currLevel.mines;
  }
}
generateMatrix(currLevel);
// ██████    ██████  ███    ███
// ██   ██  ██    ██ ████  ████
// ██    ██ ██    ██ ██ ████ ██
// ██   ██  ██    ██ ██  ██  ██
// █████     ██████  ██      ██
//Evento asociado a boton Reset
reset.addEventListener("click", function() {
    generateMatrix(currLevel);
    updateMinesCounter();
    firstClick = true;
})
//Evento asociado a selector de nivel, Genera la Matriz html de acuerdo a la selección
level.addEventListener("change", function() {
  var selectedLevel = level.value;
  if (gameLevels[selectedLevel]) {                //Validador en caso de que se agrege una opcion mas en el form de niveles disponibles y no se encuentre cargada en el objeto gameLevels
    currLevel = gameLevels[selectedLevel];
    generateMatrix(currLevel);
    updateMinesCounter();                         //Actualiza contador por defecto () resetea al numero de minas del nivel
    firstClick = true;
  } else {
    console.warn("Nivel no reconocido:", selectedLevel);
  }

});
/* funcionalidad boton derecho (contexmenu) en celdas con cambio de clase según su estado*/
document.addEventListener("contextmenu", function(e) {
  e.preventDefault(); //Evita que aparesca el menu del navegador
    if (e.target.id.indexOf("sq") === 0) {
    var clicked = e.target;
    if(clicked.classList.contains("none")){
      clicked.className = "flagged square"; // reemplaza todas las clases por una unica clase "flagged" evitando usar: clicked.classList.remove("none"); clicked.classList.add("flagged");
      updateMinesCounter("--");
    } else if(clicked.classList.contains("flagged")){
      clicked.className = "questioned square";
      updateMinesCounter("++");
    } else if(clicked.classList.contains("questioned")){
      clicked.className = "none square";
    } }
});
//Evento global al presionar cada celda (sq)
document.addEventListener("click", function(e) {
  if (e.target.id.indexOf("sq") === 0) {
    var clicked = e.target;
    var id = convertIdToArray(clicked.id);  //Arreglo de la posicion [x,y]   

    if (!clicked.classList.contains("flagged") && !clicked.classList.contains("questioned") ){
      if(firstClick){
       do {                                //Con estas tres lineas de codigo nos evitamos estar pasando la variable id del elemento presionado
         mines = generateMines(currLevel);      // a cada una de las funciones y lo solucionamos en 3 lineas
       } while (compare(id,mines));         //repite la generación de la matriz minas hasta que no se repita la presionada con la generada.
      firstClick = false;                 // Bandera corta la unica ejecucion de generacion de minas en el primer click.
    }

    if(compare(id,mines)){  //Compara si hay una mina en esa posicion
       showMines();
    } else {
      showCell(id);

      var visited = Object.keys(visitedCells).length;
      var totalCells = currLevel.rows * currLevel.columns;
      var difference = visited + currLevel.mines;

      if (difference === totalCells) {
        alert("🎉 ¡Juego finalizado! Has ganado.");
      }
    }}
  }
});



function showCell([row,col]) {
  var cellId = row + "_" + col;

  if (visitedCells[cellId]) { //evitamos un bucle y mantenemos control de celdas visitadas
  return;
  }
  visitedCells[cellId] = true;

  var minesCounter = 0;

  for (var i = 0; i < directions.length; i++) {
    var x = row + directions[i][0];
    var y = col + directions[i][1];

    if (x >= 0 && y >= 0 && x < currLevel.rows && y < currLevel.columns) {
      if (compare([x, y], mines)) {
        minesCounter++;
      }
    }
  }

  var cell = document.getElementById("sq" + row + "_" + col);
  cell.className = "used";

  if (minesCounter === 0) {
    for (var j = 0; j < directions.length; j++) {
      var xx = row + directions[j][0];
      var yy = col + directions[j][1];

      if (xx >= 0 && yy >= 0 && xx < currLevel.rows && yy < currLevel.columns) {
        showCell([xx, yy]);
      }
    }
  } else {
    cell.textContent = minesCounter;
  }
}
