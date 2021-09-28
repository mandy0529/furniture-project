require('dotenv').config();

const STRIPE_SECRET = process.env.REACT_APP_STRIPE_SECRET;
const stripe = require('stripe')(STRIPE_SECRET);

exports.handler = async function (event, context) {
  if (event.body) {
    const {body} = event;
    console.log(body, 'body');
    const {cart, shipping_fee, total_price} = JSON.parse(body);
    const calculateOrderAmount = () => {
      return total_price + shipping_fee;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd',
      });
      return {
        statusCode: 200,
        body: JSON.stringify({clientSecret: paymentIntent.client_secret}),
      };
    } catch (error) {
      console.log('create에서 error');
      return {
        statusCode: 500,
        body: JSON.stringify({msg: error.message}),
      };
    }
  }
  return {
    statusCode: 200,
    body: 'create payment intent',
  };
};
