import EasyStar from 'easystarjs';

/*eslint new-cap: 0 */
const easystar = new EasyStar.js();
easystar.setAcceptableTiles([0]);
easystar.enableDiagonals();
easystar.disableCornerCutting();

export function startPathfinding() {
  easystar.setGrid(this.map);
  easystar.findPath(0, 0, 11, 11, (path) => {
    const tweenPoints = { x: [], y: [] };
    const length = path.length;
    const speed = 1000;
    this.pathGroup.removeAll();
    if (path === null) {
      console.log('The path to the destination point was not found.');
    }
    else {
      //for (var i = 0; i < path.length; i++) {
      for (const point of path) {
        this.insertPathPoint(point.x, point.y);
        const [x, y] = this.cellsToPixels(point.x, point.y);
        tweenPoints.x.push(x + this.CELL_WIDTH / 2);
        tweenPoints.y.push(y + this.CELL_HEIGHT / 2);
      }
      tweenPoints.x.push(this.CELL_WIDTH * this.COLUMNS + 50);
      tweenPoints.y.push(this.CELL_HEIGHT * this.ROWS + 50);
      this.game.add.tween(this.beholder).to(tweenPoints, length * speed, Phaser.Easing.Linear.None, true);
    }
  });

  easystar.calculate();
}

//helper method, only used to show path while debugging
export function insertPathPoint(col, row) {
  const offset = this.CELL_WIDTH / 2;
  const [x, y] = this.cellsToPixels(col, row);
  this.pathGroup.create(x + offset, y + offset, 'tower');
  this.pathGroup.children[this.pathGroup.length - 1].width = 3;
  this.pathGroup.children[this.pathGroup.length - 1].height = 3;
  this.pathGroup.children[this.pathGroup.length - 1].anchor.setTo(0.5, 0.5);
}
