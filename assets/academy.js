
import { catalog } from "./catalog.js";
import { courses, simulations, langText, validateScenario } from "./data.js";

const $ = s => document.querySelector(s);
const esc = v => String(v ?? "").replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
const state = {
  lang: localStorage.getItem("academy-language")==="en"?"en":"ar",
  query: "", series: "ALL", menu: false, sim: null,
  selectedLesson: 0,
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
    back:"العودة للأجهزة", view:"فتح المرجع", coursesTitle:"مسارات تطوير مهارات البيع",
    coursesDesc:"دروس قصيرة قابلة للتطبيق في صالة العرض، من فهم العميل إلى تجربة ما بعد البيع.",
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
    back:"Back to devices", view:"Open reference", coursesTitle:"Sales skill development",
    coursesDesc:"Practical lessons you can apply on the retail floor, from discovery to after-sales.",
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
function brand(){
  return '<a class="brand" href="#/products" aria-label="TECNO Sales Academy"><span class="brand-square">T</span><span><strong>TECNO</strong><small>SALES ACADEMY</small></span></a>';
}
function navLink(page,label){
  const active = path()===page || (page==="products" && path().startsWith("device/")) || (page==="training" && path().startsWith("lesson/")) || (page==="simulator" && path().startsWith("case/"));
  return '<a class="nav-link '+(active?"active":"")+'" href="'+href(page)+'">'+esc(L(label))+'</a>';
}
function header(){
  return '<header class="site-header"><div class="wrap nav-bar">'+brand()+
  '<nav class="navigation '+(state.menu?"is-open":"")+'" aria-label="Primary">'+navLink("products","library")+navLink("training","courses")+navLink("simulator","simulation")+'</nav>'+
  '<div class="header-actions"><span class="internal-label">'+esc(L("guided"))+'</span><button id="language" class="language-btn" type="button">'+esc(L("language"))+'</button><button id="menu" class="menu-btn" aria-label="'+esc(L("mobileMenu"))+'" type="button">☰</button></div></div></header>';
}
function footer(){
 return '<footer class="footer"><div class="wrap footer-inner"><div>TECNO <span>SALES ACADEMY</span></div><p>'+esc(L("footer"))+'</p></div></footer>';
}
function render(){
  state.menu=false; setLanguage();
  const seg=detailRoute();let body;
  if(seg[0]==="device")body=devicePage(seg[1]);
  else if(seg[0]==="training")body=trainingPage();
  else if(seg[0]==="lesson")body=lessonPage(seg[1]);
  else if(seg[0]==="simulator")body=simulatorPage();
  else if(seg[0]==="case")body=casePage(seg[1]);
  else body=libraryPage();
  $("#app").innerHTML=header()+body+footer();
  document.title=(seg[0]==="device" ? (catalog.find(p=>p.id===seg[1])?.name||"TECNO")+" | " : "")+"TECNO Sales Academy";
}
function phoneVisual(p,large=false){
  return '<div class="phone-stage '+(large?"large":"")+'" style="--product-accent:'+esc(p.accent)+'">'+
    '<div class="glow"></div><div class="phone-body"><div class="camera-island"><i></i><i></i><i></i></div><div class="phone-brand">TECNO</div><div class="phone-line"></div></div>'+
    '<div class="phone-shadow"></div><span class="media-label">'+esc(L("mediaPending"))+'</span></div>';
}
function hero(){
 return '<div class="hero"><div class="hero-copy"><span class="eyebrow"><span class="eyebrow-dot"></span> '+esc(L("badge"))+'</span>'+
 '<h1>'+esc(L("knowledge"))+'<br/><span>'+esc(L("intro"))+'</span></h1><p>'+esc(L("details"))+'</p>'+
 '<div class="hero-actions"><a href="#/products#catalog" class="btn accent">'+esc(L("enter"))+'</a><a href="#/training" class="btn ghost">'+esc(L("training"))+'</a></div>'+
 '<div class="hero-stats"><div><strong>'+catalog.length.toString().padStart(2,"0")+'</strong><small>'+esc(L("productCount"))+'</small></div><div><strong>'+courses.length.toString().padStart(2,"0")+'</strong><small>'+esc(L("courseCount"))+'</small></div><div><strong>'+simulations.length.toString().padStart(2,"0")+'</strong><small>'+esc(L("simCount"))+'</small></div></div></div>'+
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
 '<p class="source-note">'+esc(L("source"))+'</p></section>'+
 '<section class="journey"><div><span class="eyebrow dark">'+esc(L("objectives"))+'</span><h2>'+esc(L("steps"))+'</h2></div><div class="journey-steps">'+["step1","step2","step3","step4"].map((k,i)=>'<div><span>0'+(i+1)+'</span><strong>'+esc(L(k))+'</strong></div>').join("")+'</div></section>'+
 '</div></main>';
}
function devicePage(id){
 const p=catalog.find(x=>x.id===id);if(!p)return libraryPage();
 const fabeSteps=[["feature","F"],["advantage","A"],["benefit","B"],["evidence","E"]];
 const caseFor=simulations.find(s=>s.product===p.id);
 return '<main id="content"><div class="wrap detail-page"><a href="#/products" class="back-link">← '+esc(L("back"))+'</a>'+
 '<div class="product-cover" style="--product-accent:'+esc(p.accent)+'"><div class="cover-photo">'+phoneVisual(p,true)+'</div><div class="cover-copy"><span class="eyebrow light">'+esc(p.series)+' · '+esc(p.code)+'</span><h1>'+esc(p.name)+'</h1><p>'+esc(T(p.lead))+'</p>'+
 '<div class="tag-row">'+p.tags.map(x=>'<span>'+esc(x)+'</span>').join("")+'</div>'+
 '<div class="cover-links"><a href="#specifications" class="btn accent">'+esc(L("specs"))+'</a><a href="#fabe" class="btn ghost">'+esc(L("fabe"))+'</a></div></div></div>'+
 '<div class="detail-grid"><div class="detail-main"><section id="specifications" class="paper-section"><div class="section-heading compact"><div><span class="eyebrow dark">DEVICE REFERENCE</span><h2>'+esc(L("specs"))+'</h2></div></div>'+
 p.specs.map(g=>'<div class="spec-group"><h3>'+esc(T(g.group))+'</h3><div class="spec-rows">'+g.rows.map(r=>'<div><span>'+esc(r[0])+'</span><strong>'+esc(r[1])+'</strong></div>').join("")+'</div></div>').join("")+
 '</section><section id="fabe" class="paper-section"><div class="section-heading compact"><div><span class="eyebrow dark">FEATURE → EVIDENCE</span><h2>'+esc(L("fabe"))+'</h2></div></div>'+
 p.fabe.map((entry,i)=>'<div class="fabe-example"><div class="fabe-example-title">'+esc(L("practice"))+' '+(i+1).toString().padStart(2,"0")+'</div><div class="fabe-grid">'+fabeSteps.map(([key,letter])=>'<div class="fabe-cell"><span class="fabe-letter">'+letter+'</span><div><b>'+esc(L(key))+'</b><p>'+esc(T(entry[key]))+'</p></div></div>').join("")+'</div></div>').join("")+'</section></div>'+
 '<aside class="detail-aside"><div class="aside-card"><div class="eyebrow dark">'+esc(L("demos"))+'</div><h3>'+esc(L("demos"))+'</h3><ol>'+p.demos.map(x=>'<li>'+esc(T(x))+'</li>').join("")+'</ol></div>'+
 '<div class="aside-card"><div class="eyebrow dark">'+esc(L("objections"))+'</div>'+p.objections.map(x=>'<div class="objection"><strong>'+esc(T(x.q))+'</strong><p>'+esc(T(x.a))+'</p></div>').join("")+'</div>'+
 '<div class="aside-card dark-aside"><div class="eyebrow">PRACTICE WITH A CUSTOMER</div><h3>'+esc(L("play"))+'</h3><p>'+esc(L("simDesc"))+'</p><a href="'+href(caseFor?"case/"+caseFor.id:"simulator")+'" class="btn accent">'+esc(L("simCta"))+' ↗</a></div></aside></div>'+
 '<p class="source-note">'+esc(L("source"))+'</p></div></main>';
}
function trainingPage(){
 return '<main id="content"><div class="wrap standard-page"><div class="simple-heading"><span class="eyebrow dark">LEARNING TRACKS</span><h1>'+esc(L("coursesTitle"))+'</h1><p>'+esc(L("coursesDesc"))+'</p></div>'+
 '<div class="training-grid">'+courses.map((c,i)=>'<a href="'+href("lesson/"+c.id)+'" class="course-card"><div class="course-no">'+c.index+'</div><div class="course-symbol">'+c.icon+'</div><div class="eyebrow dark">'+esc(T(c.tag))+'</div><h2>'+esc(T(c.title))+'</h2><p>'+esc(T(c.description))+'</p><div class="course-foot"><span>'+c.lessons.length+' '+esc(L("lessons"))+'</span><span>↗</span></div></a>').join("")+'</div>'+
 '<div class="mini-note">'+esc(L("saved"))+'</div></div></main>';
}
function lessonPage(id){
 const course=courses.find(c=>c.id===id);if(!course)return trainingPage();
 state.selectedLesson=Math.max(0,Math.min(state.selectedLesson,course.lessons.length-1));
 const lesson=course.lessons[state.selectedLesson], key=course.id+":"+state.selectedLesson;
 const done=state.completed.includes(key);
 return '<main id="content"><div class="wrap standard-page"><a href="#/training" class="back-link">← '+esc(L("courses"))+'</a>'+
 '<div class="simple-heading"><span class="eyebrow dark">'+esc(T(course.tag))+'</span><h1>'+esc(T(course.title))+'</h1><p>'+esc(T(course.description))+'</p></div>'+
 '<div class="lesson-grid"><aside class="lesson-sidebar"><strong>'+esc(L("lessons"))+'</strong>'+course.lessons.map((l,i)=>'<button class="lesson-btn '+(state.selectedLesson===i?"active":"")+'" data-lesson="'+i+'"><span>'+(i+1).toString().padStart(2,"0")+'</span><span>'+esc(T(l.title))+'</span>'+(state.completed.includes(course.id+":"+i)?" ✓":"")+'</button>').join("")+'</aside>'+
 '<section class="lesson-content"><span class="eyebrow dark">LESSON '+(state.selectedLesson+1).toString().padStart(2,"0")+'</span><h2>'+esc(T(lesson.title))+'</h2><p>'+esc(T(lesson.body))+'</p>'+
 '<div class="lesson-actions"><button class="btn done-btn" data-action="complete" '+(done?"disabled":"")+'>'+esc(done?L("completed"):L("done"))+'</button>'+
 '<div class="lesson-arrows"><button data-action="prev-lesson" class="btn light-btn" '+(state.selectedLesson===0?"disabled":"")+'>'+esc(L("prev"))+'</button><button data-action="next-lesson" class="btn accent" '+(state.selectedLesson===course.lessons.length-1?"disabled":"")+'>'+esc(L("next"))+' ←</button></div></div></section></div></div></main>';
}
function simulatorPage(){
 return '<main id="content"><div class="wrap standard-page"><div class="simple-heading"><span class="eyebrow dark">CUSTOMER EXPERIENCE</span><h1>'+esc(L("simTitle"))+'</h1><p>'+esc(L("simDesc"))+'</p></div>'+
 '<div class="case-grid">'+simulations.map((s,i)=>{const product=catalog.find(p=>p.id===s.product);return '<a class="case-card" href="'+href("case/"+s.id)+'"><div class="case-index">0'+(i+1)+'</div><span class="series-chip case-chip">'+esc(product?.name??"TECNO")+'</span><h2>'+esc(T(s.name))+'</h2><p>'+esc(T(s.description))+'</p><div class="course-foot"><span>'+esc(T(s.level))+'</span><span class="circle-arrow">↗</span></div></a>'}).join("")+'</div></div></main>';
}
function casePage(id){
 const s=simulations.find(c=>c.id===id);if(!s)return simulatorPage();
 if(!state.sim||state.sim.id!==id)state.sim={id,node:s.start,score:0,feedback:null,chosen:null,history:[],finished:false};
 if(state.sim.finished){
  let rating=state.sim.score>=80?(state.lang==="ar"?"ممتاز، استمر في البيع حسب احتياج العميل.":"Excellent—keep selling to customer needs."):state.lang==="ar"?"راجع FABE وجرب مرة ثانية.":"Review FABE and try again.";
  return '<main id="content"><div class="wrap standard-page"><a href="#/simulator" class="back-link">← '+esc(L("simulation"))+'</a><section class="result-panel"><span class="eyebrow">CUSTOMER EXPERIENCE RESULT</span><h1>'+esc(L("result"))+'</h1><div class="big-score">'+state.sim.score+'<small>%</small></div><p>'+esc(rating)+'</p><div class="mini-note">'+esc(L("note"))+'</div><div class="result-actions"><button class="btn accent" data-action="retry">'+esc(L("retry"))+'</button><a href="#/simulator" class="btn ghost">'+esc(L("again"))+'</a></div></section></div></main>';
 }
 const step=s.steps[state.sim.node];
 if(!step)return simulatorPage();
 const feedback=state.sim.feedback;
 return '<main id="content"><div class="wrap standard-page"><a href="#/simulator" class="back-link">← '+esc(L("simulation"))+'</a>'+
 '<div class="simple-heading"><span class="eyebrow dark">'+esc(T(s.level))+' · '+esc(catalog.find(p=>p.id===s.product)?.name??"TECNO")+'</span><h1>'+esc(T(s.name))+'</h1><p>'+esc(T(s.description))+'</p></div>'+
 '<div class="simulation-layout"><section class="conversation"><div class="conversation-top"><span>'+esc(L("process"))+'</span><span>'+esc(T({ar: "نقاطك حتى الآن",en:"Score so far"}))+' · '+state.sim.score+'</span></div>'+
 '<div class="customer-bubble"><div class="customer-avatar" aria-hidden="true">◉</div><div><div class="customer-label">'+esc(L("client"))+'</div><p>'+esc(T(step.client))+'</p></div></div>'+
 '<h2 class="question">'+esc(T(step.ask))+'</h2><p class="helper">'+esc(L("decision"))+'</p>'+
 '<div class="choices">'+step.choices.map((c,i)=>'<button class="choice '+(state.sim.chosen===i?"chosen":"")+'" type="button" data-choice="'+i+'" '+(feedback?"disabled":"")+'><span class="choice-index">'+String.fromCharCode(65+i)+'</span><span>'+esc(T(c.text))+'</span></button>').join("")+'</div>'+
 (feedback?'<div class="coaching"><strong>'+(feedback.pts>=20?"✓ ":"→ ")+esc(feedback.pts>=20?T({ar:"قرار مناسب",en:"Strong choice"}):T({ar:"فرصة للتحسين",en:"Room to improve"}))+'</strong><p>'+esc(T(feedback.feedback))+'</p><button id="continue" class="btn accent" data-action="continue">'+esc(L("continue"))+' ↗</button></div>':'')+'</section>'+
 '<aside class="coach-panel"><span class="eyebrow dark">FABE COACH</span><h3>'+esc(L("steps"))+'</h3><div class="coach-steps">'+["step1","step2","step3","step4"].map((x,i)=>'<div><span>'+(i+1)+'</span>'+esc(L(x))+'</div>').join("")+'</div><p>'+esc(L("note"))+'</p></aside></div></div></main>';
}
document.addEventListener("click",event=>{
 const lang=event.target.closest("#language");
 if(lang){state.lang=state.lang==="ar"?"en":"ar";localStorage.setItem("academy-language",state.lang);render();return}
 const menu=event.target.closest("#menu");
 if(menu){state.menu=!state.menu;const nav=$(".navigation");nav?.classList.toggle("is-open",state.menu);return}
 const filter=event.target.closest("[data-series].filter");
 if(filter){state.series=filter.dataset.series;$("#product-grid").innerHTML=cards();document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("selected",b.dataset.series===state.series));return}
 const lesson=event.target.closest("[data-lesson]");
 if(lesson){state.selectedLesson=Number(lesson.dataset.lesson);render();return}
 const action=event.target.closest("[data-action]");
 if(action){
  if(action.dataset.action==="complete"){
   const key=path().split("/")[1]+":"+state.selectedLesson;
   if(!state.completed.includes(key)){state.completed.push(key);localStorage.setItem("academy-lessons",JSON.stringify(state.completed))}
   render();return
  }
  if(action.dataset.action==="prev-lesson"||action.dataset.action==="next-lesson"){
   state.selectedLesson+=action.dataset.action==="next-lesson"?1:-1;render();return
  }
  if(action.dataset.action==="retry"){state.sim=null;render();return}
  if(action.dataset.action==="continue"){
   const s=simulations.find(s=>s.id===state.sim?.id);const current=s?.steps?.[state.sim.node];const choice=current?.choices?.[state.sim.chosen];
   if(!choice)return;
   state.sim.history.push({step:state.sim.node,choice:state.sim.chosen});
   state.sim.node=choice.next;state.sim.feedback=null;state.sim.chosen=null;
   if(choice.next===null){state.sim.finished=true}else if(state.sim.history.length>12||!s.steps[choice.next]){state.sim.finished=true}
   render();return
  }
 }
 const choice=event.target.closest("[data-choice]");
 if(choice&&state.sim&&!state.sim.feedback){
   const s=simulations.find(s=>s.id===state.sim.id);
   const step=s?.steps[state.sim.node]; const n=Number(choice.dataset.choice);
   const selected=step?.choices?.[n];if(!selected)return;
   state.sim.chosen=n;state.sim.score+=selected.pts;state.sim.feedback=selected;render();return
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
window.addEventListener("hashchange",()=>{state.selectedLesson=0;state.menu=false;window.scrollTo({top:0});render()});
setLanguage();render();
