// import mongoose from 'mongoose';

// const genreSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   }
// });

// const Genre = mongoose.model('Genre', genreSchema);

// export default Genre;

import mongoose from 'mongoose';
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,  // Ensure that no two genres have the same name
    trim: true,    // Remove whitespace from both ends of a string
    minlength: 1,
    maxlength: 255
  }
});
const Genre = mongoose.model('Genre', genreSchema);
export default Genre;