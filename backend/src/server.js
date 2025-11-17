import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB }  from './config/db.js'
import { connectCloudinary } from './config/cloudinary.js'
import userRouter from './routes/userRoute.route.js'
import productRouter from './routes/productRoute.route.js'

//App config "Configuration de l'application"
const app = express()
const PORT = process.env.PORT || 5000
connectDB()
connectCloudinary()

//Middleware "Intermediaries"
app.use(cors())
app.use(express.json())

//API Endpoints "Points de terminaison API"
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.get('/', (req, res) => {
    res.send('API est en cours d\'execution')
})

app.listen(PORT, () => {
    console.log(`🔌Serveur en cours d'execution sur le port http://localhost:${PORT}`)
    console.log(`📝La liste de tous les produits est affichée par ce serveur, sur le port http://localhost:${PORT}/api/products/list`)
})