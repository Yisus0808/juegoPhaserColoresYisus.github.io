import { TextColor } from "../../components/TextColor.js";
import { obtenerColoresDesordenados } from "../../components/colores.js";

export class PruebaGame extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
        this.startTime = 0;
        this.TextColor = null;
        this.coloresDesordenados = [];
        this.intentosCorrectos = 0;
        this.intentosCorrectosActual = 0;
        this.intentosIncorrectos = 0;
        this.intentosIncorrectosActual = 0;
        this.totalIntentos = 0;
        this.totalIntentosActuales = 0;
        this.nivel=0;
        this.gameOver = false;
        this.currentIndex = 0;
        this.restartButton = null;
        this.arrayRonda = []; // Array genérico para almacenar información de las rondas
        this.arrayTotalNivel = []; //Array genérico para almacenar información de los niveles
        this.tiempoInicioRonda = 0;
        this.tiempoRonda = 0;
        this.tiempoInicioNivel = 0;
        this.tiempoNivel = 0;
    }

    init() {
        this.TextColor = new TextColor(this);
    }

    preload() {
        this.load.image('background', './assets/img/background.png');
        this.load.image('gameover', './assets/img/gameover.png');
        this.load.image('correcto', './assets/img/correcto.png');
        this.load.image('incorrecto', './assets/img/incorrecto.png');
    }

    create() {
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.add.image(410, 250, 'background');
        this.gameoverImage = this.add.image(400, 90, 'gameover');
        this.gameoverImage.visible = false;

        // Obtener colores desordenados
        this.coloresDesordenados = obtenerColoresDesordenados();

        // Crear el texto con el primer color
        this.TextColor.create(this.coloresDesordenados[0]);

        this.cursors = this.input.keyboard.createCursorKeys();

        // Puntaje
        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;
        this.correctoImage = this.add.image(centerX, centerY - 100, 'correcto').setOrigin(0.5).setVisible(false);
        this.incorrectoImage = this.add.image(centerX, centerY - 100, 'incorrecto').setOrigin(0.5).setVisible(false);
        this.scoreText = this.add.text(centerX, centerY, `Puntos\n\nCorrectos: ${this.intentosCorrectosActual}\nIncorrectos: ${this.intentosIncorrectosActual}`, {
            fontSize: '30px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif',
            backgroundColor: '#000',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            }
        }).setOrigin(0.5);

        this.scoreText.visible = false;

        // Botón correcto
        this.correctoBtn = this.add.text(200, 400, 'Correcto', {
            fontSize: '20px',
            fill: '#05CD57',
            fontFamily: 'verdana, arial, sans-serif',
            backgroundColor: '#fff',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            },
        }).setOrigin(0.5);
        this.correctoBtn.setInteractive();
        this.correctoBtn.on('pointerdown', () => {
            if (this.gameOver) return;

            this.totalIntentosActuales++;
            this.totalIntentos++;

            if (this.coloresDesordenados[this.currentIndex].correcto) {
                this.showCorrecto();
                this.intentosCorrectos++;
                this.intentosCorrectosActual++;
            } else {
                this.showIncorrecto();
                this.intentosIncorrectos++;
                this.intentosIncorrectosActual++;
            }

            
        });

        // Botón de incorrecto
        this.incorrectoBtn = this.add.text(600, 400, 'Incorrecto', {
            fontSize: '20px',
            fill: '#ad2121',
            fontFamily: 'verdana, arial, sans-serif',
            backgroundColor: '#fff',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            },
        }).setOrigin(0.5);
        this.incorrectoBtn.setInteractive();
        this.incorrectoBtn.on('pointerdown', () => {
            if (this.gameOver) return;

            this.totalIntentosActuales++;
            this.totalIntentos++;

            if (!this.coloresDesordenados[this.currentIndex].correcto) {
                this.showCorrecto();
                this.intentosCorrectos++;
                this.intentosCorrectosActual++;
            } else {
                this.showIncorrecto();
                this.intentosIncorrectos++;
                this.intentosIncorrectosActual++;
            }

        });

        const centerXReinicio = this.sys.game.config.width / 2;
        const centerYReinicio = this.sys.game.config.height / 2 + 150;
        this.restartButton = this.add.text(centerXReinicio, centerYReinicio, 'Reiniciar', {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif',
            backgroundColor: '#000',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            }
        }).setOrigin(0.5);
        this.restartButton.setInteractive();
        this.restartButton.on('pointerdown', () => {
            this.restartGame();
            this.scoreText.visible = false;
            this.tiempoInicioRonda = new Date().getTime(); // Iniciar el contador de tiempo de la primera ronda

        });

        this.resetGame();
        this.tiempoInicioRonda = new Date().getTime(); // Iniciar el contador de tiempo de la primera ronda
        
        this.verArrayTotalNivelButton = this.add.text(10, 10, 'Ver Array Total Nivel', { fill: '#ffffff' })
        .setInteractive()
        .on('pointerdown', this.verArrayTotalNivel, this);
    }
    verArrayTotalNivel() {
        // Convertir el array en formato JSON
        const json = JSON.stringify(this.arrayTotalNivel, null, 3);
    
        // Abrir una nueva ventana con el contenido JSON
        const nuevaVentana = window.open("", "_blank");
        nuevaVentana.document.write("<pre>" + json + "</pre>");
      }
    resetGame() {
        // Reinicia las variables del juego
        this.tiempoInicioNivel = new Date().getTime(); // Iniciar el contador de tiempo del primer nivel
        this.tiempoInicioRonda = new Date().getTime(); // Iniciar el contador de tiempo de la primera ronda
        this.tiempoNivel = 0;
        this.tiempoRonda = 0;        this.intentosCorrectosActual = 0;
        this.intentosIncorrectosActual = 0;
        this.totalIntentosActuales = 0;
        this.gameOver = false;
        this.gameoverImage.visible = false;
        this.currentIndex = 0;
        this.hideRestartButton();
        this.nivel++
        this.arrayRonda = [];

        console.log(this.currentIndex);
        console.log(`Color: ${this.coloresDesordenados[this.currentIndex].color}, Nombre: ${this.coloresDesordenados[this.currentIndex].nombre}, Correcto: ${this.coloresDesordenados[this.currentIndex].correcto}`);
        console.log(this.coloresDesordenados);
    }

    showGameOver() {
       // Muestra la pantalla de fin de juego
        this.gameOver = true;
        this.gameoverImage.visible = true;
        this.TextColor.hideText();
        this.scoreText.visible = true;
        this.scoreText.setText(`Puntos\n\nCorrectos: ${this.intentosCorrectosActual}\nIncorrectos: ${this.intentosIncorrectosActual}`);

        //this.TextColor.updateColor(this.coloresDesordenados[0]);
        this.restartButton.visible = true;
        // if (this.currentIndex === this.coloresDesordenados.length - 1) {
        //     this.showScoreAfterDelay();
        // }
    }

    hideRestartButton() {
        // Oculta el botón de reinicio
        if (this.restartButton) {
            this.restartButton.setVisible(false);
        }
    }

    restartGame() {
        // Reinicia el juego
        //guardar los datos
        const generarNombre = (() => {
            return (atributos) => {
                const nombre = `nivel ${this.nivel}`;
                return {
                    nombre,
                    ...atributos,
                };
            };
          })();
        //
        const atributos = {
            "Total de intentos correctos por ronda":this.intentosCorrectosActual,
            "Total de intentos incorrectos por ronda":this.intentosIncorrectosActual,
            "Tiempo de ronda": this.tiempoNivel,
            "arrayRonda": {...this.arrayRonda},

        }
        const nivel = generarNombre(atributos);
        this.arrayTotalNivel.push(nivel)
        console.log(this.arrayTotalNivel)

        this.resetGame();
        this.TextColor.resetColors();
        this.TextColor.showText();
        this.TextColor.updateColor(this.coloresDesordenados[0]);
    }

    showCorrecto() {
        // Muestra la imagen de respuesta correcta
        this.correctoImage.setVisible(true);
        this.incorrectoImage.setVisible(false);
        this.disableButtons();
        this.tiempoRonda = Math.floor((new Date().getTime() - this.tiempoInicioRonda) / 1000); // Calcular el tiempo transcurrido en segundos

        const rondaActual = {
            color: this.coloresDesordenados[this.currentIndex].color,
            nombre: this.coloresDesordenados[this.currentIndex].nombre,
            estado: this.coloresDesordenados[this.currentIndex].correcto ? "Correcto" : "Incorrecto",
            respuesta: "Correcto",
            tiempoSegundos: this.tiempoRonda
        };
       
        this.arrayRonda[`ronda${this.totalIntentosActuales}`] = rondaActual;

        console.log(this.arrayRonda)

        this.tiempoNivel += this.tiempoRonda;
        this.tiempoInicioRonda = new Date().getTime();

        this.time.delayedCall(2000, () => {
            this.correctoImage.setVisible(false);
            this.incorrectoImage.setVisible(false);
            this.enableButtons();

            // if (this.currentIndex === this.coloresDesordenados.length - 1) {
            //     this.showScoreAfterDelay();
            // }
            if (this.currentIndex === this.coloresDesordenados.length - 1) {
                this.showGameOver();
            } else {
                this.changeColor();

            }
        });
    }

    showIncorrecto() {
        // Muestra la imagen de respuesta incorrecta
        this.correctoImage.setVisible(false);
        this.incorrectoImage.setVisible(true);
        this.disableButtons();

        this.tiempoRonda = Math.floor((new Date().getTime() - this.tiempoInicioRonda) / 1000); // Calcular el tiempo transcurrido en segundos
        const rondaActual = {
            color: this.coloresDesordenados[this.currentIndex].color,
            nombre: this.coloresDesordenados[this.currentIndex].nombre,
            estado: this.coloresDesordenados[this.currentIndex].correcto ? "Correcto" : "Incorrecto",
            respuesta: "Incorrecto",
            tiempoSegundos: this.tiempoRonda
        };
        this.arrayRonda[`ronda${this.totalIntentosActuales}`] = rondaActual;

        console.log(this.arrayRonda)

        this.tiempoNivel += this.tiempoRonda;
        this.tiempoInicioRonda = new Date().getTime();

        this.time.delayedCall(2000, () => {
            this.correctoImage.setVisible(false);
            this.incorrectoImage.setVisible(false);
            this.enableButtons();

            // if (this.currentIndex === this.coloresDesordenados.length - 1) {
            //     this.showScoreAfterDelay();
            // }
            if (this.currentIndex === this.coloresDesordenados.length - 1) {
                this.showGameOver();
            } else {
                this.changeColor();

            }
        });
    }

    disableButtons() {
        // Desactiva los botones de respuesta
        this.correctoBtn.disableInteractive();
        this.incorrectoBtn.disableInteractive();
    }

    enableButtons() {
        // Activa los botones de respuesta
        this.correctoBtn.setInteractive();
        this.incorrectoBtn.setInteractive();
    }

    showScoreAfterDelay() {
        // Muestra la pantalla de fin de juego después de un retraso
        this.time.delayedCall(3000, () => {
            this.showGameOver();
        });
        const elapsedTime = (this.time.now - this.startTime) / 1000;
        console.log(`Tiempo transcurrido: ${elapsedTime} segundos`);
    }

    changeColor () {
         // Cambia al siguiente color y actualiza el texto
        this.currentIndex = (this.currentIndex + 1) % this.coloresDesordenados.length;
        const color = this.coloresDesordenados[this.currentIndex];
        this.TextColor.updateColor(color);
        console.log(`Color: ${color.color}, Nombre: ${color.nombre}, Correcto: ${color.correcto}`);
        this.tiempoInicioNivel = new Date().getTime();

        // Guardar la información del nivel actual en el array
        // const nivelActual = {
        //     tiempoSegundos: this.tiempoNivel
        // };
        // this.arrayTotalNivel.push(nivelActual);
    }
}