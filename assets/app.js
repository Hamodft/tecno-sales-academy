import {products,courses,simulations,langText,stages,validateScenario} from "./data.js";
import {configured,identity,login,logout,saveAttempt,myAttempts,myCompletedLessons,markLesson,adminStats} from "./auth.js";
const $=s=>document.querySelector(s);
const t=x=>langText(x,state.lang);
const e=x=>String(x??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const dict={
ar:{brand:"TECNO SALES ACADEMY",home:"الرئيسية",products:"المنتجات",academy:"الأكاديمية",simulator:"محاكي المبيعات",portal:"بوابة الموظف",login:"دخول الموظفين",admin:"الإدارة",language:"English",start:"ابدأ التعلم",try:"جرّب محاكاة البيع",learn:"اكتشف المسار",explore:"استكشف المنتج",view:"عرض التفاصيل",why:"لماذا هذه الأكاديمية؟",heroTitle:"من معرفة المنتج إلى",heroAccent:"احتراف تجربة العميل",heroBody:"تعلّم كيف تستمع للعميل، تربط احتياجه بفوائد المنتج باستخدام FABE، وتثبت القيمة بتجربة عملية. منصة صُممت لموظفي المبيعات وللمهتمين بتحسين مهاراتهم.",hstat1:"مسارات تدريب",hstat2:"أجهزة للتطبيق",hstat3:"تجارب بيع",step1:"تعلّم",step2:"طبّق",step3:"قيّم",step4:"تطوّر",value1:"تعلم مصمم للمواقف الحقيقية",value1d:"محتوى قصير ومباشر يربط كل فكرة بموقف داخل المعرض.",value2:"FABE بأسلوب تجربة العميل",value2d:"لا تكتفِ بالمواصفات؛ اربط الميزة بحاجة العميل وقدّم دليلًا عمليًا.",value3:"محاكاة بقرارات متفرعة",value3d:"خيارات مختلفة تغيّر مسار الحديث وتؤثر في التقييم.",catalogTitle:"المنتج قصة تبدأ باحتياج",catalogDesc:"تعرّف على المنتجات من منظور الفائدة التي يحصل عليها العميل، وليس من منظور المواصفات فقط.",trackTitle:"تعلّم بخطوات واضحة",trackDesc:"مسارات قصيرة تبدأ باكتشاف الحاجة وتنتهي بإغلاق احترافي وتجربة عميل أفضل.",simTitle:"ادخل تجربة البيع",simDesc:"اختر أحد العملاء الافتراضيين، تعامل مع اعتراضاته، واحصل على تدريب فوري بعد كل قرار.",publicInfo:"الصفحات العامة متاحة للجميع. حفظ نتائج الموظفين يتطلب حسابًا معتمدًا.",demo:"تجربة تدريبية عامة",facts:"المواصفات المختصرة",fabe:"كيف تحولها إلى قيمة؟",feature:"Feature — الميزة",advantage:"Advantage — الأفضلية",benefit:"Benefit — الفائدة",evidence:"Evidence — الدليل",fabeHint:"اسأل العميل أولًا، ثم استخدم الميزة ذات الصلة باحتياجه.",lessons:"الدروس",next:"التالي",previous:"السابق",finish:"إنهاء",learnMore:"تعلّم المزيد",playNow:"ابدأ المحاكاة",customer:"العميل",decision:"ما أفضل تصرف في هذا الموقف؟",continue:"تابع الحوار",feedbackGood:"قرار قوي",feedbackImprove:"فرصة للتطوير",simComplete:"اكتملت المحاكاة",score:"درجتك",outOf:"من 100",replay:"أعد المحاولة",allCases:"كل السيناريوهات",excellent:"ممتاز! تربط الفوائد بوضوح وتقدّم تجربة محترمة.",growing:"تقدّم جيد. ركّز على الإصغاء وإثبات الفائدة عمليًا.",practice:"راجع أساسيات FABE ثم أعد التجربة.",myPage:"لوحتي",myResults:"نتائج التدريب",myCourses:"تقدم الدروس",signout:"تسجيل الخروج",email:"البريد الإلكتروني الوظيفي",sendLink:"أرسل رابط الدخول",authNotice:"الدخول متاح فقط للحسابات التي تمت دعوتها واعتمادها إداريًا. لا يوجد تسجيل عام لحساب موظف.",noBackend:"لم يتم تفعيل نظام حسابات الموظفين بعد. المحتوى العام يعمل بشكل مستقل.",wait:"جاري التحقق من الحساب...",noPermission:"الحساب غير معتمد للوصول إلى بيانات الموظفين.",noResults:"لا توجد نتائج محفوظة بعد.",guestScore:"هذه نتيجة تدريب تجريبية على جهازك، وليست تقييمًا وظيفيًا معتمدًا.",privacy:"تنبيه الخصوصية",privacyText:"هذا نموذج تدريب مستقل غير رسمي. لا تُدخل معلومات موظفين أو عملاء فعلية في المحاكاة العامة.",footer:"منصة تعليمية تجريبية مستقلة، وليست موقعًا رسميًا لشركة TECNO. يجب التحقق من المعلومات قبل استخدامها تجاريًا.",all:"عرض الكل",error:"حصل خطأ",adminTitle:"لوحة التحكم",profiles:"الموظفون",attempts:"المحاولات",role:"الصلاحية",status:"الحالة",approved:"معتمد",pending:"بانتظار الاعتماد",lessonDone:"تم إكمال الدرس",markDone:"سجّل إكمال الدرس",staffOnly:"ميزة مخصصة للموظفين المعتمدين",goLogin:"اذهب إلى تسجيل الدخول",completion:"التقدم",scenario:"السيناريو",date:"التاريخ",scoreIntegrity:"درجات المحاكاة الحالية تدريبية وليست مصدرًا معتمدًا لقرارات الموارد البشرية.",productsNote:"مواصفات مختارة للتدريب؛ قد تختلف نسخ المنتج حسب السوق. تأكد من النسخة والسعر والتوفر.",mobileMenu:"القائمة",back:"رجوع"},
en:{brand:"TECNO SALES ACADEMY",home:"Home",products:"Products",academy:"Academy",simulator:"Sales Simulator",portal:"Employee Portal",login:"Staff Sign In",admin:"Admin",language:"العربية",start:"Start learning",try:"Try sales simulation",learn:"Explore course",explore:"Explore product",view:"View details",why:"Why this academy?",heroTitle:"Beyond product knowledge.",heroAccent:"Master customer experience.",heroBody:"Learn to listen, translate product facts into FABE benefits and prove real value through hands-on demonstrations. Designed for sales associates and lifelong learners.",hstat1:"Learning tracks",hstat2:"Featured devices",hstat3:"Sales scenarios",step1:"Learn",step2:"Practice",step3:"Evaluate",step4:"Grow",value1:"Built for real conversations",value1d:"Short practical lessons tied to situations on the retail floor.",value2:"FABE through customer experience",value2d:"Move beyond specifications; connect facts with personal benefits and proof.",value3:"Branching decision journeys",value3d:"Your choices shape the conversation and your result.",catalogTitle:"Start with a need, not a spec",catalogDesc:"Explore the products through customer benefits, not just technical numbers.",trackTitle:"Learn in focused steps",trackDesc:"Start with discovery and grow toward a confident, respectful close.",simTitle:"Step into the sales floor",simDesc:"Choose a virtual customer, handle objections, and receive instant coaching.",publicInfo:"Public pages are open to everyone. Saving staff results requires an approved employee account.",demo:"Open practice simulation",facts:"Key specifications",fabe:"Turn features into value",feature:"Feature",advantage:"Advantage",benefit:"Benefit",evidence:"Evidence",fabeHint:"Discover customer needs first. Apply only the features that address them.",lessons:"Lessons",next:"Next",previous:"Previous",finish:"Finish",learnMore:"Learn more",playNow:"Start simulation",customer:"Customer",decision:"What would you do next?",continue:"Continue conversation",feedbackGood:"Strong decision",feedbackImprove:"Growth opportunity",simComplete:"Simulation completed",score:"Your score",outOf:"out of 100",replay:"Try again",allCases:"All scenarios",excellent:"Excellent! Your approach links relevant benefits and respectful service.",growing:"Good progress. Practice active listening and evidence-based demonstrations.",practice:"Review FABE fundamentals, then try again.",myPage:"My dashboard",myResults:"Learning results",myCourses:"Course progress",signout:"Sign out",email:"Work email address",sendLink:"Send sign-in link",authNotice:"Only pre-invited and admin-approved staff accounts can access private content. No public employee registration.",noBackend:"Employee account services are not activated yet. Public learning is available without an account.",wait:"Checking your account...",noPermission:"Your account is not approved for private employee features.",noResults:"No recorded results yet.",guestScore:"This is a guest practice result on your device, not an official employee assessment.",privacy:"Privacy notice",privacyText:"Independent educational prototype. Do not enter real customer or employee personal information in public exercises.",footer:"Independent educational prototype. Not an official TECNO service. Verify product information before commercial use.",all:"All",error:"Something went wrong",adminTitle:"Administration",profiles:"Staff",attempts:"Attempts",role:"Role",status:"Status",approved:"Approved",pending:"Pending",lessonDone:"Lesson completed",markDone:"Mark lesson complete",staffOnly:"Only approved employees can use this feature",goLogin:"Sign in",completion:"Progress",scenario:"Scenario",date:"Date",scoreIntegrity:"Simulation scores are formative training and not yet authoritative for HR decisions.",productsNote:"Selected training specs; versions vary by market. Verify model, pricing and availability.",mobileMenu:"Menu",back:"Back"}
};
const L=k=>dict[state.lang][k]||k;
let saved="ar";
try{saved=localStorage.getItem("tsa-language")||"ar"}catch{}
const state={lang:saved==="en"?"en":"ar",menu:false,user:null,profile:null,loaded:false,authError:"",attempts:[],lessons:[],admin:null,notice:"",sim:null,lessonIndex:0};
function link(path){return "#/"+path}
function urlParts(){return location.hash.replace(/^#\/?/,"").split("/").filter(Boolean)}
function navItem(path,text){return '<a href="'+link(path)+'" class="'+(urlParts()[0]===path?"active":"")+'">'+text+'</a>'}
function header(){
 return '<header class="topbar"><div class="container navrow">'+
 '<a class="brand" href="#/" aria-label="Academy Home"><span class="brandmark">✺</span><span class="brandtext"><strong>TECNO</strong><small>SALES ACADEMY</small></span></a>'+
 '<nav class="navlinks '+(state.menu?"open":"")+'" aria-label="Main menu">'+navItem("",L("home"))+navItem("products",L("products"))+navItem("academy",L("academy"))+navItem("simulator",L("simulator"))+navItem("dashboard",L("portal"))+'</nav>'+
 '<div class="navtools"><button type="button" class="iconbutton" id="language" aria-label="Change language">'+L("language")+'</button><a href="#/login" class="btn outline login-link">'+L("login")+'</a><button type="button" class="iconbutton menubtn" id="mobilemenu" aria-label="'+L("mobileMenu")+'">☰</button></div></div></header>';
}
function footer(){return '<footer class="footer"><div class="container footergrid"><span><strong>TECNO SALES ACADEMY</strong> · FABE / Customer Experience</span><span>'+L("footer")+'</span></div></footer>'}
function head(eyebrow,title,description){return '<div class="page-head"><div class="container"><span class="eyebrow">'+eyebrow+'</span><h1>'+title+'</h1><p>'+description+'</p></div></div>'}
function productCard(p){
 return '<a class="surface productcard" href="'+link("products/"+p.id)+'" style="--accent:'+p.theme+'"><span class="series">'+e(p.series)+'</span><span class="producticon" aria-hidden="true">'+p.icon+'</span><h3>'+e(p.name)+'</h3><p>'+e(t(p.tag))+'</p><span class="mini-link">'+L("explore")+' ←</span></a>';
}
function courseCard(c){
 return '<a href="'+link("course/"+c.id)+'" class="surface coursecard"><span class="course-icon">'+c.icon+'</span><small class="chapter">'+e(t(c.tag))+' · '+c.lessons.length+' '+L("lessons")+'</small><h3>'+e(t(c.title))+'</h3><p>'+e(t(c.description))+'</p><span class="badge">'+L("learn")+' ←</span></a>';
}
function simCard(s){
 const p=products.find(x=>x.id===s.product);
 return '<div class="surface coursecard"><span class="course-icon" style="color:'+p.theme+'">◉</span><small class="chapter">'+e(p.name)+' · '+e(t(s.level))+'</small><h3>'+e(t(s.name))+'</h3><p>'+e(t(s.description))+'</p><a href="'+link("sim/"+s.id)+'" class="btn primary">'+L("playNow")+' ←</a></div>';
}
function home(){
 return '<main id="content"><div class="container"><section class="hero"><div><span class="eyebrow">CUSTOMER EXPERIENCE · FABE</span><h1>'+L("heroTitle")+'<br><span class="highlight">'+L("heroAccent")+'</span></h1><p>'+L("heroBody")+'</p><div class="actions"><a class="btn primary" href="#/academy">'+L("start")+' ←</a><a class="btn outline" href="#/simulator">'+L("try")+' ↗</a></div><div class="hero-stats"><div><strong>04</strong><small>'+L("hstat1")+'</small></div><div><strong>03</strong><small>'+L("hstat2")+'</small></div><div><strong>03</strong><small>'+L("hstat3")+'</small></div></div></div><div class="hero-graphic" aria-hidden="true"><div class="halo"></div><div class="device"><div class="device-screen"><div class="device-top"><span class="small">LIVE TRAINING / FABE</span><div class="device-score">85%</div><span class="small">CUSTOMER MATCH</span></div><div class="device-bottom">◎</div></div></div><div class="floatcard float1"><small>FEATURE → BENEFIT</small><strong>50MP · 3× Optical</strong></div><div class="floatcard float2"><small>THE SALES JOURNEY</small><strong>Learn. Practice. Grow.</strong></div></div></section></div>'+
 '<section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">'+L("why")+'</span><h2>LEARN → PRACTICE → SELL</h2></div></div><div class="grid3">'+
 '<div class="surface feature"><span class="number">01 · DISCOVER</span><span class="feature-icon">◎</span><h3>'+L("value1")+'</h3><p>'+L("value1d")+'</p></div>'+
 '<div class="surface feature"><span class="number">02 · CONNECT</span><span class="feature-icon">◇</span><h3>'+L("value2")+'</h3><p>'+L("value2d")+'</p></div>'+
 '<div class="surface feature"><span class="number">03 · VERIFY</span><span class="feature-icon">↗</span><h3>'+L("value3")+'</h3><p>'+L("value3d")+'</p></div></div></div></section>'+
 '<section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">PRODUCT STORYTELLING</span><h2>'+L("catalogTitle")+'</h2><p>'+L("catalogDesc")+'</p></div><a class="btn outline" href="#/products">'+L("all")+' ←</a></div><div class="grid3">'+products.map(productCard).join("")+'</div></div></section>'+
 '<section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">YOUR LEARNING PATH</span><h2>'+L("trackTitle")+'</h2><p>'+L("trackDesc")+'</p></div></div><div class="grid4">'+courses.map(courseCard).join("")+'</div></div></section>'+
 '<section class="section"><div class="container"><div class="surface" style="padding:37px;display:flex;gap:25px;align-items:center;justify-content:space-between;flex-wrap:wrap"><div><span class="eyebrow">REAL-WORLD PRACTICE</span><h2 style="font-size:31px;margin:12px 0">'+L("simTitle")+'</h2><p>'+L("simDesc")+'</p></div><a href="#/simulator" class="btn primary">'+L("try")+' ←</a></div></div></section></main>';
}
function catalog(){return '<main id="content">'+head("PRODUCT ACADEMY",L("catalogTitle"),L("catalogDesc"))+'<section class="section"><div class="container"><div class="grid3">'+products.map(productCard).join("")+'</div><div class="spacer"></div><div class="note">'+L("productsNote")+'</div></div></section></main>'}
function detail(id){
 const p=products.find(x=>x.id===id);
 if(!p)return missing();
 const fabenames=[L("feature"),L("advantage"),L("benefit"),L("evidence")];
 return '<main id="content">'+head(p.series,e(p.name),e(t(p.tag)))+'<section class="section"><div class="container"><div class="detail-grid"><div class="surface detail-panel"><span class="eyebrow">'+L("facts")+'</span><div style="font-size:100px;color:'+p.theme+';text-align:center;margin:23px 0">'+p.icon+'</div><div class="factlist">'+p.facts.map(x=>'<div class="fact"><small>'+e(t(x[1]))+'</small><strong>'+e(x[0])+'</strong></div>').join("")+'</div></div><div class="surface detail-panel"><span class="eyebrow">FABE METHOD</span><h2>'+L("fabe")+'</h2><p>'+L("fabeHint")+'</p><div class="spacer"></div>'+p.fabe.map((x,i)=>'<div class="faberow"><span class="fabeletter">'+["F","A","B","E"][i]+'</span><div><h3>'+fabenames[i]+'</h3><p>'+e(t(x))+'</p></div></div>').join("")+'<div class="spacer"></div><a href="#/simulator" class="btn primary">'+L("try")+' ←</a></div></div><div class="spacer"></div><div class="note">'+L("productsNote")+'</div></div></section></main>';
}
function academy(){return '<main id="content">'+head("LEARNING ACADEMY",L("trackTitle"),L("trackDesc"))+'<section class="section"><div class="container"><div class="grid4">'+courses.map(courseCard).join("")+'</div></div></section></main>'}
function lesson(id){
 const c=courses.find(x=>x.id===id);if(!c)return missing();
 const ix=Math.max(0,Math.min(state.lessonIndex,c.lessons.length-1)),item=c.lessons[ix];
 const completed=state.lessons.includes(c.id+":"+ix);
 return '<main id="content">'+head(t(c.tag),t(c.title),t(c.description))+'<section class="section"><div class="container"><div class="lesson-layout"><aside class="surface lesson-nav" aria-label="'+L("lessons")+'">'+c.lessons.map((x,j)=>'<button data-lesson="'+j+'" class="'+(ix===j?"selected":"")+'"><span>'+(j+1)+'.</span> '+e(t(x.title))+'</button>').join("")+'</aside><article class="surface lesson-body"><span class="eyebrow">LESSON '+(ix+1)+' / '+c.lessons.length+'</span><h2>'+e(t(item.title))+'</h2><p>'+e(t(item.body))+'</p><div class="divider"></div><p class="statusline">'+(completed?L("lessonDone"):L("publicInfo"))+'</p>'+(state.user&&state.profile?.is_employee&&state.profile?.is_active?'<div class="spacer"></div><button class="btn outline" id="complete" data-id="'+e(c.id+":"+ix)+'" '+(completed?"disabled":"")+'>'+L("markDone")+'</button>':'')+'<div class="lesson-navigator"><button class="btn outline" id="prevlesson" '+(!ix?"disabled":"")+'>'+L("previous")+'</button><button class="btn primary" id="nextlesson" '+(ix===c.lessons.length-1?"disabled":"")+'>'+L("next")+' ←</button></div></article></div></div></section></main>';
}
function simulator(){return '<main id="content">'+head("SALES LAB",L("simTitle"),L("simDesc"))+'<section class="section"><div class="container"><div class="grid3">'+simulations.map(simCard).join("")+'</div><div class="spacer"></div><div class="note">'+L("publicInfo")+'</div></div></section></main>'}
function createSim(id){const s=simulations.find(x=>x.id===id);if(!s)return null;return {scenario:s,id:s.start,history:[],score:0,selected:null,completed:false,notified:false}}
function simulationRun(id){
 const s=simulations.find(x=>x.id===id);if(!s)return missing();
 if(!state.sim||state.sim.scenario.id!==id)state.sim=createSim(id);
 const run=state.sim;
 const count=run.history.length;
 const total=Object.prototype.hasOwnProperty.call(s.steps,"recover")&&run.history.some(x=>x.step==="recover")?5:4;
 const progress=Math.min(100,Math.round(count/total*100));
 let panel="";
 if(run.completed){
 const feedback=run.score>=85?L("excellent"):(run.score>=60?L("growing"):L("practice"));
 panel='<div class="resultcenter"><span class="eyebrow">'+L("simComplete")+'</span><div class="scorehuge">'+run.score+'%</div><p>'+L("score")+' · '+L("outOf")+'</p><div class="spacer"></div><p>'+feedback+'</p><div class="spacer"></div><span class="pill">'+L("guestScore")+'</span><div class="actions" style="justify-content:center"><button class="btn primary" id="restart">'+L("replay")+'</button><a class="btn outline" href="#/simulator">'+L("allCases")+'</a></div></div>';
 }else{
 const item=s.steps[run.id];
 if(!item){return missing()}
 panel='<span class="eyebrow">'+e(t(stages[item.stage]||item.stage))+'</span><div class="progressbar" aria-label="'+progress+'%"><span style="width:'+progress+'%"></span></div><div class="dialogue"><div class="who"><span class="avatar">◉</span>'+L("customer")+'</div><p>'+e(t(item.client))+'</p></div><h2 style="font-size:21px;margin-bottom:15px">'+e(t(item.ask))+'</h2>';
 if(run.selected===null){
  panel+='<div class="choices">'+item.choices.map((ch,i)=>'<button class="choice" data-choice="'+i+'"><span class="bubble">'+(i+1)+'</span><span>'+e(t(ch.text))+'</span></button>').join("")+'</div>';
 }else{
  const ch=item.choices[run.selected];
  panel+='<div class="feedback '+(ch.pts>=20?"":"negative")+'"><strong>'+(ch.pts>=20?L("feedbackGood"):L("feedbackImprove"))+' · +'+ch.pts+'</strong><p>'+e(t(ch.feedback))+'</p><button class="btn primary" id="continuestep">'+L("continue")+' ←</button></div>';
 }
 }
 const p=products.find(x=>x.id===s.product);
 return '<main id="content">'+head("CUSTOMER EXPERIENCE SIMULATOR",e(t(s.name)),e(t(s.description)))+'<section class="section"><div class="container"><div class="simulation-layout"><div class="surface simulation-main">'+panel+'</div><aside class="surface simulation-side"><span class="eyebrow">LIVE COACHING</span><h3 style="font-size:20px;margin:16px 0">'+e(p.name)+'</h3><p class="small">'+L("fabeHint")+'</p><div class="sidebar-list"><div class="sidebar-item"><small>'+L("score")+'</small><strong>'+run.score+' / 100</strong></div><div class="sidebar-item"><small>'+L("completion")+'</small><strong>'+progress+'%</strong></div><div class="sidebar-item"><small>F → A → B → E</small><strong>Customer-led selling</strong></div></div><div class="spacer"></div><a class="btn outline" href="'+link("products/"+p.id)+'">'+L("view")+'</a></aside></div></div></section></main>';
}
function portal(){
 const approved=state.user&&state.profile?.is_employee&&state.profile?.is_active;
 const canAdmin=approved&&state.profile.role==="admin";
 const content= !configured?'<div class="note">'+L("noBackend")+'</div>':
 !state.loaded?'<p>'+L("wait")+'</p>':
 !state.user?'<p>'+L("staffOnly")+'</p><div class="spacer"></div><a class="btn primary" href="#/login">'+L("goLogin")+'</a>':
 !approved?'<div class="note">'+L("noPermission")+'</div>':
 '<div class="kpi-grid"><div class="kpi"><small>'+L("attempts")+'</small><strong>'+state.attempts.length+'</strong></div><div class="kpi"><small>'+L("myCourses")+'</small><strong>'+state.lessons.length+'/'+courses.reduce((n,c)=>n+c.lessons.length,0)+'</strong></div><div class="kpi"><small>'+L("score")+'</small><strong>'+(state.attempts.length?Math.round(state.attempts.reduce((n,x)=>n+100*x.score/x.max_score,0)/state.attempts.length)+"%":"—")+'</strong></div></div><div class="spacer"></div><h2>'+L("myResults")+'</h2>'+(state.attempts.length?'<div class="table-wrap"><table class="table"><thead><tr><th>'+L("scenario")+'</th><th>'+L("score")+'</th><th>'+L("date")+'</th></tr></thead><tbody>'+state.attempts.map(x=>'<tr><td>'+e(t(simulations.find(s=>s.id===x.scenario_id)?.name||x.scenario_id))+'</td><td>'+Math.round(100*x.score/x.max_score)+'%</td><td>'+e(new Date(x.created_at).toLocaleDateString(state.lang==="ar"?"ar-SA":"en-GB"))+'</td></tr>').join("")+'</tbody></table></div>':'<p>'+L("noResults")+'</p>')+'<div class="spacer"></div>'+(canAdmin?'<a class="btn outline" href="#/admin">'+L("admin")+'</a>':'')+'<button class="btn mutedbtn" id="signout">'+L("signout")+'</button><div class="spacer"></div><p class="caution">'+L("scoreIntegrity")+'</p>';
 return '<main id="content">'+head("EMPLOYEE SPACE",L("myPage"),L("authNotice"))+'<section class="section"><div class="container"><div class="surface portalbox">'+content+'</div></div></section></main>';
}
function signIn(){
 let content;
 if(!configured)content='<div class="note">'+L("noBackend")+'</div>';
 else if(state.user)content='<p>'+e(state.profile?.display_name||state.user.email)+'</p><div class="spacer"></div><a class="btn primary" href="#/dashboard">'+L("myPage")+'</a> <button class="btn outline" id="signout">'+L("signout")+'</button>';
 else content='<form id="loginform"><label for="email">'+L("email")+'</label><input class="field" id="email" name="email" type="email" autocomplete="email" required placeholder="name@company.com"><button class="btn primary" type="submit">'+L("sendLink")+'</button></form>';
 return '<main id="content">'+head("SECURE PORTAL",L("login"),L("authNotice"))+'<section class="section"><div class="container"><div class="portalgrid"><div class="surface portalbox"><h2>'+L("login")+'</h2>'+content+(state.notice?'<div class="spacer"></div><div class="note" role="status">'+e(state.notice)+'</div>':'')+'</div><div class="surface portalbox"><span class="eyebrow">STAFF EXPERIENCE</span><h2 style="margin:20px 0">'+L("portal")+'</h2><p>'+L("publicInfo")+'</p><div class="spacer"></div><div class="note">'+L("privacyText")+'</div></div></div></div></section></main>';
}
function admin(){
 const approved=state.user&&state.profile?.is_active&&state.profile?.is_employee&&state.profile?.role==="admin";
 if(!approved)return '<main id="content">'+head("RESTRICTED",L("admin"),L("noPermission"))+'<section class="section"><div class="container"><a class="btn primary" href="#/login">'+L("goLogin")+'</a></div></section></main>';
 const stats=state.admin;
 return '<main id="content">'+head("OPERATIONS",L("adminTitle"),L("scoreIntegrity"))+'<section class="section"><div class="container"><div class="kpi-grid"><div class="kpi"><small>'+L("profiles")+'</small><strong>'+(stats?.profiles.length??"—")+'</strong></div><div class="kpi"><small>'+L("attempts")+'</small><strong>'+(stats?.attempts.length??"—")+'</strong></div><div class="kpi"><small>'+L("approved")+'</small><strong>'+(stats?.profiles.filter(p=>p.is_employee&&p.is_active).length??"—")+'</strong></div></div><div class="spacer"></div><div class="surface portalbox"><h2>'+L("profiles")+'</h2><div class="table-wrap"><table class="table"><thead><tr><th>'+L("profiles")+'</th><th>'+L("role")+'</th><th>'+L("status")+'</th></tr></thead><tbody>'+(stats?.profiles||[]).map(p=>'<tr><td>'+e(p.display_name||p.id.slice(0,8))+'</td><td>'+e(p.role)+'</td><td>'+(p.is_employee&&p.is_active?L("approved"):L("pending"))+'</td></tr>').join("")+'</tbody></table></div></div></div></section></main>';
}
function missing(){return '<main id="content"><div class="container empty"><h1>404</h1><p>Page not found</p><div class="spacer"></div><a href="#/" class="btn primary">'+L("home")+'</a></div></main>'}
function render(){
 const parts=urlParts(),page=parts[0]||"";
 document.documentElement.lang=state.lang;document.documentElement.dir=state.lang==="ar"?"rtl":"ltr";
 document.title=L("brand")+" · Sales Training";
 let content="";
 if(page==="")content=home();
 else if(page==="products")content=parts[1]?detail(parts[1]):catalog();
 else if(page==="academy")content=academy();
 else if(page==="course")content=lesson(parts[1]);
 else if(page==="simulator")content=simulator();
 else if(page==="sim")content=simulationRun(parts[1]);
 else if(page==="login")content=signIn();
 else if(page==="dashboard")content=portal();
 else if(page==="admin")content=admin();
 else content=missing();
 $("#app").innerHTML='<button type="button" id="skipcontent" class="skip">Skip to content</button>'+header()+content+footer();
}
async function loadIdentity(){
 if(!configured)return;
 try{
 const auth=await identity();state.user=auth.user;state.profile=auth.profile;state.loaded=true;state.authError="";
 if(auth.user&&auth.profile?.is_employee&&auth.profile?.is_active){
 state.attempts=await myAttempts();state.lessons=(await myCompletedLessons()).map(x=>x.lesson_id);
 if(auth.profile.role==="admin")state.admin=await adminStats();
 }
 }catch(err){state.authError=String(err.message||err);state.loaded=true;state.notice=state.authError;}
 render();
}
async function finishRun(run){
 if(!run||run.notified)return;
 run.notified=true;
 if(state.user&&state.profile?.is_employee&&state.profile?.is_active){
 try{await saveAttempt({scenarioId:run.scenario.id,score:run.score,maxScore:100,answers:run.history});state.attempts=await myAttempts();}catch(err){state.notice=String(err.message||err);console.warn("Attempt not saved:",err)}
 }
}
document.addEventListener("click",async event=>{
 const el=event.target;
 if(el.closest("#skipcontent")){const main=$("#content");if(main){main.setAttribute("tabindex","-1");main.focus()}return;}
 if(el.closest("#language")){state.lang=state.lang==="ar"?"en":"ar";try{localStorage.setItem("tsa-language",state.lang)}catch{}render();return;}
 if(el.closest("#mobilemenu")){state.menu=!state.menu;render();return;}
 const lessonBtn=el.closest("[data-lesson]");
 if(lessonBtn){state.lessonIndex=Number(lessonBtn.dataset.lesson);render();return;}
 if(el.closest("#prevlesson")){state.lessonIndex=Math.max(0,state.lessonIndex-1);render();return;}
 if(el.closest("#nextlesson")){state.lessonIndex++;render();return;}
 const ch=el.closest("[data-choice]");
 if(ch&&state.sim&&state.sim.selected===null&&!state.sim.completed){
 const step=state.sim.scenario.steps[state.sim.id];const idx=Number(ch.dataset.choice);
 if(!step.choices[idx])return;
 state.sim.selected=idx;render();return;
 }
 if(el.closest("#continuestep")&&state.sim){
 const run=state.sim,step=run.scenario.steps[run.id],choice=step.choices[run.selected];
 if(!choice)return;
 run.score+=choice.pts;run.history.push({step:run.id,choice:run.selected,points:choice.pts});
 run.selected=null;
 if(choice.next===null){run.completed=true;render();await finishRun(run);return}
 run.id=choice.next;render();return;
 }
 if(el.closest("#restart")&&state.sim){state.sim=createSim(state.sim.scenario.id);render();return;}
 if(el.closest("#signout")){try{await logout();state.user=null;state.profile=null;state.attempts=[];state.lessons=[];state.admin=null;state.notice="";location.hash="#/login";render();}catch(err){state.notice=String(err.message||err);render()}return;}
 if(el.closest("#complete")){
 const id=el.closest("#complete").dataset.id;
 try{await markLesson(id);state.lessons.push(id);render();}catch(err){state.notice=String(err.message||err);render()}return;
 }
});
document.addEventListener("submit",async ev=>{
 if(ev.target.id!=="loginform")return;
 ev.preventDefault();
 const email=ev.target.elements.email.value.trim();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return;
 const b=ev.target.querySelector('button[type="submit"]');b.disabled=true;
 try{await login(email);state.notice=state.lang==="ar"?"إذا كان الحساب معتمدًا، سيصلك رابط الدخول.":"If your account is approved, a sign-in link will be sent.";}
 catch(err){state.notice=String(err.message||err)}
 render();
});
window.addEventListener("hashchange",()=>{state.menu=false;state.lessonIndex=0;state.notice="";const parts=urlParts();if(parts[0]!=="sim"||state.sim?.scenario.id!==parts[1])state.sim=null;render();window.scrollTo(0,0);if(parts[0]==="dashboard"||parts[0]==="admin")loadIdentity()});
for(const s of simulations)if(!validateScenario(s))throw Error("Invalid scenario "+s.id);
render();loadIdentity();
