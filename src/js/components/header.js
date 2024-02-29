(function () {
  const overlayForMenu = document.querySelector('.overlay-for-menu');
  const header = document.querySelector('.header');
  if (!header) return;

  // menu-left===========================================
  const menuLeft = document.querySelector('.menu-left');
  const menuLeftBtn = document.querySelector('.menu-left__btn');

  menuLeftBtn.addEventListener('click', () => {
    if (menuLeft.classList.contains('active')) {
      menuLeft.classList.remove('active');
      menuLeftBtn.classList.remove('active');
      overlayForMenu.classList.remove('active');
    } else {
      menuLeft.classList.add('active');
      menuLeftBtn.classList.add('active');
      overlayForMenu.classList.add('active');
    }
  });

  // Закрытие при клике по overlay
  window.addEventListener('click', function (e) {
    if (e.target === overlayForMenu) {
      menuLeft.classList.remove('active');
      menuLeftBtn.classList.remove('active');
      overlayForMenu.classList.remove('active');
    }
  });

  // search form====================================================
  const searchForm = document.querySelector('.search-form');
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
  });

  //menu-catalog===========================================================
  const searchFormBbtnWrap = document.querySelector('.search-form__btn-wrap');
  const searchFormBtn = document.querySelector('.search-form__btn');

  searchFormBtn.addEventListener('click', () => {
    if (searchFormBbtnWrap.classList.contains('active')) {
      searchFormBbtnWrap.classList.remove('active');
      overlayForMenu.classList.remove('active');
    } else {
      searchFormBbtnWrap.classList.add('active');
      overlayForMenu.classList.add('active');
    }
  });

  // Закрытие при клике по overlay
  window.addEventListener('click', function (e) {
    if (e.target === overlayForMenu) {
      searchFormBbtnWrap.classList.remove('active');
      overlayForMenu.classList.remove('active');
    }
  });
})();
