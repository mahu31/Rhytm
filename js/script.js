let burgerMenu = document.querySelector('.header__burger');
let menuList = document.querySelector('.header__menu');
let wrapper = document.querySelector('.wrapper');

burgerMenu.addEventListener('click', function (event) {
	burgerMenu.classList.toggle('active');
	menuList.classList.toggle('active');
	wrapper.classList.toggle('active');
});

let isMobile = {
	Android: function() {return navigator.userAgent.match(/Android/i);},
	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};

let body = document.querySelector('body');

if (isMobile.any()) {
	body.classList.add('touch');

	
	let arrow = document.querySelectorAll('.arrow');
	for (i = 0; i < arrow.length; i++) {
		let submenu = arrow[i].nextElementSibling;
		let thisArrow = arrow[i];
		let thisTitle = arrow[i].previousElementSibling;
		arrow[i].addEventListener('click', function openSpoiler(){
			submenu.classList.toggle('open');
			thisArrow.classList.toggle('active')
		});
		thisTitle.addEventListener('click', function openSpoiler() {
			submenu.classList.toggle('open');
			thisArrow.classList.toggle('active')
		})
	}
};

const lazyImages = document.querySelectorAll('img[data-src]');
const windowHeight = document.documentElement.clientHeight;

let lazyImagesPosition = [];
if (lazyImages.length > 0) {
	lazyImages.forEach(img => {
		if (img.dataset.src) {
			lazyImagesPosition.push(img.getBoundingClientRect().top + pageYOffset);
			lazyScrollCheck();
		}
	})
};

window.addEventListener('scroll', lazyScroll);

function lazyScroll() {
	if (document.querySelectorAll('img[data-src]').length > 0) {
		lazyScrollCheck()
	}
}

function lazyScrollCheck() {
	let imgIndex = lazyImagesPosition.findIndex(
		item => {pageYOffset > item - windowHeight}
		);
	if (imgIndex >= 0) {
		if (lazyImages[imgIndex].dataset.src) {
			lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
			lazyImages[imgIndex].removeAttribute('data-src');
		}
		delete lazyImagesPosition[imgIndex];
	}
};

