import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {chromium} from "playwright";
const origin="http://127.0.0.1:8765/";
const server=spawn("python3",["-m","http.server","8765","--bind","127.0.0.1"],{stdio:"ignore"});
let browser;
try{
 let ready=false;
 for(let i=0;i<45;i++){try{if((await fetch(origin)).ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,200))}
 assert.ok(ready,"local HTTP server started");
 browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:1390,height:900}});
 const errors=[];page.on("pageerror",err=>errors.push(err.message));
 await page.goto(origin);
 await page.locator(".device-card").first().waitFor();
 assert.equal(await page.locator(".device-card").count(),4);
 assert.equal(await page.locator("#login-form").count(),0);
 assert.equal(await page.locator(".tecno-logo").count(),1);
 assert.ok(await page.locator(".tecno-logo").evaluate(el=>el.complete&&el.naturalWidth>0),"TECNO logo loads");
 assert.ok(await page.locator(".device-card .real-phone-photo").first().evaluate(el=>el.complete&&el.naturalWidth>0),"Product photography loads");
 await page.locator("#product-search").fill("CAMON");
 assert.equal(await page.locator(".device-card").count(),1);
 await page.locator("#product-search").fill("");
 await page.locator('[data-series="POVA"].filter').click();
 assert.equal(await page.locator(".device-card").count(),2);
 await page.goto(origin+"#/device/camon-50-ultra");
 await page.locator(".fabe-grid").first().waitFor();
 assert.equal(await page.locator(".fabe-cell").count(),8);
 assert.ok(await page.locator(".cover-photo .real-phone-photo").evaluate(el=>el.complete&&el.naturalWidth>0),"Full product detail image loads");
 await page.goto(origin+"#/device/pova-8-pro");
 assert.ok(await page.locator(".cover-photo .real-phone-photo").evaluate(el=>el.complete&&el.naturalWidth>0));
 await page.goto(origin+"#/device/pova-curve-2");
 assert.ok(await page.locator(".cover-photo .real-phone-photo").evaluate(el=>el.complete&&el.naturalWidth>0));
 await page.goto(origin+"#/training");
 assert.equal(await page.locator(".course-card").count(),4);
 await page.goto(origin+"#/simulator");
 await page.locator(".scenario-card").first().waitFor();
 assert.equal(await page.locator(".scenario-card").count(),30,"all 30 cases are listed");
 await page.locator('[data-case-group="camon"]').click();
 assert.equal(await page.locator(".scenario-card").count(),10);
 await page.locator('[data-case-group="pova8"]').click();
 assert.equal(await page.locator(".scenario-card").count(),10);
 await page.locator('[data-case-group="curve"]').click();
 assert.equal(await page.locator(".scenario-card").count(),10);
 await page.goto(origin+"#/case/camon-01");
 for(let i=0;i<4;i++){
  await page.locator('[data-choice="0"]').click();
  await page.locator('[data-action="continue"]').click();
 }
 await page.locator(".report-bignum").waitFor();
 assert.match(await page.locator(".report-bignum").innerText(),/100/);
 assert.equal(await page.locator(".score-axis").count(),3);
 assert.ok((await page.locator(".score-axis").allInnerTexts()).every(x=>x.includes("100%")));
 await page.locator('[data-action="retry"]').click();
 await page.locator('[data-choice="1"]').click();
 await page.locator('[data-action="continue"]').click();
 assert.ok((await page.locator(".customer-bubble").innerText()).includes("مو مجرد كلام"));
 await page.locator('[data-choice="0"]').click();
 await page.locator('[data-action="continue"]').click();
 for(let i=0;i<3;i++){
  await page.locator('[data-choice="0"]').click();
  await page.locator('[data-action="continue"]').click();
 }
 await page.locator(".report-bignum").waitFor();
 assert.ok(parseInt(await page.locator(".report-bignum").innerText(),10)<100,"wrong choices reduce the final score");
 await page.locator("#language").click();
 assert.equal(await page.locator("html").getAttribute("lang"),"en");
 await page.setViewportSize({width:390,height:844});
 await page.goto(origin+"#/simulator");
 await page.locator(".scenario-card").first().waitFor();
 assert.equal(await page.locator(".scenario-card").count(),10); // filtered group persisted
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),"no mobile horizontal overflow");
 await page.goto(origin+"#/products");
 await page.locator("#menu").click();
 assert.ok(await page.locator(".navigation").isVisible());
 await page.screenshot({path:"mobile-reference.png",fullPage:true});
 assert.deepEqual(errors,[],"no browser JavaScript errors");
 console.log("PASS: logo, all three real device photos, 30 unique scenarios, 3-axis scoring, branching, Arabic/English, mobile.");
}finally{if(browser)await browser.close();server.kill("SIGTERM")}
