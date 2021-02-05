const db = require("../models");
const common = require("../helpers/common");
const PromotionRule = db.promotionRules;
const Product = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new PromotionRule
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.product_id || !req.body.rule_name) {
        common.htttpWrapper({
            code: 400,
            message: "Content can not be empty!",
        }, res);
        return;
    }

    const productData = await Product.findByPk(req.body.product_id);

    if (!productData) {
        common.htttpWrapper({
            code: 500,
            message: 'Product Not Found',
        }, res);
    }

    const ruleData = await PromotionRule.findOne({ where: { product_id: req.body.product_id } });

    // Create a PromotionRule
    const new_rules = {
        rule_name: req.body.rule_name,
        product_id: req.body.product_id,
        quantity:req.body.quantity,
        discount_price : req.body.discount_price,
        is_active: req.body.is_active ? req.body.is_active : 0
    };

    if (!ruleData) {
        // Save PromotionRule in the database
        PromotionRule.create(new_rules)
            .then(data => {
                res.send(data);
                common.htttpWrapper({
                    code: 200,
                    data:data,
                    message: 'PromotionRule was created successfully.',
                }, res);
            })
            .catch(err => {
                common.htttpWrapper({
                    code: 500,
                    message: err.message || "Some error occurred while creating the PromotionRule.",
                }, res);
            });
        return;
    }else{
        PromotionRule.update(new_rules, {
            where: { id: ruleData.id }
        })
            .then(num => {
                if (num == 1) {
                    common.htttpWrapper({
                        code: 200,
                        data:[],
                        message: 'PromotionRule was updated successfully.',
                    }, res);
                } else {
                    common.htttpWrapper({
                        code: 200,
                        message: `Cannot update PromotionRule with id=${ruleData.id}. Maybe PromotionRule was not found or req.body is empty!`,
                    }, res);
                }
            })
            .catch(err => {
                common.htttpWrapper({
                    code: 500,
                    message: err.message + " Error updating PromotionRule with id=" + ruleData.id,
                }, res);
            });
        return;
    }
};

// Retrieve all PromotionRules from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    PromotionRule.findAll({ where: condition })
      .then(data => {
          let message = 'Rules Found';
          if(data.length===0){
              message = 'Rules Not Found';
          }
          common.htttpWrapper({
              code:200,
              message:message,
              data:data
          },res);
      })
      .catch(err => {
          res.status(500).send({
              success:true,
              message: err.message || "Some error occurred while retrieving Rules."
          });
      });
};

// Find a single PromotionRule with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    PromotionRule.findByPk(id)
      .then(data => {
          if(data){
            res.send(data);
          }else{
            res.send({});
          }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving PromotionRule with id=" + id
        });
      });
};

// Update a PromotionRule by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    PromotionRule.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "PromotionRule was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update PromotionRule with id=${id}. Maybe PromotionRule was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating PromotionRule with id=" + id
        });
      });
};

// Delete a PromotionRule with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    PromotionRule.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "PromotionRule was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete PromotionRule with id=${id}. Maybe PromotionRule was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete PromotionRule with id=" + id
        });
      });
};

// Delete all PromotionRules from the database.
exports.deleteAll = (req, res) => {
      PromotionRule.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} PromotionRules were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all PromotionRules."
          });
        });
};

// Find all published PromotionRules
exports.findAllPublished = (req, res) => {
    PromotionRule.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving PromotionRules."
      });
    });
};
