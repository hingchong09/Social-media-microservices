const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const RefreshToken = require("../models/RefreshToken");

const generateTokens = async (user) => {
  // 3 parameters = {payload,secretKey,options}
  const accessToken = jwt.sign(
    {
      // sign = new token
      userId: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "60m" }
  );

  // generate a secure random string. eg- <Buffer 1f a0 3c d5> = "1fa03cd5"
  const refreshToken = crypto.randomBytes(40).toString('hex');
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // refresh token expires in 7 days

  /*
    You are doing all of this in one line:
    Creating a new RefreshToken document
    Setting its fields: token, user, expiresAt
    Saving it to the MongoDB database
    await ensures you wait until the operation finishes
  */
  await RefreshToken.create({
    token: refreshToken,
    user: user._id,
    expiresAt
  })

  return {accessToken , refreshToken}
};

module.exports = generateTokens


/*
Payload – The data to store inside the token.
Secret – A key used to encrypt and sign the token.  
Options – Additional settings like expiration time.
*/
