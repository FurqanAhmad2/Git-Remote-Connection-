const express = require('express');
const db = require('../dbConfig');
const transporter = require('../emailSender.js');
const router = express.Router();
const config =require("../Config/config")

// GET endpoint to retrieve users from the database and send them as JSON
router.get('/users', (req, res) => {
  const query = 'SELECT * FROM users'; // Replace 'users' with the name of your table
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    } else {
      res.json(results);
    }
  });
});


// GET endpoint to retrieve users from the database and send them as JSON
router.post('/users/email', (req, res) => {

  const {email } = req.body;
  console.log(email);

  const query = `SELECT * FROM users WHERE email = '${email}'`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    } else {
      res.json(results);
    }
  });
});

const generateVerificationCode = () => {
  // Generate a random 6-digit number (between 100000 and 999999)
  return Math.floor(100000 + Math.random() * 900000);
};

router.post('/users', async (req, res) => {
  const { Nombre, Email, Provincia, Contraseña, Ocupacion, Curso, Fecha_de_nacimiento } = req.body;

  const Verfication_Code = generateVerificationCode(); // Generate a random 6-digit verification code

  // Check if user with that email already exists
  const emailCheckQuery = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
  try {
    const [emailCheckResult] =  db.query(emailCheckQuery, [Email]);
    const userCount = emailCheckResult[0].count;

    if (userCount < 1) {
      try {
        let mail = await transporter.sendMail({
          from: '"Music APP" <furqana405@gmail.com>',
          to: `${Email}`,
          subject: "Verification Code",
          text: "Verification OTP",
          html: `
          <p>Dear ${Nombre},</p>
          <p>Your One-Time Password (OTP) for verification is:</p>
          <h1>${Verfication_Code}</h1>
          <p>Please use this OTP to complete the verification process.</p>
          <p>Thank you!</p>
          `
        });

        const query = 'INSERT INTO users (Nombre, email, Provincia, Contraseña, Ocupacion, Curso, Fecha_de_nacimiento, Verification_Code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
         db.query(query, [Nombre, Email, Provincia, Contraseña, Ocupacion, Curso, Fecha_de_nacimiento, Verfication_Code]);

        const userVideosQuery = 'INSERT INTO userinfo (userEmail, totalvideosWatch) VALUES (?, ?)';
         db.query(userVideosQuery, [Email, 0]);

        res.json({ message: 'User data stored successfully', Verfication_Code });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(503).json({ error: 'Failed to send verification email' });
      }
    } else {
      res.status(505).json({ error: 'Failed to send verification email User Already' });
    }
  } catch (error) {
    console.error('Error checking email existence:', error);
    res.status(500).json({ error: 'Failed to check email existence' });
  }
});

router.post('/users/incrementTotalVideos', async (req, res) => {
  // Your code for incrementing totalvideosWatch here...
});



router.delete('/users/email', (req, res) => {
  const { email } = req.body;
  console.log('Deleting user with email:', email);

  const deleteQuery = `DELETE FROM users WHERE email = '${email}'`;

  db.query(deleteQuery, (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Failed to delete user' });
    } else {
      // Check if any rows were affected (if no user with the given email was found)
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    }
  });
});


router.post('/users/userinfo', (req, res) => {
  const { email } = req.body; // Extract the email from the request body

  // Check if the email is provided
  if (!email) {
    return res.status(400).json({ error: 'Email is required in the request body' });
  }

  const query = 'SELECT * FROM userinfo WHERE userEmail = ?'; // SQL query to select data for the given email

  // Execute the query with the email parameter
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error fetching user info:', err);
      res.status(500).json({ error: 'Failed to fetch user info' });
    } else {
      res.json(results);
    }
  });
});

router.post('/users/contact', (req, res) => {
  // Access the form data sent in the request body
  const { nombre, Provincia, Mensaje } = req.body;

  // Do something with the data (e.g., store it in the database or perform some action)
  console.log('Nombre:', nombre);
  console.log('Provincia:', Provincia);
  console.log('Mensaje:', Mensaje);

  const Email="furqan.ahmad9969@gmail.com"

  let mail = transporter.sendMail({
    from: '"Music APP" <furqana405@gmail.com>',
    to: `${Email}`,
    subject: "User Contact Information",
    text: "User Contact",
    html : `
    <p>Message from  ${nombre},</p>
    <p>Provincia: ${Provincia}</p>
    <p>${Mensaje}</p>
    <p>Thank you!</p>
    `
});



  // Send a response back to the client (optional)
  res.json({ message: 'Form data received successfully' });
});


router.post('/users/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username)
  console.log(password)
  // Query the database to check if the user exists and the password is correct
  const query = `SELECT * FROM users WHERE Email = '${username}' AND Contraseña = '${password}'`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Failed to fetch user' });
    } else {
      if (results.length === 0) {
        // User not found or credentials don't match
        res.json({ success: false, message: 'Invalid username or password' });
      } else {
        // User found, credentials match
        res.json({ success: true, message: 'Login successful' });
      }
    }
  });
});






module.exports = router;
