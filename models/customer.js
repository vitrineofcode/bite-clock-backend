import Joi from 'joi';
import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(5).max(50).required()
  });

  return schema.validate(customer);
}

export { Customer, validateCustomer };
