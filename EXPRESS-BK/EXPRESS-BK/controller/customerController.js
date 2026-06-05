import Customer from '../model/customer.model.js'


const getAllCustomer = async (req, res) => {

    await Customer.find({}).then((data) => {
        res.json(data)
    })
}


const addCustomer = async (req, res) => {
    const name = req.params.name
    const email = req.params.email
    const pwd = req.params.pwd
    const noofrec = await Customer.find({}).countDocuments()
    const maxid = noofrec + 1

    const customer1 = {
        customerNumber: 121,
        customerName: name,
        contactLastName: "Bergulfsen2",
        contactFirstName: "Jonas ",
        phone: "07-98 9555",
        addressLine1: "Erling Skakkes gate 78",
        addressLine2: "dd",
        city: "Islamabad",
        state: "XCX",
        postalCode: "4110",
        country: "Pakistan",
        salesRepEmployeeNumber: "1504",
        creditLimit: "81700",
        email: email,
        file: "",
        pwd: pwd,
        type: "M"
    }

    const customer = new Customer(customer1)
    await customer.save().then(() => {
        return res.status(200).send({
            success: true,
            message: "customer record has been saved with id", maxid
        })
    }).catch((err) => {
        return res.status(400).send({
            success: true,
            message: "customer record has not been due to", err
        })

    })
}


const updateCustomer = async (req, res) => {
    //const name = req.params.name
    //const email = req.params.email
    //const address = req.params.address
    //const id= req.params.id
    
    const {name,email,address,id}=req.body
    
    const customer1 = {
       
        customerName: name,
        contactLastName: "Bergulfsen2",
        contactFirstName: "Jonas ",
        phone: "07-98 9555",
        addressLine1: address,
        addressLine2: "dd",
        city: "Islamabad",
        state: "XCX",
        postalCode: "4110",
        country: "Pakistan",
        salesRepEmployeeNumber: "1504",
        creditLimit: "81700",
        email: email,
        file: "",       
        type: "M"
    }

    await Customer.updateMany(
        { customerNumber: id},
        { $set:customer1}
    ).then(() => {
        return res.status(200).send({
            success: true,
            message: "customer record has been updated"
        })
    }).catch((err) => {
        return res.status(400).send({
            success: true,
            message: "customer record has not been updated due to", err
        })

    })
}


export { getAllCustomer, addCustomer,updateCustomer }