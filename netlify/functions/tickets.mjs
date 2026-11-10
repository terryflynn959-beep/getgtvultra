
import {json,db,parse,clean} from "./_shared.mjs";
export async function handler(event){
 if(event.httpMethod!=="POST") return json(405,{error:"Method not allowed"});
 const d=parse(event);
 const name=clean(d.name,80),email=clean(d.email,180).toLowerCase(),device=clean(d.device,100),category=clean(d.category,100),subject=clean(d.subject,120),message=clean(d.message,3000);
 if(!name||!email||!email.includes("@")||!device||!category||!subject||message.length<10||d.consent!=="on") return json(400,{error:"Please complete all required fields and accept the privacy notice."});
 const ticketNumber="GTV-"+crypto.randomUUID().replace(/-/g,"").slice(0,8).toUpperCase();
 try{
  await db("gtv_support_tickets",{method:"POST",body:JSON.stringify({ticket_number:ticketNumber,name,email,device,category,subject,message})});
  return json(201,{ticketNumber});
 }catch(e){return json(500,{error:"We could not create your ticket right now. Please try again later."});}
}
