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

Game.prototype.scoreGame = function(){
  var frameNumber;
  var gameScore = 0;
  for (frameNumber=0; frameNumber< this.frames.length; frameNumber++){
    gameScore += this.scoreFrame(frameNumber)
  }
  return gameScore;
}

Game.prototype.scoreFrame = function(frameNumber){
  var frameScore = 0;
  var j;
  for (j=0; j< this.frames[frameNumber].rolls.length; j++) {
    frameScore += this.frames[frameNumber].rolls[j];
  }

  if (this.frames[frameNumber].STRIKE && this.frames[frameNumber+1]) {
    if (this.frames[frameNumber+1].STRIKE){
      if (this.frames[frameNumber+2]){
        frameScore += (this.frames[frameNumber+1].rolls[0] + this.frames[frameNumber+2].rolls[0])
      } else if ((frameNumber + 1) === 9){
        frameScore += this.frames[frameNumber+1].rolls[0] + this.frames[frameNumber+1].rolls[1]
      } else {
        frameScore += this.frames[frameNumber+1].rolls[0]
      }
    } else {
      for (k = 0; k<2; k++){
        frameScore += this.frames[frameNumber+1].rolls[k];
      }
    }
  } else if (this.frames[frameNumber].SPARE && this.frames[frameNumber+1]){
    frameScore += this.frames[frameNumber+1].rolls[0];
  }
  return frameScore;

}
