function accordion(selector, options) {
  const accordion =
    typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!accordion) return;
  const accordionItem = accordion.querySelectorAll('.accordion__item');

  // Параметры по умолчанию
  const optionsDefault = {
    closeAll: true,
  };

  // Если options не является объектом, то присвоить ему пустой объект
  if (Object.prototype.toString.call(options) !== '[object Object]') {
    options = {};
  }

  // Слияние объектов
  options = Object.assign(optionsDefault, options);

  accordionItem.forEach(item => {
    const header = item.querySelector('.accordion__header');
    const body = item.querySelector('.accordion__body');
    header.addEventListener('click', () => {
      if (header.classList.contains('active')) {
        header.classList.remove('active');
        body.style.height = '';
      } else {
        if (options.closeAll) {
          closeAllItem();
        }
        header.classList.add('active');
        body.style.height = body.scrollHeight + 'px';
      }
    });
  });

  // Закрывает все item аккордеона
  function closeAllItem() {
    accordionItem.forEach(itemInner => {
      itemInner.querySelector('.accordion__header').classList.remove('active');
      itemInner.querySelector('.accordion__body').style.height = '';
    });
  }
}

// Параметр closeAll: если true, то при открытии одной части аккордеона закрывать все остальные, по умолчанию - true
accordion('.accordion-1', { closeAll: true });

// Range slider=======================================================================
import noUiSlider from 'nouislider';

(function () {
  const filterSlider = document.getElementById('filter-slider');
  if (!filterSlider) return;

  const priceInput = document.querySelectorAll('.form-filter__price-input');

  noUiSlider.create(filterSlider, {
    start: [749, 22499],
    connect: true,
    range: {
      min: 500,
      max: 30000,
    },
  });

  filterSlider.noUiSlider.on('update.one', function (value) {
    // priceInput[0].value = filterSlider.noUiSlider.get()[0];
    // priceInput[1].value = filterSlider.noUiSlider.get()[1];
    priceInput[0].value = Math.round(value[0]);
    priceInput[1].value = Math.round(value[1]);
  });

  priceInput[0].addEventListener('change', function () {
    filterSlider.noUiSlider.set([this.value, null]);
  });
  priceInput[1].addEventListener('change', function () {
    filterSlider.noUiSlider.set([null, this.value]);
  });
})();
