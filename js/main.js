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

	const headerWrapper = document.querySelector('.header__wrapper');
	burger.addEventListener('click', () => {
		setTimeout(() => {
			headerWrapper.classList.toggle('open');
		}, 300);
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
	setTimeout(() => {
		const cloud = document.querySelector('.cloud');
		cloud.classList.add('visible');
	}, 3000);

	//stars
	const container = document.querySelector('.stars');
	const starCount = 15;

	const svgStar = `
    <svg class="star" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
    </svg>
  `;

	const stars = [];

	for (let i = 0; i < starCount; i++) {
		const wrapper = document.createElement('div');
		wrapper.innerHTML = svgStar.trim();
		const s = wrapper.querySelector('.star');

		if (!s) continue;

		s.style.position = 'absolute';
		s.style.left = `${Math.random() * 100}%`;
		s.style.top = `${Math.random() * 100}%`;
		s.style.width = '15px';
		s.style.height = '15px';

		container.appendChild(s);
		stars.push(s);
	}

	gsap.to(stars, {
		opacity: 0.2,
		duration: 1,
		repeat: -1,
		yoyo: true,
		ease: 'sine.inOut',
	});
});
