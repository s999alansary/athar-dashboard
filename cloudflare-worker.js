/**
 * وسيط الذكاء الاصطناعي — مبادرة أثر
 * ------------------------------------------------------------
 * وظيفته: استقبال طلبات لوحة التحكم وتمريرها إلى Claude API،
 * بحيث يبقى مفتاح Anthropic مخزّنًا هنا على خادم Cloudflare
 * ولا يظهر أبدًا في صفحة اللوحة.
 *
 * الحماية: لا يُقبل أي طلب إلا بعد التحقق من أن المُرسِل
 * مستخدم مسجّل دخوله فعليًا في مشروع Firebase الخاص باللوحة.
 *
 * الأسرار المطلوب ضبطها في Cloudflare (Settings ← Variables ← Secrets):
 *   ANTHROPIC_API_KEY   مفتاح Anthropic (يبدأ بـ sk-ant-)
 *   FIREBASE_API_KEY    مفتاح Firebase Web (موجود في اللوحة، ليس سرًّا)
 *
 * الأوضاع:
 *   mode = "chat"        ردّ نصّي حر (المولّد العام)
 *   mode = "feasibility" دراسة جدوى منظّمة (JSON بمخطّط ثابت)
 */

const ALLOWED_ORIGINS = [
  'https://s999alansary.github.io',
];

const MODEL = 'claude-opus-5';
const MAX_TOKENS = 20000;

/* علامة إصدار — تظهر عند فحص الوسيط للتأكد من نشر آخر نسخة */
const WORKER_VERSION = 'v3-stream';

const BASE_CONTEXT = `أنت مساعد تحليلي لـ«مبادرة أثر»، وهو مشروع خيري سعودي متخصص في جمع التبرعات العينية وإعادة تدويرها لخدمة المحتاجين.

قواعد ثابتة:
- اكتب بالعربية الفصحى الواضحة دائمًا.
- حلّل ما أُعطي لك فعليًا ولا تخترع أرقامًا غير موجودة.
- إن كانت البيانات ناقصة، صرّح بذلك واذكر ما ينقص بدل التخمين.
- اجعل التوصيات عملية وقابلة للتنفيذ في سياق عمل خيري سعودي.
- العملة الافتراضية: الريال السعودي.`;

const CHAT_PROMPT = BASE_CONTEXT + `

- ابدأ بالخلاصة ثم التفصيل.
- استخدم جداول Markdown للمقارنات، وقوائم مرقّمة للخطوات.
- غطِّ المطلوب بدقة واختصار دون إطالة.`;

const DESIGN_PROMPT = `أنت مصمم جرافيك محترف يعمل لـ«مبادرة أثر»، مشروع خيري سعودي يجمع التبرعات العينية ويعيد تدويرها.

مهمتك: إنتاج تصميم **متجهي SVG** جاهز للطباعة أو النشر.

## قواعد الإخراج التقنية (إلزامية)
- أعِد SVG واحدًا صالحًا ومكتفيًا ذاتيًا، يبدأ بـ <svg وينتهي بـ </svg>.
- ضع دائمًا viewBox و xmlns="http://www.w3.org/2000/svg".
- ممنوع منعًا باتًا: <script>، أي سمة on*، <foreignObject>، أو أي رابط خارجي (لا صور ولا خطوط من الإنترنت).
- الخطوط: استخدم فقط font-family="Tahoma, Arial, sans-serif" أو "Georgia, serif" — لا خطوط من الويب.
- النص العربي: اكتبه كنص عربي عادي داخل <text> مع direction="rtl" و text-anchor مناسب. لا تقسّم الحروف.
- استخدم <defs> للتدرجات والأنماط المتكررة.
- اجعل الملف نظيفًا ومنظّمًا بمجموعات <g> مسمّاة بـ id واضح، ليسهل تعديله لاحقًا في Illustrator.

## مقاسات المركبات (نسب حقيقية)
- جانب دينا/شاحنة صغيرة: 4000×1800 مم → viewBox="0 0 4000 1800"
- جانب باص: 12000×3000 مم → viewBox="0 0 12000 3000"
- خلفية مركبة: 2000×1500 مم
- لوحة إعلانية: 3000×1000 مم
راعِ **مناطق الأمان**: لا تضع نصًا مهمًا في أول أو آخر 8% من العرض (تقطعه الأبواب والزوايا)، ولا في الثلث السفلي من جانب الباص (تحجبه العجلات والصناديق).

## مبادئ التصميم
- التسلسل البصري: عنصر واحد مهيمن، ثم ثانوي، ثم تفصيلي — لا تزاحم.
- على المركبات: النص يُقرأ من مسافة 20 مترًا وسرعة 60 كم/س، فاجعل الخط الرئيسي ضخمًا وسميكًا وعالي التباين.
- التزم بلوحة ألوان من 2–4 ألوان فقط + محايد.
- اترك مساحة بيضاء سخية — ازدحام التصميم يقتل قابلية القراءة.
- إن أُعطيت صورة مركبة أو شعارًا، استلهم منها الألوان والنسب وصرّح بذلك في قراراتك.

## التطوير التراكمي (مهم جدًا)
إن أُعطيت «النسخة السابقة»، فأنت **تطوّرها ولا تبدأ من الصفر**:
- احتفظ بالهوية: الألوان الأساسية، الشعار، البنية العامة، وما أعجب المستخدم.
- طبّق التعديل المطلوب بدقة وغيّر ما يلزم فقط.
- في حقل «القرارات» اذكر صراحةً ما أبقيته وما غيّرته ولماذا.

## الاقتراحات
في حقل «التحسينات» اقترح 3–4 خطوات تطوير محددة وقابلة للتنفيذ بضغطة واحدة (مثل: «كبّر الشعار 20% ليتوازن مع النص»)، لا نصائح عامة.`;

const DESIGN_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'concept', 'svg', 'palette', 'typography', 'decisions', 'improvements'],
  properties: {
    title: { type: 'string', description: 'اسم مختصر للتصميم' },
    concept: { type: 'string', description: 'الفكرة الإبداعية في جملتين' },
    svg: { type: 'string', description: 'كود SVG كاملًا ومكتفيًا ذاتيًا' },
    palette: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['hex', 'role'],
        properties: { hex: { type: 'string' }, role: { type: 'string' } },
      },
    },
    typography: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['font', 'usage'],
        properties: { font: { type: 'string' }, usage: { type: 'string' } },
      },
    },
    decisions: { type: 'array', description: 'قرارات التصميم ولماذا اتُّخذت', items: { type: 'string' } },
    improvements: { type: 'array', description: 'خطوات تطوير مقترحة قابلة للتنفيذ', items: { type: 'string' } },
  },
};

const FEAS_PROMPT = BASE_CONTEXT + `

أنت الآن تُعدّ **دراسة جدوى** كاملة. اقرأ كل ما زُوّدت به (نص المستخدم والملفات المرفقة)، واستخرج منه الأرقام والحقائق، ثم ابنِ دراسة متكاملة.

إرشادات المحتوى:
- استنتج الأرقام من المُدخلات. إن لم تتوفر أرقام أساسية، ضع تقديرات معقولة للسوق السعودي و**صرّح في حقل الافتراضات** بأنها تقديرات ومصدر تقديرك.
- احسب المؤشرات المالية فعليًا (صافي الربح، هامش الربح، نقطة التعادل، فترة الاسترداد، العائد على الاستثمار) ولا تتركها وصفية.
- اجعل الأقسام مترابطة: كل رقم في الجداول يجب أن يتسق مع المؤشرات.
- ضع رسمًا بيانيًا فقط حين يضيف معنى (مقارنة بنود أو تطور زمني)، لا لمجرد التزيين.
- في المخاطر: رتّبها من الأشد، ولكل خطر إجراء تخفيف محدد.
- التوصية النهائية يجب أن تكون حاسمة ومبرّرة بالأرقام.`;

/* مخطّط دراسة الجدوى — يضمن رجوع بيانات منظّمة قابلة للعرض */
const FEAS_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'subtitle', 'summary', 'kpis', 'sections', 'risks', 'assumptions', 'recommendation'],
  properties: {
    title: { type: 'string', description: 'عنوان الدراسة' },
    subtitle: { type: 'string', description: 'سطر تعريفي قصير بالمشروع' },
    summary: { type: 'string', description: 'الملخص التنفيذي في فقرة أو فقرتين' },
    kpis: {
      type: 'array',
      description: 'من 3 إلى 6 مؤشرات مالية رئيسية',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['label', 'value', 'unit', 'note', 'tone'],
        properties: {
          label: { type: 'string' },
          value: { type: 'string', description: 'الرقم فقط بلا وحدة' },
          unit: { type: 'string', description: 'ريال / % / شهر — أو فراغ' },
          note: { type: 'string', description: 'تعليق قصير جدًا' },
          tone: { type: 'string', enum: ['good', 'warn', 'bad', 'neutral'] },
        },
      },
    },
    sections: {
      type: 'array',
      description: 'أقسام الدراسة: وصف المشروع، السوق، التكاليف، الإيرادات، التشغيل...',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['heading', 'icon', 'body', 'table', 'chart'],
        properties: {
          heading: { type: 'string' },
          icon: { type: 'string', description: 'إيموجي واحد يناسب القسم' },
          body: { type: 'string', description: 'نص القسم' },
          table: {
            type: 'object',
            additionalProperties: false,
            required: ['show', 'caption', 'columns', 'rows'],
            properties: {
              show: { type: 'boolean' },
              caption: { type: 'string' },
              columns: { type: 'array', items: { type: 'string' } },
              rows: { type: 'array', items: { type: 'array', items: { type: 'string' } } },
            },
          },
          chart: {
            type: 'object',
            additionalProperties: false,
            required: ['show', 'type', 'title', 'unit', 'labels', 'values'],
            properties: {
              show: { type: 'boolean' },
              type: { type: 'string', enum: ['bar', 'line'] },
              title: { type: 'string' },
              unit: { type: 'string' },
              labels: { type: 'array', items: { type: 'string' } },
              values: { type: 'array', items: { type: 'number' } },
            },
          },
        },
      },
    },
    risks: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['risk', 'severity', 'mitigation'],
        properties: {
          risk: { type: 'string' },
          severity: { type: 'string', enum: ['عالية', 'متوسطة', 'منخفضة'] },
          mitigation: { type: 'string' },
        },
      },
    },
    assumptions: {
      type: 'array',
      description: 'الافتراضات والتقديرات التي بُنيت عليها الأرقام، وما ينقص من بيانات',
      items: { type: 'string' },
    },
    recommendation: {
      type: 'object',
      additionalProperties: false,
      required: ['verdict', 'tone', 'reasons', 'next_steps'],
      properties: {
        verdict: { type: 'string', description: 'الحكم النهائي في جملة' },
        tone: { type: 'string', enum: ['good', 'warn', 'bad'] },
        reasons: { type: 'array', items: { type: 'string' } },
        next_steps: { type: 'array', items: { type: 'string' } },
      },
    },
  },
};

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders(origin) },
  });
}

/** يتحقق أن رمز Firebase صالح ويعيد بريد المستخدم، أو null */
async function verifyFirebaseUser(idToken, firebaseApiKey) {
  if (!idToken) return null;
  try {
    const res = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + firebaseApiKey,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const user = data && data.users && data.users[0];
    return user ? (user.email || user.localId) : null;
  } catch (_) {
    return null;
  }
}

/** يبني كتل المحتوى: الصور ككتل رؤية، والنصوص مضمّنة */
function buildContent(prompt, data, files) {
  const blocks = [];
  let notes = '';

  for (const f of files) {
    if (f.kind === 'image' && f.data && f.media_type) {
      blocks.push({
        type: 'image',
        source: { type: 'base64', media_type: f.media_type, data: f.data },
      });
      notes += '\n\n[صورة مرفقة: ' + (f.name || 'بدون اسم') + ']';
    } else if (f.text) {
      notes += '\n\n--- محتوى الملف: ' + (f.name || 'بدون اسم') + ' ---\n' + f.text;
    } else if (f.error) {
      notes += '\n\n[تعذّرت قراءة الملف ' + (f.name || '') + ': ' + f.error + ']';
    }
  }

  let text = prompt;
  if (data) text += '\n\nالبيانات الملصقة:\n```\n' + data + '\n```';
  if (notes) text += '\n\nالمرفقات:' + notes;

  blocks.push({ type: 'text', text });
  return blocks;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    /* فحص سريع بلا تكلفة: يفتح الرابط في المتصفح فيخبرك بإصدار الوسيط */
    if (request.method === 'GET') {
      return json(
        { ok: true, version: WORKER_VERSION, streaming: true, model: MODEL },
        200,
        origin
      );
    }
    if (request.method !== 'POST') {
      return json({ error: 'استخدم POST فقط.' }, 405, origin);
    }
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return json({ error: 'هذا النطاق غير مصرّح له.' }, 403, origin);
    }
    if (!env.ANTHROPIC_API_KEY) {
      return json({ error: 'لم يُضبط ANTHROPIC_API_KEY في إعدادات Cloudflare.' }, 500, origin);
    }

    /* التحقق من تسجيل الدخول */
    const auth = request.headers.get('Authorization') || '';
    const idToken = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    const email = await verifyFirebaseUser(idToken, env.FIREBASE_API_KEY);
    if (!email) {
      return json({ error: 'يجب تسجيل الدخول إلى اللوحة أولًا.' }, 401, origin);
    }

    /* قراءة الطلب */
    let body;
    try {
      body = await request.json();
    } catch (_) {
      return json({ error: 'صيغة الطلب غير صحيحة.' }, 400, origin);
    }

    const MODES = ['feasibility', 'design', 'chat'];
    const mode = MODES.includes(body.mode) ? body.mode : 'chat';
    const prompt = (body.prompt || '').toString().trim();
    const data = (body.data || '').toString().trim();
    const files = Array.isArray(body.files) ? body.files.slice(0, 12) : [];
    const prevSvg = (body.prevSvg || '').toString().slice(0, 200000);
    const canvas = (body.canvas || '').toString().slice(0, 200);

    if (!prompt && !data && !files.length) {
      return json({ error: 'الطلب فارغ.' }, 400, origin);
    }

    /* حدود الحجم — الصور تُحسب بحجمها المشفّر */
    let bytes = prompt.length + data.length;
    for (const f of files) bytes += (f.text ? f.text.length : 0) + (f.data ? f.data.length : 0);
    if (bytes > 4000000) {
      return json({ error: 'حجم المرفقات كبير جدًا. أزل بعض الملفات أو اختصر النص.' }, 413, origin);
    }

    let userText = prompt;
    if (mode === 'design') {
      if (canvas) userText = 'نوع المساحة المطلوبة: ' + canvas + '\n\nالطلب: ' + prompt;
      if (prevSvg) {
        userText +=
          '\n\n--- النسخة السابقة (طوّرها ولا تبدأ من الصفر) ---\n' + prevSvg;
      }
    }

    const SYS = { feasibility: FEAS_PROMPT, design: DESIGN_PROMPT, chat: CHAT_PROMPT };
    /* medium يوفّر ~نصف التكلفة مع جودة قريبة جدًا — ارفعه إلى high عند الحاجة */
    const EFFORT = { feasibility: 'medium', design: 'medium', chat: 'low' };

    const payload = {
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYS[mode],
      thinking: { type: 'adaptive' },
      output_config: { effort: EFFORT[mode] },
      stream: true,                       /* يمنع انقطاع المهلة 524 */
      messages: [{ role: 'user', content: buildContent(userText, data, files) }],
    };
    if (mode === 'feasibility') {
      payload.output_config.format = { type: 'json_schema', schema: FEAS_SCHEMA };
    } else if (mode === 'design') {
      payload.output_config.format = { type: 'json_schema', schema: DESIGN_SCHEMA };
    }

    /* استدعاء Claude */
    let apiRes;
    try {
      apiRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      return json({ error: 'تعذّر الاتصال بخدمة Claude: ' + e.message }, 502, origin);
    }

    /* خطأ قبل بدء البث — يعود كـ JSON عادي */
    if (!apiRes.ok) {
      const err = await apiRes.json().catch(() => null);
      const msg = (err && err.error && err.error.message) || ('HTTP ' + apiRes.status);
      return json({ error: 'رفضت خدمة Claude الطلب: ' + msg }, apiRes.status, origin);
    }

    /* تمرير البث كما هو إلى المتصفح.
       البيانات تتدفّق فورًا فلا ينقطع الاتصال مهما طال التوليد،
       والمتصفح هو من يجمّعها — فلا يستهلك الوسيط معالجة تُذكر. */
    return new Response(apiRes.body, {
      status: 200,
      headers: {
        ...corsHeaders(origin),
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    });
  },
};
