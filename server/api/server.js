<<<<<<< HEAD
const express = require("express");
//const body_parser = require("body-parser");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

/* config handlebars */
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs.engine());
app.set('views', './views');

/* config assets */
app.use(express.static('public'));
/* body parser */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

=======
const body_parser = require("body-parser");
const express = require("express");
const app = express().use(body_parser.json());
const cors = require("cors");

app.use((_req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    next();
})
>>>>>>> defa91ebda06e2361ab47fb42adec943e2544228

/* Routes */
const imageRoute = require('./routes/image.route');
const loginRoute = require('./routes/login.route');
const userRoute = require('./routes/image.route');

app.use('/', imageRoute);
app.use('/login', loginRoute);
app.use('/user', userRoute);

app.listen(process.env.PORT || 3001, () => console.log("Server running here 👉 http://localhost: 3001"));
