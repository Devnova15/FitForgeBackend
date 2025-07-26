const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Customer = require('./models/User');

mongoose.connect('mongodb+srv://FitForge:tlSASVfijzUBZwaV@fitforge.rw1obgt.mongodb.net/fitforge_db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const createAdmin = async () => {
    const password = await bcrypt.hash('admin123', 10);

    const admin = new Customer({
        firstName: 'Admin',
        lastName: 'User',
        login: 'admin',
        email: 'admin@example.com',
        password: password,
        customerNo: 10000000,
        isAdmin: true,
        enabled: true
    });

    await admin.save();
    console.log('Логин admin  Пароль admin123');
    mongoose.connection.close();
};

createAdmin().catch(err => {
    console.error('Ошибка при создании админа', err);
    mongoose.connection.close();
});
