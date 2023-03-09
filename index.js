require("dotenv").config();

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PORT = process.env.PORT || 3000;
// Fetch the publishable key to initialize Stripe.js
fastify.get("/publishable-key", () => {
  return { publishable_key: process.env.STRIPE_PUBLISHABLE_KEY };
});

// Create a payment intent and return its client secret
fastify.post("/create-payment-intent", async (req, res) => {
  let { amount } = req.body;
  try{
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({client_secret: paymentIntent.client_secret})
  } catch(error){
    res.status(500).send({ error: error.message });
  }
});

// Run the server
const start = async () => {
  try {
    await fastify.listen({ port: PORT }, (err, address) => {
      if (err) throw err
      // Server is now listening on ${address}
    })
  } catch (err) {
    fastify.log.error(err);
    process.exit(1); 
  }
};

start();
