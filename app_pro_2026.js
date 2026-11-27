// ============================================================================
// نظام الحماية المتقدم: بصمة الهاردوير الثابتة + عداد تنازلي فعلي 30 يوم + دعم اللغتين (عربي/إنجليزي) + نظام Reject
// متوافق مع الدليل الذكي والماسح الذكي (تطوير: أ/ نورهان صلاح)
// ============================================================================

const NS_APP_CONFIG = {
  instapayAddress: "nourhansalahmahmoud@instapay", // ضعي عنوان InstaPay الخاص بك هنا
  whatsappNumber: "201208459828",           // رقم الواتساب لاستلام بصمة ونوع الجهاز
  trialDays: 30,                            // مدة التجربة المجانية بالأيام (تقل تلقائياً كل يوم حتى 0 ثم يغلق البرنامج)
  secretSalt: "NOURHAN_SALAH_LAB_2026",     // مفتاح التشفير الخاص بك
  // قائمة بصمات الأجهزة المرفوضة نهائياً (أي بصمة تضعينها هنا يقفل عليها التطبيق فوراً حتى لو مسحه ونزله)
  blockedFingerprints: [
    "HW-00000000"
  ],
  pricing: {
    monthlyUSD: "$1.99 / Month",
    monthlyUSD_Ar: "$1.99 / شهرياً",
    monthlyEGP: "49 EGP / Month",
    monthlyEGP_Ar: "49 ج.م / شهرياً",
    annualUSD: "$14.99 / Year",
    annualUSD_Ar: "$14.99 / سنوياً",
    annualEGP: "399 EGP / Year",
    annualEGP_Ar: "399 ج.م / سنوياً"
  }
};

const MABARET_2026_BOOKLET = {
  versionAr: "الإصدار الثاني عشر V13.0 (يبدأ العمل به السبت 25/04/2026)",
  versionEn: "12th Edition V13.0 (Effective Saturday 25/04/2026)",
  generalRulesAr: [
    "مواعيد السكرتارية: متواجدون من 8:30 صباحاً حتى 12:00 منتصف الليل (أكثر من 15 ساعة يومياً) عدا يوم الجمعة لمتابعة استقبال العينات وتبليغ النتائج.",
    "حساب مواعيد النتائج (TAT): يوم الجمعة عطلة أسبوعية لوحدات المعامل، ولذلك يتم إسقاطه من حساب الفاصل الزمني بين استلام العينة وظهور النتيجة.",
    "الالتزام بالأحجام وتقسيم العينات: يجب إرسال الأحجام المدونة أمام كل تحليل لأن العينات صغيرة الحجم تسبب مشاكل. إذا كانت العينة مطلوبة لأكثر من وحدة، يجب إرسالها مقسمة في أنابيب وزرمان (Wasserman tubes) بعدد الوحدات.",
    "رفض العينات: لن يتم استلام أي عينات متحللة (Hemolyzed samples) أو عينات غير مفصولة نهائياً.",
    "سياسة التخفيف (Dilution): يتم تخفيف تحاليل (E2, CEA, Ca19.9, AFP, PSA, B-HCG) تلقائياً لتعطي رقماً صحيحاً بدلاً من (More than xxxx) وهذا مشمول في السعر. في حال طلب تخفيف لأي تحليل آخر خارج هذه المجموعة يتم دفع قيمة التحليل مرة أخرى.",
    "شروط الحصول على معدلات طبيعية منضبطة: 1) الاسم ثلاثي على الأقل. 2) تحديد السن بالسنة والشهر والأيام (في حال عدم إرسال السن ستظهر النتيجة بدون معدلات طبيعية). 3) تحديد جنس الحالة للأسماء المشتركة بين الذكور والإناث مثل (رضا، عطية، وسام).",
    "مدة الاحتفاظ بالعينات: تحتفظ المعامل بعينات الدم المرسلة لمدة أسبوع واحد فقط بعد رفع النتيجة على الموقع."
  ],
  generalRulesEn: [
    "Working Hours: Lab secretariat is available daily from 8:30 AM to 12:00 Midnight (over 15 hours/day) except Fridays for sample reception and reporting.",
    "Turnaround Time (TAT) Calculation: Friday is the weekly holiday for lab units and must be excluded when calculating the interval between sample receipt and result reporting.",
    "Sample Volume & Splitting: Strictly adhere to the required sample volumes. If a sample is requested for multiple lab units, split it into separate Wasserman tubes according to the number of units.",
    "Sample Rejection: Hemolyzed or unseparated samples will be strictly rejected.",
    "Dilution Policy: Automatic dilution for (E2, CEA, Ca19.9, AFP, PSA, B-HCG) to yield an exact numerical result instead of 'More than xxxx' is included in the test fee. Requesting dilution for any other test requires paying the test fee again.",
    "Accurate Reference Ranges: Must provide: 1) Full triple name. 2) Exact age in years, months, and days (omitting age results in reports without reference ranges). 3) Patient sex, especially for unisex names.",
    "Sample Retention: Blood samples are retained for 1 week only after results are posted online."
  ],
  tatTable: [
    { dayAr: "السبت", dayEn: "Saturday", nextAr: "الأحد مساءً", nextEn: "Sunday Eve", h48Ar: "الإثنين مساءً", h48En: "Monday Eve", h72Ar: "الثلاثاء مساءً", h72En: "Tuesday Eve", h96Ar: "الأربعاء مساءً", h96En: "Wednesday Eve", week1Ar: "السبت مساءً", week1En: "Saturday Eve" },
    { dayAr: "الأحد", dayEn: "Sunday", nextAr: "الإثنين مساءً", nextEn: "Monday Eve", h48Ar: "الثلاثاء مساءً", h48En: "Tuesday Eve", h72Ar: "الأربعاء مساءً", h72En: "Wednesday Eve", h96Ar: "الخميس مساءً", h96En: "Thursday Eve", week1Ar: "الأحد مساءً", week1En: "Sunday Eve" },
    { dayAr: "الإثنين", dayEn: "Monday", nextAr: "الثلاثاء مساءً", nextEn: "Tuesday Eve", h48Ar: "الأربعاء مساءً", h48En: "Wednesday Eve", h72Ar: "الخميس مساءً", h72En: "Thursday Eve", h96Ar: "السبت مساءً", h96En: "Saturday Eve", week1Ar: "الإثنين مساءً", week1En: "Monday Eve" },
    { dayAr: "الثلاثاء", dayEn: "Tuesday", nextAr: "الأربعاء مساءً", nextEn: "Wednesday Eve", h48Ar: "الخميس مساءً", h48En: "Thursday Eve", h72Ar: "السبت مساءً", h72En: "Saturday Eve", h96Ar: "الأحد مساءً", h96En: "Sunday Eve", week1Ar: "الثلاثاء مساءً", week1En: "Tuesday Eve" },
    { dayAr: "الأربعاء", dayEn: "Wednesday", nextAr: "الخميس مساءً", nextEn: "Thursday Eve", h48Ar: "السبت مساءً", h48En: "Saturday Eve", h72Ar: "الأحد مساءً", h72En: "Sunday Eve", h96Ar: "الإثنين مساءً", h96En: "Monday Eve", week1Ar: "الأربعاء مساءً", week1En: "Wednesday Eve" },
    { dayAr: "الخميس", dayEn: "Thursday", nextAr: "السبت مساءً", nextEn: "Saturday Eve", h48Ar: "الأحد مساءً", h48En: "Sunday Eve", h72Ar: "الإثنين مساءً", h72En: "Monday Eve", h96Ar: "الثلاثاء مساءً", h96En: "Tuesday Eve", week1Ar: "الخميس مساءً", week1En: "Thursday Eve" }
  ],
  instruments: [
    { code: "(a)", name: "Cobas 6000 / 8000 / Integra ROCHE & Atellica SCI Siemens" },
    { code: "(b)", name: "Fully Automated ELISA Chemwell & ECL100 Epitope" },
    { code: "(c)", name: "Cobas AmpliPrep TaqMan Roche & CFX96 Real-Time PCR Bio-Rad" },
    { code: "(d)", name: "Immulite 2000/XPi Siemens (Allergy & Rare Hormones)" },
    { code: "(f)", name: "BN ProSpec / Atellica NEPH 630 Nephelometer Siemens" },
    { code: "(g)", name: "Luminex FLEXMAP 3D Thermo Fisher (HLA & PRA/DSA)" },
    { code: "(h)", name: "Sysmex XN-1000 / XN-550, Beckman DxH 900, Advia 2120 (CBC)" },
    { code: "(i)", name: "Sysmex CA-600 / CS-2500 (Coagulation)" },
    { code: "(j)", name: "DG-Spin Grifols Gel Card System (Blood Grouping & Coombs)" },
    { code: "(m)", name: "BIOFIRE FilmArray PCR & VIDAS3 TB-IGRA BioMérieux" },
    { code: "(n/o)", name: "BACT/ALERT 3D, BD Bactec FX40 & VITEK 2 Compact (Automated Cultures)" },
    { code: "(p)", name: "Cepheid GeneXpert Systems (Ultra-sensitive PCR)" },
    { code: "(r/s)", name: "Capillarys 3 TERA / MiniCap Sebia & Helena SAS (Electrophoresis)" },
    { code: "(u/v)", name: "BD FACSLyric (12 Colors) & BD FACSCanto II Flow Cytometry" },
    { code: "(w)", name: "Ventana BenchMark GX Roche & Dako Autostainer (IHC Pathology)" },
    { code: "(z)", name: "NGS MiSeq i100 Plus System Illumina (BRCA 1/2 Gene Sequencing)" }
  ]
};

// تحديد اللغة الحالية للموقع (عربي أم إنجليزي)
function isAppArabic() {
  if (typeof currentLang !== 'undefined') {
    return currentLang === 'ar';
  }
  const htmlLang = (document.documentElement.lang || 'ar').toLowerCase();
  return htmlLang.startsWith('ar');
}

// ============================================================================
// 1. استخراج موديل الجهاز الحقيقي وبصمة الهاردوير الثابتة (لا تتغير بمسح التطبيق)
// ============================================================================
function getDetailedDeviceModel() {
  const ua = navigator.userAgent || "";
  let os = "Unknown OS";
  let model = "Generic Device";

  if (/android/i.test(ua)) {
    const match = ua.match(/Android\s+([\d.]+);\s*([^;)]+)/i);
    if (match) {
      os = `Android ${match[1]}`;
      model = match[2].replace(/Build\/.*/i, '').trim();
    } else {
      os = "Android";
    }
  } else if (/iPad|iPhone|iPod/.test(ua)) {
    os = "iOS (Apple)";
    model = /iPad/.test(ua) ? `iPad (${screen.width}x${screen.height})` : `iPhone (${screen.width}x${screen.height})`;
  } else if (/Windows NT/i.test(ua)) {
    os = "Windows PC";
    model = `Desktop (${navigator.platform})`;
  } else if (/Macintosh/i.test(ua)) {
    os = "MacOS";
    model = "Mac Computer";
  }

  let gpu = "";
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";
      }
    }
  } catch (e) {}

  const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : "";
  const ram = navigator.deviceMemory ? `${navigator.deviceMemory}GB RAM` : "";
  return `${os} | ${model} ${gpu ? '| GPU: ' + gpu.substring(0, 28) : ''} ${cores} ${ram}`.replace(/\s+/g, ' ').trim();
}

function getHardwareFingerprint() {
  let rawSignals = [
    navigator.platform || '',
    navigator.hardwareConcurrency || '',
    navigator.deviceMemory || '',
    `${screen.width}x${screen.height}x${screen.colorDepth}`,
    window.devicePixelRatio || 1,
    Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  ];

  const ua = navigator.userAgent || "";
  const androidModel = ua.match(/Android[^;]+;\s*([^;)]+)/i);
  if (androidModel) rawSignals.push(androidModel[1].replace(/Build\/.*/i, '').trim());

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        rawSignals.push(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '');
        rawSignals.push(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '');
      }
    }
  } catch (e) {}

  try {
    const c = document.createElement('canvas');
    c.width = 200;
    c.height = 40;
    const ctx = c.getContext('2d');
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.fillStyle = "#0f766e";
    ctx.fillRect(10, 1, 62, 20);
    ctx.fillStyle = "#1e293b";
    ctx.fillText("NS_LAB_HW_2026", 2, 15);
    rawSignals.push(c.toDataURL().slice(-60));
  } catch (e) {}

  const combined = rawSignals.join('||');
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0, ch; i < combined.length; i++) {
    ch = combined.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hex = (h1 >>> 0).toString(16).toUpperCase().padStart(4, '0') +
              (h2 >>> 0).toString(16).toUpperCase().padStart(4, '0');
  return `HW-${hex.substring(0, 8)}`;
}

function getCurrentPeriodStamp() {
  const d = new Date(Date.now() + (typeof cachedTimeOffset === 'number' ? cachedTimeOffset : 0));
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}${m}`;
}

function computePlanHash(cleanId, planTag, periodStamp) {
  const str = `${cleanId}::${planTag}::${periodStamp}::${NS_APP_CONFIG.secretSalt}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36).toUpperCase().padStart(6, '9').substring(0, 6);
}

function generateTimedActivationCode(hwId, planType = 'monthly', periodStamp = null) {
  const cleanId = (hwId || '').trim().toUpperCase();
  if (!cleanId) return '';
  const stamp = periodStamp || getCurrentPeriodStamp();
  const prefix = planType === 'annual' ? 'PRY' : 'PRM';
  const planTag = planType === 'annual' ? 'ANNUAL' : 'MONTHLY';
  const codePart = computePlanHash(cleanId, planTag, stamp);
  return `${prefix}-${stamp}-${codePart}`;
}

function generateActivationCode(hwId) {
  return generateTimedActivationCode(hwId, 'annual');
}

function generateRejectCode(hwId) {
  const cleanId = (hwId || '').trim().toUpperCase();
  const str = cleanId + "::REJECT::" + NS_APP_CONFIG.secretSalt;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  const codePart = Math.abs(hash).toString(36).toUpperCase().padStart(6, '7').substring(0, 6);
  return `REJ-${codePart}`;
}

function getActiveProInfo(hwId, nowTs) {
  const activated = localStorage.getItem('ns_smartlab_pro_activated');
  if (activated !== hwId && activated !== 'TRUE') {
    return { isPro: false, plan: null, proDaysLeft: 0, expiredPro: false };
  }
  const expiry = parseInt(localStorage.getItem('ns_smartlab_pro_expiry') || '0', 10);
  const plan = localStorage.getItem('ns_smartlab_pro_plan') || 'annual';
  if (!expiry) {
    return { isPro: true, plan, proDaysLeft: 365, expiredPro: false };
  }
  const rem = expiry - nowTs;
  if (rem <= 0) {
    return { isPro: false, plan, proDaysLeft: 0, expiredPro: true };
  }
  return {
    isPro: true,
    plan,
    proDaysLeft: Math.ceil(rem / (1000 * 60 * 60 * 24)),
    expiredPro: false
  };
}

// ============================================================================
// 2. تخزين تاريخ بداية الـ 30 يوم في عدة طبقات وحساب التناقص التدريجي للأيام
// ============================================================================
async function syncPersistentTrialStart(currentTimestamp) {
  let earliestTime = currentTimestamp;

  // فحص أي مفتاح سابق محفوظ لضمان استمرارية العداد وعدم إعادته للصفر
  const lsTime1 = parseInt(localStorage.getItem('ns_hw_trial_start'), 10);
  const lsTime2 = parseInt(localStorage.getItem('ns_smartlab_trial_start'), 10);
  if (lsTime1 && !isNaN(lsTime1) && lsTime1 < earliestTime) earliestTime = lsTime1;
  if (lsTime2 && !isNaN(lsTime2) && lsTime2 < earliestTime) earliestTime = lsTime2;

  try {
    const idbTime = await new Promise((resolve) => {
      const req = indexedDB.open('NS_Security_DB', 1);
      req.onupgradeneeded = (e) => e.target.result.createObjectStore('sec');
      req.onsuccess = (e) => {
        const db = e.target.result;
        const tx = db.transaction('sec', 'readonly');
        const getReq = tx.objectStore('sec').get('trial_start');
        getReq.onsuccess = () => resolve(parseInt(getReq.result, 10) || null);
        getReq.onerror = () => resolve(null);
      };
      req.onerror = () => resolve(null);
    });
    if (idbTime && idbTime < earliestTime) earliestTime = idbTime;
  } catch (e) {}

  try {
    if ('caches' in window) {
      const cache = await caches.open('ns-hw-sec-vault');
      const res = await cache.match('/__ns_trial_stamp__');
      if (res) {
        const cTime = parseInt(await res.text(), 10);
        if (cTime && !isNaN(cTime) && cTime < earliestTime) earliestTime = cTime;
      }
    }
  } catch (e) {}

  localStorage.setItem('ns_hw_trial_start', String(earliestTime));
  localStorage.setItem('ns_smartlab_trial_start', String(earliestTime));
  try {
    const req = indexedDB.open('NS_Security_DB', 1);
    req.onsuccess = (e) => {
      const db = e.target.result;
      const tx = db.transaction('sec', 'readwrite');
      tx.objectStore('sec').put(String(earliestTime), 'trial_start');
    };
  } catch (e) {}
  try {
    if ('caches' in window) {
      const cache = await caches.open('ns-hw-sec-vault');
      await cache.put('/__ns_trial_stamp__', new Response(String(earliestTime)));
    }
  } catch (e) {}

  return earliestTime;
}

async function getAccurateTimestamp() {
  try {
    const response = await fetch(window.location.href, { method: 'HEAD', cache: 'no-store' });
    const serverDate = response.headers.get('Date');
    if (serverDate) return new Date(serverDate).getTime();
  } catch (e) {}
  return Date.now();
}

let cachedFirstOpenTime = null;
let cachedTimeOffset = 0; // الفرق بين توقيت السيرفر وتوقيت الجهاز

function calculateTrialStatus() {
  const hwId = getHardwareFingerprint();
  const now = Date.now() + cachedTimeOffset;
  const proInfo = getActiveProInfo(hwId, now);
  const isPro = proInfo.isPro;
  const firstOpen = cachedFirstOpenTime || now;
  const totalTrialMs = NS_APP_CONFIG.trialDays * 24 * 60 * 60 * 1000;
  const elapsedMs = Math.max(0, now - firstOpen);
  const remainingMs = Math.max(0, totalTrialMs - elapsedMs);

  // حساب الأيام المتبقية بالتدريج (تبدأ من 30 وتقل يوماً بعد يوم: 29، 28، 27... حتى 0)
  const daysLeft = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));
  const hoursLeftInDay = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minsLeftInHour = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    isPro,
    proPlan: proInfo.plan,
    proDaysLeft: proInfo.proDaysLeft,
    expiredPro: proInfo.expiredPro,
    hwId,
    daysLeft,
    hoursLeftInDay,
    minsLeftInHour,
    remainingMs
  };
}

// ============================================================================
// 3. القفل الكامل للتطبيق (Hard Lock) عند انتهاء الـ 30 يوم أو عمل Reject للجهاز
// ============================================================================
function executeHardLockScreen(reasonTitleAr, reasonTitleEn, reasonDescAr, reasonDescEn, isRejected = false) {
  const mainEl = document.querySelector('main');
  if (mainEl) mainEl.innerHTML = '';
  const containerEl = document.querySelector('.container');
  if (containerEl) containerEl.innerHTML = '';
  const scannerBtn = document.getElementById('floating-scanner-btn');
  if (scannerBtn) scannerBtn.remove();

  const isAr = isAppArabic();
  const msg = isAr ? `${reasonTitleAr}: ${reasonDescAr}` : `${reasonTitleEn}: ${reasonDescEn}`;
  openSubscriptionModal(true, msg, isRejected);
}

async function initSmartLabProSystem() {
  const hwId = getHardwareFingerprint();
  const isPro = getActiveProInfo(hwId, Date.now()).isPro;
  const isRejectedLocal = localStorage.getItem('ns_smartlab_rejected') === 'TRUE' ||
                          NS_APP_CONFIG.blockedFingerprints.includes(hwId);

  if (isRejectedLocal && !isPro) {
    executeHardLockScreen(
      "⛔ تم رفض وحظر هذا الجهاز",
      "⛔ Device Rejected & Blocked",
      `تم إيقاف صلاحية وصول هذا الجهاز (${hwId}) بقرار من إدارة التطبيق.`,
      `Access for this device (${hwId}) has been permanently revoked by the administrator.`,
      true
    );
    return;
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then((reg) => {
      if (isPro && reg.active) {
        reg.active.postMessage({ type: 'ACTIVATE_PRO_OFFLINE' });
      }
    }).catch(() => {});
  }

  if (!isPro && !navigator.onLine) {
    executeHardLockScreen(
      "🔒 وضع عدم الاتصال بالإنترنت مغلق",
      "🔒 Offline Mode Locked",
      "ميزة العمل بدون إنترنت (Offline Mode) مخصصة للمشتركين في النسخة المدفوعة فقط.",
      "Offline Mode is exclusively available for Pro subscribers."
    );
    return;
  }

  const serverNow = await getAccurateTimestamp();
  cachedTimeOffset = serverNow - Date.now();
  cachedFirstOpenTime = await syncPersistentTrialStart(serverNow);

  updateTopBarAndCheckLock();

  // تحديث تلقائي كل دقيقة لضمان تناقص الأيام والساعات تدريجياً في الوقت الفعلي
  setInterval(updateTopBarAndCheckLock, 60000);

  // مراقبة تغيير اللغة في الصفحة (عند الضغط على زر English / عربي) لتحويل الشريط العلوي فوراً
  const observer = new MutationObserver(() => {
    updateTopBarAndCheckLock();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
}

function updateTopBarAndCheckLock() {
  const status = calculateTrialStatus();
  renderSubscriptionBar(status.isPro, status.daysLeft, status.hoursLeftInDay, status.minsLeftInHour, status.hwId, status.proPlan, status.proDaysLeft);

  if (!status.isPro && (status.expiredPro || status.remainingMs <= 0)) {
    if (status.expiredPro) {
      executeHardLockScreen(
        "⏳ انتهت مدة اشتراكك المدفوع",
        "⏳ Your Pro Subscription Expired",
        "انتهت مدة اشتراكك الحالية. يرجى اختيار باقة شهرية أو سنوية والتجديد عبر InstaPay لاستمرار العمل.",
        "Your current subscription has ended. Please choose a Monthly or Annual plan and renew via InstaPay."
      );
    } else {
      executeHardLockScreen(
        "⏳ انتهت الفترة التجريبية المجانية (30 يوماً)",
        "⏳ 30-Day Free Trial Expired",
        "تم إغلاق البرنامج تلقائياً لانتهاء فترة الـ 30 يوماً المجانية لهذا الجهاز. يرجى التفعيل عبر InstaPay لإعادة فتح البرنامج.",
        "The 30-day free trial for this device has ended. Please activate Pro via InstaPay to unlock the application."
      );
    }
  }
}

let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
});

function isRunningAsInstalledApp() {
  try {
    if (window.Capacitor && typeof window.Capacitor.isNativePlatform === 'function' && window.Capacitor.isNativePlatform()) {
      return true;
    }
    if (window.Capacitor && window.Capacitor.platform && window.Capacitor.platform !== 'web') {
      return true;
    }
    if (location.hostname === 'localhost' || location.protocol === 'capacitor:' || location.protocol === 'file:') {
      return true;
    }
    if (window.matchMedia && (window.matchMedia('(display-mode: standalone)').matches || window.matchMedia('(display-mode: fullscreen)').matches)) {
      return true;
    }
    if (window.navigator && window.navigator.standalone === true) {
      return true;
    }
    if (document.referrer && document.referrer.startsWith('android-app://')) {
      return true;
    }
  } catch (e) {}
  return false;
}

function renderSubscriptionBar(isPro, daysLeft, hoursLeft, minsLeft, hwId, proPlan = 'annual', proDaysLeft = 0) {
  const isAr = isAppArabic();
  let bar = document.getElementById('ns-top-pro-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'ns-top-pro-bar';
    document.body.prepend(bar);
  }

  bar.style.cssText = `background:linear-gradient(90deg,#042f2e,#0f766e,#115e59);color:#ffffff;padding:8px 16px;font-family:Cairo,sans-serif;font-size:12.5px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;direction:${isAr ? 'rtl' : 'ltr'};z-index:45;border-bottom:1px solid rgba(255,255,255,0.15);box-shadow:0 2px 10px rgba(0,0,0,0.15);`;

  const exactTooltip = isAr
    ? `الوقت المتبقي بالضبط: ${daysLeft - 1} يوم و ${hoursLeft} ساعة و ${minsLeft} دقيقة`
    : `Exact time remaining: ${daysLeft - 1}d ${hoursLeft}h ${minsLeft}m`;

  const planLabelAr = proPlan === 'monthly' ? 'شهري' : 'سنوي';
  const planLabelEn = proPlan === 'monthly' ? 'Monthly' : 'Annual';
  const badgeHtml = isPro
    ? (isAr
        ? `<div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#fde047;"><span>👑</span><span>النسخة المدفوعة (${planLabelAr}) - متبقي <b style="color:#fff;background:rgba(0,0,0,0.35);padding:1px 8px;border-radius:6px;">${proDaysLeft} يوم</b></span></div>`
        : `<div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#fde047;"><span>👑</span><span>Pro (${planLabelEn}) - <b style="color:#fff;background:rgba(0,0,0,0.35);padding:1px 8px;border-radius:6px;">${proDaysLeft} Days</b> Left</span></div>`)
    : (isAr
        ? `<div title="${exactTooltip}" style="display:flex;align-items:center;gap:6px;font-weight:700;color:#fef08a;cursor:help;"><span>⏳</span><span>الفترة التجريبية المجانية: متبقي <b style="color:#fff;background:rgba(0,0,0,0.35);padding:1px 8px;border-radius:6px;">${daysLeft} يوم</b> (العمل بدون نت للمدفوع فقط)</span></div>`
        : `<div title="${exactTooltip}" style="display:flex;align-items:center;gap:6px;font-weight:700;color:#fef08a;cursor:help;"><span>⏳</span><span>Free Trial: <b style="color:#fff;background:rgba(0,0,0,0.35);padding:1px 8px;border-radius:6px;">${daysLeft} Days</b> Remaining (Offline mode for Pro only)</span></div>`);

  const rulesBtnLabel = isAr ? "📘 قواعد المعمل والمواعيد" : "📘 Lab Rules & Timings";
  const installBtnLabel = isAr ? "📲 تثبيت التطبيق" : "📲 Install App";
  const activateBtnLabel = isAr ? "⚡ تفعيل النسخة المدفوعة (InstaPay)" : "⚡ Activate Pro (InstaPay)";

  bar.innerHTML = `
    ${badgeHtml}
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
      <button onclick="openBookletRulesModal()" style="background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.3);padding:5px 12px;border-radius:10px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:700;font-size:12px;transition:0.2s;">
        ${rulesBtnLabel}
      </button>
      ${!isRunningAsInstalledApp() ? `
      <button onclick="triggerAppInstall()" style="background:#0284c7;color:#fff;border:none;padding:5px 12px;border-radius:10px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:700;font-size:12px;transition:0.2s;">
        ${installBtnLabel}
      </button>` : ''}
      ${!isPro ? `
      <button onclick="openSubscriptionModal(false)" style="background:#f59e0b;color:#0f172a;border:none;padding:5px 14px;border-radius:10px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:800;font-size:12px;box-shadow:0 2px 8px rgba(245,158,11,0.4);">
        ${activateBtnLabel}
      </button>` : ''}
    </div>
  `;
}

async function triggerAppInstall() {
  const isAr = isAppArabic();
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
  } else {
    alert(isAr
      ? "📲 لتثبيت التطبيق:\n• أندرويد وويندوز: من قائمة المتصفح (⋮) اختر (تثبيت التطبيق / Install App).\n• آيفون (Safari): اضغط مشاركة (Share) ثم (Add to Home Screen)."
      : "📲 To install the app:\n• Android & Windows: Open browser menu (⋮) and select 'Install App'.\n• iPhone (Safari): Tap 'Share' then select 'Add to Home Screen'.");
  }
}

let nsSelectedPlan = 'annual';

function buildWhatsAppPayUrl(planKey, hwId, deviceModel, startDateStr) {
  const planText = planKey === 'monthly'
    ? `اشتراك شهري (${NS_APP_CONFIG.pricing.monthlyEGP_Ar} / ${NS_APP_CONFIG.pricing.monthlyUSD_Ar})`
    : `اشتراك سنوي (${NS_APP_CONFIG.pricing.annualEGP_Ar} / ${NS_APP_CONFIG.pricing.annualUSD_Ar})`;
  const waMsg = encodeURIComponent(
    `مرحباً أ/ نورهان، قمت بتحويل اشتراك التطبيق عبر InstaPay وأرغب في استلام كود التفعيل.\n` +
    `• الخطة المختارة: ${planText}\n` +
    `• بصمة الهاردوير الثابتة: ${hwId}\n` +
    `• نوع الجهاز: ${deviceModel}\n` +
    `• تاريخ بداية التجربة: ${startDateStr}`
  );
  return `https://wa.me/${NS_APP_CONFIG.whatsappNumber}?text=${waMsg}`;
}

function selectSubscriptionPlan(planKey) {
  nsSelectedPlan = planKey;
  const mCard = document.getElementById('ns-plan-monthly');
  const aCard = document.getElementById('ns-plan-annual');
  const mCheck = document.getElementById('ns-check-monthly');
  const aCheck = document.getElementById('ns-check-annual');
  const waBtn = document.getElementById('ns-wa-pay-btn');

  if (mCard && aCard) {
    if (planKey === 'monthly') {
      mCard.style.border = '2px solid #0f766e';
      mCard.style.background = '#f0fdfa';
      aCard.style.border = '1.5px solid #cbd5e1';
      aCard.style.background = '#ffffff';
      if (mCheck) mCheck.style.display = 'inline-block';
      if (aCheck) aCheck.style.display = 'none';
    } else {
      aCard.style.border = '2px solid #f59e0b';
      aCard.style.background = '#fffbeb';
      mCard.style.border = '1.5px solid #cbd5e1';
      mCard.style.background = '#ffffff';
      if (aCheck) aCheck.style.display = 'inline-block';
      if (mCheck) mCheck.style.display = 'none';
    }
  }

  if (waBtn) {
    const hwId = waBtn.dataset.hwid;
    const deviceModel = waBtn.dataset.model;
    const startDateStr = waBtn.dataset.start;
    waBtn.href = buildWhatsAppPayUrl(planKey, hwId, deviceModel, startDateStr);
  }
}

function adminGenerateAndShow(mode) {
  const idInput = document.getElementById('ns-admin-client-id');
  const outEl = document.getElementById('ns-admin-out-key');
  const clientId = (idInput ? idInput.value : '').trim().toUpperCase();
  if (!clientId) {
    outEl.innerHTML = '<span style="color:#b91c1c;">⚠️ أدخلي بصمة جهاز العميل أولاً (مثال: HW-A5B52E8F)</span>';
    return;
  }
  let code = '';
  let label = '';
  if (mode === 'monthly') {
    code = generateTimedActivationCode(clientId, 'monthly');
    label = '📅 كود تفعيل شهري (30 يوم):';
  } else if (mode === 'annual') {
    code = generateTimedActivationCode(clientId, 'annual');
    label = '👑 كود تفعيل سنوي (365 يوم):';
  } else {
    code = generateRejectCode(clientId);
    label = '⛔ كود الحظر النهائي:';
  }
  outEl.innerHTML = `
    <div style="margin-bottom:6px;color:#0f172a;">${label} <code style="background:#fef08a;padding:2px 8px;border-radius:6px;color:#854d0e;font-size:15px;">${code}</code></div>
    <button onclick="navigator.clipboard.writeText('${code}');alert('تم نسخ الكود: ${code}');" style="background:#0284c7;color:#fff;border:none;padding:5px 14px;border-radius:8px;cursor:pointer;font-family:Cairo,sans-serif;font-size:12px;font-weight:700;">📋 نسخ الكود للواتساب</button>
  `;
}

function openSubscriptionModal(isLocked = false, alertMessage = "", isRejected = false) {
  const old = document.getElementById('ns-pro-modal');
  if (old) old.remove();

  const isAr = isAppArabic();
  const hwId = getHardwareFingerprint();
  const deviceModel = getDetailedDeviceModel();
  const firstOpen = parseInt(localStorage.getItem('ns_hw_trial_start'), 10);
  const startDateStr = firstOpen ? new Date(firstOpen).toLocaleDateString(isAr ? 'ar-EG' : 'en-US') : (isAr ? 'اليوم' : 'Today');
  nsSelectedPlan = 'annual';
  const initialWaUrl = buildWhatsAppPayUrl(nsSelectedPlan, hwId, deviceModel, startDateStr);

  const modal = document.createElement('div');
  modal.id = 'ns-pro-modal';
  modal.style.cssText = `position:fixed;inset:0;background:rgba(15,23,42,0.95);backdrop-filter:blur(8px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;direction:${isAr ? 'rtl' : 'ltr'};font-family:Cairo,sans-serif;`;

  modal.innerHTML = `
    <div style="background:#ffffff;color:#1e293b;max-width:510px;width:100%;border-radius:24px;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.6);max-height:92vh;display:flex;flex-direction:column;">
      <div style="background:${isRejected ? '#991b1b' : 'linear-gradient(135deg,#134e4a,#0f766e)'};color:#fff;padding:18px 22px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <h3 style="margin:0;font-size:18px;font-weight:900;">${isRejected ? (isAr ? '⛔ هذا الجهاز مرفوض ومحظور (Rejected)' : '⛔ Device Rejected & Blocked') : (isAr ? '👑 تفعيل النسخة المدفوعة (Pro)' : '👑 Activate Pro Version')}</h3>
          <p style="margin:2px 0 0;font-size:12px;color:#e2e8f0;">${isAr ? `مربوط ببصمة الهاردوير الثابتة للجهاز (${hwId})` : `Bound to Hardware Fingerprint (${hwId})`}</p>
        </div>
        ${!isLocked ? `<button onclick="document.getElementById('ns-pro-modal').remove()" style="background:rgba(255,255,255,0.15);color:#fff;border:none;width:32px;height:32px;border-radius:50%;cursor:pointer;font-weight:bold;">✕</button>` : ''}
      </div>

      <div style="padding:20px;overflow-y:auto;">
        ${alertMessage ? `<div style="background:#fef2f2;border:1.5px solid #ef4444;color:#991b1b;padding:12px;border-radius:12px;font-size:13px;font-weight:800;margin-bottom:14px;line-height:1.6;">${alertMessage}</div>` : ''}

        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:14px;padding:12px;margin-bottom:14px;font-size:12.5px;">
          <div style="font-weight:800;color:#0f172a;margin-bottom:4px;">${isAr ? '📱 بيانات وبصمة جهازك المسجلة أمنياً:' : '📱 Registered Device Hardware Info:'}</div>
          <div style="color:#334155;">• <b>${isAr ? 'بصمة الهاردوير (لا تتغير بمسح التطبيق):' : 'Hardware ID (Permanent):'}</b> <code style="background:#fef08a;padding:2px 6px;border-radius:4px;font-weight:900;color:#854d0e;">${hwId}</code></div>
          <div style="color:#334155;margin-top:4px;">• <b>${isAr ? 'نوع وموديل الجهاز:' : 'Device Model:'}</b> <span style="color:#0369a1;font-weight:700;">${deviceModel}</span></div>
        </div>

        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:14px;margin-bottom:14px;">
          <div style="font-weight:800;color:#0f172a;font-size:13.5px;margin-bottom:8px;">${isAr ? '💳 اختر خطة الاشتراك للدفع عبر InstaPay:' : '💳 Choose Your Subscription Plan via InstaPay:'}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
            <div id="ns-plan-monthly" onclick="selectSubscriptionPlan('monthly')" style="background:#ffffff;border:1.5px solid #cbd5e1;padding:10px 8px;border-radius:12px;text-align:center;cursor:pointer;transition:0.2s;">
              <div style="font-size:12px;color:#334155;font-weight:800;">
                ${isAr ? '📅 اشتراك شهري' : '📅 Monthly Plan'}
                <span id="ns-check-monthly" style="display:none;color:#0f766e;margin-inline-start:4px;">✓</span>
              </div>
              <div style="font-size:15px;font-weight:900;color:#0f766e;margin-top:4px;">${isAr ? NS_APP_CONFIG.pricing.monthlyEGP_Ar : NS_APP_CONFIG.pricing.monthlyEGP}</div>
              <div style="font-size:11.5px;font-weight:700;color:#64748b;">${isAr ? 'أو ' + NS_APP_CONFIG.pricing.monthlyUSD_Ar : 'or ' + NS_APP_CONFIG.pricing.monthlyUSD}</div>
            </div>
            <div id="ns-plan-annual" onclick="selectSubscriptionPlan('annual')" style="background:#fffbeb;border:2px solid #f59e0b;padding:10px 8px;border-radius:12px;text-align:center;cursor:pointer;transition:0.2s;">
              <div style="font-size:12px;color:#b45309;font-weight:800;">
                ${isAr ? '⭐ اشتراك سنوي (وفر 32%)' : '⭐ Annual (Save 32%)'}
                <span id="ns-check-annual" style="display:inline-block;color:#b45309;margin-inline-start:4px;">✓</span>
              </div>
              <div style="font-size:15px;font-weight:900;color:#0f766e;margin-top:4px;">${isAr ? NS_APP_CONFIG.pricing.annualEGP_Ar : NS_APP_CONFIG.pricing.annualEGP}</div>
              <div style="font-size:11.5px;font-weight:700;color:#d97706;">${isAr ? 'أو ' + NS_APP_CONFIG.pricing.annualUSD_Ar : 'or ' + NS_APP_CONFIG.pricing.annualUSD}</div>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;background:#e0f2fe;border:1px solid #bae6fd;padding:8px 12px;border-radius:10px;gap:8px;">
            <code style="font-size:13px;font-weight:900;color:#0369a1;word-break:break-all;">${NS_APP_CONFIG.instapayAddress}</code>
            <button onclick="navigator.clipboard.writeText('${NS_APP_CONFIG.instapayAddress}');alert('${isAr ? 'تم نسخ عنوان InstaPay!' : 'InstaPay address copied!'}');" style="background:#0284c7;color:#fff;border:none;padding:5px 12px;border-radius:8px;cursor:pointer;font-family:Cairo,sans-serif;font-size:12px;font-weight:700;white-space:nowrap;">${isAr ? 'نسخ العنوان' : 'Copy IPA'}</button>
          </div>

          <a id="ns-wa-pay-btn" href="${initialWaUrl}" data-hwid="${hwId}" data-model="${deviceModel.replace(/"/g, '&quot;')}" data-start="${startDateStr}" target="_blank" style="display:block;text-align:center;background:#16a34a;color:#fff;text-decoration:none;padding:9px;border-radius:10px;font-weight:800;font-size:13px;margin-top:10px;">
            ${isAr ? '📲 إرسال إيصال InstaPay وبصمة الجهاز عبر واتساب' : '📲 Send InstaPay Receipt & Device ID via WhatsApp'}
          </a>
        </div>

        <div>
          <label style="display:block;font-size:13px;font-weight:800;color:#0f172a;margin-bottom:6px;">${isAr ? '🔑 أدخل كود التفعيل الخاص ببصمة جهازك:' : '🔑 Enter Activation Code for your Device ID:'}</label>
          <div style="display:flex;gap:8px;">
            <input id="ns-activation-input" type="text" placeholder="PRM-... / PRY-..." style="flex:1;padding:10px;border:1.5px solid #cbd5e1;border-radius:10px;font-family:Cairo,sans-serif;font-size:14px;font-weight:700;text-align:center;text-transform:uppercase;" />
            <button onclick="handleVerifyActivation()" style="background:#0f766e;color:#fff;border:none;padding:10px 20px;border-radius:10px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:800;font-size:14px;">${isAr ? 'تأكيد' : 'Verify'}</button>
          </div>

          <!-- لوحة الأدمن السرية (تظهر عند كتابة ADMIN2026) لتوليد كود شهري أو سنوي أو كود Reject -->
          <div id="ns-secret-admin-panel" style="display:none;margin-top:12px;background:#f1f5f9;border:1.5px dashed #64748b;padding:12px;border-radius:12px;">
            <div style="font-size:12.5px;font-weight:800;color:#0f172a;margin-bottom:6px;">🛠️ لوحة أ/ نورهان صلاح (توليد كود شهري / سنوي / حظر):</div>
            <input id="ns-admin-client-id" type="text" placeholder="أدخلي بصمة جهاز العميل (HW-XXXXXXXX)" style="width:100%;padding:8px;border:1px solid #94a3b8;border-radius:8px;margin-bottom:8px;font-family:Cairo,sans-serif;font-size:13px;box-sizing:border-box;" />
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px;">
              <button onclick="adminGenerateAndShow('monthly')" style="background:#0f766e;color:#fff;border:none;padding:8px;border-radius:8px;cursor:pointer;font-family:Cairo,sans-serif;font-size:12px;font-weight:700;">📅 كود شهري (30 يوم)</button>
              <button onclick="adminGenerateAndShow('annual')" style="background:#d97706;color:#fff;border:none;padding:8px;border-radius:8px;cursor:pointer;font-family:Cairo,sans-serif;font-size:12px;font-weight:700;">👑 كود سنوي (365 يوم)</button>
            </div>
            <button onclick="adminGenerateAndShow('reject')" style="width:100%;background:#b91c1c;color:#fff;border:none;padding:7px;border-radius:8px;cursor:pointer;font-family:Cairo,sans-serif;font-size:12px;font-weight:700;">⛔ توليد كود حظر نهائي (REJECT)</button>
            <div id="ns-admin-out-key" style="margin-top:10px;font-weight:900;color:#0f172a;font-size:13.5px;text-align:center;"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function handleVerifyActivation() {
  const isAr = isAppArabic();
  const val = (document.getElementById('ns-activation-input').value || '').trim().toUpperCase();
  if (val === 'ADMIN2026') {
    const panel = document.getElementById('ns-secret-admin-panel');
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth', block: 'end' });
    return;
  }
  const hwId = getHardwareFingerprint();
  const expectedRej = generateRejectCode(hwId);

  if (val === expectedRej) {
    localStorage.setItem('ns_smartlab_rejected', 'TRUE');
    alert(isAr ? "⛔ تم رفض وحظر هذا الجهاز نهائياً من قِبل الإدارة." : "⛔ This device has been permanently rejected by the administrator.");
    window.location.reload();
    return;
  }

  let matchedPlan = null;
  let durationDays = 0;

  const timedMatch = val.match(/^(PRM|PRY)-(\d{6})-([A-Z0-9]{6})$/);
  if (timedMatch) {
    const prefix = timedMatch[1];
    const stamp = timedMatch[2];
    const planType = prefix === 'PRY' ? 'annual' : 'monthly';
    const expectedCode = generateTimedActivationCode(hwId, planType, stamp);
    if (val === expectedCode) {
      let usedCodes = [];
      try { usedCodes = JSON.parse(localStorage.getItem('ns_smartlab_used_codes') || '[]'); } catch (e) {}
      if (usedCodes.includes(val)) {
        alert(isAr ? "⚠️ تم استخدام هذا الكود مسبقاً. يرجى طلب كود تجديد جديد." : "⚠️ This activation code has already been used. Please request a new renewal code.");
        return;
      }
      usedCodes.push(val);
      localStorage.setItem('ns_smartlab_used_codes', JSON.stringify(usedCodes));
      matchedPlan = planType;
      durationDays = planType === 'annual' ? 365 : 30;
    }
  }

  if (matchedPlan) {
    const now = Date.now() + cachedTimeOffset;
    const prevExpiry = parseInt(localStorage.getItem('ns_smartlab_pro_expiry') || '0', 10);
    const baseTime = prevExpiry > now ? prevExpiry : now;
    const newExpiry = baseTime + (durationDays * 24 * 60 * 60 * 1000);

    localStorage.removeItem('ns_smartlab_rejected');
    localStorage.setItem('ns_smartlab_pro_activated', hwId);
    localStorage.setItem('ns_smartlab_pro_plan', matchedPlan);
    localStorage.setItem('ns_smartlab_pro_expiry', String(newExpiry));

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'ACTIVATE_PRO_OFFLINE' });
    }
    const planNameAr = matchedPlan === 'annual' ? 'السنوي (365 يوماً)' : 'الشهري (30 يوماً)';
    const planNameEn = matchedPlan === 'annual' ? 'Annual (365 days)' : 'Monthly (30 days)';
    alert(isAr
      ? `🎉 تم تفعيل الاشتراك ${planNameAr} بنجاح على بصمة جهازك!`
      : `🎉 ${planNameEn} Pro subscription activated for your device!`);
    window.location.reload();
  } else {
    alert(isAr
      ? "❌ الكود غير صحيح لبصمة هذا الجهاز (" + hwId + ")."
      : "❌ Invalid activation code for this device (" + hwId + ").");
  }
}

function openBookletRulesModal() {
  const old = document.getElementById('ns-booklet-2026-modal');
  if (old) old.remove();

  const isAr = isAppArabic();
  const rulesList = isAr ? MABARET_2026_BOOKLET.generalRulesAr : MABARET_2026_BOOKLET.generalRulesEn;
  const rulesHtml = rulesList.map(r => `<li style="margin-bottom:8px;">${r}</li>`).join('');
  const tatHtml = MABARET_2026_BOOKLET.tatTable.map(r => `
    <tr style="border-bottom:1px solid #e2e8f0;text-align:center;">
      <td style="padding:8px;font-weight:800;background:#f0fdfa;color:#0f766e;">${isAr ? r.dayAr : r.dayEn}</td>
      <td style="padding:8px;">${isAr ? r.nextAr : r.nextEn}</td>
      <td style="padding:8px;">${isAr ? r.h48Ar : r.h48En}</td>
      <td style="padding:8px;">${isAr ? r.h72Ar : r.h72En}</td>
      <td style="padding:8px;">${isAr ? r.h96Ar : r.h96En}</td>
      <td style="padding:8px;">${isAr ? r.week1Ar : r.week1En}</td>
    </tr>
  `).join('');
  const instHtml = MABARET_2026_BOOKLET.instruments.map(i => `
    <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:8px 12px;border-radius:10px;display:flex;align-items:center;gap:8px;">
      <span style="background:#dcfce7;color:#15803d;font-weight:900;padding:2px 8px;border-radius:6px;font-size:13px;">${i.code}</span>
      <span style="font-size:12.5px;color:#334155;font-weight:600;">${i.name}</span>
    </div>
  `).join('');

  const modal = document.createElement('div');
  modal.id = 'ns-booklet-2026-modal';
  modal.style.cssText = `position:fixed;inset:0;background:rgba(15,23,42,0.85);backdrop-filter:blur(5px);z-index:99998;display:flex;align-items:center;justify-content:center;padding:16px;direction:${isAr ? 'rtl' : 'ltr'};font-family:Cairo,sans-serif;`;

  modal.innerHTML = `
    <div style="background:#fff;color:#1e293b;max-width:780px;width:100%;border-radius:24px;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.45);max-height:90vh;display:flex;flex-direction:column;">
      <div style="background:linear-gradient(135deg,#134e4a,#0f766e);color:#fff;padding:16px 22px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <h3 style="margin:0;font-size:17px;font-weight:900;">${isAr ? '📘 قواعد المعمل والمواعيد - كتيب 2026' : '📘 Lab Rules & Turnaround Timings (2026)'}</h3>
          <p style="margin:2px 0 0;font-size:12px;color:#99f6e4;">${isAr ? MABARET_2026_BOOKLET.versionAr : MABARET_2026_BOOKLET.versionEn}</p>
        </div>
        <button onclick="document.getElementById('ns-booklet-2026-modal').remove()" style="background:rgba(255,255,255,0.15);color:#fff;border:none;padding:6px 14px;border-radius:10px;cursor:pointer;font-family:Cairo,sans-serif;font-weight:bold;">${isAr ? 'إغلاق ✕' : 'Close ✕'}</button>
      </div>

      <div style="padding:20px;overflow-y:auto;">
        <h4 style="margin:0 0 10px;color:#0f766e;font-size:15px;font-weight:900;">${isAr ? '1️⃣ القواعد العامة للاستلام، التخفيف، والمعدلات الطبيعية:' : '1️⃣ General Reception, Dilution & Reference Range Rules:'}</h4>
        <ul style="font-size:13.5px;line-height:1.75;color:#334155;padding-${isAr ? 'right' : 'left'}:20px;margin-bottom:20px;">${rulesHtml}</ul>

        <h4 style="margin:0 0 10px;color:#0f766e;font-size:15px;font-weight:900;">${isAr ? '2️⃣ جدول حساب مواعيد استلام النتائج (مع إسقاط عطلة يوم الجمعة):' : '2️⃣ Turnaround Time (TAT) Schedule (Excluding Fridays):'}</h4>
        <div style="overflow-x:auto;margin-bottom:20px;">
          <table style="width:100%;border-collapse:collapse;font-size:13px;border:1px solid #cbd5e1;">
            <thead>
              <tr style="background:#0f766e;color:#fff;">
                <th style="padding:9px;">${isAr ? 'يوم إرسال العينة' : 'Sample Day'}</th>
                <th style="padding:9px;">Next Day Result</th>
                <th style="padding:9px;">48h Result</th>
                <th style="padding:9px;">72h Result</th>
                <th style="padding:9px;">96h Result</th>
                <th style="padding:9px;">1-Week Result</th>
              </tr>
            </thead>
            <tbody>${tatHtml}</tbody>
          </table>
        </div>

        <h4 style="margin:0 0 10px;color:#0f766e;font-size:15px;font-weight:900;">${isAr ? '3️⃣ دليل الحروف الخضراء لأجهزة التحاليل المعتمدة في الكتيب:' : '3️⃣ Analyzer Instrument Codes:'}</h4>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:8px;">${instHtml}</div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSmartLabProSystem);
} else {
  initSmartLabProSystem();
}
