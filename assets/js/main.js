/*
	Template Name: SaasRiver - SaaS & StartUp HTML Template
	Author: https://themexriver.com/
	Version: 1.0
*/


(function ($) {
"use strict";


/* 
	windows-load-function
*/


window.addEventListener('load', function(){


	if (document.querySelectorAll(".el-preloader-1").length) {
		const loader = document.querySelector(".el-preloader-1");
		
		setTimeout(() => {
			loader.classList.add("loaded");
			afterPreloader();
		});
		setTimeout(function () {
			loader.remove();
		}, 1500);

	} else {
		afterPreloader();
	}

	afterPageLoad();

})




/* 
	after-preloader-start
*/
function afterPreloader() {


	/* 
		only-LTR-direction
	*/
	if (getComputedStyle(document.body).direction !== "rtl") {

		// section-title-1
		if($(".el_title_ani_1").length) {
			var el_title_ani_1 = $(".el_title_ani_1");
			if(el_title_ani_1.length == 0) return;
			gsap.registerPlugin(SplitText);

			el_title_ani_1.each(function(index, el) {

				el.split = new SplitText(el, { 
					type: "lines",
					linesClass: "split-line"
				});

				gsap.set(el, { perspective: 2000, transformStyle: "preserve-3d" });

				if( $(el).hasClass('el_title_ani_1') ){
					gsap.set(el.split.lines, {
						yPercent: 100,
						opacity: 0,
						rotationX: -100
					});
				}

				var splitDelay = parseFloat($(el).attr('data-split-delay')) || 0;

				el.anim = gsap.to(el.split.lines, {
					scrollTrigger: {
						trigger: el,
						start: "top 86%",
					},
					rotationX: 0,
					yPercent: 0,
					scaleX: 1,
					opacity: 1,
					duration: .4,
					stagger: 0.1,
					delay: splitDelay
				});

			});
		}




	}	


/* 
	after-preloader-end
*/
}



/* 
	after-page-load-start
*/
function afterPageLoad() {

	/* 
		add-active-class
	*/
	const waAddClass = gsap.utils.toArray('.wa_add_class');
	waAddClass.forEach(waAddClassItem => {
		gsap.to(waAddClassItem, {
			scrollTrigger: {
				trigger: waAddClassItem,
				start: "top 90%",
				end: "bottom bottom",
				toggleActions: "play none none reverse",
				toggleClass: "active",
				once: true,
				markers: false,
			}
		});
	});



	/* 
		wow-activation
	*/
	if($('.wow').length){
		var wow = new WOW({
			boxClass:     'wow',
			animateClass: 'animated',
			offset:       100,
			mobile:       true,
			live:         true
		});
		wow.init();
	};




		

/* 
	after-page-load-start
*/
}

// parallax-images
if ($(".wa_magnetic_1_trigger").length) {
    var waMagnets2v2 = document.querySelectorAll('.wa_magnetic_1_trigger');
    var waStrength2v2 = 30;

    waMagnets2v2.forEach((magnet) => {
        magnet.addEventListener('mousemove', moveMagnet2);
        magnet.addEventListener('mouseout', function(event) {
            const innerElements = event.currentTarget.querySelectorAll('.wa_magnetic_1_elm');
            innerElements.forEach((elm) => {
                gsap.to(elm, {
                    x: 0,
                    y: 0,
					scale: 1.05,
                    duration: 1,
                    ease: "ease1"
                });
            });
        });
    });

    function moveMagnet2(event) {
        var magnetButton = event.currentTarget;
        var bounding = magnetButton.getBoundingClientRect();
        const innerElements = magnetButton.querySelectorAll('.wa_magnetic_1_elm');

        const xMove = (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * waStrength2v2;
        const yMove = (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * waStrength2v2;

        innerElements.forEach((elm) => {
            gsap.to(elm, {
                x: xMove,
                y: yMove,
				scale: 1.05,
                duration: 1,
                ease: "ease1"
            });
        });
    }
}

// clients-1-slider
var el_clients1_slider = new Swiper(".el_clients1_slider", {
	loop: true,
	speed: 800,
	spaceBetween: 70,
	autoplay: { delay: 4000 },

	breakpoints: {
		320: {
		  slidesPerView: 2,
		},
		768: {
		  slidesPerView: 3,
		},
		992: {
		  slidesPerView: 4,
		},
		1200: {
		  slidesPerView: 6,
		}
	}
});




// about-1-card-animation
if (window.matchMedia("(min-width: 1200px)").matches) { 
	const about1tl = gsap.timeline({
		scrollTrigger: {
		  trigger: ".ag-about-1-card", 
		  start: "top 50%", 
		  toggleActions: "play none none reverse", 
		  markers: false 
		}
	  });
	
	  about1tl.from(".ag-about-1-card .has-ani:nth-of-type(1)", { 
		yPercent: 100,
		duration: .5
	  })
	
	  about1tl.from(".ag-about-1-card .has-ani:nth-of-type(2)", { 
		yPercent: -100,
		duration: .5
	  },"<")
}


// footer-2-big-title
if($(".el-footer-2-big-title").length) {
	function initElFooterTitleHover(selector) {
		const titleEl = document.querySelector(selector);
		if (!titleEl) return;
	
		const text = titleEl.textContent.trim();
		titleEl.innerHTML = text
		.split('')
		.map((char) => `<span class="el-letter">${char === ' ' ? '&nbsp;' : char}</span>`)
		.join('');
	
		const letters = titleEl.querySelectorAll('.el-letter');
	
		const yOffsets = [-50, -30, -15, -0,];
	
		let letterCenters = [];
	
		function cacheLetterPositions() {
		letterCenters = Array.from(letters).map((letter) => {
			const rect = letter.getBoundingClientRect();
			return rect.left + rect.width / 2;
		});
		}
	
		cacheLetterPositions();
		window.addEventListener('resize', cacheLetterPositions);
	
		titleEl.addEventListener('mousemove', (e) => {
		const mouseX = e.clientX;
		let activeIndex = 0;
		let minDist = Infinity;
	
		letterCenters.forEach((centerX, i) => {
			const dist = Math.abs(mouseX - centerX);
			if (dist < minDist) {
			minDist = dist;
			activeIndex = i;
			}
		});
	
		letters.forEach((letter, i) => {
			const distance = Math.abs(i - activeIndex);
			const yValue = distance < yOffsets.length ? yOffsets[distance] : 0;
	
			gsap.to(letter, {
			y: yValue,
			duration: 0.5,
			ease: 'power1.out',
			overwrite: 'auto',
			});
		});
		});
	
		titleEl.addEventListener('mouseleave', () => {
		gsap.to(letters, {
			y: 0,
			duration: 0.6,
			ease: 'power1.out',
			overwrite: 'auto',
		});
		});
	}
	
	document.addEventListener('DOMContentLoaded', () => {
		initElFooterTitleHover('.el-footer-2-big-title');
	});
}



// projects-3-slider
var el_p3_slider = new Swiper(".el_p3_slider", {
	loop: true,
	speed: 800,
	spaceBetween: 24,
	slidesPerView: 3,
	centeredSlides: true,
    roundLengths: true,

	// autoplay: { delay: 5000 },

	navigation: {
		nextEl: ".el_p3_slider_next",
		prevEl: ".el_p3_slider_prev",
	},
	pagination: {
        el: ".el_p3_slider_pagination",
        type: "fraction",
    },
	scrollbar: {
        el: ".el_p3_slider_fraction",
        hide: true,
    },

	breakpoints: {
		0: {
			slidesPerView: 1,
		},

		1400: {
			slidesPerView: 2,
		},

		1600: {
			slidesPerView: 2,
		},

		1800: {
			slidesPerView: 3,
		},
	}
	
});






})(jQuery);