'use strict'
const { ModelCtor, Model, Op } = require('sequelize');

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
     * @property {ModelCtor<Model>} company
     * @property {boolean} [active]
     * @property {number} [identification],
     */

    /**
     * 
     * @param {UserData} userData 
     * @returns {Promise<Model>} 
     */
    async function create (userData) {
        let { company } = userData;
        delete userData.company;

        if (typeof company === 'number') {
            company = await CompanyModel.findByPk(company);
        }

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
    function getByCardId(cardId, raw=false) {
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
            ],
            raw
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
    async function getAll (raw=false) {
        const result = await UserModel.findAll({
            where: {
                active: true,
            },
            include: {
                model: CompanyModel,
                attributes: ['name']
            },
        });
        if (raw) {
            return result.map((u) => u.toJSON());
        }
        return result;
    }

    /**
     * 
     * @param {Model} user 
     * @param {Model} order 
     * @returns 
     */
    function addOrder (user, order) {
        return user.addOrder(order);
    }

    /**
     * 
     * @param {string} name 
     * @returns {Promise<Array>} 
     */
    async function searchByName(name) {
        const results = await UserModel.findAll({
            where: {
                active: true,
                name: {
                    [Op.like]: `%${name}%`,
                },
            },
            include: {
                model: CompanyModel,
                attributes: ['name'],
            }
        });
        return results.map(r => r.toJSON());
    }

    return {
        create,
        update,
        destroy,
        getById,
        getByCardId,
        getByIdentification,
        getAll,
        addOrder,
        searchByName
    }
}


module.exports = setupUser