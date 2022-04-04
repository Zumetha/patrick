const mysql = require("mysql");
const { promisify } = require('util');

var sqlConnecion = mysql.createConnection({
    host:"pizzamono.c2yshmgfrqxm.us-east-1.rds.amazonaws.com",
    user:"admin",
    password:"Killer444",
    database:"sistemas" 
});

sqlConnecion.connect(function(err){
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Se conecto con exito");
    }

});

sqlConnecion.query = promisify(sqlConnecion.query)

module.exports = sqlConnecion;
