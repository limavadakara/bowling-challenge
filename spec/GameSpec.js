describe("Game", function() {

  var game;
  beforeEach(function() {
      Frame.count = 0;
      game = new Game()
  });

  it("gets initialized with an empty list of frames", function() {

    expect(game.frames.length).toEqual(0);
  });

  it("starts a new frame and sets the games current frame to it", function() {
    var frame = {"object": "frame"};
    game.startFrame(frame);
    expect(game.frames.length).toEqual(1);
    expect(game.frames).toContain(frame);
    expect(game.currentFrame).toEqual(frame);
  });

  it("stores the rolls correctly on the frames", function() {
    game.roll(5);
    expect(game.currentFrame.rolls[0]).toEqual(5);
  });

  it('starts a frame if no currentFrame is present when asked to store a roll', function(){
    game.roll(pins=6);
    expect(game.currentFrame).not.toBeNull();
  });

  it('starts a new frame if both rolls for the current frame have been exhausted', function(){
    game.roll(pins=6);
    var firstFrame = game.currentFrame;
    game.roll(pins=4);
    game.roll(pins=5);
    expect(game.currentFrame).not.toEqual(firstFrame);
    expect(game.frames.length).toEqual(2);
  });

  it('completes the rolls of the current frame and starts a new frame if the game roll is a strike', function(){
    game.roll(pins=10);
    var firstFrame = game.currentFrame;
    game.roll(pins=4);
    game.roll(pins=5);
    var secondFrame = game.currentFrame;
    expect(secondFrame).not.toEqual(firstFrame);
    expect(game.frames.length).toEqual(2);
    expect(firstFrame.rolls[0]).toEqual(10);
    expect(firstFrame.rolls.length).toEqual(1);
    expect(secondFrame.rolls[0]).toEqual(4);
    expect(secondFrame.rolls[1]).toEqual(5);
  });

  it('calculates score correctly for a Gutter Game', function(){
    var chances;
    for (chances = 0; chances <20; chances++ ){
    game.roll(0);
    }
    expect(game.scoreGame()).toEqual(0);

  });

  it('calculates score correctly when there is a STRIKE', function(){
    game.roll(5);
    game.roll(4);
    game.roll(10);
    game.roll(5);
    game.roll(4);
    expect(game.scoreGame()).toEqual(37);
  });

  it('calculates score correctly when there is a SPARE', function(){
    game.roll(5);
    game.roll(4);
    game.roll(5);
    game.roll(5);
    game.roll(4);
    game.roll(6);
    game.roll(4);
    expect(game.scoreGame()).toEqual(41);
  });

  it('calculates score correctly when there is a SPARE and a STRIKE', function(){
    game.roll(0);
    game.roll(10);
    game.roll(10);
    game.roll(5);
    game.roll(4);
    expect(game.scoreGame()).toEqual(48);
  });

  it('calculates score correctly for a Perfect Game', function(){
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    expect(game.scoreGame()).toEqual(300);
    expect(Frame.count).toEqual(10);
    expect(game.frames[9].LASTFRAME).toEqual(true);

  });

  it('calculates score correctly for a game with strikes and spares', function(){
    game.roll(10);
    game.roll(10);
    game.roll(5);
    game.roll(5);
    game.roll(6);
    game.roll(4);
    game.roll(7);
    game.roll(3);
    game.roll(10);
    expect(game.scoreGame()).toEqual(108);

  });

  it('calculates score correctly for a game with strikes and spares and ending with a spare', function(){
    game.roll(10);
    game.roll(10);
    game.roll(5);
    game.roll(5);
    game.roll(6);
    game.roll(4);
    game.roll(7);
    game.roll(3);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(9);
    game.roll(1);
    game.roll(3);
    game.roll(7);
    game.roll(10);
    expect(game.scoreGame()).toEqual(210);

  });

  it('calculates score correctly for a given frame when it is a STRIKE and has a SPARE following it', function(){
    game.roll(10);
    game.roll(10);
    game.roll(5);
    game.roll(5);
    game.roll(6);
    game.roll(4);
    game.roll(7);
    game.roll(3);
    game.roll(10);
    expect(game.scoreFrame(1)).toEqual(20);

  });

  it('calculates score correctly for a given frame when it is a SPARE and followed by a STRIKE', function(){
    game.roll(10);
    game.roll(10);
    game.roll(5);
    game.roll(5);
    game.roll(6);
    game.roll(4);
    game.roll(7);
    game.roll(3);
    game.roll(10);
    expect(game.scoreFrame(4)).toEqual(20);

  });

  it('calculates score correctly for a given frame when it is a STRIKE and the 10th frame of a perfect game', function(){
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    expect(game.scoreFrame(9)).toEqual(30);
    expect(game.scoreFrameRolls(9)).toEqual(30);

  });

  it('calculates score correctly for a given frame when it is a SPARE and the 10th frame of a game', function(){
    game.roll(10);
    game.roll(10);
    game.roll(5);
    game.roll(5);
    game.roll(6);
    game.roll(4);
    game.roll(7);
    game.roll(3);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(9);
    game.roll(1);
    game.roll(3);
    game.roll(7);
    game.roll(10);
    expect(game.scoreFrame(9)).toEqual(20);
    expect(game.scoreGame()).toEqual(210);
    expect(game.frames[9].frameScore).toEqual(20);
    expect(game.spareBonus(3)).toEqual(7);
    expect(game.scoreFrameRolls(3)).toEqual(10);
    expect(game.scoreFrameRolls(9)).toEqual(20);
    expect(game.scoreFrameRolls(5)).toEqual(10);

  });

  it('calculates STRIKE bonus correctly if the frame of the input number is a STRIKE and the next frame is also a STRIKE', function(){
    game.roll(10);
    game.roll(10);
    game.roll(5);
    game.roll(5);
    game.roll(6);
    game.roll(4);
    game.roll(7);
    game.roll(3);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(9);
    game.roll(1);
    game.roll(3);
    game.roll(7);
    game.roll(10);
    expect(game.scoreGame()).toEqual(210);
    expect(game.strikeBonus(5)).toEqual(20);
    expect(game.frames[5].frameScore).toEqual(30);


  });

  it('Throws error if attempt is made to play more than 10 frames', function(){
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    game.roll(10);
    expect(game.scoreGame()).toEqual(300);
    expect(Frame.count).toEqual(10);
    expect(game.frames[9].LASTFRAME).toEqual(true);
    expect(function() {game.roll()}).toThrow("Game Finished");

  });


});
