import connectDb from "@/middleware/mongoose"
import Product from "../../models/Product"

const handler = async (req, res)=>{
    if(req.method=='POST'){
        let products = req.body;
        for(let i=0;i<products.length;i++){
            let p = new Product({
                title: products[i].title,
                brand:products[i].brand,
                slug: products[i].slug,
                desc:products[i].desc,
                img:products[i].img,
                category:products[i].category,
                subCategory:products[i].subCategory,
                size:products[i].size,
                color:products[i].color,
                price:products[i].price,
                qty:products[i].qty
            })
            await p.save();
        }
        res.status(200).json({result:"success"});

    }else{
        res.status(400).json({error:"This Method is not allowed"});
    }
}
export default connectDb(handler);
  