import dotenv from 'dotenv'
dotenv.config()
import mongoDB from 'mongodb'
const MongoClient = mongoDB.MongoClient;
const ObjectId = mongoDB.ObjectId;
const mongoURL = process.env.MONGOURL;

// <<<<---------------- PRODUCTS FUNCTIONS----------------->>>>>

function getAllProducts(req, res) {
    MongoClient.connect(mongoURL, (err, db) => {
        if (err) throw err;
        const dbo = db.db("my-pizzeria");
        dbo.collection("products").find({}).toArray((error, products) => {
            if (error) throw error;
            res.send(products);
            db.close();
        })
    })
}

let productId = 44;
function postNewProduct(req, res) {
    const myObj = req.body;
    myObj.id = productId++;
    MongoClient.connect(mongoURL, (err, db) => {
        if (err) throw err;
        const dbo = db.db("my-pizzeria");
        dbo.collection("products").insertOne(myObj, (error, product) => {
            if (error) throw error;
            res.send(product);
            db.close();
        })
    })
}

function updateProductByGivenId(req, res) {
    MongoClient.connect(mongoURL, (err, db) => {
        if (err) throw err;
        const myObj = req.body;
        const objId = { id: Number(req.params.id) };
        console.log(objId);
        const dbo = db.db("my-pizzeria");
        dbo.collection("products").updateOne(objId, { $set: myObj }, (error, docs) => {
            if (error) throw error;
            console.log(docs);
            res.send(docs);
            db.close();
        })
    })
}

function deleteProductById(req, res) {
    MongoClient.connect(mongoURL, (err, db) => {
        if (err) throw err;
        const dbo = db.db("my-pizzeria");
        dbo.collection("products").findOneAndDelete({ _id: ObjectId(req.params.id) }), (error, product) => {
            if (error) throw error;
            res.sendStatus(200);
            db.close();
        }
    })
}


// <<<<---------------- CART FUNCTIONS----------------->>>>>

function getCartById(req, res) {
    console.log(req.params);
    MongoClient.connect(mongoURL, (err, db) => {
        if (err) throw err;
        const dbo = db.db("my-pizzeria");
        dbo.collection("carts").find(req.params).toArray((error, product) => {
            if (error) throw error;
            res.send(product);
            db.close();
        })
    })
}

function addToCart(req, res) {
    MongoClient.connect(mongoURL, (err, db) => {
        if (err) throw err;
        const myObj = req.body.newArray;
        const objId = { localId: req.params.localId };
        const dbo = db.db("my-pizzeria");
        dbo.collection("carts").updateOne(objId, { $push: { products: myObj }, $set: {counter: req.body.counter}}, (error, docs) => {
            if (error) throw error;
            res.send(docs);
            db.close();
        })
    })
}

function deleteFromCart(req, res) {
    MongoClient.connect(mongoURL, (err, db) => {
        if (err) throw err;
        const myObj = req.body;
        const objId = { localId: req.params.localId };
        const dbo = db.db("my-pizzeria");
        dbo.collection("carts").updateOne(objId, { $pull: { products: myObj } }, (error, docs) => {
            if (error) throw error;
            res.send(docs);
            db.close();
        })
    })
}

function postNewCart(req, res) {
    const myObj = req.body;
    MongoClient.connect(mongoURL, (err, db) => {
        if (err) throw err;
        const dbo = db.db("my-pizzeria");
        dbo.collection("carts").insertOne(myObj, (error, product) => {
            if (error) throw error;
            res.send(product);
            db.close();
        })
    })
}


// <<<<---------------- SLIDER FUNCTION ----------------->>>>>

function getSliderImages(req, res) {
    MongoClient.connect(mongoURL, (err, db) => {
        if (err) throw err;
        const dbo = db.db("my-pizzeria");
        dbo.collection("image_slider").find({}).toArray((error, products) => {
            if (error) throw error;
            res.send(products);
            db.close();
        })
    })
}

// <<<<---------------- ORDER FUNCTION ----------------->>>>>

function addOrder(req, res) {
    MongoClient.connect(mongoURL, (err, db) => {
        if (err) throw err;
        const myObj = req.body;
        const objId = { localId: req.params.localId };
        const dbo = db.db("my-pizzeria");
        dbo.collection("orders").insertOne((myObj), (error, docs) => {
            if (error) throw error;
            res.send(docs);
            db.close();
        })
    })
}

export {
    getAllProducts,
    deleteProductById,
    postNewProduct,
    updateProductByGivenId,
    getCartById,
    deleteFromCart,
    addToCart,
    getSliderImages,
    postNewCart,
    addOrder
};