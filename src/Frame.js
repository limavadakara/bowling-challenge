Frame = function(){
  this.rolls = [];
  this.MAXROLLS = 2;
}

Frame.prototype.storeRoll = function(pins) {
  if (this.rolls.length < this.MAXROLLS) {
    this.rolls.push(pins);}
  else {throw "2 rolls complete for this frame. Please start a new frame"};
}
