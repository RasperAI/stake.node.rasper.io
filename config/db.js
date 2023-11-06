import mysql from "mysql2";

const con = mysql.createConnection({
    host:'host.docker.internal',
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