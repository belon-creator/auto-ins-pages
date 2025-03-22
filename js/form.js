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
  const webAppUrl =
    'https://script.google.com/macros/s/AKfycbzBgDLTj0-UiiwRdu_P2W9Od_KmrKa3nRFBS6DAQtBidwIN_qR851wh2VujIQ8pCw1r7A/exec';

  document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function () {
      const product = this.getAttribute('data-product');
      productName.innerText = product;
      overlay.style.display = 'block';
      formContainer.style.display = 'block';
    });
  });

  function closeForm() {
    overlay.style.display = 'none';
    formContainer.style.display = 'none';
    form.reset();
    phoneInput.value = '+380';
  }

  overlay.addEventListener('click', closeForm);
  closeFormButton.addEventListener('click', closeForm);

  phoneInput.addEventListener('input', function () {
    if (!this.value.startsWith('+380')) {
      this.value = '+380';
    }
  });

  function toggleSubmitButton() {
    submitButton.disabled = !(
      nameInput.value.trim() && phoneInput.value.length === 13
    );
  }

  nameInput.addEventListener('input', toggleSubmitButton);
  phoneInput.addEventListener('input', toggleSubmitButton);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
      name: nameInput.value,
      phone: phoneInput.value,
      product: productName.innerText,
      comment: commentInput.value,
    };

    fetch(webAppUrl, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
    })
      .then(() => {
        console.log('Форма успішно відправлена!');
        window.location.href =
          'https://auto-ins.com.ua/pages/dyakuyemo-za-zamovlennya/';
      })
      .catch(error => {
        console.error('Помилка:', error);
        alert('Помилка підключення до сервера.');
      });
  });
});
