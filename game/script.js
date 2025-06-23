const matrix = document.getElementById("matrix");

function generateMatrix(rows, columns) {
    matrix.innerHTML = "";
  
    // Establecer dimensiones de la grilla
    matrix.style.gridTemplateColumns = `repeat(${columns}, 20px)`;
    matrix.style.gridTemplateRows = `repeat(${rows}, 20px)`;
  
    // Crear cuadrados
    for (let i = 0; i < rows * columns; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      matrix.appendChild(square);
    }
  }

// Ejemplo de uso
generateMatrix(8, 8);


