const Sequelize = require('sequelize');
const { Configs } = require('../configs/configs.js');
const moment = require('moment');
const dotenv = require("dotenv");

dotenv.config();

const Customer = Configs.define('__tbl_a_customers', {
    fsname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lsname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: { // this is always visible in the App
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
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
