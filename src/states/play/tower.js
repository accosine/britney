export default class Tower extends Phaser.Sprite {

  constructor(game, x, y, attributes) {
    super(game, x, y, 'britneysprites', 'tower');
    //this.game = game;
    this.attributes = attributes;
    this.lastShot = game.time.now;
    //this.width = this.CELL_WIDTH;
    //this.height = this.CELL_HEIGHT;
    game.add.existing(this);
    //this.insertTower(x, y);
  }

  //insertTower(x, y) {
    //console.log(this);
    //const tower = this.game.add.sprite(x, y, 'britneysprites', 'tower');

    //this.inputEnabled = true;
    //this.events.onInputUp.add(this.handleTowerTap, this);
    //this.width = this.CELL_WIDTH;
    //this.height = this.CELL_HEIGHT;
    ////this.towerGroup.children[this.towerGroup.length - 1].width = this.CELL_WIDTH;
    ////this.towerGroup.children[this.towerGroup.length - 1].height = this.CELL_HEIGHT;
  //}

  //handleTowerTap() {
    //const [col, row] = this.pixelsToCells(this.x, this.y);
    //this.destroy();
    //this.map[row][col] = 0;
  //}

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
