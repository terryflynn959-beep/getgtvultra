
const headers = { "Content-Type":"application/json", "Cache-Control":"no-store" };
export const json = (statusCode, body) => ({ statusCode, headers, body: JSON.stringify(body) });
export const env = () => {
  const url=process.env.SUPABASE_URL, key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!key) throw new Error("Server is not configured. Please contact the website administrator.");
  return {url:url.replace(/\/$/,""),key};
};
export async function db(path, options={}) {
  const {url,key}=env();
  const res=await fetch(url+"/rest/v1/"+path,{
    ...options,
    headers:{apikey:key,Authorization:"Bearer "+key,"Content-Type":"application/json",Prefer:"return=representation",...(options.headers||{})}
  });
  const text=await res.text();
  if(!res.ok) throw new Error("Database request failed");
  return text?JSON.parse(text):null;
}
export function parse(event){try{return JSON.parse(event.body||"{}")}catch{return {}}}
export function clean(v,max=3000){return String(v??"").trim().slice(0,max)}
export async function requireAdmin(event){
  const auth=event.headers?.authorization||event.headers?.Authorization||"";
  const token=auth.replace(/^Bearer\s+/i,"");
  if(!token) throw new Error("Staff sign-in required");
  const {url,key}=env();
  const res=await fetch(url+"/auth/v1/user",{headers:{apikey:key,Authorization:"Bearer "+token}});
  if(!res.ok) throw new Error("Invalid staff session");
  const user=await res.json();
  if(!process.env.ADMIN_USER_ID || user.id!==process.env.ADMIN_USER_ID) throw new Error("Not authorised for the staff dashboard");
  return user;
}
