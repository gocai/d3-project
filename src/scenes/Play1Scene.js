
class Play1Scene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.PLAY1
        })
    }
    create(){
        this.add.image(0,300,"menubg") .setOrigin(.5, .5).setScale(2);
        this.add.image(0,300,"levelbg").setOrigin(.5,.5).setScale(1.65);
        this.player = this.add.sprite(400,450,"spaceship").setScale(1.5);

        this.laser = this.add.sprite(500,500,"bullet");
       /* var bullets;
        var shootTime = 0;
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.setAll('anchor.x',.5);
        bullets.setAll('scale.y', .5);
        bullets.setAll('outOfBoundsKill',true);
        bullets.setAll('checkWolrdBounds',true);
        */
        
        
        this.keyboard = this.input.keyboard.addKeys("W,A,S,D");
        this.createCursor();

       
    }
    createCursor(){
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update(time,delta){
        if(this.keyboard.D.isDown == true){
        this.player.x = this.player.x + 164 * (delta / 1000);
        }
        if(this.keyboard.A.isDown == true){
            this.player.x = this.player.x + -164 * (delta / 1000);
         }
        if(this.keyboard.W.isDown == true){
            this.player.y = this.player.y + -164 * (delta / 1000);
        }
        if(this.keyboard.S.isDown == true){
            this.player.y = this.player.y + 164 * (delta / 1000);
        }
        
}

}