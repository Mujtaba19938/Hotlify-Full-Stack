import Customer from '../model/customer.model.js'

const authLogin = async (req, res) => {

    const uname = req.params.uname
    const pwd = req.params.pwd

    const noofrec = await Customer.find(
        {
            $and: [
                { email: uname },
                { pwd: pwd }
            ]
        }
    ).countDocuments()

    if (noofrec > 0) 
    {
        const customer = await Customer.find(
        {
            $and: [
                { email: uname },
                { pwd: pwd }
            ]
        }
       )

        return res.status(200).send(
            {
                success: true,
                message: "valid login",
                customer:customer
            }
        )
    }
    else 
    {
        return res.status(200).send(
            {
                success: false,
                message: "Invalid login"
            }
        )
    }
}

export {authLogin}