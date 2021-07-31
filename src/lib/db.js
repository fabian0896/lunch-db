'use strict'
//Module to initialize sequelize as a singletone 

const { Sequelize, Options} = require('sequelize');


/**@type {Sequelize} */
let sequelize;

/**
 * @function
 * @param {Options} config 
 * @returns {Sequelize}
 */
module.exports = function setupDatabase (config) {
    if(!sequelize) {
        sequelize = new Sequelize(config);
    }
    return sequelize;
};