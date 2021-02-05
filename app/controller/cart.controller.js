const db = require("../models");
const Carts = db.carts;
const Product = db.products;
const Op = db.Sequelize.Op;
var common = require('../helpers/common');

// Create and Save a new Carts
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.product_id) {
        res.status(400).send({
            success: false,
            message: "Product Id required!"
        });
        return;
    }

    const productData = await Product.findByPk(req.body.product_id);

    if(!productData){
        common.htttpWrapper({
            code: 500,
            message: 'Product Not Found',
        }, res);
    }

    // Create a Carts
    let total_amount = parseFloat(req.body.quantity * productData.price);
    const new_cart_product = {
        product_id: productData.id,
        amount:productData.price,
        quantity:req.body.quantity,
        total_amount:total_amount,
    };

    //   // Save Carts in the database
    await Carts.create(new_cart_product)
      .then(data => {
          common.htttpWrapper({
              code: 200,
              message: 'Cart Product Added!',
              data:data
          }, res);
      })
      .catch(err => {
          common.htttpWrapper({
              code: 500,
              message: err.message || "Some error occurred while creating the Carts."
          }, res);
      });
};

// Retrieve all Cartss from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Carts.findAll({ where: condition })
      .then(data => {
          common.htttpWrapper({
              code:200,
              message:'Cart Found',
              data:data
          },res);
      })
      .catch(err => {
          common.htttpWrapper({
              code:500,
              message:err.message || "Some error occurred while getting the Carts.",
          },res);
      });
};

// Find a single Carts with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Carts.findByPk(id)
    .then(data => {
        if(data){
          common.htttpWrapper({
            code:200,
            message:'Cart Product Found',
            data:data
          },res);
        }else{
          common.htttpWrapper({
            code:200,
            message:'Cart Not Found',
            data:data
          },res);
        }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Carts with id=" + id
      });
    });
};

// Update a Carts by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Carts.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Carts was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Carts with id=${id}. Maybe Carts was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Carts with id=" + id
        });
      });
};

// Delete a Carts with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Carts.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Carts was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Carts with id=${id}. Maybe Carts was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Carts with id=" + id
        });
      });
};

// Delete all Cartss from the database.
exports.deleteAll = (req, res) => {
      Carts.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Cartss were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Cartss."
          });
        });
};

// Find all published Cartss
exports.findAllPublished = (req, res) => {
    Carts.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Cartss."
      });
    });
};
