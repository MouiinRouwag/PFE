module.exports = (sequelize, Sequelize) => {
    const Anninfo = sequelize.define("anninfo", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        announce_id: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        pub_image: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        title: {
            type: Sequelize.TEXT,
        },
        location: {
            type: Sequelize.TEXT,
        },
        price: {
            type: Sequelize.INTEGER,
        },
        category: {
            type: Sequelize.TEXT,
        },
        sub_category: {
            type: Sequelize.TEXT,
        },
        end_date: {
            type: Sequelize.DATEONLY,
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    return Anninfo;
};