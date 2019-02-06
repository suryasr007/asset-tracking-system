const mongoose = require('mongoose');

const PartSchema = new mongoose.Schema({
  part_name: {
    type: String,
    required: true
  },
  part_number: {
    type: String,
    required: true
  },
  manufacturer_id:{
    type: String,
    required: true
  },
  supplier_name:{
    type: String,
    required: true
  },
  supplier_email: {
    type: String,
    required: true
  },  
  supplier_address: {
    type: String,
    required: true
  },
  supplier_mobile:{
      type:String
  },
  uploaded_file_path:{
    type: String,
    default: null
  },
  supplier_acceptance:{
    type:Boolean,
    default: false
  },
  total_bill_value:{
    type: String,
    default: "0"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Part = mongoose.model('Part', PartSchema);

module.exports = Part;