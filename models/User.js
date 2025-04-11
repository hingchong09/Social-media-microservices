const mongoose = require('mongoose')
const argon2 = require('argon2')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true 
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
},{timestamps: true})



UserSchema.pre('save', async function(next) {
    if(this.isModified('password')) {  // isModified() is from mongoose , this here is UserSchema
        try {
            this.password = await argon2.hash(this.password)
        } catch (error) {
            return next(error)
        }
    }
})


// Creating Custom Method- eg: user.comparePassword(userPassword)
UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await argon2.verify(this.password,candidatePassword)
    } catch (error) {
        throw error
    }
}

UserSchema.index({username: 'text'}) // Makes search faster , here it will make the text search faster

const User = mongoose.model('User',UserSchema)
module.exports = User