const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var cors = require("cors");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// car_genius
// kHcXoSK0U46oipcO

// mongodb dataBase

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://car_genius:kHcXoSK0U46oipcO@cluster0.6tngyrc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const database = client.db("carGenius");
    const serviceCollection = database.collection("services");
    const bookingCollection = database.collection("bookings");

    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      console.log(process.env.ACCESS_TOKEN);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "none",
        })
        .send({ success: true });
    });
    // services related api
    app.get("/services", async (req, res) => {
      const cursor = await serviceCollection.find().toArray();
      res.send(cursor);
    });
    // get specific data
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = {
        projection: { price: 1, service_id: 1, title: 1, img: 1, date: 1 },
      };

      const result = await serviceCollection.findOne(query, options);
      res.send(result);
    });
    // delete booking api
    app.delete("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    });
    // update booking
    app.patch("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedBooking = req.body;
      const updateDoc = {
        $set: {
          status: updatedBooking.status,
        },
      };
      const result = await bookingCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    // bookings related API
    // book for a service
    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      console.log(booking);
      res.send(result);
    });

    // sum data
    app.get("/bookings", async (req, res) => {
      let query = {};
      if (req.query?.email) {
        query = {
          email: req.query.email,
        };
      }
      const result = await bookingCollection.find(query).toArray();

      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
