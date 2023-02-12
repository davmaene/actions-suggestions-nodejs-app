const { Response } = require("../helpers/helper.message");
const { Customer } = require("../models/model.customer");
const { Op } = require("sequelize");
const { fillphone } = require("../helpers/helper.fillphonenumber");
const { passwordChecker } = require("../middlewares/password.ware");

const controllerCustomer = {
    list: async (req, res, next) => {

    },

    signIn: async (req, res, next) => {

        const { username, password } = req.body;
        if(!username || !password) return Response(res, 401, "This request must have at least username and password !");

        try {
            await Customer.findOne({
                where: {
                    [Op.or]: [
                        { phone: fillphone({ phone: username.toString() }) },
                        { username: username.toString().toLowerCase() }
                    ]
                }
            })
            .then((customer) => {
                if(customer instanceof Customer){
                    passwordChecker({
                        plainchaine: password,
                        cryptedchaine: customer.password
                    }, (err, matched) => {
                        if(matched){
                            return Response(res, 200, customer)
                        }else{
                            return Response(res, 203, "Login failed !")
                        }
                    })
                }else{
                    return Response(res, 203, "Login failed !")
                }
            })
            .catch((err) => {
                
            });

        } catch (error) {
            return Response(res, 500, error)
        }
    },

    signUp: async (req, res, next) => {
        
    }
}

module.exports = {
    controllerCustomer
}