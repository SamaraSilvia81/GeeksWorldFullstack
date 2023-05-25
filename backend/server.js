// config initial
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());

// Way to read JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());

// Routes API
const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)

const characterRoutes = require('./routes/characterRoutes')
app.use('/character', characterRoutes)

const listRoutes = require('./routes/listRoutes')
app.use('/list', listRoutes)

// Route Initial/ endpoint
app.get('/', (req, res) => {
    res.json({message:'Hello Express!!'}) 
})

// Send to Port
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
  .connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.hfysbyu.mongodb.net/?retryWrites=true&w=majority`
      )
  .then(() => {
      console.log("Connecting to MongoDB...")
      app.listen(3000)
  })
  .catch((e) => {
      console.log(e)
})
