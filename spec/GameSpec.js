describe("Game", function() {
  var game;
  beforeEach(function() {
      game = new Game()
  });

  it("gets initialized with an empty list of frames", function() {

    expect(game.frames.length).toEqual(0);
  });

  it("starts a new frame", function() {
    var frame = {"object": "frame"};
    game.startFrame(frame);
    console.log(game.frames);
    expect(game.frames.length).toEqual(1);
    expect(game.frames).toContain(frame);
  });

});
