/*
 *  Project: randomizeColor
 *  Description: Randomize text color of hovererd element
 *  Author: Patrick Roux - Kicoe.net
 *  License: Open Source
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "randomizeColor",
        defaults = {
			property: "color"              
			, speed: "fast"        
			, infinite: true        
			, definedColors: []
		};
		

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
			
			var options = this.options;
			var savecolor;
			var savebackground;
			var saveborder;
			
			
			//Test of property to alter : color, border or backgroundColor
			
			//////////////////////////
			//////////////  BACKGROUND
			//////////////////////////
			if (options["property"] == "backgroundColor"){
			//If background, then call to changeBackgroundColor
				$(this.element).hover(function(){
					//Save original colors
					savebackground = $(this).css("backgroundColor");
					//Then change it
					changeBackgroundColor($(this));
				},
				function() {
					//Revert back to original background color
					$(this).stop().animate( { backgroundColor: savebackground }, options["speed" ]);
				});
			}
			
			
			//////////////////////////
			/////////////////////  ALL
			//////////////////////////
			else if(options["property"] == "all"){
				$(this.element).hover(function(){
					//Save original colors
					savebackground = $(this).css("backgroundColor");
					savecolor = $(this).css("color");
					//Then change it
					changeBackgroundColor($(this));
					changeColor($(this));
				},
				function() {
					//Revert back to original background and color
					$(this).stop().animate( { backgroundColor: savebackground, color: savecolor }, options["speed" ]);
				});
			}
			
			//////////////////////////
			////  ELSE, DEFAULT, COLOR
			//////////////////////////
			else{
				//In any other case, to prevent wrong usage, change color
				$(this.element).hover(function(){
					//Save original colors
					savecolor = $(this).css("color");
					//Then change it
					changeColor($(this));
				},
				function() {
					//Revert back to original background color
					$(this).stop().animate( { color: savecolor }, options["speed" ]);
					
				});
			}
		
		
			function getRandomColor(){
				//Get a random color. 
				//If the option definedColors is not set, we pick a fully random color
				if(options["definedColors"].length == 0){
					return "rgb("
						+ (Math.floor(Math.random() * 256)) + ","
						+ (Math.floor(Math.random() * 256)) + ","
						+ (Math.floor(Math.random() * 256))
					+ ")";
				}else{
				//else, we pick a random color from the definedColors array
					return options["definedColors"][ Math.floor(Math.random() * options["definedColors"].length ) ];
				}
			}
			
			function changeColor(e) {
				//Animate the color property
				$(e).animate( { color: getRandomColor() }, options["speed" ], function(){
					//Recursively, if asked by the "infinite" option
					if (options["infinite"]) { changeColor(e, options["infinite"]) };
				});
			}		
			
			function changeBackgroundColor(e) {
				//Animate the backgroundColor property
				$(e).animate( { backgroundColor: getRandomColor() }, options["speed" ], function(){
					//Recursively, if asked by the "infinite" option
					if (options["infinite"]) { changeBackgroundColor(e, options["infinite"]) };
				});
			}
			


        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );