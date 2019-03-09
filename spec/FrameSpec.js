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


});
