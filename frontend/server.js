const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

app.get("/add-storage", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "add-storage.html"));
});
app.post("/save-storage", async (req, res) => {

    try {

        await client.connect();

const database = client.db("storageBookingDB");

        const collection = database.collection("storageUnits");

        await collection.insertOne({
            unitId: req.body.unitId,
            location: req.body.location,
            size: req.body.size,
            price: req.body.price,
            createdDate: new Date()
        });

        console.log("Storage Unit Saved");

        res.sendFile(path.join(__dirname, "views", "success.html"));

    } catch (error) {

        console.error(error);

        res.send("Database Error");

    }

});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});