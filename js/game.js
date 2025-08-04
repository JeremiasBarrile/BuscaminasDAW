// ==========================
//    CONFIGURACIÓN INICIAL
// ==========================
var  gameLevels= {
  beginner:       { rows: 8, columns: 8, mines: 10, type:"beginner" },
  intermediate:   { rows: 12, columns: 12, mines: 25, type:"intermediate" },
  advanced:       { rows: 16, columns: 16, mines: 40, type:"advanced" }
};
var directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],          [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1]
];

// ==========================
//    VARIABLES GLOBALES
// ==========================
var currLevel = gameLevels["beginner"];       //nivel actual por Defecto, igual a currLevel = {...gameLevels.beginner};  
var flaggedMines = 0;                         // Contador minas marcadas
var secondsTimer = 0;                         //Contador globar de segundos que luego sera procesados
var intervalTimerId = null                    //Almacenará el id generado en el intervalo de time()
var firstClick = true;                        //Bandera de primer click en juego
var gameOver =false;                          //Bandera de juego finalizado
var mines = [];
var visitedCells = {};

// ==========================
//    REFERENCIAS AL DOM
// ==========================
var matrix = document.getElementById("matrix");
var level = document.getElementById("level");
var reset = document.getElementById("reset");
var minesCounter = document.getElementById("minesCounter");

// ==========================
//    INICIALIZACIÓN
// ==========================       
generateMatrix(currLevel);

/* Variables contador minas */
minesCounter.textContent = (currLevel.mines) ;  // No hay minas marcadas


// ==========================
//    FUNCIONES DE JUEGO
// ==========================
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
};
function generateMines(levelConfig){
  var {rows,columns,mines} = levelConfig;
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
};
function checkRepeated(arr,arrPair){       //Compara el arreglo de las minas con un arreglo de tipo [0,1]
  for(var i=0; i < arr.length; i++){
      if(arr[i][0] === arrPair[0] && arr[i][1] === arrPair[1]){
       return true; 
      }
  }
  return false;
};
function convertIdToArray(id){
  var posStr = id.substring(2); // "0_1"
  var [row, col] = posStr.split("_").map(Number);
  return [row, col];
};
function resetGame(){
    generateMatrix(currLevel);
    updateMinesCounter();                         //Actualiza contador por defecto () resetea al numero de minas del nivel
    firstClick = true;
    gameOver = false;
    visitedCells = {};
    resetTimer();
};
function compare([row, col],mines){       //Compara id pasado con el arreglo de minas generadas
  if(checkRepeated(mines,[row, col])){
    return true;
  } else {
    return false;
  }
};
function showMines() {
  for (var i = 0; i < mines.length; i++) {
    var a = mines[i][0];
    var b = mines[i][1];
    var id = `sq${a}_${b}`;
    var clicked = document.getElementById(id);
    if (clicked) {
      clicked.className = "mine-hit square";
    }
  gameOver = true;
  }
}
/*Actualizador contador minas */ 
//             ++: Suma 1
//             --: Resta 1
//              (): Reset
function updateMinesCounter(action){
  var result;
  if(action === "++"){
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
};
function showCell(coord) {            //ES5 no existe desestructuración (coord)--->([row,col])
  var row = coord[0];
  var col = coord[1];
  var cellId = row + "_" + col;
  var minesCounter = 0;

  if (visitedCells[cellId]) { //evitamos un bucle y mantenemos control de celdas visitadas
  return;
  }

  visitedCells[cellId] = true;

  for (var i = 0; i < directions.length; i++) {
    var x = row + directions[i][0];
    var y = col + directions[i][1];
    if (x >= 0 && y >= 0 && x < currLevel.rows && y < currLevel.columns) { //Verificamos que no se encuentre fuera de la matriz
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
};

// ==========================
//    CRONÓMETRO
// ==========================
function stopTimer(){
    clearInterval(intervalTimerId);
    intervalTimerId = null;

};
function resetTimer(){
  clearInterval(intervalTimerId);
  intervalTimerId = null;
  secondsTimer = 0;
  document.getElementById('timer').textContent = "00:00";
};
function startTimer(){
  intervalTimerId = setInterval(
        function(){
          secondsTimer++;
          var minutes = Math.floor(secondsTimer/60);
          var seconds = secondsTimer % 60;
          var secStr = seconds;
          var minStr = minutes;
          if(seconds<10){           //var minStr = (minutes < 10) ? "0" + minutes : minutes;
            secStr = "0" + seconds;
          }
          if(minutes < 10){         //var secStr = (seconds < 10) ? "0" + seconds : seconds;
            minStr = "0" + minutes;
          }
          document.getElementById('timer').textContent = minStr + ":" + secStr;
        }
    ,1000);                       //1000 milisegundos = 1 segundo
};

// ==========================
//    CONTADOR DE MINAS
// ==========================
//MODAL
function showGameResultModal(message, win) {
  var modal = document.getElementById("gameResultModal");
  var content = document.getElementById("modalContent");
  var messageElement = document.getElementById("modalMessage");
  messageElement.textContent = message;

  content.classList.remove("win", "lose"); // Remover clases anteriores

  if (win) {
    content.classList.add("win");
  } else {                                   // Animación/fondo según resultado
    content.classList.add("lose");
  }
  modal.classList.add("show");
}

document.getElementById("playAgainBtn").onclick = function() {
  document.getElementById("gameResultModal").classList.remove("show");// Botón Volver a jugar
  resetGame();
};

document.getElementById("goHomeBtn").onclick = function() {// Botón Volver al inicio
  window.location.href = "index.html";
};
// ==========================
//    EVENTOS
// ==========================

//Evento asociado a boton Reset
reset.addEventListener("click", resetGame );        //Llama a la funcion resetGame
document.addEventListener("keydown", function(e) {
  if (e.code === "Space") {
    e.preventDefault();                   // Previene la accion default de scroll en la barra espaciadora
    resetGame();
  }
});
level.addEventListener("change", function() {         //Evento asociado a selector de nivel, Genera la Matriz html de acuerdo a la selección
  var selectedLevel = level.value;
  if (gameLevels[selectedLevel]) {                //Validador en caso de que se agrege una opcion mas en el form de niveles disponibles y no se encuentre cargada en el objeto gameLevels
    currLevel = gameLevels[selectedLevel];
    resetGame();
  } else {
    console.warn("Nivel no reconocido:", selectedLevel);
  }
});
document.addEventListener("contextmenu", function(e) {// funcionalidad boton derecho (contexmenu) en celdas con cambio de clase según su estado
  if (gameOver) return;                      //Si game over es true, termina el evento
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
document.addEventListener("click", function(e) {    //Evento global al presionar cada celda (sq)
  if (gameOver) return;                             //Si game over es true, termina el evento
  if (e.target.id.indexOf("sq") === 0) {
    var clicked = e.target;
    if (e.target.className.indexOf("none square") === 0) {
      revealCell(clicked);
    } else if (e.target.className.indexOf("used")!== -1){//0 si "used" está al principio,>0 si está en el medio o al final y -1 si no está
      chording(clicked);
    }
  }
});

function revealCell(clicked){
    var position = convertIdToArray(clicked.id);  //Arreglo de la posicion [x,y]   
    if (!clicked.classList.contains("flagged") && !clicked.classList.contains("questioned") ){
      if(firstClick){
       do {                                //Con estas tres lineas de codigo nos evitamos estar pasando la variable id del elemento presionado
         mines = generateMines(currLevel);      // a cada una de las funciones y lo solucionamos en 3 lineas
       } while (compare(position,mines));         //repite la generación de la matriz minas hasta que no se repita la presionada con la generada.
      firstClick = false;                 // Bandera corta la unica ejecucion de generacion de minas en el primer click.
      startTimer();
    }

    if(compare(position,mines)){  //Compara si hay una mina en esa posicion
        showMines();
        stopTimer();
        showGameResultModal("❌ ¡Perdiste! Intenta de nuevo.", false);
    } else {
      showCell(position);

      var visited = Object.keys(visitedCells).length;
      var totalCells = currLevel.rows * currLevel.columns;
      var difference = visited + currLevel.mines;

      if (difference === totalCells) {
        gameOver = true;
        stopTimer();
        saveGamePlayed();
        showGameResultModal("🏆 ¡Ganaste! ¡Felicitaciones!", true);
      }
    }}
};
function chording(clicked) { 
  var position = convertIdToArray(clicked.id);
  var row = position[0];
  var col = position[1];
  var minesAround=parseInt(clicked.textContent, 10);
  var flagsAround=0;
  var neighborArr=[];
  for(var i=0;i<directions.length;i++){
    var x = row + directions[i][0];
    var y = col + directions[i][1];
    if (x >= 0 && y >= 0 && x < currLevel.rows && y < currLevel.columns) {
      var cell = document.getElementById("sq" + x + "_" + y);
      if(cell.className.indexOf("flagged")=== 0){
        flagsAround++;
      } else {
        neighborArr.push([x,y]);
      }
    }
  }
  if(flagsAround === minesAround){
    for(var j=0;j<neighborArr.length; j++){
       //showCell(neighborArr[j]);          //Revelando las celdes nos salteamos la validacion de juego finalizado.
       var cellNeigbors = document.getElementById("sq" + neighborArr[j][0] + "_" + neighborArr[j][1]);
       revealCell(cellNeigbors);
    }
  }
}


// ==========================
//    LOCALSTORAGE
// ==========================
function saveGamePlayed(){
  var now = new Date();
  var yyyy = now.getFullYear();
  var mm = ('0' + (now.getMonth() + 1)).slice(-2); // meses van de 0 a 11
  var dd = ('0' + now.getDate()).slice(-2);
  var hh = ('0' + now.getHours()).slice(-2);
  var min = ('0' + now.getMinutes()).slice(-2);
  var dateTime = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min;

  var namePlayer = localStorage.getItem("userName"); //Almacenar fecha y hora
  var time = secondsTimer;
  var level = currLevel.type;

  var newGamePlayed = {
    name: namePlayer,
    date: dateTime,
    gameLevel: level,
    time: time
  };
    
  var games = JSON.parse(localStorage.getItem("ranking")) || [];// Obtener historial existente o crear uno nuevo
  games.push(newGamePlayed);  // Agregar la nueva partida
  localStorage.setItem("ranking", JSON.stringify(games));  // Guardar en localStorage
}