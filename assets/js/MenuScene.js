export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }

    create() {
        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        this.add.text(centerX, centerY - 100, 'Bienvenido al Juego de Colores', {
            fontSize: '30px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY, 'Descripción del juego...', {
            fontSize: '20px',
            fill: '#fff'
        }).setOrigin(0.5);

        const startButton = this.add.text(centerX, centerY + 100, 'Iniciar Juego', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#05CD57',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            }
        }).setOrigin(0.5).setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('game');
        });
    }
}
