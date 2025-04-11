const DxfParser = require('dxf-parser');
const fs = require('fs');
const parser = new DxfParser();

function parseDxfFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        return reject(err);
      }

      try {
        const dxf = parser.parseSync(data);
        resolve(dxf);
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
}

function extractBlocks(dxfData) {
  const blocks = [];
  
  if (dxfData.blocks) {
    for (const blockName in dxfData.blocks) {
      const block = dxfData.blocks[blockName];
      blocks.push({
        name: blockName,
        layer: block.layer,
        type: 'BLOCK',
        coordinates: extractCoordinates(block.entities),
        properties: {
          x: block.x,
          y: block.y,
          z: block.z
        }
      });
    }
  }
  
  return blocks;
}

function extractCoordinates(entities) {
  if (!entities) return null;
  
  return entities.map(entity => {
    switch (entity.type) {
      case 'LINE':
        return {
          type: 'LINE',
          start: { x: entity.start.x, y: entity.start.y },
          end: { x: entity.end.x, y: entity.end.y }
        };
      case 'CIRCLE':
        return {
          type: 'CIRCLE',
          center: { x: entity.center.x, y: entity.center.y },
          radius: entity.radius
        };
      // Add more entity types as needed
      default:
        return { type: entity.type };
    }
  });
}

module.exports = {
  parseDxfFile,
  extractBlocks
};