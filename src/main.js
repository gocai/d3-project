
class LoadingScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    init(){

    }
    preload(){
        this.load.image("menubg", "./assets/Backgrounds/PNGS/Condesed/Starry background  - Layer 01 - Void.png");
        this.load.image("levelbg", "/assets/Backgrounds/PNGs/Condesed/Starry background  - Layer 02 - Stars.png");
        this.load.image("playbutton", "assets/PlayBtn.png");
        this.load.image("titlecard", "./assets/title.png");
        this.load.image("spaceship", "./assets/ship.png");
        this.load.image("enemycount", "./assets/enemies.png");
        this.load.image("firstlevel", "./assets/level1.png");
        this.load.image("secondlevel", "./assets/level 2.png");
        this.load.image("thirdlevel", "./assets/level 3.png");
        this.load.image("playicon", "./assets/PlayIconClick.png");
        this.load.image("asteroid", "./assets/assteroid.png");
       this.load.image("scoreboard", "./assets/score.png");
       this.load.image("exit","./assets/ExitIcon.png");
      

       this.load.spritesheet("engine","assets/engine.png",{
        frameWidth:48,
        frameHeight:48
    });
    this.load.spritesheet("bombs","assets/bomb.png",{
        frameWidth:16,
        frameHeight:16
    });

    }
    create(){
        this.scene.start(CST.SCENES.MENU);
    }
}
class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
        
    }
    init(){

    }
    preload(){

    }
    create(){
        this.background = this.add.image(0,300,"menubg") .setOrigin(.5, .5).setScale(2);
        
        this.playbutt = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, "playbutton").setDepth(1).setScale(.25).setInteractive();
        this.add.sprite(this.game.renderer.width / 2, 200, "titlecard").setDepth(1);
        this.playbutt.on("pointerover",()=>{
                console.log("went over");
        })
        this.playbutt.on("pointerdown",()=>{
                this.scene.start(CST.SCENES.START1);
        })

    }
}
class Start1Scene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.START1
        })
    }
    create(){
        this.background1 = this.add.image(0,300,"menubg") .setOrigin(.5, .5).setScale(2);
        this.add.image(this.game.renderer.width / 2, 200 -100, "firstlevel").setDepth(1);
        this.add.image((this.game.renderer.width / 2) - 50, 400 - 100, "enemycount").setDepth(1);
        this.add.text((this.game.renderer.width / 2) + 150, 355 - 100, " : 1").setDepth(1).setScale(5);
        this.play1 = this.add.sprite(this.game.renderer.width / 2, 500, "playicon").setScale(.3).setInteractive();
        this.play1.on("pointerdown",()=>{
            this.scene.start(CST.SCENES.PLAY1);
    })
    }
}



class Play1Scene extends Phaser.Scene{
    
    constructor(){
        super({
            key: CST.SCENES.PLAY1
        })
        
    }
    create(){
        this.anims.create({
            key:"red",
            frames:this.anims.generateFrameNumbers("bombs",{
                start:0,
                end:3
            }),
            frameRate:10,
            repeat:-1
        });
        this.anims.create({
            key:"engine_anim",
            frames: this.anims.generateFrameNumbers("engine"),
            frameRate:20,
            repeat:-1
        });
        const bullets = this.physics.add.group();
        function shootBullet(x, y, velocityX, velocityY) {
            // Get a bullet from the bullet group
            const bullet = bullets.get(x, y, 'bombs');
            
            // Set the velocity of the bullet
            bullet.setVelocity(velocityX, velocityY);
          
            bullet.play("red");
            // Destroy the bullet when it goes out of bounds
            bullet.on('outOfBounds', function() {
              bullet.destroy();
            });
            }
        


        this.add.image(0,300,"menubg") .setOrigin(.5, .5).setScale(2);
        this.add.image(0,300,"levelbg").setOrigin(.5,.5).setScale(1.65);
        this.player = this.physics.add.sprite(400,450,"spaceship").setScale(1.5);
        this.enemies = this.physics.add.sprite(200,200,"asteroid");
        this.rocket = this.add.sprite(this.player.x,this.player.y - 1,"engine");
        this.player.setCollideWorldBounds(true);
        this.rocket.play("engine_anim");
        this.input.on('pointerdown',()=>{
            shootBullet(this.player.x,this.player.y,0,-400);
        
        });
        this.physics.add.collider(bullets, this.enemies, collisionHandler, null, this);
        function collisionHandler(object1, object2) {
            object1.destroy();
            object2.destroy();
            this.play2 = this.add.sprite(700,400, "playicon").setScale(.3).setInteractive();
            this.play2.on("pointerdown",()=>{
                this.scene.start(CST.SCENES.END1);
        })
        }
        
        
        
        this.keyboard = this.input.keyboard.addKeys("W,A,S,D,F");
    }
    
    
    
    update(time,delta){
        if(this.keyboard.D.isDown == true){
        this.player.x = this.player.x + 264 * (delta / 1000);
        this.rocket.x = this.player.x;
        }
        if(this.keyboard.A.isDown == true){
            this.player.x = this.player.x + -264 * (delta / 1000);
            this.rocket.x = this.player.x;
         }
        if(this.keyboard.W.isDown == true){
            this.player.y = this.player.y + -264 * (delta / 1000);
            this.rocket.y = this.player.y;
        }
        if(this.keyboard.S.isDown == true){
            this.player.y = this.player.y + 264 * (delta / 1000);
            this.rocket.y = this.player.y;
        }
        
}


}

class End1Scene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.END1
        })
    }
    create(){
        this.background1 = this.add.image(0,300,"menubg") .setOrigin(.5, .5).setScale(2);
        this.add.image(this.game.renderer.width / 2, 200 -100, "scoreboard").setDepth(1);
        this.add.text((this.game.renderer.width / 2) - 70, 200 , '100').setScale(3);
        this.play1 = this.add.sprite(this.game.renderer.width / 2, 500, "playicon").setScale(.3).setInteractive();
        this.play1.on("pointerdown",()=>{
            this.scene.start(CST.SCENES.START2);

    })
}
}

class Start2Scene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.START2
        })
    }
    create(){
        this.background1 = this.add.image(0,300,"menubg") .setOrigin(.5, .5).setScale(2);
        this.add.image(this.game.renderer.width / 2, 200 -100, "secondlevel").setDepth(1);
        this.add.image((this.game.renderer.width / 2) - 50, 400 - 100, "enemycount").setDepth(1);
        this.add.text((this.game.renderer.width / 2) + 150, 355 - 100, " : 1").setDepth(1).setScale(5);
        this.play1 = this.add.sprite(this.game.renderer.width / 2, 500, "playicon").setScale(.3).setInteractive();
        this.play1.on("pointerdown",()=>{
            this.scene.start(CST.SCENES.PLAY2);
    })
    }
}

class Play2Scene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.PLAY2
        })
        
    }
    create(){
        this.anims.create({
            key:"red",
            frames:this.anims.generateFrameNumbers("bombs",{
                start:0,
                end:3
            }),
            frameRate:10,
            repeat:-1
        });
        this.anims.create({
            key:"engine_anim",
            frames: this.anims.generateFrameNumbers("engine"),
            frameRate:20,
            repeat:-1
        });
        const bullets = this.physics.add.group();
        function shootBullet(x, y, velocityX, velocityY) {
            // Get a bullet from the bullet group
            const bullet = bullets.get(x, y, 'bombs');
            
            // Set the velocity of the bullet
            bullet.setVelocity(velocityX, velocityY);
          
            bullet.play("red");
            // Destroy the bullet when it goes out of bounds
            bullet.on('outOfBounds', function() {
              bullet.destroy();
            });
            }
        
        
        
        this.add.image(0,300,"menubg") .setOrigin(.5, .5).setScale(2);
        this.add.image(0,300,"levelbg").setOrigin(.5,.5).setScale(1.65);
        this.player = this.physics.add.sprite(400,450,"spaceship").setScale(1.5);
        this.enemy = this.physics.add.sprite(200,200,"asteroid").setVelocityX(300);
        this.rocket = this.add.sprite(this.player.x,this.player.y - 1,"engine");
        this.player.setCollideWorldBounds(true);
        this.enemy.setCollideWorldBounds(true);
        this.enemy.setBounce(1);
        this.rocket.play("engine_anim");
        this.input.on('pointerdown',()=>{
            shootBullet(this.player.x,this.player.y,0,-400);
        
        });
        this.physics.add.collider(bullets, this.enemy, collisionHandler, null, this);
        function collisionHandler(object1, object2) {
            object1.destroy();
            object2.destroy();
            this.play2 = this.add.sprite(700,400, "playicon").setScale(.3).setInteractive();
            this.play2.on("pointerdown",()=>{
                this.scene.start(CST.SCENES.END2);
        })
        }
        
        
        
        this.keyboard = this.input.keyboard.addKeys("W,A,S,D,F");
    }
    
    
    
    update(time,delta){
        if(this.keyboard.D.isDown == true){
            this.player.x = this.player.x + 264 * (delta / 1000);
            this.rocket.x = this.player.x;
            }
            if(this.keyboard.A.isDown == true){
                this.player.x = this.player.x + -264 * (delta / 1000);
                this.rocket.x = this.player.x;
             }
            if(this.keyboard.W.isDown == true){
                this.player.y = this.player.y + -264 * (delta / 1000);
                this.rocket.y = this.player.y;
            }
            if(this.keyboard.S.isDown == true){
                this.player.y = this.player.y + 264 * (delta / 1000);
                this.rocket.y = this.player.y;
            }
        
}
}

class End2Scene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.END2
        })
    }
    create(){
        this.background1 = this.add.image(0,300,"menubg") .setOrigin(.5, .5).setScale(2);
        this.add.image(this.game.renderer.width / 2, 200 -100, "scoreboard").setDepth(1);
        this.add.text((this.game.renderer.width / 2) - 70, 200 , '200').setScale(3);
        this.play1 = this.add.sprite(this.game.renderer.width / 2, 500, "playicon").setScale(.3).setInteractive();
        this.play1.on("pointerdown",()=>{
            this.scene.start(CST.SCENES.START3);

    })
}
}

class Start3Scene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.START3
        })
    }
    create(){
        this.background1 = this.add.image(0,300,"menubg") .setOrigin(.5, .5).setScale(2);
        this.add.image(this.game.renderer.width / 2, 200 -100, "thirdlevel").setDepth(1);
        this.add.image((this.game.renderer.width / 2) - 50, 400 - 100, "enemycount").setDepth(1);
        this.add.text((this.game.renderer.width / 2) + 150, 355 - 100, " : 1").setDepth(1).setScale(5);
        this.play1 = this.add.sprite(this.game.renderer.width / 2, 500, "playicon").setScale(.3).setInteractive();
        this.play1.on("pointerdown",()=>{
            this.scene.start(CST.SCENES.PLAY3);
    })
    }
}

class Play3Scene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.PLAY3
        })
        
    }
    create(){
        this.anims.create({
            key:"red",
            frames:this.anims.generateFrameNumbers("bombs",{
                start:0,
                end:3
            }),
            frameRate:10,
            repeat:-1
        });
        this.anims.create({
            key:"engine_anim",
            frames: this.anims.generateFrameNumbers("engine"),
            frameRate:20,
            repeat:-1
        });
        const bullets = this.physics.add.group();
        function shootBullet(x, y, velocityX, velocityY) {
            // Get a bullet from the bullet group
            const bullet = bullets.get(x, y, 'bombs');
            
            // Set the velocity of the bullet
            bullet.setVelocity(velocityX, velocityY);
          
            bullet.play("red");
            // Destroy the bullet when it goes out of bounds
            bullet.on('outOfBounds', function() {
              bullet.destroy();
            });
            }
        
        
        
        this.add.image(0,300,"menubg") .setOrigin(.5, .5).setScale(2);
        this.add.image(0,300,"levelbg").setOrigin(.5,.5).setScale(1.65);
        this.player = this.physics.add.sprite(400,450,"spaceship").setScale(1.5);
        this.enemy = this.physics.add.sprite(200,200,"asteroid").setScale(2).setVelocityX(600)
        .setCollideWorldBounds(true)
        .setBounce(1, 0)
        .setVelocityY(100);
        this.rocket = this.add.sprite(this.player.x,this.player.y - 1,"engine");
        this.player.setCollideWorldBounds(true);
        this.enemy.setCollideWorldBounds(true);
        this.enemy.setBounce(1);
        this.rocket.play("engine_anim");
        
        this.input.on('pointerdown',()=>{
            shootBullet(this.player.x,this.player.y,0,-400);
        
        });
        this.physics.add.collider(bullets, this.enemy, collisionHandler, null, this);
        function collisionHandler(object1, object2) {
            object1.destroy();
            object2.destroy();
            this.play2 = this.add.sprite(700,400, "playicon").setScale(.3).setInteractive();
            this.play2.on("pointerdown",()=>{
                this.scene.start(CST.SCENES.END3);
        })
        }
        this.physics.add.collider(this.player,this.enemy,death,null,this);
        function death(object3,object4){
            object3.destroy();
            object4.destroy();
            this.play8 = this.add.sprite(100,400, "exit").setScale(.3).setInteractive();
            this.play8.on("pointerdown",()=>{
                this.scene.start(CST.SCENES.START3);
            })
        }
        
        
        
        
        this.keyboard = this.input.keyboard.addKeys("W,A,S,D,F");
    }
    
    
    
    update(time,delta){
        if(this.keyboard.D.isDown == true){
            this.player.x = this.player.x + 264 * (delta / 1000);
            this.rocket.x = this.player.x;
            }
            if(this.keyboard.A.isDown == true){
                this.player.x = this.player.x + -264 * (delta / 1000);
                this.rocket.x = this.player.x;
             }
            if(this.keyboard.W.isDown == true){
                this.player.y = this.player.y + -264 * (delta / 1000);
                this.rocket.y = this.player.y;
            }
            if(this.keyboard.S.isDown == true){
                this.player.y = this.player.y + 264 * (delta / 1000);
                this.rocket.y = this.player.y;
            }
        
}
}

class End3Scene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.END3
        })
    }
    create(){
        this.background1 = this.add.image(0,300,"menubg") .setOrigin(.5, .5).setScale(2);
        this.add.image(this.game.renderer.width / 2, 200 -100, "scoreboard").setDepth(1);
        this.add.text((this.game.renderer.width / 2) - 70, 200 , '1000').setScale(3);
        this.add.text((this.game.renderer.width / 2) - 170, 500 , 'Thanks for Playing!').setScale(3);

    }
}



let game = new Phaser.Game({
    width: 800,
    height:600,
    scene:[
        LoadingScene,MenuScene, Start1Scene, Play1Scene,End1Scene,Start2Scene,Play2Scene,End2Scene, Start3Scene,Play3Scene,End3Scene
    ],
    physics: {
        default: 'arcade', 
        arcade: {
            debug: false,
        }
    }
});
