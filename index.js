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
    const qualityPolicyCollection = client.db("asbrl").collection("qualityPolicy");
    const ourCommitmentCollection = client.db("asbrl").collection("ourCommitment");
    const videoCollection = client.db("asbrl").collection("video");
    const groupCompanyCollection = client.db("asbrl").collection("groupCompany");
    const missionVisionCollection = client.db("asbrl").collection("missionVision");
    const recyclingProcessCollection = client.db("asbrl").collection("recyclingProcess");
    const infrastructureFacilityCollection = client.db("asbrl").collection("infrastructureFacility");
    const galleryCollection = client.db("asbrl").collection("gallery");
    const recyclingShipCollection = client.db("asbrl").collection("recyclingShip");
    const certificatesCollection = client.db("asbrl").collection("certificates");
    const blogCollection = client.db("asbrl").collection("blogs");



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


    // Save team member in db
    app.post('/member', async (req, res) => {
      const item = req.body;
      const result = await teamCollection.insertOne(item);
      res.send(result);
    });


    //update a Team Member data
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

    //Delete user in db
    app.delete('/member/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await teamCollection.deleteOne(query);
      res.send(result);
    })


    //  Get data QualityPolicy
    app.get("/policy", async (req, res) => {
      try {
        const result = await qualityPolicyCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    // update Quality-Policy data in db
    app.patch('/policy/:id', async (req, res) => {
      const item = req.body;  // This contains the updated data
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          describe: item.describe,
          description: item.description,
        },
      };

      try {
        const result = await qualityPolicyCollection.updateOne(filter, updatedDoc);
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


    //  Get Our Commitment
    app.get("/ourCommitment", async (req, res) => {
      try {
        const result = await ourCommitmentCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    // Save Our Commitment in db
    app.post('/ourCommitment', async (req, res) => {
      const item = req.body;
      const result = await ourCommitmentCollection.insertOne(item);
      res.send(result);
    });


    //update a Our Comitment
    app.patch('/ourCommitment/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      const result = await ourCommitmentCollection.updateOne(filter, updatedDoc);
      res.send(result);


    });

    //Delete user in db
    app.delete('/ourCommitment/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await ourCommitmentCollection.deleteOne(query);
      res.send(result);
    })



    // conpamy Profile 
    app.get("/group", async (req, res) => {
      try {
        const result = await groupCompanyCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });



    // update service data in db
    app.patch('/group/:id', async (req, res) => {
      const item = req.body;  // This contains the updated data
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          description: item.description,
        },
      };

      try {
        const result = await groupCompanyCollection.updateOne(filter, updatedDoc);
        if (result.modifiedCount > 0) {
          res.send({ message: "group company updated successfully!" });
        } else {
          res.status(404).send({ error: "Profile not found or no changes made." });
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).send({ error: "Failed to update the profile" });
      }
    });



    // Get Video in db
    app.get("/video", async (req, res) => {
      try {
        const result = await videoCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });

    //update  video data in db
    app.patch('/video/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      const result = await videoCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });



    // Get Mission Vision in db
    app.get("/missionVision", async (req, res) => {
      try {
        const result = await missionVisionCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    //update  Mission & Vission data in db
    app.patch('/missionVision/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      const result = await missionVisionCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });



    /*---------------------------------------------------
              GREEN SHIP RECYCLING
-------------------------------------------------------*/

    // Get Recycling process in db
    app.get("/recyclingProcess", async (req, res) => {
      try {
        const result = await recyclingProcessCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    //update   Recycling process data in db
    app.patch('/recyclingProcess/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      const result = await recyclingProcessCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });



    // Get Recycling process in db
    app.get('/infrastructures', async (req, res) => {
      try {
        const result = await infrastructureFacilityCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    //update   Recycling process data in db
    app.patch('/infrastructures/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      // Remove the `_id` field from the item object
      const { _id, ...updateData } = item;

      const updatedDoc = {
        $set: {
          ...updateData,
        },
      };

      try {
        const result = await infrastructureFacilityCollection.updateOne(filter, updatedDoc);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to update the infrastructure facility" });
      }
    });


    // Get Gallery in db
    app.get('/gallery', async (req, res) => {
      try {
        const result = await galleryCollection.find().toArray();
        if (result.length === 0) {
          return res.status(404).send({ message: "No galleries found" });
        }
        res.send(result); // Send all gallery items
      } catch (error) {
        console.error("Error fetching gallery:", error);
        res.status(500).send({ error: "Failed to fetch gallery data" });
      }
    });


    // Gallery image are update in db
    app.patch('/gallery/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      console.log("Received update request with ID:", id);
      console.log("Updated item data:", item);

      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      try {
        const result = await galleryCollection.updateOne(filter, updatedDoc);
        if (result.modifiedCount > 0) {
          res.send({ message: "Gallery updated successfully!" });
        } else {
          res.status(404).send({ error: "Gallery not found or no changes made." });
        }
      } catch (error) {
        console.error("Error updating gallery:", error);
        res.status(500).send({ error: "Failed to update the gallery" });
      }
    });


    //Recycling Ship

    app.get("/ships", async (req, res) => {
      try {
        const result = await recyclingShipCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    // Save Recycling Ship in db
    app.post('/ship', async (req, res) => {
      const item = req.body;
      const result = await recyclingShipCollection.insertOne(item);
      res.send(result);
    });


    //update a Recycling Ship
    app.patch('/ship/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      const result = await recyclingShipCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });


    //Delete Recycling Ship in db
    app.delete('/ship/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await recyclingShipCollection.deleteOne(query);
      res.send(result);
    })



    /*---------------------------------------------------
            certificates Page
-------------------------------------------------------*/

    app.get("/certificates", async (req, res) => {
      try {
        const result = await certificatesCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    // Save certificates in db
    app.post('/certificates', async (req, res) => {
      const item = req.body;
      const result = await certificatesCollection.insertOne(item);
      res.send(result);
    });


    //update a Recycling Ship
    app.patch('/certificates/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      const result = await certificatesCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });


    //Delete certificates in db
    app.delete('/certificate/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await certificatesCollection.deleteOne(query);
      res.send(result);
    })




    /*---------------------------------------------------
          BLOGS Page
  -------------------------------------------------------*/

    app.get("/blogs", async (req, res) => {
      try {
        const result = await blogCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });

    // Get a single blog data from db using _id
    app.get('/blog/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await blogCollection.findOne(query)
      res.send(result)
    });

    
    // Save certificates in db
    app.post('/blog', async (req, res) => {
      const item = req.body;
      const result = await blogCollection.insertOne(item);
      res.send(result);
    });


    //update a Recycling Ship
    app.patch('/blog/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      const result = await blogCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });


    //Delete certificates in db
    app.delete('/blog/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await blogCollection.deleteOne(query);
      res.send(result);
    })






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
