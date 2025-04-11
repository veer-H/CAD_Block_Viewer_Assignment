# API Documentation

## Base URL
`http://localhost:8080/api`

## Endpoints

### Files
- `POST /files` - Upload CAD file
- `GET /files` - List all uploaded files

### Blocks
- `GET /blocks?fileId=&page=&limit=` - Get paginated blocks
- `GET /blocks/:id` - Get block details
- `GET /blocks/search?query=` - Search blocks

## Request/Response Examples

### Upload File
**Request:**
```bash
POST /api/files
Content-Type: multipart/form-data


## 5. Development Documentation

### Library Choices
- **Sequelize**: Chosen for its robust PostgreSQL support and promise-based interface
- **dxf-parser**: Selected for its simplicity and active maintenance in DXF processing
- **Material-UI**: Provides professional UI components with minimal custom CSS

### Challenges & Solutions
1. **CAD File Complexity**: 
   - Focused only on block extraction rather than full CAD features
   - Used simple DXF format instead of DWG for easier parsing

2. **Performance with Large Files**:
   - Implemented pagination for block listings
   - Added database indexes for frequently queried fields

3. **Error Handling**:
   - Created comprehensive error middleware
   - Added validation for all API endpoints

### AI Assistant Usage
- **GitHub Copilot**: Used for boilerplate code generation and suggesting error handling patterns
- **ChatGPT**: Helped with debugging database connection issues and optimizing Sequelize queries
- **AI-assisted Testing**: Generated test cases for edge scenarios

## 6. Video Demonstration Script

**Outline (2-3 minutes):**
1. **Introduction** (15 sec):
   - Show application homepage
   - Explain purpose: "This app lets users view blocks from CAD files"

2. **File Upload** (30 sec):
   - Demonstrate uploading a sample DXF file
   - Show successful processing message

3. **Block Exploration** (45 sec):
   - Navigate to file listing
   - Show paginated blocks table
   - Demonstrate searching/filtering
   - Click into block details

4. **Technical Highlights** (30 sec):
   - Show code snippets of key features
   - Mention backend/frontend technologies

5. **Conclusion** (15 sec):
   - Recap main features
   - Invite questions

**Recording Tips:**
- Use screen recording software (OBS, QuickTime)
- Show both UI and developer tools network tab
- Keep narration clear and concise

## 7. GitHub Repository Setup

1. Initialize repository:
```bash
git init
git add .
git commit -m "Initial project setup"