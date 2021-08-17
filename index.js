const { Options, SyncOptions } = require('sequelize')
const defaults = require('defaults')

const setupUserModel = require('./src/models/user');
const setupProductModel = require('./src/models/product');
const setupOrderModel = require('./src/models/order');
const setupDetailModel = require('./src/models/detail');
const setupCompanyModel = require('./src/models/company');



const setupUser = require('./src/lib/user');
const setupCompany = require('./src/lib/company');
const setupOrder = require('./src/lib/order');
const setupProduct = require('./src/lib/product');

const setupDatabase = require('./src/lib/db');

/**
 * @function
 * @async
 * @param {Options} config
 * @param {SyncOptions} options
 */
module.exports = async function db (config, syncOptions) {
    config = defaults(config, {
        logging: false
    });

    const sequelize = setupDatabase(config);
     
    const UserModel = setupUserModel(sequelize);
    const OrderModel = setupOrderModel(sequelize);
    const CompanyModel = setupCompanyModel(sequelize);
    const ProductModel = setupProductModel(sequelize);
    const DetailModel = setupDetailModel(sequelize);
    
    
    UserModel.hasMany(OrderModel);
    OrderModel.belongsTo(UserModel);
    
    CompanyModel.hasMany(UserModel);
    UserModel.belongsTo(CompanyModel);
    
    OrderModel.belongsToMany(ProductModel, {through: DetailModel, uniqueKey: 'id'});
    ProductModel.belongsToMany(OrderModel, {through: DetailModel, uniqueKey: 'id'});
    
    
    const models = {
        UserModel,
        OrderModel, 
        CompanyModel, 
        ProductModel, 
        DetailModel 
    };
    
    const User = setupUser(models);
    const Company = setupCompany(models);
    const Product = setupProduct(models);
    const Order = setupOrder(models);

    await sequelize.sync(syncOptions);

    return {
        User,
        Company,
        Product,
        Order
    };
}
