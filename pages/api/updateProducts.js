import connectDb from "@/middleware/mongoose"
import Product from "@/models/Product"

const handler = async (req, res)=>{
    if(req.method=='POST'){
        let products = req.body;
        for(let i=0;i<products.length;i++){
            await Product.findByIdAndUpdate(products[i]._id,products[i]);
        }
        res.status(200).json({result:"success"});
    }else{
        res.status(400).json({error:"This Method is not allowed"});
    }
}
export default connectDb(handler);
  