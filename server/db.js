import mysql from 'mysql'
export const db = mysql.createPool({
    host:'localhost',        
    user:'root',               
    password:'1234',           
    database:'starship',       
    connectionLimit: 10, // 필요에 따라 조정하세요
});