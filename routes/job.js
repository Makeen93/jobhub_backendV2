const jobController = require("../controllers/jobController");
// const { verifyAndAuthorization,verifyToken,verifyAndAdmin } = require("../middleware/verifyToken");

const router = require("express").Router();


// REGISTRATION 
router.post("/",jobController.createJob);
router.get("/",jobController.getAllJobs);
router.put("/:id",jobController.updateJob);
router.delete("/:id",jobController.deleteJob);
router.get("/:id",jobController.getJob);
router.get("/search/:key",jobController.searchJobs);
router.get("/agent/:uid",jobController.getAgentJobs);





module.exports = router