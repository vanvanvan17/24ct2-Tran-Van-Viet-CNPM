import fs from 'fs';import path from 'path';import mysql from 'mysql2/promise';import dotenv from 'dotenv';import {fileURLToPath} from 'url';
const __dirname=path.dirname(fileURLToPath(import.meta.url));dotenv.config({path:path.join(__dirname,'..','.env')});
const cfg={host:process.env.DB_HOST||'127.0.0.1',port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER||'root',password:process.env.DB_PASSWORD||'',multipleStatements:true};
const sql=fs.readFileSync(path.join(__dirname,'..','database','schema.sql'),'utf8');
const c=await mysql.createConnection(cfg);await c.query(sql);await c.end();console.log('VNLibrary database created successfully.');
