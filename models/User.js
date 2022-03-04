const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    email:{
        type: String, 
        required:[true, "Please enter an email"],
        unique:true,
        lowercase: true,
        validate:[isEmail, "Please enter a valide email"]
    },
    password:{
        type:String,
        required: [true, "Please enter an email"],
        minlength:[6, "Minimum password length is 6 characters"]
    }
})

userSchema.post('save', function(doc, next){
    console.log(doc)
    next()
})

userSchema.pre('save',async function(next){
    console.log("User about to be created", this)
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()

})

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email})  
    if(user){
       const auth = await bcrypt.compare(password, user.password)
       if(auth){
           return user;
       }
       throw Error('incorrect password')

    }
    throw Error('incorrect email')
}



const User = new mongoose.model('user',userSchema )

module.exports = User;