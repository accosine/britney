export default function() {
  this.beholder.animations.play('walk');
  this.game.physics.arcade.enable([ this.beholder ], Phaser.Physics.ARCADE);

  this.game.input.onTap.add(this.handleTap);
  this.towerGroup = this.game.add.group();
  this.pathGroup = this.game.add.group();
  this.game.add.button(620, 300, 'tower', this.startPathfinding, this, 2, 1, 0);
  this.game.add.button(620, 365, 'tower', this.clearEverything, this, 2, 1, 0);

  this.game.stage.backgroundColor = 0x00a000;
}
