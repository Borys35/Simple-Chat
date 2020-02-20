const router = require('express').Router();
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const verifyToken = require('../verifyToken');

const jwt = require('jsonwebtoken');

const registerSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(16)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .alphanum()
    .min(8)
    .max(30)
    .required()
});

router.get('/verifyToken', verifyToken, (req, res) => {
  res.sendStatus(200);
});

router.post('/register', async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('this "email" exists');

  const hash = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash
  });

  try {
    await user.save();
    const token = jwt.sign(
      { user: req.body.username },
      process.env.SECRET_TOKEN_KEY,
      { expiresIn: '24h' }
    );
    res.cookie('token', token, { httpOnly: true }).sendStatus(200);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid "email"');

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).send('Invalid "password"');

  const token = jwt.sign(
    { user: user.username },
    process.env.SECRET_TOKEN_KEY,
    { expiresIn: '24h' }
  );

  res.cookie('token', token, { httpOnly: true }).sendStatus(200);
});

router.post('/logout', verifyToken, async (req, res) => {
  res.clearCookie('token').sendStatus(200);
});

module.exports = router;
