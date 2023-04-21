import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
const Razorpay = require("razorpay");
const shortid = require("shortid");

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET,
});

function truncate2(a){
    return (Math.round((a * 1000)/10)/100);
}

const pretransaction = async (req, res) => {
  if (req.method == "POST") {

    //check cart, it must not be tempered
    let cart = req.body.cart;
    let total = 0;
    for(let item in cart){
        let key = item;
        let p = await Product.findOne({slug:key});
        if(p==null)return res.status(200).json({success:false,message:"The Cart has been tempered, please try again"})
        if(p.price!==cart[key].price)return res.status(200).json({success:false,message:"Some items in the cart does not match, please try again"})
        if(p.qty==0)return res.status(200).json({success:false,message:"Sorry, Some of the items in your cart has gone out of stock"})
        total+=(p.price*cart[key].qty);
        total=truncate2(total);
    }

    if(total!==req.body.subtotal)return res.status(200).json({success:false,message:"The Cart has been tempered, please try again"})


    const options = {
      amount: Number(req.body.subtotal * 100),
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture: 1,
      notes: {
        // These notes will be added to your transaction. So you can search it within their dashboard.
        userId: req.body.email,
      },
    };

    
    try {
      const order = await instance.orders.create(options);
      const o = new Order({
        email: req.body.email,
        phone: req.body.phone,
        orderId: order.id,
        products: req.body.cart,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        amount: req.body.subtotal,
        status: "Pending",
      });
      await o.save();

      res.status(200).json({
        success: true,
        order,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
      });
    }
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
export default connectDb(pretransaction);
