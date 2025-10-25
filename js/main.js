document.addEventListener('DOMContentLoaded', function (event) {
	gsap.registerPlugin(ScrollTrigger, SplitText);

	gsap.set('h1', { opacity: 1 });

	let split = SplitText.create('#heading', { type: 'chars' });
	gsap.from(split.chars, {
		y: 24,
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
	if (window.innerWidth > 986) {
		const swiper = new Swiper('.mySwiper', {
			direction: 'vertical',
			mousewheel: true,
			speed: 800,
			keyboard: { enabled: true },
			loop: true,
			on: {
				slideChange: function () {
					const snowflake = document.querySelector('.snowflake');
					if (snowflake) {
						gsap.to(snowflake, {
							y: this.activeIndex * 185,
							duration: 0.8,
							ease: 'power2.out',
						});
					}
				},
			},
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
	const starCount = 14;

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

	//tabs:
	const gifts = document.querySelectorAll('.gift-wrapper');
	const title = document.getElementById('gift-title');
	const desc = document.getElementById('gift-desc');
	const image = document.getElementById('gift-image');
	const rightSection = document.querySelector('.right');

	const giftData = {
		1: {
			title: 'Best sock ever',
			desc: 'Regular sock have no present inside. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
			image: 'images/new-year-sock.png',
		},
		2: {
			title: 'Amazing Hat',
			desc: 'This hat brings holiday cheer. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
			image: 'images/caps.png',
		},
		3: {
			title: 'Festive Bag',
			desc: 'Perfect for gifts. Lorem Ipsum is simply dummy text of the printing and typesetting industry. More text here.',
			image: 'images/new-year-bag.png',
		},
	};

	title.textContent = giftData[1].title;
	desc.textContent = giftData[1].desc;
	image.src = giftData[1].image;
	image.alt = giftData[1].title;

	gifts.forEach(gift => {
		gift.addEventListener('click', function () {
			gifts.forEach(g => g.classList.remove('active'));
			this.classList.add('active');
			const id = this.dataset.id;

			gsap.to(rightSection, {
				opacity: 0,
				scale: 0.95,
				duration: 0.3,
				onComplete: () => {
					title.textContent = giftData[id].title;
					desc.textContent = giftData[id].desc;
					image.src = giftData[id].image;
					image.alt = giftData[id].title;
					gsap.fromTo(
						rightSection,
						{ opacity: 0, scale: 0.95 },
						{ opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' },
					);
				},
			});
		});
	});

	//select
	const customGenderSelects = document.querySelectorAll('.custom-gender-select');

	customGenderSelects.forEach(selectContainer => {
		const toggle = selectContainer.querySelector('.gender-select-toggle');
		const popup = selectContainer.querySelector('.gender-select-popup');
		const options = popup.querySelectorAll('.gender-option');

		let selectedValue = '';
		const defaultPlaceholder = 'Gender';

		toggle.textContent = defaultPlaceholder;

		const clearOptionSelection = () => {
			options.forEach(option => option.classList.remove('selected'));
		};

		toggle.addEventListener('click', e => {
			e.stopPropagation();

			selectContainer.classList.toggle('open');
			toggle.classList.toggle('active');

			if (selectContainer.classList.contains('open')) {
				clearOptionSelection();
				if (selectedValue) {
					const currentSelectedOption = popup.querySelector(
						`.gender-option[data-value="${selectedValue}"]`,
					);
					if (currentSelectedOption) {
						currentSelectedOption.classList.add('selected');
					}
				}
			}
		});

		toggle.addEventListener('focus', () => {
			toggle.classList.add('active');
		});

		toggle.addEventListener('blur', () => {
			if (!selectContainer.classList.contains('open')) {
				toggle.classList.remove('active');
				if (!selectedValue) {
					toggle.textContent = defaultPlaceholder;
				}
			}
		});

		options.forEach(option => {
			option.addEventListener('click', e => {
				e.stopPropagation();

				clearOptionSelection();
				option.classList.add('selected');

				toggle.textContent = option.textContent;
				selectedValue = option.dataset.value;

				selectContainer.classList.remove('open');
				toggle.classList.remove('active');
				toggle.focus();
			});
		});

		document.addEventListener('click', e => {
			if (!selectContainer.contains(e.target)) {
				selectContainer.classList.remove('open');
				toggle.classList.remove('active');
				if (!selectedValue) {
					toggle.textContent = defaultPlaceholder;
				}
			}
		});
	});
});
