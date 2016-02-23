import { cellsToPixels, pixelsToCells } from './util';

export default class Tower extends Phaser.Sprite {

  constructor(state, col, row, attributes) {
    const [x, y] = cellsToPixels.bind(state)(col, row);
    super(state.game, x, y, 'britneysprites', 'tower');
    this.state = state;
    this.attributes = attributes;
    this.lastShot = state.game.time.now;
    this.width = state.CELL_WIDTH;
    this.height = state.CELL_HEIGHT;
    this.inputEnabled = true;
    this.events.onInputUp.add(this.handleTowerTap, this);

    state.game.add.existing(this);
  }

  handleTowerTap() {
    const [col, row] = pixelsToCells.bind(this.state)(this.x, this.y);
    this.destroy();
    this.state.map[row][col] = 0;
  }

  //fire() {
    //// Grab the first bullet we can from the pool
    //const bullet = this.bullets.getFirstExists(false);
    //const distance = this.game.physics.arcade.distanceBetween(this, this.beholder);

    //if (bullet && distance < 100) {
      //bullet.reset(this.x, this.y);
      //this.game.physics.arcade.moveToObject(bullet, this.beholder, 120);
    //}
  //}

  //update() {
  //}

}


//export function insertTower(col, row) {
  //const [x, y] = this.cellsToPixels(col, row);
  //const tower = this.towerGroup.create(x, y, 'britneysprites', 'tower');

  //tower.inputEnabled = true;
  //tower.events.onInputUp.add(this.handleTowerTap, this);
  //this.towerGroup.children[this.towerGroup.length - 1].width = this.CELL_WIDTH;
  //this.towerGroup.children[this.towerGroup.length - 1].height = this.CELL_HEIGHT;
//}

//export function handleTowerTap(tower) {
  //const [col, row] = this.pixelsToCells(tower.x, tower.y);
  //tower.destroy();
  //this.map[row][col] = 0;
//}

//export function fire(tower) {
  //// Grab the first bullet we can from the pool
  //const bullet = this.bullets.getFirstExists(false);
  //const distance = this.game.physics.arcade.distanceBetween(tower, this.beholder);

  //if (bullet && distance < 100) {
    //bullet.reset(tower.x, tower.y);
    //this.game.physics.arcade.moveToObject(bullet, this.beholder, 120);
  //}
//}

//export function bulletHitsBeholder(beholder, bullet) {
  //bullet.kill();
  //// decrease beholder health
//}

//export default {
  //insertTower,
  //handleTowerTap,
  //fire,
  //bulletHitsBeholder,
//};
