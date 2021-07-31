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


function setupOrder ({UserModel, OrderModel, ProductModel, CompanyModel}) {
    /**
     * 
     * @typedef ProductValue
     * @property {Model} product
     * @property {number} price
     * @property {number} quantity
     */

    /**
     * 
     * @param {Array<ProductValue>} productList
     * @returns {Model} 
     */
    async function create (productList) {
        const order = await OrderModel.create({});
        for(let product of productList){
            await order.addProduct(product.product, {
                through:{
                    price: product.price || product.product.price,
                    quantity: product.quantity || product.product.quantity
                }
            }); 
        }
        
        return order; 
    }

    return {
        create
    }
}


module.exports = setupOrder;