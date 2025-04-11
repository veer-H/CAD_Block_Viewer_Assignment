const db = require("../models");
const multer = require("multer");
const path = require("path");
const { parseDxfFile, extractBlocks } = require("../services/dxf.service");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage: storage }).single("file");

exports.uploadFile = async (req, res) => {
  try {
    // First handle the file upload
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: "File upload failed",
          error: err.message
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded"
        });
      }

      const filePath = req.file.path;
      const fileName = req.file.originalname;

      // Save file info to database
      const cadFile = await db.cadfiles.create({
        filename: fileName,
        filepath: filePath,
        processed: false
      });

      try {
        // Process the DXF file
        const dxfData = await parseDxfFile(filePath);
        const blocks = extractBlocks(dxfData);

        // Save blocks to database
        await Promise.all(
          blocks.map(block =>
            db.blocks.create({
              ...block,
              fileId: cadFile.id
            })
          )
        );

        // Update file as processed
        await cadFile.update({ processed: true });

        return res.status(201).json({
          message: "File uploaded and processed successfully",
          fileId: cadFile.id,
          blockCount: blocks.length
        });
      } catch (parseError) {
        // If processing fails, delete the file record
        await cadFile.destroy();
        
        return res.status(422).json({
          message: "Failed to process CAD file",
          error: parseError.message
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error occurred",
      error: error.message
    });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await db.cadfiles.findAll({
      attributes: ['id', 'filename', 'filepath', 'createdAt', 'processed'],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: files
    });
    
  } catch (error) {
    console.error("Error fetching files:", error);
    return res.status(500).json({
      success: false,
      message: "Server error occurred while fetching files"
    });
  }
};