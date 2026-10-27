import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {chromium} from "playwright";
const origin="http://127.0.0.1:8765/";
const server=spawn("python3",["-m","http.server","8765","--bind","127.0.0.1"],{stdio:"ignore"});
let browser;
try{
 let up=false;for(let i=0;i<40;i++){try{if((await fetch(origin)).ok){up=true;break}}catch{}await new Promise(r=>setTimeout(r,200))}
 assert.ok(up,"local web server started");
 browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:1370,height:850}});
 const errs=[];page.on("pageerror",e=>errs.push(e.message));
 await page.goto(origin);
 await page.locator(".device-card").first().waitFor();
 assert.equal(await page.locator(".device-card").count(),4,"four product cards load directly");
 assert.equal(await page.locator("#login-form").count(),0,"no login UI");
 await page.locator("#product-search").fill("SPARK");
 assert.equal(await page.locator(".device-card").count(),1);
 await page.locator("#product-search").fill("");
 await page.locator('[data-series="POVA"].filter').click();
 assert.equal(await page.locator(".device-card").count(),2);
 await page.goto(origin+"#/device/camon-50-ultra");
 await page.locator(".fabe-grid").first().waitFor();
 assert.equal(await page.locator(".fabe-cell").count(),8);
 await page.goto(origin+"#/training");
 assert.equal(await page.locator(".course-card").count(),4);
 await page.goto(origin+"#/lesson/fabe");
 await page.locator('[data-action="complete"]').click();
 assert.ok((await page.locator(".lesson-content").innerText()).includes("تم الإنجاز")||(await page.locator(".lesson-content").innerText()).includes("تم الإنجاز"));
 await page.goto(origin+"#/case/camera");
 for(let i=0;i<4;i++){
   await page.locator('[data-choice="0"]').click();
   await page.locator('[data-action="continue"]').click();
 }
 await page.locator(".big-score").waitFor();
 assert.match(await page.locator(".big-score").innerText(),/100/);
 await page.locator("#language").click();
 assert.equal(await page.locator("html").getAttribute("lang"),"en");
 await page.setViewportSize({width:390,height:844});
 await page.goto(origin+"#/products");
 await page.locator("#menu").click();
 assert.equal(await page.locator(".navigation").isVisible(),true);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),"no horizontal overflow on mobile");
 await page.screenshot({path:"mobile-reference.png",fullPage:true});
 assert.deepEqual(errs,[],"no runtime JS errors");
 console.log("PASS: direct product catalog, search/filter, FABE, training, roleplay, localization, mobile.");
}finally{if(browser)await browser.close();server.kill("SIGTERM");}
