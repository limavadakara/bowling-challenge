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
