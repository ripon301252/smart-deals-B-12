const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const admin = require("firebase-admin");
const port = process.env.PORT || 3000;



const serviceAccount = require("./smart-deals-firebase-admin-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



// middleware
app.use(cors());
app.use(express.json());
const logger = (req, res, next) => {
  console.log('logging info')
  next();
}
const verifyFireBaseToken = async(req, res, next)=>{
  console.log('in the verify middleware', req.headers.authorization)
  if(!req.headers.authorization){
    // do not allow to go 
    return res.status(401).send({message: 'unauthorized access'})
  }
  const token = req.headers.authorization.split(' ')[1]
  if(!token){
    return res.status(401).send({message: 'unauthorized access'})
  }

  // verify id token
  try{
      const userInfo =  await admin.auth().verifyIdToken(token);
      req.token_email = userInfo.email;
      console.log('after token validation', userInfo);
      next();
  }
  catch{
    console.log('invalid token')
    return res.status(401).send({message: 'unauthorized access'})
  }
}


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w0nmtjl.mongodb.net/?appName=Cluster0`;
const uri = `mongodb+srv://smartdbUser:Tiq5E5rt151ktONs@cluster0.w0nmtjl.mongodb.net/?appName=Cluster0`;
// const uri = "mongodb://localhost:27017";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



app.get('/', (req, res)=>{
    res.send('Smart Server is Running')
})


async function run() {
  try {
    await client.connect();

    const db = client.db('smart_db');
    const productsCollection = db.collection('products');
    const bidsCollection = db.collection('bids');
    const userCollection = db.collection('users');

    // jwt related api
    app.post('/getToken', (req, res)=>{
      const token = jwt.sign({email: 'abc'}, 'secret', {expiresIn: '1h'})
      res.send({token: token})
    })


    // create (send database)
    app.post('/users', async(req, res)=>{
      const newUser = req.body;

      const email = await req.body.email;
      const query = {email: email}
      const existingUser = await userCollection.findOne(query)
      if(existingUser){
        res.send({message: 'user already exists. do not need to insert again'})
      }
      else{
        const result = await userCollection.insertOne(newUser);
        res.send(result);
      }

      // const result = await userCollection.insertOne(newUser);
      // res.send(result);
    })


    // All read 
    app.get('/products', async(req, res)=>{

      // const projectField = { _id: 0, title: 1, price_min: 1, price_max: 1, image: 1, }
      // const cursor = productsCollection.find().sort({price_min: -1}).skip(2).limit(2).project(projectField);

        // my product
      // console.log(req.query)
      const email = req.query.email;
      const query = {}
      if(email){
        query.email = email
      }

      const cursor = productsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    })

    // show only 6 product
    app.get('/latest-products', async(req, res)=>{
      const cursor = productsCollection.find().sort({created_at: -1}).limit(6);
      const result = await cursor.toArray();
      res.send(result)
    })

    // show All Products
    app.get('/allProducts', async(req, res)=>{
      const cursor = productsCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })


    // single read
    app.get('/products/:id', async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id)};
      const result = await productsCollection.findOne(query);
      res.send(result)
    })


    // create (send database)
    app.post('/products', async(req, res)=>{
        const newProduct = req.body;
        const result = await productsCollection.insertOne(newProduct);
        res.send(result)
    })


    // update
    app.patch('/products/:id', async(req, res)=>{
      const id = req.params.id;
      const updateProduct = req.body;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          name: updateProduct.name,
          price: updateProduct.price,
        }
      }
      const result = await productsCollection.updateOne(query, update);
      res.send(result)
    })


    // delete
    app.delete('/products/:id', async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    })


    // bids related apis
    app.get('/bids', logger, verifyFireBaseToken, async(req, res)=>{
      console.log('headers', req)
      const email = req.query.email;
      const query = {};
      if(email){
        if(email !== req.token_email){
          return res.status(403).send({message: 'Forbidden Access'})
        }
        query.buyer_email = email;
      }

      const cursor = bidsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    })


     app.get('/products/bids/:productId', verifyFireBaseToken, async(req, res)=>{
        const productId = req.params.productId;
        const query = {product: productId};
        const cursor = bidsCollection.find(query).sort({bid_price: -1});
        const result = await cursor.toArray();
        res.send(result)
    })

    // my Bids
    // app.get('/bids', async (req, res)=>{

    //   const query = {};
    //   if(query.email){
    //     query.buyer_email = email
    //   }

    //   const cursor = bidsCollection.find(query);
    //   const result = await cursor.toArray();
    //   res.send(result);
    // })

    app.post('/bids', async(req, res)=>{
      const newBid = req.body;
      const result = await bidsCollection.insertOne(newBid)
      res.send(result);
    })

    // bid remove (delete)
    app.delete('/bids/:id', async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bidsCollection.deleteOne(query);
      res.send(result);
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  finally {
    
  }
}
run().catch(console.dir);

app.listen(port, ()=>{
    console.log(`Smart server is running on port: ${port}`)
})


// client.connect()
//     .then(()=>{
//         app.listen(port, ()=>{
//             console.log(`Smart server is running now on port: ${port}`)
//         })  
//     })
//     .catch(console.dir)



// v-6, 8:00s