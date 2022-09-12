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


/* Routes */
const routes = require('./routes/router')

app.use('/', routes)

app.listen(process.env.PORT || 3001, () => console.log("Server running here 👉 http://localhost: 3001"));
