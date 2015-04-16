"use strict";

function pieChart() {
	//circle progress bar
	if ((jQuery().easyPieChart) && (jQuery.support.leadingWhitespace)) {
		var count = 0 ;
		// var colors = ['#4D91BA', '#5FCCA3', '#FFBB19'];
		var colors = ['#de3c2f'];
		jQuery('.chart').each(function(){
				
			var imagePos = jQuery(this).offset().top;
			var topOfWindow = jQuery(window).scrollTop();
			if (imagePos < topOfWindow+900) {

				jQuery(this).easyPieChart({
			        barColor: colors[count],
					trackColor: '#ffffff',
					scaleColor: false,
					scaleLength: false,
					lineCap: 'butt',
					lineWidth: 10,
					size: 270,
					rotate: 0,
					animate: 3000,
					onStep: function(from, to, percent) {
							jQuery(this.el).find('.percent').text(Math.round(percent));
						}
			    });
			}
			count++;
			if (count >= colors.length) { count = 0};
		});
	}
}


jQuery(document).ready(function() {
	//background image teaser
	jQuery(".bg_teaser").each(function(){
		var imagePath = jQuery(this).find("img").attr("src");
		
		jQuery(this).css("background-image", "url(" + imagePath + ")");
	});

	
	///////////
	//Plugins//
	///////////
    //contact form processing
    jQuery('form.contact-form').on('submit', function( e ){
        e.preventDefault();
        var $form = jQuery(this);
        jQuery($form).find('span.contact-form-respond').remove();
        //checking on empty values
        var formFields = $form.serializeArray();
        for (var i = formFields.length - 1; i >= 0; i--) {
        	if (!formFields[i].value.length) {
        		$form.find('[name="' + formFields[i].name + '"]').addClass('invalid').on('focus', function(){jQuery(this).removeClass('invalid')});
        	};
        };
        //if one of form fields is empty - exit
        if ($form.find('[name]').hasClass('invalid')) {
        	return;
        };
        //sending form data to PHP server if fields are not empty
        var request = $form.serialize();
        var ajax = jQuery.post( "contact-form.php", request )
            .done(function( data ) {
                jQuery($form).find('[type="submit"]').attr('disabled', false).parent().append('<span class="contact-form-respond highlight">'+data+'</span>');
        })
            .fail(function( data ) {
                jQuery($form).find('[type="submit"]').attr('disabled', false).parent().append('<span class="contact-form-respond highlight">Mail cannot be sent. You need PHP server to send mail.</span>');
        })
    });
    
    //mailchimp subscribe form processing
    jQuery('#signup').on('submit', function( e ) {
        e.preventDefault();
        // update user interface
        jQuery('#response').html('Adding email address...');
        // Prepare query string and send AJAX request
        jQuery.ajax({
            url: 'mailchimp/store-address.php',
            data: 'ajax=true&email=' + escape(jQuery('#mailchimp_email').val()),
            success: function(msg) {
                jQuery('#response').html(msg);
            }
        });
    });
	
	//twitter
	//slide tweets
	jQuery('#tweets .twitter').bind('loaded', function(){
		jQuery(this).addClass('flexslider').find('ul').addClass('slides');
	});
	if (jQuery().tweet) {
		jQuery('.twitter').tweet({
			modpath: "./twitter/",
		    count: 2,
		    avatar_size: 48,
		    loading_text: 'loading twitter feed...',
		    join_text: 'auto',
		    username: 'ThemeForest', 
		    template: "{avatar}<div class=\"tweet_right\">{time}{join}<span class=\"tweet_text\">{tweet_text}</span></div>"
		});
	}


	//mainmenu
	if (jQuery().superfish) {
		jQuery('ul.sf-menu').superfish({
			delay:       300,
			animation:   {opacity:'show'},
			animationOut: {opacity: 'hide'},
			speed:       'fast',
			disableHI:   false,
			cssArrows:   true,
			autoArrows:  true
		});
	}


	//for header toggler on all devices
	window.toplineHeight = $("#topline").outerHeight();
	

		//toggle mobile menu
	jQuery('#toggle_menu').on('click', function(){
		jQuery('#toggle_menu').toggleClass('mobile-active');
		jQuery('#header').toggleClass('mobile-active');
	});

	jQuery('#mainmenu a').on('click', function(){
		if (!jQuery(this).hasClass('sf-with-ul')) {
			jQuery('#toggle_menu').toggleClass('mobile-active');
			jQuery('#header').toggleClass('mobile-active');
		}
	});
		//toggle desktop menu
	jQuery('#toggle_menu').on('click', function(){
		jQuery('#top_wrap').toggleClass('topline-hidden');
	});
    
	//single page localscroll and scrollspy
	var navHeight = jQuery('#header').outerHeight(true);
	jQuery('body').scrollspy({
		target: '#mainmenu_wrapper',
		offset: navHeight
	});
	if (jQuery().localScroll) {
		jQuery('#mainmenu, #land').localScroll({
			duration:900,
			easing:'easeInOutQuart',
			offset: -navHeight+10
		});
		
	}

	//stick header to top
	var $affixHeader = jQuery('#header');
	var headerOffset = jQuery('#topline').outerHeight(true) + jQuery('#toplogo').outerHeight(true);
	jQuery($affixHeader).affix({
		offset: {
			top: headerOffset,
			bottom: 0
		}
	});
	 	
	
	//wrap header with div for smooth sticking
	var headerHeight = $affixHeader.outerHeight(true);
	$affixHeader.wrap('<div id="header_wrapper"></div>').parent().css({height: headerHeight}); //wrap header for smooth stick and unstick
	
	//if header has different height on afixed and affixed-top positions - correcting wrapper height
	jQuery($affixHeader).on('affixed-top.bs.affix', function () {
		$affixHeader.parent().css({height: $affixHeader.outerHeight(true)});
	});


 
	//toTop
	if (jQuery().UItoTop) {
        jQuery().UItoTop({ easingType: 'easeOutQuart' });
    }

	//parallax
	if (jQuery().parallax) {
		jQuery('#blog').parallax("50%", 0.02);
		jQuery('#contact').parallax("50%", -0.01);
		// jQuery('#team').parallax("50%", 0.08);
		// jQuery('#services').parallax("50%", -0.01);
		// jQuery('#action').parallax("50%", 0.2);
		// jQuery('#skills').parallax("50%", 0.01);
	}
	


    //prettyPhoto
    if (jQuery().prettyPhoto) {
	   	jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({
	   		hook: 'data-gal',
			theme: 'facebook' /* light_rounded / dark_rounded / light_square / dark_square / facebook / pp_default*/
	  	});
	}

   	//tooltip
   	if (jQuery().tooltip) {
		jQuery('[data-toggle="tooltip"]').tooltip();
	}

   	//carousel
   	if (jQuery().carousel) {
		jQuery('.carousel').carousel();
	}

	//owl carousel
	if (jQuery().owlCarousel) {

		jQuery('#small-carousel').owlCarousel({
		    loop:true,
		    margin:30,
		    nav:true,
		    dots:false,
		    items: 3,
		    responsive:{
		        0:{
		            items:1
		        },
		        767:{
		            items: 2
		        },
		        1200:{
		            items:3
		        }
		    }
		});

		jQuery('#photo-carousel').owlCarousel({
			loop:true,
		    autoplay:true,
		    autoplayTimeout:2000,
		    autoplayHoverPause:true,
		    margin:0,
		    center: true,
		    nav:true,
		    dots:false,
		    items: 3,
		    responsive:{
		        0:{
		            items:1
		        },
		        400:{
		            items:1
		        },
		        767:{
		            items: 2
		        },
		        992:{
		            items: 2
		        },
		        1200:{
		            items:3
		        },
		        1600:{
		            items:4
		        }
		    }
		});

		jQuery('.owl-carousel').owlCarousel({
		    loop:true,
		    margin:15,
		    nav:true,
		    dots:true,
		    items: 4,
		    responsive:{
		        0:{
		            items:1
		        },
		        767:{
		            items:3
		        },
		        1200:{
		            items: 4
		        }
		    }
		});
		
	}
	
});


jQuery(window).load(function(){
	
	//chart
	pieChart();

	//bxslider 
	if (jQuery().bxSlider) {
		//homepage slider
		jQuery('#land .bxslider').bxSlider({
			adaptiveHeight: true,
			auto: true,
			mode: 'vertical',
			slideMargin: 0
		});
		//regular slider
		// jQuery('.bxslider').bxSlider();
	}
	//fractionslider
	if (jQuery().fractionSlider) {
		var $mainSlider = jQuery('#mainslider');
		jQuery('.slider').fractionSlider({
			'fullWidth': 			true,
			'responsive': 			true,
			'dimensions': 			"1920,700",
		    'increase': 			true,
			'slideEndAnimation': 	false,
			'timeout' : 			3000,
			'slideTransition' :    'none',
			'slideTransitionSpeed' :1000,
			'transitionIn':        'fade',
			'transitionOut':       'fade',
			'controls':             true,
			'pager':                true 

		});
	}

	//flexslider
	if (jQuery().flexslider) {
		jQuery("#mainslider .flexslider").flexslider({
			animation: "fade",
			useCSS: true,
			controlNav: true,   
			directionNav: false,
		    prevText: "",
		    nextText: "",
			smoothHeight: false,
			slideshowSpeed:8000,
			animationSpeed:300,
			start: function( slider ) {
				slider.find('.slide_description > div').children().css({'visibility': 'hidden'});
				slider.find('.flex-active-slide .slide_description > div').children().each(function(index){
				var self = jQuery(this);
				var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
				setTimeout(function(){
						self.addClass("animated "+animationClass);
					}, index*200);
				});
			},
			after :function( slider ){
				slider.find('.flex-active-slide .slide_description > div').children().each(function(index){
				var self = jQuery(this);
				var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
				setTimeout(function(){
						self.addClass("animated "+animationClass);
					}, index*200);
				});
			},
			end :function( slider ){
				slider.find('.slide_description > div').children().each(function() {
					jQuery(this).attr('class', '');
				});
			}
		});

		jQuery(".flexslider").flexslider({
			animation: "fade",
			useCSS: true,
			controlNav: true,   
			directionNav: false,
		    prevText: "",
		    nextText: "",
			smoothHeight: true,
			slideshowSpeed:5000,
			animationSpeed:800,
			after :function( slider ){
				
			}
		});
	}



	//preloader
	jQuery(".preloaderimg").fadeOut();
	jQuery(".preloader").delay(200).fadeOut("slow").delay(200, function(){
		jQuery(this).remove();
	});

	jQuery('body').scrollspy('refresh');


	
	//animation to elements on scroll
	if (jQuery().appear) {
		jQuery('.to_animate').appear();
		jQuery('.to_animate').filter(':appeared').each(function(index){
			var self = jQuery(this);
			var animationClass = !self.data('animation') ? 'fadeInUp' : self.data('animation');
			var animationDelay = !self.data('delay') ? 210 : self.data('delay');
			setTimeout(function(){
				self.addClass("animated " + animationClass);
			}, index * animationDelay);
		});

		jQuery('body').on('appear', '.to_animate', function(e, $affected ) {
			jQuery($affected).each(function(index){
				var self = jQuery(this);
				var animationClass = !self.data('animation') ? 'fadeInUp' : self.data('animation');
				var animationDelay = !self.data('delay') ? 210 : self.data('delay');
				setTimeout(function(){
					self.addClass("animated " + animationClass);
				}, index * animationDelay);
			});
		});
	}

	//counters init on scroll
	if (jQuery().appear) {
		jQuery('.counter').appear();
		jQuery('.counter').filter(':appeared').each(function(index){
			if (jQuery(this).hasClass('counted')) {
				return;
			} else {
				jQuery(this).countTo().addClass('counted');
			}
		});
		jQuery('body').on('appear', '.counter', function(e, $affected ) {
			jQuery($affected).each(function(index){
				if (jQuery(this).hasClass('counted')) {
					return;
				} else {
					jQuery(this).countTo().addClass('counted');
				}
				
			});
		});
	}


	//flickr
	// use http://idgettr.com/ to find your ID
	if (jQuery().jflickrfeed) {
		jQuery("#flickr").jflickrfeed({
			flickrbase: "http://api.flickr.com/services/feeds/",
			limit: 6,
			qstrings: {
				id: "63512867@N07"
			},
			itemTemplate: '<a href="{{image_b}}" data-gal="prettyPhoto[pp_gal]"><li><img alt="{{title}}" src="{{image_s}}" /></li></a>'
		}, function(data) {
			jQuery("#flickr a").prettyPhoto({
				hook: 'data-gal',
				theme: 'facebook'
	   		});
	   		jQuery("#flickr li").hover(function () {						 
			   jQuery(this).find("img").stop().animate({ opacity: 0.5 }, 200);
		    }, function() {
			   jQuery(this).find("img").stop().animate({ opacity: 1.0 }, 400);
		    });
		});
	}

});

jQuery(window).resize(function(){

	jQuery('body').scrollspy('refresh');
	jQuery("#header_wrapper").css({height: jQuery('#header').outerHeight(true)}); //editing header wrapper height for smooth stick and unstick

		//for header toggler on all devices
	window.toplineHeight = $("#topline").outerHeight();
	
	
});

jQuery(window).scroll(function() {

	//circle progress bar
	pieChart();


});


// remembering header position on desktop
jQuery(document).ready(function() {
	if (jQuery.cookie) {
		if(jQuery.cookie("headerShown") === "true") {
			jQuery('#toggle_menu').toggleClass('header-hidden');
			// jQuery('#header, #header_wrapper').toggleClass('desktop-hide');
		}
		jQuery("#toggle_menu").on("click", function() {
			if(jQuery.cookie("headerShown") === "false" || !jQuery.cookie("headerShown")) {
				jQuery.cookie("headerShown", true);
			} else {
				jQuery.cookie("headerShown", false);
			}
		});
	}
});


