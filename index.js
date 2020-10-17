const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

app.use("/public", express.static(process.cwd() + "/public"));
app.use(fileUpload());
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", (req, res) => {
  if (!req.files) return res.status(400).send("No file uploaded");

  let upfile = req.files.upfile;

  upfile.mv("./uploads/" + req.files.upfile.name, function (err) {
    if (err) return res.status(500).send(err);
  });

  const result = {
    name: req.files.upfile.name,
    type: req.files.upfile.mimetype,
    size: req.files.upfile.size,
  };

  res.send(result);
});

const port = process.env.PORT || 3000;

const server = app.listen(port, console.log(`Listening on port ${port}`));

module.exports = server;
