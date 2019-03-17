
$(document).ready(function() {
  var game = new Game();

  $('#roll').on('click', (function() {
    var pins = parseInt($('input:radio[name=rollPins]:checked').val(), 10);
    game.roll(pins);
    game.scoreGame();
    var theFrame
    for (var noFrames = 0; noFrames < game.frames.length; noFrames++){
      theFrame = document.getElementById("frame"+noFrames);
      while (theFrame.firstChild) {
      theFrame.removeChild(theFrame.firstChild);
      }
    }

    var rollDiv;
    for (var framenumber = 0; framenumber< game.frames.length; framenumber++){

      for(var rollnumber = 0; rollnumber< game.frames[framenumber].rolls.length;rollnumber++){
        rollDiv = document.createElement('div');
        rollDiv.id ="frame"+framenumber+"rollbox"+rollnumber;
        rollDiv.className = "rollbox";
        document.getElementById("frame"+framenumber).appendChild(rollDiv)

        $('#frame'+framenumber+'rollbox'+rollnumber).text(game.frames[framenumber].rolls[rollnumber])

      }
    }
  }))
})
