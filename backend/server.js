const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8080
const userRoutes =require('./routes/userRoutes')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/database')

const app = express()

//connect to mongo database
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/api/users' , userRoutes)
app.use('/api/tickets' , require('./routes/ticketRoutes'))


app.get('/', (req, res) => {
  res.send('Hello')
})

app.use(errorHandler)

app.listen(PORT)