/* eslint-disable no-undef */
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const { model } = require('../config/dbConfig');
const { jwt } = require('../config/serverConfig');
const { responseMsg } = require('../helpers/utils');

exports.jwtLogin = async (req, res) => {
  try {
    const userData = await model('User').findAll({ where: { username: req.body.username } });
    let token = '';
    if (userData && userData[0] && await compare(req.body.password, userData[0].password)) {
      token = sign(
        {
          username: userData[0].username,
          userId: userData[0].id.toString()
        },
        jwt.secret,
        { expiresIn: jwt.expireIn }
      );
    }
    if (token) {
      return res.json(responseMsg(null, true, { token }));
    }
    return res.status(404).json(responseMsg('User not found!'));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseMsg('Something went wrong!'));
  }
};

exports.jwtLogout = async (req, res) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      if (token) {
        await model('Blacklist').create({
          token,
          user: req.userId
        });
      }
      return res.json(responseMsg(null, true, 'Successfully logged out!'));
    }
    return res.status(401).json(responseMsg('Not authenticated!'));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseMsg('Something went wrong!'));
  }
};
