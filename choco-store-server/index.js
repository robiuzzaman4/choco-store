const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middlewere
// vercel cors config
const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

app.use(cors(corsConfig));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Chocolate Managment Server Is Running');
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wjbyitu.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const run = async () => {
    try {
        await client.connect();

        const chocolateCollection = client.db("chocolateDB").collection("chocolate");

        // all http requests

        app.get('/chocolates', async (req, res) => {
            const cursor = chocolateCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/chocolate/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await chocolateCollection.findOne(query);
            res.send(result);
        })

        app.post('/chocolates', async (req, res) => {
            const chocolate = req.body;
            const result = await chocolateCollection.insertOne(chocolate);
            res.send(result);
        })

        app.put('/chocolate/:id', async (req, res) => {
            const id = req.params.id;
            const chocolate = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedChocolate = {
                $set: {
                    name: chocolate.name,
                    country: chocolate.country,
                    category: chocolate.category,
                    price: chocolate.price,
                    photo: chocolate.photo
                }
            }

            const result = await chocolateCollection.updateOne(filter, updatedChocolate, options);
            res.send(result);
        })

        app.delete('/chocolate/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await chocolateCollection.deleteOne(query);
            res.send(result);
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Chocolate Managment Server Is Running On Port: ${port}`);
})
