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
  for (i=0; i<this.frames.length; i++){
    var aFrame = this.frames[i];
    var j;
    for (j=0; j< aFrame.rolls.length; j++) {
      var aRoll = aFrame.rolls[j];
      score += aRoll;
    }
  }
  return score;
}
