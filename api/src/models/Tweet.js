const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  text: {
    type: String,
    required: true,
    maxlength: 140,
    trim: true
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // favrouites
  by: { type: Schema.Types.ObjectId, ref: 'User' }, // created by
  ts: { type: Date, default: Date.now }, // timestamp
});

TweetSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id; }
})

module.exports = mongoose.model('Tweet', TweetSchema);
