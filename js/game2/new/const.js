export const  gameLevels= {
  principiante: { rows: 8, columns: 8, mines: 10 },
  intermedio:   { rows: 16, columns: 16, mines: 40 },
  avanzado:     { rows: 30, columns: 40, mines: 99 }
};

 export const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],          [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1]
  ];


//UI
export const htmlGrid = document.getElementById("htmlGrid");
export const level = document.getElementById("level");
const reset = document.getElementById("reset");
const minesCounter = document.getElementById("minesCounter");