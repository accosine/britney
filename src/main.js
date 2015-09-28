'use strict';

window.onload = function() {

  const game = new Phaser.Game(650, 600, Phaser.AUTO, '', { preload: preload, create: create });
  const easystar = new EasyStar.js();

  easystar.setAcceptableTiles([0]);
  //easystar.enableDiagonals();
  easystar.enableCornerCutting();

  const COLUMNS = 12;
  const ROWS = 12;

  let towerGroup;
  let pathGroup;
  let button;
  let map = [];

  for (var col = 0; col < COLUMNS; col++) {
    map.push([]);
    for (var row = 0; row < ROWS; row++) {
      map[col][row] = 0;
    }
  }

  function preload() {
    game.load.image('tower', '../assets/tower.png');
  }

  function create() {
    this.game.input.onTap.add(handleTap);
    towerGroup = game.add.group();
    pathGroup = game.add.group();
    button = game.add.button(620, 300, 'tower', actionOnClick, this, 2, 1, 0);

    game.stage.backgroundColor = 0x00a000;
    game.CELL_WIDTH = 600 / COLUMNS;
    game.CELL_HEIGHT = 600 / ROWS;
  }

  function actionOnClick() {
    console.log('START!💩');

    easystar.setGrid(map);
    easystar.findPath(0, 0, 11, 11, function(path) {
      console.log('Path:', path);
      if (path === null) {
        console.log('The path to the destination point was not found.');
      } else {
        for (var i = 0; i < path.length; i++) {
          console.log('P: ' + i + ', X: ' + path[i].x + ', Y: ' + path[i].y);
          insertPathPoint(path[i].y, path[i].x);
        }
      }
    });

    easystar.calculate();
  }

  function handleTap(pointer) {
    const row = Math.floor( pointer.x / game.CELL_WIDTH );
    const column = Math.floor( pointer.y / game.CELL_HEIGHT );
    if (row > 11 ) return;
    console.log(`Row: ${row}\t Column: ${column}`);

    if(map[row][column]) {
      for (var i = 0; i < COLUMNS; i++) {
        for (var j = 0; j < ROWS; j++) {
          map[i][j] = 0;
        }
      }
      towerGroup.removeAll();
    }
    else {
      map[row][column] = 1
      insertTower(row, column);
    }
  }

  function insertTower(row, col) {
    towerGroup.create(row * game.CELL_WIDTH, col * game.CELL_HEIGHT, 'tower');
    towerGroup.children[towerGroup.length - 1].width = game.CELL_WIDTH - 3;
    towerGroup.children[towerGroup.length - 1].height = game.CELL_HEIGHT - 3;
  }

  function insertPathPoint(row, col) {
    pathGroup.create(row * game.CELL_WIDTH, col * game.CELL_HEIGHT, 'tower');
    pathGroup.children[pathGroup.length - 1].width = game.CELL_WIDTH - 15;
    pathGroup.children[pathGroup.length - 1].height = game.CELL_HEIGHT - 15;
  }
};

