const db = require("../models");
const Carts = db.carts;
const Product = db.products;
const PromotionRules = db.promotionRules;
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

// Retrieve all Carts from the database.
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
              err.message || "Some error occurred while removing all Carts."
          });
        });
};

// Find Carts products with discount Price

exports.findAllCartProducts = async (req, res) => {
    try {
        let cart_ids = req.query.cart_ids;

        if (cart_ids !== '') {
            cart_ids = [...cart_ids];
        }

        if(cart_ids===''){
            common.htttpWrapper({
                code: 200,
                message: 'Products not present',
                data: {
                    cart_data: [],
                    discount_data: {}
                }
            }, res);
        }
        console.log('cart_ids',cart_ids);
        var condition = cart_ids ? {id: {[Op.in]: cart_ids}} : null;
        let message = 'Cart Product Found';
        console.log('condition',condition);
        const CartProduct = await Carts.findOne({
            where: condition,
            attributes: [
                'total_amount',
                [db.Sequelize.fn('sum', db.Sequelize.col('total_amount')), 'total_amount'],
            ],
            raw: true,
        });

        const CartProductQuantity = await Carts.findAll({
            where: condition,
            attributes: [
                'id', 'quantity', 'total_amount', 'product_id'
            ],
            include: [
                {
                    model: db.products,
                    row: true
                }
            ]
        });

        if (CartProductQuantity.length === 0) {
            common.htttpWrapper({
                code: 200,
                message: message,
                data: {
                    cart_data: [],
                    discount_data: {}
                }
            }, res);
        }

        let totalDiscountCartAmount = 0.00;

        for (let i = 0; i < CartProductQuantity.length > 0; i++) {
            let cartProd = CartProductQuantity[i];
            const PromotionRule = await PromotionRules.findOne({
                where: {product_id: cartProd.product_id},
            });
            if (PromotionRule) {

                if (cartProd.quantity == PromotionRule.quantity) {
                    totalDiscountCartAmount = totalDiscountCartAmount + parseInt(PromotionRule.discount_price);
                } else if (cartProd.quantity > PromotionRule.quantity) {
                    let multiplyQuantity = parseInt(cartProd.quantity) / PromotionRule.quantity,
                        remaningQuantity = cartProd.quantity % PromotionRule.quantity,
                        discountAmt = multiplyQuantity * parseInt(PromotionRule.discount_price) + remaningQuantity * parseInt(PromotionRule.discount_price);

                    totalDiscountCartAmount = totalDiscountCartAmount + discountAmt;
                } else if (cartProd.quantity < PromotionRule.quantity)  {
                    totalDiscountCartAmount = totalDiscountCartAmount + parseInt(cartProd.total_amount);
                }
            }
        }

        const responseObject = CartProductQuantity.map((data) => {
            return Object.assign(
                {},
                {
                    id: data.id,
                    product_id: data.product_id,
                    quantity: data.quantity,
                    total_amount: data.total_amount,
                    product: Object.assign(
                        {},
                        {
                            id: data.product.id,
                            title: data.product.title,
                            description: data.product.description,
                            price: data.product.price,
                            is_discount: data.product.is_discount,
                            is_active: data.product.is_active
                        }
                    )
                });
        });

        let discountData = {
            discount_amount: totalDiscountCartAmount,
            total_amount: parseFloat(CartProduct.total_amount)
        };

        common.htttpWrapper({
            code: 200,
            message: message,
            data: {
                cart_data: responseObject,
                discount_data: discountData
            }
        }, res);

    }catch(e){
        if (e instanceof ReferenceError) {
            // Output expected ReferenceErrors.
            common.htttpWrapper({
                code: 500,
                message: 'Something went wrong',
            }, res);
        } else {
            // Output unexpected Errors.
            common.htttpWrapper({
                code: 500,
                message: 'Something went wrong',
            }, res);
        }
    }
};
