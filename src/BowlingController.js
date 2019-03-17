
$(document).ready(function() {
  var game = new Game();

  $('#roll').on('click', (function() {
    var pins = parseInt($('input:radio[name=rollPins]:checked').val(), 10);
    if (isNaN(pins)){
      alert("You must select the number of pins to roll");
    }
    else { 
    try{
      game.roll(pins)
      } catch(err) {

            $('#CompletionMessage').text("Game Finished");
      }
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

        if(game.frames[framenumber].LASTFRAME && (rollnumber + 1 === game.frames[framenumber].MAXROLLS)){

          $('#CompletionMessage').text("Game Finished");
          $('.rollPins').attr('checked', false);
          $('.rollPins').attr('disabled', true);
          $('#roll').attr('disabled', true);
          var playAgain = document.createElement("button");
          playAgain.id = "restart";
          playAgain.innerText = "Restart Game"
          document.getElementById('RestartGame').appendChild(playAgain)
          $('#restart').on('click', function(){
            document.location.reload(true);
          })
        }
      }
    }}
  }))
})
