
import {json,db,parse,clean,requireAdmin} from "./_shared.mjs";
export async function handler(event){
 if(event.httpMethod!=="POST") return json(405,{error:"Method not allowed"});
 try{
  await requireAdmin(event);
  const d=parse(event),overall_status=clean(d.overall_status,30),public_message=clean(d.public_message,500);
  if(!["operational","degraded","outage","maintenance"].includes(overall_status)) return json(400,{error:"Invalid status"});
  await db("gtv_service_status?id=eq.1",{method:"PATCH",body:JSON.stringify({overall_status,public_message,updated_at:new Date().toISOString()})});
  return json(200,{ok:true});
 }catch(e){return json(401,{error:e.message||"Not authorised"});}
}
