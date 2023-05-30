export class Scoreboard {
    constructor(scene){
        this.relatedScene = scene;
        this.score = 0;
    }

    create(){
        this.scoreText = this.relatedScene.add.text(16,16, 'PUNTOS: 0',{
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial , sans-serif',
            backgroundColor: '#000',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            },
        });
    }

    incrementPoints(points){
        this.score += points;
        this.scoreText.setText("PUNTOS : "+this.score);
    }
}