import {config} from "./config.js";
let client;
export const configured=Boolean(config.supabaseUrl&&config.supabasePublishableKey);
export async function api(){
 if(!configured)return null;
 if(client)return client;
 const {createClient}=await import("https://esm.sh/@supabase/supabase-js@2.57.4");
 client=createClient(config.supabaseUrl,config.supabasePublishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
 return client;
}
export async function identity(){
 const c=await api();
 if(!c)return {user:null,profile:null};
 const {data:{user},error}=await c.auth.getUser();
 if(error||!user)return {user:null,profile:null};
 const r=await c.from("profiles").select("id,display_name,role,is_employee,is_active,region").eq("id",user.id).maybeSingle();
 if(r.error)throw r.error;
 return {user,profile:r.data};
}
export async function login(email){
 const c=await api();if(!c)throw Error("Backend is not configured");
 const {error}=await c.auth.signInWithOtp({email,options:{emailRedirectTo:location.href.split("#")[0]+"#/dashboard",shouldCreateUser:false}});
 if(error)throw error;
}
export async function logout(){const c=await api();if(c){const r=await c.auth.signOut();if(r.error)throw r.error;}}
export async function saveAttempt(attempt){
 const c=await api();if(!c)throw Error("Backend is not configured");
 const {error}=await c.from("simulation_attempts").insert({scenario_id:attempt.scenarioId,score:attempt.score,max_score:attempt.maxScore,answers:attempt.answers});
 if(error)throw error;
}
export async function myAttempts(){
 const c=await api();if(!c)return [];
 const r=await c.from("simulation_attempts").select("scenario_id,score,max_score,created_at").order("created_at",{ascending:false}).limit(100);
 if(r.error)throw r.error;return r.data||[];
}
export async function myCompletedLessons(){
 const c=await api();if(!c)return [];
 const r=await c.from("lesson_completions").select("lesson_id,completed_at");
 if(r.error)throw r.error;return r.data||[];
}
export async function markLesson(id){
 const c=await api();if(!c)throw Error("Backend is not configured");
 const r=await c.from("lesson_completions").upsert({lesson_id:id},{onConflict:"user_id,lesson_id"});
 if(r.error)throw r.error;
}
export async function adminStats(){
 const c=await api();if(!c)return null;
 const [profiles,attempts]=await Promise.all([c.from("profiles").select("id,display_name,role,is_employee,is_active,region").limit(1000),c.from("simulation_attempts").select("user_id,score,max_score,created_at,scenario_id").order("created_at",{ascending:false}).limit(1000)]);
 if(profiles.error)throw profiles.error;if(attempts.error)throw attempts.error;
 return {profiles:profiles.data||[],attempts:attempts.data||[]};
}
