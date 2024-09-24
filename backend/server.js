import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.routes.js'
import messageRoute from './routes/message.routes.js'
import connectToMongoDB from './DB/connectToMongoDB.js';

dotenv.config()
const PORT = process.env.PORT
const app = express();

app.use(express.json()) // bach les valeur li radi ijiw man request.body irdhom json
app.use(cookieParser())



 // this is a midellware
app.use('/api/auth',authRoute)
app.use('/api/messages',messageRoute)



app.listen(PORT, () =>{
    connectToMongoDB()
    console.log( `Server running in port ${PORT}`)
} );
