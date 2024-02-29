import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, Thumbs } from 'swiper/modules';

// hero-slider==============================================================
const swiper1 = new Swiper('.hero-slider', {
  modules: [Navigation],

  // Optional parameters
  slidesPerView: 1,
  loop: true,
  spaceBetween: 30,

  // breakpoints: {
  //   // when window width is >= 320px
  //   320: {
  //     slidesPerView: 1,
  //     spaceBetween: 20,
  //   },
  //   768: {
  //     slidesPerView: 2,
  //     spaceBetween: 20,
  //   },
  //   992: {
  //     slidesPerView: 3,
  //     spaceBetween: 30,
  //   },
  //   1400: {
  //     slidesPerView: 4,
  //     spaceBetween: 30,
  //   },
  // },

  // If we need pagination
  // pagination: {
  //   el: '.swiper-pagination',
  //   clickable: true,
  // },

  // Navigation arrows
  navigation: {
    nextEl: '.hero-slider-wrap .swiper-button-next',
    prevEl: '.hero-slider-wrap .swiper-button-prev',
  },

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  //   draggable: true,
  // },
});

// slider-details-thumb==============================================================
const swiperDetailsThumb = new Swiper('.slider-details-thumb', {
  modules: [Navigation, Thumbs],

  // Optional parameters
  slidesPerView: 4,
  loop: false,
  spaceBetween: 15,
  direction: 'vertical',

  watchSlidesProgress: true,

  // freeMode: true,
  // mousewheel: true,

  breakpoints: {
    0: {
      // при 0px и выше
      direction: 'horizontal', // горизонтальная прокрутка
      spaceBetween: 10,
      slidesPerView: 3,
    },
    450: {
      direction: 'horizontal',
      slidesPerView: 4,
    },
    768: {
      // при 768px и выше
      direction: 'vertical', // вертикальная прокрутка
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: '.slider-details-thumb-container .swiper-button-next',
    prevEl: '.slider-details-thumb-container .swiper-button-prev',
  },
});

// slider-details==============================================================
const swiperDetails = new Swiper('.slider-details', {
  modules: [Navigation, Thumbs],

  // Optional parameters
  slidesPerView: 1,
  loop: false,
  spaceBetween: 30,

  thumbs: {
    swiper: swiperDetailsThumb,
  },

  // breakpoints: {
  //   // when window width is >= 320px
  //   320: {
  //     slidesPerView: 1,
  //     spaceBetween: 20,
  //   },
  //   768: {
  //     slidesPerView: 2,
  //     spaceBetween: 20,
  //   },
  //   992: {
  //     slidesPerView: 3,
  //     spaceBetween: 30,
  //   },
  //   1400: {
  //     slidesPerView: 4,
  //     spaceBetween: 30,
  //   },
  // },
});

// swiperDetailsThumb.on('slideChange', function () {
//   //   console.log('swiperCarThumb:', this.realIndex);
//   swiperDetails.slideTo(swiperDetailsThumb.realIndex);
//   // swiperCar.slideTo(swiperCarThumb.activeIndex);
// });

// swiperDetailsThumb.on('click', function () {
//   //   console.log('swiperCarThumb:', this.realIndex);
//   swiperDetails.slideTo(swiperDetailsThumb.realIndex);
//   // swiperCar.slideTo(swiperCarThumb.activeIndex);
// });
