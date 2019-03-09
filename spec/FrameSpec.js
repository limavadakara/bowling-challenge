describe("Frame", function() {
  var frame;
  beforeEach(function() {
      frame = new Frame()
  });

  it("should be created with an empty array of rolls", function() {
      expect(frame.rolls.length).toEqual(0);

  });

  it("stores the pin rolls", function(){
    frame.storeRoll(pins=6);
    expect(frame.rolls.length).toEqual(1);
    expect(frame.rolls).toContain(6);
  })

  it('should allow only 2 rolls to be stored', function(){
    frame.storeRoll(pins=6);
    frame.storeRoll(pins=4);
    expect(function() {frame.storeRoll(5)}).toThrow("2 rolls complete for this frame. Please start a new frame");
    
  })


});