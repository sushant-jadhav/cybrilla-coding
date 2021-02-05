const db = require("../models");
const OrderStatus = db.orderStatuss;
const Op = db.Sequelize.Op;

// Create and Save a new OrderStatus
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a OrderStatus
  const new_sizes = {
    type_name: req.body.title,
    description: req.body.description,
    is_active: req.body.is_active ? req.body.is_active : 0
  };

  // Save OrderStatus in the database
  OrderStatus.create(new_sizes)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OrderStatus."
      });
    });
};

// Retrieve all OrderStatuss from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    OrderStatus.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving OrderStatuss."
        });
      });
};

// Find a single OrderStatus with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    OrderStatus.findByPk(id)
      .then(data => {
          if(data){
            res.send(data);
          }else{
            res.send({});
          }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving OrderStatus with id=" + id
        });
      });
};

// Update a OrderStatus by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    OrderStatus.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "OrderStatus was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update OrderStatus with id=${id}. Maybe OrderStatus was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating OrderStatus with id=" + id
        });
      });
};

// Delete a OrderStatus with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    OrderStatus.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "OrderStatus was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete OrderStatus with id=${id}. Maybe OrderStatus was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete OrderStatus with id=" + id
        });
      });
};

// Delete all OrderStatuss from the database.
exports.deleteAll = (req, res) => {
      OrderStatus.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} OrderStatuss were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all OrderStatuss."
          });
        });
};

// Find all published OrderStatuss
exports.findAllPublished = (req, res) => {
    OrderStatus.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving OrderStatuss."
      });
    });
};