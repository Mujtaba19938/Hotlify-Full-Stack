import Product from '../model/product.model.js'


const getAllProduct = async (req, res) => {

    const page=req.params.page
    const pagesize=req.params.pagesize
    const sortby=req.params.sortby
    const cat=req.params.cat

    const skip=(page-1)*pagesize
    
    const products = await Product.find({})

    if (products) {
        Product.find(
            {
               productLine: { $regex: new RegExp(cat, 'i') } 
            }
        )
        .skip(skip)
        .limit(pagesize)
        .sort({[sortby]:1})
        .then((products) => {
            res.json({products})
        }).catch((err) => {
            return res.status(500).send({
                success: false,
                message: "record not found due to", err
            })
        })
    }

}


const getProducts = async (req, res) => {

  
    Product.find().then((products) => {
            res.json({products})
        }).catch((err) => {
            return res.status(500).send({
                success: false,
                message: "record not found due to", err
            })
        })
    }


const groupProduct=async (req,res)=>{

    await Product.aggregate(
       [
         {
            $group:{
                _id:"$productLine",
                noofproduct:{$sum:1}              
            }
         },
         {
            $limit:5
         },
         {
            $sort:{"buyPrice":-1}
         }
       ]
    )
    .then((products)=>{
        res.json({products})
    }).catch((err)=>{
         console.log("RECORD NOT FOUND DUE TO",err)
    })
}


const getProductbyID = async (req, res) => {

    const id = req.params.id
    
        Product.find({ productID: id }).then((products) => {
            res.json(products)
        }).catch((err) => {
            return res.status(500).send({
                success: false,
                message: "record not found due to", err
            })
        })
   
}


const getProductbyKeyword = async (req, res) => {

    const keyword = req.params.keyword

    Product.find(
        {
            $or: [
                {
                    productName: { $regex: new RegExp(keyword, 'i') }
                },
                {
                    productLine: { $regex: new RegExp(keyword, 'i') }
                },
                {
                    productDescription: { $regex: new RegExp(keyword, 'i') }
                },
            ]
        }

    ).then((data) => {
        res.json(data)
    }).catch((err) => {
        return res.status(500).send({
            success: false,
            message: "record not found due to", err
        })
    })
}

const addProduct = async (req, res) => {
   
    const {name,cat,price}=req.body;
   
    const filename="Aptech"+'-'+req.file.originalname;

    const noofrec=await Product.find({}).countDocuments()
    const maxid=noofrec+1

    const product1 = {
        productName: name,
        productLine: cat,
        productScale: "1:10",
        productVendor: "Classic Metal Creations",
        productDescription: "Turnable front wheels; steering function; detailed interioretailed …",
        quantityInStock: 7305,
        buyPrice: price,
        MSRP: "214.3",
        image: filename,
        productID: maxid
    }

    const product=new Product(product1)
    await product.save().then(()=>{
        return res.status(200).send({
            success: true,
            message: "product record has been saved"
        })
    }).catch((err)=>{
          return res.status(400).send({
            success: true,
            message: "product record has not been due to",err
        })

    })
}


const updateProduct = async (req, res) => {
   
    const {name,cat,price,id}=req.body;

    const product1 = {
        productName: name,
        productLine: cat,
        productScale: "1:10",
        productVendor: "Classic Metal Creations",
        productDescription: "Turnable front wheels; steering function; detailed interioretailed …",
        quantityInStock: 7305,
        buyPrice: price,
        MSRP: "214.3",
        image: "data/2.jpg"
    }
   
    await Product.updateMany(
        {productID: id},
        {$set:product1}
    ).then(()=>{
        return res.status(200).send({
            success: true,
            message: "product record has been updated"
        })
    }).catch((err)=>{
          return res.status(400).send({
            success: true,
            message: "product record has not been updated due to",err
        })

    })
}


const deleteProduct = async (req, res) => {
   
    const {id}=req.body;
   
    await Product.deleteMany(
        {productID: id}
    ).then(()=>{
        return res.status(200).send({
            success: true,
            message: "product record has been deleted"
        })
    }).catch((err)=>{
          return res.status(400).send({
            success: true,
            message: "product record has not been deleted due to",err
        })

    })
}

export { getAllProduct, getProductbyID, getProductbyKeyword, addProduct,groupProduct,getProducts,updateProduct,deleteProduct }