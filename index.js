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

    const userCollection = client.db('asbrl').collection('users');
    const heroCollection = client.db("asbrl").collection("hero");
    const establishedCollection = client.db("asbrl").collection("established");
    const recyclingCollection = client.db("asbrl").collection("recycling");
    const credentialCollection = client.db("asbrl").collection("credential");
    const commitmentCollection = client.db("asbrl").collection("commitment");
    const serviceCollection = client.db("asbrl").collection("service");
    const companyProfileCollection = client.db("asbrl").collection("profile");
    const teamCollection = client.db("asbrl").collection("team");



    /*---------------------------------------------------
                HOME
   -------------------------------------------------------*/

    // Get all user in db(admin)
    app.get('/users', async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    //get user in db(user)
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email
      const result = await userCollection.findOne({ email })
      res.send(result)
    });


    app.get('/users/admin/:email', async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' })
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === 'admin';
      }
      res.send({ admin });
    })


    // user info save in db for user signup
    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email }
      const existingUser = await userCollection.findOne(query)
      if (existingUser) {
        return res.send({ message: 'User already exits', insertedId: null })
      }
      const result = await userCollection.insertOne(user)
      res.send(result)

    });


    // Change user role 
    app.patch('/users/admin/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          role: 'admin'
        }
      }
      const result = await userCollection.updateOne(filter, updatedDoc)
      res.send(result)
    });

    //Delete user in db
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })




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

    // Get data in db recycling
    app.get("/recycling", async (req, res) => {
      try {
        const result = await recyclingCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    //update recycling data in db
    app.patch('/recycling/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      const result = await recyclingCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });


    // Credentials Section
    app.get("/credentials", async (req, res) => {
      try {
        const result = await credentialCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });

    //update credentials data in db
    app.patch('/credentials/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      const result = await credentialCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });



    // commitments Section
    app.get("/commitments", async (req, res) => {
      try {
        const result = await commitmentCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });

    //update  commitments data in db
    app.patch('/commitments/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      const result = await commitmentCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // Service Section
    app.get("/services", async (req, res) => {
      try {
        const result = await serviceCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    // update service data in db
    app.patch('/services/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      const result = await serviceCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });


    /*---------------------------------------------------
                   ABOUT US PAGE
-------------------------------------------------------*/


    // conpamy Profile 
    app.get("/profile", async (req, res) => {
      try {
        const result = await companyProfileCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });



    // update service data in db
    app.patch('/profile/:id', async (req, res) => {
      const item = req.body;  // This contains the updated data
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          description: item.description,
        },
      };

      try {
        const result = await companyProfileCollection.updateOne(filter, updatedDoc);
        if (result.modifiedCount > 0) {
          res.send({ message: "Profile updated successfully!" });
        } else {
          res.status(404).send({ error: "Profile not found or no changes made." });
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).send({ error: "Failed to update the profile" });
      }
    });



    // Team Member
    app.get("/team", async (req, res) => {
      try {
        const result = await teamCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });



    //update a Team Member
    app.patch('/member/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      const result = await teamCollection.updateOne(filter, updatedDoc);
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
