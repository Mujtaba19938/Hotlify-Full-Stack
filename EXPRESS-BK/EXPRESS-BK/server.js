import 'dotenv/config'
import express from 'express'
import connectDB from './config/db.js'
import router from './routes/authRoute.js';
import morgan from 'morgan';
import fs from 'fs'
import path from 'path'
import cors from 'cors'

const app = express()
const port = 5000

const logDir = './logs'
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true })
}
const logFilePath = path.join(logDir, 'log.txt')
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' })

app.use(morgan('dev'))
app.use(morgan('combined', { stream: logStream }))
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4173'],
    credentials: true
}))
app.use(express.json())

//database connection
connectDB()

app.use('/', router)

app.get('/', (req, res) => {
    res.send('Its my main site')
})

app.listen(port, () => {
    console.log(`server connected on http://localhost:${port}`)
}
)
