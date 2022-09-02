const express = require("express");
const body_parser = require("body-parser");
const app = express().use(body_parser.json());
//const mongodb = require('mongodb')
//const dbconnect = require('../database/dbconnect')

/* Routes */
const routes = require('./routes/router')

app.use('/', routes)

app.listen(process.env.PORT || 3001, () => console.log("Server running here 👉 http://localhost: 3001"));
