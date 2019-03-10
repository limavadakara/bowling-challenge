
Frame = function(){
  Frame.count = (Frame.count || 0) + 1;
  this.rolls = [];
  this.MAXROLLS = 2;
  this.STRIKE = false;
  this.SPARE = false;
  this.LASTFRAME = false;
}

Frame.prototype.storeRoll = function(pins) {
  if (Frame.count === 10){
    this.LASTFRAME = true;
  }
  if (pins === 10 && this.rolls.length === 0){
    this.STRIKE = true;
    if (this.LASTFRAME === true){
        this.MAXROLLS = 3
      } else {
        this.MAXROLLS = 1;
      }
  }
  if (this.rolls.length < this.MAXROLLS) {
    this.rolls.push(pins);
  } else {throw "rolls complete for this frame. Please start a new frame"};

  if (this.rolls[0] + this.rolls[1] === 10 && !this.STRIKE) {
    this.SPARE = true;
    if (this.LASTFRAME === true){
        this.MAXROLLS = 3
      }

  }
}
