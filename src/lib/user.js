'use strict'
const { ModelCtor, Model } = require('sequelize');

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
function setupUser ({UserModel, OrderModel, ProductModel, CompanyModel}) {
    /**
     * 
     * @typedef UserData
     * @property {string} name
     * @property {string} cardId
     * @property {boolean} [active]
     * @property {number} identification,
     * @property {ModelCtor<Model>} company
     */

    /**
     * 
     * @param {UserData} userData 
     * @returns {Promise<Model>} 
     */
    async function create (userData) {
        const { company } = userData;
        delete userData.company;

        const user = await UserModel.create(userData);
        if(!company) return user;
        const result = await user.setCompany(company);
        return result;
    }

    /**
     * 
     * @param {number} user
     * @param {UserData} updateData
     * @returns {Promise<Array<number, number>>}   
     */
    function update(userId, updateData){
        return UserModel.update(updateData, {
            where: {
                id: userId
            }
        })
    }


    /**
     * 
     * @param {string} userId
     * @returns {Promise<number>}  
     */
    function destroy (userId) {
        return UserModel.destroy({
            where: {
                id: userId
            }
        });
    }


    /**
     * 
     * @param {string} userId
     * @returns {Promise<Model>} 
     */
    function getById(userId) {
        return UserModel.findByPk(userId, {
            include: [
                {
                    model: OrderModel,
                    include: ProductModel,
                    limit: 10,
                    order: ['createdAt', 'DESC']
                }
            ]
        })
    }

    /**
     * 
     * @param {string} cardId
     * @returns {Promise<Model>} 
     */
    function getByCardId(cardId) {
        return UserModel.findOne({
            where:{
                cardId,
            },
            include: [
                {
                    model: OrderModel,
                    include: ProductModel,
                    limit: 10
                }
            ]
        })
    }

    /**
     * 
     * @param {string} identification
     * @returns {Promise<Model>} 
     */
    function getByIdentification (identification) {
        return UserModel.findOne({
            where:{
                identification
            },
            include: [
                {
                    model: OrderModel,
                    include: ProductModel,
                    limit: 10,
                    order: ['createdAt', 'DESC']
                }
            ]
        })
    }

    /**
     * 
     * @returns {Promise<Array<Model>>} 
     */
    function getAll () {
        return UserModel.findAll({
            where: {
                active: true,
            },
            include: {
                model: CompanyModel,
                attributes: ['name']
            }
        })
    }

    return {
        create,
        update,
        destroy,
        getById,
        getByCardId,
        getByIdentification,
        getAll
    }
}


module.exports = setupUser