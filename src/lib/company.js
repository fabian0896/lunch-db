'use strict'
const { Model } = require('sequelize');

/**
 * @typedef Models
 * @property {ModelCtor<Model>} UserModel 
 * @property {ModelCtor<Model>} ProductModel 
 * @property {ModelCtor<Model>} OrderModel 
 * @property {ModelCtor<Model>} CompanyModel 
 */

/**
 * 
 * @param {Models} models
 * @param {number} numero 
 */
function setupCompany ({UserModel, OrderModel, ProductModel, CompanyModel}) {
    /**
     * 
     * @typedef CompanyData 
     * @property {string} name 
     */
    
    /**
     * 
     * @param {CompanyData} values 
     * @returns {Promise<Model>} 
     */
    function create (values){
        return CompanyModel.create(values);
    }

    
    function getList () {
        return CompanyModel.findAll({
            include: UserModel,
        });
    }
    return {
        create,
        getList
    }
}


module.exports = setupCompany