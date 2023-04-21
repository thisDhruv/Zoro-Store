import connectDb from '@/middleware/mongoose';
import User from '@/models/User';
var jwt = require('jsonwebtoken');

const handler = async (req, res)=>{
    if(req.method=='POST'){
        if(req.headers && req.headers.authorization){
            try {
                let data = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
                // GET ALL DETAILS FROM THE DATABASE [TO BE DONE] 
                const user = await User.findOneAndUpdate({email:data.email},req.body);
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