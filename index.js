// require("dotenv").config();

// // Require the framework and instantiate it
// const fastify = require("fastify")({ logger: true });
// const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

// const PORT = process.env.PORT || 5252;
// // Fetch the publishable key to initialize Stripe.js
// fastify.get("/publishable-key", () => {
//   return { publishable_key: `${process.env.STRIPE_PUBLISHABLE_KEY}` };
// });
// fastify.post("/", (res, req) => {
//     res.send("this is the server")
// })

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


// const express = require("express")
// const app =express()
// require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


//  app.get("/publishable-key", () => {
//    return { publishable_key: `${process.env.STRIPE_PUBLISHABLE_KEY}` };
//  });

// app.post("/create-payment-intent", async (req, res) => {
//   const { amount } = req.body;
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//             amount,
//             currency: "usd",
//             description: "mre",
//             automatic_payment_methods: {
//               enabled: true,
//             },
//           });
//           res.send({
//             client_secret: paymentIntent.client_secret
//           });
//   } catch (error) {
//     console.log("Error", error);
//     return (
//       res.status(400).send({
//         error: {
//           message: error.message,
//         },
//       }),
//       res.json({
//         message: "Payment Failed",
//       })
//     );
//   }
// })

// app.listen(process.env.PORT || 5252, () => {
//   console.log("Sever is listening on port 5252");
// });




// // Importing express module
// const express = require("express")
// const app = express()
  
// // Handling GET / request
// // app.use("/", (req, res, next) => {
// //     res.send("This is the express server")
// // })
  
// // Handling GET /hello request
// app.get("/hello", (req, res, next) => {
//     res.send("This is the hello response");
// })
  
// // Server setup
// app.listen(3000, () => {
//     console.log("Server is Running")
// })



























require("dotenv").config();

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

const PORT = process.env.PORT || 5252;

// Fetch the publishable key to initialize Stripe.js
fastify.get("/publishable-key", () => {
  return { publishable_key: `${process.env.STRIPE_PUBLISHABLE_KEY}` };
});

// Add a GET route to the root path "/"
fastify.get("/", (req, res) => {
  res.send("Hello World!");
});

fastify.post("/", (res, req) => {
  res.send("this is the server")
})

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
