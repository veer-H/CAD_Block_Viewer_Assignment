const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

// Enable CORS
app.use(cors());

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "CAD File Block Viewer API" });
});

// Include file routes
const fileRoutes = require("./routes/file.routes");
app.use("/api/files", fileRoutes);  // Changed this line
// ... (previous code remains the same)

// Include routes

const blockRoutes = require("./routes/block.routes");

app.use("/api/files", fileRoutes);
app.use("/api/blocks", blockRoutes);  // Add this line

// ... (rest of the code remains the same)
// Set port, listen for requests
const PORT = process.env.PORT || 8080;

// Initialize database then start server
db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error("Failed to sync db:", err);
  });
