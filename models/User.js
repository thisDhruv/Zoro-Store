const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true,unique:true},
    phone:{type:String},
    addresses:[{
        id:{type:Number},
        name:{type:String},
        phone:{type:String},
        address:{type:String},
        city:{type:String},
        state:{type:String},
        pincode:{type:String}
    }],
    password:{type: String, required: true},
},{timestamps:true});

// mongoose.models={}

export default mongoose.models.User || mongoose.model("User",UserSchema);