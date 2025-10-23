document.addEventListener('DOMContentLoaded', function (event) {
	gsap.registerPlugin(ScrollTrigger, SplitText);

	gsap.set('h1', { opacity: 1 });

	let split = SplitText.create('#heading', { type: 'chars' });
	gsap.from(split.chars, {
		y: 20,
		autoAlpha: 0,
		stagger: 0.05,
	});

	gsap.to('.snowflake', {
		rotation: 360,
		duration: 20,
		repeat: -1,
		ease: 'linear',
		transformOrigin: '50% 50%',
	});

	const burger = document.getElementById('burger');
	const menuBg = document.getElementById('menu-bg');
	const menu = document.getElementById('menu');
	const menuLinks = menu.querySelectorAll('a');

	let menuOpen = false;

	const tl = gsap.timeline({ paused: true });

	tl.to(menuBg, {
		scaleX: 1,
		duration: 0.6,
		ease: 'power2.inOut',
	})
		.to(
			menu,
			{
				opacity: 1,
				pointerEvents: 'auto',
				duration: 0.3,
			},
			'-=0.2',
		)
		.to(
			menuLinks,
			{
				opacity: 1,
				y: 0,
				duration: 0.4,
				stagger: 0.1,
				ease: 'power2.out',
			},
			'-=0.1',
		);

	function toggleBurgerAnimation(isOpen) {
		const lines = burger.querySelectorAll('span');
		if (isOpen) {
			gsap.to(lines[0], { rotation: 45, y: 9, duration: 0.3 });
			gsap.to(lines[1], { opacity: 0, duration: 0.3 });
			gsap.to(lines[2], { rotation: -45, y: -9, duration: 0.3 });
		} else {
			gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3 });
			gsap.to(lines[1], { opacity: 1, duration: 0.3 });
			gsap.to(lines[2], { rotation: 0, y: 0, duration: 0.3 });
		}
	}

	burger.addEventListener('click', () => {
		menuOpen = !menuOpen;
		toggleBurgerAnimation(menuOpen);

		if (menuOpen) {
			tl.play();
		} else {
			tl.reverse();
		}
	});

	//swiper
	if (window.innerWidth > 768) {
		const swiper = new Swiper('.mySwiper', {
			direction: 'vertical',
			mousewheel: true,
			speed: 800,
			keyboard: { enabled: true },
		});
		document.querySelector('.scroll-down').addEventListener('click', () => {
			swiper.slideNext();
		});
	}

	//cloud
	const cloud = document.querySelector('.cloud');
	cloud.style.opacity = '0';
	cloud.style.transition = 'opacity 0.3s ease';
	setTimeout(() => {
		cloud.style.opacity = '1';
	}, 3000);
});
