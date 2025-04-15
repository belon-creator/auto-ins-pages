(function () {
  emailjs.init('UnYD9yT3mhsjyhkPo'); // Замініть на ваш Public Key
})();
const thankYouPageURL =
  'https://auto-ins.com.ua/pages/dyakuyemo-za-zamovlennya/';

// Додати обробник подій для кнопок "Оформити"
const orderButtons = document.querySelectorAll('.order-btn');
orderButtons.forEach(button => {
  button.addEventListener('click', function () {
    console.log('Button clicked'); // Логування

    // Отримати назву продукту з data атрибуту
    const productName = this.getAttribute('data-product');
    document.getElementById('product-name').innerText = productName;

    console.log('Data Product Attribute:', productName); // Логування

    // Показати форму та оверлей
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.form-container').style.display = 'block';
  });
});

// Отримання елементу форми один раз
const orderForm = document.getElementById('order-form');

// Обробка події відправлення форми
orderForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Зупинити стандартну поведінку форми

  // Отримання даних з форми
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const comments = document.getElementById('comments').value;
  const productName = document.getElementById('product-name').innerText;

  // Валідація номера телефону
  const phonePattern = /^\+380\d{9}$/;
  if (!phonePattern.test(phone)) {
    alert('Введіть номер у форматі +380XXXXXXXXX');
    return; // Зупинити відправку, якщо номер невірний
  }

  const templateParams = {
    user_name: name,
    user_phone: phone,
    product_name: productName,
    user_comments: comments,
  };

  // Логування перед відправкою
  console.log('Template Params:', templateParams);

  emailjs
    .send('service_k4tag2s', 'template_anu6odh', templateParams) // Замініть на ваші Service ID та Template ID
    .then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
        // alert("Ваше замовлення прийнято! Ми зв'яжемося з вами найближчим часом.");
        window.location.href = thankYouPageURL;

        // Очищення полів після успішної відправки
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('comments').value = '';
        document.querySelector('.overlay').style.display = 'none'; // Сховати оверлей
        document.querySelector('.form-container').style.display = 'none'; // Сховати форму
      },
      function (error) {
        console.log('FAILED...', error);
        alert(
          'Виникла помилка при відправці замовлення. Будь ласка, спробуйте пізніше.',
        );
      },
    );
});

// ==============================================

const phoneInput = document.getElementById('phone');

// Заборона видалення префіксу +380
phoneInput.addEventListener('input', function () {
  if (!this.value.startsWith('+380')) {
    this.value = '+380';
  }
});

// відправка в гугл док
// document.addEventListener('DOMContentLoaded', function () {
//   const overlay = document.querySelector('.overlay');
//   const formContainer = document.querySelector('.form-container');
//   const closeFormButton = document.querySelector('#close-form');
//   const form = document.getElementById('order-form');
//   const nameInput = document.getElementById('name');
//   const phoneInput = document.getElementById('phone');
//   const commentInput = document.getElementById('comments');
//   const submitButton = document.querySelector('.submit-kasko-btn');
//   const productName = document.getElementById('product-name');
//   const webAppUrl =
//     'https://script.google.com/macros/s/AKfycbzBgDLTj0-UiiwRdu_P2W9Od_KmrKa3nRFBS6DAQtBidwIN_qR851wh2VujIQ8pCw1r7A/exec';

//   document.querySelectorAll('.order-btn').forEach(button => {
//     button.addEventListener('click', function () {
//       const product = this.getAttribute('data-product');
//       productName.innerText = product;
//       overlay.style.display = 'block';
//       formContainer.style.display = 'block';
//     });
//   });

//   function closeForm() {
//     overlay.style.display = 'none';
//     formContainer.style.display = 'none';
//     form.reset();
//     phoneInput.value = '+380';
//   }

//   overlay.addEventListener('click', closeForm);
//   closeFormButton.addEventListener('click', closeForm);

//   phoneInput.addEventListener('input', function () {
//     if (!this.value.startsWith('+380')) {
//       this.value = '+380';
//     }
//   });

//   function toggleSubmitButton() {
//     submitButton.disabled = !(
//       nameInput.value.trim() && phoneInput.value.length === 13
//     );
//   }

//   nameInput.addEventListener('input', toggleSubmitButton);
//   phoneInput.addEventListener('input', toggleSubmitButton);

//   form.addEventListener('submit', function (e) {
//     e.preventDefault();

//     const formData = {
//       name: nameInput.value,
//       phone: phoneInput.value,
//       product: productName.innerText,
//       comment: commentInput.value,
//     };

//     fetch(webAppUrl, {
//       method: 'POST',
//       body: JSON.stringify(formData),
//       headers: { 'Content-Type': 'application/json' },
//       mode: 'no-cors',
//     })
//       .then(() => {
//         console.log('Форма успішно відправлена!');
//         window.location.href =
//           'https://auto-ins.com.ua/pages/dyakuyemo-za-zamovlennya/';
//       })
//       .catch(error => {
//         console.error('Помилка:', error);
//         alert('Помилка підключення до сервера.');
//       });
//   });
// });
