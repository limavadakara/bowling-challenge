describe("Frame", function() {
  var frame;
  beforeEach(function() {
      Frame.count = 0;
      frame = new Frame();
  });

  it("should be created with an empty array of rolls", function() {
      expect(frame.rolls.length).toEqual(0);
      expect(Frame.count).toEqual(1);

  });

  it("stores the pin rolls", function(){
    frame.storeRoll(pins=6);
    expect(frame.rolls.length).toEqual(1);
    expect(frame.rolls).toContain(6);
  })

  it('should allow only 2 rolls to be stored', function(){
    frame.storeRoll(pins=6);
    frame.storeRoll(pins=4);
    expect(function() {frame.storeRoll(5)}).toThrow("rolls complete for this frame. Please start a new frame");

  })

  it('should store 0 in the second roll along with the pins in the first roll if the first roll is a strike', function(){
    frame.storeRoll(pins=10);
    expect(frame.rolls.length).toEqual(1);
    expect(frame.rolls[0]).toEqual(10);
  })

  it('should store the SPARE property correctly when the 2 frame rolls result in a spare', function(){
    frame.storeRoll(pins=4);
    frame.storeRoll(pins=6);
    expect(frame.rolls.length).toEqual(2);
    expect(frame.SPARE).toEqual(true);
  })

  it('sets the LASTFRAME property of the 10th frame to true', function(){
    frame.storeRoll(pins=4);
    frame.storeRoll(pins=6);
    expect(frame.rolls.length).toEqual(2);
    expect(frame.SPARE).toEqual(true);
  })
});
