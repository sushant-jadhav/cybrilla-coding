'user strict';

// var mysql = require('mysql');

// //local mysql db connection
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     database : 'pckg'
// });

// connection.connect(function(err) {
//     if (err) throw err;
// });

// module.exports = connection;

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "cart_app",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
