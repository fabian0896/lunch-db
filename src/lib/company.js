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

      /**
     * 
     * @param {number} companyId 
     * @param {CompanyData} updateData 
     * @returns {Promise<Array<number, number>>} 
     */
    function update (companyId, updateData) {
        return CompanyModel.update(updateData, {
            where: {
                id: companyId
            }
        })
    }

    /**
     * 
     * @param {number} companyId 
     * @returns {Promise<number>}
     */
    function destroy (companyId) {
        return CompanyModel.destroy({
            where:{
                id: companyId
            }
        });
    }

    /**
     * 
     * @returns {Promise<Model>} 
     */
    function getListWithUsers () {
        return CompanyModel.findAll({
            include: {
                model: UserModel,
                where:{
                    active: true
                }
            }
        })
    }

    /**
     * 
     * @returns {Promise<Model>} 
     */
    function getList (raw = false) {
        return CompanyModel.findAll({
            raw
        });
    }

    /**
     * 
     * @param {number} companyId 
     * @returns {Promise<Model>}
     */
    function getById (companyId) {
        return CompanyModel.findByPk(companyId, {
            include: {
                model: UserModel,
                where: {
                    active: true
                }
            }
        });
    }

    return {
        create,
        getListWithUsers,
        getList,
        destroy,
        update,
        getById
    }
}


module.exports = setupCompany