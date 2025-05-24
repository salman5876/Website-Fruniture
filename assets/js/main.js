/***************************************************
==================== JS INDEX ======================
****************************************************
01. data-background
02. smooth-wrapper
03. Counter Js
04. Masonary Js
05. auto update year
06. back-to-top
07. mobile-menu-active
08. Sidebar Js
09. magnific-Popup-image-active
10. magnificPopup video view
11. tp-btn-trigger
12. portfolio animation start
13. cartmini Js
15. Search Js
16. progress-data-woidth
17. Wow Js
18. tp-video-area
19. tp-video-area
20. button hover animation
21. tp-project-list-wrap
22. subscribe-popup
23. Sticky Header Js
24. PreLoader Js	
25. text-animetion-jsap
26. tp-char-animation
27. tp_fade_bottom
28. tp-zoom-img
29. slider-range
30. Show Login Toggle Js
31. Show Coupon Toggle Js
32. Password Toggle Js
33. Password Toggle Js
 ****************************************************/

(function ($) {
	"use strict";
	var windowOn = $(window)
	
	////////////////////////////////////////////////////
	// 01. data-background
	$("[data-background").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});

	////////////////////////////////////////////////////
	// 02. smooth-wrapper
	if($('#smooth-wrapper').length && $('#smooth-content').length){
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TweenMax, ScrollToPlugin);
	
		gsap.config({
			nullTargetWarn: false,
		});
	
		let smoother = ScrollSmoother.create({
			smooth: 2,
			effects: true,
			smoothTouch: true,
			normalizeScroll: false,
			ignoreMobileResize: true,
		});
	}

	////////////////////////////////////////////////////
	// 03. Counter Js
	new PureCounter();
	new PureCounter({
		filesizing: true,
		selector: ".filesizecount",
		pulse: 2,
	});

	////////////////////////////////////////////////////
	// 04. Masonary Js
	$('.grid').imagesLoaded(function () {
		// init Isotope
		var $grid = $('.grid').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
				// use outer width of grid-sizer for columnWidth
				columnWidth: '.grid-item',
			}
		});
		// filter items on button click
		$('.masonary-menu').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		});

		//for menu active class
		$('.masonary-menu button').on('click', function (event) {
			$(this).siblings('.active').removeClass('active');
			$(this).addClass('active');
			event.preventDefault();
		});
	});

	////////////////////////////////////////////////////
	// 05. auto update year
	$('#year').text(new Date().getFullYear());


	////////////////////////////////////////////////////
	// 06. back-to-top
	var btn = $('#back_to_top');
	var btn_wrapper = $('.back-to-top-wrapper');

	windowOn.scroll(function() {
	if (windowOn.scrollTop() > 300) {
		btn_wrapper.addClass('back-to-top-btn-show');
	} else {
		btn_wrapper.removeClass('back-to-top-btn-show');
	}
	});

	btn.on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop:0}, '300');
	});

	if ($('.tp-header-height').length > 0) {
		var headerHeight = document.querySelector(".tp-header-height");      
		var setHeaderHeight = headerHeight.offsetHeight;	
		$(".tp-header-height").each(function () {
			$(this).css({
				'height' : $(this).height()
			});
		});
	}
	

	////////////////////////////////////////////////////
	// 07. mobile-menu-active
	if($('.tp-main-menu-content').length && $('.tp-main-menu-mobile').length){
		let navContent = document.querySelector(".tp-main-menu-content").outerHTML;
		let mobileNavContainer = document.querySelector(".tp-main-menu-mobile");
		mobileNavContainer.innerHTML = navContent;


		let arrow = $(".tp-main-menu-mobile .has-dropdown > a");

		arrow.each(function () {
			let self = $(this);
			let arrowBtn = document.createElement("BUTTON");
			arrowBtn.classList.add("dropdown-toggle-btn");
			arrowBtn.innerHTML = "<i class='fal fa-angle-right'></i>";

			self.append(function () {
			return arrowBtn;
			});

			self.find("button").on("click", function (e) {
			e.preventDefault();
			let self = $(this);
			self.toggleClass("dropdown-opened");
			self.parent().toggleClass("expanded");
			self.parent().parent().addClass("dropdown-opened").siblings().removeClass("dropdown-opened");
			self.parent().parent().children(".tp-submenu, .tp-megamenu-active").slideToggle();
			});

		});
	}

	////////////////////////////////////////////////////
	// 08. Sidebar Js
	$(".tp-menu-bar").on("click", function () {
		$(".tpoffcanvas").addClass("opened");
		$(".body-overlay").addClass("apply");
	});
	$(".close-btn").on("click", function () {
		$(".tpoffcanvas").removeClass("opened");
		$(".body-overlay").removeClass("apply");
	});
	$(".body-overlay").on("click", function () {
		$(".tpoffcanvas").removeClass("opened");
		$(".body-overlay").removeClass("apply");
	});

	////////////////////////////////////////////////////
	// 09. magnific-Popup-image-active
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		},
		mainClass: 'mfp-with-zoom',
		removalDelay: 500,
	});

	////////////////////////////////////////////////////
	// 10. magnificPopup video view
	$(".popup-video").magnificPopup({
		type: "iframe",
	});



	$('.tp-hover-btn').on('mouseout', function (e) {
		var x = e.pageX - $(this).offset().left;
		var y = e.pageY - $(this).offset().top;

		$(this).find('.tp-btn-circle-dot').css({
			top: y,
			left: x
		});
	});

	var hoverBtns = gsap.utils.toArray(".tp-hover-btn-wrapper");

	const hoverBtnItem = gsap.utils.toArray(".tp-hover-btn-item");
	hoverBtns.forEach((btn, i) => {
		$(btn).mousemove(function (e) {
			callParallax(e);
		});
		function callParallax(e) {
			parallaxIt(e, hoverBtnItem[i], 60);
		}

		function parallaxIt(e, target, movement) {
			var $this = $(btn);
			var relX = e.pageX - $this.offset().left;
			var relY = e.pageY - $this.offset().top;

			gsap.to(target, 1, {
				x: ((relX - $this.width() / 2) / $this.width()) * movement,
				y: ((relY - $this.height() / 2) / $this.height()) * movement,
				ease: Power2.easeOut,
			});
		}
		$(btn).mouseleave(function (e) {
			gsap.to(hoverBtnItem[i], 1, {
				x: 0,
				y: 0,
				ease: Power2.easeOut,
			});
		});
	});

	///////////////////////////////////////////////////
	// 11. tp-btn-trigger
	if ($('.tp-btn-trigger').length > 0) {

		gsap.set(".tp-btn-bounce", { y: -100, opacity: 0 });
		var mybtn = gsap.utils.toArray(".tp-btn-bounce");
		mybtn.forEach((btn) => {
			var $this = $(btn);
			gsap.to(btn, {
				scrollTrigger: {
					trigger: $this.closest('.tp-btn-trigger'),
					start: "top center",
					markers: false
				},
				duration: 1,
				ease: "bounce.out",
				y: 0,
				opacity: 1,
			})
		});
	}

	////////////////////////////////////////////////////
	// 12. portfolio animation start
	if ($('.scrool-left-right').length > 0) {
		gsap.set('.scrool-left-right.marque', {
			x: '25%'
		});

		gsap.timeline({
			scrollTrigger: {
				trigger: '.item-wrap-trigger ',
				start: '-1000 10%',
				end: 'bottom 20%',
				scrub: true,
				invalidateOnRefresh: true
			}
		})
		.to('.scrool-left-right.marque ', {
			x: '-100%'
		});
	}

	////////////////////////////////////////////////////
	// 13. cartmini Js
	$(".cartmini-open-btn").on("click", function () {
		$(".cartmini__area").addClass("cartmini-opened");
		$(".body-overlay").addClass("openeds");
	});

	$(".cartmini-close-btn, .body-overlay").on("click", function () {
		$(".cartmini__area").removeClass("cartmini-opened");
		$(".body-overlay").removeClass("openeds");
	});

	////////////////////////////////////////////////////
	// 15. Search Js
	$(".search-click").on("click", function () {
		$(".tp-search-form-toggle,.body-overlay").addClass("active");
	});

	$(".tp-search-close,.body-overlay").on("click", function () {
		$(".tp-search-form-toggle,.body-overlay").removeClass("active");
	});
	

	function tp_ecommerce() {
		$('.tp-cart-minus').on('click', function () {
			var $input = $(this).parent().find('input');
			var count = parseInt($input.val()) - 1;
			count = count < 1 ? 1 : count;
			$input.val(count);
			$input.change();
			return false;
		});

		$('.tp-cart-plus').on('click', function () {
			var $input = $(this).parent().find('input');
			$input.val(parseInt($input.val()) + 1);
			$input.change();
			return false;
		});


	}
	tp_ecommerce();

	////////////////////////////////////////////////////
	// 16. progress-data-woidth

	$("[data-width]").each(function () {
		$(this).css("width", $(this).attr("data-width"));
	});


	////////////////////////////////////////////////////
	// 17. Wow Js
	new WOW().init();

	////////////////////////////////////////////////////
	// 18. tp-video-area
	
	if ($('.tp-video-area').length > 0) {

		let mm = gsap.matchMedia();
		mm.add("(min-width: 1400px)", () => {
			let tp_hero_2 = gsap.timeline({
				scrollTrigger: {
					trigger: ".tp-video-area",
					start: "top 150",
					pin: true,
					markers: false,
					scrub: 1,
					pinSpacing: false,
					end: "bottom 70%",
				}
			});
			tp_hero_2.to(".tp-video-wrap", {
				width: "1320px",
				height: "600px",
	
			});
		});
	}


	if ($('.tp-video-thumb-2').length > 0) {
		let ms = gsap.matchMedia();
		ms.add("(min-width: 768px)", () => {
			// Home 8
			let tp_hero = gsap.timeline({
				scrollTrigger: {
					trigger: ".tp-video-thumb-2",
					start: "top 70",
					pin: true,
					markers: false,
					scrub: 1,
					pinSpacing: false,
					end: "bottom 50%",
				}
			});
			tp_hero.to(".tp-video-wrap-2", {
				width: "100%",
			});
		});
	}


	////////////////////////////////////////////////////
	// 19. tp-video-area
	$('select').niceSelect();
	$('.tp-header-search-category select').niceSelect();




	////////////////////////////////////////////////////
	// 20. button hover animation
		$('.tp-btn-rounded').on('mouseenter', function (e) {
			var x = e.pageX - $(this).offset().left;
			var y = e.pageY - $(this).offset().top;
	
			$(this).find('.tp-btn-circle-dot').css({
				top: y,
				left: x
			});
		});
	
		$('.tp-btn-rounded').on('mouseout', function (e) {
			var x = e.pageX - $(this).offset().left;
			var y = e.pageY - $(this).offset().top;
	
			$(this).find('.tp-btn-circle-dot').css({
				top: y,
				left: x
			});
		});

		////////////////////////////////////////////////////
		// 21. tp-project-list-wrap

		$('.tp-project-list-wrap .tp-project-list-item').on("mouseenter", function () {
			$('#tp-project-thumb').removeClass().addClass($(this).attr('rel'));
			$(this).addClass('active').siblings().removeClass('active');
		});
		
		////////////////////////////////////////////////////
		// 22. subscribe-popup
		if ($('.subscribe-popup').length) {
			const loginPopup = document.querySelector(".subscribe-popup");
			const close = document.querySelector(".close");
			
			window.addEventListener("load",function(){
			 showPopup();
			})
			function showPopup(){
					const timeLimit = 5
					let i=0;
					const timer = setInterval(function(){
					 i++;
					 if(i == timeLimit){
					clearInterval(timer);
					loginPopup.classList.add("show");
					 } 
					 console.log(i)
					},500);
			}
			close.addEventListener("click",function(){
				loginPopup.classList.remove("show");
			})
		}

		///////////////////////////////////////////////////
		// 23. Sticky Header Js
		windowOn.on('scroll', function () {
			var scroll = windowOn.scrollTop();
			if (scroll < 20) {
				$("#header-sticky").removeClass("header-sticky");
			} else {
				$("#header-sticky").addClass("header-sticky");
			}
		});

		////////////////////////////////////////////////////
		// 24. PreLoader Js	

		$('.preloader__logo img').addClass('logo-blink');

		(function(){
			function id(v){ return document.getElementById(v); }
			function loadbar() {
				var ovrl = id("loading"),
					prog = id("tp-loading-line"),
					img = document.images,
					c = 0,
					tot = img.length;
				if(tot == 0) return doneLoading();
			
				function imgLoaded(){
				c += 1;
				var perc = ((100/tot*c) << 0) +"%";
				prog.style.width = perc;

				if(c===tot) return doneLoading();
				}
				function doneLoading(){
				
				setTimeout(function(){ 
					$("#loading").fadeOut(500);
				}, 100);
				}
				for(var i=0; i<tot; i++) {
				var tImg     = new Image();
				tImg.onload  = imgLoaded;
				tImg.onerror = imgLoaded;
				tImg.src     = img[i].src;
				}    
			}
			document.addEventListener('DOMContentLoaded', loadbar, false);
			}());


		///////////////////////////////////////////////////
		// 25. text-animetion-jsap
		if ($('.tp-title-anim').length > 0) {
			let splitTitleLines = gsap.utils.toArray(".tp-title-anim");
			splitTitleLines.forEach(splitTextLine => {
				const tl = gsap.timeline({
				scrollTrigger: {
					trigger: splitTextLine,
					start: 'top 90%',
					end: 'bottom 60%',
					scrub: false,
					markers: false,
					toggleActions: 'play none none none'
				}
				});
	
				const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
				gsap.set(splitTextLine, { perspective: 300});
				itemSplitted.split({ type: "lines" })
				tl.from(itemSplitted.lines, { duration: 1, delay: 0.3, opacity: 0, rotationX: -50, force3D: true, transformOrigin: "top center -50", stagger: 0.2 });
			});	
		}

		///////////////////////////////////////////////////
		// 26. tp-char-animation
		if ($('.tp-char-animation').length > 0) {
			let char_come = gsap.utils.toArray(".tp-char-animation");
			char_come.forEach(splitTextLine => {
				const tl = gsap.timeline({
				scrollTrigger: {
					trigger: splitTextLine,
					start: 'top 90%',
					end: 'bottom 60%',
					scrub: false,
					markers: false,
					toggleActions: 'play none none none'
				}
				});
	
				const itemSplitted = new SplitText(splitTextLine, { type: "chars, words" });
				gsap.set(splitTextLine, { perspective: 300});
				itemSplitted.split({ type: "chars, words"})
				tl.from(itemSplitted.chars, 
					{
						duration: 0.5,
						x: 100,
						autoAlpha: 0,
						stagger: 0.05 
					});
			});	
		}

		///////////////////////////////////////////////////
		// 27. tp_fade_bottom
		if ($('.tp_fade_bottom').length > 0) {
			gsap.set(".tp_fade_bottom", { y: 100, opacity: 0 });
			const fadeArray = gsap.utils.toArray(".tp_fade_bottom")
			fadeArray.forEach((item, i) => {
				let fadeTl = gsap.timeline({
					scrollTrigger: {
						trigger: item,
						start: "top center+=400",
					}
				})
				fadeTl.to(item, {
					y: 0,
					opacity: 1,
					ease: "power2.out",
					duration: 1.5,
				})
			})
		}

		///////////////////////////////////////////////////
		// 28. tp-zoom-img
		let zm = gsap.matchMedia();
		zm.add("(min-width: 1200px)", () => {
			if ($('.tp-hero-area').length > 0) {
				// Testimonial 3 Image Animation
				gsap.set(".tp-zoom-img", { scale: 0, opacity: 0 });
	
				gsap.to(".tp-zoom-img", {
					scrollTrigger: {
						trigger: ".tp-zoom-img",
						start: "center center",
						markers: false
					},
					duration: 1,
					ease: "none",
					scale: 1,
					opacity: 1,
				})
	
			}
		});

		///////////////////////////////////////////////////
		// 29. slider-range

		$("#slider-range").slider({
			range: true,
			min: 0,
			max: 1200,
			values: [80, 700],
			slide: function (event, ui) {
				$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
			}
		});
		$("#amount").val("$" + $("#slider-range").slider("values", 0) +
			" - $" + $("#slider-range").slider("values", 1));

		////////////////////////////////////////////////////
		// 30. Show Login Toggle Js
		$('.tp-checkout-login-form-reveal-btn').on('click', function () {
			$('#tpReturnCustomerLoginForm').slideToggle(400);
		});

		////////////////////////////////////////////////////
		// 31. Show Coupon Toggle Js
		$('.tp-checkout-coupon-form-reveal-btn').on('click', function () {
			$('#tpCheckoutCouponForm').slideToggle(400);
		});


	////////////////////////////////////////////////////
	// 32. Password Toggle Js
		if ($('#password-show-toggle').length > 0) {
			var btn = document.getElementById('password-show-toggle');

			btn.addEventListener('click', function (e) {

				var inputType = document.getElementById('tp_password');
				var openEye = document.getElementById('open-eye');
				var closeEye = document.getElementById('close-eye');

				if (inputType.type === "password") {
					inputType.type = "text";
					openEye.style.display = 'block';
					closeEye.style.display = 'none';
				} else {
					inputType.type = "password";
					openEye.style.display = 'none';
					closeEye.style.display = 'block';
				}
			});
		}

	////////////////////////////////////////////////////
	// 33. Password Toggle Js
	function scrollNav() {
		$('.tp-onepage-menu li a').click(function(){
		  $(".tp-onepage-menu li a.active").removeClass("active");     
		  $(this).addClass("active");
		  
		  $('html, body').stop().animate({
			scrollTop: $($(this).attr('href')).offset().top - 96
		  }, 300);
		  return false;
		});
	  }
	scrollNav();

})(jQuery);
