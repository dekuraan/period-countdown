var countdown;

function Period(name, hour, minute) {
  this.name = name;
  this.hour = hour;
  this.minute = minute;
  var d = new Date();
  d.setHours(hour)
  d.setMinutes(minute);
  d.setSeconds(0);
  this.time = d;
}

var periods = [
  new Period("Beginning of Period 1", 7, 45),
  new Period("End of Period 1", 9, 5),
  new Period("Beginning of Period 2", 9, 15),
  new Period("End of Period 2 and the Beginning of Flex", 10, 35),
  new Period("End of Flex and the Beginning of Period 3", 11, 25),
  new Period("End of Period 3", 12, 45),
  new Period("Beginning of Period 5", 12, 50),
  new Period("End of Period 4", 14, 10),
  new Period("Beginning of Period 5", 14, 15),
  new Period("End of Period 5", 15, 35),
  new Period("Beginning of Early Athletics", 15, 45),
  new Period("End of Early Athletics and the Beginning of Late Athletics", 17, 15),
  new Period("End of Late Athletics", 18, 45)
];

var restartCountdown = function() {
  console.log("whoops");
}
var mobileRestartCountdown = function() {

  var now = new Date();

  var countdownPeriodIndex = periods.length - 1;

  for (var i = 0; i < periods.length - 1; i++) {
    if (periods[i].time - now > 0 && periods[i].time - now < periods[countdownPeriodIndex].time - now) {
      countdownPeriodIndex = i;
    }
  }

  console.log(periods[countdownPeriodIndex]);

  var eight_hours = 8 * 60 * 1000;
  var one_day = new Date(24 * 60 * 60 * 1000);
  var countdownDate = new Date(periods[countdownPeriodIndex].time - now);
  var seconds_countdown = $('.seconds').FlipClock(countdownDate.getSeconds(), {
    clockFace: 'Counter',
  });
  var minutes_countdown = $('.minutes').FlipClock(countdownDate.getMinutes(), {
    clockFace: 'Counter',
  });
  var hours_countdown = $('.hours').FlipClock(countdownDate.getHours() - 8, {
    clockFace: 'Counter'
  });

  setTimeout(function() {
    setInterval(function() {
      seconds_countdown.decrement();
      if (seconds_countdown.getTime() == 0) {
        seconds_countdown.setTime(60);
        minutes_countdown.decrement();
      }
      if (minutes_countdown.getTime() == 0) {
        minutes_countdown.setTime(60);
        hours_countdown.decrement();
      }
    }, 1000);
  });


  document.getElementById('period-title').innerHTML = "Until the " + periods[countdownPeriodIndex].name;
  console.log(periods[countdownPeriodIndex + 1].time - now)
  setTimeout(restartCountdown, periods[countdownPeriodIndex + 1].time - now);

}

var desktopRestartCountdown = function() {

  var now = new Date();

  var countdownPeriodIndex = periods.length - 1;

  for (var i = 0; i < periods.length - 1; i++) {
    if (periods[i].time - now > 0 && periods[i].time - now < periods[countdownPeriodIndex].time - now) {
      countdownPeriodIndex = i;
    }
  }
  console.log(periods[countdownPeriodIndex]);
  countdown = new $('.countdown').FlipClock((periods[countdownPeriodIndex].time - now)/1000, {
    clockFace: "Hourly Counter",
    countdown: true
  });

  countdown.start();

  document.getElementById('period-title').innerHTML = "Until the " + periods[countdownPeriodIndex].name;
  console.log(periods[countdownPeriodIndex + 1].time - now)
  setTimeout(restartCountdown, periods[countdownPeriodIndex + 1].time - now);
}

enquire.register("screen and (min-width: 768px)", {

  // OPTIONAL
  // If supplied, triggered when a media query matches.
  match: function() {
    console.log("matched");
    restartCountdown = desktopRestartCountdown;
    restartCountdown();
  },

  // OPTIONAL
  // If supplied, triggered when the media query transitions
  // *from a matched state to an unmatched state*.
  unmatch: function() {
    console.log("unmatched"
    );
    restartCountdown = mobileRestartCountdown;
    restartCountdown();
  }
});

enquire.register("screen and (max-width: 767px)", {

  // OPTIONAL
  // If supplied, triggered when a media query matches.
  match: function() {
    console.log("matched");
    restartCountdown = mobileRestartCountdown;
    restartCountdown();
  },
});
