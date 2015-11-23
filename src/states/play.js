const EasyStar = require('easystarjs');

/*eslint new-cap: 0 */
const easystar = new EasyStar.js();

easystar.setAcceptableTiles([0]);
//easystar.enableDiagonals();
easystar.enableCornerCutting();

export default class Play extends Phaser.State {

  constructor() {
    super();
    this.towerGroup;
    this.pathGroup;
    this.beholder;
    this.map = [];
    this.COLUMNS = 12;
    this.ROWS = 12;
  }

  create() {
    this.beholder = this.game.add.sprite(50, 50, 'rbeholder');
    this.beholder.anchor.setTo(0.5, 0.5);
    this.beholder.animations.add('walk',
      Phaser.Animation.generateFrameNames('beholder/walk/', 0, 1, '', 1), 5, true, false);
    this.beholder.animations.play('walk');

    this.game.physics.arcade.enable([ this.beholder ], Phaser.Physics.ARCADE);

    this.game.input.onTap.add(this.handleTap);
    this.towerGroup = this.game.add.group();
    this.pathGroup = this.game.add.group();
    this.game.add.button(620, 300, 'tower', this.startTheFuckingPathfinding, this, 2, 1, 0);
    this.game.add.button(620, 365, 'tower', this.clearEveryFuckingThing, this, 2, 1, 0);

    this.game.stage.backgroundColor = 0x00a000;
    this.game.CELL_WIDTH = 600 / this.COLUMNS;
    this.game.CELL_HEIGHT = 600 / this.ROWS;

    for (var row = 0; row < this.ROWS; row++) {
      this.map.push([]);
      for (var col = 0; col < this.COLUMNS; col++) {
        this.map[row][col] = 0;
      }
    }
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

  startTheFuckingPathfinding = () => {
    console.log('START!💩');

    easystar.setGrid(this.map);
    easystar.findPath(0, 0, 11, 11, (path) => {
      let tweenPoints = { x: [], y: [] };
      const length = path.length;
      const speed = 1000;
      this.pathGroup.removeAll();
      if (path === null) {
        console.log('The path to the destination point was not found.');
      } else {
        for (var i = 0; i < path.length; i++) {
          this.insertPathPoint(path[i].x, path[i].y);
          const [x, y] = this.cellsToPixels(path[i].x, path[i].y);
          tweenPoints.x.push(x + 18);
          tweenPoints.y.push(y + 18);
        }
        this.game.add.tween(this.beholder.body).to(tweenPoints, length * speed, Phaser.Easing.Linear.None, true);
      }
    });

    easystar.calculate();
  }

  clearEveryFuckingThing = () => {
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

  insertTower = (col, row) => {
    const [x, y] = this.cellsToPixels(col, row);
    let tower = this.towerGroup.create(x, y, 'tower');
    tower.inputEnabled = true;
    tower.events.onInputUp.add(this.handleTowerTap, this);
    this.towerGroup.children[this.towerGroup.length - 1].width = this.game.CELL_WIDTH - 3;
    this.towerGroup.children[this.towerGroup.length - 1].height = this.game.CELL_HEIGHT - 3;
  }

  handleTowerTap = (tower) => {
    const [col, row] = this.pixelsToCells(tower.x, tower.y);
    tower.destroy();
    this.map[row][col] = 0;
  }

  // helper method, only used to show path while debugging
  insertPathPoint = (col, row) => {
    const offset = this.game.CELL_WIDTH / 2 - (this.game.CELL_WIDTH - 40) / 2;
    const [x, y] = this.cellsToPixels(col, row);
    this.pathGroup.create(x + offset, y + offset, 'tower');
    this.pathGroup.children[this.pathGroup.length - 1].width = this.game.CELL_WIDTH - 40;
    this.pathGroup.children[this.pathGroup.length - 1].height = this.game.CELL_HEIGHT - 40;
  }

  cellsToPixels = (col, row) => {
    return [col * this.game.CELL_WIDTH, row * this.game.CELL_HEIGHT];
  }

  pixelsToCells = (x, y) => {
    return [Math.floor(x / this.game.CELL_WIDTH),
            Math.floor(y / this.game.CELL_HEIGHT)];
  }

}
