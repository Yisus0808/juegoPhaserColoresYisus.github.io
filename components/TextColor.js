import { obtenerColoresDesordenados } from "./colores.js";

export class TextColor {
    constructor(scene){
        this.relatedScene = scene;
        this.score = 0;
        this.scoreText = null;
    }

    create(initialColor){
        const { width, height } = this.relatedScene.sys.game.config;
        const centerX = width / 2;
        const centerY = height / 2;

        this.scoreText = this.relatedScene.add.text(centerX, centerY, initialColor.nombre, {
            fontSize: '30px',
            fill: initialColor.color,
            fontFamily: 'verdana, arial , sans-serif',
            backgroundColor: '#f3f3ff',
            padding: {
                left: 50,
                right: 50,
                top: 10,
                bottom: 10
            }
        }).setOrigin(0.5);
    }

    incrementPoints(points, color = '#fff'){
        this.score += points;
        this.scoreText.setText("PUNTOS : "+this.score);
        this.scoreText.setFill(color);
    }

    updateColor(color){
        this.scoreText.setFill(color.color);
        this.scoreText.setText(color.nombre);
    }

    hideText() {
        this.scoreText.visible = false;
    }

    showText() {
        this.scoreText.visible = true;
    }
    resetScore() {
        this.score = 0;
        this.scoreText.setText("PUNTOS : " + this.score);
        this.scoreText.setFill('#fff');
    }

    resetColors() {
        this.relatedScene.coloresDesordenados = obtenerColoresDesordenados();
    }
    
}
