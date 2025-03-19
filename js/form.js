// // Підключення EmailJS
// (function() {
//     emailjs.init("UnYD9yT3mhsjyhkPo"); // Замініть на ваш Public Key
// })();

// Додати обробник подій для кнопок "Оформити"
// const orderButtons = document.querySelectorAll('.order-btn');
// orderButtons.forEach(button => {
//     button.addEventListener('click', function() {

//         console.log("Button clicked"); // Логування

//         // Отримати назву продукту з data атрибуту
//         const productName = this.getAttribute('data-product');
//         document.getElementById("product-name").innerText = productName;

//         console.log("Data Product Attribute:", productName); // Логування

//         // Показати форму та оверлей
//         document.querySelector(".overlay").style.display = "block";
//         document.querySelector(".form-container").style.display = "block";

//     });
// });

// // Обробка події відправлення форми
// document.getElementById("order-form").addEventListener("submit", function (e) {
//     e.preventDefault(); // Зупинити стандартну поведінку форми

//     // Отримання даних з форми
//     const name = document.getElementById("name").value;
//     const phone = document.getElementById("phone").value;
//     const comments = document.getElementById("comments").value;
//     const productName = document.getElementById("product-name").innerText;

//     // Логування значення перед відправкою
//     console.log("Product Name перед відправкою:", productName); // Логування

//     // Дані для шаблону EmailJS
//     const templateParams = {
//         user_name: name,
//         user_phone: phone,
//         product_name: productName,
//         user_comments: comments
//     };

//     // Валідація номера

//     document.getElementById("order-form").addEventListener("submit", function (e) {
//         e.preventDefault();

//         const phone = document.getElementById("phone").value;
//         const phonePattern = /^\+380\d{9}$/;

//         if (!phonePattern.test(phone)) {
//             alert("Введіть номер у форматі +380XXXXXXXXX");
//             return; // Зупинити відправку форми, якщо номер невірний
//         }

//         // Далі виконується відправка форми або інші дії, якщо валідація пройшла успішно
//     });

//     // Логування перед відправкою
//     console.log("Template Params:", templateParams); // Логування

//     // Відправка листа через EmailJS
//     emailjs.send("service_k4tag2s", "template_anu6odh", templateParams)
//         .then(function(response) {
//             console.log("SUCCESS!", response.status, response.text);

//             setTimeout(() => {
//                 window.location.href = "https://auto-ins.com.ua/pages/dyakuyemo-za-zamovlennya/";
//             }, 500);

//             // Очищення полів після успішної відправки
//             document.getElementById("name").value = '';
//             document.getElementById("phone").value = '';
//             document.getElementById("comments").value = '';
//             document.querySelector(".overlay").style.display = "none"; // Сховати оверлей
//             document.querySelector(".form-container").style.display = "none"; // Сховати форму
//         }, function(error) {
//             console.error("Помилка:", error);
//             alert("Помилка надсилання. Спробуйте ще раз.");
//         });
// });

// // Додати функціонал для закриття форми
// document.getElementById("close-form").addEventListener("click", function() {
//     document.querySelector(".overlay").style.display = "none"; // Сховати оверлей
//     document.querySelector(".form-container").style.display = "none"; // Сховати форму
// });

// // Закриття форми при кліку на оверлей
// document.querySelector(".overlay").addEventListener("click", function () {
//     this.style.display = "none"; // Сховати оверлей
//     document.querySelector(".form-container").style.display = "none"; // Сховати форму
// });

// // ==============================================

// const phoneInput = document.getElementById("phone");

// // Заборона видалення префіксу +380
// phoneInput.addEventListener("input", function() {
//     if (!this.value.startsWith("+380")) {
//         this.value = "+380";
//     }
// });

// // Валідація номера при відправці форми
// document.getElementById("order-form").addEventListener("submit", function (e) {
//     e.preventDefault();

//     const phone = phoneInput.value;
//     const phonePattern = /^\+380\d{9}$/;

//     if (!phonePattern.test(phone)) {
//         alert("Введіть номер у форматі +380XXXXXXXXX");
//         return; // Зупинити відправку форми, якщо номер невірний
//     }

//     // Далі виконується відправка форми або інші дії, якщо валідація пройшла успішно
// });

document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.querySelector('.overlay');
  const formContainer = document.querySelector('.form-container');
  const closeFormButton = document.querySelector('#close-form');
  const form = document.getElementById('order-form');
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const commentInput = document.getElementById('comments');
  const submitButton = document.querySelector('.submit-kasko-btn');
  const productName = document.getElementById('product-name');
  const sheetURL = "https://script.google.com/macros/s/AKfycbxCTe53jo6wZSqsKCwhHHTodDNNC9GG_oK1rB463AwSvsBKbBal5ssFMRb_lZifaWmt2w/exec";

  // Відкриття модального вікна
  document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function () {
      const product = this.getAttribute('data-product');
      productName.innerText = product;
      overlay.style.display = 'block';
      formContainer.style.display = 'block';
    });
  });

  // Закриття форми
  function closeForm() {
    overlay.style.display = 'none';
    formContainer.style.display = 'none';
    form.reset();
    phoneInput.value = '+380'; // Відновлення телефону
  }
  overlay.addEventListener('click', closeForm);
  closeFormButton.addEventListener('click', closeForm);

  // Заборона видалення "+380"
  phoneInput.addEventListener('input', function (e) {
    if (!this.value.startsWith('+380')) {
      this.value = '+380';
    }
  });

  // Перевірка, чи заповнені всі обов'язкові поля
  function toggleSubmitButton() {
    submitButton.disabled = !(
      nameInput.value.trim() && phoneInput.value.length === 13
    );
  }
  nameInput.addEventListener('input', toggleSubmitButton);
  phoneInput.addEventListener('input', toggleSubmitButton);

  // Відправка форми
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
      user_name: nameInput.value,
      user_phone: phoneInput.value,
      product_name: document.getElementById('product-name').innerText,
      user_comments: commentInput.value,
    };

    fetch(sheetURL, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.text())
      .then(data => {
        if (data === 'Success') {
          alert('Заявка успішно відправлена!');
          closeForm();
        } else {
          alert('Помилка при відправці.');
        }
      })
      .catch(error => {
        console.error('Помилка:', error);
        alert('Помилка підключення до сервера.');
      });
  });
});
