//const mysql = require('mysql2');

/*const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    database: 'node_e_commerce',
    password: '123'
});

connection.connect((error)=>{
    if(error){
        throw error;
    }else{
        console.log("MySQL database is connected");
    }
})

module.exports = connection;*/

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_e_commerce','root','123',{
    dialect:'mysql',
    host: 'localhost'
})
let func = async()=>{
try {
    await sequelize.authenticate();
    console.log('MySql Database Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
module.exports = {func, sequelize}





