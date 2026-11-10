
import {json,db,requireAdmin} from "./_shared.mjs";
export async function handler(event){
 if(event.httpMethod!=="GET") return json(405,{error:"Method not allowed"});
 try{
  await requireAdmin(event);
  const tickets=await db("gtv_support_tickets?select=*&order=created_at.desc&limit=100");
  return json(200,{tickets});
 }catch(e){return json(401,{error:e.message||"Not authorised"});}
}
