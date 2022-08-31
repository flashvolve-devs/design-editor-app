const fs = require("fs");
const axios = require('axios').default;
const express = require("express");
const body_parser = require("body-parser");
const app = express().use(body_parser.json());
const { createCanvas, Image } = require('canvas');
const initialFrame = require('./functions/initialFrame.js');
const loadImageUrl = require('./functions/loadImage.js');
const loadText = require('./functions/loadText.js');

/* Routes */
const routes = require('./routes/router')

app.use('/', routes)

app.listen(process.env.PORT || 3001, () => console.log("Server running here 👉 http://localhost: 3001"));
