$(document).ready(function(){
  $('.setPeriod').modal();
  $('.setPeriod').modal('open');
 });



let clock, countDownDate, diff, period, timeLeft, mn, bp1, ep1, bp2, ep2andbflex, eflexandbp3, ep3, bp4, ep4, bp5, ep5, bathe, eatheandbathl, eathl, tbp1, tep1, tbp2, tep2andbflex, teflexandbp3, tep3, tbp4, tep4, tbp5, tep5, tbathe, teatheandbathl, teathl;

var schedule = [
  [bp1, 'tbp1', 7, 45, "Until the Beginning of Period 1"],
  [ep1, 'ep1', 9, 5, "Until the End of Period 1"],
  [bp2, 'bp2', 9, 15, "Until the End of Passing Time for P2"],
  [ep2andbflex, 'ep2andbflex', 10, 35, "Until the End of Period 2\nand the Beginning of Flex"],
  [eflexandbp3, 'eflexandbp3', 11, 25, "Until the End of Flex and the Beginning of Period 3"],
  [ep3, 'ep3', 12, 45, "Until the End of Period 3"],
  [bp4, 'bp4', 12, 50, "Until the End of Passing Time for P4"],
  [ep4, 'ep4', 14, 10, "Until the End of Period 4"],
  [bp5, 'bp5', 14, 15, "Until the End of Passing Time for P5"],
  [ep5, 'ep5', 15, 35, "Until the End of Period 5"],
  [bathe, 'bathe', 15, 45, "Until the Beginning of Early Athletics"],
  [eatheandbathl, 'eatheandbathl', 17, 15, "Until the End of Early Athletics\nand the Beginning of Late Athletics"],
  [eathl, 'eathl', 18, 45, "Until the End of Late Athletics"],
  [mn, 'eathl', 23, 59, "Until Midnight"]
]

function setCountDownDate() {

  var today = new Date()
  var now = new Date().getTime()

  var times = [tbp1, tep1, tbp2, tep2andbflex, teflexandbp3, tep3, tbp4, tep4, tbp5, tep5, tbathe, teatheandbathl, teathl];

  for (var i = 0; i < schedule.length; i++) {
    schedule[i][0] = new Date()
    schedule[i][0].setHours(schedule[i][2], schedule[i][3], 0, 0)
    times[i] = schedule[i][0] - now
  }

  var timespos = times.filter(function(x) {
    return x > 0
  });

  var min = Math.min(...timespos)
  console.log(min)
  for (var i = 0; i < schedule.length; i++) {
    console.log(times[i])
    if (min == times[i]) {
      countDownDate = schedule[i][0]
      console.log("CDD: " + countDownDate)
      period = schedule[i][4]
      console.log('this one ^')
    }
  }

  var futureDate = new Date(countDownDate);

  var currentDate = new Date();

  diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

  console.log('ran restartCountDownDate');

  restartCountDownDate();

  $(document).ready(function() {
    console.log("Diff: " + diff)
    console.log("CDD: " + countDownDate)
    clock = $('.clock').FlipClock({
      clockFace: 'HourlyCounter',
      autoStart: false,
      countdown: true,
      showSeconds: true
    });
    clock.setTime(diff);
    clock.start();
    document.getElementById("period").innerHTML = "Time " + period
  });
};

setCountDownDate();

function restartCountDownDate() {
  console.log('setting timeout');
  setTimeout(setCountDownDate, diff * 1000)
}
