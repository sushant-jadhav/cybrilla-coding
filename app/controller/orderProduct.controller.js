const db = require("../models");
const OrderProducts = db.orderProducts;
const Op = db.Sequelize.Op;

// Create and Save a new OrderProducts
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a OrderProducts
  const new_sizes = {
    type_name   : req.body.title,
    description : req.body.description,
    is_active   : req.body.is_active ? req.body.is_active : 0
  };

  // Save OrderProducts in the database
  OrderProducts.create(new_sizes)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OrderProducts."
      });
    });
};

// Retrieve all OrderProductss from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    OrderProducts.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving OrderProducts."
        });
      });
};

// Find a single OrderProducts with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    OrderProducts.findByPk(id)
      .then(data => {
          if(data){
            res.send(data);
          }else{
            res.send({});
          }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving OrderProducts with id=" + id
        });
      });
};

// Update a OrderProducts by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    OrderProducts.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "OrderProducts was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update OrderProducts with id=${id}. Maybe OrderProducts was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating OrderProducts with id=" + id
        });
      });
};

// Delete a OrderProducts with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    OrderProducts.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "OrderProducts was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete OrderProducts with id=${id}. Maybe OrderProducts was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete OrderProducts with id=" + id
        });
      });
};

// Delete all OrderProductss from the database.
exports.deleteAll = (req, res) => {
      OrderProducts.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} OrderProductss were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all OrderProducts."
          });
        });
};

// Find all published OrderProductss
exports.findAllPublished = (req, res) => {
    OrderProducts.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving OrderProducts."
      });
    });
};