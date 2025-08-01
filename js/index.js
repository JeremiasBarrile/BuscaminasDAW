document.addEventListener('DOMContentLoaded', function () {
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

    localStorage.setItem('playerName', name);
    window.location.href = 'game.html';
  });
});
