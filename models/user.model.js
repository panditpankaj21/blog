const mongoose = require('mongoose')
const {randomBytes, createHmac} = require('crypto')

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    salt:{
        type: String,
    },
    password:{
        type: String, 
        required: true
    }, 
    profileImageURL:{
        type: String,
        default: "/images/default_user.png"
    },
    role:{
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    }
}, {timestamps: true})

userSchema.pre('save',  function(next){

    if(this.isNew || this.isModified('password')){
        const user = this;
        user.salt = randomBytes(16).toString('hex');
        user.password = createHmac('sha256', user.salt)
        .update(user.password)
        .digest('hex')
    }
    next()
})

userSchema.static('matchPassword', async function(email, providedPassword){
    const user = await this.findOne({email});
    if(!user) return null;

    const dbSalt = user.salt;
    const dbPassword = user.password;

    const providedPasswordHashed = createHmac('sha256', dbSalt)
    .update(providedPassword)
    .digest('hex')

    if(providedPasswordHashed === dbPassword){
        return {...user, password: undefined, salt: undefined}
    }else return null;
})


const User = mongoose.model("user", userSchema);
module.exports = User