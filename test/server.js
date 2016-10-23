const express = require("express");
const multer  = require('multer');
const bodyParser = require('body-parser');

let app = express();
const upload = multer();
const port = process.env.PORT || 13000;

app.use(bodyParser.json());

app.get("/secured/ping", (req, resp) => {
  // query search params
  const page = Number(req.query["page"]) || 0;
  const order_by = req.query["order_by"] || "id";
  // header
  const auth = req.get("Authorization");
  const response = {
    foo: "bar",
    page,
    order_by,
    Authorization: auth
  };
  resp.status(200).json(response);
});

app.post("/secured/ping", (req, resp) => {
  resp.json(req.body);
});

app.put("/secured/ping", (req, resp) => {
  resp.json(req.body);
});

app.patch("/secured/ping", (req, resp) => {
  resp.json(req.body);
});

app.delete("/secured/ping", (req, resp) => {
  resp.json({});
});

app.post("/secured/files", (req, resp) => {
  upload.array("file", 1)(req, resp, err => {
      const f = req.files[0];
      if (err) {
          return resp.status(400).end({error: "Error uploading file"});
      }
      resp.json({filename: f.originalname})
  });
});

module.exports = {
  app: app,
  port: port
};
