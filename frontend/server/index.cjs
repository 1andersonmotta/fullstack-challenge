const path = require("path");
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static("dist/client"));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
