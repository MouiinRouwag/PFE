module.exports = (sequelize, Sequelize) => {
  const Etudiant = sequelize.define("etudiants", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    organisme_id: {
      type: Sequelize.STRING,
    },
    etudiant_id : {
        type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  });

  return Etudiant;
};

// organisme
// responsable
// tuteur
