const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'sistema_ventas'
});
 
connection.connect();
 
module.exports= connection;