export default class Boot extends Phaser.State {

  preload() {
    this.game.load.atlasJSONHash('rbeholder', '../assets/britneysprites.png', '../assets/britneysprites.json');
    this.game.load.image('tower', '../assets/tower.png');
  }

  create() {
    this.game.state.start('play');
  }

}
