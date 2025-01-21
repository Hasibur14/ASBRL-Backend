const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.766g6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // DATA COLLECTION

    const heroCollection = client.db("asbrl").collection("hero");
    const establishedCollection = client.db("asbrl").collection("established");







    /*---------------------------------------------------
                 HOME
    -------------------------------------------------------*/

    // HERO SECTION
    app.get("/hero", async (req, res) => {
      try {
        const result = await heroCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching home-about:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    //update a banner
    app.patch('/hero/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      const result = await heroCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });


    // ESTABLISHED SECTION
    app.get("/established", async (req, res) => {
      try {
        const result = await establishedCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });

    //update a Established
    app.patch('/established/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      const result = await establishedCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });




    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("ASBRL is Running");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
