function modal(selectorModal, selectorButton) {
  // Кнопка открытия модального окна
  const openModal = document.querySelectorAll(selectorButton);

  // Элементы модального окна
  const modal = document.querySelector(selectorModal);
  if (modal && openModal) {
    const modalBody = modal.querySelector('.modal__body');
    const closeModal = modal.querySelector('.modal__btn');

    let clientWidth = document.documentElement.clientWidth;

    // Функция удаляет класс open
    function delClassOpen() {
      modal.classList.remove('open');
      modalBody.classList.remove('open');
    }

    // Возвращаем прокрутку и убираем padding-right
    function scrollShow() {
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '';
      document.querySelector('html').style.overflowY = '';
    }

    // Открытие модального окна
    openModal.forEach(item => {
      item.addEventListener('click', function () {
        modal.classList.add('open');
        modalBody.classList.add('open');

        // Убираем прокрутку с body и добавляем padding-right
        document.body.style.overflowY = 'hidden';
        document.querySelector('html').style.overflowY = 'hidden';
        let scrollWidth = document.documentElement.clientWidth - clientWidth;
        document.body.style.paddingRight = `${scrollWidth}px`;
      });
    });

    // Закрытие модального окна по нажатию на крестик
    closeModal.addEventListener('click', function () {
      delClassOpen();

      scrollShow();
    });

    // Закрытие модального окна по клику вне окна
    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        delClassOpen();

        scrollShow();
      }
    });

    // Закрытие по нажатию клавиши Esc
    document.addEventListener('keydown', function (e) {
      if (e.code === 'Escape') {
        delClassOpen();

        scrollShow();
      }
    });
  }
}

// Первый аргумент - селектор модального окна, второй - селектор кнопки открытия
// Открывает модалку с регистрацией и авторизацией
modal('.modal-register', '.header-top__btn-login');

// Переключает формы регистрации и авторизации
(function () {
  const btnList = document.querySelectorAll('.register-content__btn');
  const formList = document.querySelectorAll('.register-form');
  const btnOpenLogin = document.querySelector('.register-form__btn-open-login');
  const btnOpenRegister = document.querySelector(
    '.register-form__btn-open-register'
  );

  if (!btnOpenLogin) return;

  function openForm(index) {
    btnList.forEach(btn => btn.classList.remove('active'));
    formList.forEach(form => form.classList.remove('active'));
    btnList[index].classList.add('active');
    formList[index].classList.add('active');
  }

  btnList.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      openForm(i);
    });
  });

  btnOpenLogin.addEventListener('click', () => openForm(1));
  btnOpenRegister.addEventListener('click', () => openForm(0));
})();

// Открывает модалку "Заказать обратный звонок"
modal('.modal-callback', '.header-top__btn--phone');

// Маска телефона
import Inputmask from '../../../node_modules/inputmask/dist/inputmask.es6.js';

let inputsTel = document.querySelectorAll('input[type="tel"]');
// let im = new Inputmask('+7 (999) 999-99-99', { showMaskOnHover: false });
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputsTel);
