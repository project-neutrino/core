"use strict";

var mongoose = require('mongoose');
var scheme = mongoose.Schema;

const  ProductsSchema = new scheme({
  name: String,
  description: String
});

module.exports = mongoose.model('Products', ProductsSchema);