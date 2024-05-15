import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './config/mongodb.js'
import dotenv from 'dotenv'
import router from './routes/route.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api',router)
dotenv.config()
connectDB()

const PORT = 3000 || process.env.PORT
app.listen(PORT,()=>{
    console.log(`server start listening at ${PORT}`);
})
