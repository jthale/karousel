# Karousel 1.0
Karousel is yet another jQuery carousel. It is a no frills carousel but unlike most current jquery carousels it does support swipe gestures. There are 2 basic animations included, fade and slide.

## Usage
Karousel follows a very simple pattern. A wrapping div containing .slide elements that in turn can contain anything you want.

``` html
<div id="banner">
	<div class="slide"> </div>
	<div class="slide"> </div>
	<div class="slide"> </div>
</div>
```

Trigger karousel just like any other jQuery plugin just query the element you want to make a karousel and use the karousel() function.

``` js

$("#banner").karousel();

```

## Options

Optionally you can pass an array of options while triggering karousel to customize it to your needs. 

- **indicators** Boolean *(default:true)* - a flag indicating if you want to display a list of clickable indicators which will show your progress through carousel.

-	**controls** Boolean *(default:false)* - a flag indicating if you want to display next and previous controls.

- **auto** Boolean *(default:false)* - a flag indicating if you would like to auto scroll through the carousel.

-	**pause** Integer *(default:4000)* - the length of time, in ms, between animations when auto is set to true. 

- **clickstop** Boolean *(default:true)* - a flag indicating if you the user clicking any of the indicators or controls will stop the auto animations. 

- **animationSpeed** Integer *(default:800)* - the duration of the animation, measured in ms.

- **animationType** String *(default:"fade")* - the style of animation you would like to use. Accepted values are "fade" and "slide".

### Example

``` js

$("#banner").karousel({
	indicators: true,
	controls: true,
	auto: true
	pause: 3500,
	clickstop: true,
	animationSpeed: 600,
	animationType: "slide"
});

```

## Enhancements
My goal is to keep this to keep this plugin as simple as possible but 2 possible enhancements I may add are:

- 1:1 swipe movement when using slide animations.

- optional callback after each slide transition could be helpful.

If there is something else you would like added or you notice any issues with this plugin please let me know via [Twitter](http://twitter.com/jthale) or [GitHub](http://github.com/jthale).


## License
Karousel jQuery plugin is &copy; 2012 [Jason Hale](http://haleinteractive.com) and is licensed under the terms of GPL &amp; MIT licenses. 