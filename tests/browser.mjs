import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {chromium} from "playwright";
const host="http://127.0.0.1:8765/";
const server=spawn("python3",["-m","http.server","8765","--bind","127.0.0.1"],{stdio:"ignore"});
let browser;
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
try{
 let ready=false;
 for(let i=0;i<30;i++){
  try{const response=await fetch(host);if(response.ok){ready=true;break}}catch{}
  await wait(250);
 }
 assert.ok(ready,"local static server started");
 browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:1365,height:850}});
 const jsErrors=[];
 page.on("pageerror",err=>jsErrors.push(err.message));
 await page.goto(host);
 await page.locator(".hero h1").waitFor();
 assert.ok((await page.locator(".hero h1").innerText()).includes("تجربة العميل"));
 await page.locator("#language").click();
 assert.equal(await page.locator("html").getAttribute("lang"),"en");
 await page.goto(host+"#/products/camon-50-ultra");
 await page.locator(".faberow").first().waitFor();
 assert.equal(await page.locator(".faberow").count(),4);
 await page.goto(host+"#/academy");
 assert.equal(await page.locator(".coursecard").count(),4);
 await page.goto(host+"#/course/fabe");
 await page.locator("#nextlesson").click();
 assert.ok((await page.locator(".lesson-body h2").innerText()).includes("Benefit"));
 await page.goto(host+"#/sim/camera");
 for(let i=0;i<4;i++){
  await page.locator('[data-choice="0"]').click();
  await page.locator("#continuestep").click();
 }
 await page.locator(".scorehuge").waitFor();
 assert.equal((await page.locator(".scorehuge").innerText()).trim(),"100%");
 await page.goto(host+"#/sim/gaming");
 await page.locator('[data-choice="1"]').click();
 await page.locator("#continuestep").click();
 assert.ok((await page.locator(".dialogue p").innerText()).includes("I just want to know"));
 await page.setViewportSize({width:375,height:812});
 await page.goto(host+"#/");
 await page.locator("#mobilemenu").click();
 assert.ok(await page.locator(".navlinks").isVisible());
 await page.screenshot({path:"mobile-smoke.png",fullPage:true});
 assert.deepEqual(jsErrors,[],"No JavaScript page errors");
 console.log("Browser smoke tests passed: Arabic/English, FABE, courses, 100% simulation, branching, mobile menu.");
}finally{
 if(browser)await browser.close();
 server.kill("SIGTERM");
}
