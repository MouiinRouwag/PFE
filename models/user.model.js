module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nom: {
      type: Sequelize.STRING,
    },
    prenom : {
        type: Sequelize.STRING,
    },
    cin: {
      type: Sequelize.TEXT,
    },
    email: {
      type: Sequelize.TEXT,
    },
    telephone: {
      type: Sequelize.TEXT,
    },
    addresse: {
      type: Sequelize.TEXT,
    },
    fonctionnalite: {
      type: Sequelize.TEXT,
    },
    filiere: {
      type: Sequelize.TEXT,
    },
    secteur_activite: {
      type: Sequelize.TEXT,
    },
    ville : {
      type: Sequelize.TEXT,
    },
    role: {
      type: Sequelize.TEXT,
    },
    mot_de_passe: {
      type: Sequelize.TEXT,
    },
    specialite: {
      type: Sequelize.TEXT,
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

  return User;
};

// organisme
// responsable
// tuteur
