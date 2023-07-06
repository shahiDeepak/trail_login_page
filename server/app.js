

require ("dotenv").config()
const express = require("express")
const app = express()
const cors=require("cors")
require("./db/conn")
const router = require("./Routes/routers")
const PORT = 5000
// middlewear

app.use(express.json())
app.use(cors())
app.use(router)


app.get('/',(req,res) =>{
    res.status(200).json("server start");
} )

app.listen(PORT,()=>{
    console.log(`Server start at Port No:${PORT}`)
    
})