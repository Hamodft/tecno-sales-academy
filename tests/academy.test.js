import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {catalog} from "../assets/catalog.js";
import {communicationTracks as courses,validateCommunication,totalCommunicationLessons} from "../assets/communication.js";
import {journeyCases,journeySummary,validateJourney,journeyWeights} from "../assets/sales-journey.js";
import {scenarioBank,validateBank,summarize,competencyWeights} from "../assets/scenario-bank.js";
const bilingual=v=>Boolean(v?.ar&&v?.en);
test("product catalog and FABE references are bilingual",()=>{
 assert.equal(catalog.length,4);
 assert.equal(new Set(catalog.map(p=>p.id)).size,4);
 for(const p of catalog){assert.ok(p.specs.length>=2);assert.ok(p.fabe.length>=2);assert.ok(p.fabe.every(f=>["feature","advantage","benefit","evidence"].every(k=>bilingual(f[k]))));}
});
test("logo and approved phone photo assets are tracked",()=>{
 for(const file of ["assets/tecno-logo.svg","assets/products/camon-50-ultra.webp","assets/products/pova-8-series.webp","assets/products/pova-curve-2.webp"])assert.ok(existsSync(file),file);
});
test("30 customer scenarios, 10 per product group, with branching",()=>{
 assert.equal(scenarioBank.length,30);
 assert.equal(new Set(scenarioBank.map(s=>s.id)).size,30);
 assert.ok(validateBank());
 for(const [group,model] of [["camon","camon-50-ultra"],["pova8","pova-8-pro"],["curve","pova-curve-2"]]){
  const list=scenarioBank.filter(s=>s.group===group);
  assert.equal(list.length,10);
  assert.ok(list.every(x=>x.product===model));
  assert.equal(new Set(list.map(s=>s.title.ar)).size,10);
 }
});
test("score dimensions are independently weighted 40,35,25",()=>{
 assert.deepEqual(competencyWeights,{knowledge:.4,experience:.35,selling:.25});
 const perfect=summarize({knowledge:100,experience:100,selling:100});
 assert.deepEqual(perfect.scores,{knowledge:100,experience:100,selling:100});
 assert.equal(perfect.total,100);assert.equal(perfect.level,"excellent");
 assert.equal(summarize({knowledge:100,experience:0,selling:0}).total,40);
 assert.equal(summarize({knowledge:0,experience:100,selling:0}).total,35);
 assert.equal(summarize({knowledge:0,experience:0,selling:100}).total,25);
});

const choiceValue=o=>Object.values(o.marks).reduce((a,b)=>a+b,0);
const bestIndex=choices=>choices.reduce((winner,option,i)=>choiceValue(option)>choiceValue(choices[winner])?i:winner,0);
test("all cases have reachable recovery and correct competency marks",()=>{
 for(const scenario of scenarioBank){
  const stage=scenario.stages;
  assert.ok(stage.discovery.choices.some(o=>o.next==="recovery"));
  for(const [key,next] of [["recovery","technical"],["technical","evidence"],["evidence","closing"],["closing",null]]){
   assert.equal(stage[key].choices[bestIndex(stage[key].choices)].next,next);
  }
  assert.ok(stage.discovery.choices[bestIndex(stage.discovery.choices)].marks.experience>0);
  assert.ok(stage.technical.choices[bestIndex(stage.technical.choices)].marks.knowledge>0);
  assert.ok(stage.closing.choices[bestIndex(stage.closing.choices)].marks.selling>0);
 }
});
test("best response is balanced among A, B, C, not consistently A",()=>{
 for(const phase of ["discovery","technical","evidence","closing"]){
  const tally=[0,0,0];
  for(const scenario of scenarioBank){
   const options=scenario.stages[phase].choices;
   const winner=bestIndex(options);
   assert.equal(options.filter(o=>choiceValue(o)===choiceValue(options[winner])).length,1);
   tally[winner]++;
  }
  assert.ok(tally.every(count=>count>=8&&count<=12),phase+": "+tally.join(","));
 }
 for(const scenario of scenarioBank){
  const indices=["discovery","technical","evidence","closing"].map(p=>bestIndex(scenario.stages[p].choices));
  assert.ok(new Set(indices).size>1,scenario.id+" has repetitive positions");
 }
});
test("six communication tracks contain 24 interactive retail lessons",()=>{
 assert.ok(validateCommunication());
 assert.equal(courses.length,6);
 assert.equal(totalCommunicationLessons(),24);
 for(const course of courses){
  assert.equal(course.lessons.length,4);
  for(const lesson of course.lessons){
   assert.ok(bilingual(lesson.title)&&bilingual(lesson.concept));
   assert.ok(bilingual(lesson.situation)&&bilingual(lesson.model));
   assert.ok(bilingual(lesson.drill));
   assert.deepEqual(lesson.options.map(o=>o.score).sort((a,b)=>a-b),[0,50,100]);
  }
 }
});
test("communication practice does not reward always choosing A",()=>{
 const best=[0,0,0];
 for(const course of courses)for(const lesson of course.lessons){
  best[lesson.options.findIndex(o=>o.score===100)]++;
 }
 assert.ok(best.every(x=>x>=6),"Best choices must vary across A/B/C: "+best.join(","));
});
test("GitHub Pages stages required components without login",()=>{
 const flow=readFileSync(".github/workflows/deploy.yml","utf8");
 const app=readFileSync("assets/academy.js","utf8");
 assert.match(flow,/assets\/scenario-bank\.js/);
 assert.match(flow,/assets\/communication\.js/);
 assert.match(flow,/assets\/products\/\*\.webp/);
 assert.match(flow,/assets\/tecno-logo\.svg/);
 assert.match(app,/scenarioBank/);
 assert.doesNotMatch(app,/signInWithOtp|login-form|Created with AI|Generated by/);
});

test("three complete buyer journeys cover nine connected retail stages each",()=>{
 assert.ok(validateJourney());
 assert.equal(journeyCases.length,3);
 for(const c of journeyCases){
  assert.equal(c.steps.length,9);
  assert.deepEqual(c.steps.map(s=>s.id),["greeting","listening","needs","match","value","demo","objection","closing","aftercare"]);
 }
});
test("journey scoring correctly rewards communication, experience, product knowledge and selling",()=>{
 assert.deepEqual(journeyWeights,{communication:30,experience:30,technical:20,selling:20});
 const caseData=journeyCases[0];
 const buildAnswers=quality=>caseData.steps.map(s=>({...s.options.find(o=>o.quality===quality),dimension:s.dimension}));
 const full=journeySummary(buildAnswers(2));
 assert.equal(full.total,100);
 assert.deepEqual(full.scores,{communication:100,experience:100,technical:100,selling:100});
 const weak=journeySummary(buildAnswers(0));
 assert.equal(weak.total,0);
 assert.ok(weak.trust<full.trust);
});
test("strongest customer-journey decision rotates A/B/C for every stage",()=>{
 for(let stage=0;stage<9;stage++){
  const winners=journeyCases.map(c=>c.steps[stage].options.findIndex(x=>x.quality===2));
  assert.deepEqual([...winners].sort(),[0,1,2]);
 }
});
test("all journey assets and versioned entrypoints are prepared for GitHub Pages",()=>{
 const html=readFileSync("index.html","utf8");
 const flow=readFileSync(".github/workflows/deploy.yml","utf8");
 assert.match(html,/journey\.css\?v=/);
 assert.match(html,/academy\.js\?v=/);
 assert.match(flow,/assets\/sales-journey\.js/);
 assert.match(flow,/assets\/journey\.css/);
});
