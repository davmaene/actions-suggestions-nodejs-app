const express = require('express');
const { controllerCustomer } = require('../../controllers/controller.customer');
const __routesCustomer = express.Router();

__routesCustomer.get('/list', controllerCustomer.list )

module.exports = {
    __routesCustomer
}