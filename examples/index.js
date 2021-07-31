
const db = require('../index');
const path = require('path');


(async () => {
    
    const { User, Company, Product, Order } = await db({
        dialect: 'sqlite',
        storage: path.join(__dirname, 'database.sqlite')
    });

    const company = await Company.create({
        name: 'Almuercitos S.A.S'
    })

    const user = await User.create({
        name: 'Fabian David Dueñas',
        cardId: '1254',
        company: company
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

    const result = await Order.getAll()

    //console.log(JSON.stringify(result, null, 2));
    console.log(result);

})()


