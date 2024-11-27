const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 5000; // You can use any available port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST Route to handle form submission
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Using Gmail's SMTP server
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password',  // Replace with your email password or app-specific password
        },
    });

    const mailOptions = {
        from: email,
        to: 'goldboxxmc@gmail.com', // Replace with the recipient email
        subject: `Contact Form Submission from ${name}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send message.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
