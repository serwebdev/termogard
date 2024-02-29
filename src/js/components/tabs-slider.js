import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

// tabs-slider==========================================
let swiperTabs;

const buttons = document.querySelectorAll('.tabs-slider__button');
const contents = document.querySelectorAll('.tabs-slider__content');

initTabsSlider(document.querySelectorAll('.tabs-slider__content')[0]);

buttons.forEach(function (item, index) {
  item.addEventListener('click', function () {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('active');
      contents[i].classList.remove('active');
    }

    item.classList.add('active');
    contents[index].classList.add('active');

    initTabsSlider(contents[index]);
  });
});

function initTabsSlider(contentItem) {
  if (!contentItem) return;
  swiperTabs = new Swiper(contentItem.querySelector('.slider-tabs'), {
    modules: [Navigation],

    // Optional parameters
    // slidesPerView: 4,
    loop: true,
    spaceBetween: 40,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      550: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1400: {
        slidesPerView: 3.8,
        spaceBetween: 30,
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: '.tabs-slider .swiper-button-next',
      prevEl: '.tabs-slider .swiper-button-prev',
    },
  });
}
