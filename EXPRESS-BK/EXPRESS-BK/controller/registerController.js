import Customer from '../model/customer.model.js'

const addCustomer = async (req, res) => {

    const name = req.params.name
    const email = req.params.email
    const pwd = req.params.pwd
    const address = req.params.address

    const noofrec = await Customer.find({}).countDocuments()
    const maxid = noofrec + 1
    
    const customer1 = {
        customerNumber: maxid,
        customerName: name,
        contactLastName: name,
        contactFirstName: name,
        phone: "",
        addressLine1: address,
        addressLine2: address,
        city: "",
        state: "",
        postalCode: "",
        country: "",
        salesRepEmployeeNumber: "",
        creditLimit: "",
        email: email,
        file: "",
        pwd: pwd,
        type: "M"
    }
    const customer=new Customer(customer1)
    await customer.save().then(()=>{
         return res.status(200).send({
            success: true,
            message: "customer record has been saved with id", maxid
        })
    }).catch((err)=>{
         return res.status(200).send({
            success: false,
            message: "customer record has not been saved", 
        })
    })
}


export {addCustomer}