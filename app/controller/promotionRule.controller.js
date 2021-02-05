const db = require("../models");
const Roles = db.roles;
const Op = db.Sequelize.Op;

// Create and Save a new Roles
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Roles
  const new_sizes = {
    type_name: req.body.title,
    description: req.body.description,
    is_active: req.body.is_active ? req.body.is_active : 0
  };

  // Save Roles in the database
  Roles.create(new_sizes)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Roles."
      });
    });
};

// Retrieve all Roless from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Roles.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Roless."
        });
      });
};

// Find a single Roles with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Roles.findByPk(id)
      .then(data => {
          if(data){
            res.send(data);
          }else{
            res.send({});
          }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Roles with id=" + id
        });
      });
};

// Update a Roles by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Roles.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Roles was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Roles with id=${id}. Maybe Roles was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Roles with id=" + id
        });
      });
};

// Delete a Roles with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Roles.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Roles was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Roles with id=${id}. Maybe Roles was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Roles with id=" + id
        });
      });
};

// Delete all Roless from the database.
exports.deleteAll = (req, res) => {
      Roles.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Roless were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Roless."
          });
        });
};

// Find all published Roless
exports.findAllPublished = (req, res) => {
    Roles.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Roless."
      });
    });
};