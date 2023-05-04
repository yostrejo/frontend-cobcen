import mysql from "promise-mysql";

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'registros'
  });

  const getConnection = () => {
    return connection;
};

module.exports = {
    getConnection
};  