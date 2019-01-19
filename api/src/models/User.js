const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  uname: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    minlength: 5,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  pwd: {
    type: String,
    required: true
  },
  dob: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['M', 'F', 'O'],
    default: 'O'
  },
  img: {
    type: String
  },
  followers: [{ type: Schema.ObjectId, ref: "User" }],
  following: [{ type: Schema.ObjectId, ref: "User" }],
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isPublicVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

UserSchema.index({ uname: 1 });

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  toObject: {
    virtuals: true
  },
  transform: function (doc, ret) { delete ret._id; delete ret.pwd },
})

UserSchema.pre("save", function (next) {
  let self = this;
  if (!self.updatedAt) {
    self.updatedAt = new Date();
  }

  // only hash the password if it has been modified (or is new)
  if (!self.isModified('pwd')) return next();

  bcrypt.hash(self.pwd, SALT_WORK_FACTOR, function (err, hash) {
    if (err) return next(err);
    self.pwd = hash;
    next();
  });
});

UserSchema.pre("update", function (next) {
  let self = this;
  if (!self.updatedAt) {
    self.updatedAt = new Date();
  }

  // only hash the password if it has been modified (or is new)
  if (!self.isModified('pwd')) return next();

  bcrypt.hash(self.pwd, SALT_WORK_FACTOR, function (err, hash) {
    if (err) return next(err);
    console.log({ hash })
    self.pwd = hash;
    next();
  });
});


UserSchema.methods.comparePassword = function (plainPwd) {
  return bcrypt.compare(plainPwd, this.pwd)
};

module.exports = mongoose.model('User', UserSchema);
