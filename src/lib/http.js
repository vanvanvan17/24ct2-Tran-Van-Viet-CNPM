import {NextResponse} from 'next/server';
export function ok(data){return NextResponse.json(data)}
export function err(e){const status=e?.message==='UNAUTHORIZED'?401:400;return NextResponse.json({error:e?.message||'Có lỗi xảy ra'},{status})}
export async function body(req){return await req.json().catch(()=>({}))}
