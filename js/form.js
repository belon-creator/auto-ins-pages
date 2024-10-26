


document.addEventListener("DOMContentLoaded", function () {
    const orderButtons = document.querySelectorAll(".order-btn");
    const overlay = document.querySelector(".overlay");
    const formContainer = document.querySelector(".form-container");
    const form = document.getElementById("order-form");
    const productNameEl = document.getElementById("product-name");

    // Відкриття форми при натисканні кнопки "Оформити"
    orderButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productName = event.target.getAttribute("data-product");
            productNameEl.textContent = `Оформлення для ${productName}`;
            formContainer.style.display = "block"; // Показати форму
            overlay.style.display = "block"; // Показати оверлей
        });
    });

    // Закриття форми при натисканні кнопки "Закрити"
    document.getElementById("close-form").addEventListener("click", () => {
        formContainer.style.display = "none";
        overlay.style.display = "none";
    });

    // Надсилання форми
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const productName = productNameEl.textContent.replace("Оформлення для ", "");

        // Надсилання даних до Google Apps Script
        const response = await fetch("https://script.google.com/macros/s/AKfycbwiSPanPPtHfTLWCHHuWWmRLKwzE2Ve9jrSn23vE9BL6UyHXw0nF_p4c3IX5ehfccj6dA/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, phone, productName }),
            
        });

        if (response.ok) {
            alert("Дані успішно відправлено!");
            formContainer.style.display = "none";
            overlay.style.display = "none";
        } else {
            alert("Помилка при відправленні даних.");
        }
    });
});