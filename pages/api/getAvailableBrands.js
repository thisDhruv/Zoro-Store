import connectDb from '@/middleware/mongoose';
import Product from '@/models/Product';


const handler = async (req, res)=>{
    if(req.method=='POST'){
        // GET ALL DETAILS FROM THE DATABASE [TO BE DONE] 
        const products = await Product.find({category:req.body.category});
        let brands = [];
        products.forEach((p)=>{
            if(!brands.includes(p.brand))brands.push(p.brand);
        })
        return res.status(200).json({brands:brands});
    }else{
        return res.status(400).send('Bad Request');
    }
   
}
export default connectDb(handler);