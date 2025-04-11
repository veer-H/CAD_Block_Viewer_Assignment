const db = require("../models");
const { Op } = require("sequelize");

exports.getBlocks = async (req, res) => {
  try {
    // Validate query parameters
    const fileId = parseInt(req.query.fileId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    if (isNaN(fileId) || fileId <= 0) {
      return res.status(400).json({
        message: "Invalid fileId parameter"
      });
    }

    if (page <= 0 || limit <= 0) {
      return res.status(400).json({
        message: "Page and limit must be positive numbers"
      });
    }

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Query database with pagination
    const { count, rows: blocks } = await db.blocks.findAndCountAll({
      where: { fileId },
      limit,
      offset,
      order: [['name', 'ASC']],
      include: [{
        model: db.cadfiles,
        as: 'file',
        attributes: ['filename']
      }]
    });

    // Calculate total pages
    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      success: true,
      data: blocks,
      pagination: {
        totalItems: count,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    });

  } catch (error) {
    console.error("Error fetching blocks:", error);
    return res.status(500).json({
      message: "Server error occurred while fetching blocks",
      error: error.message
    });
  }
};
exports.getBlockById = async (req, res) => {
  try {
    const blockId = parseInt(req.params.id);

    // Validate block ID
    if (isNaN(blockId)) {
      return res.status(400).json({
        message: "Invalid block ID"
      });
    }

    // Find block by ID with associated file info
    const block = await db.blocks.findOne({
      where: { id: blockId },
      include: [{
        model: db.cadfiles,
        as: 'file',
        attributes: ['id', 'filename' ]
      }]
    });

    if (!block) {
      return res.status(404).json({
        message: "Block not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: block
    });

  } catch (error) {
    console.error("Error fetching block:", error);
    return res.status(500).json({
      message: "Server error occurred while fetching block",
      error: error.message
    });
  }
};