// Добавляет класс active кнопке по клику, принимает селектор - node list
function addClassActive(selector) {
  const btnList = document.querySelectorAll(selector);
  if (!btnList.length) return;

  btnList.forEach(btn => {
    btn.addEventListener('click', () => {
      btnList.forEach(btn => btn.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// Выбор цвета
addClassActive('.card-details__color-item');
// Выбор размера
addClassActive('.card-details__size-item');
