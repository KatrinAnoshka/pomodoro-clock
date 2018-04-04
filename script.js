$(document).ready(function() {
  var session_len = 25;
  var break_len = 5;
  var clock_min = session_len;
  var clock_sec = 0;
  var isStop = true;
  var interval;
  
  //Update Time on clock
  function updateTime() {
    var min = clock_min;
    var sec = clock_sec;
    
    if(min < 10)
      min = "0" + min;
    if(sec < 10)
      sec = "0" + sec;
    $(".clock-time").text(min + ":" + sec);
  }
  
  // Decrease Break Length
  $(".break-min").click(function() {
    if(isStop && break_len > 1) {
      break_len = break_len - 1;
      $(".break-time").text(break_len);
    }
  });

  //Increase Break Length
  $(".break-plus").click(function() {
    if(isStop) {
      break_len = break_len + 1;
      $(".break-time").text(break_len);
    }
  });
  
  // Decrease session Length
  $(".session-min").click(function() {
    if(isStop && session_len > 1) {
      session_len = session_len - 1;
      clock_min = session_len;
      updateTime();
      $(".session-time").text(session_len);
    }
  });

  //Increase session Length
  $(".session-plus").click(function() {
    if(isStop) {
      session_len = session_len + 1;
      clock_min = session_len;
      updateTime();
      $(".session-time").text(session_len);
    }
  });
  
  //Update ctrl button
  function updateCtrlButton() {
    if(isStop) {
      $(".ctrl").removeClass("btn-dang");
      $(".ctrl").addClass("btn-succ");
      $(".ctrl").text("Start");
    }
    else {
      $(".ctrl").removeClass("btn-succ");
      $(".ctrl").addClass("btn-dang");
      $(".ctrl").text("Stop");
    }
  }
    
  //Starts the clock
  function startClock() {
     
    if(clock_min !== 0 && clock_sec === 0) {
      clock_sec = 59;
      clock_min = clock_min - 1;
      updateTime();
    }
    else if (clock_min === 0 && clock_sec === 0) {
      if($(".clock-text").text() === "Session") {
        $(".clock-text").text("Break");
        clock_min = break_len;
        updateTime();
      }
      else {
        isStop = true;
        updateCtrlButton();
        $(".clock-text").text("Session");
        clock_min = session_len;
        updateTime();
        clearInterval(interval);
      }
    }
    else {
      clock_sec = clock_sec - 1;
      updateTime();
    }
  }
  
  //Starts or Stop the clock 
  $(".ctrl").click(function() {
    isStop = !isStop;
    updateCtrlButton();
    if(!isStop) {
      interval = setInterval(startClock, 1000);
    }
    else {
      isStop = true;
      updateCtrlButton();
      $(".clock-text").text("Session");
      clock_min = session_len;
      clock_sec = 0;
      updateTime();
      clearInterval(interval);
    }
  });

	//Hourglass Animation

    function hourglassFn(){
        setTimeout(function(){
            let hourglass = document.getElementById('hourglass').innerHTML = "&#xf251;";
            document.getElementById('hourglass').style.transition = "all .5s";
            
        },1000);
        setTimeout(function(){
            let hourglass = document.getElementById('hourglass').innerHTML = "&#xf252;";
            document.getElementById('hourglass').style.transition = "all .5s";
            
        },2000);
        setTimeout(function(){
            var hourglass = document.getElementById('hourglass').innerHTML = "&#xf253;";
            document.getElementById('hourglass').style.transition = "all .5s";
        },3000);
    }
    setInterval(hourglassFn, 3500);
    hourglassFn();
	
});



