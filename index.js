const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb://simpleCrudUser:YotNKNbXB6PoVPsP@ac-robhxvb-shard-00-00.immgcuf.mongodb.net:27017,ac-robhxvb-shard-00-01.immgcuf.mongodb.net:27017,ac-robhxvb-shard-00-02.immgcuf.mongodb.net:27017/?ssl=true&replicaSet=atlas-wuamb0-shard-0&authSource=admin&appName=Cluster0`;


// mongodb+srv://simpleCrudUser:YotNKNbXB6PoVPsP@cluster0.immgcuf.mongodb.net/?appName=Cluster0

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const run = async() => {
    try{
        await client.connect();

        const db = client.db("simpleCrud");
        const userCollections = db.collection("users");

        app.get('/users', async(req, res)=> {
            const cursor = userCollections.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/users/:id', async(req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            }
            const user = await userCollections.findOne(query);
            res.send(user);
        })

        await client.db("admin").command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res)=> {
    res.send('Simple CRUD server is serving');
});

app.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
})