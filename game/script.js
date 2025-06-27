const matrix = document.getElementById("matrix");

function generateMatrix(rows, columns) {
    matrix.innerHTML = "";
  
    matrix.style.gridTemplateColumns = `repeat(${columns}, 23px)`;
    matrix.style.gridTemplateRows = `repeat(${rows}, 23px)`;
  
    for (let i = 0; i < rows * columns; i++) {
      const square = document.createElement("div");
      square.id =`sq${i}`;
      square.style.width = "23px";
      square.style.height = "23px";
      square.style.backgroundColor = "#a0a0a0";
      
      matrix.appendChild(square);
    }
  }


generateMatrix(8, 8);

document.addEventListener("click", (e) => {
  if (e.target.id.startsWith("sq")) {
    const clicked = e.target;
    // Cambiar estilo (por ejemplo, como si estuviera presionado)
    clicked.style.backgroundColor = "#d0d0d0";
    clicked.style.border = "inset 2px #888";
  }
});