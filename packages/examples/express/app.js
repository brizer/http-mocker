const path = require('path');
const express = require("express");
const { mockerMiddleware } = require("../../mocker");

const app = express();
const port = 3000;
app.use(mockerMiddleware());

//view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs')

app.get("/", (req, res) => res.render('index', { name: 'brizer'}));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
