import mysql from "mysql2";

const con = mysql.createConnection({
    host:'0.0.0.0',
    port:'3307',
    user:'sail',
    password:'password',
    database:'rasper'
})
con.connect(function(error){
    if(error) throw error;
    console.log('Database connected!');
})

export default con;