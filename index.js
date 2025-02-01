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
    const bannerCollection = client.db("asbrl").collection("banner");
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
    const enviromentManagementCollection = client.db("asbrl").collection("enviromentManagement");
    const hazardousManagementCollection = client.db("asbrl").collection("hazardousWaste");
    const healthManagementCollection = client.db("asbrl").collection("health");
    const trainingCollection = client.db("asbrl").collection("training");
    const trainingGalleryCollection = client.db("asbrl").collection("trainingGallery");
    const contactCollection = client.db("asbrl").collection("contact");







    /*---------------------------------------------------
                 HOME
    -------------------------------------------------------*/

    // HERO SECTION
    app.get("/hero", async (req, res) => {
      try {
        const result = await bannerCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching home-about:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    // HERO UPDATE DATA IN DB
    app.patch('/hero/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;

      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ID format" });
      }

      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: { ...item }
      };

      const result = await bannerCollection.updateOne(filter, updatedDoc);
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
          image: item.image
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
      const { _id, ...updateFields } = req.body; // Exclude `_id`
      const id = req.params.id;

      try {
        const filter = { _id: new ObjectId(id) }; // Convert string ID to ObjectId
        const updatedDoc = { $set: updateFields }; // Set only allowed fields

        const result = await videoCollection.updateOne(filter, updatedDoc);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to update video", error });
      }
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
      console.log(result)
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



    // Get Education training in db
    app.get('/training', async (req, res) => {
      try {
        const result = await trainingCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    //update  training data in db
    app.patch('/training/:id', async (req, res) => {
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
        const result = await trainingCollection.updateOne(filter, updatedDoc);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to update the infrastructure facility" });
      }
    });


    /*---------------------------------------------------
                     Training Gallery
     -------------------------------------------------------*/



    app.get("/trainingGallerys", async (req, res) => {
      try {
        const result = await trainingGalleryCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });

    // Get a single blog data from db using _id
    app.get('/trainingGallery/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await trainingGalleryCollection.findOne(query)
      res.send(result)
    });


    // Save certificates in db
    app.post('/trainingGallery', async (req, res) => {
      const item = req.body;
      const result = await trainingGalleryCollection.insertOne(item);
      res.send(result);
    });


    //update a Recycling Ship
    app.patch('/trainingGallery/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...item,
        },
      };

      const result = await trainingGalleryCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });


    //Delete certificates in db
    app.delete('/trainingGallery/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await trainingGalleryCollection.deleteOne(query);
      res.send(result);
    })

    /*---------------------------------------------------
                      ENVIRONMENT MANAGEMENT
        -------------------------------------------------------*/

    // Get Environment  in db
    app.get('/environments', async (req, res) => {
      try {
        const result = await enviromentManagementCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    //update   Environment  data in db
    app.patch('/environment/:id', async (req, res) => {
      const id = req.params.id;
      const item = req.body;

      // Ensure the `id` is valid
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }

      const filter = { _id: new ObjectId(id) };
      const { _id, ...updateData } = item;

      const updatedDoc = {
        $set: {
          ...updateData,
        },
      };

      try {
        const result = await enviromentManagementCollection.updateOne(filter, updatedDoc);

        // Check if the document was found and modified
        if (result.matchedCount === 0) {
          return res.status(404).send({ error: "Environment not found" });
        }
        res.send({
          message: "Environment updated successfully",
          result,
        });
      } catch (error) {
        console.error("Error updating the environment:", error);
        res.status(500).send({ error: "Failed to update the environment" });
      }
    });


    /*---------------------------------------------------
                    Hazardous MANAGEMENT
        -------------------------------------------------------*/

    // Get Environment  in db
    app.get('/hazardous', async (req, res) => {
      try {
        const result = await hazardousManagementCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    //update   Environment  data in db
    app.patch('/hazardous/:id', async (req, res) => {
      const id = req.params.id;
      const item = req.body;

      // Ensure the `id` is valid
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }

      const filter = { _id: new ObjectId(id) };
      const { _id, ...updateData } = item;

      const updatedDoc = {
        $set: {
          ...updateData,
        },
      };

      try {
        const result = await hazardousManagementCollection.updateOne(filter, updatedDoc);

        // Check if the document was found and modified
        if (result.matchedCount === 0) {
          return res.status(404).send({ error: "hazardous not found" });
        }
        res.send({
          message: "hazardous updated successfully",
          result,
        });
      } catch (error) {
        console.error("Error updating the hazardous:", error);
        res.status(500).send({ error: "Failed to update the hazardous" });
      }
    });



    /*---------------------------------------------------
                  HEALTH MANAGEMENT
        -------------------------------------------------------*/

    // Get health in db
    app.get('/health', async (req, res) => {
      try {
        const result = await healthManagementCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching established:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    //update   Health  data in db
    app.patch('/health/:id', async (req, res) => {
      const id = req.params.id;
      const item = req.body;

      // Ensure the `id` is valid
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }

      const filter = { _id: new ObjectId(id) };
      const { _id, ...updateData } = item;

      const updatedDoc = {
        $set: {
          ...updateData,
        },
      };

      try {
        const result = await healthManagementCollection.updateOne(filter, updatedDoc);

        // Check if the document was found and modified
        if (result.matchedCount === 0) {
          return res.status(404).send({ error: "Health not found" });
        }
        res.send({
          message: "Health updated successfully",
          result,
        });
      } catch (error) {
        console.error("Error updating the health:", error);
        res.status(500).send({ error: "Failed to update the health" });
      }
    });



    /*---------------------------------------------------
                 CONTACT ENQUERY FROM
        -------------------------------------------------------*/

    // Get contact list in db
    app.get('/contact', async (req, res) => {
      try {
        const result = await contactCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching contact:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });


    // Save contact list in db
    app.post('/contact', async (req, res) => {
      const item = req.body;
      const result = await contactCollection.insertOne(item);
      res.send(result);
    });




    //Delete certificates in db
    app.delete('/contact/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await contactCollection.deleteOne(query);
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
