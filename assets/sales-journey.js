
const B=(ar,en)=>({ar,en});
const item=(ar,en)=>B(ar,en);
export const journeyMetrics={
 communication:B("التواصل والإصغاء","Communication & listening"),
 experience:B("تجربة العميل","Customer experience"),
 technical:B("المعرفة التقنية وتقديم القيمة","Technical expertise & value"),
 selling:B("مهارة البيع","Selling skills")
};
export const journeyWeights={communication:30,experience:30,technical:20,selling:20};
const personalities=[
 {id:"camera",name:B("ريم · شغوفة بالتصوير","Reem · Photography enthusiast"),
 subtitle:B("مناسبة عائلية · ميزانية محددة · تردد في اختيار الكاميرا","Family events · Set budget · Camera uncertainty"),
 intent:B("تصوّر أطفالها ومناسباتها وتريد تقريبًا فعّالًا دون مبالغة في الوعود.","She photographs family events and wants real zoom value without exaggerated claims."),
 avatar:"R",device:"CAMON 50 Ultra",model:"camon-50-ultra",image:"camon-50-ultra.webp",accent:"#7357D8",
 welcome:B("السلام عليكم، ممكن أشوف الجوالات؟ أبي كاميرا زينة وما أعرف من وين أبدأ.","Hi, can I look around? I want a good camera but don't know where to start."),
 listen:B("أصور مناسبات العائلة وبعض الأطفال، وأحيانًا أكون بعيدة عنهم.","I shoot family events and moving children, sometimes from a distance."),
 clarify:B("أكثر شيء يهمني أن الصورة تطلع كويسة، وما أبي أدفع على أشياء ما أستخدمها.","I care about good photos and don't want to pay for things I won't use."),
 match:B("طيب، أي جهاز تشوفه مناسب لي؟","Which model would suit my needs?"),
 fabe:B("وش يفرق التقريب عن باقي الكاميرات؟","How is this zoom different?"),
 demo:B("ممكن أشوف بنفسّي الفرق؟","Can I see the actual difference?"),
 objection:B("سمعت 100×؛ هل هذا كله تقريب بصري؟","I've heard about 100×. Is all of that optical?"),
 close:B("النتيجة عجبتني، لكن أبي أتأكد أنه مناسب لميزانيتي.","I like the results, but I need to be certain it fits my budget."),
 after:B("ولو احتجت مساعدة أو صار عندي سؤال بعد الشراء؟","What if I need help or have questions after purchase?"),
 ask:B("تفضلّي خذي وقتك، وش أكثر شيء ودك يتحسن بتصوير جوالك الحالي؟","Take your time. What would you most like to improve about your current phone's camera?"),
 confirm:B("إذا فهمتك: تصوير مناسبات وأطفال، مع تقريب مفيد وميزانية مناسبة، صحيح؟","Let me confirm: family photos, practical zoom and good budget fit. Is that right?"),
 explain:B("CAMON 50 Ultra فيه تقريب بصري 3× بدقة 50MP؛ فائدته تقريب الأشخاص من مسافة مناسبة، ونقدر نجربه قبل القرار.","CAMON 50 Ultra has a 50MP 3× optical telephoto: it helps frame distant people, and we can test it first."),
 proof:B("نصور نفس المشهد على 1× ثم 3× ونشوف التفاصيل سوا.","Let's take photos at 1× and 3× of the same scene and compare."),
 objectionGood:B("الـ3× بصري، والـ100× رقمي. خلينا نجرب التقريب الواقعي ونشوف الجودة اللي تهمك.","3× is optical; 100× is digital. Let's test actual results at the zoom you need."),
 matchBad:B("POVA 8 Pro للألعاب؛ خلينا نترك الكاميرا ونركز عليه.","POVA 8 Pro is for gaming. Let's ignore the camera and focus on it."),
 matchMid:B("POVA Curve 2 ببطاريته الكبيرة، يمكن يكون مناسبًا إذا أهم شيء مدة التشغيل.","POVA Curve 2 has a large battery; it could suit you if endurance matters most."),
 explainBad:B("كل كاميرا في الهاتف ممتازة في أي وضع، حتى بأقصى تقريب.","Every camera is perfect in every condition, even at maximum zoom."),
 explainMid:B("الكاميرا 50MP فقط، وهذا يكفي لاختيار الجوال.","The camera is 50MP, and that alone is enough to choose it."),
 proofBad:B("ما يحتاج تجربة، أنا أضمن لك الصورة مثالية.","No demo needed; I guarantee perfect photos."),
 proofMid:B("نفتح صفحة المواصفات ونقرأ الدقة فقط.","Let's read the camera specs instead."),
 objectionBad:B("أكيد 100× كله بصري وكل الصور تطلع بنفس الجودة.","Sure, all 100× is optical and image quality never changes."),
 objectionMid:B("الرقم مهم لكن خلينا ما ندخل في الفرق الآن.","The zoom number is important; let's not get into the difference."),
 closingGood:B("نجرب الصورة مرة ثانية، ونتأكد من السعر الحالي والبدائل قبل تختارين براحتك.","Let's retry the shot, verify the current price and compare alternatives before you decide."),
 closingBad:B("إذا ما شريتيه الآن بتضيع عليك فرصة العمر.","If you don't buy now, you'll lose the deal of a lifetime."),
 closingMid:B("هذا جهاز قوي، فالأفضل تشتريه.","It's a powerful phone, so buying it is a good idea.")
 },
 {id:"gaming",name:B("سلمان · لاعب تنافسي","Salman · Competitive gamer"),
 subtitle:B("ألعاب تنافسية · حرارة الجهاز · معدل الإطارات","Competitive gaming · Thermal performance · Frame rate"),
 intent:B("يقضي وقتًا طويلًا في الألعاب ويحتاج سلاسة فعلية مع ضبط توقعات الأداء.","He plays long sessions and wants actual smooth gameplay with realistic expectations."),
 avatar:"S",device:"POVA 8 Pro 5G",model:"pova-8-pro",image:"pova-8-series.webp",accent:"#34816C",
 welcome:B("أدور جهاز ألعاب، بس ما أبي أحد يضيع وقتي بمواصفات كثيرة.","I'm shopping for a gaming phone, but don't want a long spec pitch."),
 listen:B("ألعب PUBG وألعاب منافسة ثانية، والجوال القديم يسخن ويقطّع.","I play PUBG and other competitive games; my old phone heats up and stutters."),
 clarify:B("أحتاج استجابة سريعة، وتبريد كويس، وبطارية تتحمل جلساتي.","I need responsive gaming, good cooling and a battery for long sessions."),
 match:B("وش الجهاز اللي فعلاً يناسب استخدامي؟","Which phone actually matches my use?"),
 fabe:B("وش فائدة معالج الألعاب والشريحة الرسومية المساندة؟","What is the benefit of the chipset and graphics support?"),
 demo:B("أقدر أجرب اللعبة بدل الكلام؟","Can I test the game instead of just hearing specs?"),
 objection:B("تضمن لي 144 FPS بكل الألعاب وكل الوقت؟","Can you guarantee 144 FPS in every game, all the time?"),
 close:B("إذا جربته وعجبني الأداء، وش الخطوة التالية؟","If I like the test, what is next?"),
 after:B("إذا لاحظت إعدادات لعبة مختلفة بعد الشراء، كيف أتعامل؟","What if game settings behave differently after purchase?"),
 ask:B("أكيد. أي لعبة أهم عندك، وهل الأولوية للسلاسة أو الرسوم؟","Absolutely. Which game matters most, and do you prioritize smoothness or graphics?"),
 confirm:B("أفهم أنك تبي سلاسة في لعبتك مع تبريد أفضل وبطارية كافية، صحيح؟","You want smoother gameplay, better cooling and dependable battery life, right?"),
 explain:B("POVA 8 Pro يجمع Dimensity 7400 Ultimate مع P1 وشاشة 144Hz؛ نختبر لعبتك بإعداداتها المتوافقة.","POVA 8 Pro combines Dimensity 7400 Ultimate, P1 and 144Hz display; let's test your actual game's supported settings."),
 proof:B("نشغّل اللعبة المتوافقة ونراجع الإعدادات ومعدل الإطارات الفعلي خلال التجربة.","Let's run a compatible game and inspect real settings and frame-rate behavior."),
 objectionGood:B("144 FPS يعتمد على دعم اللعبة والإعدادات والظروف، ولا يمكن ضمانه في كل الحالات.","144 FPS depends on game support, settings and conditions; it cannot be guaranteed universally."),
 matchBad:B("CAMON 50 Ultra للتصوير؛ أهم شيء نعرض كاميرته.","CAMON 50 Ultra has great cameras; let's focus on its photo features."),
 matchMid:B("POVA Curve 2 قد يفيد لو البطارية أهم من أداء الألعاب.","POVA Curve 2 could suit you if battery life is your highest priority."),
 explainBad:B("معالج الجهاز يضمن أعلى FPS في جميع الألعاب مهما كانت الظروف.","This processor guarantees maximum FPS in every game under all conditions."),
 explainMid:B("فيه معالج حديث، فمعناه أكيد الألعاب كلها سريعة.","It has a modern processor, which means every game must be fast."),
 proofBad:B("ما يحتاج نجرب، مجرد رقم 144Hz يثبت الأداء.","No need to test; 144Hz alone proves every gaming claim."),
 proofMid:B("نمرّر في القائمة بسرعة ونعتبر ذلك دليلًا على FPS داخل الألعاب.","Let's scroll the menu quickly and call that proof of gaming FPS."),
 objectionBad:B("نعم، مضمون 144 FPS دائمًا وفي أي لعبة.","Yes, 144 FPS is guaranteed at all times in every game."),
 objectionMid:B("غالبًا يشتغل، لكن ما أعرف شروط الألعاب المختلفة.","It probably works, but I don't know individual game requirements."),
 closingGood:B("نتأكد من توفر النسخة والشاحن والضمان، وإذا مقتنع بالتجربة نكمل.","Let's confirm availability, included accessories and warranty, then proceed if you're satisfied."),
 closingBad:B("خذ الجهاز الآن بدون اختبار إضافي وإلا بتخسر العرض.","Buy it right now without further checks or you'll miss out."),
 closingMid:B("لعبنا عليه شوي، فخلنا نكمل البيع مباشرة.","We played a little, so let's proceed directly.")
 },
 {id:"battery",name:B("ناصر · موظف ميداني","Nasser · Field professional"),
 subtitle:B("دوام طويل · خرائط ومكالمات · شحن أقل","Long shifts · Navigation and calls · Less charging"),
 intent:B("يعمل خارج المكتب طوال اليوم ويعتمد على البطارية والاتصال أثناء العمل.","He works away from a desk and relies on battery and connectivity throughout the day."),
 avatar:"N",device:"POVA Curve 2 5G",model:"pova-curve-2",image:"pova-curve-2.webp",accent:"#697E9E",
 welcome:B("أحتاج جوال للعمل، أغلب اليوم أكون برا وما عندي وقت كثير.","I need a work phone. I'm out most of the day and short on time."),
 listen:B("الخرائط شغالة معظم الوقت، ومعها مكالمات وبيانات.","I run maps most of the day along with calls and mobile data."),
 clarify:B("أهم شيء ما أرجع للشاحن كل شوي، وأحيانًا أحتاج شريحتين.","I want less charging and sometimes need two phone numbers."),
 match:B("وش الجهاز الأقرب لطريقة عملي؟","Which phone fits my work routine?"),
 fabe:B("بطارية كبيرة على الورق، لكن وش تستفيد منها عمليًا؟","A big battery on paper—but how does that help me?"),
 demo:B("تقدر توريني المواصفات من الجهاز نفسه؟","Can you show me the relevant device settings?"),
 objection:B("هل 8000mAh تضمن لي يومين مهما كان استخدامي؟","Does 8000mAh guarantee two days no matter how I use it?"),
 close:B("لو كان مناسبًا، أبي أعرف السعر والتوفر بسرعة.","If it fits, I want the price and stock checked quickly."),
 after:B("هل أقدر أرجع لك لو احتجت نقل بيانات أو دعمًا بعد الشراء؟","Can I get help with data transfer or support after buying?"),
 ask:B("أبشر. كم ساعة تستخدم الخرائط والمكالمات، وكم مرة تشحن جوالك حاليًا؟","Sure. How many hours of maps and calls, and how often do you charge now?"),
 confirm:B("احتياجك بطارية طويلة للملاحة والمكالمات، مع مراجعة دعم الشريحة الثانية، صحيح؟","Your priorities are endurance for navigation and calls, plus checking SIM compatibility, correct?"),
 explain:B("POVA Curve 2 بطارية 8000mAh؛ سعتها قد تقلل تكرار الشحن حسب الشبكة وطريقة استخدامك.","POVA Curve 2 has an 8000mAh battery which may reduce charging frequency depending on real usage."),
 proof:B("نفتح إعدادات البطارية والشرائح على الجهاز ونراجع التوافق مع مشغّلك.","Let's open battery and SIM settings and check your carrier compatibility."),
 objectionGood:B("المدة تختلف حسب الخرائط والشبكة والإضاءة؛ السعة 8000mAh لا تعني مدة مضمونة للجميع.","Endurance varies with maps, network and brightness; 8000mAh is capacity, not a universal time guarantee."),
 matchBad:B("CAMON 50 Ultra أفضل لك؛ خلينا نركز على التقريب أولًا.","CAMON 50 Ultra is better; let's start with the camera zoom."),
 matchMid:B("POVA 8 Pro للألعاب؛ فيه بطارية جيدة لكن ليس خيارًا أولًا دون مراجعة استخدامك.","POVA 8 Pro is a gaming phone with a good battery, but let's verify priorities first."),
 explainBad:B("8000mAh تعني يومين مضمونين مهما استخدمت الجهاز.","8000mAh guarantees two days regardless of use."),
 explainMid:B("السعة 8000mAh وخلاص، ما أقدر أوضح أثر استخدام الخرائط.","The capacity is 8000mAh; I can't explain how maps affect it."),
 proofBad:B("ما يحتاج نفتح الإعدادات أو نتحقق من الشريحة.","We don't need settings or SIM compatibility checks."),
 proofMid:B("نوريك صورة البطارية على العلبة دون تجربة الإعدادات.","I'll show the battery number on the box without checking settings."),
 objectionBad:B("نعم، يومين مضمونين على كل الشبكات والتطبيقات.","Yes, two days guaranteed across all networks and apps."),
 objectionMid:B("بشكل عام البطارية كبيرة، بس ما أعرف كيف يتأثر الاستخدام.","It's a large battery, but I can't say how use affects it."),
 closingGood:B("نتأكد من توفر النسخة والسعر ودعم شريحتك، ونكمل فقط إذا تحققت احتياجاتك.","Let's verify stock, price and SIM support, then proceed if it truly fits."),
 closingBad:B("خذ الجهاز الآن قبل ما تسأل عن التفاصيل.","Buy it right now without more questions."),
 closingMid:B("السعة كبيرة، فأنصحك تشتريه بدون ما نراجع التفاصيل.","The battery is large, so you should buy without checking the details.")
 }
];
const phase=[
 {id:"greeting",title:B("الترحيب وبناء الألفة","Welcome & rapport"),dimension:"communication",max:50,
  prompt:p=>p.welcome,
  answers:p=>[
   item("أهلًا وسهلًا. خذ وقتك؛ كيف أقدر أساعدك اليوم؟","Welcome. Take your time; how can I help today?"),
   item("هذا أحدث جهاز عندنا ولازم تجربّه الآن.","This is our newest device; you must try it now."),
   item("وش ميزانيتك؟ نخلص بسرعة.","What's your budget? Let's make it quick.")
  ],
  coach:B("الترحيب يفتح المجال للحديث دون ضغط أو افتراض.","A welcome invites conversation without pressure or assumptions.")},
 {id:"listening",title:B("الاستماع الفعّال","Active listening"),dimension:"communication",max:50,
  prompt:p=>p.listen,
  answers:p=>[p.ask,item("خلني أشرح مواصفات الأجهزة قبل ما تكمل كلامك.","Let me explain the specs before you finish."),item("تمام، عندنا خيارات كثيرة.","Okay, we have many options.")],
  coach:B("استكشف الاستخدام الفعلي بسؤال محدد واترك مساحة للرد.","Discover real use with a relevant follow-up question.")},
 {id:"needs",title:B("تأكيد الأولويات","Confirm priorities"),dimension:"experience",max:40,
  prompt:p=>p.clarify,
  answers:p=>[p.confirm,item("أعرف بالضبط وش تبي، ما نحتاج نراجع أولوياتك.","I know exactly what you need; no need to confirm."),item("خلنا نشوف الأجهزة كلها ونقرر بعدين.","Let's look at every phone and decide later.")],
  coach:B("لخّص ما سمعت واسمح للعميل بتصحيح فهمك.","Summarize the customer's priorities and invite corrections.")},
 {id:"match",title:B("اختيار المنتج المناسب","Match the product"),dimension:"technical",max:50,
  prompt:p=>p.match,
  answers:p=>[item("أرشّح "+p.device+" لأنه يناسب أولوياتك، ونراجع المزايا المؤثرة على قرارك.","I'd suggest "+p.device+" based on your priorities; let's verify the relevant features."),p.matchBad,p.matchMid],
  coach:B("اختيار الهاتف الصحيح يعتمد على حاجة العميل، لا على الموديل الأعلى سعرًا.","Recommend based on needs, not on the most expensive model.")},
 {id:"value",title:B("تقديم الفائدة باستخدام FABE","Communicate value with FABE"),dimension:"technical",max:50,
  prompt:p=>p.fabe,
  answers:p=>[p.explain,p.explainBad,p.explainMid],
  coach:B("اربط الميزة التقنية بفائدة ملموسة لهذا العميل، واذكر طريقة إثباتها.","Connect the technical feature to this customer's benefit and a way to prove it.")},
 {id:"demo",title:B("إشراك العميل في التجربة","Hands-on demonstration"),dimension:"experience",max:30,
  prompt:p=>p.demo,
  answers:p=>[p.proof,p.proofBad,p.proofMid],
  coach:B("الدليل العملي أفضل من تكرار المواصفات. اجعل العميل يجرب بنفسه.","Hands-on proof builds trust more than repeated specifications.")},
 {id:"objection",title:B("معالجة الاعتراض","Handle the objection"),dimension:"selling",max:50,
  prompt:p=>p.objection,
  answers:p=>[p.objectionGood,p.objectionBad,p.objectionMid],
  coach:B("أجب عن الاعتراض بدقة دون مبالغة أو ضمان نتائج غير مؤكدة.","Address the concern accurately without exaggerated promises.")},
 {id:"closing",title:B("إغلاق البيع باحتراف","Respectful closing"),dimension:"selling",max:50,
  prompt:p=>p.close,
  answers:p=>[p.closingGood,p.closingBad,p.closingMid],
  coach:B("تحقق من رضا العميل واطلب الإذن بالخطوة التالية دون ضغط.","Check satisfaction and ask permission before proceeding.")},
 {id:"aftercare",title:B("التسليم والمتابعة","Handover & after-sales"),dimension:"experience",max:30,
  prompt:p=>p.after,
  answers:p=>[
   item("أوضح لك الفاتورة وشروط الضمان والدعم ونقل البيانات حسب خدمة المتجر.","I'll explain the receipt, warranty terms, support and available data-transfer services."),
   item("بعد البيع أي مشكلة تعتبر خارج مسؤوليتنا.","After the sale, all problems are your responsibility."),
   item("احتفظ بالفاتورة فقط، وراجعنا إذا صار شيء.","Just keep the receipt and come back if anything happens.")
  ],
  coach:B("آخر انطباع يبني علاقة طويلة؛ وضّح الدعم والضمان بصورة دقيقة.","The final impression matters. Explain service, support and warranty accurately.")}
];
export const journeyCases=personalities.map((p,idx)=>({
 id:p.id,name:p.name,subtitle:p.subtitle,intent:p.intent,avatar:p.avatar,device:p.device,model:p.model,
 image:p.image,accent:p.accent,
 steps:phase.map((st,stepIndex)=>{
  const options=st.answers(p).map((text,quality)=>({
   text,quality:quality===0?2:quality===2?1:0,
   // Good choices increase trust; partial answers keep rapport, poor choices erode it.
   trust:quality===0?12:quality===2?2:-16,
   earned:Math.round(st.max*(quality===0?1:quality===2?.45:0)),
   reaction:quality===0?B("هذا بالضبط اللي أحتاجه، كمل.","That's exactly what I needed. Please continue."):
    quality===2?B("فهمت بعض كلامك، لكن أبي توضيحًا أكثر.","I follow some of that, but I need more detail."):
    B("ما أحس أنك فهمت اللي أدور عليه.","I don't feel you've understood what I need."),
   feedback:st.coach
  }));
  const shift=(idx+stepIndex)%options.length;
  const shuffled=options.map((_,j)=>options[(j-shift+options.length)%options.length]);
  return {id:st.id,title:st.title,dimension:st.dimension,max:st.max,prompt:st.prompt(p),options:shuffled,
    coach:st.coach};
 })
}));
export const journeyPhaseCount=phase.length;
export function journeySummary(answers){
 const available={communication:100,experience:100,technical:100,selling:100};
 const points={communication:0,experience:0,technical:0,selling:0};
 let trust=55;
 for(const answer of answers){
  if(!(answer?.dimension in points))continue;
  points[answer.dimension]+=answer.earned;
  trust=Math.max(0,Math.min(100,trust+answer.trust));
 }
 const scores=Object.fromEntries(Object.keys(points).map(key=>[key,Math.min(100,Math.round(points[key]/available[key]*100))]));
 const total=Math.round(Object.entries(journeyWeights).reduce((sum,[key,w])=>sum+scores[key]*w/100,0));
 return {total,scores,trust,level:total>=90?"excellent":total>=75?"proficient":total>=60?"developing":"needsWork"};
}
export function validateJourney(){
 if(journeyCases.length!==3||journeyCases.some(c=>c.steps.length!==9))return false;
 const groups=Object.keys(journeyWeights);
 for(const c of journeyCases){
  if(new Set(c.steps.map(s=>s.id)).size!==9)return false;
  for(const step of c.steps){
   if(!groups.includes(step.dimension)||step.options.length!==3)return false;
   if(step.options.filter(o=>o.quality===2).length!==1)return false;
   if(step.options.some(o=>!o.text.ar||!o.text.en))return false;
  }
 }
 for(let stage=0;stage<9;stage++){
  const positions=journeyCases.map(c=>c.steps[stage].options.findIndex(o=>o.quality===2));
  if(new Set(positions).size!==3)return false;
 }
 const perfect=journeySummary(journeyCases[0].steps.map(s=>({...s.options.find(o=>o.quality===2),dimension:s.dimension})));
 return perfect.total===100;
}
