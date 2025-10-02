require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParcer = require('cookie-parser')
const router = require('./router/index')

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json()) 
app.use(cookieParcer())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use('/api', router)


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        app.listen(PORT, () => console.log(`server started on: http://localhost:${PORT}`))
    }catch(e) {
        console.log('SERVER ERROR ', e)
    }
}

start()