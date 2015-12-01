import states from './states';
const game = new Phaser.Game(650, 600, Phaser.AUTO, '');

game.state.add('boot', states.boot);
game.state.add('play', states.play);

game.state.start('boot');

game.antialias = false;
