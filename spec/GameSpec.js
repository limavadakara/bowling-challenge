describe("Game", function() {

  var game;
  beforeEach(function() {
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
    expect(firstFrame.rolls[1]).toEqual(0);
    expect(secondFrame.rolls[0]).toEqual(4);
    expect(secondFrame.rolls[1]).toEqual(5);
  });

  it('calculates score correctly for when it is a Gutter Game', function(){
    var chances;
    for (chances = 0; chances <20; chances++ ){
    game.roll(0);
    }
    expect(game.score()).toEqual(0);

  });

  it('calculates score correctly when there is a STRIKE', function(){
    game.roll(5);
    game.roll(4);
    game.roll(10);
    game.roll(5);
    game.roll(4);
    expect(game.score()).toEqual(37);
  });
  
});
