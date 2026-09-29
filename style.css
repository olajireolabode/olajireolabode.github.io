// Penalty mini-game: pick a corner, the keeper dives at random.
(function () {
  var zones = document.querySelectorAll(".zones button");
  var keeper = document.getElementById("keeper");
  var ball = document.getElementById("ball");
  var msg = document.getElementById("msg");
  var goalsEl = document.getElementById("goals");
  var savesEl = document.getElementById("saves");
  if (!zones.length) return;

  var goals = 0, saves = 0;
  var colX = [8, 42, 76];        // keeper left (%) per column
  var rowY = [8, 56];            // keeper top (%) per row
  var ballX = [14, 47, 80];      // ball left (%) per column
  var ballY = [19, 69];          // ball top (%) per row

  function place(el, left, top) {
    el.style.left = left + "%";
    el.style.top = top + "%";
  }

  function setDisabled(state) {
    zones.forEach(function (b) { b.disabled = state; });
  }

  function shoot(zone) {
    var dive = Math.floor(Math.random() * 6);
    setDisabled(true);
    place(ball, ballX[zone % 3], ballY[Math.floor(zone / 3)]);
    place(keeper, colX[dive % 3], rowY[Math.floor(dive / 3)]);

    setTimeout(function () {
      if (dive === zone) {
        saves++;
        savesEl.textContent = saves;
        msg.textContent = "Saved. The keeper read it.";
      } else {
        goals++;
        goalsEl.textContent = goals;
        msg.textContent = "Goal!";
      }
    }, 380);

    setTimeout(function () {
      place(ball, 47, 112);
      place(keeper, 42, 56);
      msg.textContent = "Pick a corner and take the penalty.";
      setDisabled(false);
    }, 1800);
  }

  zones.forEach(function (b) {
    b.addEventListener("click", function () {
      shoot(parseInt(b.getAttribute("data-z"), 10));
    });
  });
})();
