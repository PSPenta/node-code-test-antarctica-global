const { validationResult } = require('express-validator');
const { Op, col } = require('sequelize');

const { model } = require('../config/dbConfig');
const { responseMsg } = require('../helpers/utils');

exports.getUsers = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(responseMsg(errors.array()));
    }

    let query = [
      {
        id: {
          [Op.ne]: null
        }
      }
    ];
    if (req.query.search) {
      query = [
        {
          firstName: {
            [Op.like]: `%${req.query.search}%`
          }
        },
        {
          lastName: {
            [Op.like]: `%${req.query.search}%`
          }
        },
        {
          '$Employee.employeeId$': {
            [Op.like]: `%${req.query.search}%`
          }
        }
      ];
    }

    let orderBy = [];
    if (req.query.sort) {
      orderBy = [
        [req.query.sort, req.query.order]
      ];
    }

    const users = await model('User').findAll({
      where: {
        [Op.or]: query
      },
      include: [
        {
          model: model('Employee'),
          required: false,
          on: {
            userId: col('users.id')
          }
        }
      ],
      order: orderBy
    });

    users.page = req.query.page ? req.query.page : 1;
    users.limit = req.query.limit ? req.query.limit : 10;
    if (users) {
      return res.json(responseMsg(null, true, users, true));
    }
    return res.status(404).json(responseMsg('No users found!'));
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseMsg('Internal server error!'));
  }
};
