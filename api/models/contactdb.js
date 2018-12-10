const mysql=require('mysql');

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'Telugu@1',
    database:'contact'
});

module.exports=db;
