export default class Boot extends Phaser.State {

  preload() {
    this.game.load.image('tower', '../assets/tower.png');
  }

  create() {
    this.game.state.start('play');
  }

}
