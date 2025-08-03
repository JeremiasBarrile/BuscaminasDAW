var userNameInput = document.getElementById('userName');
var startButton = document.getElementById('startButton');
var errorMessage = document.getElementById('errorMessage');
var leaderboardButton = document.getElementById('leaderboardButton');
var closeLeaderboardButton = document.getElementById('closeLeaderboardButton');
var leaderboard = document.getElementById('leaderboard');

// Mostrar leaderboard
leaderboardButton.addEventListener('click', function () {
  leaderboard.classList.remove('hidden');
});

// Ocultar leaderboard
closeLeaderboardButton.addEventListener('click', function () {
  leaderboard.classList.add('hidden');
});

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
  var name = document.getElementById("userName").value.trim();
  console.log("nombre:",name);
}


//TEST RANKING
function mostrarRanking() { //cambiar luego
  const juegos = JSON.parse(localStorage.getItem("ranking")) || [];
  const filtro = document.getElementById("levelFilter").value;
  const tbody = document.querySelector("#leaderboardTable tbody");

  // Limpiar tabla
  tbody.innerHTML = "";

  // Filtrar por nivel si se seleccionó uno
  const juegosFiltrados = (filtro === "all")
    ? juegos
    : juegos.filter(j => j.gameLevel === filtro);

  // Ordenar por tiempo ascendente (el más rápido primero)
  juegosFiltrados.sort((a, b) => a.time - b.time);

  // Insertar filas
  juegosFiltrados.forEach((juego, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${juego.name}</td>
      <td>${juego.time}s</td>
      <td>${juego.date}</td>
      <td>${juego.gameLevel}</td>
    `;
    tbody.appendChild(fila);
  });
}
// Mostrar ranking al abrir el leaderboard
document.getElementById("leaderboardButton").addEventListener("click", () => {
  document.getElementById("leaderboard").classList.remove("hidden");
  mostrarRanking();
});

// Cerrar leaderboard
document.getElementById("closeLeaderboardButton").addEventListener("click", () => {
  document.getElementById("leaderboard").classList.add("hidden");
});

// Actualizar ranking al cambiar el filtro
document.getElementById("levelFilter").addEventListener("change", mostrarRanking);