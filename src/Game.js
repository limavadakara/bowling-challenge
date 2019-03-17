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
    if (this.currentFrame.LASTFRAME){
      throw "Game Finished"
    }
    else { this.startFrame()}
  }
  this.currentFrame.storeRoll(pins);
}

Game.prototype.scoreGame = function(){
  var frameNumber;
  var gameScore = 0;

  for (frameNumber=0; frameNumber< this.frames.length; frameNumber++){
    gameScore += this.scoreFrame(frameNumber)
    console.log(this.frames[frameNumber]);
  }
  console.log(gameScore);
  return gameScore;
}

Game.prototype.scoreFrame = function(frameNumber){
  var frameScore = 0;

  frameScore += this.scoreFrameRolls(frameNumber);
  if (this.frames[frameNumber].STRIKE) {
    frameScore += this.strikeBonus(frameNumber);
  } else if (this.frames[frameNumber].SPARE){
    frameScore += this.spareBonus(frameNumber);
  }
  this.frames[frameNumber].frameScore = frameScore;

  return frameScore;
}

Game.prototype.strikeBonus = function(frameNumber){
  var strikeBonus = 0;
  var currentFrame = this.frames[frameNumber];
  if (currentFrame.LASTFRAME) {return strikeBonus}
  var nextFrame = this.frames[frameNumber + 1];
  var frameAfterNext = this.frames[frameNumber + 2]
  if (nextFrame) {
    if (nextFrame.STRIKE){
      if (frameAfterNext){
        strikeBonus += (nextFrame.rolls[0] + frameAfterNext.rolls[0])
      } else if (nextFrame.LASTFRAME) {
        strikeBonus += nextFrame.rolls[0] + nextFrame.rolls[1]
      } else {
        strikeBonus += nextFrame.rolls[0]
      }
    } else {
      var rollNumberOfNextFrame;
      for (rollNumberOfNextFrame = 0;
            rollNumberOfNextFrame < nextFrame.rolls.length;
            rollNumberOfNextFrame++){
        strikeBonus += nextFrame.rolls[rollNumberOfNextFrame];
      }
    }
  }
  console.log("lastframe "+currentFrame.LASTFRAME)
  console.log("frame count "+Frame.count)
  console.log("strike bonus "+strikeBonus)
  return strikeBonus;
}

Game.prototype.spareBonus = function(frameNumber){
  var spareBonus = 0;
  var currentFrame = this.frames[frameNumber];
  var nextFrame = this.frames[frameNumber + 1];
  if (nextFrame){
    spareBonus += nextFrame.rolls[0];
  }
  return spareBonus;
}

Game.prototype.scoreFrameRolls = function(frameNumber){
  var rollScore = 0;
  var rollNumber;
  var thiscurrentFrame = this.frames[frameNumber];
  for (rollNumber=0; rollNumber < thiscurrentFrame.rolls.length; rollNumber++) {
    rollScore += thiscurrentFrame.rolls[rollNumber];
  }
  console.log("frame rolls " + rollScore);
  return rollScore;
}
