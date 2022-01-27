var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
}

var game
var platforms
var player
var cursors
;(function launch() {
  let user = Moralis.User.current()
  if (!user) {
    console.log('PLEASE LOG IN WITH METAMASK!!')
  } else {
    console.log(user.get('ethAddress') + ' ' + 'Welcome To my Game !!')
    game = new Phaser.Game(config)
  }
})()

function preload() {
  this.load.image('background', 'assets/BG/BG.png')
  this.load.image('ground1', 'assets/Tiles/1.png')
  this.load.image('ground2', 'assets/Tiles/2.png')
  this.load.image('ground3', 'assets/Tiles/3.png')
  this.load.image('dyno', 'assets/Character/idle/idle (1).png')
  this.load.image('dyno_left', 'assets/Character/idle/left.png')
}

function create() {
  this.add.image(400, 300, 'background').setScale(0.8)
  //Ground
  platforms = this.physics.add.staticGroup()
  platforms.create(50, 580, 'ground1').setScale(0.3).refreshBody()
  platforms.create(85, 580, 'ground2').setScale(0.3).refreshBody()
  platforms.create(120, 580, 'ground2').setScale(0.3).refreshBody()
  platforms.create(155, 580, 'ground2').setScale(0.3).refreshBody()
  platforms.create(190, 580, 'ground2').setScale(0.3).refreshBody()
  platforms.create(220, 580, 'ground2').setScale(0.3).refreshBody()
  platforms.create(250, 580, 'ground2').setScale(0.3).refreshBody()
  platforms.create(285, 580, 'ground2').setScale(0.3).refreshBody()
  platforms.create(320, 580, 'ground3').setScale(0.3).refreshBody()
  //Player
  player = this.physics.add
    .sprite(100, 450, 'dyno')
    .setScale(0.15)
    .refreshBody()
  player.setBounce(0.2)

  player.setCollideWorldBounds(true)
  //Collsion function
  this.physics.add.collider(player, platforms)
  //Movement function
  cursors = this.input.keyboard.createCursorKeys()
}

function update() {
  //Movement
  if (cursors.left.isDown) {
    player.setVelocityX(-160)
  } else if (cursors.right.isDown) {
    player.setVelocityX(160)
  } else {
    player.setVelocityX(0)
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330)
  }
}
