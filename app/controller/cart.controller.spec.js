const sinon = require('sinon');
const chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
var assert = require('chai').assert;
var expect = require('chai').expect;

chai.use(chaiHttp);

const db = require("../models");
const Controller = require('./cart.controller');
const Cart = require('../models/cart.model');
const PromotionRule = require('../models/promotionRule.model');
const Product = db.carts;

function privateFunction (time) {
     console.log(time);
}

describe('Cart Discount Api', function () {

    it('should return Status 200', done => {
        chai.request(server)
            .get('/api/cart/products?cart_id=1,2')
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.be.a('object');
                done();
            });
    });

})



describe('Cart Discount Logic Test', function () {

    let productArray = [
        {name:'test1',expectedValue:100,value:[{title: 'A', quantity: 1,amount:30}, {title: 'B', quantity: 1,amount:20},{title: 'C', quantity: 1,amount:50},{title: 'D', quantity: 0,amount:15}]},
        {name:'test2',expectedValue:110,value:[{title: 'A', quantity: 3,amount:30}, {title: 'B', quantity: 2,amount:20},{title: 'C', quantity: 0,amount:50},{title: 'D', quantity: 0,amount:15}]},
        {name:'test3',expectedValue:155,value:[{title: 'A', quantity: 3,amount:30}, {title: 'B', quantity: 2,amount:20},{title: 'C', quantity: 1,amount:50},{title: 'D', quantity: 1,amount:15}]},
        {name:'test4',expectedValue:140,value:[{title: 'A', quantity: 3,amount:30}, {title: 'B', quantity: 0,amount:20},{title: 'C', quantity: 1,amount:50},{title: 'D', quantity: 1,amount:15}]},
    ];

    productArray.forEach(testValue => {
        it(`should return expected amount ${testValue.expectedValue} of Test products ${testValue.name}`, done => {
            const products = testValue.value;
            let totalDisAmount = 0;
            for (let i = 0; i < products.length; i++) {
                let name = products[i];
                if (name.title === 'A') {
                    if (name.quantity === 3) {

                        totalDisAmount = totalDisAmount + 75;

                    } else if (name.quantity > 3) {
                        let multiplyQuantity = parseInt(name.quantity) / 3,
                            remaningQuantity = name.quantity % 3,
                            discountAmt = multiplyQuantity * 75 + remaningQuantity * parseInt(name.amount);

                        totalDisAmount = totalDisAmount + discountAmt;
                    }else if(name.quantity<3){
                        totalDisAmount = totalDisAmount + name.quantity * name.amount;
                    }
                }

                if(name.title==='B'){
                    if(name.quantity===2){

                        totalDisAmount = totalDisAmount + 35;

                    }else if(name.quantity>2){
                        let multiplyQuantity = parseInt(name.quantity)/2,
                            remaningQuantity = name.quantity % 2,
                            discountAmt = multiplyQuantity * 35 + remaningQuantity * parseInt(name.amount);

                        totalDisAmount = totalDisAmount + discountAmt;
                    }else if(name.quantity<2){
                        totalDisAmount = totalDisAmount + name.quantity * name.amount;
                    }
                }
                if(name.title==='C'){
                    totalDisAmount = totalDisAmount + name.quantity * name.amount;
                }

                if(name.title==='D'){
                    totalDisAmount = totalDisAmount + name.quantity * name.amount;
                }
            }

            if(totalDisAmount>=150){
                totalDisAmount = totalDisAmount - 20;
            }

            expect(totalDisAmount).to.be.a('number');

            assert.equal(totalDisAmount, testValue.expectedValue);

            done();
        });
    });


});
