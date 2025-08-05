var userNameInput = document.getElementById('userName');
var startButton = document.getElementById('startButton');
var errorMessage = document.getElementById('errorMessage');
var leaderboardButton = document.getElementById('leaderboardButton');
var leaderboard = document.getElementById('leaderboard');
var tbody = document.querySelector("#leaderboardTable tbody");
var mainFooter = document.querySelector(".mainFooter");

var nivelSeleccionado = "beginner"; // Nivel por defecto

// Validar nombre y redirigir a game.html
startButton.addEventListener('click', function () {
  var name = userNameInput.value.trim();
  if (name.length < 3) {
    errorMessage.textContent = 'El nombre debe tener al menos 3 caracteres.';
    return;
  }
  localStorage.setItem('userName', name);
  window.location.href = 'game.html';
});

function saveUserName(){
  localStorage.removeItem("userName"); // Elimina userName cada vez que se pulsa el boton jugar, para evitar almacenar nombres innecesarios
  var name = document.getElementById("userName").value.trim();
  console.log("nombre:",name);
}

function showRanking() {
  var juegos = JSON.parse(localStorage.getItem("ranking")) || []; //parsea el json a objeto o lo crea
  var filtro = nivelSeleccionado;

  tbody.innerHTML = "";               //Vacia el contenido interno de tbody

  var juegosFiltrados = [];
  for (var i = 0; i < juegos.length; i++) {
    if (juegos[i].gameLevel === filtro) {
      juegosFiltrados.push(juegos[i]);
    }
  }

  juegosFiltrados.sort(function(a, b) {
    return a.time - b.time;
  });

  for (var j = 0; j < juegosFiltrados.length; j++) {
    var juego = juegosFiltrados[j];

    var fila = document.createElement("tr");

    var celdaPos = document.createElement("td");
    celdaPos.textContent = j + 1;

    var celdaNombre = document.createElement("td");
    celdaNombre.textContent = juego.name;

    var celdaTiempo = document.createElement("td");
    celdaTiempo.textContent = juego.time + "s";

    var celdaFecha = document.createElement("td");
    celdaFecha.textContent = juego.date;

    fila.appendChild(celdaPos);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaTiempo);
    fila.appendChild(celdaFecha);
    tbody.appendChild(fila);
  }
}

// Mostrar ranking al abrir el leaderboard
leaderboardButton.addEventListener("click", function() {
  if (leaderboard.className.indexOf("hidden") !== -1) { //0,1,2,3 depende la posicion que lo encuentre, -1 si no lo encuentra
    // Mostrar ranking
    leaderboard.className = leaderboard.className.replace("hidden", "").trim();
    this.textContent = "Ocultar Ranking";
    showRanking();

    if (window.innerHeight < 850) {
      mainFooter.style.display = "none";
    }
  } else {
    // Ocultar ranking
    leaderboard.className += " hidden";
    this.textContent = "Ver Ranking";

    if (window.innerHeight < 850) {
      mainFooter.style.display = "flex";
    }
  }
});


var levelFilter = document.getElementById("levelFilter");
levelFilter.addEventListener("change", showRanking);// Actualizar ranking al cambiar el filtro

//Botones de filtro
var nivelSeleccionado = "beginner";
var botones = document.querySelectorAll("#levelFilter .level-btn");
for (var i = 0; i < botones.length; i++) {
  botones[i].addEventListener("click", function() {
    for (var j = 0; j < botones.length; j++) {
      botones[j].classList.remove("active");
    }
    this.classList.add("active");// Activa el botón presionado
    nivelSeleccionado = this.getAttribute("data-level");
    showRanking();
  });
}