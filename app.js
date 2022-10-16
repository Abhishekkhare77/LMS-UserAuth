const express = require("express");
const mongoose = require("mongoose");
require("./db/conn");
const cors = require("cors");
const auth =require("./routes/auth")

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("server start")
})

app.use(auth);

app.listen(port, () => {
    console.log(`server is started at port number ${port}`);
});