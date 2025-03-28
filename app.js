require("dotenv").config()
const express = require('express');
const mongoose = require("mongoose")
const userRouter = require("./routes/userRouter")
const newsRouter = require("./routes/newsRouter")
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter)
app.use("/news", newsRouter)

mongoose.connect(process.env.MONGODB_URI).then(() => {

    console.log("Connected to MongoDB!");

    app.listen(port, (err) => {
        if (err) {
            return console.log('Something bad happened', err);
        }
        console.log(`Server is listening on ${port}`);
    });
})





module.exports = app;