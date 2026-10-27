import test from "node:test";
import assert from "node:assert/strict";
import {catalog} from "../assets/catalog.js";
import {courses,simulations,validateScenario} from "../assets/data.js";
import fs from "node:fs";
const complete=v=>typeof v==="object"&&v&&v.ar&&v.en;
test("catalog has 4 fully structured bilingual product references",()=>{
 assert.equal(catalog.length,4);
 assert.equal(new Set(catalog.map(x=>x.id)).size,catalog.length);
 for(const p of catalog){
  assert.ok(complete(p.lead));assert.ok(complete(p.category));
  assert.ok(p.specs.length>=2);
  assert.ok(p.specs.every(g=>complete(g.group)&&g.rows.length>0));
  assert.ok(p.fabe.length>=2);
  assert.ok(p.fabe.every(f=>["feature","advantage","benefit","evidence"].every(k=>complete(f[k]))));
  assert.ok(p.demos.length>=2);
 }
});
test("four tracks each include three useful bilingual lessons",()=>{
 assert.equal(courses.length,4);
 for(const c of courses){assert.equal(c.lessons.length,3);assert.ok(c.lessons.every(l=>complete(l.title)&&complete(l.body)));}
});
test("3 simulator scenarios are valid fully reachable trees",()=>{
 assert.equal(simulations.length,3);
 for(const s of simulations){assert.ok(validateScenario(s));assert.ok(catalog.some(p=>p.id===s.product));}
});
test("direct access has no login or external auth dependency",()=>{
 const index=fs.readFileSync("index.html","utf8");
 const app=fs.readFileSync("assets/academy.js","utf8");
 const workflow=fs.readFileSync(".github/workflows/deploy.yml","utf8");
 assert.match(index,/assets\/academy\.js/);
 assert.doesNotMatch(index,/portal\.js|login/i);
 assert.doesNotMatch(app,/supabase|signInWithOtp|login-form/i);
 assert.doesNotMatch(workflow,/portal\.js|config\.js|private\.css/);
});
