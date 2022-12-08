const express = require("express");
const R = require("r-integration");
const app = express();
const port = 3000;
const route = require("./routes/routes");
const path = require("path")

app.set('view engine', 'ejs');
app.use("/", route);
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => 
{
  console.log(`Example app listening on port ${port}`);
});

