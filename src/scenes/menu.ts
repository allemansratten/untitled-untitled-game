import "phaser"

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MenuScene"
        });
    }

    preload() {
        this.load.image('background_menu', 'assets/background_menu.png');
    }

    create() {
        // mock text to force font loading
        this.add.text(-100, 0, "x", { fontFamily: 'Kalam' })

        let background = this.add.image(0, 0, 'background_menu')
        background.setOrigin(0, 0)
        background.setInteractive({ useHandCursor: true })
        background.on('pointerup', () => { 
            background.off('pointerup')
            this.add.tween({
                targets: background,
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    this.game.scene.start('IntroScene')
                }
            })
        })
    }
}