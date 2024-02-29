// Функция переносит элемент из одного блока в другой при пересечении брейкпоинта (media query)
function transferElement(options) {
  const { element, breakpoint, whenDown, whenUp } = options;

  const mediaQueryList = window.matchMedia(`(max-width: ${breakpoint}px)`);
  const elem = document.querySelector(element);
  const elemDown = document.querySelector(whenDown.elementTo);
  const elemUp = document.querySelector(whenUp.elementTo);

  if (!elem || !elemDown || !elemUp) return;

  // Функция сработает при загрузке
  handleMediaQuery(mediaQueryList);

  function handleMediaQuery(e) {
    if (e.matches) {
      // console.log('Меньше');
      moveElement(elem, elemDown, whenDown.method);
    } else {
      // console.log('Больше');
      moveElement(elem, elemUp, whenUp.method);
    }
  }

  // Срабатывает каждый раз при пересечении брейкпоинта
  mediaQueryList.addEventListener('change', handleMediaQuery);

  // Переносит элемент выбранным методом
  function moveElement(el, elTo, placeTo) {
    if (placeTo === 'append') {
      elTo.append(el);
    } else if (placeTo === 'prepend') {
      elTo.prepend(el);
    } else if (placeTo === 'before') {
      elTo.before(el);
    } else if (placeTo === 'after') {
      elTo.after(el);
    }
  }
}

// menu-right===========================================================
transferElement({
  element: '.menu-right__list',
  breakpoint: 1600,
  whenDown: {
    elementTo: '.menu-left__nav',
    // append, prepend, before, after
    method: 'append',
  },
  whenUp: {
    elementTo: '.menu-right',
    // append, prepend, before, after
    method: 'append',
  },
});

// search modile===========================================================
transferElement({
  element: '.search-form',
  breakpoint: 950,
  whenDown: {
    elementTo: '.header__bottom-mobile',
    // append, prepend, before, after
    method: 'append',
  },
  whenUp: {
    elementTo: '.search-form-wrap',
    // append, prepend, before, after
    method: 'prepend',
  },
});

// header phone ===========================================================
transferElement({
  element: '.header-top__phone',
  breakpoint: 1100,
  whenDown: {
    elementTo: '.menu-right__list',
    // append, prepend, before, after
    method: 'after',
  },
  whenUp: {
    elementTo: '.header-top__btn--phone',
    // append, prepend, before, after
    method: 'after',
  },
});

// header email ===========================================================
transferElement({
  element: '.header-top__email',
  breakpoint: 1100,
  whenDown: {
    elementTo: '.header-top__phone',
    // append, prepend, before, after
    method: 'after',
  },
  whenUp: {
    elementTo: '.header-top__btn--email',
    // append, prepend, before, after
    method: 'after',
  },
});
