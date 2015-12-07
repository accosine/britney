export default function() {
  this.floor = this.game.add.tileSprite(0, 0, 800, 600, 'britneysprites');
  this.floor.frameName = 'floor';
  this.floor.scale.set(3, 3);

  this.beholder = this.game.add.sprite(-50, -50, 'britneysprites');
  this.beholder.scale.set(2, 2);
  this.beholder.anchor.setTo(0.5, 0.5);
  this.beholder.animations.add('walk',
    Phaser.Animation.generateFrameNames('beholder/walk/', 0, 1, '', 1), 5, true, false);
}
