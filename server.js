require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
    console.log('Дані, отримані від клієнта:', req.body);

    const { name, phone, comment, product } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
        subject: 'Нова заявка з сайту',
        text: `Ім'я: ${name}\nТелефон: ${phone}\nКоментар: ${comment}\nПродукт: ${product}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Помилка при відправці.' });
        }
        console.log('Лист відправлено: ' + info.response);
        return res.json({ success: true, message: 'Заявка успішно відправлена!' });
    });
});

app.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});