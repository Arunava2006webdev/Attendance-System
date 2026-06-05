const mysql = require("mysql2");

const connection = mysql.createConnection({

   host:"localhost",

   user:"root",

   password:"ArunavaSQL@2006",

   database:"attendance_system"

});

connection.connect((error)=>{

   if(error){

      console.log(error);

   }

   else{

      console.log("MySQL Connected");

   }

});

module.exports = connection;