var userNameInput = document.getElementById('userName');
var startButton = document.getElementById('startButton');
var errorMessage = document.getElementById('errorMessage');
var leaderboardButton = document.getElementById('leaderboardButton');
var closeLeaderboardButton = document.getElementById('closeLeaderboardButton');
var leaderboard = document.getElementById('leaderboard');


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

var nivelSeleccionado = "beginner"; // Nivel por defecto
function showRanking() {
  var juegos = JSON.parse(localStorage.getItem("ranking")) || [];
  var filtro = nivelSeleccionado;
  var tbody = document.querySelector("#leaderboardTable tbody");
  tbody.innerHTML = "";

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
document.getElementById("leaderboardButton").addEventListener("click", function() {
  var leaderboard = document.getElementById("leaderboard");
  var btn = this;

  if (leaderboard.classList.contains("hidden")) {
    leaderboard.classList.remove("hidden");
    btn.textContent = "Ocultar Ranking";
    showRanking();
  } else {
    leaderboard.classList.add("hidden");
    btn.textContent = "Ver Ranking";
  }
});

var levelFilter = document.getElementById("levelFilter");
levelFilter.addEventListener("change", showRanking);// Actualizar ranking al cambiar el filtro

//TESTEANDO BOTONES SELECTORES FILTRO
var nivelSeleccionado = "beginner"; // Nivel por defecto
var botones = document.querySelectorAll("#levelFilter .level-btn");

for (var i = 0; i < botones.length; i++) {
  botones[i].addEventListener("click", function() {
    // Quitar clase activa a todos
    for (var j = 0; j < botones.length; j++) {
      botones[j].classList.remove("active");
    }

    // Activar el botón clickeado
    this.classList.add("active");
    nivelSeleccionado = this.getAttribute("data-level");

    // Mostrar ranking
    showRanking();
  });
}