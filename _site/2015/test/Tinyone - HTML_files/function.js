/**
 * function.js
 *
 * Handles themes function with jQuery.
 */

// http://css-tricks.com/snippets/jquery/smooth-scrolling/
$(document).ready(function() {
	
	var height = $(window).height();
	
	var scrollWin = function (selector) {
		$('html, body').animate({
			scrollTop: $(selector).offset().top
		}, height);
	};
	
	jQuery("[href^=#]").click(function(e) {
		scrollWin (jQuery(this).attr("href"));
		return false;
	});

	$(window).scroll(function() {
		console.log($(window).scrollTop());
		/*
		// Check the location of each desired element 
		jQuery('.block-wrapper').each(function (i) {
			var bottom_of_object = jQuery(this).position().top; + jQuery(this).outerHeight();
			var bottom_of_window = jQuery(window).scrollTop() + jQuery(window).height();

			//If the object is completely visible in the window, fade it it
			if (bottom_of_window > bottom_of_object) {
				jQuery(this).find(".entry-content").addClass("animated bounceInUp");
			}else{
				jQuery(this).find(".entry-content").removeClass("animated bounceInUp");
			}
			
			console.log(height);
		});
		*/
		
		/* shoud change condition */
		if($(document).scrollTop() > 20){
		//if($(document).scrollTop() > 80){
			$("nav.navbar").addClass("tiny");
			//change navbar container to fruid
			$("nav.navbar").children( ".container" ).toggleClass('container container-fruid');
			//remove logo
			//change style for left & right nav items
			$('.sidebar-offcanvas').addClass("tiny-sidebar");
		} else{
			$("nav.navbar").removeClass("tiny");
			$("nav.navbar").children( ".container-fruid" ).toggleClass('container-fruid container');
			$(".sidebar-offcanvas").removeClass("tiny-sidebar");
		}
	});
	
	jQuery('.thumbnail').hover( // should correct element
        function(){
            $(this).find('.caption').toggleClass('hovered-item')
        }
    );
	
});
