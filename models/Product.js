const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true,unique:true}, //acts as id
    brand:{type:String,required:true},
    desc:{type: String, required: true},
    img:{type: String, required: true},
    category:{type: String, required: true},
    size:{type:String},
    color:{type:String},
    subCategory:{type:String},
    price:{type:Number,required:true},
    qty:{type:Number,required:true}
},{timestamps:true});

// mongoose.models={}

export default mongoose.models.Product || mongoose.model("Product",ProductSchema);