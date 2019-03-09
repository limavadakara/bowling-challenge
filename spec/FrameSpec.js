describe("Frame", function() {
  var frame;
  beforeEach(function() {
      frame = new Frame()
  });

  it("should be created with 2 rolls with value of zero", function() {
      expect(frame.roll1).toEqual(0);
      expect(frame.roll2).toEqual(0);
  });


});
