const path = require("path");
const express = require("express");
const app = express();
const connection = require("../config/config");


const data_access = (req, res) => {

    const Query = `SELECT * FROM demo_table`
    connection.query(Query, function(err, result)
    {
        if (err)
        {
            throw err;
        } 
        else
        {
            /*result.forEach(element => {
            const UserName = element.username;
            const Email = element.email;
            const phone = element.phone_number;
            const Password = element.password;
            console.log(UserName);
            console.log(Email);
            console.log(phone);
            console.log(Password);
            });*/
            
            
            //console.log(result);
            res.render("viewdata", {data : result});
        }
    })

}

const signUp = (req, res) => {

    const UserName = req.body.username;
    const Email = req.body.email;
    const phone = req.body.Phone_Number;
    const Password = req.body.password;

    
    /*console.log(UserName);
    console.log(Email);
    console.log(phone);
    console.log(Password);*/

    //res.redirect("/signin");


    const Query = `INSERT INTO persons VALUES('${Email}','${UserName}','${Password}','${phone}')`;
    connection.query(Query, function (err, result) 
    {
        if (err)
        {
            throw err;
        } 
        else
        {
            res.redirect("/signin");
        }
    })

}

const login = (req, res) =>{

    const Email = req.body.email;
    const Password = req.body.password;
    console.log(Email);
    console.log(Password);

    
    const Query = `SELECT email, password FROM persons WHERE email = '${Email}' AND password = '${Password}'`;
    connection.query(Query, function (err, result){
        if (err)
        {
            res.redirect("/signin");
        } 
        else if((result[0].email === Email) && (result[0].password === Password))
        {
            res.redirect("/dashboard");
        }
        else{
            res.redirect("/signin");
        }
    })


}

const AddResturant = (req, res) => {

    const UserName = req.body.username;
    const Email = req.body.email;
    const Contact = req.body.Phone_Number;
    const Address = req.body.password;

    console.log("I M HERE")
    
    /*console.log(UserName);
    console.log(Email);
    console.log(phone);
    console.log(Password);*/

    //res.redirect("/signin");


    const Query = `INSERT INTO Resturant VALUES('${Email}','${UserName}','${Contact}','${Address}')`;
    connection.query(Query, function (err, result) 
    {
        if (err)
        {
            throw err;
        } 
        else
        {
            res.redirect("/dashboard");
        }
    })

}

module.exports = {
    signUp,
    data_access,
    login,
    AddResturant
}