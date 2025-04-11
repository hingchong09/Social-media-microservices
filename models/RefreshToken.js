const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

/*
TTL (Time-To-Live) index in MongoDB.
a special type of index that MongoDB uses to automatically remove (delete) documents after a certain amount of time.

Creates a TTL (Time-To-Live) index on expiresAt field.
MongoDB will auto-delete the document as soon as expiresAt is reached.
expireAfterSeconds: 0 means delete immediately after expiry.
Used to auto-remove expired refresh tokens without manual cleanu
*/

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })


const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema)
module.exports = RefreshToken

