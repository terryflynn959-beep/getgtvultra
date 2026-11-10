
import {json,db,parse,clean} from "./_shared.mjs";
export async function handler(event){
 if(event.httpMethod!=="POST") return json(405,{error:"Method not allowed"});
 const d=parse(event),ticketNumber=clean(d.ticketNumber,24).toUpperCase(),email=clean(d.email,180).toLowerCase();
 if(!ticketNumber||!email) return json(400,{error:"Enter your ticket number and email address."});
 try{
  const rows=await db("gtv_support_tickets?select=ticket_number,subject,status,admin_reply,updated_at&ticket_number=eq."+encodeURIComponent(ticketNumber)+"&email=eq."+encodeURIComponent(email)+"&limit=1");
  if(!rows?.length) return json(404,{error:"We could not find a ticket matching those details. Check the ticket number and email address."});
  return json(200,{ticket:rows[0]});
 }catch(e){return json(500,{error:"Ticket lookup is temporarily unavailable."});}
}
