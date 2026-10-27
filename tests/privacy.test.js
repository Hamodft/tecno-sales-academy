import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const portal=readFileSync("assets/portal.js","utf8");
const workflow=readFileSync(".github/workflows/deploy.yml","utf8");
const index=readFileSync("index.html","utf8");
const schema=readFileSync("supabase/schema.sql","utf8");
test("public index loads employee portal only",()=>{
 assert.match(index,/assets\/portal\.js/);
 assert.doesNotMatch(index,/assets\/app\.js|assets\/data\.js/);
});
test("public deployment excludes hard-coded training catalog and old scripts",()=>{
 assert.match(workflow,/cp assets\/portal\.js/);
 assert.doesNotMatch(workflow,/cp assets\/\*\.js|cp assets\/data\.js|cp assets\/app\.js/);
});
test("employee access is checked against approved profile",()=>{
 assert.match(portal,/is_employee===true/);
 assert.match(portal,/is_active===true/);
 assert.match(portal,/shouldCreateUser:false/);
});
test("private data and media are protected with RLS and private storage",()=>{
 assert.match(schema,/academy_is_employee/);
 assert.match(schema,/enable row level security/);
 assert.match(schema,/public\s*=\s*false/);
 assert.match(portal,/staff-assets/);
 assert.match(portal,/device_image/);
});
