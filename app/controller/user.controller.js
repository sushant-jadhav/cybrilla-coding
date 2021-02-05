const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');
var common = require('../helpers/common');

// Create and Save a new Users
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Users
  const new_sizes = {
    type_name: req.body.title,
    description: req.body.description,
    is_active: req.body.is_active ? req.body.is_active : 0
  };

  // Save Users in the database
  Users.create(new_sizes)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Users."
      });
    });
};

// Retrieve all Userss from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Users.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Userss."
        });
      });
};

// Find a single Users with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Users.findByPk(id)
      .then(data => {
          if(data){
            common.htttpWrapper({
              code:200,
              message:'User Found',
              data:data
            },res)
          }else{
            common.htttpWrapper({
              code:200,
              message:'User Not Found',
              data:data
            },res)
          }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Users with id=" + id
        });
      });
};

// Update a Users by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Users.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Users was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Users with id=${id}. Maybe Users was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Users with id=" + id
        });
      });
};

// Delete a Users with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Users.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Users was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Users with id=${id}. Maybe Users was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Users with id=" + id
        });
      });
};

// Delete all Userss from the database.
exports.deleteAll = (req, res) => {
      Users.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Userss were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Userss."
          });
        });
};

// Find all published Userss
exports.findAllPublished = (req, res) => {
    Users.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Userss."
      });
    });
};

exports.registerUser = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    // Create a Users
    const new_users = {
        email: req.body.email,
        password: hashedPassword,
        full_name: req.body.full_name,
        is_active: 1,
        mobile: null,
        role_id: req.body.role_id
    };

    // Save Users in the database
    await Users.create(new_users)
        .then((data) => {
            if (!data) {
                return res.status(500).send({
                    success: false,
                    message: "There was a problem registering the user."
                });
            }
            // create a token
            // var token = jwt.sign({id: data.id}, config.secret, {
            //     expiresIn: 86400 // expires in 24 hours
            // });
            res.status(200).send({success: true, auth: true});
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                // err: err,
                message: err.message || "Some error occurred while creating the Users."
            });
        });
};

exports.login = async (req, res) => {

    if (!req.body.email || !req.body.password) {
        return res.status(500).send({
            success:false,
            message: "Content can not be empty!"
        });
    }

    const users = await Users.findOne({
        where: { email:req.body.email },
    });

    console.log('users',users);

    if(users) {
        // if (err) return res.status(500).send({success: false, message: 'Error on the server.'});
        if (!users) return res.status(404).send({success: false, message: 'No user found.'});

        var passwordIsValid = bcrypt.compareSync(req.body.password, users.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                success:false,
                auth: false,
                token: null,
                message:'Password not matched'
            });
        }

        var token = jwt.sign({id: users.id}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({
            success:true,
            auth: true,
            token: token
        });
    }else{
        res.status(500).send({
            success: false,
            // err: err,
            message: "Some error occurred while creating the Users."
        });
    }

};
