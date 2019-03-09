Frame = function(){
  this.rolls = [];
  this.MAXROLLS = 2;
  this.STRIKE = false;
}

Frame.prototype.storeRoll = function(pins) {
  if (pins === 10 && this.rolls.length === 0){
    this.STRIKE = true;
  }
  if (this.rolls.length < this.MAXROLLS) {
    this.rolls.push(pins);}
  else {throw "2 rolls complete for this frame. Please start a new frame"};
  if (this.STRIKE) {
    this.rolls.push(0);}
}
