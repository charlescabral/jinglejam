if ('addEventListener' in document) {
		document.addEventListener('DOMContentLoaded', function() {
				FastClick.attach(document.body);
		}, false);
}

// Avoid `console` errors in browsers that lack a console.
(function() {
		var method;
		var noop = function () {};
		var methods = [
			'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
			'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
			'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
			'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
		];
		var length = methods.length;
		var console = (window.console = window.console || {});

		while (length--) {
			method = methods[length];

			// Only stub undefined methods.
			if (!console[method]) {
					console[method] = noop;
			}
		}
}());

/**
 * ScrollFix v0.1
 * http://www.joelambert.co.uk
 *
 * Copyright 2011, Joe Lambert.
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

var ScrollFix = function(elem) {
	// Variables to track inputs
	var startY, startTopScroll;
	
	elem = elem || document.querySelector(elem);
	
	// If there is no element, then do nothing  
	if(!elem)
		return;

	// Handle the start of interactions
	elem.addEventListener('touchstart', function(event){
		startY = event.touches[0].pageY;
		startTopScroll = elem.scrollTop;
		
		if(startTopScroll <= 0)
			elem.scrollTop = 1;

		if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
			elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
	}, false);
};


// Window Social
var popupCenter = function(url, title, w, h) {
		var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
		var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

		var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

		var left = ((width / 2) - (w / 2)) + dualScreenLeft;
		var top = ((height / 3) - (h / 3)) + dualScreenTop;

		var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

		if (newWindow && newWindow.focus) {
				newWindow.focus();
		}
};


var SPMaskBehavior = function (val) {
	return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00000';
},
spOptions = {
	onKeyPress: function(val, e, field, options) {
		field.mask(SPMaskBehavior.apply({}, arguments), options);
	}
};


var Z63 = (function (parent, $) {

    var MediaQueryListener = function() {
        this.afterElement = window.getComputedStyle ? window.getComputedStyle(document.body, ':after') : false;
        this.currentBreakpoint = '';
        this.lastBreakpoint = '';
        this.init();
    };

    MediaQueryListener.prototype = {

        init: function () {
            var self = this;
            
            if(!self.afterElement) {
                return;
            }

            self._resizeListener();
        },
        _resizeListener: function () {
            var self = this;

            $(window).on('resize orientationchange load', function() {
                // Regexp for removing quotes added by various browsers
                self.currentBreakpoint = self.afterElement.getPropertyValue('content').replace(/^["']|["']$/g, '');
                
                if (self.currentBreakpoint !== self.lastBreakpoint) {
                    $(window).trigger('breakpoint-change', self.currentBreakpoint);
                    self.lastBreakpoint = self.currentBreakpoint;
                }
                
            });
        }
    };

    parent.mediaqueryListener = parent.mediaqueryListener || new MediaQueryListener();

    return parent;

}(Z63 || {}, jQuery));

