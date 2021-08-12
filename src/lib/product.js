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
     * @param {boolean} favorite 
     * @returns {Promise<Model>}
     */
    function setfavorite (productId, favorite) {
        return ProductModel.update({ favorite }, {
            where: {
                id: productId
            }
        });
    }

    /**
     * 
     * @param {number} productId 
     * @returns {Promise<Model>}
     */
    async function toggleFavorite (productId) {
        const product = await getById(productId);
        const favorite = !product.favorite;
        const res = await ProductModel.update({ favorite }, {
            where: {
                id: productId
            }
        });
        return res;
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
    function getAll (raw=false) {
        return ProductModel.findAll({
            where: {
                active: true
            },
            order: [['createdAt', 'DESC']],
            raw
        });
    }

    /**
     * 
     * @returns {Promise<Array<Model>>}
     */
    function getFavorites (raw=false) {
        return ProductModel.findAll({
            where: {
                favorite: true
            },
            raw
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
        getById,
        getFavorites,
        setfavorite,
        toggleFavorite
    }
}


module.exports = setProduct;

