const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Set up an Express app to handle the form submission
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  // Set up Nodemailer transport with your email credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mount88ian@gmail.com',
      pass: 'nhfcnwzjufhysdxk'
    }
  });
  const mailOptions = {
    from: req.body.email,
    to: 'mount88ian@gmail.com',
    subject: 'New message from your portfolio',
    text: `
      Name: ${req.body.name}
      Email: ${req.body.email}
      Message: ${req.body.message}
    `

  };
  

  

  // Send the email and respond to the client
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Message sent successfully');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});