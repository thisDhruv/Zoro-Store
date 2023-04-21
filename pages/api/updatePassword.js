import connectDb from '@/middleware/mongoose';
import User from '@/models/User';
var jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

const handler = async (req, res)=>{
    if(req.method=='POST'){
        if(req.headers && req.headers.authorization){
            try {
                let data = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
                // GET ALL DETAILS FROM THE DATABASE [TO BE DONE] 
                const user = await User.findOne({email:data.email});
                let bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
                let currPass = bytes.toString(CryptoJS.enc.Utf8);
                if(req.body.currPass!==currPass){
                    return res.status(403).json({message:"Current Password is Incorrect"});
                }
                let newPass = CryptoJS.AES.encrypt(req.body.newPass, process.env.SECRET_KEY).toString()
                await User.findOneAndUpdate({email:user.email},{password:newPass});
                return res.status(200).json(user);
            } catch (e) {
                return res.status(401).send('unauthorized');
            }
        }else{
            return res.status(401).send('unauthorized');
        }
    }else{
        return res.status(400).send('Bad Request');
    }
   
}
export default connectDb(handler);