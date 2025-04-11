exports.validateBlockQuery = (req, res, next) => {
    const { fileId, page = 1, limit = 10 } = req.query;
    
    if (!fileId || isNaN(parseInt(fileId)) || parseInt(fileId) <= 0) {
      return res.status(400).json({ 
        message: "Valid fileId is required" 
      });
    }
  
    if (isNaN(parseInt(page)) || parseInt(page) <= 0 || 
        isNaN(parseInt(limit)) || parseInt(limit) <= 0) {
      return res.status(400).json({ 
        message: "Page and limit must be positive numbers" 
      });
    }
  
    req.query.fileId = parseInt(fileId);
    req.query.page = parseInt(page);
    req.query.limit = parseInt(limit);
    
    next();
  };

  exports.validateBlockId = (req, res, next) => {
    const blockId = parseInt(req.params.id);
    
    if (isNaN(blockId) || blockId <= 0) {
      return res.status(400).json({ 
        message: "Valid block ID is required" 
      });
    }
    
    req.params.id = blockId;
    next();
  };