
import {json,db,parse,clean,requireAdmin} from "./_shared.mjs";
export async function handler(event){
 if(event.httpMethod!=="POST") return json(405,{error:"Method not allowed"});
 try{
  await requireAdmin(event);
  const d=parse(event),id=clean(d.id,50),status=clean(d.status,30),reply=clean(d.admin_reply,3000);
  if(!/^[0-9a-f-]{36}$/i.test(id)||!["open","in_progress","waiting_customer","resolved","closed"].includes(status)) return json(400,{error:"Invalid ticket update"});
  await db("gtv_support_tickets?id=eq."+encodeURIComponent(id),{method:"PATCH",body:JSON.stringify({status,admin_reply:reply,updated_at:new Date().toISOString()})});
  return json(200,{ok:true});
 }catch(e){return json(401,{error:e.message||"Not authorised"});}
}
