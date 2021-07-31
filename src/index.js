const { Sequelize } = require('sequelize');
const path = require('path');


const setupUserModel = require('./models/user');
const setupProductModel = require('./models/product');
const setupOrderModel = require('./models/order');
const setupDetailModel = require('./models/detail');
const setupCompanyModel = require('./models/company');



const setupUser = require('./lib/user');
const setupCompany = require('./lib/company');
const setupOrder = require('./lib/order');
const setupProduct = require('./lib/product');

const Rfid = require('rfid');

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


const models = {
    UserModel,
    OrderModel, 
    CompanyModel, 
    ProductModel, 
    DetailModel 
}

const User = setupUser(models);
const Company = setupCompany(models);
const Product = setupProduct(models);
const Order = setupOrder(models);

const rfid = new Rfid({
    portPath: 'COM8',
    baudRate: 9600
});




(async () => {
    const product = await Product.create({
        name: 'Papa Rellena',
        price: 3000
    });

    const order = await Order.create([
        {product, quantity: 1, price: 2500}
    ]);

    rfid.onReady(() => {
        rfid.readCard((err, data) => {
            User.getByCardId(data.payload.id).then(user => {
                 return User.addOrder(user, order);
            }).then(u => {
                console.log(u.toJSON());
            })
        })
    })

})()


/* (async () => {
    await sequelize.sync({force: true});

    const user = await User.create({
        name: 'Fabian David Dueñas',
        identification: 1144089680,
        cardId: '24417115142'
    })

    const product1 = await Product.create({
        name: 'Almuerzo Completo',
        price: 7000
    });
    const product2 = await Product.create({
        name: 'Almuerzo bandeja',
        price: 5500
    });
    
    
    const order = await Order.create([
        {
            product: product1,
            quantity: 1
        },
        {
            product: product2,
            quantity: 1,
            price: 5000
        }
    ]);

    await User.addOrder(user, order);

    const result = await OrderModel.findAll({
        include: {
            model: ProductModel,
            through:{
                attributes: ['price', 'quantity']
            }
        }
    })

    console.log(JSON.stringify(result, null, 2));

})() */


