class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' });
    }

    preload() {
        this.load.image('endScreen', './Assets/End-scene.webp');
    }

    create() {
        const background = this.add.image(0, 0, 'endScreen');
        background.setOrigin(0);
        background.setScale(0.5);

        this.input.on('pointerup', () => {
            score = 0;
            timeLeft = 30;
            isPaused = false;

            this.scene.start('GameScene');
            this.scene.stop('EndScene');
        });

        this.add.text(163, 470, `Your score is ${score}.`).setColor('#553a1f');
    }
}
