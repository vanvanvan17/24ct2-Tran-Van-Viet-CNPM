import crypto from 'crypto';import {cookies} from 'next/headers';import {query} from './db';
export function hashPassword(password){return crypto.scryptSync(password,'VNLibrary_SALT_2026',64).toString('hex')}
export function verifyPassword(password,hash){try{return crypto.timingSafeEqual(Buffer.from(hash,'hex'),Buffer.from(hashPassword(password),'hex'))}catch{return false}}
export async function createSession(userId){const id=crypto.randomBytes(32).toString('hex');await query('INSERT INTO sessions(id,user_id,expires_at) VALUES(?,?,DATE_ADD(NOW(),INTERVAL 7 DAY))',[id,userId]);cookies().set('vnlibrary_session',id,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:60*60*24*7});return id}
export async function getCurrentUser(){const c=cookies().get('vnlibrary_session')?.value;if(!c)return null;const rows=await query('SELECT u.id,u.name,u.username,u.email,u.role,u.active FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.id=? AND s.expires_at>NOW() AND u.active=1',[c]);return rows[0]||null}
export async function requireUser(){const u=await getCurrentUser();if(!u)throw new Error('UNAUTHORIZED');return u}
export async function logout(){const c=cookies().get('vnlibrary_session')?.value;if(c)await query('DELETE FROM sessions WHERE id=?',[c]);cookies().delete('vnlibrary_session')}
export async function audit(user,action,entity,entityId,details=''){await query('INSERT INTO audit_logs(user_id,action,entity,entity_id,details) VALUES(?,?,?,?,?)',[user?.id||null,action,entity,entityId||null,details])}
