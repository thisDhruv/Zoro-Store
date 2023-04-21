import connectDb from "@/middleware/mongoose"
import User from "@/models/User";
const CryptoJS = require("crypto-js");

const handler = async (req, res)=>{
    if(req.method=='POST'){
        let u = await User({
            name: req.body.name,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        })
        await u.save();
        res.status(200).json({success:"true"});
    }else{
        res.status(400).json({error:"This Method is not allowed"});
    }
}
export default connectDb(handler);
  