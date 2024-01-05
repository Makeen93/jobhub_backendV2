const router = require("express").Router();
const {verifyToken,varifyAndAuth,varifyAgent}=require('../middleware/verifyToken')
const bookmarkController = require("../controllers/bookmarkController");

router.post("/", varifyAndAuth,bookmarkController.createBookmark);

router.delete("/:id", varifyAndAuth, bookmarkController.deleteBookmark);

router.get("/", varifyAndAuth,bookmarkController.getAllBookmark);

router.get("/bookmark/:id",varifyAndAuth, bookmarkController.getBookmark);



module.exports = router;