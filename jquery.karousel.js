/*
 * Karousel 1.0
 *
 * Jason Hale
 * Copyright 2012, Licensed GPL & MIT
 *
*/

// TODO: add slide animations and sync with swipe for 1:1 movement

(function($) {
		  
	$.fn.karousel = function(options){
		
		var defaults = {
			indicators: true,
			controls: false,
			auto: false,
			pause: 4000,
			clickstop: true,
			animationSpeed: 800,
			animationType: "fade"
		}; 
		
		var options = $.extend(defaults, options); 

		var self = $(this);
		var slides = $(this).find(".slide");
		var count = slides.length;
		var currentSlide = 0;
		var nextSlide = 1;
		var slideWidth = $(slides[0]).width();
		var strip, n, p;
		var page = 0;
		var timeout;
		var clicked = false;
		var indicators = [];
		
		//track mouse points / delta
		var start={x:0, y:0};
		var end={x:0, y:0};
		var delta={x:0, y:0};
		
		function show() {

			clearTimeout(timeout);

			if(options.animationType == "fade") {
				// hide current slide
				$(slides[currentSlide]).fadeOut(200);
			
				// show new slide
				$(slides[nextSlide]).fadeIn(options.animationSpeed);
			} else if (options.animationType == "slide") {
				
				strip.animate({"margin-left": -1 * slideWidth * nextSlide}, options.animationSpeed)
			} else {
				throw("Animation Type " + options.animationType + " not supported");
			}
			
			// update indicator
			if(options.indicators) {
				indicators[currentSlide].removeClass("current");
				indicators[nextSlide].addClass("current");
			}
			
			// reset timer
			if(options.auto) {
				if(options.clickstop && !clicked) timeout = setTimeout(auto,options.pause);
			}
			
			currentSlide = nextSlide;
		}
		
		// move slides automatically
		function auto() {
			if(currentSlide == (count - 1)) nextSlide = 0;
			else nextSlide = currentSlide + 1;
			
			show();
		}
		
		function initialize() {
			
			// add carousel class
			if(!self.hasClass('carousel')) self.addClass('carousel');
			
			if(options.animationType == "fade") {
				self.addClass('fading');
				
				// prep slides for fading
				slides.each(function (index, slide) {
					if(index != 0) $(slide).hide();
				})
			} 
			
			else if (options.animationType == "slide") {
				self.addClass('sliding');
				
				// prep slides for sliding
				var stripWidth = slideWidth * count;
				slides.wrapAll('<div class="strip" style="width: ' + stripWidth + 'px" />');
				
				strip = self.find(".strip");
			} 
			
			else {
				throw("Animation Type " + options.animationType + " not supported");
			}
			
			
			// add optional indicators
			if(options.indicators) {
				
				var ul = $('<ul class="indicators"></ul>');
				
				for(var i=0; i<count; i++) {
					indicators[i] = $('<li data-index="' + i + '">' + i + '</li>').click( function() {	
						clicked = true;
						nextSlide = $(this).data("index");
						show();
					});
					
					if(i == 0) indicators[i].addClass("current");
					
					indicators[i].appendTo(ul);
				}
				
				ul.appendTo(self);
			}

			// add Next & Previous controls
			if(options.controls) {
				p = $('<a href="#" class="prev">&lt;</a>').appendTo(self).click( function(e) {
					e.preventDefault();
					previous();
				});

				n = $('<a href="#" class="next">&gt;</a>').appendTo(self).click( function(e) {
					e.preventDefault();
					next();
				});
			}
			
			// add touch support
			try {
				self[0].addEventListener('touchstart', touchStart, false);
		    self[0].addEventListener('touchmove', touchMove, false);
		    self[0].addEventListener('touchend', touchEnd, false);
			} catch(e) {
				// touch not supported
			}
			
			// start timer
			if(options.auto) {
				if(options.clickstop && !clicked) timeout = setTimeout(auto,options.pause);
			}
		}
		
		function next() {
			clicked = true;			
			if(currentSlide == (count - 1)) nextSlide = 0;
			else nextSlide = currentSlide + 1;
			show();
		}
		
		function previous() {
			clicked = true;
			if(currentSlide == 0) nextSlide = count - 1;
			else nextSlide = currentSlide - 1;
			show();
		}
		
		function touchStart(e) {			
			start.x = end.x = event.touches[0].pageX;
			start.y = end.y = event.touches[0].pageY;
			
			// used for testing first onTouchMove event
			this.isScrolling = undefined;
		}
		
		function touchMove(e) {
				end.x = event.touches[0].pageX;
				end.y = event.touches[0].pageY;
		}
		
		function touchEnd(e) {
			
			event.preventDefault();
			
			distance = caluculateDistance();
			direction = caluculateDirection();
			
			if(direction == "left") next();
			else if(direction == "right") previous();
			
		}
		
		/**
		* Calcualte the length / distance of the swipe
		*/
		function caluculateDistance()
		{
			return Math.round(Math.sqrt(Math.pow(end.x - start.x,2) + Math.pow(end.y - start.y,2)));
		}
		
		/**
		* Calcualte the angle of the swipe
		*/
		function caluculateAngle() 
		{
			var X = start.x-end.x;
			var Y = end.y-start.y;
			var r = Math.atan2(Y,X); //radians
			var angle = Math.round(r*180/Math.PI); //degrees
			
			//ensure value is positive
			if (angle < 0) 
				angle = 360 - Math.abs(angle);
				
			return angle;
		}
		
		/**
		* Calcualte the direction of the swipe
		* This will also call caluculateAngle to get the latest angle of swipe
		*/
		function caluculateDirection() 
		{
			var angle = caluculateAngle();
			
			if ( (angle <= 45) && (angle >= 0) ) 
				return "left";
			
			else if ( (angle <= 360) && (angle >= 315) )
				return "left";
			
			else if ( (angle >= 135) && (angle <= 225) )
				return "right";
			
			else if ( (angle > 45) && (angle < 135) )
				return "down";
			
			else
				return "up";
		}
		
		initialize();
	};	
})(jQuery);

