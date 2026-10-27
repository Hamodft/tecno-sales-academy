
import { catalog } from "./catalog.js";
import {scenarioBank,competencyLabels,competencyWeights,summarize} from "./scenario-bank.js";
import {langText} from "./data.js";
import {communicationTracks as courses} from "./communication.js";
import {journeyCases,journeySummary,journeyMetrics,journeyWeights,journeyPhaseCount} from "./sales-journey.js";

const $ = s => document.querySelector(s);
const esc = v => String(v ?? "").replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
const state = {
  lang: localStorage.getItem("academy-language")==="en"?"en":"ar",
  query: "", series: "ALL", menu: false, sim: null,
  selectedLesson: 0, lessonChoice:null, caseGroup:"all",
  lessonScores:JSON.parse(localStorage.getItem("academy-communication-scores")||"{}"),
  journey:JSON.parse(localStorage.getItem("academy-journey-current")||"null"),
  journeyRecords:JSON.parse(localStorage.getItem("academy-journey-records")||"{}"),
  completed: JSON.parse(localStorage.getItem("academy-lessons")||"[]")
};
const T = v => langText(v,state.lang);
const words = {
  ar: {
    title:"مرجع وتدريب موظفي TECNO", subtitle:"منصة عمل واحدة للمعرفة والتطبيق", library:"مكتبة الأجهزة",
    courses:"التدريب", simulation:"محاكي البيع", language:"English", academy:"TECNO SALES ACADEMY",
    knowledge:"مرجع الأجهزة والمواصفات", intro:"كل جهاز. كل ميزة. وكيف تقنع العميل بها.",
    details:"ابحث عن الهاتف، راجع المواصفات، حوّلها إلى FABE وطبّقها في سيناريو بيع حقيقي.",
    enter:"تصفح الأجهزة", training:"ابدأ التدريب", simCta:"جرب البيع", productCount:"أجهزة",
    courseCount:"مسارات تدريب", simCount:"سيناريوهات تفاعلية", search:"ابحث بالاسم أو السلسلة أو رمز الجهاز...",
    all:"الكل", choose:"اختر جهازًا لعرض كامل التفاصيل", specs:"المواصفات التفصيلية", play:"تدرّب على الجهاز",
    overview:"نظرة سريعة", fabe:"طريقة FABE", demos:"تجربة العميل في المتجر", objections:"اعتراضات وأسئلة متوقعة",
    feature:"F — Feature", advantage:"A — Advantage", benefit:"B — Benefit", evidence:"E — Evidence",
    back:"العودة للأجهزة", view:"فتح المرجع", coursesTitle:"مهارات التواصل مع العملاء",
    coursesDesc:"تطوير مهارة التواصل من أول ترحيب، مرورًا بالاستماع وطرح الأسئلة وشرح القيمة، حتى إدارة الاعتراض وإنهاء الحوار باحتراف.",
    lessons:"الدروس", next:"الدرس التالي", prev:"السابق", done:"سجل إكمال الدرس", completed:"تم الإنجاز",
    simTitle:"حاكي موقفًا حقيقيًا مع العميل", simDesc:"اختياراتك تغيّر مسار المحادثة، وتحصل على درجة وتغذية راجعة.",
    start:"ابدأ السيناريو", client:"العميل", decision:"كيف ترد على العميل؟", continue:"متابعة المحادثة",
    result:"نتيجة المحاكاة", retry:"أعد المحاولة", again:"جرّب سيناريو آخر", score:"النتيجة",
    note:"هذه نتيجة تدريبية على جهازك، وليست تقييمًا وظيفيًا رسميًا.", need:"احتياج العميل",
    keyInfo:"نقاط البيع الرئيسية", mediaPending:"الصورة الرسمية قريبًا", source:"مبني على مواد التدريب السابقة؛ راجع مواصفات نسخة السوق السعودي والعروض الحالية قبل الاعتماد النهائي.",
    saved:"التقدم يُحفظ على هذا الجهاز فقط. لا يلزم تسجيل الدخول.", practice:"تدريب FABE",
    mobileMenu:"القائمة", noResults:"لا توجد أجهزة تطابق البحث.", overviewLink:"اذهب إلى مرجع الأجهزة",
    guided:"تدريب الموظفين", objectives:"تعلم • طبّق • قيّم",
    noLogin:"دخول مباشر بدون حسابات", tip:"معلومة مهمة", allProducts:"عرض جميع الأجهزة",
    chooseOther:"جرّب جهازًا آخر", percent:"من 100", process:"سير المحادثة", product:"الجهاز",
    footer:"مرجع تدريبي عملي. لم تُراجع كل المواصفات رسميًا؛ تحقق من بيانات المنتج قبل التعامل مع العملاء.",
    badge:"التدريب والمواصفات في مكان واحد", steps:"مراحل البيع", step1:"افهم العميل", step2:"اربط الميزة", step3:"أثبت الفائدة", step4:"عالج الاعتراض",
    logoNote:"هوية TECNO النصية مؤقتة لحين رفع الشعار الرسمي."
  },
  en:{
    title:"TECNO Staff Reference & Training", subtitle:"One workplace for knowledge and practice", library:"Device Library",
    courses:"Training", simulation:"Sales Simulator", language:"العربية", academy:"TECNO SALES ACADEMY",
    knowledge:"Device Knowledge Base", intro:"Every device. Every feature. How to sell its value.",
    details:"Find a phone, explore specifications, turn facts into FABE, then practice customer conversations.",
    enter:"Browse devices", training:"Start learning", simCta:"Try a roleplay", productCount:"Devices",
    courseCount:"Learning tracks", simCount:"Interactive cases", search:"Search product, series, or model code...",
    all:"All", choose:"Select a device to view full details", specs:"Detailed specifications", play:"Practice this product",
    overview:"Overview", fabe:"FABE Method", demos:"Live in-store demonstrations", objections:"Customer questions & objections",
    feature:"F — Feature", advantage:"A — Advantage", benefit:"B — Benefit", evidence:"E — Evidence",
    back:"Back to devices", view:"Open reference", coursesTitle:"Customer communication skills",
    coursesDesc:"Build stronger customer conversations: welcome, listen, ask, explain, respond to objections and close professionally.",
    lessons:"Lessons", next:"Next lesson", prev:"Previous", done:"Mark lesson complete", completed:"Completed",
    simTitle:"Practice a real customer conversation", simDesc:"Your choices shape the journey, with a score and instant coaching.",
    start:"Start scenario", client:"Customer", decision:"What would you say next?", continue:"Continue",
    result:"Simulation result", retry:"Try again", again:"More scenarios", score:"Score",
    note:"This is on-device practice feedback, not an official performance assessment.", need:"Customer need",
    keyInfo:"Key selling points", mediaPending:"Official product image coming soon", source:"Based on earlier training materials. Verify Saudi-market variants and current campaigns before relying on details.",
    saved:"Progress is stored on this device only. No sign-in required.", practice:"FABE Practice",
    mobileMenu:"Menu", noResults:"No matching devices found.", overviewLink:"Open device library",
    guided:"Staff training", objectives:"Learn • Practice • Improve",
    noLogin:"Direct access. No accounts.", tip:"Good to know", allProducts:"View all devices",
    chooseOther:"Explore another model", percent:"out of 100", process:"Customer journey", product:"Product",
    footer:"Training reference. Not every specification has completed formal review; verify device information before advising customers.",
    badge:"One reference for product facts and selling skills", steps:"Sales process", step1:"Discover",step2:"Connect",step3:"Demonstrate",step4:"Handle objections",
    logoNote:"Temporary text wordmark until the official logo is supplied."
  }
};
const L = k => words[state.lang][k] ?? k;
const path = () => decodeURIComponent(location.hash.replace(/^#\/?/,"") || "products");
const detailRoute = () => path().split("/");
const href = v => "#/"+v;
const pimg = p => p.media; // image filename reserved for approved assets; placeholders remain until supplied

function setLanguage(){
  document.documentElement.lang=state.lang;
  document.documentElement.dir=state.lang==="ar"?"rtl":"ltr";
}
function brand(){return '<a class="brand" href="#/products" aria-label="TECNO Sales Academy"><img class="tecno-logo" src="./assets/tecno-logo.svg" alt="TECNO"/><span class="academy-word">SALES ACADEMY</span></a>';}
function navLink(page,label){
  const active = path()===page || (page==="products" && path().startsWith("device/")) || (page==="training" && (path().startsWith("lesson/")||path().startsWith("journey/"))) || (page==="simulator" && path().startsWith("case/"));
  return '<a class="nav-link '+(active?"active":"")+'" href="'+href(page)+'">'+esc(L(label))+'</a>';
}
function header(){
  return '<header class="site-header"><div class="wrap nav-bar">'+brand()+
  '<nav class="navigation '+(state.menu?"is-open":"")+'" aria-label="Primary">'+navLink("products","library")+navLink("training","courses")+navLink("simulator","simulation")+'</nav>'+
  '<div class="header-actions"><span class="internal-label">'+esc(L("guided"))+'</span><button id="language" class="language-btn" type="button">'+esc(L("language"))+'</button><button id="menu" class="menu-btn" aria-label="'+esc(L("mobileMenu"))+'" type="button">☰</button></div></div></header>';
}
function footer(){return '<footer class="footer"><div class="wrap footer-inner"><div class="footer-brand"><img src="./assets/tecno-logo.svg" alt="TECNO"/><span>SALES ACADEMY</span></div><p>PRODUCT KNOWLEDGE · FABE · CUSTOMER EXPERIENCE</p></div></footer>';}
function render(){
  state.menu=false; setLanguage();
  const seg=detailRoute();let body;
  if(seg[0]==="device")body=devicePage(seg[1]);
  else if(seg[0]==="training")body=trainingPage();
  else if(seg[0]==="lesson")body=lessonPage(seg[1]);
  else if(seg[0]==="journey")body=journeyPage(seg[1]);
  else if(seg[0]==="simulator")body=simulatorPage();
  else if(seg[0]==="case")body=casePage(seg[1]);
  else body=libraryPage();
  $("#app").innerHTML=header()+body+footer();
  document.title=(seg[0]==="device" ? (catalog.find(p=>p.id===seg[1])?.name||"TECNO")+" | " : "")+"TECNO Sales Academy";
}
function productImage(p){const names={"camon-50-ultra":"camon-50-ultra.webp","pova-8-pro":"pova-8-series.webp","pova-curve-2":"pova-curve-2.webp"};return p&&names[p.id]?"./assets/products/"+names[p.id]:null;}
function phoneVisual(p,large=false){const src=productImage(p);return src?'<div class="phone-stage product-photo-stage '+(large?"large":"")+'"><img class="real-phone-photo" src="'+src+'" loading="'+(large?"eager":"lazy")+'" alt="'+esc(p.name)+'"/></div>':'<div class="phone-stage product-photo-stage '+(large?"large":"")+'"><div class="phone-body"><div class="phone-brand">TECNO</div></div></div>';}
function hero(){
 return '<div class="hero"><div class="hero-copy"><span class="eyebrow"><span class="eyebrow-dot"></span> '+esc(L("badge"))+'</span>'+
 '<h1>'+esc(L("knowledge"))+'<br/><span>'+esc(L("intro"))+'</span></h1><p>'+esc(L("details"))+'</p>'+
 '<div class="hero-actions"><button type="button" data-action="jump" data-target="catalog" class="btn accent">'+esc(L("enter"))+'</button><a href="#/training" class="btn ghost">'+esc(L("training"))+'</a></div>'+
 '<div class="hero-stats"><div><strong>'+catalog.length.toString().padStart(2,"0")+'</strong><small>'+esc(L("productCount"))+'</small></div><div><strong>'+courses.length.toString().padStart(2,"0")+'</strong><small>'+esc(L("courseCount"))+'</small></div><div><strong>'+scenarioBank.length.toString().padStart(2,"0")+'</strong><small>'+esc(L("simCount"))+'</small></div></div></div>'+
 '<div class="hero-visual" aria-hidden="true"><div class="hero-visual-word">FABE</div><div class="floating-spec spec-top">Feature → Benefit</div><div class="floating-spec spec-bottom">Customer Experience <b>✓</b></div><div class="hero-mock-phone"><div class="mock-screen"><span>TECNO ACADEMY</span><strong>85<small>%</small></strong><span>SALES SKILL LEVEL</span><div class="mock-bars"><i></i><i></i><i></i><i></i><i></i></div></div></div></div></div>';
}
function card(p){
 return '<a class="device-card" href="'+href("device/"+p.id)+'" style="--product-accent:'+esc(p.accent)+'" data-series="'+esc(p.series)+'">'+
 '<div class="card-visual"><span class="series-chip">'+esc(p.series)+'</span>'+phoneVisual(p)+'</div>'+
 '<div class="card-body"><div class="device-code">'+esc(p.code)+'</div><h3>'+esc(p.name)+'</h3><p>'+esc(T(p.lead))+'</p>'+
 '<div class="tag-row">'+p.tags.slice(0,3).map(x=>'<span>'+esc(x)+'</span>').join("")+'</div>'+
 '<div class="card-bottom"><span>'+esc(L("view"))+'</span><span class="circle-arrow">↗</span></div></div></a>';
}
function cards(){
 const q=state.query.trim().toLowerCase();
 const list=catalog.filter(p=>(state.series==="ALL" || state.series===p.series)&&
 [p.name,p.series,p.code,T(p.lead),p.tags.join(" ")].join(" ").toLowerCase().includes(q));
 return list.length?list.map(card).join(""):'<div class="empty-state">'+esc(L("noResults"))+'</div>';
}
function libraryPage(){
 return '<main id="content"><div class="wrap">'+hero()+
 '<section class="catalog" id="catalog"><div class="section-heading"><div><span class="eyebrow dark">'+esc(L("library"))+'</span><h2>'+esc(L("knowledge"))+'</h2><p>'+esc(L("choose"))+'</p></div><a href="#/simulator" class="inline-link">'+esc(L("simCta"))+' ↗</a></div>'+
 '<div class="catalog-tools"><label class="search-field"><span aria-hidden="true">⌕</span><input id="product-search" type="search" value="'+esc(state.query)+'" placeholder="'+esc(L("search"))+'" aria-label="'+esc(L("search"))+'"/></label>'+
 '<div class="filter-row">'+["ALL","CAMON","POVA","SPARK"].map(s=>'<button type="button" data-series="'+s+'" class="filter '+(state.series===s?"selected":"")+'">'+esc(s==="ALL"?L("all"):s)+'</button>').join("")+'</div></div>'+
 '<div class="device-grid" id="product-grid">'+cards()+'</div>'+
 '</section>'+
 '<section class="journey"><div><span class="eyebrow dark">'+esc(L("objectives"))+'</span><h2>'+esc(L("steps"))+'</h2></div><div class="journey-steps">'+["step1","step2","step3","step4"].map((k,i)=>'<div><span>0'+(i+1)+'</span><strong>'+esc(L(k))+'</strong></div>').join("")+'</div></section>'+
 '</div></main>';
}
function devicePage(id){
 const p=catalog.find(x=>x.id===id);if(!p)return libraryPage();
 const fabeSteps=[["feature","F"],["advantage","A"],["benefit","B"],["evidence","E"]];
 const group=p.id==="camon-50-ultra"?"camon":p.id==="pova-8-pro"?"pova8":p.id==="pova-curve-2"?"curve":null;
 const caseFor=scenarioBank.find(s=>s.group===group);
 return '<main id="content"><div class="wrap detail-page"><a href="#/products" class="back-link">← '+esc(L("back"))+'</a>'+
 '<div class="product-cover" style="--product-accent:'+esc(p.accent)+'"><div class="cover-photo">'+phoneVisual(p,true)+'</div><div class="cover-copy"><span class="eyebrow light">'+esc(p.series)+' · '+esc(p.code)+'</span><h1>'+esc(p.name)+'</h1><p>'+esc(T(p.lead))+'</p>'+
 '<div class="tag-row">'+p.tags.map(x=>'<span>'+esc(x)+'</span>').join("")+'</div>'+
 '<div class="cover-links"><button type="button" data-action="jump" data-target="specifications" class="btn accent">'+esc(L("specs"))+'</button><button type="button" data-action="jump" data-target="fabe" class="btn ghost">'+esc(L("fabe"))+'</button></div></div></div>'+
 '<div class="detail-grid"><div class="detail-main"><section id="specifications" class="paper-section"><div class="section-heading compact"><div><span class="eyebrow dark">DEVICE REFERENCE</span><h2>'+esc(L("specs"))+'</h2></div></div>'+
 p.specs.map(g=>'<div class="spec-group"><h3>'+esc(T(g.group))+'</h3><div class="spec-rows">'+g.rows.map(r=>'<div><span>'+esc(r[0])+'</span><strong>'+esc(r[1])+'</strong></div>').join("")+'</div></div>').join("")+
 '</section><section id="fabe" class="paper-section"><div class="section-heading compact"><div><span class="eyebrow dark">FEATURE → EVIDENCE</span><h2>'+esc(L("fabe"))+'</h2></div></div>'+
 p.fabe.map((entry,i)=>'<div class="fabe-example"><div class="fabe-example-title">'+esc(L("practice"))+' '+(i+1).toString().padStart(2,"0")+'</div><div class="fabe-grid">'+fabeSteps.map(([key,letter])=>'<div class="fabe-cell"><span class="fabe-letter">'+letter+'</span><div><b>'+esc(L(key))+'</b><p>'+esc(T(entry[key]))+'</p></div></div>').join("")+'</div></div>').join("")+'</section></div>'+
 '<aside class="detail-aside"><div class="aside-card"><div class="eyebrow dark">'+esc(L("demos"))+'</div><h3>'+esc(L("demos"))+'</h3><ol>'+p.demos.map(x=>'<li>'+esc(T(x))+'</li>').join("")+'</ol></div>'+
 '<div class="aside-card"><div class="eyebrow dark">'+esc(L("objections"))+'</div>'+p.objections.map(x=>'<div class="objection"><strong>'+esc(T(x.q))+'</strong><p>'+esc(T(x.a))+'</p></div>').join("")+'</div>'+
 '<div class="aside-card dark-aside"><div class="eyebrow">PRACTICE WITH A CUSTOMER</div><h3>'+esc(L("play"))+'</h3><p>'+esc(L("simDesc"))+'</p><a href="'+href(caseFor?"case/"+caseFor.id:"simulator")+'" class="btn accent">'+esc(L("simCta"))+' ↗</a></div></aside></div>'+
 (group?'<div class="model-scenarios"><div class="section-heading"><div><span class="eyebrow dark">SALES ASSESSMENT</span><h2>'+esc(state.lang==="ar"?"10 سيناريوهات بيع لهذا الموديل":"10 sales scenarios for this model")+'</h2></div></div><div class="model-case-grid">'+(group?scenarioBank.filter(c=>c.group===group).map(c=>'<a class="model-case-link" href="'+href("case/"+c.id)+'"><span>'+String(c.number).padStart(2,"0")+'</span><strong>'+esc(T(c.title))+'</strong><span>↗</span></a>').join(""):'')+'</div></div></main>': '</div></main>');
}

function courseProgress(course){
 return course.lessons.filter(x=>Number(state.lessonScores[x.id]||0)>=70).length;
}
function trainingPage(){
 const total=courses.reduce((sum,c)=>sum+c.lessons.length,0);
 const complete=courses.reduce((sum,c)=>sum+courseProgress(c),0);
 const percent=Math.round(complete/Math.max(1,total)*100);
 const intro=state.lang==="ar"?
 "تعلّم كيف يسمعك العميل، وكيف تسمعه أنت، وكيف تحول الحديث إلى تجربة تحترم احتياجه.":
 "Learn how to listen, be understood, and turn conversations into customer-first experiences.";
 return '<main id="content"><div class="wrap communication-page">'+
 journeyEntry()+
 '<section class="training-lead"><div><span class="eyebrow dark">LEARNING JOURNEY</span><h2>'+esc(state.lang==="ar"?"تعلّم بالتطبيق، وليس بحفظ العبارات":"Practice the conversation, not memorized scripts")+'</h2><p>'+esc(L("coursesDesc"))+'</p></div><div class="training-progress-box"><div><strong>'+percent+'%</strong><span>'+esc(state.lang==="ar"?"نسبة إنجازك":"Your progress")+'</span></div><div class="training-progress"><span style="width:'+percent+'%"></span></div></div></section>'+
 '<div class="training-grid communication-grid">'+courses.map((course,index)=>{
  const done=courseProgress(course),ratio=Math.round(done/course.lessons.length*100);
  const skillTags=course.skills.map(s=>'<span>'+esc(T(s))+'</span>').join("");
  return '<a href="'+href("lesson/"+course.id)+'" class="course-card communication-card" style="--path-color:'+course.color+'"><div class="course-head"><span class="course-no">'+course.index+'</span><span class="course-symbol">'+course.icon+'</span></div>'+
  '<span class="course-overline">'+esc(state.lang==="ar"?"المسار "+(index+1):"PATH "+(index+1))+'</span><h2>'+esc(T(course.title))+'</h2><p>'+esc(T(course.description))+'</p>'+
  '<div class="skill-tags">'+skillTags+'</div><div class="communication-outcome">'+esc(T(course.outcome))+'</div><div class="course-progress-row"><span>'+done+' / '+course.lessons.length+' '+esc(state.lang==="ar"?"دروس مكتملة":"lessons completed")+'</span><strong>'+ratio+'%</strong></div><div class="course-progress-track"><i style="width:'+ratio+'%"></i></div>'+
  '<div class="course-foot"><span>'+esc(state.lang==="ar"?"افتح المسار":"Open learning path")+'</span><span>↗</span></div></a>';
 }).join("")+'</div></div></main>';
}
function lessonPage(id){
 const course=courses.find(c=>c.id===id);if(!course)return trainingPage();
 state.selectedLesson=Math.max(0,Math.min(state.selectedLesson,course.lessons.length-1));
 const item=course.lessons[state.selectedLesson], completed=courseProgress(course),progress=Math.round(completed/course.lessons.length*100);
 const answerIndex=state.lessonChoice, selected=answerIndex===null?null:item.options[answerIndex];
 const best=Number(state.lessonScores[item.id]||0);
 const chapter=String(state.selectedLesson+1).padStart(2,"0");
 const label=(ar,en)=>state.lang==="ar"?ar:en;
 const feedback=selected?'<div class="communication-feedback '+(selected.score===100?"excellent":selected.score===50?"partial":"needs-work")+'"><div class="communication-feedback-head"><strong>'+esc(selected.score===100?label("إجابة ممتازة","Strong response"):label("فرصة للتحسين","Room for improvement"))+'</strong><span>'+selected.score+' / 100</span></div><p>'+esc(T(selected.feedback))+'</p><div class="model-response"><span>'+esc(label("صياغة مقترحة","Recommended response"))+'</span><p>'+esc(T(item.model))+'</p></div>'+
 '<div class="communication-feedback-actions"><button class="btn light-btn" data-action="retry-lesson">'+esc(label("جرّب مرة أخرى","Try again"))+'</button>'+(state.selectedLesson<course.lessons.length-1?'<button class="btn accent" data-action="next-lesson">'+esc(L("next"))+' ←</button>':'<a class="btn accent" href="#/training">'+esc(label("العودة إلى المسارات","Back to learning paths"))+' ↗</a>')+'</div></div>':'';
 return '<main id="content"><div class="wrap standard-page communication-lesson-page"><a href="#/training" class="back-link">← '+esc(L("courses"))+'</a>'+
 '<div class="communication-course-heading"><div><span class="eyebrow dark">COMMUNICATION · PATH '+esc(course.index)+'</span><h1>'+esc(T(course.title))+'</h1><p>'+esc(T(course.outcome))+'</p></div><div class="course-completion"><strong>'+completed+' / '+course.lessons.length+'</strong><span>'+esc(label("درس منجز","Lessons done"))+'</span><div class="training-progress"><span style="width:'+progress+'%"></span></div></div></div>'+
 '<div class="lesson-grid communication-lesson-grid"><aside class="lesson-sidebar communication-sidebar"><div class="sidebar-title"><span>'+esc(label("دروس هذا المسار","Lessons in this path"))+'</span><strong>'+course.lessons.length+'</strong></div>'+
 course.lessons.map((l,i)=>'<button class="lesson-btn '+(state.selectedLesson===i?"active":"")+'" data-lesson="'+i+'"><span class="chapter-no">'+String(i+1).padStart(2,"0")+'</span><span>'+esc(T(l.title))+'</span>'+(Number(state.lessonScores[l.id]||0)>=70?'<span class="lesson-check">✓</span>':'')+'</button>').join("")+
 '</aside><article class="lesson-content communication-content"><div class="lesson-topline"><span class="eyebrow dark">'+esc(label("الدرس","LESSON"))+' '+chapter+'</span><span class="lesson-status '+(best>=70?"passed":"")+'">'+esc(best>=70?label("مكتمل","Completed"):label("قيد التعلم","In progress"))+'</span></div>'+
 '<h2>'+esc(T(item.title))+'</h2><section class="learning-principle"><span class="section-mini">01 · '+esc(label("الفكرة الأساسية","KEY CONCEPT"))+'</span><p>'+esc(T(item.concept))+'</p></section>'+
 '<section class="communication-situation"><div class="situation-header"><span class="customer-avatar">◉</span><div><small>REAL CUSTOMER MOMENT</small><h3>'+esc(label("موقف من صالة العرض","Retail-floor situation"))+'</h3></div></div><p>“'+esc(T(item.situation))+'”</p></section>'+
 '<section class="communication-quiz"><span class="section-mini">02 · '+esc(label("اختبر أسلوب تواصلك","CHOOSE YOUR RESPONSE"))+'</span><h3>'+esc(label("ما الرد الأنسب في هذا الموقف؟","Which response would you choose?"))+'</h3><div class="communication-options">'+item.options.map((o,i)=>'<button class="communication-option '+(answerIndex===i?"selected":"")+'" data-lesson-answer="'+i+'" '+(selected?"disabled":"")+'><span>'+String.fromCharCode(65+i)+'</span><strong>'+esc(T(o.text))+'</strong></button>').join("")+'</div></section>'+
 feedback+
 '<section class="communication-drill"><span class="section-mini">03 · '+esc(label("تطبيق في المعرض","ON-FLOOR PRACTICE"))+'</span><p>'+esc(T(item.drill))+'</p></section>'+
 '<div class="lesson-actions communication-lesson-actions"><div class="lesson-arrows"><button class="btn light-btn" data-action="prev-lesson" '+(state.selectedLesson===0?"disabled":"")+'>'+esc(L("prev"))+'</button><button class="btn accent" data-action="next-lesson" '+(state.selectedLesson===course.lessons.length-1?"disabled":"")+'>'+esc(L("next"))+' ←</button></div></div>'+
 '</article></div></div></main>';
}
const axes=["knowledge","experience","selling"];
function simChoices(){
 const tabs=[["all",state.lang==="ar"?"جميع الحالات":"All cases"],["camon","CAMON 50 Ultra"],["pova8","POVA 8 Series"],["curve","POVA Curve 2"]];
 return tabs.map(([id,label])=>'<button class="sim-filter '+(state.caseGroup===id?"selected":"")+'" data-case-group="'+id+'">'+esc(label)+' <span>'+(id==="all"?"30":"10")+'</span></button>').join("");
}
function simulatorPage(){
 const shown=scenarioBank.filter(c=>state.caseGroup==="all"||c.group===state.caseGroup);
 return '<main id="content"><div class="wrap standard-page"><div class="simple-heading"><span class="eyebrow dark">SALES ASSESSMENT · 30 SCENARIOS</span><h1>'+esc(L("simTitle"))+'</h1><p>'+esc(L("simDesc"))+'</p></div>'+
 '<div class="case-filter">'+simChoices()+'</div><div class="case-grid scenario-grid">'+shown.map(c=>{
  const p=catalog.find(x=>x.id===c.product),photo=productImage(p);
  return '<a class="case-card scenario-card" href="'+href("case/"+c.id)+'"><div class="case-card-media">'+(photo?'<img loading="lazy" src="'+esc(photo)+'" alt="'+esc(p.name)+'">':'')+'</div><div class="case-card-body"><span class="case-n">'+String(c.number).padStart(2,"0")+' / 10</span><span class="case-model">'+esc(c.model)+'</span><h2>'+esc(T(c.title))+'</h2><p>'+esc(T(c.description))+'</p><div class="course-foot"><span>'+esc(T(c.level))+'</span><span>↗</span></div></div></a>';
 }).join("")+'</div></div></main>';
}
function resultDetail(c,run){
 const report=summarize(run.marks);
 const ratings={excellent:{ar:"ممتاز",en:"Excellent"},good:{ar:"جيد",en:"Good"},develop:{ar:"يحتاج إلى تطوير",en:"Needs development"}};
 const weak=axes.reduce((w,k)=>report.scores[k]<report.scores[w]?k:w,axes[0]);
 const improvement={
  knowledge:{ar:"راجع المواصفات وطرق إثباتها عمليًا للعميل.",en:"Review specifications and practical demonstrations."},
  experience:{ar:"ركّز على فهم العميل والاستماع لاحتياجه قبل العرض.",en:"Focus on discovery and listening before recommending."},
  selling:{ar:"راجع أساليب معالجة الاعتراض والإغلاق دون ضغط.",en:"Practice objection handling and respectful closing."}
 };
 const bar=key=>'<div class="score-axis"><div><span>'+esc(T(competencyLabels[key]))+'</span><strong>'+report.scores[key]+'%</strong></div><div class="score-track"><span style="width:'+report.scores[key]+'%"></span></div><small>'+Math.round(competencyWeights[key]*100)+'% '+esc(state.lang==="ar"?"من النتيجة":"of overall score")+'</small></div>';
 return '<main id="content"><div class="wrap standard-page report-page"><a href="#/simulator" class="back-link">← '+esc(L("simulation"))+'</a>'+
 '<div class="report-header"><span class="eyebrow">SALES PERFORMANCE REPORT</span><h1>'+esc(T(c.title))+'</h1><p>'+esc(c.model)+'</p><div class="report-bignum">'+report.total+'<small>%</small></div><div class="report-level">'+esc(T(ratings[report.level]))+'</div></div>'+
 '<div class="report-metrics">'+axes.map(bar).join("")+'</div>'+
 '<div class="report-advice"><div><span class="eyebrow dark">'+esc(state.lang==="ar"?"مجال التحسين":"FOCUS AREA")+'</span><h2>'+esc(T(competencyLabels[weak]))+'</h2><p>'+esc(T(improvement[weak]))+'</p></div><div class="report-actions"><button class="btn accent" data-action="retry">'+esc(L("retry"))+'</button><a class="btn light-btn" href="#/simulator">'+esc(L("again"))+'</a></div></div></div></main>';
}
function casePage(id){
 const c=scenarioBank.find(x=>x.id===id);if(!c)return simulatorPage();
 if(!state.sim||state.sim.id!==id)state.sim={id,node:"discovery",marks:{knowledge:0,experience:0,selling:0},chosen:null,feedback:null,history:[],finished:false};
 const run=state.sim;
 if(run.finished)return resultDetail(c,run);
 const stage=c.stages[run.node];if(!stage)return simulatorPage();
 const fb=run.feedback, stepCount=run.history.filter(h=>h.node!=="recovery").length;
 const steps=[["discovery",state.lang==="ar"?"فهم العميل":"Discovery"],["technical",state.lang==="ar"?"الجانب التقني":"Technical"],["evidence",state.lang==="ar"?"تجربة المنتج":"Demonstration"],["closing",state.lang==="ar"?"إغلاق البيع":"Closing"]];
 const p=catalog.find(p=>p.id===c.product);
 return '<main id="content"><div class="wrap standard-page"><a href="#/simulator" class="back-link">← '+esc(L("simulation"))+'</a>'+
 '<div class="scenario-heading"><div><span class="eyebrow dark">'+esc(c.model)+' · '+String(c.number).padStart(2,"0")+' / 10</span><h1>'+esc(T(c.title))+'</h1><p>'+esc(T(c.description))+'</p></div><img src="'+esc(productImage(p)||"")+'" alt="'+esc(p.name)+'"/></div>'+
 '<div class="scenario-progress">'+steps.map(([id,name],i)=>'<div class="'+(run.node===id||id==="discovery"&&run.node==="recovery"?"active":stepCount>i?"done":"")+'"><strong>0'+(i+1)+'</strong><span>'+esc(name)+'</span></div>').join("")+'</div>'+
 '<div class="simulation-layout"><section class="conversation"><div class="conversation-top"><span>SALES ROLEPLAY</span><span>'+esc(T(competencyLabels[stage.category]))+'</span></div>'+
 '<div class="customer-bubble"><div class="customer-avatar">◉</div><div><div class="customer-label">'+esc(L("client"))+'</div><p>'+esc(T(stage.client))+'</p></div></div>'+
 '<h2 class="question">'+esc(T(stage.ask))+'</h2><p class="helper">'+esc(L("decision"))+'</p><div class="choices">'+stage.choices.map((o,i)=>'<button data-choice="'+i+'" class="choice '+(run.chosen===i?"chosen":"")+'" '+(fb?"disabled":"")+'><span class="choice-index">'+String.fromCharCode(65+i)+'</span><span>'+esc(T(o.text))+'</span></button>').join("")+'</div>'+
 (fb?'<div class="coaching"><strong>'+esc(state.lang==="ar"?"تحليل الإجابة":"Decision feedback")+'</strong><p>'+esc(T(fb.feedback))+'</p><button class="btn accent" data-action="continue">'+esc(L("continue"))+' ↗</button></div>':'')+'</section>'+
 '<aside class="coach-panel"><span class="eyebrow dark">'+esc(state.lang==="ar"?"معايير التقييم":"ASSESSMENT CRITERIA")+'</span><h3>'+esc(state.lang==="ar"?"توزيع الدرجات":"Scoring weights")+'</h3><div class="weights">'+axes.map(k=>'<div><span>'+esc(T(competencyLabels[k]))+'</span><strong>'+Math.round(competencyWeights[k]*100)+'%</strong></div>').join("")+'</div></aside></div></div></main>';
}
document.addEventListener("click",event=>{
 const lang=event.target.closest("#language");
 if(lang){state.lang=state.lang==="ar"?"en":"ar";localStorage.setItem("academy-language",state.lang);render();return}
 const menu=event.target.closest("#menu");
 if(menu){state.menu=!state.menu;const nav=$(".navigation");nav?.classList.toggle("is-open",state.menu);return}
 const filter=event.target.closest("[data-series].filter");
 if(filter){state.series=filter.dataset.series;$("#product-grid").innerHTML=cards();document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("selected",b.dataset.series===state.series));return}
 const lesson=event.target.closest("[data-lesson]");
 if(lesson){state.selectedLesson=Number(lesson.dataset.lesson);state.lessonChoice=null;render();return}
 const action=event.target.closest("[data-action]");
 if(action){
  if(action.dataset.action==="jump"){document.getElementById(action.dataset.target)?.scrollIntoView({behavior:"smooth",block:"start"});return}
  if(action.dataset.action==="complete"){
   const key=path().split("/")[1]+":"+state.selectedLesson;
   if(!state.completed.includes(key)){state.completed.push(key);localStorage.setItem("academy-lessons",JSON.stringify(state.completed))}
   render();return
  }
  if(action.dataset.action==="prev-lesson"||action.dataset.action==="next-lesson"){
   state.selectedLesson+=action.dataset.action==="next-lesson"?1:-1;state.lessonChoice=null;render();return
  }
  if(action.dataset.action==="retry-lesson"){state.lessonChoice=null;render();return}
    if(action.dataset.action==="retry"){state.sim=null;render();return}
  if(action.dataset.action==="continue"){
   const c=scenarioBank.find(s=>s.id===state.sim?.id);
   const option=c?.stages?.[state.sim.node]?.choices?.[state.sim.chosen];
   if(!option)return;
   state.sim.history.push({node:state.sim.node,option:state.sim.chosen});
   state.sim.node=option.next;state.sim.chosen=null;state.sim.feedback=null;
   if(option.next===null||state.sim.history.length>12)state.sim.finished=true;
   render();return;
  }
 }
 const filt=event.target.closest("[data-case-group]");
 if(filt){state.caseGroup=filt.dataset.caseGroup;render();return}
 const chosenLesson=event.target.closest("[data-lesson-answer]");
 if(chosenLesson){
  const course=courses.find(c=>c.id===path().split("/")[1]);
  const item=course?.lessons[state.selectedLesson];
  const idx=Number(chosenLesson.dataset.lessonAnswer);
  if(!item||!item.options[idx]||state.lessonChoice!==null)return;
  const grade=item.options[idx].score;
  state.lessonChoice=idx;
  state.lessonScores[item.id]=Math.max(Number(state.lessonScores[item.id]||0),grade);
  localStorage.setItem("academy-communication-scores",JSON.stringify(state.lessonScores));
  render();return;
 }
 const choice=event.target.closest("[data-choice]");
 if(choice&&state.sim&&!state.sim.feedback){
   const scenario=scenarioBank.find(s=>s.id===state.sim.id);
   const option=scenario?.stages?.[state.sim.node]?.choices?.[Number(choice.dataset.choice)];
   if(!option)return;
   state.sim.chosen=Number(choice.dataset.choice);
   state.sim.feedback=option;
   for(const key of axes)state.sim.marks[key]+=Number(option.marks[key])||0;
   render();return;
 }

});
document.addEventListener("input",event=>{
 if(event.target.id==="product-search"){
  state.query=event.target.value;
  const field=event.target;
  $("#product-grid").innerHTML=cards();
  field.focus();
 }
});
window.addEventListener("hashchange",()=>{state.selectedLesson=0;state.lessonChoice=null;state.menu=false;window.scrollTo({top:0});render()});
setLanguage();render();
