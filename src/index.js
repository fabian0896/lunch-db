const { Sequelize } = require('sequelize');
const path = require('path');
const setupUserModel = require('./models/user');
const setupProductModel = require('./models/product');
const setupOrderModel = require('./models/order');
const setupDetailModel = require('./models/detail');
const setupCompanyModel = require('./models/company');

const setupUser = require('./lib/user');
const setupCompany = require('./lib/company');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: require('debug')('db:index')
})

const UserModel = setupUserModel(sequelize);
const OrderModel = setupOrderModel(sequelize);
const CompanyModel = setupCompanyModel(sequelize);
const ProductModel = setupProductModel(sequelize);
const DetailModel = setupDetailModel(sequelize);


UserModel.hasMany(OrderModel);
OrderModel.belongsTo(UserModel);

CompanyModel.hasMany(UserModel);
UserModel.belongsTo(CompanyModel);

OrderModel.belongsToMany(ProductModel, {through: DetailModel});
ProductModel.belongsToMany(OrderModel, {through: DetailModel});





/* (async () => {
    await sequelize.sync({ force: true });

    const company = await CompanyModel.create({
        name: 'Almuerzitos S.A.S'
    })      

    const user = await UserModel.create({
        name: 'Fabian David Dueñas',
        identification: 1144089680,
        cardId: '123456789'
    });
    
    user.setCompany(company);

    console.log(user.toJSON());

    const product1 = await ProductModel.create({
        name: 'Empanada',
        price: 1000
    });
    const product2 = await ProductModel.create({
        name: 'Papa rellena',
        price: 3000
    });
    const product3 = await ProductModel.create({
        name: 'Almuerzo',
        price: 7000
    });
    const product4 = await ProductModel.create({
        name: 'Limonada',
        price: 500
    });

    const productList = [product1, product2, product3, product4];
   
 
    const order = await OrderModel.create({});
    const order2 = await OrderModel.create({});
    
    await order.addProducts(productList);
    await order2.addProducts(product1);
    
    await user.addOrder(order);
    await user.addOrder(order2);
    
    
    console.log(user.toJSON());
    
    const result = await UserModel.findByPk(1, 
        { 
            include: {
            model: OrderModel,
            include: ProductModel
        }
    });
    const orderCount = await result.countOrders();
    console.log(`El usuario ${result.name} tiene ${orderCount} Pedidos`);
    console.log(result.toJSON()); 

})(); */

const models = {
    UserModel,
    OrderModel, 
    CompanyModel, 
    ProductModel, 
    DetailModel 
}

const User = setupUser(models);
const Company = setupCompany(models);

(async () => {
    await sequelize.sync({force: true});
    
    
    const company = await Company.create({
        name: 'Almuerzitos S.A.S'
    })

    await User.create({
        name: 'Fabian David Dueñas',
        cardId: '12',
        identification: '1144089680',
        company
    });


    const results = await User.getAll();
    console.log(results[0].toJSON());

})();