import connectDb from "@/middleware/mongoose"
import User from "@/models/User";
const CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

//PRO TIP: nextJS automatically handles the 500 internal server error

const handler = async (req, res)=>{
    if(req.method=='POST'){
        let user = await User.findOne({"email":req.body.email});
        if(user){
            if(user.email===req.body.email){
                let bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
                let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
                if(req.body.password===decryptedData){
                    let token = jwt.sign({"name":user.name,"email":user.email}, process.env.JWT_SECRET);
                    res.status(200).json({"success":true,token});
                }else{
                    res.status(200).json({success:"fail",message:"Invalid Credentials"});
                }
            }else{
                res.status(200).json({success:"fail",message:"Invalid Credentials"});
            }
        }else{
            res.status(200).json({success:"fail",message:"Invalid Credentials"});
        }
        
    }else{
        res.status(500).json({error:"This Method is not allowed"});
    }
}
export default connectDb(handler);
  