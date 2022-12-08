const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "",
    user: "newuser",
    password: "ABCD@1234",
    database: "docadvisor",
});

connection.connect(function(err){
    if(err)
    {
        console.log("Database Connection Failed!");
        throw err;
    }
    else
    {
        console.log("Database Connected!");
    }
})

module.exports = connection;