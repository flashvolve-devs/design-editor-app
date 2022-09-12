const body_parser = require("body-parser");
const express = require("express");
const app = express().use(body_parser.json());
// const cors = require("cors");

app.use((_req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    next();
})

/* Routes */
const imageRoute = require('./routes/image.route');
const uploadRoute = require('./routes/upload.route');
const loginRoute = require('./routes/login.route');
const userRoute = require('./routes/user.route');


app.use('/', imageRoute);
app.use('/upload', uploadRoute);
app.use('/login', loginRoute);
app.use('/user', userRoute);

app.listen(process.env.PORT || 3001, () => console.log("Server running here 👉 http://localhost: 3001"));
