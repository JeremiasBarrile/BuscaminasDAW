
document.addEventListener('DOMContentLoaded', function () {
  var userNameInput = document.getElementById('userName');
  var playButton = document.getElementById('playButton');
  var errorMessage = document.getElementById('errorMessage');

  playButton.addEventListener('click', function () {
    var name = userNameInput.value.trim();

    if (name.length < 3) {
      errorMessage.textContent = 'Name must have at least 3 characters.';
      return;
    }

    // Guardar nombre en localStorage
    localStorage.setItem('playerName', name);

    // Redireccionar al juego
    window.location.href = 'game.html';
  });
});
