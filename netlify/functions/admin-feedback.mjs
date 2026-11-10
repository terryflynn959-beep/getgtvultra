import {json,db,requireAdmin} from "./_shared.mjs";
export async function handler(event){
 if(event.httpMethod!=="GET") return json(405,{error:"Method not allowed"});
 try{
  await requireAdmin(event);
  const feedback=await db("gtv_customer_feedback?select=*&order=created_at.desc&limit=200");
  return json(200,{feedback});
 }catch(e){return json(401,{error:e.message||"Not authorised"});}
}
