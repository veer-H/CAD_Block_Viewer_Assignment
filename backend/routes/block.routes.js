const express = require("express");
const router = express.Router();
const blockController = require("../controllers/block.controller");
const validation = require("../middlewares/validation");

// GET /api/blocks - Get paginated blocks
router.get("/", validation.validateBlockQuery, blockController.getBlocks);

router.get("/:id", validation.validateBlockId, blockController.getBlockById);

module.exports = router;