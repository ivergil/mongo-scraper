var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  // `body` is of type String
  body: {
    type: String,
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
}
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
