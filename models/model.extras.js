const Sequelize = require('sequelize');
const { Configs } = require('../configs/configs.js');
const moment = require('moment');
const dotenv = require("dotenv");

dotenv.config();

// {
//     "callingCode": [
//       "243",
//     ],
//     "cca2": "CD",
//     "currency": [
//       "CDF",
//     ],
//     "flag": "flag-cd",
//     "name": "DR Congo",
//     "region": "Africa",
//     "subregion": "Middle Africa",
// }

const Extrasinfos = Configs.define('__tbl_a_customers', {
    callingcode: {
        type: Sequelize.ARRAY,
        allowNull: false,
        defaultValue: []
    },
    currency: { // this is always visible in the App
        type: Sequelize.ARRAY,
        allowNull: true,
        defaultValue: []
    },
    flag: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
    },
    countrycode: {
        type: Sequelize.ARRAY,
        allowNull: true,
        defaultValue: []
    },
    region: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
    },
    subregion: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
    },
    idcustomer: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    createdon: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:  moment().format('L')
    }
}, {
    timestamps: false,
    freezeTableName: true,
    indexes: [
        {
            unique: true,
            fields: ["email", "phone", "username"]
        }
    ]
});

module.exports = {
    Extrasinfos
}
