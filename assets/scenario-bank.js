
const b=(ar,en)=>({ar,en});
// Balanced answer positions are enforced in the scenario factory.
// Each case has a distinct buyer situation and a product-specific proof point.
const tech={
 camon:[
  b("التقريب البصري 3× بدقة 50MP","50MP 3× optical telephoto"),
  b("الكاميرا الرئيسية Sony LYT-700C مع OIS","Sony LYT-700C main camera with OIS"),
  b("كاميرا أمامية 50MP مع تركيز تلقائي","50MP autofocus front camera"),
  b("تصوير بورتريه ببعد بؤري 24–70mm","24–70mm portrait focal-length options"),
  b("شاشة AMOLED منحنية 1.5K بتردد 144Hz","1.5K curved 144Hz AMOLED display"),
  b("حماية IP68/IP69/IP69K وفق مواصفات الطراز","IP68/IP69/IP69K resistance as specified for the model"),
  b("تقريب رقمي يصل إلى 100× وليس بصريًا 100×","Digital zoom up to 100×, not 100× optical"),
  b("ميزة Aqua Mode للتصوير في الظروف المناسبة","Aqua Mode for compatible water-related photography"),
  b("ميزة AI Photo-to-Video","AI Photo-to-Video feature"),
  b("مساعد Ella وميزة One-Tap Flash Memo","Ella assistant and One-Tap Flash Memo")
 ],
 pova8:[
  b("معالج Dimensity 7400 Ultimate 5G","Dimensity 7400 Ultimate 5G chipset"),
  b("شريحة TECNO P1 الرسومية المساندة","TECNO P1 auxiliary graphics chip"),
  b("شاشة AMOLED 1.5K بتردد 144Hz","1.5K 144Hz AMOLED display"),
  b("نظام التبريد Ice Shield 3.0 متعدد الطبقات","Multi-layer Ice Shield 3.0 cooling"),
  b("بطارية 6500mAh","6500mAh battery"),
  b("شحن سريع بقدرة 45W","45W wired fast charging"),
  b("مقاومة IP68/IP69K في الطراز المعتمد","IP68/IP69K protection on the specified variant"),
  b("شاشة Matrix Alive الخلفية","Rear Matrix Alive display"),
  b("نظام HiOS 16","HiOS 16 software"),
  b("دعم معدلات إطارات مرتفعة في الألعاب المتوافقة","High frame-rate support in compatible games")
 ],
 curve:[
  b("بطارية 8000mAh","8000mAh battery"),
  b("شحن 45W","45W charging"),
  b("شحن عكسي بقدرة 10W","10W reverse charging"),
  b("ميزة Bypass Charging","Bypass Charging"),
  b("شاشة AMOLED منحنية 1.5K بتردد 144Hz","1.5K curved 144Hz AMOLED display"),
  b("حماية زجاج Gorilla Glass 7i وفق النسخة","Gorilla Glass 7i protection on the confirmed SKU"),
  b("دعم eSIM وفق نسخة السوق","eSIM support for eligible market variants"),
  b("مساحة 256GB في النسخة التدريبية","256GB storage in the training variant"),
  b("ميزات Ella وأدوات الذكاء الاصطناعي المدمجة","Ella and built-in smart assistance tools"),
  b("ميزة مقاومة السقوط المعلنة ضمن شروط الاختبار","Drop-resistance claim under its stated test conditions")
 ]
};
const proof={
 camon:[
  b("التقط صورتين حقيقيتين 1× و3× واطلب مقارنة التفاصيل","Take real 1× and 3× photos and compare"),
  b("جرّب لقطة ثابتة مع التركيز على تأثير التثبيت في التجربة الواقعية","Test a real still shot to discuss stabilization"),
  b("جرب سيلفي مع التركيز التلقائي مع موافقة العميل","Demonstrate autofocus selfie with permission"),
  b("صور بورتريه بإعدادين وقارن الإطار والخلفية","Shoot two portrait focal-length settings and compare framing"),
  b("اعرض 144Hz في إعدادات الشاشة ثم جرّب التمرير","Show refresh settings and scroll through content"),
  b("اعرض تصنيف المقاومة وشرح نطاق الاختبار دون تعريض جهاز العرض للخطر","Explain the IP certification without risking the demo device"),
  b("استعرض الفرق بين 3× بصري و100× رقمي على صور فعلية","Demonstrate the difference between 3× optical and 100× digital"),
  b("استعرض Aqua Mode والاشتراطات المسموح بها دون غمر الجهاز بلا تصريح","Explain Aqua Mode's permitted use without unsafe immersion"),
  b("استعرض المثال داخل ميزة تحويل الصورة إلى فيديو","Demonstrate a sample Photo-to-Video workflow"),
  b("نفّذ مثالًا عمليًا على Flash Memo أو Ella","Demonstrate a real Ella or Flash Memo task")
 ],
 pova8:[
  b("افتح لعبة العميل وقارن الاستجابة بالإعدادات المتوافقة","Open the buyer's game and check compatible performance settings"),
  b("اشرح دور P1 أثناء استعراض لعبة تدعم الميزة","Explain P1 while testing a supported game"),
  b("غيّر إعداد التحديث أمام العميل واعرض فرق التمرير","Show refresh settings and compare scrolling"),
  b("اشرح نظام التبريد وتحقق من الحرارة في تجربة لعبة قصيرة","Explain cooling and check device heat in a short gameplay session"),
  b("اعرض معلومات البطارية وناقش مدة الاستخدام المتوقعة حسب العادات","Show battery details and discuss usage-dependent endurance"),
  b("اعرض إعداد الشحن والملحق المعتمد من الشركة","Show charging information and approved charger"),
  b("اشرح حدود مقاومة الماء والغبار دون إجراء اختبار خطير","Explain resistance limits without a risky water test"),
  b("شغّل تأثير Matrix Alive الخلفي أمام العميل","Activate the rear Matrix Alive feature"),
  b("استعرض خيارات النظام والتنقل والإعدادات على الجهاز","Walk through system features on the handset"),
  b("اختبر لعبة مدعومة وراجع FPS الفعلي بدون ضمان نتائج موحدة","Test supported game FPS rather than promising universal rates")
 ],
 curve:[
  b("اعرض سعة البطارية واسأل عن ساعات استخدامه المعتادة","Show rated battery capacity and ask about daily use"),
  b("استعرض قدرة الشحن والوقت المتوقع وفق الظروف الحقيقية","Show charging rating and clarify real-world conditions"),
  b("جرّب شحن ملحق متوافق بالجهاز في حال توفره","Test reverse charging with a compatible accessory"),
  b("اشرح Bypass خلال اللعب أو الاستخدام المطوّل على جهاز مدعوم","Demonstrate bypass charging during a compatible use case"),
  b("اعرض الشاشة بتطبيق قراءة أو فيديو وتمرير سلس","Show reading and scrolling on the curved display"),
  b("اعرض مواصفة طبقة الحماية وطريقة العناية بالشاشة","Explain screen protection and care"),
  b("افتح إعدادات الشرائح وتحقق من دعم شركة الاتصالات","Show SIM settings and confirm carrier compatibility"),
  b("افتح صفحة التخزين وقارن الاستخدام والمساحة المتبقية","Show storage settings and available capacity"),
  b("استعرض أمرًا مفيدًا داخل Ella أو أداة ذكية","Demonstrate a useful Ella or smart-tool task"),
  b("اشرح ظروف اختبار المتانة دون إسقاط الجهاز فعليًا","Explain test conditions without physically dropping the handset")
 ]
};
const plans={
 camon:[
 ["تصوير حفل التخرج","Graduation ceremony photos","أصور منصة التخرج من المقاعد الخلفية وأخاف تضيع التفاصيل.","I shoot graduation photos from the back rows and worry about details.","هل التصوير سيكون غالبًا من بعيد، وما حدود ميزانيتك؟","Are most shots from a distance, and what is your budget?","أخشى أن التكبير يخرب جودة الصورة.","I'm concerned zoom will ruin image quality."],
 ["تصوير الأطفال المتحركين","Photographing active children","أصور أطفالي كثيرًا والصور تطلع مهزوزة.","I often photograph my moving children and get blurry shots.","في أي إضاءة تصورهم، وهل الحركة هي المشكلة الأساسية؟","What lighting are you in, and is motion the main challenge?","هل OIS يضمن أن كل صورة ستكون واضحة؟","Does OIS guarantee every photo is sharp?"],
 ["مكالمات الفيديو والسيلفي","Selfies and video calls","أحتاج سيلفي واضحًا وأشارك في اجتماعات فيديو.","I need clear selfies and join video meetings.","هل الأولوية للتركيز على الوجه أم الإضاءة أم مكالمات الفيديو؟","Is face focus, lighting, or calling your top concern?","أنا لا أحب الكاميرات التي تفقد التركيز.","I dislike cameras that miss focus."],
 ["بورتريه للمناسبات","Event portrait photography","أصور البورتريه في كل مناسبة وأبغى خلفية أجمل.","I take portraits at events and want better composition.","هل تفضل لقطات الوجه القريبة أو صورًا تشمل الشخص والمكان؟","Do you prefer close portraits or environmental portraits?","هل أحتاج برامج إضافية للبورتريه؟","Do I need extra software for portraits?"],
 ["مراجعة الصور على الشاشة","Reviewing photos on screen","أعرض الصور لعملائي على الجوال وأحتاج شاشة ممتازة.","I show photos to clients on my phone and want a great display.","هل تراجع صورًا ثابتة أم فيديو وتستخدم الهاتف كثيرًا؟","Are you reviewing stills or videos, and for how long?","هل 144Hz يجعل كل صورة أعلى دقة؟","Does 144Hz improve the resolution of every photo?"],
 ["المتانة أثناء الرحلات","Outdoor travel durability","أسافر كثيرًا وأقلق من الغبار والماء.","I travel often and worry about dust and water.","هل تتعرض للغبار أو الرش أم تنوي استخدام الهاتف تحت الماء؟","Is it dust, splashes, or actual underwater use?","هل تصنيف IP يعني أنه ضد التلف مهما حدث؟","Does IP rating mean it can never be damaged?"],
 ["فهم 100× Zoom","Explaining 100× zoom","شفت مكتوب 100× وأبغى أستخدمه في تصوير المباني البعيدة.","I saw 100× zoom and want to shoot distant buildings.","هل تبحث عن أفضل جودة عند تقريب متوسط أم الوصول البعيد جدًا؟","Do you prioritize quality at modest zoom or extreme reach?","هل 100× كله بصري؟","Is all of the 100× zoom optical?"],
 ["التصوير في أنشطة الماء","Water-related activities","أحب ألتقط صورًا حول المسبح وفي الرحلات البحرية.","I photograph around pools and on boat trips.","هل المقصود تصوير قرب الماء أم استخدام الهاتف داخل الماء؟","Do you mean photos near water or underwater use?","هل أقدر أغمر جوال العرض دون شروط؟","Can I immerse the demo phone without precautions?"],
 ["الصور للمحتوى الاجتماعي","Social content creation","أنشر صورًا وأبغى أحولها إلى مقاطع جذابة.","I post photos and want to turn them into engaging clips.","هل محتواك يعتمد على صور ثابتة أم تحرير فيديو طويل؟","Is your content based on stills or long video edits?","هل الميزة تستبدل تصوير فيديو حقيقيًا؟","Does the feature replace filming real video?"],
 ["تدوين فكرة أثناء البيع","Instant notes during a sales call","تجيني معلومات مهمة وأنا أتكلم مع العملاء وأنساها.","I get useful information in conversations and forget it.","هل تحتاج حفظ ملاحظات سريعة أم تلخيصها للرجوع لها؟","Do you need quick captures or later summaries?","كيف أضمن أن الملاحظات صحيحة؟","How do I know the captured notes are correct?"]
 ],
 pova8:[
 ["طالب يحب ألعاب المنافسة","Competitive gaming student","ألعب مباريات سريعة وأخاف من التقطيع.","I play fast matches and worry about lag.","ما أسماء ألعابك وإعدادات الرسوم المطلوبة؟","Which games and graphics settings do you use?","هل المعالج يضمن أعلى FPS بكل لعبة؟","Does the chipset guarantee top FPS in every game?"],
 ["ألعاب برسوم عالية","Graphics-heavy games","أبغى رسوم ممتازة وأداء مستقر في الجلسات.","I want sharp graphics and reliable gameplay.","أي لعبة تهمك وهل تفضل الجودة أم السلاسة؟","Which game, and do you prefer visual quality or speed?","هل شريحة الرسوم تعمل بنفس النتيجة دائمًا؟","Does the graphics chip deliver identical results everywhere?"],
 ["سرعة واجهة الاستخدام","Smooth daily interface","التصفح عندي أهم من الألعاب وأبغى سلاسة.","Smooth scrolling matters more to me than gaming.","هل تقصد التصفح والتمرير أو أداء الألعاب؟","Do you mean scrolling or gaming performance?","هل الشاشة 144Hz تجعل كل تطبيق أسرع؟","Does 144Hz make every app faster?"],
 ["جلسات الألعاب الطويلة","Long gaming sessions","بعد نصف ساعة لعب أحس جوالي يسخن.","After half an hour my phone heats up.","كم تستمر جلساتك وفي أي بيئة تلعب؟","How long are your sessions and in what environment?","هل التبريد يعني عدم ارتفاع الحرارة نهائيًا؟","Does cooling mean the device can never get hot?"],
 ["رحلة يوم كامل","A full day without charging","أطلع من الصبح وما أرجع إلا بالليل.","I'm out all day without returning home.","كم ساعة شاشة تستخدم وما أكثر تطبيق يستهلك البطارية؟","What is your screen-on time and biggest battery drain?","هل البطارية تكفي الجميع نفس المدة؟","Does the battery last the same time for everyone?"],
 ["وقت الشحن القصير","Charging before heading out","عندي وقت قليل قبل الدوام وأحتاج أشحن.","I have little time to charge before work.","كم وقت متاح لك وما نوع الشاحن الموجود؟","How much time do you have and what charger do you own?","هل 45W ثابت طوال مدة الشحن؟","Is 45W maintained for the entire charge?"],
 ["استخدام الهاتف خارج المنزل","Outdoor device resistance","أشتغل في بيئة فيها غبار وأحيانًا ماء.","I work around dust and occasional water.","هل تعرض الجهاز للغبار أم الرش أم الغمر؟","Is exposure to dust, splashes, or immersion?","هل ضمان المقاومة يعني صفر مخاطر؟","Does the resistance rating eliminate all risk?"],
 ["تصميم ملفت","Distinctive rear design","أبغى جوال شكله مختلف عن البقية.","I want a phone that stands out.","هل تفضل الإضاءة والخلفية التفاعلية أم التصميم الهادئ؟","Do you prefer interactive rear effects or a subtle design?","هل الشاشة الخلفية مجرد ملصق؟","Is the rear display just a sticker?"],
 ["سهولة الاستخدام","Everyday software experience","أبي واجهة مرتبة وسهلة في الاستخدام.","I want a tidy, easy-to-use interface.","أي وظائف وطرق تنقل تستخدمها كل يوم؟","Which functions and navigation patterns matter daily?","هل كل التطبيقات تعمل بشكل متطابق مع نظامي القديم؟","Will every app work exactly as on my old phone?"],
 ["معدل الإطارات الفعلي","Real in-game frame rate","سمعت الجهاز يوصل 144 فريم في الألعاب.","I heard this device can reach 144 FPS in games.","ما لعبتك وهل تدعم هذا المعدل على إعداداتك؟","Which game, and does it support that frame rate?","هل ممكن تضمن 144 فريم في كل الحالات؟","Can you guarantee 144 FPS under every condition?"]
 ],
 curve:[
 ["موظف يعمل خارج المكتب","Field employee battery life","أقضي اليوم خارج المكتب وبطاريتي تخلص.","I'm away from my desk all day and my battery dies.","كم ساعة تقضي على الخرائط والمكالمات والبيانات؟","How many hours do you spend on maps, calls, and data?","هل 8000mAh تعني يومين مضمونين؟","Does 8000mAh guarantee two days?"],
 ["الشحن أثناء الاستراحة","Charging during breaks","أقدر أشحن الجوال فقط وقت الاستراحة.","I can charge only during short breaks.","كم مدة الاستراحة وما قدرة شاحنك؟","How long is your break and what's your charger's rating?","هل سرعة الشحن نفسها من صفر إلى 100%؟","Is charging speed constant from zero to full?"],
 ["مساعدة صديق في الشحن","Charging an accessory","أحتاج أساعد صاحبي أو أشحن سماعتي أحيانًا.","I sometimes need to charge earbuds or help a friend.","ما الجهاز الذي تريد شحنه وهل يدعم الشحن العكسي؟","Which accessory are you charging, and is it compatible?","هل العكسي يعني شحن جميع الأجهزة بأي سلك؟","Does reverse charging work for every device and cable?"],
 ["ألعاب مع توصيل الشاحن","Gaming while plugged in","ألعب والجوال على الشاحن وأبغى أعتني بالبطارية.","I game while plugged in and care about battery health.","هل تقضي جلسات طويلة موصولًا بالشاحن؟","Do you often play long sessions while plugged in?","هل Bypass يوقف الحرارة تمامًا؟","Does bypass eliminate all heat?"],
 ["شاشة جميلة للقراءة","Reading on a curved screen","أقرأ وأتصفح كثيرًا وأبي شاشة مريحة.","I read and browse a lot and want a pleasant screen.","هل الأهم وضوح النص أو السلاسة أو شكل الحواف؟","Is text clarity, smoothness, or edge design your priority?","هل 144Hz يعني أن كل محتوى 144 إطار؟","Does 144Hz mean every video has 144 frames?"],
 ["هاتف يتحمل يوميات العمل","Daily screen protection","جوالي دائمًا في الشنطة مع أشياء ثانية.","My phone is often in my bag with other items.","هل القلق من الخدوش أم من السقوط المتكرر؟","Are scratches or drops your main concern?","هل زجاج الحماية ضد الكسر نهائيًا؟","Is protective glass completely unbreakable?"],
 ["شريحتان للعمل والسفر","Work and travel SIMs","أسافر وأستخدم رقمًا شخصيًا وآخر للعمل.","I travel and maintain personal and work numbers.","ما شركة اتصالاتك وهل تحتاج eSIM بالتحديد؟","Which carrier and do you specifically need eSIM?","هل eSIM تشتغل لدى أي مشغل في أي دولة؟","Does eSIM work with every carrier worldwide?"],
 ["الصور والملفات الكثيرة","Plenty of local storage","جهازي الحالي امتلأ من الصور وملفات العمل.","My current phone is full of photos and work files.","كم تخزين تستخدم حاليًا وهل ملفاتك محلية أم سحابية؟","How much storage do you use and is it local or cloud?","هل السعة المُعلنة هي المساحة المتاحة كلها؟","Is rated capacity identical to free usable space?"],
 ["تنظيم مهام اليوم","Organizing a busy schedule","أنسى بعض المهام وأحتاج مساعدًا ينظم يومي.","I forget tasks and need help organizing my day.","هل تحتاج تذكيرات أم ملاحظات أم البحث عن معلومات؟","Do you need reminders, notes, or information lookup?","هل أقدر أعتمد على إجابات المساعد دون مراجعة؟","Can I trust every assistant output without checking?"],
 ["قلق السقوط العرضي","Accidental drop concerns","أخاف يسقط جوالي في العمل وأخسره.","I'm afraid I'll drop my phone at work.","هل تسقط الأجهزة كثيرًا وهل تستخدم غطاء حماية؟","Are drops frequent, and do you use a protective case?","هل شهادة الاختبار تمنع التلف مع أي سقوط؟","Does a lab test prevent damage from any drop?"]
 ]
};
const groups=[
 {key:"camon",model:"camon-50-ultra",name:"CAMON 50 Ultra",color:"#9c83db"},
 {key:"pova8",model:"pova-8-pro",name:"POVA 8 Series",color:"#6c9e71"},
 {key:"curve",model:"pova-curve-2",name:"POVA Curve 2",color:"#7689a1"}
];
const opt=(text,marks,next,feedback)=>({text,marks,next,feedback});
function build(def,group,i){
 const [titleAr,titleEn,needAr,needEn,questionAr,questionEn,objectionAr,objectionEn]=def;
 const feature=tech[group.key][i],demo=proof[group.key][i];
 const need=b(needAr,needEn),ask=b(questionAr,questionEn),objection=b(objectionAr,objectionEn);
 const base=b("اذكر معلومات احتياجك بدقة ثم اربط الميزة بالتجربة المناسبة.","Clarify the need, connect the feature, and demonstrate its value.");
 const recovery=b("أنا أبي أعرف المناسب لي، مو مجرد كلام تسويقي.","I want a recommendation for my needs, not a generic pitch.");
 const stages={
  discovery:{
   category:"experience",
   client:need,
   ask:b("كيف تبدأ الحديث مع هذا العميل؟","How would you begin?"),
   choices:[
    opt(ask,{knowledge:0,experience:40,selling:10},"technical",b("استكشفت الاحتياج بدل الافتراض.","You discovered the need before pitching.")),
    opt(b("هذا أفضل جهاز موجود، أنصحك تشتريه الآن.","This is our best device. Buy it now."),{knowledge:0,experience:0,selling:0},"recovery",b("بدأت بالعرض دون فهم السبب الحقيقي للشراء.","You pitched before understanding the buyer.")),
    opt(b("ما ميزانيتك فقط؟ بعدها أقول لك المواصفات.","What's your budget? I'll list the specs afterward."),{knowledge:0,experience:18,selling:4},"technical",b("السعر مهم، لكن سؤالًا واحدًا لا يكشف كل الاحتياجات.","Budget matters, but it does not reveal the full use case."))
   ]
  },
  recovery:{
   category:"experience",
   client:recovery,
   ask:b("صحح مسار الحديث.","Recover the conversation."),
   choices:[
    opt(ask,{knowledge:0,experience:10,selling:2},"technical",b("صححت المسار، مع احتساب أثر البداية غير المناسبة.","You recovered, but the initial missed opportunity remains.")),
    opt(b("المواصفات كلها ممتازة، خلنا نكمل.","All the specs are excellent. Let's continue."),{knowledge:0,experience:0,selling:0},"technical",b("كان الأفضل أن تستمع للعميل.","Listening was the better option."))
   ]
  },
  technical:{
   category:"knowledge",
   client:b("تمام، أي ميزة في هذا الهاتف تخدم استخدامي تحديدًا؟","Which exact feature addresses my use case?"),
   ask:b("اختر إجابة تقنية صحيحة تربط الميزة بالحاجة.","Choose an accurate feature-to-need explanation."),
   choices:[
    opt(b("ميزة "+feature.ar+"، ونحدد فائدتها حسب استخدامك.","The "+feature.en+" feature, matched to how you use the phone."),{knowledge:50,experience:0,selling:10},"evidence",b("اخترت ميزة ذات صلة وربطتها بالفائدة.","You selected a relevant capability and connected it with value.")),
    opt(b("كل المواصفات تعطي أفضل نتيجة في أي وضع دائمًا.","Every specification guarantees the best result in every condition."),{knowledge:0,experience:0,selling:0},"evidence",b("الوعود المطلقة غير دقيقة وتقلل المصداقية.","Absolute promises undermine technical credibility.")),
    opt(b("الجهاز ممتاز فقط لأن اسمه معروف.","The phone is great simply because of its name."),{knowledge:8,experience:0,selling:2},"evidence",b("اسم الموديل لا يشرح ميزة تقنية.","A model name does not explain technical value."))
   ]
  },
  evidence:{
   category:"knowledge",
   client:b("أبغى أشوف دليلًا قبل اتخاذ القرار.","I want to see proof before deciding."),
   ask:b("كيف تثبت فائدة الميزة؟","How will you demonstrate the claim?"),
   choices:[
    opt(demo,{knowledge:50,experience:20,selling:0},"closing",b("أظهرت دليلًا عمليًا ذا صلة دون مبالغة.","You offered a relevant, realistic demonstration.")),
    opt(b("أقول لك عن تجربتي فقط، ما يحتاج نجرب.","Take my word for it; there is no need to test."),{knowledge:0,experience:0,selling:0},"closing",b("الدليل العملي يبني الثقة أكثر من الوعود.","A hands-on demonstration is stronger than a promise.")),
    opt(b("أفتح جدول المواصفات وأقرأ كل شيء بصوت عالٍ.","I'll read every specification from the sheet."),{knowledge:12,experience:7,selling:0},"closing",b("الشرح وحده لا يثبت فائدة الميزة المطلوبة.","Listing features is not the same as proving their value."))
   ]
  },
  closing:{
   category:"selling",
   client:objection,
   ask:b("كيف تعالج آخر اعتراض وتصل إلى قرار شراء محترم؟","How do you address the final concern and guide a respectful decision?"),
   choices:[
    opt(b("أوضح حدود الميزة بصدق، ونراجع تجربتك وبدائلك قبل القرار.","I'll explain the feature's real limits, review your test, and compare your options before you decide."),{knowledge:0,experience:40,selling:80},null,b("اعتراض واضح، رد صادق، وإغلاق بدون ضغط.","You handled the concern transparently and closed without pressure.")),
    opt(b("إذا ما اشتريت الآن بتفوت عليك فرصة ما تتكرر.","Buy right now or you'll miss a once-in-a-lifetime deal."),{knowledge:0,experience:0,selling:0},null,b("الضغط والعروض غير الموثقة تضعف ثقة العميل.","Pressure and unsupported urgency weaken trust.")),
    opt(b("أكرر المواصفات نفسها وأتجاهل سؤالك.","I'll repeat the specs and ignore your question."),{knowledge:0,experience:4,selling:12},null,b("الاعتراض يحتاج إجابة مباشرة، لا إعادة العرض نفسه.","Objections need direct answers, not repetition."))
   ]
  }
 };
 const groupIndex=groups.findIndex(groupItem=>groupItem.key===group.key);
 const stagesToBalance=["discovery","recovery","technical","evidence","closing"];
 stagesToBalance.forEach((stageName,stageIndex)=>{
  const choices=stages[stageName].choices;
  const shift=(i*7+groupIndex*11+stageIndex*5+1)%choices.length;
  stages[stageName].choices=choices.map((_,j)=>choices[(j-shift+choices.length)%choices.length]);
 });

 return {
  id:group.key+"-"+String(i+1).padStart(2,"0"),
  product:group.model,group:group.key,model:group.name,
  title:b(titleAr,titleEn),description:need,
  level:b(i<3?"مبتدئ":i<7?"متوسط":"متقدم",i<3?"Beginner":i<7?"Intermediate":"Advanced"),
  number:i+1,feature,proof:demo,stages,stageOrder:["discovery","technical","evidence","closing"]
 };
}
export const scenarioBank=groups.flatMap(group=>plans[group.key].map((d,i)=>build(d,group,i)));
export const competencyWeights={knowledge:0.4,experience:0.35,selling:0.25};
export const competencyLabels={
 knowledge:b("المعرفة التقنية","Technical knowledge"),
 experience:b("تجربة العميل","Customer experience"),
 selling:b("مهارة البيع","Selling skills")
};
export const totals={knowledge:100,experience:100,selling:100};
export function summarize(marks){
 const scores=Object.fromEntries(Object.keys(totals).map(k=>[k,Math.max(0,Math.min(100,Math.round((marks[k]||0)/totals[k]*100)))]));
 const total=Math.round(Object.keys(competencyWeights).reduce((sum,k)=>sum+scores[k]*competencyWeights[k],0));
 return {scores,total,passed:total>=75,level:total>=90?"excellent":total>=75?"good":"develop"};
}
export function validateBank(){
 if(scenarioBank.length!==30)return false;
 if(new Set(scenarioBank.map(s=>s.id)).size!==30)return false;
 if(groups.some(g=>scenarioBank.filter(s=>s.group===g.key).length!==10))return false;
 for(const c of scenarioBank){
  if(!c.title.ar||!c.title.en||!c.description.ar||!c.description.en)return false;
  for(const id of ["discovery","technical","evidence","closing","recovery"]){
   const n=c.stages[id];
   if(!n||n.choices.length<2)return false;
   if(n.choices.some(o=>!o.text.ar||!o.text.en||!o.feedback.ar||!o.feedback.en))return false;
   if(n.choices.some(o=>o.next!==null&&!c.stages[o.next]))return false;
  }
 }
 return true;
}
