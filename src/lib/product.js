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
function setProduct ({ ProductModel }) {
    /**
     * 
     * @typedef ProductValues
     * @property {string} name
     * @property {string} image
     * @property {number} price
     * @property {boolean} [active]
     */
    /**
     * 
     * @param {ProductValues} values 
     * @returns 
     */
    function create (values) {
        return ProductModel.create(values);
    }

    /**
     * 
     * @param {number} productId 
     * @returns {Promise<number>}
     */
    function destroy (productId) {
        return ProductModel.destroy({
            where: {
                id: productId
            }
        });
    }
    /**
     * 
     * @param {number} productId 
     * @param {ProductValues} values 
     * @returns {Promise<[number, Model<any, any>[]]>}
     */
    function update (productId, values) {
        return ProductModel.update(values, {
            where: {
                id: productId
            }
        });
    }

    /**
     * 
     * @returns {Promise<Array<Model>>}
     */
    function getAll () {
        return ProductModel.findAll({
            where: {
                active: true
            },
            order: [['createdAt', 'DESC']]
        });
    }

    /**
     * 
     * @param {number} productId 
     * @returns {Promise<Model>}
     */
    function getById (productId) {
        return ProductModel.findByPk(productId);
    }

    return {
        update,
        destroy,
        create,
        getAll,
        getById
    }
}


module.exports = setProduct;

