const { Response } = require("../helpers/helper.message");
const { Customer } = require("../models/model.customer");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const { fillphone } = require("../helpers/helper.fillphonenumber");
const { passwordChecker, passwordCrypter } = require("../middlewares/password.ware");
const { randomLongNumber } = require("../helpers/helper.random");
const { v4: uuidv4 } = require('uuid');
const { Extrasinfos } = require("../models/model.extras");

const controllerCustomer = {

    list: async (req, res, next) => {
        try {
            await Customer.findAndCountAll({
                where: {
                    status: 1
                }
            })
            .then(({ count, rows }) => {
                return Response(res, 200, { length: count, rows })
            })
            .catch(err => {
                return Response(res, 503, err)
            })
        } catch (error) {
            return Response(res, 500, error)
        }
    },

    auth: async (req, res, next) => {

        const { phone, flag, name, region, subregion, callingCode, cca2, currency } = req.body;
        if(!phone) return Response(res, 401, "This request must have at least phone number !");
        
        const verificationCode = randomLongNumber({ length: 6 });
        const ref = uuidv4();
        const pwd = await passwordCrypter({ plainchaine: '123456', salt: 10 });

        try {

            await Customer.findOrCreate({
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
            .then(([ customer, isnew ]) => {

                if(isnew){

                    Extrasinfos.create({
                        verificationcode: verificationCode,
                        callingcode: callingCode.toString(),
                        currency: currency.toString(),
                        flag,
                        countrycode: cca2.toString(),
                        region,
                        subregion,
                        idcustomer: ref
                    })
                    .then(extras => {
                        return Response(res, 200, { customer, code: verificationCode })
                    })
                    .catch(err => {
                        return Response(res, 503, err)
                    })

                }else{

                    Extrasinfos.update({
                        where: {
                            ref: customer && customer['ref']
                        }
                    })
                    .then(U => {
                        return Response(res, 200, { customer, code: verificationCode })
                    })
                    .catch(err => {
                        return Response(res, 503, err)
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                return Response(res, 503, err)
            });

        } catch (error) {
            console.log(error);
            return Response(res, 500, error)
        }
    },

    signUp: async (req, res, next) => {
        
    }
}

module.exports = {
    controllerCustomer
}