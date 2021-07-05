class Player {
  constructor({x, y, score, id}) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
  }

  movePlayer(dir, speed) {
    if(dir == 'up'){
      this.y += 1 * speed
    }else if(dir == 'down'){
      this.y += -1 * speed
    }else if(dir == 'left'){
      this.x += -1*speed
    }else if(dir == 'right'){
      this.x += 1*speed
    }
  }

  collision(item) {
    let dx = this.x - item.x;
    let dy = this.y - item.y;
    let dis = Math.sqrt(dx * dx + dy * dy);
    return dis <= 10
  }

  calculateRank(arr) {
    let rank = 1
    for (var i = 0; i < arr.length - 1; i++){
      if(arr[i].score > this.score){
      rank += 1;
      }
    }
    return `Rank: ${rank}/${arr.length}`
  }
}

export default Player;
