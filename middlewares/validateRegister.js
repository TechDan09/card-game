const User = require('../models/user');
const user = new User();

exports.validateUsernameOrEmail = (req, res, next) => {
  const { username, password, fullname, email } = req.body;

  if (!username || !password || !fullname || !email) {
    return res.status(500).send({
      message: 'Incomplete fields',
    });
  }

  user.findOne({ username: req.body.username }).then((data) => {
    if (data.length) {
      res.status(400).send({
        message: 'Failed! Username is already in use!',
      });
      return;
    }

    user.findOne({ email: req.body.email }).then((data) => {
      if (data.length) {
        res.status(400).send({
          message: 'Failed! Email is already in use!',
        });
        return;
      }
      next();
    });
  });
};
