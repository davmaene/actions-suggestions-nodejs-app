const { Response } = require("../helpers/helper.message.js");

const AccessValidator = async (req, res, next) => {
    const { apikey, accesskey } = req.headers;
    if(apikey && accesskey){
        if(1){

        }else return Response(res, 403, " Your don't have right access !")
    }else return Response(res, 403, " Your don't have right access !")
};

const CustomerMiddleWare = async (req, res, next) => {

};

module.exports = {
    AccessValidator,
    CustomerMiddleWare
};