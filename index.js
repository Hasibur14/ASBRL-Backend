const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const multer = require("multer");
const upload = multer({ dest: "public/assets/" });
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { restart } = require("nodemon");

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.766g6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db, usersCollection;

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("TestDB"); // Replace <dbname> with your database name
    usersCollection = db.collection("users"); // Replace 'users' with your collection name
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}
connectDB();
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









    //await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
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
