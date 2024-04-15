import Joi from 'joi';
import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Action', 'Adventure', 'RPG', 'Platformer', 'Simulation', 'Strategy', 'Sports', 'Puzzle'],
    required: true,
  }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().valid(...genreSchema.enumValues).required()
  });

  return schema.validate(genre);
}

export { genreSchema, Genre, validateGenre };
