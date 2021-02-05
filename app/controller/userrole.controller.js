const db = require("../models");
const Sizes = db.sizes;
const Op = db.Sequelize.Op;

// Create and Save a new Sizes
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Sizes
  const new_sizes = {
    type_name: req.body.title,
    description: req.body.description,
    is_active: req.body.is_active ? req.body.is_active : 0
  };

  // Save Sizes in the database
  Sizes.create(new_sizes)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sizes."
      });
    });
};

// Retrieve all Sizess from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Sizes.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Sizess."
        });
      });
};

// Find a single Sizes with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Sizes.findByPk(id)
      .then(data => {
          if(data){
            res.send(data);
          }else{
            res.send({});
          }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Sizes with id=" + id
        });
      });
};

// Update a Sizes by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Sizes.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Sizes was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Sizes with id=${id}. Maybe Sizes was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Sizes with id=" + id
        });
      });
};

// Delete a Sizes with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Sizes.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Sizes was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Sizes with id=${id}. Maybe Sizes was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Sizes with id=" + id
        });
      });
};

// Delete all Sizess from the database.
exports.deleteAll = (req, res) => {
      Sizes.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Sizess were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Sizess."
          });
        });
};

// Find all published Sizess
exports.findAllPublished = (req, res) => {
    Sizes.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sizess."
      });
    });
};