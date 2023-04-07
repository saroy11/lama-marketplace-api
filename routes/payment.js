const router = require("express").Router();
const Razorpay = require('razorpay');
const env = require("dotenv");
env.config();

router.post("/createOrder", (req, res) => {

  console.log("inside createOrder " + req.body.amount);

  const instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SEC })

  const options = {
    amount: req.body.amount,  // amount in the smallest currency unit
    currency: "INR"
  };

  instance.orders.create(options, function (err, order) {
    res.status(200).json(order);
  });
});


router.post("/verifyPayment", (req, res) => {

  console.log("verify "+req.body.response);
  const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

  const crypto = require("crypto");
  const expectedSignature = crypto.createHmac('sha256', process.env.KEY_SEC)
    .update(body.toString())
    .digest('hex');
    const sigReceived = req.body.razorpay_signature;
  console.log("sig received ", sigReceived);
  console.log("sig generated ", expectedSignature);

  if(expectedSignature===sigReceived) 
  res.status(200).json("payment verified");
  else
  res.status(400).json("invalid payment");

  
});

module.exports = router;