// server/models/models.js
// This is the file that specifies the schema to be loaded by mongoose.
// This file is required by mongoose.js.
// We do not need to require this file in the controller, instead, the model itself is loaded from mongoose.
// There can be many models in the server/models folder.

const mongoose = require('mongoose');

// create the schema
const UserSchema = new mongoose.Schema({
  firstname: { type: String, trim: true },
  lastname: { type: String, trim: true },
  username: { type: String, trim: true },
  email: { type: String, trim: true },
  dob: { type: String, trim: true },
  password: { type: String, trim: true }
}, {timestamps: true});

// register the schema as a model
mongoose.model('User', UserSchema);
