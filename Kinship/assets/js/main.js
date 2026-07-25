(function ($) {
	"use strict";

	// meanmenu
	$('#mobile-menu').meanmenu({
		meanMenuContainer: '.mobile-menu',
		meanScreenWidth: "992"
	});

	// sticky
	var wind = $(window);
	var sticky = $('#sticky-header');
	wind.on('scroll', function () {
		var scroll = wind.scrollTop();
		if (scroll < 100) {
			sticky.removeClass('sticky');
		} else {
			sticky.addClass('sticky');
		}
	});

	// 4. Custom BackGround 
	$("[data-background]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
	});


	// mainSlider
	function mainSlider() {
		var BasicSlider = $('.slider-active');
		if (!BasicSlider.length || typeof $.fn.slick === 'undefined') {
			return;
		}
		BasicSlider.on('init', function (e, slick) {
			var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
			doAnimations($firstAnimatingElements);
		});
		BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
			var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
			doAnimations($animatingElements);
		});
		BasicSlider.slick({
			autoplay: false,
			autoplaySpeed: 10000,
			dots: false,
			fade: true,
			arrows: true,
			prevArrow: '<button type="button" class="slick-prev"><i class="far fa-long-arrow-alt-left"></i></button>',
			nextArrow: '<button type="button" class="slick-next"><i class="far fa-long-arrow-alt-right"></i></button>',
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
					}
				}
			]
		});

		function doAnimations(elements) {
			var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			elements.each(function () {
				var $this = $(this);
				var $animationDelay = $this.data('delay');
				var $animationType = 'animated ' + $this.data('animation');
				$this.css({
					'animation-delay': $animationDelay,
					'-webkit-animation-delay': $animationDelay
				});
				$this.addClass($animationType).one(animationEndEvents, function () {
					$this.removeClass($animationType);
				});
			});
		}
	}
	mainSlider();


	// services - active
	if ($('.services-active').length && typeof $.fn.slick !== 'undefined') {
		$('.services-active').slick({
			dots: true,
			arrows: true,
			infinite: true,
			speed: 300,
			prevArrow: '<button type="button" class="slick-prev"><i class="far fa-long-arrow-alt-left"></i></button>',
			nextArrow: '<button type="button" class="slick-next"><i class="far fa-long-arrow-alt-right"></i></button>',
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true,
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						arrows: false,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
					}
				}
			]
		});
	}

	// test active
	if ($('.testimonia-item-active').length && $('.testimonial-nav').length && typeof $.fn.slick !== 'undefined') {
		$('.testimonia-item-active').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			fade: true,
			dots: true,
			prevArrow: '<button type="button" class="slick-prev"><i class="far fa-long-arrow-alt-left"></i></button>',
			nextArrow: '<button type="button" class="slick-next"><i class="far fa-long-arrow-alt-right"></i></button>',
			asNavFor: '.testimonial-nav'
		});
		$('.testimonial-nav').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: '.testimonia-item-active',
			dots: false,
			arrows: false,
			prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
			nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
			centerMode: true,
			focusOnSelect: true,
			centerPadding: 0
		});
	}



	/* counter */
	if ($('.counter').length && typeof $.fn.counterUp !== 'undefined') {
		$('.counter').counterUp({
			delay: 10,
			time: 1000
		});
	}

	// scrollToTop
	$.scrollUp({
		scrollName: 'scrollUp', // Element ID
		topDistance: '300', // Distance from top before showing element (px)
		topSpeed: 300, // Speed back to top (ms)
		animation: 'fade', // Fade, slide, none
		animationInSpeed: 200, // Animation in speed (ms)
		animationOutSpeed: 200, // Animation out speed (ms)
		scrollText: '<i class="fas fa-level-up-alt"></i>', // Text for element
		activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	});

	$(document).ready(function(){
		var owlCarousel = $(".owl-carousel");
		if (owlCarousel.length && typeof $.fn.owlCarousel !== 'undefined') {
			owlCarousel.owlCarousel({
				items: 1,           // 1 image at a time
				loop: true,         // infinite loop
				autoplay: true,     // auto slide
				autoplayTimeout: 1500, // 1.5 seconds
				autoplayHoverPause: true, // pause when mouse over
				dots: true          // bottom dots
			});
		}
	});


})(jQuery);

(function () {
	"use strict";

	var lightbox = document.getElementById('gallery-lightbox');
	if (!lightbox) {
		return;
	}

	var triggers = Array.prototype.slice.call(
		document.querySelectorAll('[data-gallery-image], .our-events-details-img')
	);
	var lightboxImage = lightbox.querySelector('.gallery-lightbox-image');
	var closeButton = lightbox.querySelector('.gallery-lightbox-close');
	var previousButton = lightbox.querySelector('[data-gallery-prev]');
	var nextButton = lightbox.querySelector('[data-gallery-next]');
	var currentIndex = 0;
	var lastFocused = null;
	var pointerStartX = null;

	var items = triggers.map(function (trigger, index) {
		var image = trigger.querySelector('img');
		var title = image && image.getAttribute('alt')
			? image.getAttribute('alt')
			: 'Kinship gallery image ' + (index + 1);

		if (!trigger.hasAttribute('data-gallery-image')) {
			trigger.setAttribute('role', 'button');
			trigger.setAttribute('tabindex', '0');
			trigger.setAttribute('aria-label', 'Open ' + title);
		}

		return {
			src: trigger.getAttribute('data-gallery-image') || image.getAttribute('src'),
			title: title
		};
	});

	function showImage(index) {
		currentIndex = (index + items.length) % items.length;
		lightboxImage.src = items[currentIndex].src;
		lightboxImage.alt = items[currentIndex].title;

		var preload = new Image();
		preload.src = items[(currentIndex + 1) % items.length].src;
	}

	function openLightbox(index) {
		lastFocused = document.activeElement;
		showImage(index);
		lightbox.hidden = false;
		document.body.classList.add('gallery-lightbox-open');
		closeButton.focus();
	}

	function closeLightbox() {
		lightbox.hidden = true;
		document.body.classList.remove('gallery-lightbox-open');
		lightboxImage.removeAttribute('src');
		if (lastFocused && typeof lastFocused.focus === 'function') {
			lastFocused.focus();
		}
	}

	triggers.forEach(function (trigger, index) {
		trigger.addEventListener('click', function (event) {
			event.preventDefault();
			openLightbox(index);
		});

		if (trigger.getAttribute('role') === 'button' && trigger.tagName !== 'BUTTON') {
			trigger.addEventListener('keydown', function (event) {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					openLightbox(index);
				}
			});
		}
	});

	lightbox.querySelectorAll('[data-gallery-close]').forEach(function (element) {
		element.addEventListener('click', closeLightbox);
	});

	previousButton.addEventListener('click', function () {
		showImage(currentIndex - 1);
	});

	nextButton.addEventListener('click', function () {
		showImage(currentIndex + 1);
	});

	lightbox.addEventListener('pointerdown', function (event) {
		pointerStartX = event.clientX;
	});

	lightbox.addEventListener('pointerup', function (event) {
		if (pointerStartX === null) {
			return;
		}

		var distance = event.clientX - pointerStartX;
		pointerStartX = null;

		if (Math.abs(distance) < 55) {
			return;
		}

		showImage(currentIndex + (distance < 0 ? 1 : -1));
	});

	document.addEventListener('keydown', function (event) {
		if (lightbox.hidden) {
			return;
		}

		if (event.key === 'Escape') {
			closeLightbox();
		} else if (event.key === 'ArrowLeft') {
			showImage(currentIndex - 1);
		} else if (event.key === 'ArrowRight') {
			showImage(currentIndex + 1);
		} else if (event.key === 'Tab') {
			var controls = [closeButton, previousButton, nextButton];
			var focusedIndex = controls.indexOf(document.activeElement);
			var direction = event.shiftKey ? -1 : 1;

			if (focusedIndex !== -1) {
				event.preventDefault();
				controls[(focusedIndex + direction + controls.length) % controls.length].focus();
			}
		}
	});
})();
