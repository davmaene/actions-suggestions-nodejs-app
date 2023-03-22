const Sequelize = require('sequelize');
const { Configs } = require('../configs/configs.js');
const moment = require('moment');
const dotenv = require("dotenv");

dotenv.config();

const Customer = Configs.define('__tbl_a_customers', {
    ref: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: process.env.APPESCAPESTRING
    },
    fsname: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: process.env.APPESCAPESTRING
    },
    lsname: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: process.env.APPESCAPESTRING
    },
    username: { // this is always visible in the App
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: process.env.APPESCAPESTRING
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: process.env.APPESCAPESTRING
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: process.env.APPESCAPESTRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: process.env.APPESCAPESTRING
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: process.env.APPESCAPESTRING
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: process.env.APPESCAPESTRING
    },
    isverified: {
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
    Customer
}
