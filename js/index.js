'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var userNameInput = document.getElementById('userName');
  var startButton = document.getElementById('startButton');
  var errorMessage = document.getElementById('errorMessage');

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
