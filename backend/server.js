const express = require('express')
const path = require('path')
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

// serve frontend
if (process.env.NODE_ENV === 'production') {
  // set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => res.sendFile(__dirname , '../', 'frontend', 'build', 'index.html'))
} else {
  app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to the Support Desk API'})
  })
}

app.use(errorHandler)

app.listen(PORT)