import { MenuScene } from './MenuScene.js';
import { PruebaGame } from './pruebaGame.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    scene: [MenuScene, PruebaGame],
    parent: 'gameContainer',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    }
}

var game = new Phaser.Game(config);
