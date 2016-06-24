Template.content.onRendered(function(){
  var audioContext = new AudioContext()
  var oscillator = audioContext.createOscillator()
  var frequency = 440; 								//default value
  var isEnabled = false;
  var higherTone = function(){						//++
	    frequency+=10;
	    oscillator.frequency.value = frequency
	    console.log(frequency);
  }
  var lowerTone = function(){						//--
	  	frequency-=10;
	  	oscillator.frequency.value = frequency
	    console.log(frequency);
  }
  oscillator.type = 'sine'
  oscillator.frequency.value = frequency
    $('#playbtn').click(function(){ 
      oscillator = audioContext.createOscillator()
      oscillator.connect(audioContext.destination)
      oscillator.start()
      isEnabled = true;
    });
    $('#stopbtn').click(function(){
      oscillator.stop()
      isEnabled = false;
    });
    //Submit
    $('#submit').click(function() {
    	var currentFrqValue = $('#frq').val()
    	oscillator.frequency.value = currentFrqValue
    });
    //Key events
    $('body').on('keydown', function(k) {
	//Spacebar
	  if (k.keyCode == 32) {
	  	if (isEnabled===false) {
	  		$('#playbtn').click();
	  	} else {
	  		$('#stopbtn').click();
	  	}	    
	  }
  	//Up arrow
	  if (k.keyCode == 38) {
	  	higherTone();
	  }
  	//Down arrow
	  if (k.keyCode == 40) {
	  	lowerTone();
	  }
	});
	$(window).bind('mousewheel DOMMouseScroll', function(event){
	    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
	        // scroll up
			higherTone();
	    }
	    else {
	        // scroll down
	        lowerTone();
	    }
	});
	//console.log(isEnabled);
});