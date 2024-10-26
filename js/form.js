const orderButtons = document.querySelectorAll('.order-btn');
const formContainer = document.querySelector('.form-container');
const overlay = document.querySelector('.overlay');
const productName = document.getElementById('product-name');
const orderForm = document.getElementById('order-form');
const closeFormButton = document.getElementById('close-form');

orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.getAttribute('data-product');
        productName.textContent = product;
        formContainer.style.display = 'block';
        overlay.style.display = 'block';
    });
});

closeFormButton.addEventListener('click', () => {
    formContainer.style.display = 'none';
    overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
    formContainer.style.display = 'none';
    overlay.style.display = 'none';
});

orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const product = productName.textContent;

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxt9Aq_uz0IkhmUvsn0j2WoDJMY_vlldOcm4wOec53-NgjOdpWtn7lwQsxhhwZH3IOB/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, phone, product })
        });

        if (response.ok) {
            alert('Дані надіслано!');
            orderForm.reset(); // Очистка полів
            formContainer.style.display = 'none'; // Закрити форму
            overlay.style.display = 'none'; // Закрити фон
        } else {
            alert('Сталася помилка. Спробуйте ще раз.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Сталася помилка. Спробуйте ще раз.');
    }
});


