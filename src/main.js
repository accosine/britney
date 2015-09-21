window.onload = function() {

  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });
  function preload() {
    game.load.image('tower', '../assets/tower.png');
  }

  function create() {
    this.game.input.onTap.add(handleTap);

    game.stage.backgroundColor = 0x00a000;
    game.CELL_WIDTH = 800 / 16;
    game.CELL_HEIGHT = 600 / 12;
  }

  function handleTap(pointer) {
    var row = Math.floor( pointer.x / game.CELL_WIDTH );
    var column = Math.floor( pointer.y / game.CELL_HEIGHT );
    console.log(`Row: ${row}\t Column: ${column}`);
    insertTower(row, column);
  }

  function insertTower(row, col) {
    var tower = game.add.sprite(row * game.CELL_WIDTH, col * game.CELL_HEIGHT, 'tower');
    tower.width = game.CELL_WIDTH;
    tower.height = game.CELL_HEIGHT;
  }

};

