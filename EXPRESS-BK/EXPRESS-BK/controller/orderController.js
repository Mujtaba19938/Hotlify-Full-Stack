import Order from '../model/order.model.js'
import Stripe from 'stripe';

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

const addOrder = async (req, res) => {
  

    const {customer,items,total}=req.body;

    const order = new Order(
        {
            customer,
            items,
            total
        }
    )
    await order.save().then(() => {
       
      

    }).catch((err) => {
        return res.status(400).send({
            success: true,
            message: "your order has not been placed due to", err
        })

    })

     //--------------payment gate way intigration----------------------

      const session =await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      line_items: items.map((item) => {

        const price = Number(item.buyPrice);
        const quantity = Number(item.qty);

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.productName || "Product"
            },
            unit_amount: Math.round(price * 100)
          },
          quantity: quantity
        };

      }),

      mode: "payment",

      success_url: `http://localhost:3000/order-success/${order._id}`,

      cancel_url: `http://localhost:3000/checkout`,

      metadata: {
        orderId: order._id.toString()
      }

    });

    res.json({ url: session.url });
}


export { addOrder }