// const body_parser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
//const mongodb = require('mongodb')
//const dbconnect = require('../database/dbconnect')

/* Routes */
const routes = require('./routes/router')

app.use((_req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    app.use(cors());
})

app.use('/', routes)

app.listen(process.env.PORT || 3001, () => console.log("Server running here 👉 http://localhost: 3001"));
