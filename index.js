const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion } = require('mongodb');
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







    /*---------------------------------------------------
                 HOME
    -------------------------------------------------------*/


    app.get("/heros", async (req, res) => {
      try {
        const result = await heroCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching home-about:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });



    app.patch("/hero/:id", async (req, res) => {
      const id = req.params.id;

      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: { title, description, ...(img && { img }) },
      };

      try {
        const result = await heroCollection.updateOne(query, updateDoc);
        res.send(result);
      } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send({ error: "Failed to update data" });
      }
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
