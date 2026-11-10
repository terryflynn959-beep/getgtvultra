
import {json,db} from "./_shared.mjs";
export async function handler(event){
 if(event.httpMethod!=="GET") return json(405,{error:"Method not allowed"});
 try{
  const rows=await db("gtv_service_status?select=overall_status,public_message,updated_at&id=eq.1&limit=1");
  return json(200,rows?.[0]||{overall_status:"operational",public_message:"No additional service notices at this time."});
 }catch(e){return json(503,{error:"Status unavailable"});}
}
