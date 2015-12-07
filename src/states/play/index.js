import init from './init';
import preload from './preload';
import create from './create';
import render from './render';
import { startPathfinding, insertPathPoint } from './path';
import { insertTower, handleTowerTap } from './tower';
import { cellsToPixels, pixelsToCells } from './util';

export default class Play extends Phaser.State {

  constructor() {
    super();
    this.init = init;
    this.preload = preload;
    this.create = create;
    this.render = render;
    this.startPathfinding = startPathfinding;
    this.insertPathPoint = insertPathPoint;
    this.insertTower = insertTower;
    this.handleTowerTap = handleTowerTap;
    this.cellsToPixels = cellsToPixels;
    this.pixelsToCells = pixelsToCells;
  }

  // TODO: get rid of "global" onTap handler
  handleTap = (pointer) => {
    const [col, row] = this.pixelsToCells(pointer.x, pointer.y);
    if (col > 11 ) return;
    console.log(`Column: ${col}\t Row: ${row}`);

    if (!this.map[row][col]) {
      this.map[row][col] = 1;
      this.insertTower(col, row);
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
