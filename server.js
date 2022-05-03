import express from 'express'
import {default as axios} from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import {connectDB, getProducts, setProduct} from "./database.js";

const app = express()
const _PORT = process.env.PORT || 8080

app.use(bodyParser.json())

app.use(cors())

app.get('/movies', async (req, res) => {
    console.log("Request: /movies")
    const {data: movies} = await axios.get('https://swapi.dev/api/films')
    res.status(200).json(movies)
})

app.get('/products', async (req, res) => {
    console.log("Request GET: /products")
    getProducts(res)
})

app.post('/product', async (req, res) => {
    console.log("Request POST: /product")
    const data = req.body
    console.log('Body:', data)
    setProduct(data, res)
})

connectDB()

app.listen(_PORT, () => {
    console.info("Server is started on the port:", _PORT)
})