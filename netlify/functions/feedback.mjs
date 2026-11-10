import {json,db,parse,clean} from "./_shared.mjs";
export async function handler(event){
 if(event.httpMethod!=="POST") return json(405,{error:"Method not allowed"});
 const d=parse(event);
 const rating=Number(d.rating),message=clean(d.message,1200);
 if(!Number.isInteger(rating)||rating<1||rating>5||message.length<3)
   return json(400,{error:"Please choose a rating and enter a short message."});
 try{
   await db("gtv_customer_feedback",{method:"POST",body:JSON.stringify({rating,message})});
   return json(201,{ok:true});
 }catch(e){
   return json(500,{error:"Feedback submission is temporarily unavailable. Please try WhatsApp instead."});
 }
}
