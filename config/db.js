import mysql from "mysql2";

const con = mysql.createConnection({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'12345678',
    database:'rasper'
})
con.connect(function(error){
    if(error) throw error;
    console.log('Database connected!');
})

export default con;