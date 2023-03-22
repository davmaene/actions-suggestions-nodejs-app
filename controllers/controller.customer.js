const { Response } = require("../helpers/helper.message");
const { Customer } = require("../models/model.customer");
const { Op } = require("sequelize");
const { fillphone } = require("../helpers/helper.fillphonenumber");
const { passwordChecker, passwordCrypter } = require("../middlewares/password.ware");
const { randomLongNumber } = require("../helpers/helper.random");
const { v4: uuidv4 } = require('uuid');

const controllerCustomer = {
    list: async (req, res, next) => {

    },

    auth: async (req, res, next) => {

        const { phone, flag, name, region, subregion, callingCode, cca2, currency } = req.body;
        if(!phone) return Response(res, 401, "This request must have at least phone number !");
        
        const uuid = "";
        const verificationCode = randomLongNumber({ length: 6 });
        const ref = uuidv4();
        const pwd = await passwordCrypter({ plainchaine: '123456', salt: 10 });

        try {
            await Customer.findOneCreate({
                where: {
                    [Op.or]: [
                        { phone: fillphone({ phone }) },
                        // { username: phone.toString().toLowerCase() }
                    ]
                },
                defaults: {
                    phone,
                    ref,
                    password: pwd
                }
            })
            .then(([customer, isnew]) => {
                if(isnew){
                    return Response(res, 200, customer)
                }else{
                    return Response(res, 201, customer)
                }
            })
            .catch((err) => {
                return Response(res, 503, err)
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