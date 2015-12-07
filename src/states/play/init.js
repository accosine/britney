export default function() {
  this.COLUMNS = 12;
  this.ROWS = 12;
  this.CELL_WIDTH = 600 / this.COLUMNS;
  this.CELL_HEIGHT = 600 / this.ROWS;
  this.map = [];
  for (var row = 0; row < this.ROWS; row++) {
    this.map.push([]);
    for (var col = 0; col < this.COLUMNS; col++) {
      this.map[row][col] = 0;
    }
  }
}
