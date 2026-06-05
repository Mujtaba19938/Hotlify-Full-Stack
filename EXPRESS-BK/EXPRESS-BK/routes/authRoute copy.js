import express from 'express'
import {getAllProduct,getProducts,getProductbyID,getProductbyKeyword, addProduct,groupProduct,updateProduct,deleteProduct} from '../controller/productController.js'
import { getAllCustomer,updateCustomer  } from '../controller/customerController.js'
import { addCustomer } from '../controller/registerController.js'
import { authLogin } from '../controller/signinController.js'
import { addOrder } from '../controller/orderController.js' 
import fs from 'fs'

//3.link
import upload from '../middleware/upload.js'

const router=express.Router()

router.get('/products/:page/:pagesize/:sortby/:cat',getAllProduct)

router.get('/getProducts',getProducts)
router.get('/productbyid/:id',getProductbyID)
router.get('/groupProduct',groupProduct)
router.get('/productbykeyword/:keyword',getProductbyKeyword)
router.get('/customers',getAllCustomer)

//4.add middleware
router.post('/addproduct',upload.single('image'),addProduct)

//5.get image from upload folder

router.get('/images/:imageName',(req,res)=>{

const imageName=req.params.imageName
const readStream=fs.createReadStream(`uploads/${imageName}`)
readStream.pipe(res)

})


router.post('/updateproduct',updateProduct)
router.post('/deleteproduct',deleteProduct)

router.get('/addcustomer/:name/:email/:pwd/:address',addCustomer)

router.get('/authlogin/:uname/:pwd',authLogin)

router.post('/updatecustomer',updateCustomer)

router.post('/addorder',addOrder)

export default router