// import mongoose module
import mongoose from 'mongoose';

// Destructure Schema from the mongoose object
const { Schema } = mongoose;

// Create a schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create a model
const User = mongoose.model('User', userSchema);

// export the model
export default User;
