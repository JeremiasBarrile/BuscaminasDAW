
//Generar matriz celdas-objeto - Cada cerda almacena el estado del juego (visible, flagged, revelado)
function generateMatrix(levelConfig){
    const { rows, columns } = levelConfig;
    const matrix = [];
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < columns; c++) {
            row.push({
            isMine: false,
            minesAround: 0,
            revealed: false,
            flagged: false
            });
        }
        matrix.push(row);
    }
    return matrix;
};
//Generado por IA Mejorar o Entender
function generateSafeZone(levelConfig, pos) {
  let minSafeSize = 9
  const { rows, columns } = levelConfig;
  const visited = new Set();
  const safeZone = [];
  const stack = [pos];

  const key = ([r, c]) => `${r}-${c}`;
  visited.add(key(pos));

  while (stack.length && safeZone.length < minSafeSize) {
    const [r, c] = stack.pop();
    safeZone.push([r, c]);

    const neighbors = getShuffledNeighbors(r, c, rows, columns);

    for (const [nr, nc] of neighbors) {
      const k = key([nr, nc]);
      if (!visited.has(k)) {
        visited.add(k);
        stack.push([nr, nc]); // agregamos a explorar
      }
    }
  }

  // Opcional: ordenamos
  safeZone.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
  return safeZone;
};
function getShuffledNeighbors(r, c, rows, columns) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],          [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1]
  ];

  const neighbors = [];

  for (const [dr, dc] of directions) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < columns) {
      neighbors.push([nr, nc]);
    }
  }

  return neighbors.sort(() => Math.random() - 0.5); // mezcla aleatoria
}
function showSafeZone(safeZone) {
  for (let i = 0; i < safeZone.length; i++) {
    let row = safeZone[i][0];
    let col = safeZone[i][1];
    let id = `sq${row}_${col}`;
    let cell = document.getElementById(id);

    if (cell) {
      cell.className = "mine-hit square";
    }
  }
};

export function startGame(level,pos){
    const rows = 8;
    const columns = 8;
    let matrix = generateMatrix(level);         //Genera Matriz vacia
    let safeZone = generateSafeZone(level, pos);    //genera zona segura al rededor de la posicion seleccionada
    showSafeZone(safeZone);

    console.log(matrix);
    console.log(matrix[0])
    console.log(matrix[0][7].isMine)
    console.log(safeZone);
};

startGame({ rows: 8, columns: 8, mines: 10 }, [5,5]);

