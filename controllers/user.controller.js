const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const user = new User();

//register controller
exports.register = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({
        message: err,
      });
    } else {
      let obj = {
        username: req.body.username,
        password: hash,
        fullname: req.body.fullname,
        email: req.body.email,
      };
      user.save(obj);
      return res.status(200).send({ message: 'Registered Successfully' });
    }
  });
};

//login controller
exports.login = (req, res) => {
  const { username, password } = req.body;

  user
    .findOne({ username })
    .then((data) => {
      if (!data.length) {
        console.log(`Username not existing in database`);
        return res.status(404).send({ message: 'User Not found.' });
      }

      let passwordIsValid = bcrypt.compareSync(password, data[0].password);

      if (!passwordIsValid) {
        return res.status(401).send({
          message: 'invalid password!',
        });
      }

      req.session.isAuth = true;
      req.session.name = username;

      res.status(200).send({ message: 'Registered Successfully' });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//logout controller
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/login');
  });
};

exports.forgot = (req, res) => {
  const userEmail = req.body.email;
  if (userEmail) {
    user.findOne({ email: req.body.email }).then((data) => {
      if (!data.length) {
        return res.status(500).send({ message: 'Invalid email address' });
      } else {
        try {
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'YOUREMAILHERE', // generated ethereal user
              pass: 'YOURPASSWORDHERE', // generated ethereal password
            },
          });

          let mailOptions = {
            from: '"no-reply"<no-reply@example.com>',
            to: userEmail,
            subject: 'Password Reminder',
            html: `<p>Hey its working!!!</p> <p> Your password is: ${data[0].password}</p>`,
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              return console.log(err);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.send(data[0]);
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
};
