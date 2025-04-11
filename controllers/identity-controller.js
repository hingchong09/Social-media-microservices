const logger = require('../utils/logger')
const {validateRegistration} = require('../utils/validation')
const User = require('../models/User')


// user registration
const registerUser = async (req, res) => {
    logger.info("Registrstion endpoint hit !")
    try {
    // Validate the Schema
    const {error} = validateRegistration(req.body)

    if(error) {
        logger.warn('Validation error', error.details[0].message)
        return res.status(400).json({ 
            success: false,
            message: error.details[0].message
        })
    }

    const {email, password, username} = req.body

    let user = await User.findOne({$or: [{email} , {username}]})

    if(user) {
        logger.warn('User already exists')
        return res.status(400).json({
            success: false,
            message: 'User already exists'
        })
    }

    user = new User({username, email, password})
    await user.save()

    logger.warn('User saved successfully' , user._id)


    } catch (error) {
        console.error(error)
    }
}
// user login

// refresh token , It keeps you logged in without asking for your password again and again. It's more secure because if someone steals your access token, it won’t work for long.

// logout