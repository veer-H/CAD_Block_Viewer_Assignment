const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");

// POST /api/files - Upload and process CAD file
router.post("/", fileController.uploadFile);
router.get("/", fileController.getFiles);

// Export the router directly
module.exports = router;