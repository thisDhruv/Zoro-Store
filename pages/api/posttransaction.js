import Order from "@/models/Order";
const Razorpay = require("razorpay");
import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";
const CryptoJS = require("crypto-js");

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET,
});

const posttransaction = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  var expectedSignature = CryptoJS.HmacSHA256(
    body.toString(),
    process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET
  ).toString();

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here
    await Order.findOneAndUpdate(
      { orderId: razorpay_order_id },
      { status: "Paid" }
    );
    const currOrder = await Order.findOne({orderId:razorpay_order_id});
    for(let key in currOrder.products){
      await Product.findOneAndUpdate({slug:key},{ $inc: { "qty": -(currOrder.products[key].qty) } });
    }
    
    
    res.redirect(
      `/order?pid=${razorpay_payment_id}&oid=${razorpay_order_id}`,
      200
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
export default connectDb(posttransaction);
