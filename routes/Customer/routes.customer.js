const express = require('express');
const { controllerCustomer } = require('../../controllers/controller.customer');
const __routesCustomer = express.Router();

__routesCustomer.get('/list', controllerCustomer.list )
__routesCustomer.post('/customer/signin', controllerCustomer.signIn )
__routesCustomer.post('/customer/signup', controllerCustomer.signUp )

module.exports = {
    __routesCustomer
}