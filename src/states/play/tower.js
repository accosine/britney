export function insertTower(col, row) {
  const [x, y] = this.cellsToPixels(col, row);
  const tower = this.towerGroup.create(x, y, 'britneysprites');
  tower.frameName = 'tower';

  tower.inputEnabled = true;
  tower.events.onInputUp.add(this.handleTowerTap, this);
  this.towerGroup.children[this.towerGroup.length - 1].width = this.CELL_WIDTH;
  this.towerGroup.children[this.towerGroup.length - 1].height = this.CELL_HEIGHT;
}

export function handleTowerTap(tower) {
  const [col, row] = this.pixelsToCells(tower.x, tower.y);
  tower.destroy();
  this.map[row][col] = 0;
}
