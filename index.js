// require("dotenv").config();

// // Require the framework and instantiate it
// const fastify = require("fastify")({ logger: true });
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const PORT = process.env.PORT || 5252;
// // Fetch the publishable key to initialize Stripe.js
// fastify.get("/publishable-key", () => {
//   return { publishable_key: process.env.STRIPE_PUBLISHABLE_KEY };
// });

// // Create a payment intent and return its client secret
// fastify.post("/create-payment-intent", async (req, res) => {
//   let { amount } = req.body;
//   try{
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount,
//     currency: "eur",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });
//   res.send({client_secret: paymentIntent.client_secret})
//   } catch(error){
//     res.status(500).send({ error: error.message });
//   }
// });

// // Run the server
// const start = async () => {
//   try {
//     await fastify.listen({ port: PORT }, (err, address) => {
//       if (err) throw err
//       // Server is now listening on ${address}
//     })
//   } catch (err) {
//     fastify.log.error(err);
//     process.exit(1); 
//   }
// };

// start();


const express = require("express")
const app =express()
require("dotenv").config();
const stripe = require("stripe")("sk_test_51Mcxe6DebByDEiAZ6ERRjfSb39RZaEPggp1nwSQTce4PP1Ij46BgqbNkJ1gOan1BdqJSevjRMEdkbLan9RWHS2gE006f8IDTby")
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors())
app.use(express.static("dist"));
app.use(express.json());

app.post("/cart", cors(), async (req, res) => {
  const { items } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
            amount: 30000,
            currency: "usd",
            description: "mre",
            automatic_payment_methods: {
              enabled: true,
            },
          });
          res.send({
            clientSecret: paymentIntent.client_secret,
          });
  } catch (error) {
    console.log("Error", error);
    return (
      res.status(400).send({
        error: {
          message: error.message,
        },
      }),
      res.json({
        message: "Payment Failed",
      })
    );
  }
})

app.listen(process.env.PORT || 5173, () => {
  console.log("Sever is listening on port 5173");
});

