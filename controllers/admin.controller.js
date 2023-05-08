const { QueryTypes } = require("sequelize");
const passport = require("passport");
const db = require("../models");
const User = db.users;
const LocalStrategy = require("passport-local").Strategy;

const sequelize = db.sequelize;

exports.etudient = async (req, res) => {
  const data = await getEtudiants();
  res.render("etudiant", {
    locals: {
      etudiants: data,
    },
  });
};

exports.addEtudiant = async (req, res) => {
  try {
    const etudiant = {
      cin: req.body.cin,
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      mot_de_passe: req.body.cin,
      telephone: req.body.telephone,
      ville: req.body.ville,
      filiere: req.body.filiere,
      role: "etudiant",
    };
    // add etudiant to database using raw query

    const etudiantValues = [
      "UUID()",
      `"${etudiant.cin}"`,
      `"${etudiant.nom}"`,
      `"${etudiant.prenom}"`,
      `"${etudiant.email}"`,
      `"${etudiant.mot_de_passe}"`,
      `"${etudiant.telephone}"`,
      `"${etudiant.ville}"`,
      `"${etudiant.filiere}"`,
      `"${etudiant.role}"`,
    ];
    const etudiantQuery = `INSERT INTO users (id, cin, nom, prenom, email, mot_de_passe, telephone, ville, filiere, role, createdAt, updatedAt) VALUES (${etudiantValues.join(
      ", "
    )},NOW(),NOW())`;
    const etudiantResult = await sequelize.query(etudiantQuery);

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.getEtudiant = async (req, res) => {
  try {
    const etudiantQuery = `SELECT * FROM users WHERE role = "etudiant"`;
    const etudiantResult = await sequelize.query(etudiantQuery, {
      type: QueryTypes.SELECT,
    });
    res.json({
      success: true,
      data: etudiantResult,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.import = async (req, res) => {
  res.render("importetudient");
};

exports.getEditEtudiant = async (req, res) => {
  const etudiantResult = await getEtudiantById(req.params.id);

  res.render("editetudiant", {
    locals: {
      etudiant: etudiantResult[0],
    },
  });
};

exports.editEtudiant = async (req, res) => {
  try {
    const etudiant = {
      cin: req.body.cin,
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      mot_de_passe: req.body.cin,
      telephone: req.body.telephone,
      ville: req.body.ville,
      filiere: req.body.filiere,
      role: "etudiant",
    };
    // update etudiant to database using raw query
    const updated = await sequelize.query(
      `UPDATE users SET cin = "${etudiant.cin}", nom = "${etudiant.nom}", prenom = "${etudiant.prenom}", email = "${etudiant.email}", mot_de_passe = "${etudiant.mot_de_passe}", telephone = "${etudiant.telephone}", ville = "${etudiant.ville}", filiere = "${etudiant.filiere}", role = "${etudiant.role}" WHERE id = "${req.params.id}"`,
      { type: QueryTypes.UPDATE }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.deleteEtudiant = async (req, res) => {
  try {
    const deleted = await sequelize.query(
      `DELETE FROM users WHERE id = "${req.params.id}"`,
      { type: QueryTypes.DELETE }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

const getEtudiants = async () => {
  try {
    const etudiantQuery = `SELECT * FROM users WHERE role = "etudiant"`;
    const etudiantResult = await sequelize.query(etudiantQuery, {
      type: QueryTypes.SELECT,
    });

    return etudiantResult;
  } catch (error) {
    return error;
  }
};

const getEtudiantById = async (id) => {
  try {
    const etudiantQuery = `SELECT * FROM users WHERE id = "${id}"`;
    const etudiantResult = await sequelize.query(etudiantQuery, {
      type: QueryTypes.SELECT,
    });

    return etudiantResult;
  } catch (error) {
    return error;
  }
};

// enseignant

exports.enseignant = async (req, res) => {
  const data = await getEnseignants();
  res.render("enseignant", {
    locals: {
      enseignants: data,
    },
  });
};

exports.addEnseignant = async (req, res) => {
  try {
    const enseignant = {
      cin: req.body.cin,
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      mot_de_passe: req.body.cin,
      telephone: req.body.telephone,
      addresse: req.body.addresse,
      specialite: req.body.specialite,
      role: "enseignant",
    };

    console.log(enseignant);
    const enseignantValues = [
      "UUID()",
      `"${enseignant.cin}"`,
      `"${enseignant.nom}"`,
      `"${enseignant.prenom}"`,
      `"${enseignant.email}"`,
      `"${enseignant.mot_de_passe}"`,
      `"${enseignant.telephone}"`,
      `"${enseignant.addresse}"`,
      `"${enseignant.specialite}"`,
      `"${enseignant.role}"`,
    ];
    const enseignantQuery = `INSERT INTO users (id, cin, nom, prenom, email, mot_de_passe, telephone, addresse, specialite, role, createdAt, updatedAt) VALUES (${enseignantValues.join(
      ", "
    )},NOW(),NOW())`;
    const enseignantResult = await sequelize.query(enseignantQuery);

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.getEnseignant = async (req, res) => {
  try {
    const etudiantQuery = `SELECT * FROM users WHERE role = "etudiant"`;
    const etudiantResult = await sequelize.query(etudiantQuery, {
      type: QueryTypes.SELECT,
    });
    res.json({
      success: true,
      data: etudiantResult,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.getEditEnseignant = async (req, res) => {
  const Result = await getEnseignantById(req.params.id);

  res.render("editeenseignant", {
    locals: {
      enseignant: Result[0],
    },
  });
};

exports.editEnseignant = async (req, res) => {
  try {
    const update = {
      cin: req.body.cin,
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      mot_de_passe: req.body.cin,
      telephone: req.body.telephone,
      addresse: req.body.addresse,
      specialite: req.body.specialite,
      role: "enseignant",
    };
    // update etudiant to database using raw query
    const updated = await sequelize.query(
      `UPDATE users SET cin = "${update.cin}", nom = "${update.nom}", prenom = "${update.prenom}", email = "${update.email}", mot_de_passe = "${update.mot_de_passe}", telephone = "${update.telephone}", addresse = "${update.addresse}", specialite = "${update.specialite}", role = "${update.role}" WHERE id = "${req.params.id}"`,
      { type: QueryTypes.UPDATE }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.deleteEnseignant = async (req, res) => {
  try {
    const deleted = await sequelize.query(
      `DELETE FROM users WHERE id = "${req.params.id}"`,
      { type: QueryTypes.DELETE }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

const getEnseignants = async () => {
  try {
    const enseignantQuery = `SELECT * FROM users WHERE role = "enseignant"`;
    const enseignantResult = await sequelize.query(enseignantQuery, {
      type: QueryTypes.SELECT,
    });

    return enseignantResult;
  } catch (error) {
    return error;
  }
};

const getEnseignantById = async (id) => {
  try {
    const Query = `SELECT * FROM users WHERE id = "${id}"`;
    const Result = await sequelize.query(Query, {
      type: QueryTypes.SELECT,
    });

    return Result;
  } catch (error) {
    return error;
  }
};

// organisme

exports.organisme = async (req, res) => {
  const data = await getAllOrganismes();
  res.render("organisme", { locals: { organismes: data } });
};

exports.addOrganisme = async (req, res) => {
  console.log(req.body);
  try {
    const organisme = {
      code_organisme: req.body.code_organisme,
      nom_organisme: req.body.nom_organisme,
      adresse_organisme: req.body.addresse_organisme,
      telephone_organisme: req.body.telephone_organisme,
      email_organisme: req.body.email_organisme,
      secteur_activite: req.body.secteur_activite,
    };

    // console.log(organisme);
    const organismeValues = [
      "UUID()",
      `"${organisme.code_organisme}"`,
      `"${organisme.nom_organisme}"`,
      `"${organisme.adresse_organisme}"`,
      `"${organisme.telephone_organisme}"`,
      `"${organisme.email_organisme}"`,
      `"${organisme.secteur_activite}"`,
    ];
    const Query = `INSERT INTO organismes (id, code_organisme, nom_organisme, addresse_organisme, telephone_organisme, email_organisme, secteur_activite, createdAt, updatedAt) VALUES (${organismeValues.join(
      ", "
    )},NOW(),NOW())`;
    const Result = await sequelize.query(Query);

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.getEditOrganisme = async (req, res) => {
  const Result = await getOrganismeById(req.params.id);
  res.render("editeorganisme", {
    locals: {
      e: Result[0],
    },
  });
};
exports.editOrganisme = async (req, res) => {
  try {
    const update = {
      code_organisme: req.body.code_organisme,
      nom_organisme: req.body.nom_organisme,
      adresse_organisme: req.body.adresse_organisme,
      telephone_organisme: req.body.telephone_organisme,
      email_organisme: req.body.email_organisme,
      secteur_activite: req.body.secteur_activite,
    };
    // update etudiant to database using raw query
    const updated = await sequelize.query(
      `UPDATE organismes SET code_organisme = "${update.code_organisme}", nom_organisme = "${update.nom_organisme}", addresse_organisme = "${update.adresse_organisme}", telephone_organisme = "${update.telephone_organisme}", email_organisme = "${update.email_organisme}", secteur_activite = "${update.secteur_activite}" WHERE id = "${req.params.id}"`,
      { type: QueryTypes.UPDATE }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.deleteOrganisme = async (req, res) => {
  try {
    const deleted = await sequelize.query(
      `DELETE FROM organismes WHERE id = "${req.params.id}"`,
      { type: QueryTypes.DELETE }
    );
    res.json({success:true})
  } catch (error) {
    res.json({ error });
  }
};


const getAllOrganismes = async () => {
  try {
    const organismeQuery = `SELECT * FROM organismes`;
    const organismeResult = await sequelize.query(organismeQuery, {
      type: QueryTypes.SELECT,
    });
    return organismeResult;
  } catch (error) {
    return error;
  }
};

const getOrganismeById = async (id) => {
  const Query = `SELECT * FROM organismes WHERE id = "${id}"`;
  const Result = await sequelize.query(Query, {
    type: QueryTypes.SELECT,
  });
  return Result;
};
