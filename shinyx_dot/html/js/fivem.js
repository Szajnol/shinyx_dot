

$(document).ready(function() {

  window.addEventListener("message", function (event) {
    switch (event.data.action) {
        case "StartMinigame":
          $('.minigame-container').fadeIn(500)
          startProgressBar(2000);
          setTimeout(startGame, 2000);
            break;
  
    }
  });
  
  const $circle = $('.circle');
  const $container = $('.minigame-container');
  const containerWidth = $container.width();
  const containerHeight = $container.height();
  let isGameOver = false;
  let gameTimer;

  function startGame() {
    $circle.on('mouseleave', gameOver);

    $circle.animate({// zrobilem to tak bo jest 00:42 jutro o 8 mam wstac a ja jakoms minigierke pisze lol 
      left: 50 + '%',
      top: 50 + '%',
    }, 0, function() {
    });

    gameTimer = setTimeout(() => {
      if (!isGameOver) {
        isGameOver = true;
        $.post(`http://${GetParentResourceName()}/udane`)
        $('.minigame-container').fadeOut(500)
      }
    }, 15000);

    moveCircle(); 
  }

  function startProgressBar(duration, onComplete) {
    var progressBar = document.querySelector(".fill");
    var progress = 100;
    var interval = 10;
    var timer = setInterval(function() {
      if (progress <= 0) {
        clearInterval(timer);
        if (typeof onComplete === "function") {
          onComplete();
        }
      } else {
        progress -= (interval / duration) * 100;
  
        if (progress < 0) {
          progress = 0;
        }
        progressBar.style.height = progress + "%";
      }
    }, interval);
  }
  

  function moveCircle() {
    if (isGameOver) return;

    const maxX = containerWidth - $circle.width();
    const maxY = containerHeight - $circle.height();
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    const newWidth = (Math.random() * (4 - 3) + 3) + 'vw';
    const newHeight = newWidth; 

    $circle.animate({
      left: newX,
      top: newY,
      width: newWidth,
      height: newHeight
    }, 2500, function() {
      if (!isGameOver) {
        moveCircle();
      }
    });
  }

  function gameOver() {
    if (!isGameOver) {
      $.post(`http://${GetParentResourceName()}/nieudane`)
      $('.minigame-container').fadeOut(500)
      isGameOver = true;
      clearTimeout(gameTimer);
    }
  }

});