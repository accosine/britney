export function insertTower(col, row) {
  const [x, y] = this.cellsToPixels(col, row);
  const tower = this.towerGroup.create(x, y, 'britneysprites', 'tower');

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

export function fire(tower) {
  // Grab the first bullet we can from the pool
  const bullet = this.bullets.getFirstExists(false);

  if (bullet) {
    bullet.reset(tower.x, tower.y);
    this.game.physics.arcade.moveToObject(bullet, this.beholder, 120);
  }
}

export function bulletHitsBeholder(beholder, bullet) {
  bullet.kill();
  // decrease beholder health
}

export default {
  insertTower,
  handleTowerTap,
  fire,
  bulletHitsBeholder,
};
