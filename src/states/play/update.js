export default function() {
  this.game.physics.arcade.overlap(this.bullets, this.beholder, this.bulletHitsBeholder, null, this);
  //this.towerGroup.forEach((tower) => {
    //this.fire(tower);
  //});
}
