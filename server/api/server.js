const body_parser = require("body-parser");
const express = require("express");
const app = express().use(body_parser.json());
// const cors = require("cors");
//const mongodb = require('mongodb')
//const dbconnect = require('../database/dbconnect')

// app.use((_req, res, next)=> {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// })

/* Routes */
const routes = require('./routes/router')
app.use('/', routes)

app.listen(process.env.PORT || 3001, () => console.log("Server running here 👉 http://localhost: 3001"));
