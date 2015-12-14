export default function() {
  this.beholder.animations.play('walk');
  this.game.physics.arcade.enable([ this.beholder ], Phaser.Physics.ARCADE);

  this.game.input.onTap.add(this.handleTap);
  this.towerGroup = this.game.add.group();
  this.pathGroup = this.game.add.group();
  this.game.add.button(620, 300, 'tower', this.startPathfinding, this, 2, 1, 0);
  this.game.add.button(620, 365, 'tower', this.clearEverything, this, 2, 1, 0);

  //this.game.stage.backgroundColor = 0x00a000;

  this.bullets = this.game.add.group();
  this.bullets.enableBody = true;
  this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
  this.bullets.createMultiple(30, 'britneysprites', 'axe');
  this.bullets.setAll('outOfBoundsKill', true);
  this.bullets.setAll('checkWorldBounds', true);

  //this.game.time.events.loop(Phaser.Timer.SECOND * 3, () => {
    //this.towerGroup.forEach((tower) => {
      //this.fire(tower);
    //});
  //}, this);
}
