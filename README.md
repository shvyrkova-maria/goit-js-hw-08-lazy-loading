# goit-js-hw-08-gallery

1. Создана и добавлена разметка по массиву данных и предоставленному шаблону.
2. Реализовано делегирование на галерее ul.js-gallery и получение url большого изображения.
3. Открытие модального окна по клику на элементе галереи.
4. Подмена значения атрибута src элемента img.lightbox\*\*image.
5. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
6. Очистка значения атрибута src элемента img.lightbox\*\*image. Это необходимо для того,
   чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

Дополнительно:

1. Закрытие модального окна по клику на div.lightbox\_\_overlay.
2. Закрытие модального окна по нажатию клавиши ESC.
3. Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
4. Пролистывание изображений галереи в открытом модальном окне кнопками "влево" и "вправо".
5. Ленивая загрузка. Использование атрибута loading = "lazy".
6. Ленивая загрзка. Использование библиотеки lazysizes.
7. Добавлен слушатель "beforeunload" на закрытие окна.
