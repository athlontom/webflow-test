function slider(cont,prev,next,card){
  var slidesPerWidth = 3;
  var containerID = cont;
  var prevButtonID = prev;
  var nextButtonID = next;
  var slide = 1;
  var count = $(containerID).children().length;
  
  if($(window).width()<992){
    slidesPerWidth = 1;
  }
  if(count<=slidesPerWidth){
  	$(prevButtonID).css("display","none");
  	$(nextButtonID).css("display","none");
  }
  //var slideWidth=$(containerID).parent().width()/slidesPerWidth;
  var slideWidth=$(containerID).width()/slidesPerWidth;
//  var pos=$(containerID).position().translateX;
//  var pos=$(containerID).css("transform").split(",")[4].trim();
  var pos = 0;
  console.log(pos);
  
	$(nextButtonID).click(showNext);
  
  function showNext() {
  	$(prevButtonID).css({opacity: 1});
    count = $(containerID).children().length;
  	if(slide<(count-slidesPerWidth+1)){
      slide++;
      pos -=slideWidth;
      $(containerID).css("transform","translateX("+pos+"px)");
    }
    if(slide==(count-slidesPerWidth+1)){
    	$(nextButtonID).css({opacity: 0});
    }
    $(containerID).children().eq(2).css({opacity:1});
    fadeSlides();
  }
  
  $(prevButtonID).click(showPrev);
  
  function showPrev() {
  	$(nextButtonID).css({opacity: 1});
    count = $(containerID).children().length;
  	if(slide>1){
      slide--;
      pos +=slideWidth;
      $(containerID).css("transform","translateX("+pos+"px)");
    }
    if(slide==1){
    	$(prevButtonID).css({opacity: 0});
    }
    fadeSlides();
  }
  
  $( window ).resize(function() {
    if($(window).width()<992){
    	slidesPerWidth = 1;
    } else {
    	slidesPerWidth = 3;
    }
    if(slidesPerWidth < count){
    	$(prevButtonID).css("display","block");
      $(nextButtonID).css("display","block");
    } else {
    	$(prevButtonID).css("display","none");
      $(nextButtonID).css("display","none");
    }
    //slide = 1;
    slideWidth=$(containerID).parent().width()/slidesPerWidth;
    pos = slideWidth-(slideWidth*slide);
    $(containerID).css("transform","translateX("+pos+"px)");
		fadeSlides();
  });
  
  $(prevButtonID).css({opacity: 0});
  
  function fadeSlides(){
  	$(containerID).children().each(function(index){
    	if(index == slide-1 || (slidesPerWidth == 3 && (index == slide || index == slide+1))){
    		$(this).css({"transition-delay":"300ms"});
    		$(this).css({opacity:1});
        $(this).css({"pointer-events":"auto"});
      } else {
    		$(this).css({"transition-delay":"0ms"});
    		$(this).css({opacity:0.3});  
        $(this).css({"pointer-events":"none"});
      }
    });
  	//$("#c-m12-slider-content").children().eq(2).css({opacity:0.1});
  	//$("#c-m12-slider-content").children().eq(3).css({opacity:0.1});
  }
  fadeSlides();
  
  //swipedetect(document.getElementById("c-webinar-touch-area"),swipedone);
  var webinarItems = document.getElementsByClassName(card);
  Array.from(webinarItems).forEach(function(value,index,array){
  	swipedetect(value,swipedone);
  });
  
  
  function swipedone(swipedir){
  //swipedir contains either "none", "left", "right", "top", or "down"
  	console.log(swipedir);
	if (swipedir =='left')
		showNext();
    if (swipedir =='right')
		showPrev();
	}
}
  
  
  function swipedetect(el, callback){
    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 150, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 300, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function(swipedir){}

    touchsurface.addEventListener('touchstart', function(e){
      var touchobj = e.changedTouches[0]
      swipedir = 'none'
      dist = 0
      startX = touchobj.pageX
      startY = touchobj.pageY
      startTime = new Date().getTime() // record time when finger first makes contact with surface
      //e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function(e){
      //e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function(e){
      var touchobj = e.changedTouches[0]
      distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime // get time elapsed
      if (elapsedTime <= allowedTime){ // first condition for awipe met
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
          swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
        }
        else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
          swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
        }
      }
      handleswipe(swipedir)
      //e.preventDefault()
    }, false)
  } 
