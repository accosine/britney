export function cellsToPixels(col, row) {
  return [col * this.CELL_WIDTH, row * this.CELL_HEIGHT];
}

export function pixelsToCells(x, y) {
  return [Math.floor(x / this.CELL_WIDTH),
          Math.floor(y / this.CELL_HEIGHT)];
}
