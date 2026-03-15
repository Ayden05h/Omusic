require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_NAME
});


const Track = sequelize.define(
    "Track",
{
    trackId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    songTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artistName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    albumName: {
        ype: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER
    },
    releaseYear: {
        type: DataTypes.INTEGER
    }
},
{
    timestamps: false
}
);


async function setupDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Database connected.");

        await sequelize.sync();
        console.log("Tracks table created.");

        await sequelize.close();
    } catch (error) {
        console.error("Database setup error:", error);
}
}

setupDatabase();

module.exports = { sequelize, Track };