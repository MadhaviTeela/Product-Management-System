const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const productRoutes = require('./routes/productRoutes')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/products' , productRoutes)

app.get('/base',(req,res) => {
  res.send("Hello , Welcome!");
})

mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log("MongoDB connected Successfully...")
      })
      .catch((err) => {
        console.log("MongoDB Connection Error : " , err)
      })

const PORT = process.env.PORT || 5000
app.listen(PORT , () => {
  console.log(`Server is running on the Port ${PORT}...`)
})