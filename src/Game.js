Game = function(){
  this.frames = [];
}

Game.prototype.startFrame = function(frame = new Frame()){
  this.frames.push(frame);
  this.currentFrame = frame;
}

Game.prototype.roll = function(pins){

  this.currentFrame.storeRoll(pins);
}
