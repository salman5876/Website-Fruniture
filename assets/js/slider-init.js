/***************************************************
==================== JS INDEX ======================
****************************************************
01. tp-brands-slide
02. team-slider
03. tp-testimonial-slider-active
04. showcase-slider-wrappper
05. team-slider
06. postbox-thumb-slider-active
07. tp-text-slider-slider
08. tp-project-slider-active
09. tp-hero5-slider-active
10. tp-testimonial-five-slider-active
****************************************************/

(function ($) {
	"use strict";
	
	////////////////////////////////////////////////////
	// 01. tp-brands-slide
	var slider = new Swiper('.tp-brand-slider', {
		slidesPerView: 1,
		spaceBetween: 30,
		speed:1500,
		loop: true,
		centeredSlides: true,
		freeMode: true,
		autoplay: {
			delay: 4000,
		  },
		breakpoints: {
			'1600': {
				slidesPerView: 5,
			},
			'1400': {
				slidesPerView: 4,
			},
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 2,
			},
			'400': {
				slidesPerView: 1,
			},
		},
	});


	////////////////////////////////////////////////////
	// 02. team-slider
	var team = new Swiper('.tp-team-slider-active', {
		slidesPerView: 6,
		loop: true,
		autoplay: false,
		arrow: false,
		spaceBetween: 30,
		navigation: {
			nextEl: ".tp-team-prev",
			prevEl: ".tp-team-next",
		},
		breakpoints: {
			'1400': {
				slidesPerView: 4,
			},
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 3,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 2,
			},
		},
		a11y: false,
	});

	////////////////////////////////////////////////////
	// 03. tp-testimonial-slider-active
	var team = new Swiper('.tp-testimonial-slider-active', {
		slidesPerView: 1,
		loop: true,
		autoplay: false,
		arrow: false,
		spaceBetween: 30,
		navigation: {
			nextEl: ".tp-testimonial-prev",
			prevEl: ".tp-testimonial-next",
		},
	});

		//////////////////////////////////////////
		// 04. showcase-slider-wrappper
		if ($('#showcase-slider-wrappper').length > 0) {

			const showcaseSwiper = new Swiper('#showcase-slider', {
				direction: "horizontal",
				loop: true,
				slidesPerView: 'auto',
				touchStartPreventDefault: false,
				speed:1000,
				autoplay:{
					delay:5000
				},
				effect: 'fade',
				simulateTouch : true,
				parallax:true,
				navigation: {
					clickable:true,
					nextEl: '.hero-3-next',
					prevEl: '.hero-3-prev',
				},
				pagination: {
					el: '.tp-slider-dot',
					clickable: true,
				},						
				on: {
					slidePrevTransitionStart: function () {	
			
						$('.tp-slider-dot').find('.swiper-pagination-bullet').each(function() {
							if (!$(this).hasClass("swiper-pagination-bullet-active")) {
								$('#trigger-slides .swiper-slide-active').find('div').first().each(function() {
									if (!$(this).hasClass("active")) {
										$(this).trigger('click');
									}
								});
								
								$('#trigger-slides .swiper-slide-duplicate-active').find('div').first().each(function() {
									if (!$(this).hasClass("active")) {
										$(this).trigger('click');
									}
								}); 
							}
						});
												
					},
					slideNextTransitionStart: function () {	
			
						$('.tp-slider-dot').find('.swiper-pagination-bullet').each(function() {
							if (!$(this).hasClass("swiper-pagination-bullet-active")) {
								$('#trigger-slides .swiper-slide-active').find('div').first().each(function() {
									if (!$(this).hasClass("active")) {
										$(this).trigger('click');
									}
								});
								
								$('#trigger-slides .swiper-slide-duplicate-active').find('div').first().each(function() {
									if (!$(this).hasClass("active")) {
										$(this).trigger('click');
									}
								}); 
							}
						});
												
					}
					},
			});	
			
			var vertex = 'varying vec2 vUv; void main() {  vUv = uv;  gl_Position = projectionMatrix  modelViewMatrix  vec4( position, 1.0 );	}';
			var fragment = `
				varying vec2 vUv;
			
				uniform sampler2D currentImage;
				uniform sampler2D nextImage;
				uniform sampler2D disp;
				uniform float dispFactor;
				uniform float effectFactor;
				uniform vec4 resolution;
			
				void main() {
			
					vec2 uv = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
			
					vec4 disp = texture2D(disp, uv);
					vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
					vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
					vec4 _currentImage = texture2D(currentImage, distortedPosition);
					vec4 _nextImage = texture2D(nextImage, distortedPosition2);
					vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);
			
					gl_FragColor = finalTexture; }
			
				`;
			
			var gl_canvas = new WebGL({
				vertex: vertex,
				fragment: fragment,
			});
					
			var addEvents = function(){
			
				var triggerSlide = Array.from(document.getElementById('trigger-slides').querySelectorAll('.slide-wrap'));
				gl_canvas.isRunning = false;
			
				triggerSlide.forEach( (el) => {
			
					el.addEventListener('click', function() {
			
							if( !gl_canvas.isRunning ) {
			
								gl_canvas.isRunning = true;
			
								document.getElementById('trigger-slides').querySelectorAll('.active')[0].className = '';
								this.className = 'active';
			
								var slideId = parseInt( this.dataset.slide, 10 );
			
								gl_canvas.material.uniforms.nextImage.value = gl_canvas.textures[slideId];
								gl_canvas.material.uniforms.nextImage.needsUpdate = true;
			
								gsap.to( gl_canvas.material.uniforms.dispFactor, {
									duration: 1,
									value: 1,
									ease: 'Sine.easeInOut',
									onComplete: function () {
										gl_canvas.material.uniforms.currentImage.value = gl_canvas.textures[slideId];
										gl_canvas.material.uniforms.currentImage.needsUpdate = true;
										gl_canvas.material.uniforms.dispFactor.value = 0.0;
										gl_canvas.isRunning = false;
									}
								});
			
							}
			
					});
			
				});
			
			};
			
			addEvents();
		}


	////////////////////////////////////////////////////
	// 05. team-slider
	var team = new Swiper('.tp-instagram-slider', {
		slidesPerView: 5,
		loop: true,
		autoplay: false,
		arrow: false,
		spaceBetween: 30,
		breakpoints: {
			'1400': {
				slidesPerView: 5,
			},
			'1200': {
				slidesPerView: 4,
			},
			'992': {
				slidesPerView: 4,
			},
			'768': {
				slidesPerView: 3,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		a11y: false,
	});

	////////////////////////////////////////////////////
	// 06. postbox-thumb-slider-active
	var postbox = new Swiper('.blog-slider-active', {
		slidesPerView: 1,
		loop: true,
		autoplay: true,
		effect: 'fade',
		breakpoints: {
			'1400': {
				slidesPerView: 1,
			},
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		// Navigation arrows
		navigation: {
			nextEl: '.tp-blog-arrow-next',
			prevEl: '.tp-blog-arrow-prev',
		},
		a11y: false,
	});

		////////////////////////////////////////////////////
	// 07. tp-text-slider-slider


	var text_slider_option = document.querySelector(".tp-hero-text-slide-active");

	if (text_slider_option) {

		var text_slider_speed = 2000000
		var text_slider_autoplay = true
		var loop_value = true
		var data_itemshow = "auto"

		if (text_slider_option.getAttribute("data-sliderSpeed")) {
			text_slider_speed = parseInt(text_slider_option.getAttribute("data-sliderSpeed"));
		}
		if (text_slider_option.getAttribute("data-autoPlay")) {
			text_slider_autoplay = text_slider_option.getAttribute("data-autoPlay")
		}

		if (text_slider_option.getAttribute("data-loop")) {
			loop_value = text_slider_option.getAttribute("data-loop")
		}
		if (text_slider_option.getAttribute("data-itemShow")) {
			data_itemshow = text_slider_option.getAttribute("data-itemShow")
		}


		if (text_slider_autoplay == 'true') {
			var text_slider = new Swiper(".tp-hero-text-slide-active", {
				loop: loop_value,
				speed: text_slider_speed,
				allowTouchMove: false,
				slidesPerView: data_itemshow,
				slidesPerGroup: 10,
				spaceBetween: 20,
				autoplay: {
					delay: 0,
					disableOnInteraction: true,
				}
			});
		}
		else {
			var text_slider = new Swiper(".tp-hero-text-slide-active", {
				loop: loop_value,
				speed: text_slider_speed,
				allowTouchMove: false,
				slidesPerView: data_itemshow,
				slidesPerGroup: 10,
				spaceBetween: 20,
				autoplay: false,
			});
		}
	};

	////////////////////////////////////////////////////
	// 08. tp-project-slider-active
	var project = new Swiper('.tp-project-slider-active', {
		slidesPerView: 3,
		loop: true,
		speed:1500,
		autoplay: {
			delay: 4000,
		},
		arrow: false,
		spaceBetween: 30,
		breakpoints: {
			'1400': {
				slidesPerView: 3,
			},
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 2,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		a11y: false,
	});


	////////////////////////////////////////////////////
	// 09. tp-hero5-slider-active
	var gallery = new Swiper('.tp-hero-five-active', {
		slidesPerView: 1,
		loop: true,
		autoplay: true,
		arrow: false,
		spaceBetween: 0,
		speed: 1000,
		effect: 'fade',
		a11y: false,
		navigation: {
			prevEl: '.tp-hero5-prev',
			nextEl: '.tp-hero5-next',
		},
		autoplay: {
			delay: 2500,
			disableOnInteraction: false
		},

	});

	////////////////////////////////////////////////////
	// 11. tp-team-alider-active

	var slider = new Swiper('.tp-testimonial-five-slider-active', {
		slidesPerView: 1,
		speed:1500,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			delay: 6000,
		},
		pagination: {
			el: ".tp-testimonial-five-pagination",
			clickable: true
		},
	});

})(jQuery);