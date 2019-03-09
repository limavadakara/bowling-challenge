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
    var frame = jasmine.createSpyObj('Frame', ['storeRoll']);
    game.currentFrame = frame;

    game.roll(5);
    expect(frame.storeRoll).toHaveBeenCalledWith(5);
  });

  it('starts a frame if no currentFrame is present when asked to store a roll', function(){
    game.roll(pins=6);
    expect(game.currentFrame).not.toBeNull();

  })



});
