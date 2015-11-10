const EasyStar = require('easystarjs');

/*eslint new-cap: 0 */
const easystar = new EasyStar.js();

easystar.setAcceptableTiles([0]);
//easystar.enableDiagonals();
easystar.enableCornerCutting();

const COLUMNS = 12;
const ROWS = 12;

let towerGroup;
let pathGroup;
let map = [];

export default class Play extends Phaser.State {

  create() {
    this.game.input.onTap.add(this.handleTap);
    towerGroup = this.game.add.group();
    pathGroup = this.game.add.group();
    this.game.add.button(620, 300, 'tower', this.startTheFuckingPathfinding, this, 2, 1, 0);
    this.game.add.button(620, 365, 'tower', this.clearEveryFuckingThing, this, 2, 1, 0);

    this.game.stage.backgroundColor = 0x00a000;
    this.game.CELL_WIDTH = 600 / COLUMNS;
    this.game.CELL_HEIGHT = 600 / ROWS;

    for (var col = 0; col < COLUMNS; col++) {
      map.push([]);
      for (var row = 0; row < ROWS; row++) {
        map[col][row] = 0;
      }
    }
  }

  // TODO: get rid of "global" onTap handler
  handleTap = (pointer) => {
    const row = Math.floor( pointer.x / this.game.CELL_WIDTH );
    const column = Math.floor( pointer.y / this.game.CELL_HEIGHT );
    if (row > 11 ) return;
    console.log(`Row: ${row}\t Column: ${column}`);

    if(!map[row][column]) {
      map[row][column] = 1;
      this.insertTower(row, column);
    }
  }

  startTheFuckingPathfinding = () => {
    console.log('START!💩');

    easystar.setGrid(map);
    easystar.findPath(0, 0, 11, 11, (path) => {
      pathGroup.removeAll();
      if (path === null) {
        console.log('The path to the destination point was not found.');
      } else {
        for (var i = 0; i < path.length; i++) {
          this.insertPathPoint(path[i].y, path[i].x);
        }
      }
    });

    easystar.calculate();
  }

  clearEveryFuckingThing = () => {
      // data structure for path finding
      for (var i = 0; i < COLUMNS; i++) {
        for (var j = 0; j < ROWS; j++) {
          map[i][j] = 0;
        }
      }
      // graphic objects
      towerGroup.removeAll();
      pathGroup.removeAll();
  }

  insertTower = (row, col) => {
    let tower = towerGroup.create(row * this.game.CELL_WIDTH, col * this.game.CELL_HEIGHT, 'tower');
    tower.inputEnabled = true;
    tower.events.onInputUp.add(this.handleTowerTap, this);
    towerGroup.children[towerGroup.length - 1].width = this.game.CELL_WIDTH - 3;
    towerGroup.children[towerGroup.length - 1].height = this.game.CELL_HEIGHT - 3;
  }

  handleTowerTap = (tower) => {
    const row = Math.floor( tower.x / this.game.CELL_WIDTH );
    const column = Math.floor( tower.y / this.game.CELL_HEIGHT );
    tower.destroy();
    map[row][column] = 0;
  }

  // helper method, only used to show path while debugging
  insertPathPoint = (row, col) => {
    const offset = this.game.CELL_WIDTH / 2 - (this.game.CELL_WIDTH - 40) / 2;
    pathGroup.create(row * this.game.CELL_WIDTH + offset, col * this.game.CELL_HEIGHT + offset, 'tower');
    pathGroup.children[pathGroup.length - 1].width = this.game.CELL_WIDTH - 40;
    pathGroup.children[pathGroup.length - 1].height = this.game.CELL_HEIGHT - 40;
  }

}
