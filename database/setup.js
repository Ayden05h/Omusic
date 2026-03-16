require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database/music_library.db"
});

const Track = sequelize.define("Track", {
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
    type: DataTypes.STRING,
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
}, {
    timestamps: false
});

async function setupDatabase() {
    await sequelize.authenticate();
    console.log("Database connected.");

    await sequelize.sync();
    console.log("Tracks table created.");
}

module.exports = { sequelize, Track, setupDatabase };