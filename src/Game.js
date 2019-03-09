Game = function(){
  this.frames = [];
}

Game.prototype.startFrame = function(frame = new Frame()){
  this.frames.push(frame);
  this.currentFrame = frame;

}

Game.prototype.roll = function(pins){
  if (!this.currentFrame){
      this.startFrame();
  }
  else if (this.currentFrame.rolls.length === this.currentFrame.MAXROLLS) {
    this.startFrame();
  }
  this.currentFrame.storeRoll(pins);
}

Game.prototype.score = function(){
  var i;
  var score = 0;
  for (i=0; i< this.frames.length; i++){
    if (this.frames[i].STRIKE) {
      for (k = 0; k<2; k++){
        score += this.frames[i+1].rolls[k];
      }
    }
    var j;
    for (j=0; j< this.frames[i].rolls.length; j++) {
      score += this.frames[i].rolls[j];
    }
  }
  return score;
}
