const mongoose = require('mongoose');

const extendSchema = function(Schema, definition, options) {
  return new mongoose.Schema(
    Object.assign({}, Schema.obj, definition),
    options
  );
};

module.exports = extendSchema;
