import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order"
var jwt = require('jsonwebtoken');

const handler = async (req, res)=>{
    if(req.method=='POST'){
        if(req.headers && req.headers.authorization){
            try {
                
                let data = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
                let orders = await Order.find({email:data.email})
                return res.status(200).json(orders);
            } catch (e) {
                return res.status(401).send('unauthorized');
            }
        }else{
            return res.status(401).send('unauthorized');
        }
    }else{
        return res.status(400).send('BAD REQUEST');
    }
}
export default handler;
