"use strict";
var Products = require('./schemes/product');

const getProducts = function (req, res) {
  Products.find( function (err, products) {
    if(err) res.send(err);
    res.json(products)
  } );
};

var createProduct = function (req, res) {
  //console.log(req);
  //console.log(res);
  var product = new Products();

  product.name = "NAME";
  product.description= "DESCR";

  product.save(function (err) {
    if (err) res.send(err);
    console.log('product saved');
  })
};

exports.getProducts = getProducts;
exports.createProduct = createProduct;