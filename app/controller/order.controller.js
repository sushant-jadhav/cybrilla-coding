const db = require("../models");
const Orders = db.orders;
console.log('Orders',Orders);
const Op = db.Sequelize.Op;

// Create and Save a new Orders
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Orders
  const new_sizes = {
    type_name: req.body.title,
    description: req.body.description,
    is_active: req.body.is_active ? req.body.is_active : 0
  };

  // Save Orders in the database
  Orders.create(new_sizes)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Orders."
      });
    });
};

// Retrieve all Orderss from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Orders.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Orders."
        });
      });
};

// Find a single Orders with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Orders.findByPk(id)
      .then(data => {
          if(data){
            res.send(data);
          }else{
            res.send({});
          }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Orders with id=" + id
        });
      });
};

// Update a Orders by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Orders.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Orders was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Orders with id=${id}. Maybe Orders was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Orders with id=" + id
        });
      });
};

// Delete a Orders with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Orders.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Orders was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Orders with id=${id}. Maybe Orders was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Orders with id=" + id
        });
      });
};

// Delete all Orderss from the database.
exports.deleteAll = (req, res) => {
      Orders.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Orderss were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Orderss."
          });
        });
};

// Find all published Orderss
exports.findAllPublished = (req, res) => {
    Orders.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orderss."
      });
    });
};