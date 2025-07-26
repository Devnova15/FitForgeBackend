const mongoose = require("mongoose");
const Award = require("./models/Award");
const { awardsData } = require("./awards");

mongoose.connect('mongodb+srv://FitForge:tlSASVfijzUBZwaV@fitforge.rw1obgt.mongodb.net/fitforge_db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const seedAwards = async () => {
    try {
        await Award.deleteMany();
        await Award.insertMany(awardsData);
        console.log("награды добавлены в базу");
    } catch (err) {
        console.error("ошибка при добавлении наград", err);
    } finally {
        mongoose.connection.close();
    }
};

seedAwards();
