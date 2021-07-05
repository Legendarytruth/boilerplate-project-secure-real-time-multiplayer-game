import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');


const dimension = {
  canvasWidth:640,
  canvasHeight:480,
  arenaSizeX: 640 - 2 * 10,
  arenaSizeY: 480 - 2 * 10 - 50,
  maxX: 640 - 10,
  maxY: 480 - 10,
  minX: 10,
  minY: 10 + 50

}

let keymap = {
  87: 'up',
  65: 'left',
  83: 'down',
  68: 'right',
  38: 'up',
  37: 'left',
  40: 'down',
  39: 'right'
}
let tick = null
let playerImage = new Image();
let enemyImage = new Image();
let collectImage = new Image();

let player = null;
let collect = null;
let players =[];
playerImage.src = '../images/player.png'
enemyImage.src = '../images/enemy.png'
collect.src = '../images/collect.png'
const start = ()=>{

  socket.on('start', (fplayer, fplayers, fcollect)=>{
    player = new Player(fplayer)
    collect = new Collectible(fcollect)
    players = fplayers;


    document.onkeydown = function(e){
      let dir = keymap[e.keyCode]
      if(dir){
        player.movePlayer(dir, 10);
        socket.emit('update', player);
      }
    }

    socket.on('update', (fplayer, fplayers, fcollect)=>{
      players =fplayers
      collect = new Collectible(fcollect)
      if(player){
        if (player.id === fplayer.id) {
          player= new Player(fplayer);
        }
      }
    })

  })
   window.requestAnimationFrame(update); 
}

const update = () =>{
  context.clearRect(0, 0, 640, 480);
  if (player) {
    player.draw(playerImage);
    players.forEach((fplayer)=> {
       if (fplayer.id !== player.id) {
         let ene = new Player(player);
         ene.draw(context, enemyImage);
       }
    });
    if (collect) {
      collect.draw(context,collectImage);
    }
  }

 
  tick = requestAnimationFrame(update);
}

start();