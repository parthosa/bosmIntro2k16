/*---------------GAME------------------*/
var over;
var game = new Phaser.Game(window.innerWidth, 450, Phaser.AUTO, 'game', {
    preload: preload,
    create: create,
    update: update
});


// setInterval(function () {
//     console.clear();
// },500);


function preload() {

    game.load.image('ground', 'img/ground.svg');
    game.load.image('shuttleMountain', 'img/shuttle_mountain.png');

    game.load.image('coconutBuilding', 'img/coconut_building.svg');
    game.load.image('bottleBuilding', 'img/bottle_building.svg');
    game.load.image('mineralBuilding', 'img/mineral_building2.svg');
    game.load.image('tree1', 'img/tree1.svg');
    game.load.image('tree2', 'img/tree2.svg');
    game.load.image('mushroom', 'img/mushroom.svg');
    game.load.image('clouds', 'img/clouds.svg');
    game.load.image('waterBuilding', 'img/water_building.svg');
    game.load.image('trollFace', 'img/shinchan2.png');

    game.load.image('hurdleImg', 'img/hurdle.svg');
    // game.load.spritesheet('dude', 'assets/dude.png', 32, 48);*/
    game.load.spritesheet('dude', 'img/imgseq.png', 174, 304);

}

var platforms;
var graphics, groundELem1,groundELem2,groundELem3,groundELem4, graphics1, graphics2;
var cursors;
var player;
var man;
var ground;
var hudrles;
var score = 0;
var scoreText;
var hurdle;
var shuttleMountain, waterBuilding, coconutBuilding, bottleBuilding, mineralBuilding, clouds;
var tree2, tree1, mushroom;
var gameStart = false,
    gameReset = false;
var flag=1;
// var hurdlecreate=false;

function create() {


    game.stage.backgroundColor = '#8ECDD2';
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    // game.add.sprite(0, 0, 'sky');


    graphics2 = game.add.group();
    graphics2.enableBody = true;


    graphics1 = game.add.group();
    graphics1.enableBody = true;


    if (window.innerWidth > 940) {

        waterBuilding = graphics2.create(300, 80, 'waterBuilding');
        waterBuilding.scale.setTo(0.5, 0.5);
    }


    mineralBuilding = graphics2.create(1000, 125, 'mineralBuilding');
    mineralBuilding.scale.setTo(0.65, 0.65);
    if (window.innerWidth > 560) {
        shuttleMountain = graphics1.create(80, 160, 'shuttleMountain');
        shuttleMountain.scale.setTo(0.1, 0.1);
    }
    coconutBuilding = graphics1.create(550, 120, 'coconutBuilding');
    coconutBuilding.scale.setTo(0.8, 0.8);
    bottleBuilding = graphics1.create(800, 22, 'bottleBuilding');
    bottleBuilding.scale.setTo(0.65, 0.65);




    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    50
    // Here we create the ground.

    // waterBuilding= game.add.sprite()
    ground = platforms.create(-40, game.world.height - 230, 'ground');


    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(1.2, 0.7);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    groundELem1 = game.add.group();
    groundELem2 = game.add.group();
    groundELem3 = game.add.group();
    groundELem4 = game.add.group();
    groundELem1.enableBody = true;
    groundELem2.enableBody = true;
    groundELem3.enableBody = true;
    groundELem4.enableBody = true;
    clouds = groundELem4.create(0, 10, 'clouds');
    clouds.scale.setTo(0.6, 0.6);
    clouds.enableBody = true;


    tree1 = groundELem1.create(750, game.world.height - 240, 'tree1');
    tree1.scale.setTo(0.4, 0.4);
    tree1.enableBody = true;
    tree2 = groundELem2.create(220, game.world.height - 210, 'tree2');
    tree2.scale.setTo(0.27, 0.27);
    tree2.enableBody = true;
    mushroom = groundELem3.create(150, game.world.height - 170, 'mushroom');
    mushroom.scale.setTo(0.4, 0.4);
    mushroom.enableBody = true;
    



    hurdles = game.add.group();
    hurdles.enableBody = true;

    // hurdle = hurdles.create(game.world.width, game.world.height - 130, 'hurdleImg');

    // hurdle.body.collideWorldBounds=true;

    if (window.innerWidth < 400) {
        hurdle = hurdles.create(game.world.width, game.world.height - 85, 'hurdleImg');

        hurdle.scale.setTo(0.6, 0.6);
    } else {
        hurdle = hurdles.create(game.world.width, game.world.height - 130, 'hurdleImg');
    }
    hurdle.enableBody = true;
   
    setInterval(function() {
        clouds = groundELem4.create(0 - game.world.randomX, 10 * (1 + Math.random()), 'clouds');
        clouds.scale.setTo(0.6, 0.6);

        tree1 = groundELem1.create(game.world.width + game.world.randomX, game.world.height - 240, 'tree1');
        tree1.scale.setTo(0.4, 0.4);
        tree2 = groundELem2.create(game.world.width + game.world.randomX, game.world.height - 210, 'tree2');
        tree2.scale.setTo(0.27, 0.27);
        mushroom = groundELem3.create(game.world.width + game.world.randomX, game.world.height - 170, 'mushroom');
        mushroom.scale.setTo(0.4, 0.4);
    }, 8000);
    mushroom.z = 30;
    player = game.add.sprite(0.18 * window.innerWidth, 150, 'dude');
    if (window.innerWidth < 400) {

        player.scale.setTo(0.4, 0.4);
    } else
        player.scale.setTo(0.6, 0.6);
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;

    player.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
    // player.animations.play('walk');

    if (window.innerWidth < 575)
        scoreText = game.add.text(50, 220, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff'
        });
    else
        scoreText = game.add.text(100, 125, 'Score: 0', {
            font: '22px League-Spartan',
            fill: '#fff'
        });
    // scoreText.body.collideWorldBounds=true;

    //  Our controls.

    cursors = game.input.keyboard.createCursorKeys();
    if (!gameReset) {
        label2 = game.add.text(window.innerWidth / 2, game.world.height-100, 'Press SPACE or\n CLICK on screen\nUse arrow keys to move', {
            font: '18px League-Spartan',
            fill: '#fff',
            align: 'center'
        });
        label2.stroke = '#000000';
    label2.strokeThickness = 3;
    // label2.fill = '#43d637';
        label2.anchor.setTo(0.5, 0.5);
    }

}
var u = 0,
    s;

function update() {
   

        // console.log('hi');
    player.body.velocity.x = 0;
    if (cursors.space.isDown || game.input.activePointer.isDown) {
        gameStart = true;
        // hurdlecreate=true;
        hurdlecreate();
        label2.destroy();
    }

    for (i = 0; i < hurdles.children.length - 1; i++)
        if (Math.abs(hurdles.children[i].x - hurdles.children[i + 1].x) < 300)
            hurdles.children[i+1].destroy();

    for (i = 0; i < groundELem1.children.length - 1; i++)
      
        if (Math.abs(groundELem1.children[i].x - groundELem1.children[i + 1].x) < 300)
            groundELem1.children[i+1].destroy();
    


    for (i = 0; i < groundELem2.children.length - 1; i++)
        if (Math.abs(groundELem2.children[i].x - groundELem2.children[i + 1].x) < 300)
            groundELem2.children[i+1].destroy();

     for (i = 0; i < groundELem3.children.length - 1; i++)
        if (Math.abs(groundELem3.children[i].x - groundELem3.children[i + 1].x) < 300)
            groundELem3.children[i+1].destroy();

    
    // console.log(gameStart);
    if (gameStart) {
        
        u++;
        if (u % 100 == 0)
            score++;
        scoreText.text = 'Score: ' + score;
        groundELem1.children[0].body.velocity.x=-40;
        groundELem2.children[0].body.velocity.x=-40;
        groundELem3.children[0].body.velocity.x=-40;

         if (window.innerWidth < 560)
            s = 0.5;
        else
            s = 1;

        if(tree1.alive)
        tree1.body.velocity.x = s * (-40 - (50 * Math.floor(score / 10)));

        if(tree2.alive)
        tree2.body.velocity.x = s * (-50 - (50 * Math.floor(score / 10)));
        if(mushroom.alive)
        mushroom.body.velocity.x =s * ( -70 -(50 * Math.floor(score / 10)));

       
        if(hurdle.alive)
        hurdle.body.velocity.x = -s * (350 + (80 * Math.floor(score / 10)));
        clouds.body.velocity.x = 30;

        // //  Collide the player and the stars with the platforms
        // game.physics.arcade.collide(player, scoreText);
        player.animations.play('walk');
        if (cursors.left.isDown) {
            //  Move to the left
            if (window.innerWidth < 400)
                player.body.velocity.x = -150;
            else
                player.body.velocity.x = -250;


        } else if (cursors.right.isDown && player.body.x < (0.65 * window.innerWidth)) {
            //  Move to the right
            if (window.innerWidth < 400)
                player.body.velocity.x = 250;
            else
                player.body.velocity.x = 250;


        }

        // console.log(cursors.up.isDown ,player.body.y,game.world.height);
        //  Allow the player to jump if they are touching the ground.
        if ((game.input.activePointer.isDown || game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.keyboard.isDown(Phaser.Keyboard.UP)) && player.body.y > 250) {
            if (window.innerWidth < 400)
                player.body.velocity.y = -400;
            else
                player.body.velocity.y = -700;
        }

    }

    game.physics.arcade.overlap(player, hurdles, collision, null, this);
    //  Reset the players velocity (movement)


    // game.physics.arcade.collide(player, hurdles);


    // console.log(player.body.y);
    function collision(player, hurdle) {

        hurdles.destroy();
        // console.log(game.state.start("Over"));
        // player.body.velocity.x = 0;
        // // hurdles.body.velocity.x = 0;
        // clouds.body.velocity.x = 100;

        game.state.start("Over");
        // score += 10;

    }

}
//game animation translate down up
//game reset
//game overlap
// console.log($("#game").children().children());



over = function(game) {};
over.prototype = {
    create: function() {
        
        gameReset = true;
        label = game.add.text(window.innerWidth / 2, game.world.height -160, 'Score: ' + score + '\nGAME OVER\nPress SPACE or\nCLICK to restart', {
            font: '17px League-Spartan',
            fill: '#fff',
            align: 'center'
        });
         
        label.anchor.setTo(0.5, 0.5);
        
    trollFace=game.add.sprite(window.innerWidth/2-30,game.world.height-90,'trollFace');
        trollFace.scale.setTo(0.4,0.4);
    },
    update: function() {

        score = 0;
        // if (cursors.space.isDown || game.input.activePointer.isDown)
        if (game.input.activePointer.isDown || game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.keyboard.isDown(Phaser.Keyboard.UP))
         game.state.start('default');
    }
};
game.state.add("Over", over);

function hurdlecreate() {
    if(flag==1)
    {
       if (window.innerWidth < 400) {
        setInterval(function() {        
            hurdle = hurdles.create(game.world.width + game.world.randomX, game.world.height - 85, 'hurdleImg');
            hurdle.scale.setTo(0.6, 0.6);   
            hurdle.enableBody = true;
        // hurdle.body.collideWorldBounds=true;
        // hurdle.scale.setTo(0.2,0.2);
        }, 2500);
       } else {
        setInterval(function() {        
            hurdle = hurdles.create(game.world.width + game.world.randomX, game.world.height - 130, 'hurdleImg');
            hurdle.enableBody = true;
        // hurdle.body.collideWorldBounds=true;
        // hurdle.scale.setTo(0.2,0.2);
        }, 2000);         
       }
    }
    flag=0;
}
