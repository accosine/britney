import init from './init';
import preload from './preload';
import create from './create';
import update from './update';
import render from './render';
import { startPathfinding, insertPathPoint } from './path';
//import { insertTower, handleTowerTap, fire, bulletHitsBeholder } from './tower';
import Tower from './tower';
import { cellsToPixels, pixelsToCells } from './util';

export default class Play extends Phaser.State {

  constructor() {
    super();
    this.init = init;
    this.preload = preload;
    this.create = create;
    this.update = update;
    this.render = render;
    this.startPathfinding = startPathfinding;
    this.insertPathPoint = insertPathPoint;
    //this.insertTower = insertTower;
    //this.bulletHitsBeholder = bulletHitsBeholder;
    //this.fire = fire;
    //this.handleTowerTap = handleTowerTap;
    this.cellsToPixels = cellsToPixels;
    this.pixelsToCells = pixelsToCells;
  }

  // TODO: get rid of "global" onTap handler
  handleTap = (pointer) => {
    const [col, row] = this.pixelsToCells(pointer.x, pointer.y);
    if (col > 11 ) return;

    if (!this.map[row][col]) {
      this.map[row][col] = 1;
      const tower = new Tower(this.game, pointer.x, pointer.y, { range: 100, damage: 50, cooldown: 500 });
      //this.insertTower(col, row);
    }
  }

  clearEverything = () => {
    // data structure for path finding
    for (var row = 0; row < this.ROWS; row++) {
      for (var col = 0; col < this.COLUMNS; col++) {
        this.map[row][col] = 0;
      }
    }
    // graphic objects
    this.towerGroup.removeAll();
    this.pathGroup.removeAll();
  }

}
