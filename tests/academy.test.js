import test from "node:test";
import assert from "node:assert/strict";
import {products,courses,simulations,langText,validateScenario} from "../assets/data.js";
const texts=x=>Boolean(x?.ar&&x?.en);
test("catalog products have unique IDs and complete bilingual FABE",()=>{
  assert.equal(new Set(products.map(x=>x.id)).size,products.length);
  for(const p of products){
    assert.equal(p.fabe.length,4);
    assert.ok(texts(p.tag));
    assert.ok(p.fabe.every(texts));
    assert.ok(p.facts.length>=3);
  }
});
test("four complete training tracks with three lessons each",()=>{
  assert.equal(courses.length,4);
  assert.equal(new Set(courses.map(x=>x.id)).size,courses.length);
  for(const c of courses){assert.equal(c.lessons.length,3);assert.ok(c.lessons.every(x=>texts(x.title)&&texts(x.body)))}
});
test("simulations are complete reachable branching decision trees",()=>{
  assert.equal(simulations.length,3);
  for(const s of simulations){
    assert.ok(products.some(p=>p.id===s.product));
    assert.ok(validateScenario(s));
    let counts=0;
    function walk(id,sum){
      if(id===null){counts++;assert.ok(sum>=0&&sum<=100);return}
      const step=s.steps[id];
      assert.ok(texts(step.client)&&texts(step.ask));
      assert.ok(step.choices.length>=2);
      for(const ch of step.choices){
        assert.ok(texts(ch.text)&&texts(ch.feedback));
        assert.ok(ch.pts>=0&&ch.pts<=25);
        walk(ch.next,sum+ch.pts);
      }
    }
    walk(s.start,0);
    assert.ok(counts>1);
    assert.ok(Object.values(s.steps).some(x=>x.choices.some(y=>y.next==="recover")));
  }
});
test("localization returns correct text",()=>{
  assert.equal(langText({ar:"أهلا",en:"Hello"},"en"),"Hello");
  assert.equal(langText({ar:"أهلا",en:"Hello"},"ar"),"أهلا");
});
