const express = require('express');
const { __routesCustomer } = require('./Customer/routes.customer');

const Routes = express.Router();

Routes.use('/customers', (req, res, next) => { return next() }, __routesCustomer)