const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'app_biblica'
});
 
connection.connect();
 
module.exports= connection;