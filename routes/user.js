const userController = require("../controllers/userController");
const {verifyToken,varifyAndAuth,varifyAgent}=require('../middleware/verifyToken')

const router = require("express").Router();


// REGISTRATION 

router.put("/", varifyAndAuth,userController.updateUser);
router.delete("/:id", varifyAndAuth,userController.deleteUser);
router.get("/", varifyAndAuth,userController.getUser);
router.post("/skills", varifyAndAuth,userController.addSkills);
router.get("/skills", varifyAndAuth,userController.getSkills);
router.delete("/skills/:id", varifyAndAuth,userController.deleteSkill);
router.post("/agents", varifyAndAuth,userController.addAgent);
router.get("/agents/:uid", varifyAndAuth,userController.getAgent);
router.get("/agents", varifyAndAuth,userController.getAgents);
router.put("/agents/:id", varifyAndAuth,userController.updateAgent);

// router.get("/", verifyAndAdmin,userController.getAllUsers);




module.exports = router