import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {chromium} from "playwright";
const origin="http://127.0.0.1:8765/";
const server=spawn("python3",["-m","http.server","8765","--bind","127.0.0.1"],{stdio:"ignore"});
let browser;
try{
 let ready=false;
 for(let i=0;i<40;i++){try{const r=await fetch(origin);if(r.ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,200))}
 assert.ok(ready);
 browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:1366,height:850}});
 const errors=[];page.on("pageerror",x=>errors.push(x.message));
 await page.goto(origin);
 await page.locator("#login-form").waitFor();
 assert.equal(await page.locator(".product-card").count(),0);
 assert.ok((await page.locator(".signin-card").innerText()).includes("الداخلية")||(await page.locator(".signin-card").innerText()).includes("الدخول"));
 await page.goto(origin+"#/products");
 await page.locator("#login-form").waitFor();
 assert.equal(await page.locator(".product-card").count(),0);
 await page.locator("[data-action=language]").first().click();
 assert.equal(await page.locator("html").getAttribute("lang"),"en");
 assert.ok((await page.locator(".signin-card").innerText()).includes("Sign in"));
 await page.setViewportSize({width:375,height:812});
 await page.reload();
 await page.locator("#login-form").waitFor();
 assert.equal(await page.locator("body").evaluate(el=>el.scrollWidth <= window.innerWidth+1),true);
 assert.deepEqual(errors,[]);
 console.log("Staff-only login, no public catalog, bilingual, and mobile tests passed.");
}finally{if(browser)await browser.close();server.kill("SIGTERM")}
