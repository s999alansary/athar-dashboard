/**
 * ترجمة واجهة لوحة مبادرة أثر — عربي ⇄ إنجليزي
 * ------------------------------------------------------------
 * كيف يعمل:
 *  - يمشي على نصوص الصفحة ويستبدل ما يجده في القاموس أدناه.
 *  - يحفظ النص العربي الأصلي في الذاكرة، فالرجوع للعربية استرجاع لا ترجمة عكسية.
 *  - يراقب الصفحة (MutationObserver) فيترجم أي محتوى يُرسم لاحقًا تلقائيًا.
 *  - ما لا يوجد في القاموس يبقى بالعربية كما هو — لا ينكسر شيء.
 *
 * لإضافة ترجمة جديدة: أضِف سطرًا في AR2EN بالنص العربي حرفيًا كما يظهر في الصفحة.
 */
(function () {
  'use strict';

  const AR2EN = {
    /* ===== التنقّل والعناوين ===== */
    'الرئيسية': 'Home',
    'التسويق': 'Marketing',
    '📣 التسويق': '📣 Marketing',
    'التصميم': 'Design',
    '🎨 التصميم': '🎨 Design',
    'المهام والاجتماعات': 'Tasks & Meetings',
    '🗓️ المهام والاجتماعات': '🗓️ Tasks & Meetings',
    'السكرتارية': 'Secretariat',
    '📝 السكرتارية': '📝 Secretariat',
    'دراسة الجدوى والتحليل': 'Feasibility & Analysis',
    '📊 دراسة الجدوى وتحليل البيانات': '📊 Feasibility Study & Data Analysis',
    'تطوير العمل': 'Business Development',
    '📈 تطوير العمل': '📈 Business Development',
    'المحاسب المبسّط': 'Simple Accountant',
    '🧮 المحاسب المبسّط': '🧮 Simple Accountant',
    'البحث': 'Research',
    '🔎 البحث': '🔎 Research',
    'أوقات الذروة والمنصات': 'Peak Times & Platforms',
    '📊 أوقات الذروة والمنصات': '📊 Peak Times & Platforms',
    'طلبات المنصة': 'Platform Requests',
    '📥 طلبات المنصة': '📥 Platform Requests',
    'مبادرة أثر': 'Athar Initiative',
    'لوحة التحكم': 'Dashboard',
    'لوحة تحكم — مبادرة أثر': 'Dashboard — Athar Initiative',
    'أثر': 'Athar',
    'شعار مبادرة أثر': 'Athar Initiative logo',
    'مشروع جمع التبرعات العينية.': 'In-kind donations collection project.',
    'مرحبًا بك 👋 — اختر الأداة التي تحتاجها. كل أداة تعمل على حِدة وتحفظ بياناتها.':
      'Welcome 👋 — pick the tool you need. Each tool works on its own and saves its own data.',

    /* ===== أوصاف بطاقات الأدوات ===== */
    'إدارة الحملات على سناب شات وتيك توك وإنستقرام وتتبّع نتائجها.':
      'Manage campaigns on Snapchat, TikTok and Instagram and track their results.',
    'سجّل حملاتك التسويقية وتابع أداءها.': 'Log your marketing campaigns and follow their performance.',
    'ارفع واحفظ الصور والفيديوهات وملفات PDF وWord وكل أنواع الملفات في مكان واحد.':
      'Upload and store images, videos, PDF and Word files — every file type in one place.',
    'ارفع واحفظ كل أنواع الصور والفيديوهات وملفات PDF وWord وغيرها.':
      'Upload and store images, videos, PDF, Word and more.',
    'أضِف بالكتابة أو بالتسجيل الصوتي، ثم أرسِلها لتقويم Google أو بريدك.':
      'Add by typing or by voice, then send to Google Calendar or your email.',
    'أضِف مهامك واجتماعاتك بالكتابة أو بالتسجيل الصوتي، وأرسلها لتقويم Google وبريدك.':
      'Add tasks and meetings by typing or voice, and send them to Google Calendar and your email.',
    'اكتب الخطابات الرسمية واحفظها، مع نماذج جاهزة، وطباعة وتصدير Word.':
      'Write and save official letters, with ready templates, printing and Word export.',
    'اكتب الخطابات الرسمية واحفظها، واستعن بالنماذج الجاهزة لفهم آلية العمل.':
      'Write and save official letters, using the ready templates as a guide.',
    'حوّل أي بيانات إلى جداول ومؤشرات ورسوم بيانية دقيقة، وادرس جدوى مشاريعك ماليًا.':
      'Turn any data into tables, KPIs and precise charts, and study your projects financially.',
    'حوّل بياناتك إلى جداول ومؤشرات ورسوم تحليلية دقيقة.':
      'Turn your data into tables, KPIs and precise analytical charts.',
    'أفكار ومهام التحسين والتوسّع.': 'Ideas and tasks for improvement and growth.',
    'أفكار ومهام لتحسين التشغيل والتوسّع، مع أولوياتها وحالتها.':
      'Ideas and tasks for improving operations and growth, with priority and status.',
    'تسجيل الدخل والمصروفات واستخراج تقارير مالية فورية.':
      'Record income and expenses and produce instant financial reports.',
    'سجّل الحركات المالية واحصل على تقرير فوري.': 'Record financial entries and get an instant report.',
    'احفظ نقاط البحث والمصادر المهمة.': 'Save research notes and key sources.',
    'حفظ نقاط البحث والمصادر (جهات شراء السكراب، الإسفنج... إلخ).':
      'Save research notes and sources (scrap buyers, foam, etc.).',
    'أفضل الأوقات للنشر على سناب وتيك توك وإنستقرام، وتوصية اللحظة الحالية للإعلانات.':
      'Best posting times on Snapchat, TikTok and Instagram, plus a live recommendation for ads.',
    'حدّد أفضل منصة ووقت للنشر والإعلانات المموّلة.':
      'Find the best platform and time for posting and paid ads.',
    'صفحة الطلبات — تُدار يدويًا الآن وستُربط لاحقًا بمصدر بياناتها.':
      'Requests page — managed manually for now; it will be connected to its data source later.',
    'صفحة الطلبات — تُدار يدويًا الآن، وستُربط لاحقًا بمصدر بياناتها.':
      'Requests page — managed manually for now; it will be connected to its data source later.',

    /* ===== أزرار عامة ===== */
    '＋ إضافة': '＋ Add',
    '＋ تسجيل': '＋ Record',
    '＋ خطاب جديد': '＋ New letter',
    '＋ صف': '＋ Row',
    '💾 حفظ': '💾 Save',
    '💾 حفظ الخطاب': '💾 Save letter',
    '💾 حفظ الطلب للأرشيف': '💾 Save request to archive',
    'حفظ': 'Save',
    'إغلاق': 'Close',
    'حذف': 'Delete',
    'تعديل': 'Edit',
    'طباعة': 'Print',
    '🖨️ طباعة / PDF': '🖨️ Print / PDF',
    '🖨️ طباعة تقرير': '🖨️ Print report',
    '⬇️ تصدير CSV': '⬇️ Export CSV',
    '⬇️ تصدير Word': '⬇️ Export Word',
    'تصدير Excel/CSV': 'Export Excel/CSV',
    '🗑️ مسح الكل': '🗑️ Clear all',
    'تحديد الكل': 'Select all',
    'إلغاء الكل': 'Clear all',
    '↺ استرجاع القيم الافتراضية': '↺ Restore defaults',
    '🚪 خروج': '🚪 Sign out',
    '⚙️ إعداد': '⚙️ Settings',
    '🔌 اختبار': '🔌 Test',
    'إضافة صف جديد': 'Add a new row',
    'إضافة عمود جديد': 'Add a new column',
    'اضغط للاختيار': 'Click to choose',
    'اختياري': 'Optional',
    'أو': 'or',
    'و': 'and',
    'أخرى': 'Other',
    'جديد': 'New',
    'جديدة': 'New',
    'جاهز': 'Ready',
    'ملاحظة': 'Note',

    /* ===== حقول ونماذج ===== */
    'العنوان': 'Title',
    'العنوان الرئيسي': 'Headline',
    'العنوان الفرعي': 'Subheadline',
    'التاريخ': 'Date',
    'الوقت': 'Time',
    'اليوم': 'Day',
    'النوع': 'Type',
    'الحالة': 'Status',
    'الفئة': 'Category',
    'الوصف': 'Description',
    'الملاحظات': 'Notes',
    'ملاحظات / تفاصيل': 'Notes / details',
    'المبلغ': 'Amount',
    'المبلغ (ريال)': 'Amount (SAR)',
    'الميزانية': 'Budget',
    'الميزانية (ريال)': 'Budget (SAR)',
    'النتائج': 'Results',
    'النتائج (متبرعون/طلبات)': 'Results (donors/requests)',
    'المنصة': 'Platform',
    'المنصة / المصدر': 'Platform / source',
    'المنصة/المصدر': 'Platform/source',
    'المصدر / الرابط': 'Source / link',
    'الجهة': 'Entity',
    'الجهة / المرسَل إليه': 'Entity / addressee',
    'الموضوع': 'Subject',
    'عنوان / موضوع الخطاب': 'Letter title / subject',
    'رقم المرجع': 'Reference number',
    'نص الخطاب': 'Letter body',
    'اكتب نص الخطاب هنا...': 'Write the letter body here...',
    'الأولوية': 'Priority',
    'الفكرة / المهمة': 'Idea / task',
    'اسم/وصف الحملة': 'Campaign name/description',
    'اسم المشروع / الدراسة': 'Project / study name',
    'اسم الدفتر': 'Ledger name',
    'اسم جهة أو رابط': 'An entity name or link',
    'رقم التواصل': 'Contact number',
    'البريد الإلكتروني': 'Email',
    'كلمة المرور': 'Password',
    'تسجيل الدخول': 'Sign in',
    'دخول': 'Sign in',
    'المقاس': 'Size',
    'الإجمالي': 'Total',
    'الصافي': 'Net',
    'المتبقي': 'Remaining',
    'دخل': 'Income',
    'مصروف': 'Expense',
    'عنوان التقرير (اختياري)': 'Report title (optional)',
    'رابط للـ QR (اختياري)': 'Link for QR (optional)',
    'تفاصيل اختيارية': 'Optional details',
    'وصف الطلب': 'Request description',
    'عدد أشهر التوقّع': 'Forecast months',
    'عمود التصنيف': 'Category column',
    'عمود القيمة': 'Value column',
    'تقديرية قابلة للتعديل': 'Editable estimates',

    /* ===== حالات وأولويات ===== */
    'نشطة': 'Active',
    'منتهية': 'Finished',
    'مخطّطة': 'Planned',
    'مسودة': 'Draft',
    'مُرسل': 'Sent',
    'منجز': 'Done',
    'منجزة': 'Done',
    'قيد التنفيذ': 'In progress',
    'قيد المعالجة': 'Processing',
    'عالية': 'High',
    'متوسطة': 'Medium',
    'منخفضة': 'Low',
    'مرتفع': 'High',
    'متوسط': 'Medium',
    'منخفض': 'Low',
    'مهمة': 'Task',
    'اجتماع': 'Meeting',
    'غدًا': 'Tomorrow',
    'بعد أسبوع': 'In a week',
    'القادمة والحالية': 'Upcoming & current',

    /* ===== المحاسبة ===== */
    'إجمالي الدخل': 'Total income',
    'إجمالي المصروفات': 'Total expenses',
    'إجمالي المدين (الوارد)': 'Total debit (in)',
    'إجمالي الدائن (المصروف)': 'Total credit (out)',
    'الرصيد الصافي (ريال)': 'Net balance (SAR)',
    'عدد القيود': 'Entries',
    'كل الحركات': 'All entries',
    '🧾 الحركات العامة': '🧾 General entries',
    '📒 دفتر المستودع': '📒 Warehouse ledger',
    'تقرير حسب الفئة': 'Report by category',
    'إحصاءات الأعمدة الرقمية': 'Numeric column statistics',
    '✏️ اضغط على أي خانة لتعديلها مباشرة — يُحفظ تلقائيًا. المتبقي يُحسب فورًا (المدين − الدائن).':
      '✏️ Click any cell to edit it directly — saved automatically. The remaining balance is computed instantly (debit − credit).',
    'رواتب': 'Salaries',
    'وقود': 'Fuel',
    'صيانة': 'Maintenance',
    'إيجار مكتب': 'Office rent',
    'إيجار مستودع': 'Warehouse rent',
    'تبرعات نقدية': 'Cash donations',
    'بيع سكراب': 'Scrap sales',
    'بيع إسفنج': 'Foam sales',
    'تسويق': 'Marketing',

    /* ===== الإحصاءات ===== */
    'حملات تسويقية': 'Marketing campaigns',
    'مهام واجتماعات قادمة': 'Upcoming tasks & meetings',
    'مهام تطوير مفتوحة': 'Open development tasks',
    'خطاب محفوظ': 'Saved letter',
    'عناصر بحث': 'Research items',
    'عناصر البحث': 'Research items',
    'الحملات المسجّلة': 'Recorded campaigns',
    'الخطابات المحفوظة': 'Saved letters',
    'الطلبات المحفوظة': 'Saved requests',
    'الطلبات': 'Requests',
    'قائمة المهام': 'Task list',
    'ملفات التصميم': 'Design files',
    'شرح الأدوات': 'Tool guide',

    /* ===== الذكاء الاصطناعي ===== */
    '🤖 اطلب من الذكاء الاصطناعي': '🤖 Ask the AI',
    '✨ دراسة جدوى ذكية': '✨ Smart feasibility study',
    '🚀 أنشئ دراسة الجدوى': '🚀 Build the feasibility study',
    '🎯 مولّد حسب الطلب': '🎯 Custom generator',
    '✨ نفّذ الطلب': '✨ Run the request',
    '🏗️ حاسبة يدوية': '🏗️ Manual calculator',
    '🧮 محلّل بيانات عام': '🧮 General data analyser',
    '🧮 تحليل البيانات': '🧮 Data analysis',
    '🪄 تصميم متجهي': '🪄 Vector design',
    '🖼️ تصميم بالصور': '🖼️ Image design',
    '🖼️ أنشئ التصميم': '🖼️ Create the design',
    '🪄 صمّم': '🪄 Design',
    '🎨 صمّم': '🎨 Design',
    '🔁 طوّر النسخة الحالية': '🔁 Improve the current version',
    '🔁 خلفية أخرى': '🔁 Another background',
    '🔍 انقد وحسّن تلقائيًا': '🔍 Critique & auto-improve',
    '✍️ اكتب الخطاب بأسلوبي': '✍️ Write the letter in my style',
    '🧠 حلّل أسلوبي': '🧠 Analyse my style',
    '📎 نماذجي — ارفع خطاباتك السابقة': '📎 My templates — upload your previous letters',
    'كتابة خطاب جديد': 'Write a new letter',
    'نماذج جاهزة — اضغط «استخدام كنموذج» لبدء خطاب منها':
      'Ready templates — click “Use as template” to start a letter from one',
    'باسم مبادرة أثر.': 'in the name of the Athar Initiative.',
    'بنفس أسلوبك': 'in your own style',

    /* ===== الرفع والملفات ===== */
    'اسحب الملفات هنا أو': 'Drag files here or',
    'اسحب الملفات هنا أو اضغط للاختيار': 'Drag files here or click to choose',
    'اسحب خطاباتك هنا أو اضغط للاختيار': 'Drag your letters here or click to choose',
    'اسحب الصور هنا أو اضغط — يراها ويبني عليها': 'Drag images here or click — it sees them and builds on them',
    'Word · PDF · صور · نصوص — حتى ٢٠ ملفًا': 'Word · PDF · images · text — up to 20 files',
    'Excel · Word · PDF · CSV · نصوص · صور — حتى ١٢ ملفًا': 'Excel · Word · PDF · CSV · text · images — up to 12 files',
    'صور • فيديو • PDF • Word • Excel • أي ملف — تُحفظ داخل متصفحك على هذا الجهاز':
      'Images • video • PDF • Word • Excel • any file — stored inside your browser on this device',
    '📁 مكتبة الملفات': '📁 File library',
    '١) ارفع نماذج خطاباتك': '1) Upload your letter samples',
    '٢) اطلب خطابًا جديدًا بأسلوبك': '2) Request a new letter in your style',
    '١) اكتب كل ما لديك عن المشروع — فكرته، أرقامه، أسئلتك':
      '1) Write everything you have about the project — the idea, the numbers, your questions',
    '٢) أرفق ملفاتك (اختياري) — يقرؤها ويستخرج منها الأرقام':
      '2) Attach your files (optional) — it reads them and extracts the numbers',
    '١) صف التصميم الذي تريده': '1) Describe the design you want',
    '١) ماذا تريد أن أصمّم؟': '1) What would you like me to design?',
    '٢) نوع المساحة': '2) Surface type',
    '٢) نوع المخرج المطلوب': '2) Output type',
    '٣) مراجع بصرية (اختياري) — صورة سيارتك، شعارك، أو تصميم يعجبك':
      '3) Visual references (optional) — a photo of your vehicle, your logo, or a design you like',
    '١) الصق البيانات (إن كان المخرج يحتاج بيانات) — أول صف عناوين':
      '1) Paste the data (if the output needs data) — first row is headers',

    /* ===== أنواع المخرجات ===== */
    'تلقائي (يختار الأنسب)': 'Automatic (picks the best fit)',
    'جدول': 'Table',
    'رسم أعمدة': 'Bar chart',
    'رسم خطي': 'Line chart',
    'رسم بياني': 'Chart',
    'بطاقات مؤشرات': 'KPI tiles',
    '🚚 جانب دينا': '🚚 Truck side',
    '🚌 جانب باص': '🚌 Bus side',
    '🚐 خلفية مركبة': '🚐 Vehicle rear',
    '🪧 لوحة إعلانية': '🪧 Billboard',
    '📱 منشور سوشيال': '📱 Social post',
    '📲 ستوري': '📲 Story',
    '📄 بروشور A4': '📄 A4 brochure',
    'مربّع (سوشيال)': 'Square (social)',
    'عمودي (ستوري / بوستر)': 'Portrait (story / poster)',
    'عريض ٣:٢ (بانر)': 'Wide 3:2 (banner)',
    '🧩 عمود': '🧩 Column',
    '✨ شعار': '✨ Logo',
    'أضِف شعار مبادرة أثر': 'Add the Athar Initiative logo',

    /* ===== المزامنة والنسخ الاحتياطي ===== */
    '☁️ مزامنة': '☁️ Sync',
    '☁️ غير متصل': '☁️ Offline',
    'ارفع بيانات هذا الجهاز': 'Upload this device’s data',
    'اسحب أحدث البيانات': 'Pull the latest data',
    'نزّل نسخة احتياطية كاملة': 'Download a full backup',
    'استعد من نسخة احتياطية': 'Restore from a backup',
    'رفع المرفقات المحلية إلى السحابة': 'Upload local attachments to the cloud',
    '📚 سجل النسخ': '📚 Version history',
    'البيانات تُحفظ محليًا في متصفحك على هذا الجهاز.':
      'Data is stored locally in your browser on this device.',

    /* ===== الصلاحيات والدخول ===== */
    '🔑 الصلاحيات': '🔑 Permissions',
    '🔑 إدارة الموظفين والأدوار': '🔑 Manage employees & roles',
    '🔐 تسجيل دخول آمن عبر Firebase.': '🔐 Secure sign-in via Firebase.',
    '🔑 نسيت كلمة المرور / تعيينها لأول مرة': '🔑 Forgot password / set it for the first time',
    'الموظف الجديد: اطلب من المدير دعوتك، ثم افتح الرابط في بريدك وعيّن كلمة مرورك.':
      'New employee: ask your manager to invite you, then open the link in your email and set your password.',
    'عيّن دور كل موظف (مدير/موظف/سكرتير). المالك مدير دائمًا.':
      'Assign each employee a role (manager/employee/secretary). The owner is always a manager.',
    'مدير': 'Manager',
    'موظف': 'Employee',
    'سكرتير': 'Secretary',

    /* ===== التقويم ===== */
    '🔗 الربط التلقائي بتقويم Google': '🔗 Automatic Google Calendar link',
    '🔓 اربط حسابي في Google': '🔓 Connect my Google account',
    '⚙️ ربط تقويم Google': '⚙️ Google Calendar setup',
    'التقويم: غير مربوط': 'Calendar: not connected',
    'فصل الربط': 'Disconnect',
    'غير مفعّل': 'Not enabled',
    'تذكير بريدي قبل ساعتين': 'Email reminder two hours before',
    'تسجيل صوتي': 'Voice recording',
    'الإذن صالح لساعة، فإذا أُغلقت اللوحة اضغط «اربط حسابي» ضغطة واحدة (بدون إعادة الموافقة).':
      'The permission lasts one hour; if the dashboard is closed, just click “Connect my account” once (no re-approval needed).',
    '— بدون فتح نوافذ.': '— with no pop-up windows.',
    'زر «إضافة للتقويم» ينشئ الاجتماع مباشرةً في تقويمك مع': 'The “Add to calendar” button creates the meeting directly in your calendar with',

    /* ===== الذروة ===== */
    'اختر المنصة (أو أكثر من منصة) التي تريد معرفة أفضل وقت للنشر فيها:':
      'Choose the platform (or platforms) you want the best posting time for:',
    '🔎 بحث / عرض أفضل وقت': '🔎 Search / show the best time',
    '👆 اضغط أي خانة في الجدول لرفع/خفض مستوى النشاط وحفظه.':
      '👆 Click any cell in the table to raise/lower the activity level and save it.',
    'سناب شات': 'Snapchat',
    'تيك توك': 'TikTok',
    'إنستقرام': 'Instagram',
    'ذروة': 'Peak',
    'التكلفة/نتيجة': 'Cost/result',

    /* ===== التصميم ===== */
    '🔁 «طوّر» يبني على النسخة الحالية ولا يبدأ من الصفر — كل ما أعجبك يبقى كما هو.':
      '🔁 “Improve” builds on the current version rather than starting over — everything you liked stays as it is.',
    'لجمع الملابس المستعملة — يصلك مندوبنا مجانًا':
      'For collecting used clothes — our representative comes to you free of charge',

    /* ===== الرسوم والتقارير ===== */
    'مقارنة الإيراد والتشغيل وصافي الربح (شهريًا)': 'Revenue vs. operating cost vs. net profit (monthly)',
    'التدفق النقدي التراكمي ونقطة الاسترداد': 'Cumulative cash flow and payback point',

    /* ===== أمثلة الحقول ===== */
    'مثال: حملة الحي الشرقي': 'e.g. East District campaign',
    'مثال: تبرعات الربع الأول': 'e.g. Q1 donations',
    'مثال: سناب شات، نموذج، واتساب': 'e.g. Snapchat, form, WhatsApp',
    'مثال: رواتب، وقود، إيجار': 'e.g. salaries, fuel, rent',
    'مثال: اجتماع مع مستودع التبرعات': 'e.g. meeting with the donations warehouse',
    'مثال: أمانة منطقة الرياض': 'e.g. Riyadh Municipality',
    'مثال: طلب دعم حملة جمع التبرعات': 'e.g. request to support the donation drive',
    'مثال: جهات شراء السكراب': 'e.g. scrap buyers',
    'مثال: طلب تبرع أثاث من حي...': 'e.g. furniture donation request from the … district',
    'مثال: مشروع إعادة تدوير الإسفنج': 'e.g. foam recycling project',
    'مثال: تصميم تطبيق يربط المتبرع بالمستودع': 'e.g. an app connecting the donor to the warehouse',
    'تفاصيل، أسعار، أرقام تواصل...': 'Details, prices, contact numbers...',
    'تفاصيل، مكان، رابط...': 'Details, location, link...',
    'الشهر,التبرعات — ثم كل صف في سطر': 'Month,Donations — then one row per line',
    'الصنف,الكمية,السعر — ثم كل صنف في سطر': 'Item,Quantity,Price — then one item per line',
    'الصق بياناتك (من Excel أو CSV — أعمدة مفصولة بفاصلة أو Tab، وأول صف عناوين)':
      'Paste your data (from Excel or CSV — columns separated by comma or Tab, first row is headers)',
    'اكتب طلبك بالعربية كما تشرحه لموظف، وسيفهمه ويُنفّذه. إن لصقت بيانات في الحقل الأول أعلاه فسيُحلّلها معك.':
      'Write your request in plain language, as you would explain it to a colleague, and it will understand and carry it out. If you paste data in the first field above, it will analyse that too.',
    'رابط الوسيط (Cloudflare Worker)': 'Proxy URL (Cloudflare Worker)',
    'الحملة': 'Campaign',
    'تسجيل حملة جديدة': 'Record a new campaign',
    'ℹ️ الأرقام هنا': 'ℹ️ The figures here',
    'وتُحدَّث يدويًا (يُفضّل أسبوعيًا) من تقارير': 'and are updated manually (weekly is best) from the reports of',
    'العدّ اللحظي الحقيقي لعدد المستخدمين يتطلّب ربطًا برمجيًا (API) وخادمًا؛ أمّا هذه الأداة فتعمل بالكامل داخل متصفحك.':
      'A true live user count requires an API and a server; this tool runs entirely inside your browser.',
    '☁️ الحفظ حاليًا داخل متصفحك على هذا الجهاز. الحفظ على السحابة ومشاركة الخطابات بين الموظفين سيُفعَّل عند استضافة اللوحة.':
      '☁️ Storage is currently inside your browser on this device. Cloud storage and letter sharing between employees will be enabled once the dashboard is hosted.',
    'ارفع خطاباتك الجاهزة (شكر على تبرع، طلب شراكة، استلام تبرع…) بصيغة':
      'Upload your existing letters (thanks for a donation, partnership request, donation receipt…) in',
    'أو صورة —': 'or an image —',
    'يقرؤها ويستخلص أسلوبك وصيغك الرسمية، ثم يكتب لك خطابات جديدة':
      'it reads them, extracts your style and formal phrasing, then writes new letters for you',
    'الرابط مضبوط مسبقًا ولا يحتاج تغييرًا. مفتاح Claude محفوظ مشفَّرًا داخل الوسيط ولا يظهر هنا إطلاقًا،':
      'The URL is preset and needs no change. The Claude key is stored encrypted inside the proxy and never appears here,',
    'والوسيط يرفض أي طلب لا يأتي من مستخدم مسجَّل دخوله في اللوحة.':
      'and the proxy rejects any request that does not come from a user signed in to the dashboard.',
    'مثال: حلّل تبرعات الأشهر الستة أعلاه، وحدّد أفضل شهر لتكثيف الحملات مع السبب':
      'e.g. analyse the six months of donations above and identify the best month to intensify campaigns, with the reason',
    'مثال: خطاب شكر لشركة الراجحي للأثاث على تبرعها بـ 40 قطعة أثاث، وذكر أثر التبرع على 15 أسرة':
      'e.g. a thank-you letter to Al-Rajhi Furniture for donating 40 pieces of furniture, noting the impact on 15 families',
    'مثال: بانر لمبادرة أثر لجمع الملابس المستعملة. خلفية عصرية بأجهزة كهربائية وملابس مطوية، ألوان أخضر وذهبي، مساحة فارغة يمين اللوحة للنصوص.':
      'e.g. a banner for the Athar Initiative collecting used clothes. Modern background with appliances and folded clothes, green and gold colours, empty space on one side for text.',
    'مثال: ملصق لجانب دينا نقل التبرعات. شعار «مبادرة أثر» كبير على اليمين، وجملة «تبرعك العيني يصنع أثرًا» بخط ضخم، ورقم واتساب أسفل. الألوان أخضر وذهبي، وطابع عصري نظيف.':
      'e.g. a wrap for the side of a donations truck. Large “Athar Initiative” logo on one side, the line “your in-kind donation makes an impact” in a huge font, and a WhatsApp number below. Green and gold, clean and modern.',
    'مثال: نريد إنشاء ورشة لإعادة تدوير الأثاث المتبرَّع به في الرياض. المتوقع استئجار مستودع بـ 4000 ريال شهريًا، وتوظيف 3 عمال براتب 3500 لكل واحد، وشراء معدات بـ 60 ألف ريال. نستقبل تقريبًا 200 قطعة شهريًا ونبيع المُصلَح منها بمتوسط 250 ريال. هل المشروع مجدٍ؟ وما نقطة التعادل؟':
      'e.g. we want to set up a workshop to recycle donated furniture in Riyadh. We expect to rent a warehouse for SAR 4,000/month, hire 3 workers at SAR 3,500 each, and buy equipment for SAR 60,000. We receive roughly 200 pieces a month and sell the repaired ones at an average of SAR 250. Is the project viable? What is the break-even point?',

    /* ===== حالات الفراغ ===== */
    'لا توجد حملات بعد.': 'No campaigns yet.',
    'لا توجد حركات بعد.': 'No entries yet.',
    'لا توجد مهام بعد.': 'No tasks yet.',
    'لا توجد مهام أو اجتماعات بعد.': 'No tasks or meetings yet.',
    'لا توجد خطابات محفوظة بعد.': 'No saved letters yet.',
    'لا توجد طلبات بعد.': 'No requests yet.',
    'لا توجد عناصر بحث بعد.': 'No research items yet.',
    'لا توجد بيانات.': 'No data.',
    'لا توجد نتيجة.': 'No result.',
    'لا توجد قيود بعد — اضغط «＋ صف» للبدء.': 'No entries yet — click “＋ Row” to start.',
    'لا توجد نماذج بعد.': 'No templates yet.',
    'لا توجد أعمدة رقمية للتحليل.': 'No numeric columns to analyse.',
    'الصق بيانات أولًا للاختيار التلقائي.': 'Paste data first for automatic selection.',
    'الصق بيانات لعرض المخرج المطلوب.': 'Paste data to display the requested output.',
    'لا يوجد موظفون بعد.': 'No employees yet.',
    'جارٍ التحميل...': 'Loading...',

    /* ===== أزرار داخل الصفوف ===== */
    'عرض': 'View', 'فتح': 'Open', 'نسخ': 'Copy', 'استعادة': 'Restore', 'إلغاء': 'Cancel',
    'إضافة': 'Add', 'التصدير': 'Export', 'تصدير Excel': 'Export Excel',
    '✏️ تعديل': '✏️ Edit', '👁️ فتح': '👁️ Open', '📋 نسخ': '📋 Copy',
    '⬇️ تنزيل': '⬇️ Download', '⬇️ تنزيل PNG': '⬇️ Download PNG',
    '↗️ فتح في تبويب': '↗️ Open in a tab', '↗️ يدويًا': '↗️ Manually',
    '📎 إرفاق': '📎 Attach', 'إرفاق ملف': 'Attach a file', 'إرفاق فاتورة': 'Attach an invoice',
    '🗑️ إزالة المرفق': '🗑️ Remove attachment',
    '✔️ إنجاز': '✔️ Done', '↩️ تراجع': '↩️ Undo',
    '✉️ إرسال لبريدي': '✉️ Send to my email', 'فتح الحدث': 'Open the event',
    '📧 إعادة إرسال الدعوة': '📧 Resend the invitation',
    '💾 حفظ الصلاحية': '💾 Save permission',
    '➕ إضافة/تعديل صلاحية موظف': '➕ Add / edit an employee permission',
    'الموظفون وصلاحياتهم': 'Employees and their permissions',
    'بريد الموظف': 'Employee email',
    'الدور': 'Role',
    'الأقسام التي يراها': 'Sections they can see',
    '(افتراضي الدور)': '(role default)',
    '👁️ قراءة فقط': '👁️ Read only',
    '— قراءة فقط': ' — read only',
    'حذف العمود': 'Delete column',
    'عمود مخصّص': 'Custom column',
    '＋ بند': '＋ Item',

    /* ===== رؤوس الجداول ===== */
    'م': '#', 'رقم': 'No.', 'البند': 'Item', 'القيمة': 'Value', 'الشهر': 'Month',
    'الساعة': 'Hour', 'المرفق': 'Attachment', 'رقم الفاتورة': 'Invoice no.',
    'مدين': 'Debit', 'دائن': 'Credit', 'التفاصيل': 'Details', 'ملاحظات': 'Notes',
    'اليوم / الوقت': 'Day / time', 'وصف البند': 'Item description', 'اسم البند': 'Item name',
    'ريال': 'SAR', 'حرفًا': 'characters', 'شهرًا': 'months', 'ملف': 'file', 'نص': 'text',
    'ك.ب': 'KB', 'م.ب': 'MB', 'ج.ب': 'GB', 'ب': 'B',
    'غير مصنّف': 'Uncategorised',

    /* ===== أيام وأوقات ===== */
    'الأحد': 'Sunday', 'الإثنين': 'Monday', 'الثلاثاء': 'Tuesday', 'الأربعاء': 'Wednesday',
    'الخميس': 'Thursday', 'الجمعة': 'Friday', 'السبت': 'Saturday',
    '١٢–٤ فجرًا': '12–4 am', '٤–٨ صباحًا': '4–8 am', '٨–١٢ ظهرًا': '8–12 noon',
    '١٢–٤ عصرًا': '12–4 pm', '٤–٨ مساءً': '4–8 pm', '٨–١٢ ليلًا': '8–12 midnight',
    'بدون موعد محدّد': 'No specific time',
    '— بدون وقت —': '— no time —',
    'تويتر (X)': 'Twitter (X)', 'فيسبوك': 'Facebook',

    /* ===== المؤشرات المالية ===== */
    'الإيراد': 'Revenue', 'الإيراد الشهري': 'Monthly revenue',
    'الإيراد الشهري المتوقّع': 'Expected monthly revenue',
    'التشغيل': 'Operating', 'التشغيل الشهري': 'Monthly operating cost',
    'صافي الربح الشهري': 'Monthly net profit', 'هامش الربح': 'Profit margin',
    'نقطة التعادل الشهرية': 'Monthly break-even', 'فترة الاسترداد': 'Payback period',
    'العائد السنوي ROI': 'Annual ROI', 'التدفق النقدي التراكمي': 'Cumulative cash flow',
    'إجمالي التكلفة الرأسمالية': 'Total capital cost',
    'التكاليف الرأسمالية (لمرة واحدة)': 'Capital costs (one-off)',
    'التكاليف التشغيلية الشهرية': 'Monthly operating costs',
    'المبلغ الوارد إليك': 'Amount received', 'المبلغ المصروف': 'Amount spent',
    'المؤشرات الرئيسية': 'Key indicators',
    '✅ التوصية النهائية': '✅ Final recommendation',
    'الأسباب': 'Reasons',
    '⚠️ المخاطر وإجراءات التخفيف': '⚠️ Risks and mitigations',
    '🧾 الافتراضات وما ينقص من بيانات': '🧾 Assumptions and missing data',
    'دراسة جدوى': 'Feasibility study',
    'قرارات التصميم': 'Design decisions', 'خطوات التطوير': 'Improvement steps',
    'لوحة الألوان': 'Colour palette', 'المراجع البصرية': 'Visual references',
    'تصميم': 'Design', 'شعار': 'Logo', 'صمّم': 'Design',
    'طوّر النسخة الحالية': 'Improve the current version',
    'انقد وحسّن': 'Critique & improve',
    'سجل النسخ': 'Version history', 'التعديل المباشر': 'Inline editing',
    '✏️ ضبط العناصر': '✏️ Adjust elements',
    'خطاب': 'Letter', 'خطاب جديد': 'New letter', 'تعديل الخطاب': 'Edit letter',
    'إضافة قيد جديد': 'Add a new entry',

    /* ===== قوالب الخطابات ===== */
    'خطاب طلب دعم / تبرع': 'Support / donation request letter',
    'خطاب شكر وتقدير': 'Thank-you and appreciation letter',
    'تفويض مندوب لاستلام التبرعات': 'Authorisation of a representative to collect donations',
    'مخاطبة جهة حكومية (تسهيل مهمة)': 'Letter to a government body (facilitation request)',
    'طلب شراكة / تعاون': 'Partnership / cooperation request',

    /* ===== رسائل التنبيه ===== */
    '⚠️ سجّل دخولك أولًا.': '⚠️ Sign in first.',
    '⚠️ اكتب طلبك أولًا.': '⚠️ Write your request first.',
    '⚠️ اكتب ما تريد تصميمه.': '⚠️ Describe what you want designed.',
    '⚠️ اكتب ما تريده في الخطاب.': '⚠️ Describe what you want in the letter.',
    '⚠️ اكتب وصف المشروع أو أرفق ملفًا.': '⚠️ Describe the project or attach a file.',
    '⚠️ اكتب اسم العمود.': '⚠️ Enter the column name.',
    '⚠️ صف التصميم أولًا.': '⚠️ Describe the design first.',
    '⚠️ ارفع نماذجك أولًا.': '⚠️ Upload your templates first.',
    '⚠️ ارفع نموذجًا واحدًا على الأقل ليتعلّم أسلوبك.':
      '⚠️ Upload at least one sample so it can learn your style.',
    '⚠️ أدخل بريد الموظف.': '⚠️ Enter the employee’s email.',
    '⚠️ اختر قسمًا واحدًا على الأقل.': '⚠️ Choose at least one section.',
    '⚠️ أدخل رقمًا صحيحًا في خانة المبالغ.': '⚠️ Enter a valid number in the amount field.',
    '⚠️ بريد غير صحيح.': '⚠️ Invalid email.',
    '⚠️ الحد ٢٠ نموذجًا.': '⚠️ The limit is 20 templates.',
    '⚠️ الحد الأقصى ١٢ ملفًا.': '⚠️ Maximum 12 files.',
    '⚠️ الحد الأقصى ٨ أعمدة مخصّصة.': '⚠️ Maximum 8 custom columns.',
    '⚠️ يوجد عمود بهذا الاسم.': '⚠️ A column with that name already exists.',
    '⚠️ يجب أن يبدأ الرابط بـ https://': '⚠️ The URL must start with https://',
    '⚠️ الصق الـ Client ID أولًا ثم اضغط حفظ.': '⚠️ Paste the Client ID first, then click Save.',
    '⚠️ لا توجد نسخة لتطويرها — صمّم أولًا.': '⚠️ There is no version to improve — design one first.',
    '⚠️ المرفق غير موجود — ربما حُذف من هذا الجهاز.':
      '⚠️ The attachment is missing — it may have been deleted from this device.',
    '⚠️ تعذّر الاتصال بـ Firebase.': '⚠️ Could not connect to Firebase.',
    '⚠️ تعذّر الرفع — راجع قواعد Firestore.': '⚠️ Upload failed — check your Firestore rules.',
    '⚠️ تعذّر النسخ.': '⚠️ Copy failed.',
    '⚠️ تعذّر بدء التسجيل.': '⚠️ Could not start recording.',
    '⚠️ لم يتم منح الإذن.': '⚠️ Permission was not granted.',
    '⚠️ تعذّر تحويل PNG — نزّل SVG بدلًا منه.': '⚠️ PNG conversion failed — download the SVG instead.',
    '⚠️ الدراسة طويلة واقتُطع آخرها — قسّم الطلب.':
      '⚠️ The study is long and was cut off — split the request.',
    '⚠️ التصميم طويل واقتُطع — بسّط الطلب.': '⚠️ The design is long and was cut off — simplify the request.',
    '⚠️ لم تُحمّل مكتبة Google (تحقّق من الإنترنت وحدّث الصفحة).':
      '⚠️ The Google library did not load (check your connection and refresh).',
    '⚠️ محلي فقط': '⚠️ Local only',
    '⚠️ كلمة المرور المؤقتة مرفوضة — أعد المحاولة.': '⚠️ The temporary password was rejected — try again.',
    '⚠️ قواعد Firestore تمنع الرفع — راجع الإعداد. حُفظ محليًا مؤقتًا.':
      '⚠️ Firestore rules block the upload — check the setup. Saved locally for now.',
    '🔒 ليس لديك صلاحية على هذا القسم — راجع المدير.':
      '🔒 You do not have permission for this section — contact your manager.',

    /* ===== رسائل النجاح والانتظار ===== */
    '✅ نُسخت النتيجة.': '✅ Result copied.',
    '✅ نُزّل ملف CSV.': '✅ CSV file downloaded.',
    '✅ نُزّل الملف — افتحه بـ Excel.': '✅ File downloaded — open it in Excel.',
    '✅ كل شيء محدَّث.': '✅ Everything is up to date.',
    '✅ لا توجد مرفقات محلية — كل شيء في السحابة.': '✅ No local attachments — everything is in the cloud.',
    '✅ حُفظت النماذج — متاحة على كل أجهزتك.': '✅ Templates saved — available on all your devices.',
    '✅ تم حفظ رابط الوسيط.': '✅ Proxy URL saved.',
    '✅ تم الحفظ. اضغط «اربط حسابي في Google».': '✅ Saved. Now click “Connect my Google account”.',
    '✅ تم الربط بنجاح — صار بإمكانك إضافة الاجتماعات تلقائيًا.':
      '✅ Connected successfully — you can now add meetings automatically.',
    '✅ التقويم مربوط تلقائيًا — جاهز للإضافة.': '✅ Calendar connected automatically — ready to add.',
    '✅ تم إدراج ما قلته.': '✅ What you said has been inserted.',
    '✅ استُعيدت النسخة ورُفعت للسحابة.': '✅ The version was restored and uploaded to the cloud.',
    '⬇️ نُزّل التصميم.': '⬇️ Design downloaded.',
    '⬇️ نُزّلت نسخة كاملة من بياناتك.': '⬇️ A full copy of your data has been downloaded.',
    '⬇️ نُزّل SVG — افتحه في Illustrator أو أرسله للمطبعة.':
      '⬇️ SVG downloaded — open it in Illustrator or send it to the printer.',
    '📝 فُتح في المحرّر — عدّله واحفظه.': '📝 Opened in the editor — edit and save it.',
    '📂 فُتحت النسخة — اضغط «طوّر» للبناء عليها.':
      '📂 Version opened — click “Improve” to build on it.',
    '🗑️ أُزيل المرفق.': '🗑️ Attachment removed.',
    '🗑️ تم مسح الرابط.': '🗑️ URL cleared.',
    '🗑️ تم مسح الـ Client ID.': '🗑️ Client ID cleared.',
    '🔄 وصل تحديث من جهاز آخر.': '🔄 An update arrived from another device.',
    '🔄 مباشر': '🔄 Live',
    '☁️ متزامن': '☁️ Synced',
    '☁️ جارٍ الرفع للسحابة...': '☁️ Uploading to the cloud...',
    '☁️ جارٍ الجلب من السحابة...': '☁️ Fetching from the cloud...',
    '☁️ محفوظ في السحابة — يظهر على كل الأجهزة':
      '☁️ Saved in the cloud — visible on all devices',
    '💾 محفوظ على هذا الجهاز فقط': '💾 Saved on this device only',
    '⏳ مزامنة...': '⏳ Syncing...',
    '⏳ جارٍ الإرسال...': '⏳ Sending...',
    '⏳ جارٍ قراءة الملفات...': '⏳ Reading the files...',
    '⏳ جارٍ قراءة الخطابات...': '⏳ Reading the letters...',
    '⏳ جارٍ فتح نافذة إذن Google...': '⏳ Opening the Google permission window...',
    '⏳ انتهت صلاحية الإذن — جارٍ التجديد تلقائيًا...':
      '⏳ The permission expired — renewing automatically...',
    '⏳ جارٍ تجديد الإذن ثم الإضافة...': '⏳ Renewing permission, then adding...',
    '🎙️ جارٍ الاستماع... تكلّم الآن': '🎙️ Listening... speak now',
    '🔓 اربط حسابك في Google أولًا (مرة واحدة).': '🔓 Connect your Google account first (once).',
    '🔒 تم فصل الربط. لن يُربط تلقائيًا بعد الآن حتى تضغط «اربط حسابي».':
      '🔒 Disconnected. It will not connect automatically until you click “Connect my account”.',
    'جارٍ الدخول...': 'Signing in...',
    'جارٍ التصميم...': 'Designing...',
    'جارٍ تطوير النسخة الحالية...': 'Improving the current version...',
    'جارٍ إعداد دراسة الجدوى...': 'Preparing the feasibility study...',
    'يحلّل ويحسب المؤشرات...': 'Analysing and computing the indicators...',
    'يفكّر في التكوين...': 'Thinking about the composition...',
    'يكتب الدراسة...': 'Writing the study...',
    'يرسم...': 'Drawing...',
    'يكتب...': 'Writing...',
    'تم حفظ الخطاب ✅': 'Letter saved ✅',
    'جاهز ✅': 'Ready ✅',
    'التقويم: مربوط ✅': 'Calendar: connected ✅',
    'التقويم: يحتاج إذن': 'Calendar: permission needed',

    /* ===== رسائل الدخول ===== */
    'أدخل البريد وكلمة المرور': 'Enter your email and password',
    'البريد أو كلمة المرور غير صحيحة': 'Incorrect email or password',
    'كلمة المرور غير صحيحة': 'Incorrect password',
    'لا يوجد حساب بهذا البريد': 'No account with this email',
    'لا يوجد حساب بهذا البريد — اطلب من المدير دعوتك أولًا.':
      'No account with this email — ask your manager to invite you first.',
    'الحساب موقوف': 'The account is suspended',
    'محاولات كثيرة، انتظر قليلًا': 'Too many attempts, wait a moment',
    'تحقّق من اتصال الإنترنت': 'Check your internet connection',
    'خطأ غير معروف': 'Unknown error',
    'بريد غير صحيح': 'Invalid email',
    'اكتب بريدك في الحقل أعلاه أولًا، ثم اضغط هنا.':
      'Type your email in the field above first, then click here.',
    'لم تُحمّل مكتبة Firebase (تأكّد من اتصال الإنترنت)':
      'The Firebase library did not load (check your internet connection)',

    /* ===== تأكيدات ===== */
    'حذف هذا القيد؟': 'Delete this entry?',
    'حذف هذه النسخة؟': 'Delete this version?',
    'إزالة المرفق من هذا القيد؟': 'Remove the attachment from this entry?',
    'أرفق صورة الفاتورة أو أي ملف': 'Attach a photo of the invoice or any file',
    'أين حُفظ المرفق؟': 'Where was the attachment saved?',

    /* ===== عناوين مربّعات الشرح ===== */
    '❓ شرح أدوات الدفتر': '❓ Ledger tools explained',
    '❓ كيف تعمل «نماذجي»': '❓ How “My templates” works',
    '❓ كيف يعمل استوديو التصميم': '❓ How the design studio works',
    '❓ كيف يعمل التصميم بالصور': '❓ How image-based design works',
    'ما وظيفة هذه الأداة؟': 'What does this tool do?',
    'كيف تعمل؟': 'How does it work?',
    'الفرق بين مدين ودائن': 'The difference between debit and credit',
    'لماذا متجهي وليس صورة؟': 'Why vector rather than an image?',
    'ما استخلصته من أسلوبك:': 'What was learnt from your style:',
    'يضيف سطرًا فارغًا في نهاية الجدول وينقلك للكتابة فيه مباشرة.':
      'Adds an empty row at the end of the table and takes you straight to it.',
    'يفتح نسخة بيضاء منسّقة للطباعة أو الحفظ كـ PDF.':
      'Opens a clean white version formatted for printing or saving as PDF.',
    'ينزّل الجدول بصيغة CSV تفتحها بـ Excel مباشرة بترميز عربي سليم.':
      'Downloads the table as CSV that opens directly in Excel with correct Arabic encoding.',
    'يبحث عن كل مرفق محفوظ محليًا ويرفعه للسحابة دفعة واحدة.':
      'Finds every locally stored attachment and uploads them all to the cloud at once.',
    'لتسجيل معلومة إضافية غير موجودة — مثل اسم المورّد أو طريقة الدفع.':
      'For recording extra information that has no column — such as the supplier name or payment method.',
    'مثل «اسم المورّد» أو «طريقة الدفع» أو «الموقع».':
      'Such as “supplier name”, “payment method” or “location”.',
    'اضغط أي خانة واكتب فيها — تُحفظ فور خروجك منها. زر Enter ينهي التعديل.':
      'Click any cell and type in it — it saves as soon as you leave. Enter finishes the edit.',
    'زر «حذف» في آخر كل صف يمسح القيد، و«×» في رأس العمود يمسح العمود.':
      'The “Delete” button at the end of each row removes the entry; the “×” in the column header removes the column.',
    'يجمع محرّكين ليعطيك أفضل ما فيهما:': 'It combines two engines to give you the best of both:',
    'مثال: اسم المورّد': 'e.g. supplier name',
    'طريقة الدفع، التاريخ، المصدر...': 'Payment method, date, source...',
    'اكتب اسم الحملة': 'Enter the campaign name',
    'اكتب العنوان أو سجّله صوتيًا': 'Type the title or record it by voice',
    'اكتب الفكرة أو المهمة': 'Enter the idea or task',
    'اكتب موضوع البحث': 'Enter the research topic',
    'اكتب عنوان/موضوع الخطاب': 'Enter the letter title/subject',
    'اكتب نص الخطاب': 'Write the letter body',
    'اكتب وصف الطلب': 'Enter the request description',
    'أدخل مبلغًا صحيحًا': 'Enter a valid amount',
    'الصق البيانات أولًا': 'Paste the data first',
    'أدخل صف عناوين وصفًا واحدًا على الأقل': 'Enter a header row and at least one data row',
    'اختر منصة واحدة على الأقل ثم اضغط بحث': 'Choose at least one platform, then click Search',
    'لا توجد حركات للتصدير': 'No entries to export',
    'لا توجد بيانات محلّلة للتصدير': 'No analysed data to export',
    'لا يوجد نص لتصديره': 'No text to export',
    'لا يوجد نص لطباعته': 'No text to print',
    'مكتبة Word لم تُحمّل — تحقّق من الإنترنت': 'The Word library did not load — check your connection',
    'مكتبة Excel لم تُحمّل — تحقّق من الإنترنت': 'The Excel library did not load — check your connection',
    'مكتبة PDF لم تُحمّل — تحقّق من الإنترنت': 'The PDF library did not load — check your connection',
    'متصفحك لا يدعم البث — حدّثه أو استخدم Chrome.':
      'Your browser does not support streaming — update it or use Chrome.',
    'انقطع البث.': 'The stream was interrupted.',
    'تعذّر تفسير الخطاب. أعد المحاولة.': 'Could not interpret the letter. Try again.',
    'تعذّر تفسير مخرجات التصميم. أعد المحاولة.': 'Could not interpret the design output. Try again.',
    'تعذّر تفسير مخرجات الدراسة. أعد المحاولة.': 'Could not interpret the study output. Try again.',
    'لم يُرجع النموذج تصميمًا صالحًا. أعد المحاولة.': 'The model did not return a valid design. Try again.',
    'لم يُرجع النموذج نصًّا. أعد صياغة الطلب.': 'The model returned no text. Rephrase the request.',
    'اعتذر النموذج عن تنفيذ هذا الطلب. أعد صياغته.':
      'The model declined this request. Rephrase it.',
    'تعذّرت قراءة الملف': 'Could not read the file',
    'تعذّرت قراءة الصورة': 'Could not read the image',
    'تعذّرت القراءة': 'Could not read it',
    'تعذّر فتح مخزن المرفقات': 'Could not open the attachment store',
    'تعذّر تحميل صورة': 'Could not load an image',
    'ملف غير نصّي وغير مدعوم': 'Not a text file and not supported',
    'صيغة doc القديمة غير مدعومة — احفظه بصيغة docx':
      'The old .doc format is not supported — save it as .docx',
    'PDF مصوَّر بلا نص — صوّره كصورة وأرفقها':
      'Scanned PDF with no text — capture it as an image and attach that',
    'الملف ليس نسخة أثر': 'This file is not an Athar backup',
    'المرفق غير موجود في السحابة': 'The attachment is not in the cloud',
    'المرفق ناقص — أعد رفعه': 'The attachment is incomplete — upload it again',
    'سجّل دخولك في اللوحة أولًا.': 'Sign in to the dashboard first.',
  };

  /* ===== المحرّك ===== */
  const ATTRS = ['placeholder', 'title', 'alt', 'aria-label'];
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE', 'PRE']);
  const origText = new WeakMap();   /* عقدة نصية → نصّها العربي الأصلي */
  const origAttr = new WeakMap();   /* عنصر → { سمة: قيمتها العربية } */
  let lang = 'ar';
  let observer = null;

  const norm = (s) => s.replace(/\s+/g, ' ').trim();

  function translateTextNode(n) {
    const parent = n.parentNode;
    if (!parent || SKIP.has(parent.nodeName)) return;
    if (lang === 'ar') {
      if (origText.has(n)) { n.nodeValue = origText.get(n); origText.delete(n); }
      return;
    }
    if (origText.has(n)) return;              /* مُترجَمة أصلًا */
    const raw = n.nodeValue;
    const en = AR2EN[norm(raw)];
    if (!en) return;
    origText.set(n, raw);
    /* نحافظ على المسافات المحيطة كما كانت */
    n.nodeValue = raw.replace(norm(raw), en);
    if (n.nodeValue === raw) n.nodeValue = en;
  }

  function translateAttrs(el) {
    if (lang === 'ar') {
      const saved = origAttr.get(el);
      if (saved) { for (const a in saved) el.setAttribute(a, saved[a]); origAttr.delete(el); }
      return;
    }
    if (origAttr.has(el)) return;
    let saved = null;
    for (const a of ATTRS) {
      const v = el.getAttribute && el.getAttribute(a);
      if (!v) continue;
      const en = AR2EN[norm(v)];
      if (!en) continue;
      (saved || (saved = {}))[a] = v;
      el.setAttribute(a, en);
    }
    if (saved) origAttr.set(el, saved);
  }

  function walk(root) {
    if (root.nodeType === 3) { translateTextNode(root); return; }
    if (root.nodeType !== 1 || SKIP.has(root.nodeName)) return;
    translateAttrs(root);
    const it = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode: (n) =>
        (n.nodeType === 1 && SKIP.has(n.nodeName)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
    });
    let n;
    while ((n = it.nextNode())) {
      if (n.nodeType === 3) translateTextNode(n);
      else translateAttrs(n);
    }
  }

  let pending = null;
  function schedule(nodes) {
    if (pending) return;
    pending = requestAnimationFrame(() => { pending = null; nodes.forEach(walk); nodes.length = 0; });
  }

  function startObserver() {
    if (observer) return;
    const queue = [];
    observer = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === 'childList') m.addedNodes.forEach((n) => queue.push(n));
        else if (m.type === 'attributes' && m.target) queue.push(m.target);
      }
      if (queue.length) schedule(queue);
    });
    observer.observe(document.body, {
      childList: true, subtree: true,
      attributes: true, attributeFilter: ATTRS,
    });
  }

  function apply() {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    walk(document.body);
    const btn = document.getElementById('btn-lang');
    if (btn) {
      btn.textContent = lang === 'ar' ? '🌐 EN' : '🌐 ع';
      btn.title = lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية';
    }
    document.title = lang === 'ar' ? 'لوحة تحكم — مبادرة أثر' : 'Dashboard — Athar Initiative';
  }

  function set(l) {
    lang = (l === 'en') ? 'en' : 'ar';
    try { localStorage.setItem('athar_lang', lang); } catch (_) {}
    apply();
  }

  window.i18nToggle = () => set(lang === 'ar' ? 'en' : 'ar');
  window.i18nLang = () => lang;
  window.i18nApply = apply;

  function boot() {
    try { lang = localStorage.getItem('athar_lang') === 'en' ? 'en' : 'ar'; } catch (_) {}
    apply();
    startObserver();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
