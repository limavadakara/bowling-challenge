
$(document).ready(function() {
  var game = new Game();

  $('#roll').on('click', (function() {
    var pins = parseInt($('input:radio[name=rollPins]:checked').val(), 10);
    game.roll(pins);
    game.scoreGame();
  }))
})
