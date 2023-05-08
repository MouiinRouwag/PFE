const router = require("express").Router();
const admin = require("../controllers/admin.controller.js");

router.get("/etudiant", admin.etudient);
router.post("/addEtudiant", admin.addEtudiant);
router.get("/import", admin.import);
router.get("/getEtudiant", admin.getEtudiant);
router.get("/editetudiant/:id", admin.getEditEtudiant);
router.post("/updateetudient/:id", admin.editEtudiant);
router.delete("/deleteetudient/:id", admin.deleteEtudiant);


router.get("/enseignant", admin.enseignant);
router.post("/addenseignant", admin.addEnseignant);
// router.get("/getEtudiant", admin.getEtudiant);
router.get("/editenseignant/:id", admin.getEditEnseignant);
router.post("/updateenseignant/:id", admin.editEnseignant);
router.delete("/deleteenseignant/:id", admin.deleteEnseignant);


router.get("/organisme", admin.organisme);
router.post("/addOrganisme", admin.addOrganisme);
router.get("/editorganisme/:id", admin.getEditOrganisme);
// router.get("/editenseignant/:id", admin.getEditEnseignant);
router.post("/updateorganisme/:id", admin.editOrganisme);
router.delete("/deleteOrganisme/:id", admin.deleteOrganisme);

module.exports = router;
