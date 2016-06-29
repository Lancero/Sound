Template.content.onCreated (function(){
	this.frequency = new ReactiveVar(440); 			//Default value [Hz]
})

Template.content.onRendered(function(){
  var audioContext = new AudioContext();
  var oscillator = audioContext.createOscillator();
  var isEnabled = false;
  var pausedFrequency;
  var maxFrequency = 15000;							//Max frequency value [Hz]
  var minFrequency = 50;							//Min frequency value [Hz]
  var comuputationTracker;

  var higherTone = ()=>{							//Tone up
  	if(this.frequency.get()<maxFrequency){
  		this.frequency.set(this.frequency.get()+10);
  	} 
  }
  var lowerTone = ()=>{								//Tone down
  	if(this.frequency.get()>minFrequency){
  		this.frequency.set(this.frequency.get()-10);
  	}  		    
  }
  var play = ()=>{
  	oscillator = audioContext.createOscillator()
	oscillator.connect(audioContext.destination)
	if (typeof pausedFrequency =='undefined') {
		oscillator.start() 
	} else {
		comuputationTracker.invalidate();
		oscillator.start()
	}
	isEnabled = true;
  }
  var stop = ()=>{
  	pausedFrequency = this.frequency.get();
	oscillator.stop()
	isEnabled = false;
  }
	comuputationTracker = Tracker.autorun(()=>{
  	oscillator.frequency.value = this.frequency.get();
  })
  oscillator.type = 'sine'
 													//Events
    $('#playbtn').click(function(event){
        var x = event.x || event.clientX;
        var y = event.y || event.clientY;
            if (!x && !y) {
                return false;
			} else {
		    	if (isEnabled===false){
 					play();
    			} 
			}			
    });
    $('#stopbtn').click(function(event){
        var x = event.x || event.clientX;
        var y = event.y || event.clientY;
        if (!x && !y) {
            return false;
        } else {
	    	stop();
        }
    });
    //Submit
	/*    $('#submit').click(function(event) {
    	var currentFrqValue = $('#frq').val()
    	oscillator.frequency.value = currentFrqValue
    });*/
    												//Key events
    $('body').on('keydown', function(k) {
													//Spacebar
	  if (k.keyCode == 32) {
	  	if (isEnabled===false) {
	  		play();	
	  	} else {
	  		stop();
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
	$(window).on('mousewheel DOMMouseScroll', function(event){
	    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
	        										// scroll up
			higherTone();
	    }
	    else {
	        										// scroll down
	        lowerTone();
	    }
	});
});
Template.content.helpers ({
	frequency: function(){
		var tmpl=Template.instance()
		return tmpl.frequency.get();
	}
})