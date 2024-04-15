require('dotenv').config(); 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');

const app = express();

app.use(express.json()); 
app.use(cors());
app.use(cookieparser());

//routes

app.use('/api',authRouter)
app.use('/api',userRouter)


//open postman
const port = process.env.PORT || 5000; 
const URL = process.env.MONGO_URI;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("db is connected");
}).catch((err) => {
    console.error(err);
});


app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});