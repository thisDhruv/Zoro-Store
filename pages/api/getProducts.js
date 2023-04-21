import connectDb from "@/middleware/mongoose"
import Product from "@/models/Product"

//category == clothing, means sizes are a factor and multiple products with single slug, return as a single unit, with sizes as an array
// otherwise, just return the products got from database, sizes are not necessary

// if /api/getProducts?category=clothing then display only one kind of tshirt not all sizes and colors (based on title as key)
// if /api/getProducts? then dispaly every product

const handler = async (req, res)=>{
    console.log(req.query);
    let filter = {};
    Object.keys(req.query).forEach((key)=>{
        const arr = req.query[key].split(",");
        filter[key]={"$in":arr}
        // filter[key]={};
    })

    let products = await Product.find(filter);

    // if(category!='clothing')return res.status(200).send(products);
    let clothes = {};
    for(let i=0;i<products.length;i++){
        if(clothes[products[i].title]!=undefined){
            if(!clothes[products[i].title].size.includes(products[i].size)){
                clothes[products[i].title].size.push(products[i].size);
            }
            if(!clothes[products[i].title].color.includes(products[i].color)){
                clothes[products[i].title].color.push(products[i].color);
            }
        }else{
            clothes[products[i].title]=JSON.parse(JSON.stringify(products[i]));
            let s = clothes[products[i].title].size;
            let c = clothes[products[i].title].color;
            clothes[products[i].title].size=[s];
            clothes[products[i].title].color=[c];
        }
    }
    let clothesArr = [];
    Object.keys(clothes).forEach((key)=>{
        clothesArr.push(clothes[key]);
    })
    res.status(200).send(clothesArr);
}
export default connectDb(handler);
  