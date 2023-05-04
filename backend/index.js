const express= require("express");
require("dotenv").config();
const {connection} = require("./db");

const app = express();
app.use(express.json());

app.listen(process.env.port,async()=>{
    await connection
    console.log(`connected to ${process.env.port}`);
})