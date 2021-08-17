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
    async function create (userId ,productList) {
        if(productList.length === 0) throw new Error('Debe haber por lo menos un producto');
        if(!userId) throw new Error('No se detecto ningun usuario');

        const user = await UserModel.findByPk(userId);

        if(!user) throw new Error('El usuario no existe');

        const order = await OrderModel.create({});
        for(let product of productList){
            const actualProduct = await ProductModel.findByPk(product.id)
            await order.addProduct(actualProduct, {
                through:{
                    price: product.details?.price || actualProduct.price,
                    quantity: product.details?.quantity || actualProduct.quantity
                }
            }); 
        }
        await user.addOrder(order);
        return order.toJSON();
    }

    /**
     * 
     * @returns {Promise<Array<Model>>}
     */
    function getAll () {
        return OrderModel.findAll({
            include: {
                model: ProductModel,
                through:{
                    attributes: ['price', 'quantity']
                }
            },
            limit: 30,
            order: [['createdAt', 'DESC']]
        })
    }

    return {
        create,
        getAll
    }
}


module.exports = setupOrder;