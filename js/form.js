// // Підключення EmailJS
// (function() {
//     emailjs.init("Sr9sC0pAHmC3PA7yg"); // Замініть на ваш Public Key
// })();

// // Додати обробник подій для кнопок "Оформити"
// const orderButtons = document.querySelectorAll('.order-btn');
// orderButtons.forEach(button => {
//     button.addEventListener('click', function() {
//         // Отримати назву продукту з data атрибуту
//         const productName = this.getAttribute('data-product');
//         document.getElementById("product-name").innerText = productName;

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
//     const productName = document.getElementById("product-name").innerText;

//     // Дані для шаблону EmailJS
//     const templateParams = {
//         user_name: name,
//         user_phone: phone,
//         product_name: productName,
//     };

//     // Відправка листа через EmailJS
//     emailjs.send("service_k4tag2s", "template_anu6odh", templateParams)
//         .then(function(response) {
//             console.log("SUCCESS!", response.status, response.text);
//             alert("Наші спеціалісти зв'яжуться з Вами найближчим часом!");

//             // Очищення полів після успішної відправки
//             document.getElementById("name").value = '';
//             document.getElementById("phone").value = '';
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


// тест 1


// Підключення EmailJS
(function() {
    emailjs.init("Sr9sC0pAHmC3PA7yg"); // Замініть на ваш Public Key
})();

// Додати обробник подій для кнопок "Оформити"
const orderButtons = document.querySelectorAll('.order-btn');
orderButtons.forEach(button => {
    button.addEventListener('click', function() {

        console.log("Button clicked"); // Логування

        // Отримати назву продукту з data атрибуту
        const productName = this.getAttribute('data-product');
        document.getElementById("product-name").innerText = productName;

        console.log("Data Product Attribute:", productName); // Логування

        // Показати форму та оверлей
        document.querySelector(".overlay").style.display = "block";
        document.querySelector(".form-container").style.display = "block";

    });
});

// Обробка події відправлення форми
document.getElementById("order-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Зупинити стандартну поведінку форми

    // Отримання даних з форми
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const productName = document.getElementById("product-name").innerText;

    
    // Логування значення перед відправкою
    console.log("Product Name перед відправкою:", productName); // Логування

    // Дані для шаблону EmailJS
    const templateParams = {
        user_name: name,
        user_phone: phone,
        product_name: productName,
    };

    // Логування перед відправкою
    console.log("Template Params:", templateParams); // Логування

    // Відправка листа через EmailJS
    emailjs.send("service_k4tag2s", "template_anu6odh", templateParams)
        .then(function(response) {
            console.log("SUCCESS!", response.status, response.text);
            alert("Наші спеціалісти зв'яжуться з Вами найближчим часом!");

            // Очищення полів після успішної відправки
            document.getElementById("name").value = '';
            document.getElementById("phone").value = '';
            document.querySelector(".overlay").style.display = "none"; // Сховати оверлей
            document.querySelector(".form-container").style.display = "none"; // Сховати форму
        }, function(error) {
            console.error("Помилка:", error);
            alert("Помилка надсилання. Спробуйте ще раз.");
        });
});

// Додати функціонал для закриття форми
document.getElementById("close-form").addEventListener("click", function() {
    document.querySelector(".overlay").style.display = "none"; // Сховати оверлей
    document.querySelector(".form-container").style.display = "none"; // Сховати форму
});

// Закриття форми при кліку на оверлей
document.querySelector(".overlay").addEventListener("click", function () {
    this.style.display = "none"; // Сховати оверлей
    document.querySelector(".form-container").style.display = "none"; // Сховати форму
});




