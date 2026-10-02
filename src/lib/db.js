import mysql from 'mysql2/promise';
import dotenv from 'dotenv';dotenv.config();
const globalForDb=globalThis;
export const pool=globalForDb.__vnlibraryPool||mysql.createPool({host:process.env.DB_HOST||'127.0.0.1',port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER||'root',password:process.env.DB_PASSWORD||'',database:process.env.DB_NAME||'vnlibrary',waitForConnections:true,connectionLimit:10,charset:'utf8mb4'});
if(process.env.NODE_ENV!=='production')globalForDb.__vnlibraryPool=pool;
export async function query(sql,params=[]){const [rows]=await pool.execute(sql,params);return rows;}
export async function transaction(fn){const c=await pool.getConnection();try{await c.beginTransaction();const result=await fn(c);await c.commit();return result}catch(e){await c.rollback();throw e}finally{c.release()}}
