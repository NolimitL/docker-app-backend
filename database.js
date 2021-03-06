import mongoose from "mongoose";
import {v4 as uuid4} from "uuid";
import e from "express";

const ProductSchema = new mongoose.Schema({
    product: String,
    price: String
}, {
    collection: 'groceries'
})
const ProductModel = mongoose.model("Products", ProductSchema)

/**
 *
 */
export function connectDB(){
    mongoose.connect(`mongodb://${process.env.MONGODB_URL}:27017/local`,
        { useNewUrlParser: true,
                    auth: {
                        username: process.env.MONGODB_USERNAME,
                        password: process.env.MONGODB_PASSWORD
                    },
                    authSource: "admin"
                }, (error) => {
        if (error){
            console.log('[Connection error]: ', error)
            return true
        }else{
            console.info("Database is connected!")
        }
    })
}

/**
 *
 * @param res
 */
export function getProducts(res){
    ProductModel.find((err, data) => {
        if (err){
            console.log('Error:', err)
            res.status(400).send()
        }else{
            console.log("Result:", data)
            res.send(data)
        }

    })
}

/**
 * This function let set up the product to DB
 * @param data
 * @param res
 */
export function setProduct(data, res){
    const newProduct = new ProductModel({
        product: data.product,
        price: '$'+ data.price
    })
    newProduct.save((err, data) => {
        if (err){
            console.log("Error:",err)
            res.status(500).send()
        }else{
            console.log('Data:', data)
            res.status(200).send()
        }
    })
}

/**
 * This function is for deleting a whole list of groceries
 */
export function removeAllProducts(res){
    ProductModel.remove({}, (error) => {
        if (error){
            console.log("Error:", error)
            res.status(500).send()
        }else{
            res.status(200).send()
        }
    })
}