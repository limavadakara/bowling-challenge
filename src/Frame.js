Frame = function(){
  this.rolls = [];
}

Frame.prototype.storeRoll = function(pins) {
  this.rolls.push(pins);
}
