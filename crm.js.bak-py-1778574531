// === IndexedDB 图片存储层 ===

const imgDB = {
  _db: null,
  async open() {
    if (this._db) return this._db;
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('crm_images', 1);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('images')) {
          db.createObjectStore('images', { keyPath: 'id' });
        }
      };
      req.onsuccess = e => { this._db = e.target.result; resolve(this._db); };
      req.onerror = e => reject(e);
    });
  },
  async put(id, dataUrl) {
    await this.open();
    const blob = dataUrlToBlob(dataUrl);
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(['images'], 'readwrite');
      tx.objectStore('images').put({ id, blob, size: blob.size, createdAt: new Date().toISOString() });
      tx.oncomplete = () => resolve(id);
      tx.onerror = e => reject(e);
    });
  },
  async putBlob(id, blob) {
    await this.open();
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(['images'], 'readwrite');
      tx.objectStore('images').put({ id, blob, size: blob.size, createdAt: new Date().toISOString() });
      tx.oncomplete = () => resolve(id);
      tx.onerror = e => reject(e);
    });
  },
  async get(id) {
    await this.open();
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(['images'], 'readonly');
      const req = tx.objectStore('images').get(id);
      req.onsuccess = () => resolve(req.result ? req.result.blob : null);
      req.onerror = e => reject(e);
    });
  },
  async getDataUrl(id) {
    const blob = await this.get(id);
    if (!blob) return null;
    return blobToDataUrl(blob);
  },
  async delete(id) {
    await this.open();
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(['images'], 'readwrite');
      tx.objectStore('images').delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = e => reject(e);
    });
  },
  async getAllIds() {
    await this.open();
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(['images'], 'readonly');
      const req = tx.objectStore('images').getAllKeys();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = e => reject(e);
    });
  },
  async getAllEntries() {
    await this.open();
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(['images'], 'readonly');
      const req = tx.objectStore('images').getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = e => reject(e);
    });
  },
  async clear() {
    await this.open();
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(['images'], 'readwrite');
      tx.objectStore('images').clear();
      tx.oncomplete = () => resolve();
      tx.onerror = e => reject(e);
    });
  },
  async getStats() {
    const ids = await this.getAllIds();
    let totalSize = 0;
    if (navigator.storage && navigator.storage.estimate) {
      const e = await navigator.storage.estimate();
      totalSize = e.usage || 0;
    }
    return { count: ids.length, usage: totalSize, quota: (navigator.storage && navigator.storage.estimate) ? (await navigator.storage.estimate()).quota : 0 };
  }
};

function dataUrlToBlob(dataUrl) {
  const arr = dataUrl.split(',');
  const mime = (arr[0].match(/:(.*?);/) || ['', 'image/jpeg'])[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8 = new Uint8Array(n);
  while (n--) u8[n] = bstr.charCodeAt(n);
  return new Blob([u8], { type: mime });
}

function blobToDataUrl(blob) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

// === 图片缓存（Map: imageId -> blobURL）===
const imgCache = new Map();

async function preloadAllImages() {
  try {
    const entries = await imgDB.getAllEntries();
    entries.forEach(entry => {
      if (!imgCache.has(entry.id)) {
        imgCache.set(entry.id, URL.createObjectURL(entry.blob));
      }
    });
    console.log('Loaded', entries.length, 'images from IndexedDB');
  } catch (e) {
    console.warn('preloadAllImages failed', e);
  }
}

// 同步取 URL：如果是 imageId 引用，从 cache 返回 blobURL；否则原值返回
function imgUrl(ref) {
  if (!ref) return '';
  if (typeof ref === 'string' && ref.startsWith('img_')) {
    return imgCache.get(ref) || '';
  }
  return ref; // 旧 base64 兼容
}

// 保存新图片：dataUrl → 写入 IndexedDB + cache，返回 imageId
async function saveImage(dataUrl) {
  if (!dataUrl) return '';
  if (typeof dataUrl === 'string' && dataUrl.startsWith('img_')) return dataUrl; // 已是 ID
  const id = 'img_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
  try {
    await imgDB.put(id, dataUrl);
    const blob = await imgDB.get(id);
    if (blob) imgCache.set(id, URL.createObjectURL(blob));
    return id;
  } catch (e) {
    console.warn('saveImage failed', e);
    toast('图片保存失败：' + e.message, 'error');
    return '';
  }
}

// 删除图片
async function deleteImage(ref) {
  if (!ref || typeof ref !== 'string' || !ref.startsWith('img_')) return;
  try {
    if (imgCache.has(ref)) {
      URL.revokeObjectURL(imgCache.get(ref));
      imgCache.delete(ref);
    }
    await imgDB.delete(ref);
  } catch (e) { console.warn('deleteImage failed', e); }
}

// 富文本里 base64 图片 → imageId 引用
async function rewriteRichTextImages(html) {
  if (!html || typeof html !== 'string') return html;
  // 找所有 data:image src
  const matches = [...html.matchAll(/src="(data:image\/[^"]+)"/g)];
  let result = html;
  for (const m of matches) {
    const id = await saveImage(m[1]);
    if (id) result = result.replace(m[1], id);
  }
  return result;
}

// 富文本渲染时：把 imageId 替换为 blob URL
function resolveRichTextImages(html) {
  if (!html || typeof html !== 'string') return html;
  return html.replace(/src="(img_[^"]+)"/g, (m, id) => {
    const url = imgCache.get(id);
    return 'src="' + (url || '') + '"';
  });
}

// 一次性迁移：把所有 base64 搬到 IndexedDB
async function migrateAllImagesToIndexedDB() {
  if (DB.meta && DB.meta.imageMigrationV1Done) return 0;
  let migrated = 0;

  // 1. 产品图
  for (const p of (DB.products || [])) {
    if (p.image && typeof p.image === 'string' && p.image.startsWith('data:image/')) {
      const id = await saveImage(p.image);
      if (id) { p.image = id; migrated++; }
    }
  }

  // 2. 订单唛头图
  for (const o of (DB.orders || [])) {
    if (o.marks && typeof o.marks === 'object') {
      if (o.marks.mainImage && typeof o.marks.mainImage === 'string' && o.marks.mainImage.startsWith('data:image/')) {
        const id = await saveImage(o.marks.mainImage);
        if (id) { o.marks.mainImage = id; migrated++; }
      }
      if (o.marks.sideImage && typeof o.marks.sideImage === 'string' && o.marks.sideImage.startsWith('data:image/')) {
        const id = await saveImage(o.marks.sideImage);
        if (id) { o.marks.sideImage = id; migrated++; }
      }
    }
  }

  // 3. 客户档案块图片
  for (const c of (DB.customers || [])) {
    for (const b of (c.dossier || [])) {
      if (b.type === 'image' && b.content && typeof b.content === 'object' && b.content.src && typeof b.content.src === 'string' && b.content.src.startsWith('data:image/')) {
        const id = await saveImage(b.content.src);
        if (id) { b.content.src = id; migrated++; }
      }
    }
  }

  // 4. 跟进富文本内嵌图片
  for (const f of (DB.followups || [])) {
    if (f.content && typeof f.content === 'string' && f.content.indexOf('data:image/') >= 0) {
      const before = f.content;
      f.content = await rewriteRichTextImages(f.content);
      if (f.content !== before) migrated++;
    }
  }

  DB.meta = DB.meta || {};
  DB.meta.imageMigrationV1Done = true;
  saveDB();
  if (migrated > 0) {
    toast('已迁移 ' + migrated + ' 处图片到大容量存储', 'success');
    console.log('Image migration complete:', migrated);
  }
  return migrated;
}

/* ============================================================
 * 常量定义
 * ============================================================ */

const NAV_MENU = [
  { id: 'dashboard',     name: '工作台',   icon: '▦' },
  { id: 'leads',         name: '线索/询盘', icon: '◎' },
  { id: 'customers',     name: '客户',     icon: '●' },
  { id: 'opportunities', name: '商机',     icon: '◆' },
  { id: 'products',      name: '产品库',   icon: '▣' },
  { id: 'quotations',    name: '报价单',   icon: '$' },
  { id: 'samples',       name: '样品',     icon: '⬢' },
  { id: 'orders',        name: '订单',     icon: '▤' },
  { id: 'shipments',     name: '出货单',   icon: '📦' },
  { id: 'followups',     name: '跟进',     icon: '◉' },
  { id: 'templates',     name: '邮件模板', icon: '✉' },
  { id: 'backup',        name: '数据备份', icon: '⇅' },
];

/* 国家列表（中文/英文/ISO代码） */
const COUNTRIES = [
  ['中国','China','CN'],['美国','United States','US'],['英国','United Kingdom','GB'],
  ['德国','Germany','DE'],['法国','France','FR'],['意大利','Italy','IT'],
  ['西班牙','Spain','ES'],['葡萄牙','Portugal','PT'],['荷兰','Netherlands','NL'],
  ['比利时','Belgium','BE'],['瑞士','Switzerland','CH'],['奥地利','Austria','AT'],
  ['瑞典','Sweden','SE'],['挪威','Norway','NO'],['丹麦','Denmark','DK'],
  ['芬兰','Finland','FI'],['爱尔兰','Ireland','IE'],['希腊','Greece','GR'],
  ['波兰','Poland','PL'],['捷克','Czechia','CZ'],['匈牙利','Hungary','HU'],
  ['俄罗斯','Russia','RU'],['乌克兰','Ukraine','UA'],['土耳其','Turkey','TR'],
  ['加拿大','Canada','CA'],['墨西哥','Mexico','MX'],['巴西','Brazil','BR'],
  ['阿根廷','Argentina','AR'],['智利','Chile','CL'],['哥伦比亚','Colombia','CO'],
  ['秘鲁','Peru','PE'],['哥斯达黎加','Costa Rica','CR'],['巴拿马','Panama','PA'],
  ['澳大利亚','Australia','AU'],['新西兰','New Zealand','NZ'],
  ['日本','Japan','JP'],['韩国','South Korea','KR'],['朝鲜','North Korea','KP'],
  ['印度','India','IN'],['巴基斯坦','Pakistan','PK'],['孟加拉国','Bangladesh','BD'],
  ['斯里兰卡','Sri Lanka','LK'],['尼泊尔','Nepal','NP'],
  ['泰国','Thailand','TH'],['越南','Vietnam','VN'],['印度尼西亚','Indonesia','ID'],
  ['马来西亚','Malaysia','MY'],['菲律宾','Philippines','PH'],['新加坡','Singapore','SG'],
  ['缅甸','Myanmar','MM'],['柬埔寨','Cambodia','KH'],['老挝','Laos','LA'],
  ['香港','Hong Kong','HK'],['台湾','Taiwan','TW'],['澳门','Macau','MO'],
  ['沙特阿拉伯','Saudi Arabia','SA'],['阿联酋','United Arab Emirates','AE'],
  ['伊朗','Iran','IR'],['伊拉克','Iraq','IQ'],['以色列','Israel','IL'],
  ['约旦','Jordan','JO'],['科威特','Kuwait','KW'],['黎巴嫩','Lebanon','LB'],
  ['卡塔尔','Qatar','QA'],['阿曼','Oman','OM'],['也门','Yemen','YE'],['叙利亚','Syria','SY'],
  ['埃及','Egypt','EG'],['南非','South Africa','ZA'],['尼日利亚','Nigeria','NG'],
  ['肯尼亚','Kenya','KE'],['坦桑尼亚','Tanzania','TZ'],['埃塞俄比亚','Ethiopia','ET'],
  ['加纳','Ghana','GH'],['摩洛哥','Morocco','MA'],['阿尔及利亚','Algeria','DZ'],
  ['突尼斯','Tunisia','TN'],['利比亚','Libya','LY'],['苏丹','Sudan','SD'],
];

/* 国旗 emoji 转换 */
function flagEmoji(code) {
  if (!code || code.length !== 2) return '';
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
}
function countryByName(name) {
  if (!name) return null;
  const lower = name.toLowerCase().trim();
  return COUNTRIES.find(([zh, en]) => zh === name || en.toLowerCase() === lower) || null;
}
function flagFor(name) {
  const c = countryByName(name);
  return c ? flagEmoji(c[2]) : '';
}

/* 客户来源 */
const CUSTOMER_SOURCES = ['阿里巴巴', '环球资源', '中国制造', '展会', '官网询盘', '社交媒体', '客户介绍', '老客户复购', '其他'];

/* 客户状态 */
const CUSTOMER_STATUSES = [
  { name: '重点客户',     tag: 'tag-red' },
  { name: '普通意向客户', tag: 'tag-orange' },
  { name: '已成交',       tag: 'tag-green' },
  { name: '已打样',       tag: 'tag-blue' },
  { name: '暂无需求',     tag: 'tag-gray' },
  { name: '已搁置',       tag: 'tag-gray' },
];

/* 线索状态 */
const LEAD_STATUSES = [
  { name: '新询盘',     tag: 'tag-blue' },
  { name: '跟进中',     tag: 'tag-orange' },
  { name: '已转客户',   tag: 'tag-green' },
  { name: '无效',       tag: 'tag-gray' },
];

/* 商机阶段 */
const OPP_STAGES = [
  { name: '新建',       prob: 10, tag: 'tag-gray' },
  { name: '方案沟通',   prob: 30, tag: 'tag-blue' },
  { name: '报价中',     prob: 50, tag: 'tag-cyan' },
  { name: '谈判中',     prob: 70, tag: 'tag-orange' },
  { name: '即将成交',   prob: 90, tag: 'tag-purple' },
  { name: '已赢',       prob: 100, tag: 'tag-green' },
  { name: '已输',       prob: 0, tag: 'tag-red' },
];

/* 样品状态 */
const SAMPLE_STATUSES = [
  { name: '筹备中', tag: 'tag-gray' },
  { name: '已寄出', tag: 'tag-blue' },
  { name: '待反馈', tag: 'tag-orange' },
  { name: '已反馈', tag: 'tag-purple' },
  { name: '已成交', tag: 'tag-green' },
  { name: '已搁置', tag: 'tag-red' },
];

/* 订单付款状态 */
const PAYMENT_STATUSES = [
  { name: '未付款',     tag: 'tag-red' },
  { name: '已付定金',   tag: 'tag-orange' },
  { name: '部分付款',   tag: 'tag-orange' },
  { name: '已结清',     tag: 'tag-green' },
];

/* 订单生产状态 */
const PRODUCTION_STATUSES = [
  { name: '未开始', tag: 'tag-gray' },
  { name: '生产中', tag: 'tag-blue' },
  { name: '已完工', tag: 'tag-purple' },
  { name: '已发货', tag: 'tag-orange' },
  { name: '已收货', tag: 'tag-green' },
];

/* 报价单状态 */
const QT_STATUSES = [
  { name: '草稿',     tag: 'tag-gray' },
  { name: '已发出',   tag: 'tag-blue' },
  { name: '客户接受', tag: 'tag-green' },
  { name: '客户拒绝', tag: 'tag-red' },
  { name: '已转订单', tag: 'tag-purple' },
];

/* 沟通方式 */
const SHIPMENT_STATUSES = [
  { name: '草稿', tag: 'tag-gray' },
  { name: '已出货', tag: 'tag-blue' },
  { name: '已完成', tag: 'tag-green' },
];

const CHANNELS = ['邮件', 'WhatsApp', '微信', '电话', '视频会议', '当面拜访', '其他'];

/* 币种 */
const CURRENCIES = ['USD', 'CNY', 'EUR', 'GBP', 'JPY', 'HKD', 'AUD', 'CAD'];

/* 默认邮件模板 */
const DEFAULT_TEMPLATES = [
  {
    id: 'tpl_inquiry',
    name: '询盘回复',
    subject: 'Re: Your inquiry about {{productName}}',
    body: `Dear {{contact}},

Thank you very much for your inquiry from {{country}}. We are pleased to introduce our company and products.

Regarding {{productName}}, please find our quotation as below:
- Product: {{productName}}
- MOQ:
- Unit Price:
- Lead Time:
- Payment Terms: 30% T/T deposit, 70% before shipment
- Validity: 30 days

Please feel free to let me know if you need any further information.

Best regards,
{{myName}}`
  },
  {
    id: 'tpl_quotation',
    name: '正式报价',
    subject: 'Quotation for {{productName}} - {{date}}',
    body: `Dear {{contact}},

As discussed, please find attached our official quotation for {{productName}}.

Quote No.:
Validity: 30 days
Payment Terms: 30% T/T deposit, 70% balance against B/L copy
Delivery Time:
Trade Terms: FOB

Looking forward to your kind feedback.

Best regards,
{{myName}}`
  },
  {
    id: 'tpl_sample',
    name: '样品发出通知',
    subject: 'Sample Sent - {{productName}}',
    body: `Dear {{contact}},

This is to inform you that we have sent out the samples of {{productName}} today.

Courier: DHL/FedEx/UPS
Tracking No.:
Estimated Delivery: 3-5 working days

Please kindly check after receiving and let us know your feedback.

Best regards,
{{myName}}`
  },
  {
    id: 'tpl_order',
    name: '订单确认',
    subject: 'Order Confirmation - {{orderNo}}',
    body: `Dear {{contact}},

Thank you for your order!

Order No.: {{orderNo}}
Order Date: {{date}}

We have received your PO and will arrange production immediately. We will keep you updated with the production progress.

Estimated shipping date:

Best regards,
{{myName}}`
  },
  {
    id: 'tpl_followup',
    name: '日常跟进',
    subject: 'Following up - {{company}}',
    body: `Dear {{contact}},

Hope this email finds you well.

I am writing to follow up on our previous discussion about {{productName}}. I would like to know your thoughts and if there is anything I can help with.

Looking forward to your reply.

Best regards,
{{myName}}`
  },
  {
    id: 'tpl_holiday',
    name: '节日问候',
    subject: 'Season Greetings from {{myName}}',
    body: `Dear {{contact}},

Wishing you and your family a wonderful holiday season!

Thank you for your continued support and friendship throughout this year. We look forward to working with you in the year ahead.

Best regards,
{{myName}}`
  },
];

/* ============================================================
 * 数据存储
 * ============================================================ */

const STORAGE_KEY = 'foreign_trade_crm_v2';

let DB = {
  customers: [],
  leads: [],
  opportunities: [],
  products: [],
  productCategories: [],
  quotations: [],
  samples: [],
  orders: [],
  shipments: [],
  followups: [],
  templates: [],
  meta: { version: 2, updatedAt: null, counters: {}, myName: '', tags: [] }
};

function loadDB() {
  try {
    // 兼容旧版本数据
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('foreign_trade_crm_v1');
    if (raw) {
      const data = JSON.parse(raw);
      DB = Object.assign(DB, data);
    }
    // 确保所有字段存在
    DB.leads = DB.leads || [];
    DB.opportunities = DB.opportunities || [];
    DB.products = DB.products || [];
    DB.productCategories = DB.productCategories || [];
    DB.quotations = DB.quotations || [];
    DB.shipments = DB.shipments || [];
    migrateProducts();
    migrateSamples();
    migrateOrders();
    DB.templates = DB.templates || [];
    DB.meta = DB.meta || {};
    DB.meta.counters = DB.meta.counters || {};
    DB.meta.tags = DB.meta.tags || [];
    DB.meta.myName = DB.meta.myName || '';
    DB.meta.autoBackup = DB.meta.autoBackup || { enabled: false, intervalDays: 7, lastBackupAt: null };
    // 注入默认模板
    if (DB.templates.length === 0) {
      DB.templates = DEFAULT_TEMPLATES.map(t => ({ ...t, id: uid() }));
    }
  } catch (e) { console.error('加载失败', e); }
}

function saveDB() {
  DB.meta.updatedAt = new Date().toISOString();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DB));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      toast('存储空间已满！请删除部分图片或导出后清理', 'error');
    }
  }
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function nextCode(prefix) {
  const ym = todayStr().substr(0, 7).replace('-', '');
  DB.meta.counters[prefix] = (DB.meta.counters[prefix] || 0) + 1;
  return prefix + ym + String(DB.meta.counters[prefix]).padStart(4, '0');
}

/* ============================================================
 * 工具函数
 * ============================================================ */

function fmtDate(s) { if (!s) return ''; return s.length > 10 ? s.substr(0, 10) : s; }
function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function nl2br(s) { return escapeHtml(s).replace(/\n/g, '<br>'); }

/* ===== 富文本工具函数 ===== */
function isHtml(s) { return typeof s === 'string' && /<[a-z!][\s\S]*?>/i.test(s); }

function htmlToText(s) {
  if (!s) return '';
  if (!isHtml(s)) return s;
  const d = document.createElement('div');
  d.innerHTML = s;
  // 替换 <br> 和块级标签为换行
  d.querySelectorAll('br').forEach(n => n.replaceWith('\n'));
  d.querySelectorAll('p, div, li').forEach(n => { if (!n.textContent.endsWith('\n')) n.append('\n'); });
  return (d.innerText || d.textContent || '').trim();
}

function sanitizeRichHtml(html) {
  if (!html) return '';
  const d = document.createElement('div');
  d.innerHTML = html;
  // 移除危险节点
  d.querySelectorAll('script, style, iframe, object, embed, link, meta').forEach(n => n.remove());
  // 清理属性
  d.querySelectorAll('*').forEach(el => {
    [...el.attributes].forEach(attr => {
      const n = attr.name.toLowerCase(), v = attr.value || '';
      if (n.startsWith('on')) el.removeAttribute(attr.name);
      else if (n === 'href' && /^\s*javascript:/i.test(v)) el.removeAttribute(attr.name);
      else if (n === 'src' && !/^(https?:|data:image\/|\/|\.\/|blob:)/i.test(v)) el.removeAttribute(attr.name);
    });
  });
  return d.innerHTML;
}

function renderRichText(s) {
  if (!s) return '';
  if (isHtml(s)) return sanitizeRichHtml(resolveRichTextImages(s));
  return nl2br(s);
}

function compressImgFile(file, callback) {
  if (!file || !file.type || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      const max = 1200;
      const scale = Math.min(max / img.width, max / img.height, 1);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      let data = canvas.toDataURL('image/jpeg', 0.75);
      if (data.length > 685000) data = canvas.toDataURL('image/jpeg', 0.55);
      callback(data);
    };
    img.onerror = () => toast('图片加载失败', 'error');
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

/* ===== 富文本编辑器组件 ===== */
function richTextEditor(name, raw, opts) {
  opts = opts || {};
  const id = 'rte_' + name + '_' + Math.random().toString(36).substr(2, 6);
  const initial = isHtml(raw) ? sanitizeRichHtml(resolveRichTextImages(raw)) : escapeHtml(raw || '').replace(/\n/g, '<br>');
  const placeholder = opts.placeholder || '在此输入...支持粘贴图片 (Ctrl+V)、拖入图片';
  const minH = opts.minHeight || 120;
  return `
    <div class="rte-wrap">
      <div class="rte-toolbar">
        <select onchange="rteFmt('fontSize',this.value);this.selectedIndex=0" title="字号">
          <option value="">字号</option>
          <option value="2">小</option>
          <option value="3">正常</option>
          <option value="4">中</option>
          <option value="5">大</option>
          <option value="6">特大</option>
        </select>
        <span class="sep"></span>
        <button type="button" onclick="rteFmt('bold')" title="加粗"><b>B</b></button>
        <button type="button" onclick="rteFmt('italic')" title="斜体"><i>I</i></button>
        <button type="button" onclick="rteFmt('underline')" title="下划线"><u>U</u></button>
        <button type="button" onclick="rteFmt('strikeThrough')" title="删除线"><s>S</s></button>
        <span class="sep"></span>
        <label class="rte-color-wrap" title="字色"><span style="font-weight:600;">A</span>
          <input type="color" value="#2c3e50" onchange="rteFmt('foreColor',this.value)"></label>
        <label class="rte-color-wrap" title="背景色"><span style="background:#fef08a;padding:0 3px;border-radius:2px;">A</span>
          <input type="color" value="#fef08a" onchange="rteHilite(this.value)"></label>
        <span class="sep"></span>
        <button type="button" onclick="rteFmt('insertUnorderedList')" title="无序列表">• ≡</button>
        <button type="button" onclick="rteFmt('insertOrderedList')" title="有序列表">1. ≡</button>
        <span class="sep"></span>
        <button type="button" onclick="rteFmt('justifyLeft')" title="左对齐">⫷</button>
        <button type="button" onclick="rteFmt('justifyCenter')" title="居中">⫶</button>
        <button type="button" onclick="rteFmt('justifyRight')" title="右对齐">⫸</button>
        <span class="sep"></span>
        <button type="button" onclick="rteLink()" title="链接">链接</button>
        <button type="button" onclick="rteInsertImage('${id}')" title="插入图片">图片</button>
        <button type="button" onclick="rteFmt('removeFormat')" title="清除格式">清</button>
      </div>
      <div id="${id}" class="rte-editor" contenteditable="true"
        data-name="${name}" data-placeholder="${escapeHtml(placeholder)}"
        style="min-height:${minH}px"
        onpaste="rteHandlePaste(event,this)"
        ondrop="rteHandleDrop(event,this)"
        ondragover="event.preventDefault()">${initial}</div>
      <div class="rte-hint">提示：可直接 Ctrl+V 粘贴截图、Word 文字；拖入图片自动压缩</div>
    </div>
  `;
}

function rteFmt(cmd, arg) {
  // 保持选区
  document.execCommand(cmd, false, arg || null);
}

function rteHilite(color) {
  // Chrome 用 hiliteColor，Firefox 用 backColor
  if (!document.execCommand('hiliteColor', false, color)) {
    document.execCommand('backColor', false, color);
  }
}

function rteLink() {
  const sel = window.getSelection();
  const txt = sel && sel.toString();
  if (!txt) { toast('请先选中要加链接的文字', 'error'); return; }
  const url = prompt('链接 URL：', 'https://');
  if (url) document.execCommand('createLink', false, url);
}

function rteInsertImage(editorId) {
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = 'image/*';
  inp.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    compressImgFile(file, dataUrl => {
      const editor = document.getElementById(editorId);
      if (!editor) return;
      editor.focus();
      document.execCommand('insertHTML', false, '<img src="' + dataUrl + '"><br>');
    });
  };
  inp.click();
}

function rteHandlePaste(e, editor) {
  const cd = e.clipboardData || window.clipboardData;
  if (!cd) return;
  // 优先处理图片
  const items = cd.items || [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].type && items[i].type.startsWith('image/')) {
      e.preventDefault();
      const file = items[i].getAsFile();
      compressImgFile(file, dataUrl => {
        editor.focus();
        document.execCommand('insertHTML', false, '<img src="' + dataUrl + '"><br>');
      });
      return;
    }
  }
  // 文本/HTML：sanitize 后插入（避免粘进 Word 的复杂样式）
  e.preventDefault();
  const html = cd.getData('text/html');
  const text = cd.getData('text/plain');
  if (html) {
    document.execCommand('insertHTML', false, sanitizeRichHtml(html));
  } else if (text) {
    document.execCommand('insertText', false, text);
  }
}

function rteHandleDrop(e, editor) {
  const files = e.dataTransfer && e.dataTransfer.files;
  if (files && files.length > 0 && files[0].type && files[0].type.startsWith('image/')) {
    e.preventDefault();
    compressImgFile(files[0], dataUrl => {
      editor.focus();
      document.execCommand('insertHTML', false, '<img src="' + dataUrl + '"><br>');
    });
  }
}

function rteGetValue(formEl, name) {
  const ed = formEl.querySelector('.rte-editor[data-name="' + name + '"]');
  if (!ed) return '';
  return sanitizeRichHtml(ed.innerHTML.trim());
}

function rteIsEmpty(formEl, name) {
  const ed = formEl.querySelector('.rte-editor[data-name="' + name + '"]');
  if (!ed) return true;
  return !ed.innerText.trim() && !ed.querySelector('img');
}
function truncate(s, n) {
  s = s || ''; return s.length > n ? s.substr(0, n) + '...' : s;
}
function getStatus(list, name) { return list.find(s => s.name === name) || { tag: 'tag-gray' }; }

/* ===== 装箱计算工具函数 ===== */
function calcCartonCBM(p) {
  if (!p) return 0;
  const L = parseFloat(p.cartonLength) || 0;
  const W = parseFloat(p.cartonWidth) || 0;
  const H = parseFloat(p.cartonHeight) || 0;
  if (L > 0 && W > 0 && H > 0) return (L * W * H) / 1000000;
  return 0;
}

function hasPackingInfo(p) {
  if (!p) return false;
  return Number(p.qtyPerCarton) > 0
    && Number(p.cartonLength) > 0
    && Number(p.cartonWidth) > 0
    && Number(p.cartonHeight) > 0
    && Number(p.cartonGrossWeight) > 0;
}

function packingSummary(p) {
  if (!hasPackingInfo(p)) return '<span class="muted" style="font-size:11px;">未录入</span>';
  const cbm = calcCartonCBM(p).toFixed(4);
  const gw = Number(p.cartonGrossWeight).toFixed(1);
  return `<span style="font-size:11px;">${p.qtyPerCarton}/CTN · ${cbm}CBM · ${gw}kg</span>`;
}

function updateCartonCBM() {
  const form = document.getElementById('productForm');
  if (!form) return;
  const L = parseFloat(form.cartonLength.value) || 0;
  const W = parseFloat(form.cartonWidth.value) || 0;
  const H = parseFloat(form.cartonHeight.value) || 0;
  const cbm = (L * W * H) / 1000000;
  const display = document.getElementById('cartonCbmDisplay');
  if (display) {
    if (cbm > 0) {
      display.textContent = cbm.toFixed(4) + ' CBM';
      display.style.color = '#10b981';
    } else {
      display.textContent = '-- CBM';
      display.style.color = '#9ca3af';
    }
  }
}
function customerById(id) { return DB.customers.find(c => c.id === id); }
function customerName(id) {
  const c = customerById(id);
  return c ? escapeHtml(c.company) : '<span class="muted">[已删除]</span>';
}
function customerNameWithFlag(id) {
  const c = customerById(id);
  if (!c) return '<span class="muted">[已删除]</span>';
  const flag = flagFor(c.country);
  return (flag ? '<span class="flag">' + flag + '</span>' : '') + escapeHtml(c.company);
}
function productById(id) { return DB.products.find(p => p.id === id); }

function starsHtml(n) {
  n = Number(n) || 0;
  let html = '<span class="stars">';
  for (let i = 1; i <= 5; i++) {
    html += i <= n ? '★' : '<span class="stars-empty">★</span>';
  }
  return html + '</span>';
}

function starInputHtml(n, name) {
  n = Number(n) || 0;
  let html = '<input type="hidden" name="' + name + '" value="' + n + '">';
  html += '<div class="stars" data-stars="' + name + '">';
  for (let i = 1; i <= 5; i++) {
    html += '<span class="star-input" data-val="' + i + '" onclick="setStar(this)">' +
            (i <= n ? '★' : '<span class="stars-empty">★</span>') + '</span>';
  }
  return html + '</div>';
}

function setStar(el) {
  const val = Number(el.dataset.val);
  const wrap = el.parentElement;
  const name = wrap.dataset.stars;
  wrap.parentElement.querySelector('input[name="' + name + '"]').value = val;
  wrap.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const span = document.createElement('span');
    span.className = 'star-input';
    span.dataset.val = i;
    span.onclick = function() { setStar(this); };
    span.innerHTML = i <= val ? '★' : '<span class="stars-empty">★</span>';
    wrap.appendChild(span);
  }
}

/* 标签输入 */
function tagsInputHtml(tags, name) {
  tags = tags || [];
  return '<div class="tag-input-wrap" data-tags="' + name + '">' +
    '<input type="hidden" name="' + name + '" value="' + escapeHtml(tags.join(',')) + '">' +
    tags.map(t => `<span class="tag-chip">${escapeHtml(t)}<span class="x" onclick="removeTag(this)">×</span></span>`).join('') +
    '<input type="text" placeholder="输入标签后回车" onkeydown="addTag(event,this)">' +
  '</div>';
}

function addTag(e, input) {
  if (e.key !== 'Enter' && e.key !== ',') return;
  e.preventDefault();
  const val = input.value.trim();
  if (!val) return;
  const wrap = input.parentElement;
  const hidden = wrap.querySelector('input[type="hidden"]');
  const arr = (hidden.value || '').split(',').filter(Boolean);
  if (!arr.includes(val)) arr.push(val);
  hidden.value = arr.join(',');
  // 添加到全局标签库
  if (!DB.meta.tags.includes(val)) DB.meta.tags.push(val);
  // 重渲染
  input.value = '';
  const chip = document.createElement('span');
  chip.className = 'tag-chip';
  chip.innerHTML = escapeHtml(val) + '<span class="x" onclick="removeTag(this)">×</span>';
  wrap.insertBefore(chip, input);
}

function removeTag(x) {
  const chip = x.parentElement;
  const text = chip.firstChild.textContent;
  const wrap = chip.parentElement;
  const hidden = wrap.querySelector('input[type="hidden"]');
  hidden.value = (hidden.value || '').split(',').filter(t => t && t !== text).join(',');
  chip.remove();
}

/* 图片处理：压缩到 max 400x400 base64 */
function handleImageFile(file, callback) {
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      const max = 400;
      const scale = Math.min(max / img.width, max / img.height, 1);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL('image/jpeg', 0.82));
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

/* ============================================================
 * Toast & Modal
 * ============================================================ */

function toast(msg, type = '') {
  const el = document.getElementById('toast');
  el.className = 'toast show ' + type;
  el.textContent = msg;
  setTimeout(() => { el.className = 'toast ' + type; }, 2200);
}

function openModal(title, bodyHtml, footerHtml, size) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = bodyHtml;
  document.getElementById('modalFooter').innerHTML = footerHtml || '';
  const m = document.getElementById('modal');
  m.className = 'modal' + (size === 'lg' ? ' modal-lg' : size === 'xl' ? ' modal-xl' : '');
  document.getElementById('modalMask').classList.add('show');
}
function closeModal() { document.getElementById('modalMask').classList.remove('show'); }
document.getElementById('modalMask').addEventListener('click', e => {
  if (e.target.id === 'modalMask') closeModal();
});

/* ============================================================
 * 路由
 * ============================================================ */

let currentPage = 'dashboard';

function renderNav() {
  const overdueCount = countOverdueFollowups();
  const todayCount = countTodayFollowups();
  const totalAlert = overdueCount + todayCount;
  document.getElementById('nav').innerHTML = NAV_MENU.map(m => `
    <div class="nav-item ${m.id === currentPage ? 'active' : ''}" data-page="${m.id}">
      <span class="nav-icon">${m.icon}</span>${m.name}
      ${m.id === 'dashboard' && totalAlert ? `<span class="nav-badge">${totalAlert}</span>` : ''}
      ${m.id === 'followups' && overdueCount ? `<span class="nav-badge">${overdueCount}</span>` : ''}
    </div>
  `).join('');
}

document.getElementById('nav').addEventListener('click', e => {
  const item = e.target.closest('.nav-item');
  if (!item) return;
  currentPage = item.dataset.page;
  renderNav();
  render();
});

function render() {
  const fn = ({
    dashboard: renderDashboard, leads: renderLeads, customers: renderCustomers,
    opportunities: renderOpps, products: renderProducts, quotations: renderQuotations,
    samples: renderSamples, orders: renderOrders, shipments: renderShipments, followups: renderFollowups,
    templates: renderTemplates, backup: renderBackup
  })[currentPage];
  fn && fn();
}

function setTabs(html) { document.getElementById('tabsBar').innerHTML = html ? '<div class="tabs">' + html + '</div>' : ''; }

/* ============================================================
 * 工作台
 * ============================================================ */

function todayDate() { return new Date(todayStr()); }

function countOverdueFollowups() {
  const today = todayStr();
  return DB.followups.filter(f => f.reminderDate && !f.done && f.reminderDate < today).length;
}
function countTodayFollowups() {
  const today = todayStr();
  return DB.followups.filter(f => f.reminderDate && !f.done && f.reminderDate === today).length;
}

function renderDashboard() {
  document.getElementById('pageTitle').textContent = '工作台';
  document.getElementById('topbarActions').innerHTML = '';
  setTabs('');

  const overdue = DB.followups.filter(f => f.reminderDate && !f.done && f.reminderDate < todayStr())
    .sort((a,b) => (a.reminderDate||'').localeCompare(b.reminderDate||''));
  const today = DB.followups.filter(f => f.reminderDate && !f.done && f.reminderDate === todayStr());

  const newLeads = DB.leads.filter(l => l.status === '新询盘').length;
  const importantCustomers = DB.customers.filter(c => c.status === '重点客户').length;
  const activeOpps = DB.opportunities.filter(o => !['已赢', '已输'].includes(o.stage));
  const oppValue = activeOpps.reduce((s, o) => s + (Number(o.expectedAmount) || 0) * (Number(o.probability) || 0) / 100, 0);
  const inProduction = DB.orders.filter(o => o.productionStatus === '生产中').length;
  const unpaid = DB.orders.filter(o => o.paymentStatus !== '已结清').reduce((s, o) => s + (Number(o.amount) || 0), 0);

  const recentCustomers = [...DB.customers].sort((a,b) => (b.createdAt||'').localeCompare(a.createdAt||'')).slice(0, 5);
  const recentOrders = [...DB.orders].sort((a,b) => (b.orderDate||'').localeCompare(a.orderDate||'')).slice(0, 5);

  // 本月出货统计
  const thisMonth = todayStr().substring(0, 7);
  const monthShipments = (DB.shipments || []).filter(s => (s.date || '').startsWith(thisMonth));
  const monthShipStats = monthShipments.reduce((acc, s) => {
    const t = calcShipmentTotal(s);
    acc.cartons += t.cartons;
    acc.cbm += t.cbm;
    acc.gross += t.gross;
    return acc;
  }, { cartons: 0, cbm: 0, gross: 0 });

  document.getElementById('content').innerHTML = `
    <div class="stats-grid">
      <div class="stat-card ${overdue.length ? 'alert' : ''}">
        <div class="stat-label">跟进已过期</div>
        <div class="stat-value ${overdue.length ? 'red' : ''}">${overdue.length}</div>
        <div class="stat-sub">超过提醒日期未处理</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">今日待跟进</div>
        <div class="stat-value orange">${today.length}</div>
        <div class="stat-sub">今天该联系的客户</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">新询盘</div>
        <div class="stat-value blue">${newLeads}</div>
        <div class="stat-sub">尚未处理的询盘</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">重点客户</div>
        <div class="stat-value">${importantCustomers}</div>
        <div class="stat-sub">共 ${DB.customers.length} 个客户</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">商机加权金额</div>
        <div class="stat-value blue">${Math.round(oppValue).toLocaleString()}</div>
        <div class="stat-sub">${activeOpps.length} 个活跃商机（混合币种）</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">生产中订单</div>
        <div class="stat-value">${inProduction}</div>
        <div class="stat-sub">未结清 ${unpaid.toLocaleString()} (混合币种)</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">本月出货</div>
        <div class="stat-value blue">${monthShipments.length}</div>
        <div class="stat-sub">${monthShipStats.cartons.toFixed(0)} 箱 · ${monthShipStats.cbm.toFixed(2)} CBM · ${monthShipStats.gross.toFixed(0)} kg</div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="panel">
        <div class="panel-header">
          <span>⏰ 待跟进事项 (${overdue.length + today.length})</span>
          <button class="btn btn-sm" onclick="currentPage='followups';renderNav();render();">查看全部</button>
        </div>
        <div class="panel-body no-pad">
          ${[...overdue, ...today].length === 0 ?
            '<div class="empty" style="padding:30px;">暂无待跟进事项</div>' :
            '<table>' + [...overdue, ...today].map(f => {
              const isOverdue = f.reminderDate < todayStr();
              return `<tr>
                <td class="no-wrap" style="width:80px;">
                  <span class="tag ${isOverdue ? 'tag-red' : 'tag-orange'}">${isOverdue ? '已过期' : '今日'}</span>
                </td>
                <td><strong>${customerNameWithFlag(f.customerId)}</strong>
                  <div class="muted" style="font-size:11px;">${escapeHtml(truncate(f.nextAction || htmlToText(f.content), 40))}</div></td>
                <td class="text-right no-wrap">
                  <button class="btn-link" onclick="viewCustomerDetail('${f.customerId}')">客户详情</button>
                  <button class="btn-link" onclick="markFollowupDone('${f.id}')">标记已处理</button>
                </td>
              </tr>`;
            }).join('') + '</table>'
          }
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">
          <span>👤 最近客户</span>
          <button class="btn btn-sm" onclick="currentPage='customers';renderNav();render();">查看全部</button>
        </div>
        <div class="panel-body no-pad">
          ${recentCustomers.length === 0 ? '<div class="empty" style="padding:30px;">暂无客户</div>' :
            '<table>' + recentCustomers.map(c => `
              <tr>
                <td class="code no-wrap">${escapeHtml(c.code || '')}</td>
                <td class="click" onclick="viewCustomerDetail('${c.id}')">
                  <span class="flag">${flagFor(c.country)}</span><strong>${escapeHtml(c.company)}</strong>
                </td>
                <td>${starsHtml(c.rating)}</td>
                <td class="muted">${escapeHtml(c.contact || '')}</td>
              </tr>
            `).join('') + '</table>'
          }
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">
          <span>📦 最近订单</span>
          <button class="btn btn-sm" onclick="currentPage='orders';renderNav();render();">查看全部</button>
        </div>
        <div class="panel-body no-pad">
          ${recentOrders.length === 0 ? '<div class="empty" style="padding:30px;">暂无订单</div>' :
            '<table>' + recentOrders.map(o => `
              <tr>
                <td class="code no-wrap">${escapeHtml(o.orderNo || '')}</td>
                <td>${customerNameWithFlag(o.customerId)}</td>
                <td class="no-wrap"><strong>${escapeHtml(o.currency || '')} ${Number(o.amount || 0).toLocaleString()}</strong></td>
                <td><span class="tag ${getStatus(PAYMENT_STATUSES, o.paymentStatus).tag}">${escapeHtml(o.paymentStatus || '-')}</span></td>
              </tr>
            `).join('') + '</table>'
          }
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><span>📊 客户来源分布</span></div>
        <div class="panel-body">${renderSourceStats()}</div>
      </div>
    </div>
  `;
}

function renderSourceStats() {
  const counts = {};
  DB.customers.forEach(c => {
    const s = c.source || '其他';
    counts[s] = (counts[s] || 0) + 1;
  });
  const total = DB.customers.length;
  if (total === 0) return '<div class="muted">暂无数据</div>';
  return Object.entries(counts).sort((a,b) => b[1] - a[1]).map(([s, n]) => {
    const pct = (n / total * 100).toFixed(1);
    return `<div style="margin-bottom:8px;">
      <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px;">
        <span>${escapeHtml(s)}</span><span class="muted">${n} (${pct}%)</span>
      </div>
      <div style="background:#f3f4f6;height:6px;border-radius:3px;overflow:hidden;">
        <div style="background:#4a90e2;height:100%;width:${pct}%;"></div>
      </div>
    </div>`;
  }).join('');
}

function markFollowupDone(id) {
  const f = DB.followups.find(x => x.id === id);
  if (!f) return;
  f.done = true;
  saveDB();
  renderNav();
  render();
  toast('已标记为处理', 'success');
}

/* ============================================================
 * 客户管理
 * ============================================================ */

let customerFilter = '';
let customerTab = 'all';
let customerStatusFilter = '';
let customerCountryFilter = '';
let customerTagFilter = '';

function renderCustomers() {
  document.getElementById('pageTitle').textContent = '客户管理';
  document.getElementById('topbarActions').innerHTML = `
    <button class="btn" onclick="exportCustomersCSV()">↓ 导出CSV</button>
    <button class="btn btn-primary" onclick="editCustomer()">+ 新建客户</button>
  `;

  // Tabs
  const tabs = [
    { id: 'all', name: '全部', filter: () => true },
    { id: 'important', name: '重点客户', filter: c => c.status === '重点客户' },
    { id: 'intent', name: '意向客户', filter: c => c.status === '普通意向客户' },
    { id: 'sample', name: '已打样', filter: c => c.status === '已打样' },
    { id: 'deal', name: '已成交', filter: c => c.status === '已成交' },
    { id: 'idle', name: '暂无需求', filter: c => c.status === '暂无需求' || c.status === '已搁置' },
  ];
  setTabs(tabs.map(t => `<div class="tab ${t.id === customerTab ? 'active' : ''}" onclick="customerTab='${t.id}';renderCustomers();">${t.name}</div>`).join(''));

  const tabFilter = tabs.find(t => t.id === customerTab).filter;
  const kw = customerFilter.toLowerCase();
  const list = DB.customers.filter(c => tabFilter(c) && (
    !kw ||
    (c.company || '').toLowerCase().includes(kw) ||
    (c.code || '').toLowerCase().includes(kw) ||
    (c.contact || '').toLowerCase().includes(kw) ||
    (c.country || '').toLowerCase().includes(kw) ||
    (c.email || '').toLowerCase().includes(kw)
  ) && (!customerStatusFilter || c.status === customerStatusFilter)
    && (!customerCountryFilter || c.country === customerCountryFilter)
    && (!customerTagFilter || (c.tags || []).includes(customerTagFilter))
  ).sort((a,b) => (b.createdAt||'').localeCompare(a.createdAt||''));

  const allCountries = [...new Set(DB.customers.map(c => c.country).filter(Boolean))].sort();
  const allTags = [...new Set(DB.customers.flatMap(c => c.tags || []))].sort();

  document.getElementById('content').innerHTML = `
    <div class="table-wrap">
      <div class="table-toolbar">
        <input class="search-box" placeholder="搜索 公司 / 编号 / 联系人 / 国家 / 邮箱..."
               value="${escapeHtml(customerFilter)}"
               oninput="customerFilter=this.value;renderCustomers()">
        <select class="btn" onchange="customerStatusFilter=this.value;renderCustomers()">
          <option value="">全部状态</option>
          ${CUSTOMER_STATUSES.map(s => `<option ${customerStatusFilter===s.name?'selected':''}>${s.name}</option>`).join('')}
        </select>
        <select class="btn" onchange="customerCountryFilter=this.value;renderCustomers()">
          <option value="">全部国家</option>
          ${allCountries.map(c => `<option ${customerCountryFilter===c?'selected':''}>${flagFor(c)} ${c}</option>`).join('')}
        </select>
        ${allTags.length ? `<select class="btn" onchange="customerTagFilter=this.value;renderCustomers()">
          <option value="">全部标签</option>
          ${allTags.map(t => `<option ${customerTagFilter===t?'selected':''}>${escapeHtml(t)}</option>`).join('')}
        </select>` : ''}
        <span class="muted">共 ${list.length} 个客户</span>
      </div>
      <div class="tbl-scroll">
      ${list.length === 0 ? '<div class="empty">暂无客户</div>' : `
      <table>
        <thead><tr>
          <th>客户编号</th><th>公司名称</th><th>客户状态</th><th>等级</th>
          <th>来源</th><th>区域</th><th>联系人</th><th>标签</th><th>最后跟进</th>
          <th class="text-right">操作</th>
        </tr></thead>
        <tbody>
        ${list.map(c => {
          const lastF = [...DB.followups].filter(f => f.customerId === c.id).sort((a,b)=>(b.date||'').localeCompare(a.date||''))[0];
          return `<tr>
            <td class="code no-wrap">${escapeHtml(c.code || '')}</td>
            <td class="click bold" onclick="viewCustomerDetail('${c.id}')">${escapeHtml(c.company)}</td>
            <td>${c.status ? `<span class="tag ${getStatus(CUSTOMER_STATUSES, c.status).tag}">${escapeHtml(c.status)}</span>` : '<span class="muted">-</span>'}</td>
            <td>${starsHtml(c.rating)}</td>
            <td class="muted">${escapeHtml(c.source || '-')}</td>
            <td class="no-wrap">${flagFor(c.country) ? '<span class="flag">' + flagFor(c.country) + '</span>' : ''}${escapeHtml(c.country || '')}</td>
            <td>${escapeHtml(c.contact || '')}</td>
            <td>${(c.tags || []).slice(0,2).map(t => `<span class="tag tag-purple">${escapeHtml(t)}</span>`).join(' ') + ((c.tags||[]).length > 2 ? ' +' + ((c.tags||[]).length-2) : '')}</td>
            <td class="muted no-wrap">${lastF ? fmtDate(lastF.date) + '<div style="font-size:10px;">' + escapeHtml(truncate(htmlToText(lastF.content), 20)) + '</div>' : '<span class="muted">-</span>'}</td>
            <td class="text-right no-wrap">
              <button class="btn-link" onclick="viewCustomerDetail('${c.id}')">详情</button>
              <button class="btn-link" onclick="editCustomer('${c.id}')">编辑</button>
              <button class="btn-link danger" onclick="deleteCustomer('${c.id}')">删除</button>
            </td>
          </tr>`;
        }).join('')}
        </tbody>
      </table>`}
      </div>
    </div>
  `;
}

function customerForm(c) {
  c = c || {};
  return `
    <div class="form-grid">
      <div class="field full"><label>公司名称 <span class="req">*</span></label>
        <input name="company" required value="${escapeHtml(c.company || '')}"></div>
      <div class="field"><label>客户编号</label>
        <input name="code" value="${escapeHtml(c.code || '')}" placeholder="留空自动生成"></div>
      <div class="field"><label>客户状态</label>
        <select name="status">
          <option value="">未设置</option>
          ${CUSTOMER_STATUSES.map(s => `<option ${c.status===s.name?'selected':''}>${s.name}</option>`).join('')}
        </select></div>
      <div class="field"><label>客户等级（星级）</label>
        ${starInputHtml(c.rating, 'rating')}</div>
      <div class="field"><label>来源渠道</label>
        <select name="source">
          ${CUSTOMER_SOURCES.map(s => `<option ${c.source===s?'selected':''}>${s}</option>`).join('')}
        </select></div>
      <div class="field"><label>联系人</label>
        <input name="contact" value="${escapeHtml(c.contact || '')}"></div>
      <div class="field"><label>国家 / 地区</label>
        <input name="country" value="${escapeHtml(c.country || '')}" list="countryList">
        <datalist id="countryList">${COUNTRIES.map(c => '<option value="' + c[0] + '">').join('')}</datalist>
      </div>
      <div class="field"><label>邮箱</label>
        <input name="email" type="email" value="${escapeHtml(c.email || '')}"></div>
      <div class="field"><label>电话</label>
        <input name="phone" value="${escapeHtml(c.phone || '')}"></div>
      <div class="field"><label>WhatsApp</label>
        <input name="whatsapp" value="${escapeHtml(c.whatsapp || '')}"></div>
      <div class="field full"><label>标签</label>
        ${tagsInputHtml(c.tags, 'tags')}</div>
      <div class="field full"><label>地址</label>
        <input name="address" value="${escapeHtml(c.address || '')}"></div>
      <div class="field full"><label>备注</label>
        <textarea name="notes">${escapeHtml(c.notes || '')}</textarea></div>
    </div>
  `;
}

function editCustomer(id) {
  const c = id ? DB.customers.find(x => x.id === id) : {};
  openModal(id ? '编辑客户' : '新建客户',
    `<form id="customerForm" onsubmit="return saveCustomer(event, '${id || ''}')">${customerForm(c)}</form>`,
    `<button class="btn" onclick="closeModal()">取消</button>
     <button class="btn btn-primary" onclick="document.getElementById('customerForm').requestSubmit()">保存</button>`,
    'lg'
  );
}

function saveCustomer(e, id) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  data.tags = (data.tags || '').split(',').filter(Boolean);
  data.rating = Number(data.rating) || 0;
  if (id) {
    const c = DB.customers.find(x => x.id === id);
    Object.assign(c, data);
  } else {
    if (!data.code) data.code = nextCode('C');
    DB.customers.push({ id: uid(), createdAt: new Date().toISOString(), ...data });
  }
  saveDB();
  closeModal();
  renderCustomers();
  toast('已保存', 'success');
  return false;
}

function deleteCustomer(id) {
  const c = DB.customers.find(x => x.id === id);
  if (!c) return;
  const refs = DB.samples.filter(s => s.customerId === id).length
             + DB.orders.filter(o => o.customerId === id).length
             + DB.followups.filter(f => f.customerId === id).length
             + DB.opportunities.filter(o => o.customerId === id).length
             + DB.quotations.filter(q => q.customerId === id).length;
  let msg = '确定删除客户 "' + c.company + '"？';
  if (refs) msg += '\n\n该客户有 ' + refs + ' 条关联记录（样品/订单/跟进/商机/报价），删除后这些记录将显示为"已删除"。';
  if (!confirm(msg)) return;
  DB.customers = DB.customers.filter(x => x.id !== id);
  saveDB();
  renderCustomers();
  toast('已删除');
}

/* 客户详情页（时间轴） */
function viewCustomerDetail(id) {
  const c = DB.customers.find(x => x.id === id);
  if (!c) return;

  const samples = DB.samples.filter(x => x.customerId === id);
  const orders = DB.orders.filter(x => x.customerId === id);
  const followups = DB.followups.filter(x => x.customerId === id);
  const opps = DB.opportunities.filter(x => x.customerId === id);
  const qts = DB.quotations.filter(x => x.customerId === id);

  const events = [];
  followups.forEach(f => events.push({
    date: f.date, dot: 'gray', title: '跟进 · ' + (f.channel || ''),
    content: f.content, isHtml: true,
    extra: f.nextAction ? '下一步：' + f.nextAction : ''
  }));
  samples.forEach(s => events.push({
    date: s.sentDate || s.createdAt, dot: 'orange',
    title: '样品 ' + (s.sampleNo || '') + ' · ' + (s.status || ''),
    content: (s.productName || '') + (s.specs ? ' / ' + s.specs : ''),
    extra: s.feedback ? '反馈：' + s.feedback : ''
  }));
  qts.forEach(q => events.push({
    date: q.date, dot: 'purple',
    title: '报价 ' + (q.code || '') + ' · ' + (q.status || ''),
    content: (q.currency || '') + ' ' + Number(q.totalAmount || 0).toLocaleString(),
    extra: ''
  }));
  orders.forEach(o => events.push({
    date: o.orderDate, dot: 'green',
    title: '订单 ' + (o.orderNo || '') + ' · ' + (o.paymentStatus || ''),
    content: (o.currency || '') + ' ' + Number(o.amount || 0).toLocaleString() + ' / ' + (o.productionStatus || ''),
    extra: o.items || ''
  }));
  opps.forEach(o => events.push({
    date: o.createdAt, dot: 'red',
    title: '商机 · ' + (o.stage || ''),
    content: o.title + ' (' + (o.currency || '') + ' ' + Number(o.expectedAmount || 0).toLocaleString() + ')',
    extra: o.nextStep ? '下一步：' + o.nextStep : ''
  }));
  (DB.shipments || []).filter(x => x.customerId === id).forEach(s => {
    const t = calcShipmentTotal(s);
    events.push({
      date: s.date, dot: 'cyan',
      title: '出货 ' + (s.code || '') + ' · ' + (s.status || ''),
      content: (s.items || []).length + ' 个产品 · 总箱数 ' + (t.cartons || 0).toFixed(2).replace(/\.00$/, '') + ' · 总CBM ' + (t.cbm || 0).toFixed(4) + ' · 毛重 ' + (t.gross || 0).toFixed(1) + 'kg',
      extra: s.port ? '目的港：' + s.port : ''
    });
  });
  events.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  openModal(escapeHtml(c.company), `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:14px;">
      <dl class="detail-grid">
        <dt>客户编号</dt><dd class="code">${escapeHtml(c.code || '-')}</dd>
        <dt>公司名称</dt><dd>${escapeHtml(c.company)}</dd>
        <dt>状态</dt><dd>${c.status ? `<span class="tag ${getStatus(CUSTOMER_STATUSES, c.status).tag}">${escapeHtml(c.status)}</span>` : '-'}</dd>
        <dt>等级</dt><dd>${starsHtml(c.rating)}</dd>
        <dt>来源</dt><dd>${escapeHtml(c.source || '-')}</dd>
        <dt>标签</dt><dd>${(c.tags || []).map(t => `<span class="tag tag-purple">${escapeHtml(t)}</span>`).join(' ') || '-'}</dd>
      </dl>
      <dl class="detail-grid">
        <dt>联系人</dt><dd>${escapeHtml(c.contact || '-')}</dd>
        <dt>国家</dt><dd><span class="flag">${flagFor(c.country)}</span>${escapeHtml(c.country || '-')}</dd>
        <dt>邮箱</dt><dd>${escapeHtml(c.email || '-')}</dd>
        <dt>电话</dt><dd>${escapeHtml(c.phone || '-')}</dd>
        <dt>WhatsApp</dt><dd>${escapeHtml(c.whatsapp || '-')}</dd>
        <dt>地址</dt><dd>${escapeHtml(c.address || '-')}</dd>
      </dl>
    </div>
    ${c.notes ? '<div class="info-box">备注：' + nl2br(c.notes) + '</div>' : ''}

    <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;">
      <button class="btn btn-sm" onclick="closeModal();editFollowup(null,'${c.id}')">+ 新建跟进</button>
      <button class="btn btn-sm" onclick="closeModal();editSample(null,'${c.id}')">+ 新建样品</button>
      <button class="btn btn-sm" onclick="closeModal();editQuotation(null,'${c.id}')">+ 新建报价</button>
      <button class="btn btn-sm" onclick="closeModal();editOrder(null,'${c.id}')">+ 新建订单</button>
      <button class="btn btn-sm" onclick="closeModal();editOpp(null,'${c.id}')">+ 新建商机</button>
      <button class="btn btn-sm" onclick="composeEmail('${c.id}')">✉ 写邮件</button>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">活动时间轴 · 共 ${events.length} 条</div>
      ${events.length === 0 ? '<div class="muted" style="padding:14px 0;">暂无活动记录</div>' :
        '<div class="timeline">' + events.map(e => `
          <div class="timeline-item">
            <div class="timeline-dot ${e.dot}"></div>
            <div class="timeline-meta">${fmtDate(e.date) || '未知日期'}</div>
            <div class="timeline-title">${escapeHtml(e.title)}</div>
            <div class="timeline-content">${e.isHtml ? renderRichText(e.content || '') : nl2br(e.content || '')}${e.extra ? '<br><span class="muted">' + escapeHtml(e.extra) + '</span>' : ''}</div>
          </div>
        `).join('') + '</div>'
      }
    </div>

    <div class="detail-section" id="dossierSection">
      <div class="detail-section-title" style="display:flex;align-items:center;">
        <span>客户档案</span>
        <span class="dossier-storage-info" id="dossierStorageInfo"></span>
      </div>
      <div id="dossierWrap" data-customer-id="${c.id}">${dossierHtml(c)}</div>
    </div>
  `, `
    <button class="btn" onclick="closeModal()">关闭</button>
    <button class="btn btn-primary" onclick="closeModal();editCustomer('${id}')">编辑客户</button>
  `, 'lg');

  updateStorageInfo();
}

/* ============================================================
 * 客户档案（类 Notion 块）
 * ============================================================ */

function dossierHtml(c) {
  if (!c.dossier) c.dossier = [];
  const empty = c.dossier.length === 0
    ? '<div class="dossier-empty">还没有档案块。点击下方按钮添加文本、图片或表格。</div>'
    : '<div class="dossier">' + c.dossier.map((b, i) => dossierBlockHtml(c.id, b, i, c.dossier.length)).join('') + '</div>';
  return empty + `
    <div class="dossier-add-bar">
      <button onclick="addDossierBlock('${c.id}','text')">+ 文本块</button>
      <button onclick="addDossierBlock('${c.id}','image')">+ 图片块</button>
      <button onclick="addDossierBlock('${c.id}','table')">+ 表格块</button>
    </div>`;
}

function dossierBlockHtml(cid, b, idx, total) {
  const icon = b.type === 'text' ? 'T' : b.type === 'image' ? 'I' : b.type === 'table' ? '#' : '';
  const editing = !!b._editing;
  return `<div class="dossier-block ${b.collapsed ? 'collapsed' : ''}" data-block-id="${b.id}">
    <div class="dossier-block-head" onclick="toggleDossierBlock(event,'${cid}','${b.id}')">
      <span class="dossier-caret">▾</span>
      <span class="dossier-type-icon">${icon}</span>
      <input class="dossier-title" value="${escapeHtml(b.title || '')}" placeholder="无标题"
        onclick="event.stopPropagation()"
        onchange="updateDossierTitle('${cid}','${b.id}',this.value)">
      <div class="dossier-actions" onclick="event.stopPropagation()">
        ${idx > 0 ? `<button title="上移" onclick="moveDossierBlock('${cid}','${b.id}',-1)">↑</button>` : ''}
        ${idx < total - 1 ? `<button title="下移" onclick="moveDossierBlock('${cid}','${b.id}',1)">↓</button>` : ''}
        ${editing
          ? `<button onclick="saveDossierBlock('${cid}','${b.id}')">保存</button>
             <button onclick="cancelDossierEdit('${cid}','${b.id}')">取消</button>`
          : `<button onclick="editDossierBlock('${cid}','${b.id}')">编辑</button>`}
        <button class="danger" onclick="deleteDossierBlock('${cid}','${b.id}')">删除</button>
      </div>
    </div>
    <div class="dossier-block-body">${dossierBodyHtml(b, editing)}</div>
  </div>`;
}

function dossierBodyHtml(b, editing) {
  if (b.type === 'text') {
    if (editing) {
      return `<div class="dossier-toolbar">
        <button type="button" onclick="dossierFmt('bold')"><b>B</b></button>
        <button type="button" onclick="dossierFmt('italic')"><i>I</i></button>
        <button type="button" onclick="dossierFmt('underline')"><u>U</u></button>
        <button type="button" onclick="dossierFmt('insertUnorderedList')">• 列表</button>
        <button type="button" onclick="dossierFmt('insertOrderedList')">1. 列表</button>
        <button type="button" onclick="dossierFmt('formatBlock','h4')">小标题</button>
        <button type="button" onclick="dossierLinkCmd()">链接</button>
        <button type="button" onclick="dossierFmt('removeFormat')">清格式</button>
      </div>
      <div class="dossier-text-edit" contenteditable="true">${b.content || ''}</div>`;
    }
    return `<div class="dossier-text-view">${b.content || '<span class="muted">（空）</span>'}</div>`;
  }
  if (b.type === 'image') {
    const src = b.content && b.content.src;
    const cap = (b.content && b.content.caption) || '';
    if (editing) {
      return `<div class="dossier-image-wrap">
        ${src ? `<img src="${imgUrl(src)}">` : '<div class="dossier-image-empty">尚未上传图片</div>'}
        <input type="file" accept="image/*" onchange="dossierImageUpload(event,'${b.id}')"
          style="display:block;margin:8px auto;">
        <input type="text" class="dossier-image-caption-edit" placeholder="图片说明（可选）"
          value="${escapeHtml(cap)}"
          style="width:100%;border:1px solid #d1d5db;padding:4px 6px;border-radius:3px;font-size:11.5px;margin-top:4px;">
      </div>`;
    }
    if (!src) return '<div class="muted">未上传图片</div>';
    return `<div class="dossier-image-wrap">
      <img src="${imgUrl(src)}">
      ${cap ? `<div class="dossier-image-caption">${escapeHtml(cap)}</div>` : ''}
    </div>`;
  }
  if (b.type === 'table') {
    const rows = (b.content && b.content.rows && b.content.rows.length > 0) ? b.content.rows : [['', '']];
    if (editing) {
      return `<table class="dossier-table">
        ${rows.map((r, ri) => `<tr>${r.map((cell, ci) => `<td><input value="${escapeHtml(cell)}" data-r="${ri}" data-c="${ci}"></td>`).join('')}</tr>`).join('')}
      </table>
      <div class="dossier-table-tools">
        <button type="button" onclick="dossierTableAddRow('${b.id}')">+ 行</button>
        <button type="button" onclick="dossierTableAddCol('${b.id}')">+ 列</button>
        <button type="button" onclick="dossierTableDelRow('${b.id}')">− 行</button>
        <button type="button" onclick="dossierTableDelCol('${b.id}')">− 列</button>
      </div>`;
    }
    return `<table class="dossier-table">
      ${rows.map(r => `<tr>${r.map(c => `<td>${escapeHtml(c || '')}</td>`).join('')}</tr>`).join('')}
    </table>`;
  }
  return '';
}

function getDossierCustomer(cid) {
  const c = customerById(cid);
  if (!c) return null;
  if (!c.dossier) c.dossier = [];
  return c;
}

function refreshDossier(cid) {
  const c = getDossierCustomer(cid);
  const wrap = document.getElementById('dossierWrap');
  if (!wrap || !c) return;
  wrap.innerHTML = dossierHtml(c);
  updateStorageInfo();
}

function addDossierBlock(cid, type) {
  const c = getDossierCustomer(cid);
  if (!c) return;
  let content;
  if (type === 'text') content = '';
  else if (type === 'image') content = { src: '', caption: '' };
  else if (type === 'table') content = { rows: [['', ''], ['', '']] };
  const block = { id: uid(), type: type, title: '', collapsed: false, content: content, _editing: true };
  c.dossier.push(block);
  saveDB();
  refreshDossier(cid);
}

function toggleDossierBlock(e, cid, bid) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
  const c = getDossierCustomer(cid);
  const b = c && c.dossier.find(x => x.id === bid);
  if (!b) return;
  if (b._editing) return;
  b.collapsed = !b.collapsed;
  saveDB();
  refreshDossier(cid);
}

function moveDossierBlock(cid, bid, dir) {
  const c = getDossierCustomer(cid);
  const idx = c.dossier.findIndex(x => x.id === bid);
  const j = idx + dir;
  if (j < 0 || j >= c.dossier.length) return;
  const arr = c.dossier;
  [arr[idx], arr[j]] = [arr[j], arr[idx]];
  saveDB();
  refreshDossier(cid);
}

function deleteDossierBlock(cid, bid) {
  if (!confirm('确定删除该档案块？')) return;
  const c = getDossierCustomer(cid);
  c.dossier = c.dossier.filter(x => x.id !== bid);
  saveDB();
  refreshDossier(cid);
}

function updateDossierTitle(cid, bid, value) {
  const c = getDossierCustomer(cid);
  const b = c && c.dossier.find(x => x.id === bid);
  if (!b) return;
  b.title = value;
  saveDB();
}

function editDossierBlock(cid, bid) {
  const c = getDossierCustomer(cid);
  const b = c && c.dossier.find(x => x.id === bid);
  if (!b) return;
  b._editing = true;
  b.collapsed = false;
  refreshDossier(cid);
}

function cancelDossierEdit(cid, bid) {
  const c = getDossierCustomer(cid);
  const b = c && c.dossier.find(x => x.id === bid);
  if (!b) return;
  delete b._editing;
  refreshDossier(cid);
}

function saveDossierBlock(cid, bid) {
  const c = getDossierCustomer(cid);
  const b = c && c.dossier.find(x => x.id === bid);
  if (!b) return;
  const blockEl = document.querySelector('.dossier-block[data-block-id="' + bid + '"]');
  if (!blockEl) return;
  if (b.type === 'text') {
    const ed = blockEl.querySelector('.dossier-text-edit');
    b.content = ed ? ed.innerHTML.trim() : '';
  } else if (b.type === 'image') {
    const capInp = blockEl.querySelector('.dossier-image-caption-edit');
    if (capInp) {
      b.content = b.content || { src: '', caption: '' };
      b.content.caption = capInp.value;
    }
  } else if (b.type === 'table') {
    syncDossierTableInputs(b);
  }
  delete b._editing;
  try {
    saveDB();
    toast('已保存', 'success');
  } catch (e) {
    toast('保存失败：' + e.message, 'error');
  }
  refreshDossier(cid);
}

function dossierFmt(cmd, arg) {
  document.execCommand(cmd, false, arg || null);
}

function dossierLinkCmd() {
  const url = prompt('输入链接 URL：', 'https://');
  if (url) document.execCommand('createLink', false, url);
}

function dossierImageUpload(e, bid) {
  const file = e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    toast('请选择图片文件', 'error'); return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = async () => {
      const max = 1200;
      const scale = Math.min(max / img.width, max / img.height, 1);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      let q = 0.75;
      let data = canvas.toDataURL('image/jpeg', q);
      // 超过约 500KB 再压一次
      if (data.length > 685000) {
        data = canvas.toDataURL('image/jpeg', 0.55);
      }
      const wrap = document.getElementById('dossierWrap');
      const cid = wrap.dataset.customerId;
      const c = getDossierCustomer(cid);
      const b = c.dossier.find(x => x.id === bid);
      if (!b) return;
      b.content = b.content || { src: '', caption: '' };
      // 删旧图
      if (b.content.src) deleteImage(b.content.src);
      const newId = await saveImage(data);
      b.content.src = newId;
      // 保留 caption 输入框中未提交的值
      const blockEl = document.querySelector('.dossier-block[data-block-id="' + bid + '"]');
      const capInp = blockEl && blockEl.querySelector('.dossier-image-caption-edit');
      if (capInp) b.content.caption = capInp.value;
      try {
        saveDB();
        toast('图片已加载 (' + Math.round(data.length / 1024) + 'KB)', 'success');
      } catch (err) {
        toast('保存失败，可能存储空间不足', 'error');
      }
      refreshDossier(cid);
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function syncDossierTableInputs(b) {
  const blockEl = document.querySelector('.dossier-block[data-block-id="' + b.id + '"]');
  if (!blockEl) return;
  const inputs = blockEl.querySelectorAll('table input');
  if (inputs.length === 0) return;
  inputs.forEach(inp => {
    const r = Number(inp.dataset.r), col = Number(inp.dataset.c);
    if (b.content.rows[r]) b.content.rows[r][col] = inp.value;
  });
}

function dossierTableOp(bid, fn) {
  const wrap = document.getElementById('dossierWrap');
  if (!wrap) return;
  const cid = wrap.dataset.customerId;
  const c = getDossierCustomer(cid);
  const b = c.dossier.find(x => x.id === bid);
  if (!b) return;
  syncDossierTableInputs(b);
  fn(b);
  refreshDossier(cid);
}

function dossierTableAddRow(bid) {
  dossierTableOp(bid, b => {
    const cols = (b.content.rows[0] || ['']).length;
    b.content.rows.push(new Array(cols).fill(''));
  });
}
function dossierTableAddCol(bid) {
  dossierTableOp(bid, b => { b.content.rows.forEach(r => r.push('')); });
}
function dossierTableDelRow(bid) {
  dossierTableOp(bid, b => { if (b.content.rows.length > 1) b.content.rows.pop(); });
}
function dossierTableDelCol(bid) {
  dossierTableOp(bid, b => {
    if ((b.content.rows[0] || []).length > 1) b.content.rows.forEach(r => r.pop());
  });
}

function updateStorageInfo() {
  const info = document.getElementById('dossierStorageInfo');
  if (!info) return;
  try {
    const sizeKB = JSON.stringify(DB).length / 1024;
    const sizeMB = (sizeKB / 1024).toFixed(2);
    const pct = Math.min(100, Math.round(sizeKB / 1024 / 5 * 100));
    info.textContent = '存储 ' + sizeMB + 'MB / ~5MB (' + pct + '%)';
    info.className = 'dossier-storage-info' + (pct >= 80 ? ' danger' : pct >= 60 ? ' warn' : '');
  } catch (e) {}
}

/* ============================================================
 * 线索 / 询盘
 * ============================================================ */

let leadFilter = '';
let leadStatusFilter = '';

function renderLeads() {
  document.getElementById('pageTitle').textContent = '线索 / 询盘';
  document.getElementById('topbarActions').innerHTML = `<button class="btn btn-primary" onclick="editLead()">+ 新建询盘</button>`;
  setTabs('');

  const kw = leadFilter.toLowerCase();
  const list = DB.leads.filter(l =>
    (!kw || (l.buyerName||'').toLowerCase().includes(kw) || (l.message||'').toLowerCase().includes(kw) || (l.company||'').toLowerCase().includes(kw))
    && (!leadStatusFilter || l.status === leadStatusFilter)
  ).sort((a,b) => (b.date||'').localeCompare(a.date||''));

  document.getElementById('content').innerHTML = `
    <div class="table-wrap">
      <div class="table-toolbar">
        <input class="search-box" placeholder="搜索 询盘内容 / 客户姓名..."
               value="${escapeHtml(leadFilter)}" oninput="leadFilter=this.value;renderLeads()">
        <select class="btn" onchange="leadStatusFilter=this.value;renderLeads()">
          <option value="">全部状态</option>
          ${LEAD_STATUSES.map(s => `<option ${leadStatusFilter===s.name?'selected':''}>${s.name}</option>`).join('')}
        </select>
        <span class="muted">共 ${list.length} 条</span>
      </div>
      ${list.length === 0 ? '<div class="empty">暂无询盘记录</div>' : `
      <table>
        <thead><tr>
          <th>日期</th><th>来源</th><th>询盘人</th><th>公司</th><th>国家</th>
          <th>询盘内容</th><th>状态</th><th class="text-right">操作</th>
        </tr></thead>
        <tbody>
        ${list.map(l => `
          <tr>
            <td class="no-wrap">${fmtDate(l.date)}</td>
            <td><span class="tag tag-blue">${escapeHtml(l.source || '-')}</span></td>
            <td><strong>${escapeHtml(l.buyerName || '-')}</strong>
              <div class="muted" style="font-size:11px;">${escapeHtml(l.email || '')}</div></td>
            <td>${escapeHtml(l.company || '-')}</td>
            <td class="no-wrap"><span class="flag">${flagFor(l.country)}</span>${escapeHtml(l.country || '')}</td>
            <td>${escapeHtml(truncate(l.message, 50))}</td>
            <td><span class="tag ${getStatus(LEAD_STATUSES, l.status).tag}">${escapeHtml(l.status || '-')}</span></td>
            <td class="text-right no-wrap">
              ${l.status !== '已转客户' ? `<button class="btn-link" onclick="convertLead('${l.id}')">转客户</button>` : ''}
              <button class="btn-link" onclick="editLead('${l.id}')">编辑</button>
              <button class="btn-link danger" onclick="deleteLead('${l.id}')">删除</button>
            </td>
          </tr>
        `).join('')}
        </tbody>
      </table>`}
    </div>
  `;
}

function editLead(id) {
  const l = id ? DB.leads.find(x => x.id === id) : { date: todayStr(), status: '新询盘', source: '阿里巴巴' };
  openModal(id ? '编辑询盘' : '新建询盘', `
    <form id="leadForm" onsubmit="return saveLead(event, '${id || ''}')">
      <div class="form-grid">
        <div class="field"><label>日期 <span class="req">*</span></label>
          <input name="date" type="date" required value="${fmtDate(l.date)}"></div>
        <div class="field"><label>来源</label>
          <select name="source">${CUSTOMER_SOURCES.map(s => `<option ${l.source===s?'selected':''}>${s}</option>`).join('')}</select></div>
        <div class="field"><label>询盘人 <span class="req">*</span></label>
          <input name="buyerName" required value="${escapeHtml(l.buyerName || '')}"></div>
        <div class="field"><label>公司</label>
          <input name="company" value="${escapeHtml(l.company || '')}"></div>
        <div class="field"><label>国家</label>
          <input name="country" value="${escapeHtml(l.country || '')}" list="countryList"></div>
        <div class="field"><label>邮箱</label>
          <input name="email" type="email" value="${escapeHtml(l.email || '')}"></div>
        <div class="field"><label>电话/WhatsApp</label>
          <input name="phone" value="${escapeHtml(l.phone || '')}"></div>
        <div class="field"><label>状态</label>
          <select name="status">${LEAD_STATUSES.map(s => `<option ${l.status===s.name?'selected':''}>${s.name}</option>`).join('')}</select></div>
        <div class="field full"><label>感兴趣的产品</label>
          <input name="interestedProduct" value="${escapeHtml(l.interestedProduct || '')}"></div>
        <div class="field full"><label>询盘内容</label>
          <textarea name="message">${escapeHtml(l.message || '')}</textarea></div>
        <div class="field full"><label>处理备注</label>
          <textarea name="notes">${escapeHtml(l.notes || '')}</textarea></div>
      </div>
    </form>
  `, `<button class="btn" onclick="closeModal()">取消</button>
      <button class="btn btn-primary" onclick="document.getElementById('leadForm').requestSubmit()">保存</button>`);
}

function saveLead(e, id) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  if (id) Object.assign(DB.leads.find(x => x.id === id), data);
  else DB.leads.push({ id: uid(), createdAt: new Date().toISOString(), ...data });
  saveDB(); closeModal(); renderLeads(); toast('已保存', 'success'); return false;
}

function deleteLead(id) {
  if (!confirm('确定删除该询盘？')) return;
  DB.leads = DB.leads.filter(x => x.id !== id);
  saveDB(); renderLeads(); toast('已删除');
}

function convertLead(id) {
  const l = DB.leads.find(x => x.id === id);
  if (!l) return;
  if (!confirm('确定将此询盘转为正式客户？')) return;
  const customer = {
    id: uid(), code: nextCode('C'),
    createdAt: new Date().toISOString(),
    company: l.company || l.buyerName,
    contact: l.buyerName, country: l.country || '',
    email: l.email || '', phone: l.phone || '',
    source: l.source || '', status: '普通意向客户',
    rating: 0, tags: [], notes: l.message || '',
  };
  DB.customers.push(customer);
  l.status = '已转客户';
  l.convertedCustomerId = customer.id;
  saveDB(); renderLeads();
  toast('已转为客户：' + customer.code, 'success');
}

/* ============================================================
 * 商机
 * ============================================================ */

let oppFilter = '';
let oppStageFilter = '';

function renderOpps() {
  document.getElementById('pageTitle').textContent = '商机管理';
  document.getElementById('topbarActions').innerHTML = `<button class="btn btn-primary" onclick="editOpp()">+ 新建商机</button>`;
  setTabs('');

  const kw = oppFilter.toLowerCase();
  const list = DB.opportunities.filter(o => {
    const c = customerById(o.customerId);
    return (!kw || (o.title || '').toLowerCase().includes(kw) || (c && c.company.toLowerCase().includes(kw)))
        && (!oppStageFilter || o.stage === oppStageFilter);
  }).sort((a,b) => (b.expectedAmount||0) - (a.expectedAmount||0));

  const totalWeighted = list.reduce((s, o) => s + (Number(o.expectedAmount) || 0) * (Number(o.probability) || 0) / 100, 0);

  document.getElementById('content').innerHTML = `
    <div class="table-wrap">
      <div class="table-toolbar">
        <input class="search-box" placeholder="搜索 商机 / 客户..." value="${escapeHtml(oppFilter)}" oninput="oppFilter=this.value;renderOpps()">
        <select class="btn" onchange="oppStageFilter=this.value;renderOpps()">
          <option value="">全部阶段</option>
          ${OPP_STAGES.map(s => `<option ${oppStageFilter===s.name?'selected':''}>${s.name}</option>`).join('')}
        </select>
        <span class="muted">共 ${list.length} 个 / 加权金额 ${Math.round(totalWeighted).toLocaleString()}</span>
      </div>
      ${list.length === 0 ? '<div class="empty">暂无商机</div>' : `
      <table>
        <thead><tr>
          <th>商机标题</th><th>客户</th><th>预计金额</th><th>阶段</th><th>概率</th>
          <th>加权值</th><th>预计成交日</th><th>下一步</th><th class="text-right">操作</th>
        </tr></thead>
        <tbody>
        ${list.map(o => {
          const stage = OPP_STAGES.find(s => s.name === o.stage) || {};
          const weighted = (Number(o.expectedAmount) || 0) * (Number(o.probability) || stage.prob || 0) / 100;
          return `<tr>
            <td><strong>${escapeHtml(o.title || '-')}</strong></td>
            <td>${customerNameWithFlag(o.customerId)}</td>
            <td class="no-wrap"><strong>${escapeHtml(o.currency || '')} ${Number(o.expectedAmount || 0).toLocaleString()}</strong></td>
            <td><span class="tag ${stage.tag || 'tag-gray'}">${escapeHtml(o.stage || '-')}</span></td>
            <td>${o.probability || stage.prob || 0}%</td>
            <td class="muted">${Math.round(weighted).toLocaleString()}</td>
            <td class="no-wrap">${fmtDate(o.expectedCloseDate)}</td>
            <td class="muted">${escapeHtml(truncate(o.nextStep, 30))}</td>
            <td class="text-right no-wrap">
              <button class="btn-link" onclick="editOpp('${o.id}')">编辑</button>
              <button class="btn-link danger" onclick="deleteOpp('${o.id}')">删除</button>
            </td>
          </tr>`;
        }).join('')}
        </tbody>
      </table>`}
    </div>
  `;
}

function editOpp(id, customerId) {
  if (DB.customers.length === 0) { toast('请先添加客户', 'error'); return; }
  const o = id ? DB.opportunities.find(x => x.id === id) : {
    customerId: customerId || '', currency: 'USD', stage: '新建', probability: 10
  };
  openModal(id ? '编辑商机' : '新建商机', `
    <form id="oppForm" onsubmit="return saveOpp(event, '${id || ''}')">
      <div class="form-grid">
        <div class="field full"><label>商机标题 <span class="req">*</span></label>
          <input name="title" required value="${escapeHtml(o.title || '')}" placeholder="如：XX公司 100K USD 木盒订单"></div>
        <div class="field"><label>客户 <span class="req">*</span></label>
          <select name="customerId" required><option value="">请选择</option>${customerOptions(o.customerId)}</select></div>
        <div class="field"><label>预计金额</label>
          <input name="expectedAmount" type="number" step="0.01" value="${escapeHtml(o.expectedAmount || '')}"></div>
        <div class="field"><label>币种</label>
          <select name="currency">${CURRENCIES.map(c => `<option ${o.currency===c?'selected':''}>${c}</option>`).join('')}</select></div>
        <div class="field"><label>预计成交日</label>
          <input name="expectedCloseDate" type="date" value="${fmtDate(o.expectedCloseDate)}"></div>
        <div class="field"><label>阶段</label>
          <select name="stage">
            ${OPP_STAGES.map(s => `<option ${o.stage===s.name?'selected':''}>${s.name}</option>`).join('')}
          </select></div>
        <div class="field"><label>赢单概率(%)</label>
          <input name="probability" type="number" min="0" max="100" value="${o.probability || 0}"></div>
        <div class="field full"><label>下一步</label>
          <textarea name="nextStep">${escapeHtml(o.nextStep || '')}</textarea></div>
        <div class="field full"><label>备注</label>
          <textarea name="notes">${escapeHtml(o.notes || '')}</textarea></div>
      </div>
    </form>
  `, `<button class="btn" onclick="closeModal()">取消</button>
      <button class="btn btn-primary" onclick="document.getElementById('oppForm').requestSubmit()">保存</button>`);
  if (o.customerId) { const sel = document.querySelector('#oppForm [name=customerId]'); if (sel) sel.value = o.customerId; }
}

function saveOpp(e, id) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  data.expectedAmount = Number(data.expectedAmount) || 0;
  data.probability = Number(data.probability) || 0;
  if (id) Object.assign(DB.opportunities.find(x => x.id === id), data);
  else DB.opportunities.push({ id: uid(), createdAt: new Date().toISOString(), ...data });
  saveDB(); closeModal(); renderOpps(); toast('已保存', 'success'); return false;
}

function deleteOpp(id) {
  if (!confirm('确定删除该商机？')) return;
  DB.opportunities = DB.opportunities.filter(x => x.id !== id);
  saveDB(); renderOpps(); toast('已删除');
}

function customerOptions(selectedId) {
  return DB.customers.map(c =>
    `<option value="${c.id}" ${c.id === selectedId ? 'selected' : ''}>${c.code ? c.code + ' · ' : ''}${escapeHtml(c.company)}${c.country ? ' (' + flagFor(c.country) + escapeHtml(c.country) + ')' : ''}</option>`
  ).join('');
}

/* ============================================================
 * 产品库
 * ============================================================ */

let productFilter = '';
let productCatFilter = '';

function renderProducts() {
  document.getElementById('pageTitle').textContent = '产品库';
  document.getElementById('topbarActions').innerHTML = `<button class="btn btn-primary" onclick="editProduct()">+ 新建产品</button>`;
  setTabs('');

  const kw = productFilter.toLowerCase();
  const list = DB.products.filter(p => {
    const matchKw = !kw || (p.code||'').toLowerCase().includes(kw) || (p.nameEn||'').toLowerCase().includes(kw) || (p.nameZh||'').toLowerCase().includes(kw);
    const matchCat = !productCatFilter || (productCatFilter === '__none' ? !p.category : p.category === productCatFilter);
    return matchKw && matchCat;
  }).sort((a,b) => (b.createdAt||'').localeCompare(a.createdAt||''));

  const noneCount = DB.products.filter(p => !p.category).length;

  document.getElementById('content').innerHTML = `
    <div class="split" style="height:calc(100vh - 110px);background:#fff;border-radius:6px;border:1px solid #e3e8ef;overflow:hidden;">
      <div class="tree">
        <div class="tree-actions">
          <button class="btn btn-sm" onclick="addCategory()">+ 添加分类</button>
        </div>
        <div class="tree-item ${!productCatFilter?'active':''}" onclick="productCatFilter='';renderProducts()">
          📁 全部产品 <span class="count">${DB.products.length}</span>
        </div>
        ${DB.productCategories.map(c => `
          <div class="tree-item ${productCatFilter===c?'active':''}" onclick="productCatFilter='${escapeHtml(c)}';renderProducts()">
            📂 ${escapeHtml(c)} <span class="count">${DB.products.filter(p => p.category === c).length}</span>
          </div>
        `).join('')}
        ${noneCount > 0 ? `
          <div class="tree-item ${productCatFilter==='__none'?'active':''}" onclick="productCatFilter='__none';renderProducts()">
            📂 未分类 <span class="count">${noneCount}</span>
          </div>` : ''}
        ${DB.productCategories.length > 0 ? '<div style="padding:8px 14px;color:#9ca3af;font-size:11px;">点击分类切换 / 双击删除</div>' : ''}
      </div>
      <div class="split-main">
        <div class="table-toolbar">
          <input class="search-box" placeholder="搜索 产品编号 / 英文名 / 中文名..."
                 value="${escapeHtml(productFilter)}" oninput="productFilter=this.value;renderProducts()">
          ${productCatFilter && productCatFilter !== '__none' ? `<button class="btn btn-sm" onclick="deleteCategory('${escapeHtml(productCatFilter)}')">删除当前分类</button>` : ''}
          <span class="muted">共 ${list.length} 个产品</span>
        </div>
        <div style="flex:1;overflow:auto;">
          ${list.length === 0 ? '<div class="empty">暂无产品</div>' : `
          <table>
            <thead><tr>
              <th>缩略图</th><th>产品编号</th><th>英文名</th><th>中文名</th>
              <th>分类</th><th class="text-right">价格</th><th>规格</th><th>装箱</th>
              <th class="text-right">操作</th>
            </tr></thead>
            <tbody>
            ${list.map(p => `
              <tr>
                <td>${p.image ? `<img src="${imgUrl(p.image)}" class="product-thumb">` : '<div class="product-thumb"></div>'}</td>
                <td class="code no-wrap">${escapeHtml(p.code || '')}</td>
                <td><strong>${escapeHtml(p.nameEn || '')}</strong></td>
                <td>${escapeHtml(p.nameZh || '')}</td>
                <td>${p.category ? `<span class="tag tag-cyan">${escapeHtml(p.category)}</span>` : '<span class="muted">-</span>'}</td>
                <td class="text-right no-wrap"><strong>${escapeHtml(p.currency || '')} ${escapeHtml(p.price || '0')}</strong></td>
                <td class="muted">${escapeHtml(p.specs || '')}</td>
                <td>${packingSummary(p)}</td>
                <td class="text-right no-wrap">
                  <button class="btn-link" onclick="viewProduct('${p.id}')">详情</button>
                  <button class="btn-link" onclick="editProduct('${p.id}')">编辑</button>
                  <button class="btn-link danger" onclick="deleteProduct('${p.id}')">删除</button>
                </td>
              </tr>
            `).join('')}
            </tbody>
          </table>`}
        </div>
      </div>
    </div>
  `;
}

function addCategory() {
  const name = prompt('分类名称：');
  if (!name || !name.trim()) return;
  if (DB.productCategories.includes(name.trim())) { toast('分类已存在', 'error'); return; }
  DB.productCategories.push(name.trim());
  saveDB(); renderProducts(); toast('已添加');
}

function deleteCategory(name) {
  const count = DB.products.filter(p => p.category === name).length;
  const msg = count > 0 ? '该分类下有 ' + count + ' 个产品，删除分类后产品将变为未分类。继续？' : '确定删除分类 "' + name + '"？';
  if (!confirm(msg)) return;
  DB.productCategories = DB.productCategories.filter(c => c !== name);
  DB.products.forEach(p => { if (p.category === name) p.category = ''; });
  productCatFilter = '';
  saveDB(); renderProducts();
}

function editProduct(id) {
  const p = id ? DB.products.find(x => x.id === id) : { currency: 'USD' };
  openModal(id ? '编辑产品' : '新建产品', `
    <form id="productForm" onsubmit="return saveProduct(event, '${id || ''}')">
      <div style="display:flex;gap:18px;margin-bottom:14px;">
        <div>
          <label class="muted" style="font-size:11px;">产品图</label>
          <div id="imgWrap" tabindex="0" class="product-img-drop"
            onpaste="handleProductImagePaste(event)"
            ondrop="handleProductImageDrop(event)"
            ondragover="event.preventDefault();this.classList.add('dragging')"
            ondragleave="this.classList.remove('dragging')">
            ${p.image ? `<img src="${imgUrl(p.image)}" class="product-thumb-large" onclick="document.getElementById('productImage').click()">` :
              '<div class="image-uploader" onclick="document.getElementById(\'productImage\').click()">点击上传图片<br><span style="font-size:10px;color:#6b7280;">或拖入 / Ctrl+V 粘贴</span><br><span style="font-size:10px;">自动压缩</span></div>'}
          </div>
          <input type="file" id="productImage" accept="image/*" style="display:none;" onchange="handleProductImage(event)">
          <input type="hidden" name="image" value="${p.image || ''}">
          ${p.image ? '<button type="button" class="btn btn-sm" style="margin-top:6px;" onclick="clearProductImage()">移除图片</button>' : ''}
        </div>
        <div style="flex:1;">
          <div class="form-grid">
            <div class="field"><label>产品编号</label>
              <input name="code" value="${escapeHtml(p.code || '')}" placeholder="留空自动生成"></div>
            <div class="field"><label>分类</label>
              <select name="category">
                <option value="">未分类</option>
                ${DB.productCategories.map(c => `<option ${p.category===c?'selected':''}>${c}</option>`).join('')}
              </select></div>
            <div class="field full"><label>英文名 <span class="req">*</span></label>
              <input name="nameEn" required value="${escapeHtml(p.nameEn || '')}"></div>
            <div class="field full"><label>中文名</label>
              <input name="nameZh" value="${escapeHtml(p.nameZh || '')}"></div>
            <div class="field"><label>销售价</label>
              <input name="price" type="number" step="0.01" value="${escapeHtml(p.price || '')}"></div>
            <div class="field"><label>币种</label>
              <select name="currency">${CURRENCIES.map(c => `<option ${p.currency===c?'selected':''}>${c}</option>`).join('')}</select></div>
          </div>
        </div>
      </div>
      <div class="form-grid">
        <div class="field"><label>规格</label>
          <input name="specs" value="${escapeHtml(p.specs || '')}" placeholder="如 33x4cm, 重量 1.3kg"></div>
        <div class="field"><label>工厂名</label>
          <input name="factoryName" value="${escapeHtml(p.factoryName || '')}" placeholder="供应工厂"></div>
        <div class="field"><label>采购价 (不含税)</label>
          <input name="purchasePriceNoTax" type="number" step="0.01" min="0" value="${escapeHtml(p.purchasePriceNoTax || '')}"></div>
        <div class="field"><label>采购价 (含税)</label>
          <input name="purchasePriceWithTax" type="number" step="0.01" min="0" value="${escapeHtml(p.purchasePriceWithTax || '')}"></div>
        <div class="field"><label>中文包装</label>
          <input name="packingZh" value="${escapeHtml(p.packingZh || p.packing || '')}"></div>
        <div class="field"><label>英文包装 (Packing)</label>
          <input name="packingEn" value="${escapeHtml(p.packingEn || '')}"></div>
        <div class="field full">
          <label>装箱信息 <span class="muted" style="font-weight:normal;font-size:10px;">（影响出货箱规计算）</span></label>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:10px;background:#fafbfc;border:1px solid #e5e7eb;border-radius:4px;">
            <div>
              <label style="font-size:10px;color:#6b7280;">装箱数 (个/箱)</label>
              <input name="qtyPerCarton" type="number" min="0" step="1" style="width:100%;padding:5px;border:1px solid #d1d5db;border-radius:3px;" value="${escapeHtml(p.qtyPerCarton || '')}">
            </div>
            <div>
              <label style="font-size:10px;color:#6b7280;">外箱长 (cm)</label>
              <input name="cartonLength" type="number" min="0" step="0.01" style="width:100%;padding:5px;border:1px solid #d1d5db;border-radius:3px;" oninput="updateCartonCBM()" value="${escapeHtml(p.cartonLength || '')}">
            </div>
            <div>
              <label style="font-size:10px;color:#6b7280;">外箱宽 (cm)</label>
              <input name="cartonWidth" type="number" min="0" step="0.01" style="width:100%;padding:5px;border:1px solid #d1d5db;border-radius:3px;" oninput="updateCartonCBM()" value="${escapeHtml(p.cartonWidth || '')}">
            </div>
            <div>
              <label style="font-size:10px;color:#6b7280;">外箱高 (cm)</label>
              <input name="cartonHeight" type="number" min="0" step="0.01" style="width:100%;padding:5px;border:1px solid #d1d5db;border-radius:3px;" oninput="updateCartonCBM()" value="${escapeHtml(p.cartonHeight || '')}">
            </div>
            <div>
              <label style="font-size:10px;color:#6b7280;">单箱毛重 (kg)</label>
              <input name="cartonGrossWeight" type="number" min="0" step="0.001" style="width:100%;padding:5px;border:1px solid #d1d5db;border-radius:3px;" value="${escapeHtml(p.cartonGrossWeight || '')}">
            </div>
            <div>
              <label style="font-size:10px;color:#6b7280;">单箱净重 (kg, 选填)</label>
              <input name="cartonNetWeight" type="number" min="0" step="0.001" style="width:100%;padding:5px;border:1px solid #d1d5db;border-radius:3px;" value="${escapeHtml(p.cartonNetWeight || '')}">
            </div>
            <div style="grid-column:span 2;display:flex;align-items:flex-end;font-size:12px;padding-bottom:5px;">
              <span>单箱体积: <span id="cartonCbmDisplay" style="color:#10b981;font-weight:600;margin-left:4px;">${calcCartonCBM(p) > 0 ? calcCartonCBM(p).toFixed(4) + ' CBM' : '-- CBM'}</span></span>
            </div>
          </div>
        </div>
        <div class="field"><label>中文描述</label>
          <textarea name="descriptionZh" rows="3">${escapeHtml(p.descriptionZh || p.description || '')}</textarea></div>
        <div class="field"><label>英文描述 (Description)</label>
          <textarea name="descriptionEn" rows="3">${escapeHtml(p.descriptionEn || '')}</textarea></div>
      </div>
    </form>
  `, `<button class="btn" onclick="closeModal()">取消</button>
      <button class="btn btn-primary" onclick="document.getElementById('productForm').requestSubmit()">保存</button>`, 'lg');
}

function handleProductImage(e) {
  const file = e.target.files[0];
  if (!file) return;
  processProductImageFile(file);
}

function processProductImageFile(file) {
  if (!file || !file.type || !file.type.startsWith('image/')) {
    toast('请选择图片文件', 'error'); return;
  }
  compressImgFile(file, async dataUrl => {
    const id = await saveImage(dataUrl);
    if (!id) return;
    const inp = document.querySelector('#productForm [name=image]');
    if (inp) inp.value = id;
    const wrap = document.getElementById('imgWrap');
    if (wrap) {
      wrap.classList.remove('dragging');
      wrap.innerHTML = `<img src="${imgUrl(id)}" class="product-thumb-large" onclick="document.getElementById('productImage').click()">`;
    }
    toast('图片已加载', 'success');
  });
}

function handleProductImagePaste(e) {
  const cd = e.clipboardData || window.clipboardData;
  if (!cd) return;
  const items = cd.items || [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].type && items[i].type.startsWith('image/')) {
      e.preventDefault();
      processProductImageFile(items[i].getAsFile());
      return;
    }
  }
}

function handleProductImageDrop(e) {
  e.preventDefault();
  const wrap = document.getElementById('imgWrap');
  if (wrap) wrap.classList.remove('dragging');
  const files = e.dataTransfer && e.dataTransfer.files;
  if (files && files.length > 0) {
    processProductImageFile(files[0]);
  }
}

function clearProductImage() {
  document.querySelector('#productForm [name=image]').value = '';
  document.getElementById('imgWrap').innerHTML = '<div class="image-uploader" onclick="document.getElementById(\'productImage\').click()">点击上传图片<br><span style="font-size:10px;color:#6b7280;">或拖入 / Ctrl+V 粘贴</span></div>';
}

function saveProduct(e, id) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  if (id) Object.assign(DB.products.find(x => x.id === id), data);
  else {
    if (!data.code) data.code = nextCode('PRO');
    DB.products.push({ id: uid(), createdAt: new Date().toISOString(), ...data });
  }
  saveDB(); closeModal(); renderProducts(); toast('已保存', 'success'); return false;
}

function deleteProduct(id) {
  if (!confirm('确定删除该产品？')) return;
  DB.products = DB.products.filter(x => x.id !== id);
  saveDB(); renderProducts(); toast('已删除');
}

function viewProduct(id) {
  const p = DB.products.find(x => x.id === id);
  if (!p) return;
  openModal(p.nameEn || p.nameZh || '产品详情', `
    <div style="display:flex;gap:18px;">
      <div>${p.image ? `<img src="${imgUrl(p.image)}" class="product-thumb-large">` : '<div class="product-thumb-large"></div>'}</div>
      <div style="flex:1;">
        <dl class="detail-grid">
          <dt>产品编号</dt><dd class="code">${escapeHtml(p.code || '-')}</dd>
          <dt>英文名</dt><dd>${escapeHtml(p.nameEn || '-')}</dd>
          <dt>中文名</dt><dd>${escapeHtml(p.nameZh || '-')}</dd>
          <dt>分类</dt><dd>${p.category ? '<span class="tag tag-cyan">' + escapeHtml(p.category) + '</span>' : '-'}</dd>
          <dt>价格</dt><dd><strong>${escapeHtml(p.currency || '')} ${escapeHtml(p.price || '-')}</strong></dd>
          <dt>规格</dt><dd>${escapeHtml(p.specs || '-')}</dd>
          <dt>工厂名</dt><dd>${escapeHtml(p.factoryName || '-')}</dd>
          <dt>采购价(不含税)</dt><dd>${p.purchasePriceNoTax ? '¥' + Number(p.purchasePriceNoTax).toFixed(2) : '-'}</dd>
          <dt>采购价(含税)</dt><dd>${p.purchasePriceWithTax ? '¥' + Number(p.purchasePriceWithTax).toFixed(2) : '-'}</dd>
          <dt>中文包装</dt><dd>${escapeHtml(p.packingZh || p.packing || '-')}</dd>
          <dt>英文包装</dt><dd>${escapeHtml(p.packingEn || '-')}</dd>
          <dt>装箱</dt><dd>${hasPackingInfo(p) ? (p.qtyPerCarton + ' 个/箱，外箱 ' + p.cartonLength + '×' + p.cartonWidth + '×' + p.cartonHeight + ' cm，体积 ' + calcCartonCBM(p).toFixed(4) + ' CBM，毛重 ' + p.cartonGrossWeight + ' kg' + (p.cartonNetWeight ? '，净重 ' + p.cartonNetWeight + ' kg' : '')) : '<span class="muted">未录入</span>'}</dd>
          <dt>中文描述</dt><dd>${nl2br(p.descriptionZh || p.description || '-')}</dd>
          <dt>英文描述</dt><dd>${nl2br(p.descriptionEn || '-')}</dd>
        </dl>
      </div>
    </div>
  `, `<button class="btn" onclick="closeModal()">关闭</button>
      <button class="btn btn-primary" onclick="closeModal();editProduct('${id}')">编辑</button>`);
}

/* ============================================================
 * 报价单
 * ============================================================ */

let qtFilter = '';
let qtStatusFilter = '';

function renderQuotations() {
  document.getElementById('pageTitle').textContent = '报价单';
  document.getElementById('topbarActions').innerHTML = `<button class="btn btn-primary" onclick="editQuotation()">+ 新建报价</button>`;
  setTabs('');

  const kw = qtFilter.toLowerCase();
  const list = DB.quotations.filter(q => {
    const c = customerById(q.customerId);
    return (!kw || (q.code||'').toLowerCase().includes(kw) || (c && c.company.toLowerCase().includes(kw)))
        && (!qtStatusFilter || q.status === qtStatusFilter);
  }).sort((a,b) => (b.date||'').localeCompare(a.date||''));

  document.getElementById('content').innerHTML = `
    <div class="table-wrap">
      <div class="table-toolbar">
        <input class="search-box" placeholder="搜索 报价编号 / 客户..." value="${escapeHtml(qtFilter)}" oninput="qtFilter=this.value;renderQuotations()">
        <select class="btn" onchange="qtStatusFilter=this.value;renderQuotations()">
          <option value="">全部状态</option>
          ${QT_STATUSES.map(s => `<option ${qtStatusFilter===s.name?'selected':''}>${s.name}</option>`).join('')}
        </select>
        <span class="muted">共 ${list.length} 条</span>
      </div>
      ${list.length === 0 ? '<div class="empty">暂无报价单</div>' : `
      <table>
        <thead><tr>
          <th>报价编号</th><th>日期</th><th>客户</th><th>项数</th><th class="text-right">总金额</th>
          <th>状态</th><th>有效期</th><th class="text-right">操作</th>
        </tr></thead>
        <tbody>
        ${list.map(q => `
          <tr>
            <td class="code no-wrap">${escapeHtml(q.code || '')}</td>
            <td class="no-wrap">${fmtDate(q.date)}</td>
            <td>${customerNameWithFlag(q.customerId)}</td>
            <td>${(q.items || []).length}</td>
            <td class="text-right no-wrap"><strong>${escapeHtml(q.currency || '')} ${Number(q.totalAmount || 0).toLocaleString()}</strong></td>
            <td><span class="tag ${getStatus(QT_STATUSES, q.status).tag}">${escapeHtml(q.status || '-')}</span></td>
            <td class="no-wrap muted">${fmtDate(q.validUntil) || '-'}</td>
            <td class="text-right no-wrap">
              <button class="btn-link" onclick="viewQuotation('${q.id}')">详情</button>
              <button class="btn-link" onclick="editQuotation('${q.id}')">编辑</button>
              ${q.status !== '已转订单' ? `<button class="btn-link" onclick="convertQtToOrder('${q.id}')">转订单</button>` : ''}
              <button class="btn-link danger" onclick="deleteQuotation('${q.id}')">删除</button>
            </td>
          </tr>
        `).join('')}
        </tbody>
      </table>`}
    </div>
  `;
}

function editQuotation(id, customerId) {
  if (DB.customers.length === 0) { toast('请先添加客户', 'error'); return; }
  const q = id ? DB.quotations.find(x => x.id === id) : {
    customerId: customerId || '', date: todayStr(), currency: 'USD', status: '草稿', items: []
  };
  q.items = q.items || [];

  openModal(id ? '编辑报价单' : '新建报价单', `
    <form id="qtForm" onsubmit="return saveQuotation(event, '${id || ''}')">
      <div class="form-grid">
        <div class="field"><label>报价编号</label>
          <input name="code" value="${escapeHtml(q.code || '')}" placeholder="留空自动生成"></div>
        <div class="field"><label>日期</label>
          <input name="date" type="date" value="${fmtDate(q.date)}"></div>
        <div class="field"><label>客户 <span class="req">*</span></label>
          <select name="customerId" required><option value="">请选择</option>${customerOptions(q.customerId)}</select></div>
        <div class="field"><label>币种</label>
          <select name="currency">${CURRENCIES.map(c => `<option ${q.currency===c?'selected':''}>${c}</option>`).join('')}</select></div>
        <div class="field"><label>有效期</label>
          <input name="validUntil" type="date" value="${fmtDate(q.validUntil)}"></div>
        <div class="field"><label>状态</label>
          <select name="status">${QT_STATUSES.map(s => `<option ${q.status===s.name?'selected':''}>${s.name}</option>`).join('')}</select></div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title" style="display:flex;justify-content:space-between;align-items:center;">
          产品明细
          <button type="button" class="btn btn-sm" onclick="addQtItem()">+ 添加产品</button>
        </div>
        <table class="qt-items">
          <thead><tr>
            <th style="width:30%;">产品</th><th>规格</th>
            <th style="width:80px;">数量</th><th style="width:90px;">单价</th>
            <th style="width:100px;" class="num">小计</th><th style="width:30px;"></th>
          </tr></thead>
          <tbody id="qtItemsBody"></tbody>
          <tfoot>
            <tr><td colspan="4" class="text-right bold">合计：</td>
              <td class="num bold"><span id="qtTotal">0</span></td><td></td></tr>
          </tfoot>
        </table>
        <input type="hidden" name="totalAmount" id="qtTotalInput" value="${q.totalAmount || 0}">
        <input type="hidden" name="items" id="qtItemsInput">
      </div>
      <hr class="div">
      <div class="form-grid cols-1">
        <div class="field"><label>付款方式</label>
          <input name="paymentTerms" value="${escapeHtml(q.paymentTerms || '30% T/T deposit, 70% before shipment')}"></div>
        <div class="field"><label>交货期</label>
          <input name="leadTime" value="${escapeHtml(q.leadTime || '')}"></div>
        <div class="field"><label>贸易条款</label>
          <input name="tradeTerms" value="${escapeHtml(q.tradeTerms || 'FOB')}"></div>
        <div class="field"><label>备注</label>
          <textarea name="notes">${escapeHtml(q.notes || '')}</textarea></div>
      </div>
    </form>
  `, `<button class="btn" onclick="closeModal()">取消</button>
      <button class="btn btn-primary" onclick="saveQtItemsToInput();document.getElementById('qtForm').requestSubmit()">保存</button>`,
  'lg');

  window.__qtItems = [...q.items];
  renderQtItems();
  if (q.customerId) { const sel = document.querySelector('#qtForm [name=customerId]'); if (sel) sel.value = q.customerId; }
}

function renderQtItems() {
  const tbody = document.getElementById('qtItemsBody');
  if (!tbody) return;
  tbody.innerHTML = window.__qtItems.map((it, i) => `
    <tr>
      <td><select onchange="onQtProductChange(${i}, this)">
        <option value="">选择产品...</option>
        ${DB.products.map(p => `<option value="${p.id}" ${it.productId===p.id?'selected':''}>${escapeHtml(p.nameEn || p.nameZh)} (${escapeHtml(p.code||'')})</option>`).join('')}
        <option value="__custom" ${it.productId==='__custom'?'selected':''}>自定义产品</option>
      </select>
      ${it.productId === '__custom' ? `<input style="margin-top:3px;" placeholder="产品名" value="${escapeHtml(it.customName||'')}" oninput="window.__qtItems[${i}].customName=this.value">` : ''}
      </td>
      <td><input value="${escapeHtml(it.specs||'')}" oninput="window.__qtItems[${i}].specs=this.value"></td>
      <td><input type="number" class="num" value="${it.qty||0}" oninput="window.__qtItems[${i}].qty=Number(this.value);recalcQt()"></td>
      <td><input type="number" step="0.01" class="num" value="${it.price||0}" oninput="window.__qtItems[${i}].price=Number(this.value);recalcQt()"></td>
      <td class="num bold">${(Number(it.qty||0) * Number(it.price||0)).toFixed(2)}</td>
      <td><button type="button" class="btn-link danger" onclick="removeQtItem(${i})">×</button></td>
    </tr>
  `).join('');
  recalcQt();
}

function onQtProductChange(i, sel) {
  const id = sel.value;
  if (id === '__custom') {
    window.__qtItems[i] = { productId: '__custom', customName: '', specs: '', qty: 1, price: 0 };
  } else if (id) {
    const p = productById(id);
    if (p) window.__qtItems[i] = { productId: id, specs: p.specs || '', qty: 1, price: Number(p.price) || 0 };
  } else {
    window.__qtItems[i].productId = '';
  }
  renderQtItems();
}

function addQtItem() {
  window.__qtItems.push({ productId: '', specs: '', qty: 1, price: 0 });
  renderQtItems();
}

function removeQtItem(i) {
  window.__qtItems.splice(i, 1);
  renderQtItems();
}

function recalcQt() {
  if (!window.__qtItems) return;
  const total = window.__qtItems.reduce((s, it) => s + (Number(it.qty) || 0) * (Number(it.price) || 0), 0);
  const totalEl = document.getElementById('qtTotal');
  if (totalEl) totalEl.textContent = total.toFixed(2);
  const totalInput = document.getElementById('qtTotalInput');
  if (totalInput) totalInput.value = total;
}

function saveQtItemsToInput() {
  document.getElementById('qtItemsInput').value = JSON.stringify(window.__qtItems);
}

function saveQuotation(e, id) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  data.items = JSON.parse(data.items || '[]');
  data.totalAmount = Number(data.totalAmount) || 0;
  if (id) Object.assign(DB.quotations.find(x => x.id === id), data);
  else {
    if (!data.code) data.code = nextCode('Q');
    DB.quotations.push({ id: uid(), createdAt: new Date().toISOString(), ...data });
  }
  saveDB(); closeModal(); renderQuotations(); toast('已保存', 'success'); return false;
}

function deleteQuotation(id) {
  if (!confirm('确定删除该报价单？')) return;
  DB.quotations = DB.quotations.filter(x => x.id !== id);
  saveDB(); renderQuotations(); toast('已删除');
}

function viewQuotation(id) {
  const q = DB.quotations.find(x => x.id === id);
  if (!q) return;
  openModal('报价单：' + (q.code || ''), `
    <dl class="detail-grid">
      <dt>报价编号</dt><dd class="code">${escapeHtml(q.code || '-')}</dd>
      <dt>日期</dt><dd>${fmtDate(q.date) || '-'}</dd>
      <dt>客户</dt><dd>${customerNameWithFlag(q.customerId)}</dd>
      <dt>状态</dt><dd><span class="tag ${getStatus(QT_STATUSES, q.status).tag}">${escapeHtml(q.status || '-')}</span></dd>
      <dt>有效期</dt><dd>${fmtDate(q.validUntil) || '-'}</dd>
      <dt>付款方式</dt><dd>${escapeHtml(q.paymentTerms || '-')}</dd>
      <dt>交货期</dt><dd>${escapeHtml(q.leadTime || '-')}</dd>
      <dt>贸易条款</dt><dd>${escapeHtml(q.tradeTerms || '-')}</dd>
    </dl>
    <table class="qt-items" style="margin-top:14px;">
      <thead><tr><th>产品</th><th>规格</th><th class="num">数量</th><th class="num">单价</th><th class="num">小计</th></tr></thead>
      <tbody>
      ${(q.items || []).map(it => {
        const p = productById(it.productId);
        const name = it.productId === '__custom' ? it.customName : (p ? (p.nameEn || p.nameZh) : '[已删除]');
        return `<tr>
          <td>${escapeHtml(name)}</td>
          <td class="muted">${escapeHtml(it.specs || '')}</td>
          <td class="num">${it.qty}</td>
          <td class="num">${it.price}</td>
          <td class="num bold">${(Number(it.qty||0) * Number(it.price||0)).toFixed(2)}</td>
        </tr>`;
      }).join('')}
      </tbody>
      <tfoot><tr><td colspan="4" class="text-right bold">合计</td>
        <td class="num bold">${escapeHtml(q.currency || '')} ${Number(q.totalAmount || 0).toFixed(2)}</td></tr></tfoot>
    </table>
    ${q.notes ? '<div class="info-box" style="margin-top:14px;">备注：' + nl2br(q.notes) + '</div>' : ''}
  `, `<button class="btn" onclick="closeModal()">关闭</button>
      <button class="btn" onclick="printQuotation('${id}')">打印</button>
      <button class="btn btn-primary" onclick="closeModal();editQuotation('${id}')">编辑</button>`, 'lg');
}

function printQuotation(id) {
  const q = DB.quotations.find(x => x.id === id);
  const c = customerById(q.customerId);
  if (!q || !c) return;
  const w = window.open('', '_blank');
  const itemsHtml = (q.items || []).map((it, i) => {
    const p = productById(it.productId);
    const name = it.productId === '__custom' ? (it.customName || '') : (p ? (p.nameEn || p.nameZh || '') : '');
    return '<tr><td>' + (i+1) + '</td><td>' + escapeHtml(name) + '</td><td>' + escapeHtml(it.specs||'') + '</td>' +
      '<td class="right">' + it.qty + '</td><td class="right">' + it.price + '</td>' +
      '<td class="right">' + (Number(it.qty||0)*Number(it.price||0)).toFixed(2) + '</td></tr>';
  }).join('');
  w.document.write('<html><head><title>Quotation ' + q.code + '</title>' +
    '<style>body{font-family:Arial,sans-serif;padding:40px;color:#2c3e50;font-size:13px;}' +
    'h1{margin:0 0 20px;}table{width:100%;border-collapse:collapse;margin:20px 0;}' +
    'th,td{padding:8px 10px;border:1px solid #ddd;}th{background:#f4f6f9;}' +
    '.right{text-align:right;}.info{display:flex;justify-content:space-between;margin-bottom:20px;}' +
    '</style></head><body>' +
    '<h1>QUOTATION</h1>' +
    '<div class="info"><div><strong>To: ' + escapeHtml(c.company) + '</strong><br>' +
    'Attn: ' + escapeHtml(c.contact || '') + '<br>' + escapeHtml(c.country || '') + '<br>' +
    escapeHtml(c.email || '') + '</div>' +
    '<div class="right">Quote No.: <strong>' + escapeHtml(q.code) + '</strong><br>' +
    'Date: ' + fmtDate(q.date) + '<br>Valid Until: ' + (fmtDate(q.validUntil) || '-') + '</div></div>' +
    '<table><thead><tr><th>#</th><th>Description</th><th>Specs</th><th class="right">Qty</th><th class="right">Unit Price</th><th class="right">Amount</th></tr></thead>' +
    '<tbody>' + itemsHtml + '</tbody>' +
    '<tfoot><tr><td colspan="5" class="right"><strong>TOTAL</strong></td>' +
    '<td class="right"><strong>' + q.currency + ' ' + Number(q.totalAmount||0).toFixed(2) + '</strong></td></tr></tfoot></table>' +
    '<p><strong>Payment Terms:</strong> ' + escapeHtml(q.paymentTerms || '') + '</p>' +
    '<p><strong>Lead Time:</strong> ' + escapeHtml(q.leadTime || '') + '</p>' +
    '<p><strong>Trade Terms:</strong> ' + escapeHtml(q.tradeTerms || '') + '</p>' +
    (q.notes ? '<p><strong>Notes:</strong> ' + escapeHtml(q.notes) + '</p>' : '') +
    '<scr' + 'ipt>window.onload=function(){window.print();}</scr' + 'ipt>' +
    '</body></html>');
  w.document.close();
}

function convertQtToOrder(id) {
  const q = DB.quotations.find(x => x.id === id);
  if (!q) return;
  if (!confirm('转为正式订单？')) return;
  const newItems = (q.items || []).map(it => {
    const p = it.productId && it.productId !== '__custom' ? productById(it.productId) : null;
    return {
      id: uid(),
      productId: (it.productId && it.productId !== '__custom') ? it.productId : '',
      productName: it.productId === '__custom' ? it.customName : (p ? (p.nameEn || p.nameZh) : '') || '',
      specs: (p && p.specs) || '',
      descriptionZh: (p && (p.descriptionZh || p.description)) || '',
      descriptionEn: (p && p.descriptionEn) || '',
      packingZh: (p && (p.packingZh || p.packing)) || '',
      packingEn: (p && p.packingEn) || '',
      qty: Number(it.qty) || 0,
      unitPrice: Number(it.price) || 0,
    };
  });
  const order = {
    id: uid(),
    createdAt: new Date().toISOString(),
    orderNo: nextCode('SO'),
    customerId: q.customerId,
    orderDate: todayStr(),
    deliveryDate: '',
    currency: q.currency || 'USD',
    paymentStatus: '未付款',
    productionStatus: '未开始',
    paymentTerms: q.paymentTerms || '',
    incoterms: 'FOB',
    destinationPort: '',
    marks: { mainText: '', mainImage: '', sideText: '', sideImage: '', notes: '' },
    notes: q.notes || ('基于报价单 ' + (q.code || '') + ' 创建'),
    items: newItems,
    quotationId: q.id,
    amount: q.totalAmount,
  };
  DB.orders.push(order);
  q.status = '已转订单';
  saveDB();
  renderQuotations();
  toast('已转为订单：' + order.orderNo, 'success');
}

/* ============================================================
 * 样品 / 订单 / 跟进
 * ============================================================ */

let sampleFilter = '', sampleStatusFilter = '', sampleCustomerFilter = '';

// === 样品单导出（中英文双版本，ExcelJS） ===

// ============ 产品选择弹窗 - 样品模式 ============
// === 样品模块（重构版：单子 + 多产品行）===

let _editingSample = null;
let _expandedSamples = new Set();

function toggleSampleExpand(id) {
  if (_expandedSamples.has(id)) _expandedSamples.delete(id);
  else _expandedSamples.add(id);
  renderSamples();
}

function renderSampleExpandedItems(s) {
  const items = s.items || [];
  if (items.length === 0) return '<div class="muted" style="padding:8px;">无产品</div>';
  const cur = s.currency || 'USD';
  return '<table style="width:100%;background:#fff;border:1px solid #e5e7eb;">' +
    '<thead><tr style="background:#f8fafb;">' +
      '<th style="width:42px;text-align:center;">#</th>' +
      '<th style="width:60px;text-align:center;">图片</th>' +
      '<th>产品编号</th>' +
      '<th>产品名</th>' +
      '<th>规格</th>' +
      '<th>工艺要求</th>' +
      '<th class="text-right">数量</th>' +
      '<th class="text-right">工厂费/个(RMB)</th>' +
      '<th class="text-right">报价/个(' + cur + ')</th>' +
      '<th class="text-right">小计</th>' +
    '</tr></thead><tbody>' +
    items.map((it, idx) => {
      const p = it.productId ? productById(it.productId) : null;
      const fp = Number(it.factoryPrice) || 0;
      const cp = Number(it.clientPrice) || 0;
      const qty = Number(it.qty) || 1;
      const sub = (fp * qty).toFixed(2);
      return '<tr>' +
        '<td class="text-center muted">' + (idx + 1) + '</td>' +
        '<td class="text-center">' + (p && p.image ? '<img src="' + imgUrl(p.image) + '" style="width:42px;height:42px;object-fit:contain;background:#f9fafb;border-radius:3px;">' : '<span class="muted">-</span>') + '</td>' +
        '<td class="code">' + escapeHtml((p && p.code) || '-') + '</td>' +
        '<td>' + escapeHtml(it.productName || (p && p.nameEn) || '-') + '</td>' +
        '<td class="muted">' + escapeHtml(it.specs || '-') + '</td>' +
        '<td class="muted" style="max-width:240px;font-size:11px;">' + escapeHtml(truncate(it.productCraft || (p && (p.descriptionZh || p.description)) || '-', 60)) + '</td>' +
        '<td class="text-right">' + qty + '</td>' +
        '<td class="text-right">' + (fp ? '¥' + fp.toFixed(2) : '-') + '</td>' +
        '<td class="text-right">' + (cp ? cur + ' ' + cp.toFixed(2) : '-') + '</td>' +
        '<td class="text-right"><strong>' + (fp ? '¥' + sub : '-') + '</strong></td>' +
      '</tr>';
    }).join('') +
    '</tbody></table>';
}



// 数据迁移：把旧的单条 sample 转成新的 items 结构
function migrateProducts() {
  let changed = 0;
  (DB.products || []).forEach(p => {
    if (p.packing !== undefined && p.packingZh === undefined) {
      p.packingZh = p.packing;
      delete p.packing;
      changed++;
    }
    if (p.description !== undefined && p.descriptionZh === undefined) {
      p.descriptionZh = p.description;
      delete p.description;
      changed++;
    }
    if (p.hsCode !== undefined) {
      delete p.hsCode;
      changed++;
    }
    if (p.moq !== undefined) {
      delete p.moq;
      changed++;
    }
  });
  if (changed > 0) { saveDB(); console.log('Migrated', changed, 'product fields'); }
}

function migrateSamples() {
  let changed = 0;
  (DB.samples || []).forEach(s => {
    if (!s.items || !Array.isArray(s.items)) {
      const it = {
        id: uid(),
        productId: s.productId || '',
        productName: s.productName || '',
        specs: s.specs || '',
        productCraft: s.productCraft || '',
        qty: 1,
        factoryPrice: s.factoryPrice || '',
        clientPrice: s.clientPrice || '',
      };
      s.items = [it];
      delete s.productId;
      delete s.productName;
      delete s.specs;
      delete s.productCraft;
      delete s.factoryPrice;
      delete s.clientPrice;
      if (!s.currency) s.currency = 'USD';
      if (!s.code && s.sampleNo) { s.code = s.sampleNo; delete s.sampleNo; }
      else if (!s.code) s.code = nextCode('SP');
      changed++;
    }
  });
  if (changed > 0) { saveDB(); console.log('Migrated', changed, 'sample records'); }
}

function renderSamples() {
  document.getElementById('pageTitle').textContent = '样品管理';
  document.getElementById('topbarActions').innerHTML = `<button class="btn btn-primary" onclick="editSample()">+ 新建样品单</button>`;
  setTabs('');
  const kw = sampleFilter.toLowerCase();
  const list = (DB.samples || []).filter(s => {
    const c = customerById(s.customerId);
    const items = s.items || [];
    const productMatch = items.some(it => (it.productName||'').toLowerCase().includes(kw) || (it.specs||'').toLowerCase().includes(kw));
    return (!kw || (s.code||'').toLowerCase().includes(kw) || productMatch || (c && c.company.toLowerCase().includes(kw)))
        && (!sampleStatusFilter || s.status === sampleStatusFilter)
        && (!sampleCustomerFilter || s.customerId === sampleCustomerFilter);
  }).sort((a,b) => (b.orderDate||b.createdAt||'').localeCompare(a.orderDate||a.createdAt||''));

  document.getElementById('content').innerHTML = `
    <div class="table-wrap">
      <div class="table-toolbar">
        <input class="search-box" placeholder="搜索 单号 / 客户 / 产品..." value="${escapeHtml(sampleFilter)}" oninput="sampleFilter=this.value;renderSamples()">
        <select class="btn" onchange="sampleCustomerFilter=this.value;renderSamples()">
          <option value="">全部客户</option>
          ${DB.customers.map(c => `<option value="${c.id}" ${sampleCustomerFilter===c.id?'selected':''}>${escapeHtml(c.company)}</option>`).join('')}
        </select>
        <select class="btn" onchange="sampleStatusFilter=this.value;renderSamples()">
          <option value="">全部状态</option>
          ${SAMPLE_STATUSES.map(s => `<option ${sampleStatusFilter===s.name?'selected':''}>${s.name}</option>`).join('')}
        </select>
        <span class="muted">共 ${list.length} 单</span>
      </div>
      ${list.length === 0 ? '<div class="empty">暂无样品单</div>' : `
      <table>
        <thead><tr>
          <th style="width:30px;"></th>
          <th style="width:50px;">图片</th><th>单号</th><th>客户</th>
          <th>产品</th><th class="text-right">产品数</th>
          <th class="text-right">工厂费(RMB)</th><th class="text-right">客户报价</th>
          <th>下单时间</th><th>状态</th>
          <th class="text-right">操作</th>
        </tr></thead>
        <tbody>
        ${list.map(s => {
          const items = s.items || [];
          const firstP = items.length > 0 && items[0].productId ? productById(items[0].productId) : null;
          const totalFactory = items.reduce((sum, it) => sum + (Number(it.factoryPrice) || 0) * (Number(it.qty) || 1), 0);
          const totalClient = items.reduce((sum, it) => sum + (Number(it.clientPrice) || 0) * (Number(it.qty) || 1), 0);
          const productNames = items.map(it => it.productName || (productById(it.productId)||{}).nameEn || '-').join('; ');
          const expanded = _expandedSamples.has(s.id);
          let html = `<tr>
            <td class="text-center" style="cursor:pointer;user-select:none;" onclick="toggleSampleExpand('${s.id}')" title="${expanded?'收起':'展开'}产品明细">
              <span style="display:inline-block;transition:transform 0.15s;transform:rotate(${expanded?'90deg':'0deg'});color:#6b7280;font-size:11px;">▶</span>
            </td>
            <td>${firstP && firstP.image ? '<img src="' + imgUrl(firstP.image) + '" class="product-thumb">' : '<div class="product-thumb"></div>'}</td>
            <td class="code no-wrap">${escapeHtml(s.code || '-')}</td>
            <td>${customerNameWithFlag(s.customerId)}</td>
            <td>${escapeHtml(truncate(productNames, 40))}</td>
            <td class="text-right">${items.length}</td>
            <td class="text-right">${totalFactory ? '¥' + totalFactory.toFixed(2) : '-'}</td>
            <td class="text-right">${totalClient ? (s.currency || 'USD') + ' ' + totalClient.toFixed(2) : '-'}</td>
            <td class="no-wrap">${fmtDate(s.orderDate)}</td>
            <td><span class="tag ${getStatus(SAMPLE_STATUSES, s.status).tag}">${escapeHtml(s.status || '-')}</span></td>
            <td class="text-right no-wrap">
              <button class="btn-link" onclick="editSample('${s.id}')">编辑</button>
              <button class="btn-link" onclick="convertSampleToOrder('${s.id}')" title="基于此样品创建订单">→订单</button>
              <button class="btn-link" onclick="exportSampleListZh('${s.id}')" title="导出中文工厂样品单">↓中</button>
              <button class="btn-link" onclick="exportSampleListEn('${s.id}')" title="导出英文 Sample Invoice">↓EN</button>
              <button class="btn-link danger" onclick="deleteSample('${s.id}')">删除</button>
            </td>
          </tr>`;
          if (expanded) {
            html += '<tr><td colspan="11" style="padding:0;background:#fafbfc;"><div style="padding:8px 12px;">' + renderSampleExpandedItems(s) + '</div></td></tr>';
          }
          return html;
        }).join('')}
        </tbody>
      </table>`}
    </div>
  `;
}

function editSample(id, customerId) {
  if (DB.customers.length === 0) { toast('请先添加客户', 'error'); return; }
  if (id) {
    const s = (DB.samples || []).find(x => x.id === id);
    if (!s) { toast('样品单不存在', 'error'); return; }
    _editingSample = JSON.parse(JSON.stringify(s));
    if (!_editingSample.items) _editingSample.items = [];
  } else {
    _editingSample = {
      id: uid(),
      code: nextCode('SP'),
      customerId: customerId || '',
      orderDate: todayStr(),
      productionTime: '',
      sentDate: '',
      status: '筹备中',
      currency: 'USD',
      trackingNo: '',
      feedback: '',
      notes: '',
      items: [],
      createdAt: new Date().toISOString(),
    };
  }
  openModal((id ? '编辑样品单 ' : '新建样品单 ') + _editingSample.code,
    renderSampleForm(),
    `<button class="btn" onclick="closeModal()">取消</button>
     <button class="btn btn-primary" onclick="saveSampleForm('${id || ''}')">保存</button>`,
    'xl');
}

function renderSampleForm() {
  const s = _editingSample;
  return `
    <div class="form-grid cols-3" style="margin-bottom:14px;">
      <div class="field"><label>样品单号</label>
        <input value="${escapeHtml(s.code || '')}" oninput="_editingSample.code=this.value"></div>
      <div class="field"><label>客户 <span class="req">*</span></label>
        <select onchange="_editingSample.customerId=this.value">${customerOptions(s.customerId)}</select></div>
      <div class="field"><label>币种</label>
        <select onchange="_editingSample.currency=this.value">${CURRENCIES.map(c => `<option ${s.currency===c?'selected':''}>${c}</option>`).join('')}</select></div>
      <div class="field"><label>下单时间</label>
        <input type="date" value="${fmtDate(s.orderDate)}" onchange="_editingSample.orderDate=this.value"></div>
      <div class="field"><label>交货时间</label>
        <input value="${escapeHtml(s.productionTime||'')}" oninput="_editingSample.productionTime=this.value" placeholder="如 10-14 天 或具体日期"></div>
      <div class="field"><label>状态</label>
        <select onchange="_editingSample.status=this.value">${SAMPLE_STATUSES.map(st => `<option ${s.status===st.name?'selected':''}>${st.name}</option>`).join('')}</select></div>
      <div class="field"><label>寄出日期</label>
        <input type="date" value="${fmtDate(s.sentDate)}" onchange="_editingSample.sentDate=this.value"></div>
      <div class="field"><label>快递公司/单号</label>
        <input value="${escapeHtml(s.trackingNo||'')}" oninput="_editingSample.trackingNo=this.value"></div>
      <div class="field"><label>备注</label>
        <input value="${escapeHtml(s.notes||'')}" oninput="_editingSample.notes=this.value"></div>
    </div>

    <div style="margin:18px 0 8px;display:flex;justify-content:space-between;align-items:center;">
      <strong style="font-size:14px;">产品清单</strong>
      <button type="button" class="btn btn-sm btn-primary" onclick="addSampleItem()">+ 添加产品</button>
    </div>
    <div id="sampleItems">${s.items.length === 0 ? '<div class="empty" style="padding:24px;background:#fafbfc;border-radius:6px;">暂无产品，点上方按钮添加</div>' : s.items.map(it => sampleItemHtml(it)).join('')}</div>
    <div id="sampleTotal" style="margin-top:14px;">${sampleTotalHtml()}</div>

    <div style="margin-top:14px;">
      <label style="font-size:11px;color:#6b7280;">客户反馈</label>
      <textarea style="width:100%;margin-top:4px;" oninput="_editingSample.feedback=this.value">${escapeHtml(s.feedback||'')}</textarea>
    </div>
  `;
}

function sampleItemHtml(item) {
  return `
    <div class="ship-item" data-sample-item="${item.id}" style="border:1px solid #e5e7eb;border-radius:6px;padding:10px;margin-bottom:8px;background:#fff;">
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr auto;gap:10px;align-items:flex-end;">
        <div class="field">
          <label>产品</label>
          <div style="display:flex;gap:6px;align-items:stretch;">
            ${sampleItemProductCardHtml(item)}
            <button type="button" class="btn btn-sm" onclick="openSampleItemPicker('${item.id}')" style="white-space:nowrap;">${item.productId ? '更换' : '选择'}</button>
          </div>
        </div>
        <div class="field">
          <label>数量</label>
          <input type="number" min="0" step="1" value="${escapeHtml(item.qty || 1)}" oninput="changeSampleItem('${item.id}','qty',this.value)">
        </div>
        <div class="field">
          <label>工厂费(RMB/个)</label>
          <input type="number" min="0" step="0.01" value="${escapeHtml(item.factoryPrice||'')}" oninput="changeSampleItem('${item.id}','factoryPrice',this.value)">
        </div>
        <div class="field">
          <label>客户报价/个</label>
          <input type="number" min="0" step="0.01" value="${escapeHtml(item.clientPrice||'')}" oninput="changeSampleItem('${item.id}','clientPrice',this.value)">
        </div>
        <div>
          <button type="button" class="btn btn-sm" onclick="removeSampleItem('${item.id}')" style="color:#ef4444;">删除</button>
        </div>
      </div>
      <div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <div class="field">
          <label>产品名（可改）</label>
          <input value="${escapeHtml(item.productName||'')}" oninput="changeSampleItem('${item.id}','productName',this.value)">
        </div>
        <div class="field">
          <label>规格</label>
          <input value="${escapeHtml(item.specs||'')}" oninput="changeSampleItem('${item.id}','specs',this.value)">
        </div>
      </div>
      <div class="field" style="margin-top:8px;">
        <label>工艺要求</label>
        <textarea rows="2" oninput="changeSampleItem('${item.id}','productCraft',this.value)" placeholder="材质、表面处理、印刷、特殊要求等">${escapeHtml(item.productCraft||'')}</textarea>
      </div>
    </div>
  `;
}

function sampleItemProductCardHtml(item) {
  const p = productById(item.productId);
  if (!p) {
    return '<div class="ship-product-card"><div class="no-img">?</div><div class="info"><span class="empty-line">未选择</span></div></div>';
  }
  return '<div class="ship-product-card">' +
    (p.image ? '<img src="' + imgUrl(p.image) + '">' : '<div class="no-img">无图</div>') +
    '<div class="info">' +
      '<div class="code-line">' + escapeHtml(p.code || '-') + '</div>' +
      '<div class="name-line">' + escapeHtml(p.nameEn || p.nameZh || '-') + '</div>' +
    '</div>' +
  '</div>';
}

function sampleTotalHtml() {
  const items = (_editingSample && _editingSample.items) || [];
  const totalFactory = items.reduce((sum, it) => sum + (Number(it.factoryPrice) || 0) * (Number(it.qty) || 1), 0);
  const totalClient = items.reduce((sum, it) => sum + (Number(it.clientPrice) || 0) * (Number(it.qty) || 1), 0);
  const cur = (_editingSample && _editingSample.currency) || 'USD';
  return `
    <div style="border:2px solid #4a90e2;border-radius:6px;padding:12px 14px;background:#eff6ff;">
      <div style="font-weight:600;margin-bottom:8px;color:#1e40af;font-size:13px;">合计</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;font-size:13px;">
        <div>工厂样品费合计：<strong style="color:#1e40af;">¥${totalFactory.toFixed(2)}</strong></div>
        <div>客户样品报价合计：<strong style="color:#1e40af;">${cur} ${totalClient.toFixed(2)}</strong></div>
      </div>
    </div>
  `;
}

function removeSampleItem(itemId) {
  if (!confirm('确定删除该行？')) return;
  _editingSample.items = _editingSample.items.filter(x => x.id !== itemId);
  const el = document.querySelector('[data-sample-item="' + itemId + '"]');
  if (el) el.remove();
  if (_editingSample.items.length === 0) {
    document.getElementById('sampleItems').innerHTML = '<div class="empty" style="padding:24px;background:#fafbfc;border-radius:6px;">暂无产品，点上方按钮添加</div>';
  }
  refreshSampleTotal();
}

function changeSampleItem(itemId, field, value) {
  const it = _editingSample.items.find(x => x.id === itemId);
  if (!it) return;
  it[field] = value;
  if (field === 'qty' || field === 'factoryPrice' || field === 'clientPrice') {
    refreshSampleTotal();
  }
}

function refreshSampleTotal() {
  const el = document.getElementById('sampleTotal');
  if (el) el.innerHTML = sampleTotalHtml();
}

function saveSampleForm(id) {
  const s = _editingSample;
  if (!s) return;
  if (!s.customerId) { toast('请选择客户', 'error'); return; }
  if (s.items.length === 0) { toast('请添加至少一个产品', 'error'); return; }
  if (!s.code) s.code = nextCode('SP');
  for (const it of s.items) {
    if (!it.productId && !it.productName) { toast('每个产品行必须选产品或填产品名', 'error'); return; }
  }
  if (!DB.samples) DB.samples = [];
  if (id) {
    const idx = DB.samples.findIndex(x => x.id === id);
    if (idx >= 0) DB.samples[idx] = s;
    else DB.samples.push(s);
  } else {
    DB.samples.push(s);
  }
  try { saveDB(); } catch(err) { toast('保存失败：' + err.message, 'error'); return; }
  _editingSample = null;
  closeModal();
  renderSamples();
  toast('已保存', 'success');
}

function deleteSample(id) {
  if (!confirm('确定删除该样品单？')) return;
  DB.samples = (DB.samples || []).filter(x => x.id !== id);
  saveDB(); renderSamples(); toast('已删除');
}

function convertSampleToOrder(id) {
  const s = (DB.samples || []).find(x => x.id === id);
  if (!s) return;
  if (!confirm('基于此样品单创建订单？\n（数量和单价需重新填写）')) return;
  const newItems = (s.items || []).map(it => {
    const p = it.productId ? productById(it.productId) : null;
    return {
      id: uid(),
      productId: it.productId || '',
      productName: it.productName || (p ? (p.nameEn || p.nameZh) : '') || '',
      specs: it.specs || (p && p.specs) || '',
      descriptionZh: (p && (p.descriptionZh || p.description)) || '',
      descriptionEn: (p && p.descriptionEn) || '',
      packingZh: (p && (p.packingZh || p.packing)) || '',
      packingEn: (p && p.packingEn) || '',
      qty: '',
      unitPrice: '',
    };
  });
  currentPage = 'orders';
  renderNav();
  render();
  setTimeout(() => {
    _editingOrder = {
      id: uid(),
      orderNo: nextCode('SO'),
      customerId: s.customerId,
      orderDate: todayStr(),
      deliveryDate: '',
      currency: s.currency || 'USD',
      paymentStatus: '未付款',
      productionStatus: '未开始',
      paymentTerms: '',
      incoterms: 'FOB',
      destinationPort: '',
      marks: { mainText: '', mainImage: '', sideText: '', sideImage: '', notes: '' },
      notes: '基于样品单 ' + (s.code || '') + ' 创建',
      items: newItems,
      createdAt: new Date().toISOString(),
    };
    openModal('新建订单 ' + _editingOrder.orderNo,
      renderOrderForm(),
      '<button class="btn" onclick="closeModal()">取消</button>' +
      '<button class="btn btn-primary" onclick="saveOrderForm(\'\')">保存</button>',
      'xl');
    toast('已从样品单 ' + (s.code || '') + ' 创建订单（请填数量和价格）', 'success');
  }, 100);
}

// === Excel 导出（单个样品单）===
function thinBorderS() {
  return {
    left: { style: 'thin', color: { argb: 'FFB0B7BD' } },
    right: { style: 'thin', color: { argb: 'FFB0B7BD' } },
    top: { style: 'thin', color: { argb: 'FFB0B7BD' } },
    bottom: { style: 'thin', color: { argb: 'FFB0B7BD' } },
  };
}

async function addProductImage(wb, ws, cellRef, productImage, w, h) {
  if (!productImage) return;
  try {
    let dataUrl = productImage;
    if (typeof productImage === 'string' && productImage.startsWith('img_')) {
      dataUrl = await imgDB.getDataUrl(productImage);
      if (!dataUrl) return;
    }
    const wbImgId = wb.addImage({ base64: dataUrl, extension: 'png' });
    const mm = cellRef.match(/^([A-Z]+)(\d+)$/);
    if (!mm) return;
    const col = mm[1].charCodeAt(0) - 'A'.charCodeAt(0);
    const row = parseInt(mm[2]) - 1;
    ws.addImage(wbImgId, { tl: { col: col + 0.1, row: row + 0.1 }, ext: { width: w, height: h } });
  } catch (err) { console.warn('Image embed failed', err); }
}

async function exportSampleListZh(sampleId) {
  if (typeof ExcelJS === 'undefined') { toast('Excel 库未加载', 'error'); return; }
  const s = (DB.samples || []).find(x => x.id === sampleId);
  if (!s) { toast('样品单不存在', 'error'); return; }
  const c = customerById(s.customerId);
  if (!c) { toast('客户不存在', 'error'); return; }
  const items = s.items || [];
  if (items.length === 0) { toast('样品单没有产品', 'error'); return; }

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('趣可样品单', {
    pageSetup: { orientation: 'landscape', paperSize: 9, fitToPage: true, fitToWidth: 1, fitToHeight: 0, horizontalCentered: true },
    pageMargins: { left: 0.3, right: 0.3, top: 0.4, bottom: 0.4 }
  });

  // 8 列：序号|产品图|产品编号|产品名|规格|工艺要求|数量|工厂样品费(RMB)
  [6, 14, 14, 28, 14, 32, 8, 14].forEach((w, i) => { ws.getColumn(i + 1).width = w; });

  ws.mergeCells('A1:H1');
  const t = ws.getCell('A1');
  t.value = '趣 可 样 品 单';
  t.font = { name: 'Microsoft YaHei', bold: true, size: 24, color: { argb: 'FF1F2937' } };
  t.alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(1).height = 42;

  const info = [
    ['客      户', c.company, '日       期', todayStr()],
    ['样品单号', s.code || '-', '下单时间', s.orderDate || '-'],
    ['', '', '交货时间', s.productionTime || '-'],
  ];
  const infoStart = 3;
  info.forEach((row, i) => {
    const r = infoStart + i;
    ws.getRow(r).height = 22;
    const [l1, v1, l2, v2] = row;
    if (l1) {
      ws.getCell(r, 1).value = l1;
      ws.getCell(r, 1).font = { name: 'Microsoft YaHei', bold: true, size: 11, color: { argb: 'FF4B5563' } };
      ws.getCell(r, 1).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
      ws.mergeCells(r, 2, r, 4);
      ws.getCell(r, 2).value = v1;
      ws.getCell(r, 2).font = { name: 'Microsoft YaHei', size: 11 };
      ws.getCell(r, 2).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    }
    ws.getCell(r, 5).value = l2;
    ws.getCell(r, 5).font = { name: 'Microsoft YaHei', bold: true, size: 11, color: { argb: 'FF4B5563' } };
    ws.getCell(r, 5).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.mergeCells(r, 6, r, 8);
    ws.getCell(r, 6).value = v2;
    ws.getCell(r, 6).font = { name: 'Microsoft YaHei', size: 11 };
    ws.getCell(r, 6).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
  });

  const noteR = infoStart + info.length + 1;
  ws.getRow(noteR).height = 22;
  ws.mergeCells(noteR, 1, noteR, 8);
  const nc = ws.getCell(noteR, 1);
  nc.value = '说明：请按下方清单制作样品，材质和工艺要求严格按规格执行，交付时附产品检测合格证明。';
  nc.font = { name: 'Microsoft YaHei', size: 10, color: { argb: 'FFEF4444' } };
  nc.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };

  const tableStart = noteR + 2;
  const headers = ['序号', '产品图', '产品编号', '产品名', '规格', '产品工艺要求', '数量', '工厂样品费(RMB)'];
  ws.getRow(tableStart).height = 36;
  headers.forEach((h, i) => {
    const cell = ws.getCell(tableStart, i + 1);
    cell.value = h;
    cell.font = { name: 'Microsoft YaHei', bold: true, size: 10, color: { argb: 'FF1F2937' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8EFF7' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = thinBorderS();
  });

  let totalFactory = 0;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const p = it.productId ? productById(it.productId) : null;
    const r = tableStart + i + 1;
    ws.getRow(r).height = 80;
    ws.getCell(r, 1).value = i + 1;
    if (p && p.image) {
      await addProductImage(wb, ws, 'B' + r, p.image, 70, 70);
    }
    ws.getCell(r, 2).value = '';
    ws.getCell(r, 3).value = (p && p.code) || '-';
    // 中文导出：只用中文名（如果有），否则 fallback 英文名 / 手填名
    const nameZh = (p && p.nameZh) ? p.nameZh : (it.productName || (p && p.nameEn) || '-');
    ws.getCell(r, 4).value = nameZh;
    ws.getCell(r, 5).value = it.specs || (p ? p.specs : '') || '';
    // 工艺要求：item 自填 > 产品的中文描述
    ws.getCell(r, 6).value = it.productCraft || (p && (p.descriptionZh || p.description)) || '';
    ws.getCell(r, 7).value = Number(it.qty) || 1;
    const fp = (Number(it.factoryPrice) || 0) * (Number(it.qty) || 1);
    ws.getCell(r, 8).value = fp;
    totalFactory += fp;

    for (let col = 1; col <= 8; col++) {
      const cell = ws.getCell(r, col);
      cell.font = { name: 'Microsoft YaHei', size: 10, color: { argb: 'FF1F2937' } };
      cell.border = thinBorderS();
      if ([1, 2, 3, 7].includes(col)) {
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      } else if (col === 8) {
        cell.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
        cell.numFmt = '0.00';
      } else {
        cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };
      }
    }
  }

  const totalRow = tableStart + items.length + 1;
  ws.getRow(totalRow).height = 30;
  ws.mergeCells(totalRow, 1, totalRow, 7);
  const tc = ws.getCell(totalRow, 1);
  tc.value = '合  计  TOTAL (RMB)';
  tc.font = { name: 'Microsoft YaHei', bold: true, size: 12, color: { argb: 'FF1F2937' } };
  tc.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
  tc.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF4D6' } };
  tc.border = thinBorderS();
  const tv = ws.getCell(totalRow, 8);
  tv.value = totalFactory;
  tv.font = { name: 'Microsoft YaHei', bold: true, size: 12, color: { argb: 'FF1F2937' } };
  tv.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
  tv.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF4D6' } };
  tv.border = thinBorderS();
  tv.numFmt = '¥#,##0.00';

  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const safeName = c.company.replace(/[\\/:*?"<>|]/g, '_').substring(0, 40);
  const filename = '趣可样品单_' + safeName + '_' + (s.code || todayStr()) + '.xlsx';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('已导出 ' + filename, 'success');
}

async function exportSampleListEn(sampleId) {
  if (typeof ExcelJS === 'undefined') { toast('Excel 库未加载', 'error'); return; }
  const s = (DB.samples || []).find(x => x.id === sampleId);
  if (!s) { toast('样品单不存在', 'error'); return; }
  const c = customerById(s.customerId);
  if (!c) { toast('客户不存在', 'error'); return; }
  const items = s.items || [];
  if (items.length === 0) { toast('样品单没有产品', 'error'); return; }

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Sample Invoice', {
    pageSetup: { orientation: 'portrait', paperSize: 9, fitToPage: true, fitToWidth: 1, fitToHeight: 0, horizontalCentered: true },
    pageMargins: { left: 0.3, right: 0.3, top: 0.4, bottom: 0.4 }
  });

  // 7 列: No. | Picture | Item Code | Description | Spec. | Qty | Sample Price (USD)
  [6, 14, 16, 30, 14, 8, 18].forEach((w, i) => { ws.getColumn(i + 1).width = w; });
  ws.getColumn(2).width = 18;

  for (let r = 1; r <= 5; r++) ws.getRow(r).height = 20;
  if (typeof COMPANY_LOGO_BASE64 !== 'undefined' && COMPANY_LOGO_BASE64) {
    try {
      const imgId = wb.addImage({ base64: 'data:image/png;base64,' + COMPANY_LOGO_BASE64, extension: 'png' });
      ws.addImage(imgId, { tl: { col: 0.2, row: 0.2 }, ext: { width: 210, height: 95 } });
    } catch (err) { console.warn('Logo embed failed', err); }
  }

  ws.mergeCells('D1:G1');
  const c1 = ws.getCell('D1');
  c1.value = COMPANY_INFO.name;
  c1.font = { name: 'Cambria', bold: true, size: 18, color: { argb: 'FF1F2937' } };
  c1.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };

  ws.mergeCells('D2:G2');
  const c2 = ws.getCell('D2');
  c2.value = COMPANY_INFO.salesEn;
  c2.font = { name: 'Calibri', size: 9.5, color: { argb: 'FF6B7280' } };
  c2.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };

  ws.mergeCells('D3:G3');
  const c3 = ws.getCell('D3');
  c3.value = COMPANY_INFO.factoryEn;
  c3.font = { name: 'Calibri', size: 9.5, color: { argb: 'FF6B7280' } };
  c3.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };

  ws.mergeCells('D4:G4');
  const c4 = ws.getCell('D4');
  c4.value = 'Website: ' + COMPANY_INFO.website;
  c4.font = { name: 'Calibri', size: 9.5, italic: true, color: { argb: 'FF6B7280' } };
  c4.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };

  for (let col = 1; col <= 7; col++) {
    ws.getCell(5, col).border = { bottom: { style: 'thin', color: { argb: 'FF2D5C3F' } } };
  }

  ws.mergeCells('A7:G7');
  const t = ws.getCell('A7');
  t.value = 'SAMPLE INVOICE';
  t.font = { name: 'Cambria', bold: true, size: 22, color: { argb: 'FF1F2937' } };
  t.alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(7).height = 36;

  const info = [
    ['To:', c.company, 'Date:', s.orderDate || todayStr()],
    ['Invoice No.:', s.code || '-', 'Sample Production Time:', s.productionTime || 'TBD'],
  ];
  const infoStart = 9;
  info.forEach((row, i) => {
    const r = infoStart + i;
    ws.getRow(r).height = 22;
    const [l1, v1, l2, v2] = row;
    ws.getCell(r, 1).value = l1;
    ws.getCell(r, 1).font = { name: 'Cambria', bold: true, size: 11, color: { argb: 'FF4B5563' } };
    ws.getCell(r, 1).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.mergeCells(r, 2, r, 3);
    ws.getCell(r, 2).value = v1;
    ws.getCell(r, 2).font = { name: 'Calibri', size: 11 };
    ws.getCell(r, 2).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.getCell(r, 4).value = l2;
    ws.getCell(r, 4).font = { name: 'Cambria', bold: true, size: 11, color: { argb: 'FF4B5563' } };
    ws.getCell(r, 4).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.mergeCells(r, 5, r, 7);
    ws.getCell(r, 5).value = v2;
    ws.getCell(r, 5).font = { name: 'Calibri', size: 11 };
    ws.getCell(r, 5).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
  });

  const tableStart = infoStart + info.length + 1;
  const headers = ['No.', 'Picture', 'Item Code', 'Description', 'Spec.', 'Qty', 'Sample Price (USD)'];
  ws.getRow(tableStart).height = 36;
  headers.forEach((h, i) => {
    const cell = ws.getCell(tableStart, i + 1);
    cell.value = h;
    cell.font = { name: 'Cambria', bold: true, size: 10, color: { argb: 'FF1F2937' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8EFF7' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = thinBorderS();
  });

  let totalClient = 0;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const p = it.productId ? productById(it.productId) : null;
    const r = tableStart + i + 1;
    ws.getRow(r).height = 80;
    ws.getCell(r, 1).value = i + 1;
    if (p && p.image) {
      await addProductImage(wb, ws, 'B' + r, p.image, 70, 70);
    }
    ws.getCell(r, 2).value = '';
    ws.getCell(r, 3).value = (p && p.code) || '-';
    ws.getCell(r, 4).value = it.productName || (p ? (p.nameEn || '') : '');
    ws.getCell(r, 5).value = it.specs || (p ? p.specs : '') || '';
    ws.getCell(r, 6).value = Number(it.qty) || 1;
    const cp = (Number(it.clientPrice) || 0) * (Number(it.qty) || 1);
    ws.getCell(r, 7).value = cp;
    totalClient += cp;

    for (let col = 1; col <= 7; col++) {
      const cell = ws.getCell(r, col);
      cell.font = { name: 'Calibri', size: 10, color: { argb: 'FF1F2937' } };
      cell.border = thinBorderS();
      if ([1, 2, 3, 6].includes(col)) {
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      } else if (col === 7) {
        cell.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
        cell.numFmt = '$#,##0.00';
      } else {
        cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };
      }
    }
  }

  const totalRow = tableStart + items.length + 1;
  ws.getRow(totalRow).height = 30;
  ws.mergeCells(totalRow, 1, totalRow, 6);
  const tc = ws.getCell(totalRow, 1);
  tc.value = 'TOTAL DUE (USD)';
  tc.font = { name: 'Cambria', bold: true, size: 13, color: { argb: 'FFFFFFFF' } };
  tc.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
  tc.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };
  tc.border = thinBorderS();
  const tv = ws.getCell(totalRow, 7);
  tv.value = totalClient;
  tv.font = { name: 'Cambria', bold: true, size: 13, color: { argb: 'FFFFFFFF' } };
  tv.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
  tv.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };
  tv.border = thinBorderS();
  tv.numFmt = '$#,##0.00';

  const payStart = totalRow + 3;
  ws.mergeCells(payStart, 1, payStart, 7);
  const ph = ws.getCell(payStart, 1);
  ph.value = 'PAYMENT INFORMATION';
  ph.font = { name: 'Cambria', bold: true, size: 13, color: { argb: 'FFFFFFFF' } };
  ph.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
  ph.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };
  ws.getRow(payStart).height = 28;

  const bankInfo = [
    ['Account Name', COMPANY_INFO.name],
    ['Account Number', '9988001320867'],
    ['Account Type', 'Business Account'],
    ['Bank Name', 'Deutsche Bank AG, Hong Kong'],
    ['Bank Address', '57/F, International Commerce Centre, 1 Austin Road West, Kowloon, Hong Kong'],
    ['SWIFT/BIC Code', 'DEUTHKHHXXX'],
    ['Bank Code', '054'],
    ['Branch Code', '895'],
    ['Country/Region', 'Hong Kong (China)'],
    ['Payment Method', 'For the payment of goods, please make a SWIFT/CHATS Payment'],
  ];
  bankInfo.forEach((row, i) => {
    const r = payStart + 1 + i;
    ws.getRow(r).height = 22;
    ws.mergeCells(r, 1, r, 2);
    const lc = ws.getCell(r, 1);
    lc.value = row[0];
    lc.font = { name: 'Cambria', bold: true, size: 11, color: { argb: 'FF4B5563' } };
    lc.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    lc.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFB' } };
    lc.border = thinBorderS();
    ws.mergeCells(r, 3, r, 7);
    const vc = ws.getCell(r, 3);
    vc.value = row[1];
    vc.font = { name: 'Calibri', size: 11, color: { argb: 'FF1F2937' } };
    vc.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };
    vc.border = thinBorderS();
  });

  const thankRow = payStart + 1 + bankInfo.length + 2;
  ws.mergeCells(thankRow, 1, thankRow, 7);
  const tc2 = ws.getCell(thankRow, 1);
  tc2.value = 'Thank you for your business!';
  tc2.font = { name: 'Cambria', bold: true, italic: true, size: 13, color: { argb: 'FF1E3A8A' } };
  tc2.alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(thankRow).height = 28;

  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const safeName = c.company.replace(/[\\/:*?"<>|]/g, '_').substring(0, 40);
  const filename = 'SampleInvoice_' + safeName + '_' + (s.code || todayStr()) + '.xlsx';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('已导出 ' + filename, 'success');
}

// === 订单模块（重构版：单子 + 多产品行）===

let orderFilter = '', orderPaymentFilter = '', orderCustomerFilter = '';
let _editingOrder = null;
let _expandedOrders = new Set();

function migrateOrders() {
  let changed = 0;
  (DB.orders || []).forEach(o => {
    if (!o.items || typeof o.items === 'string') {
      const oldItemsText = (typeof o.items === 'string') ? o.items : '';
      const it = {
        id: uid(),
        productId: '',
        productName: oldItemsText || '[旧数据]',
        specs: '',
        productCraft: '',
        qty: 1,
        unitPrice: Number(o.amount) || 0,
      };
      o.items = [it];
      if (!o.incoterms) o.incoterms = 'FOB';
      if (!o.paymentTerms) o.paymentTerms = '';
      if (!o.destinationPort) o.destinationPort = '';
      if (!o.marks) o.marks = '';
      changed++;
    }
    // 唛头：字符串 → 对象
    if (typeof o.marks === 'string') {
      o.marks = { mainText: o.marks, mainImage: '', sideText: '', sideImage: '', notes: '' };
    } else if (!o.marks || typeof o.marks !== 'object') {
      o.marks = { mainText: '', mainImage: '', sideText: '', sideImage: '', notes: '' };
    }
  });
  if (changed > 0) { saveDB(); console.log('Migrated', changed, 'orders'); }
}

function toggleOrderExpand(id) {
  if (_expandedOrders.has(id)) _expandedOrders.delete(id);
  else _expandedOrders.add(id);
  renderOrders();
}

function renderOrderExpandedItems(o) {
  const items = o.items || [];
  if (items.length === 0) return '<div class="muted" style="padding:8px;">无产品</div>';
  const cur = o.currency || 'USD';
  return '<table style="width:100%;background:#fff;border:1px solid #e5e7eb;">' +
    '<thead><tr style="background:#f8fafb;">' +
      '<th style="width:42px;text-align:center;">#</th>' +
      '<th style="width:60px;text-align:center;">图片</th>' +
      '<th>产品编号</th>' +
      '<th>产品名</th>' +
      '<th>规格</th>' +
      '<th>工艺要求</th>' +
      '<th class="text-right">数量</th>' +
      '<th class="text-right">单价(' + cur + ')</th>' +
      '<th class="text-right">小计</th>' +
    '</tr></thead><tbody>' +
    items.map((it, idx) => {
      const p = it.productId ? productById(it.productId) : null;
      const qty = Number(it.qty) || 0;
      const up = Number(it.unitPrice) || 0;
      const sub = (qty * up).toFixed(2);
      return '<tr>' +
        '<td class="text-center muted">' + (idx + 1) + '</td>' +
        '<td class="text-center">' + (p && p.image ? '<img src="' + imgUrl(p.image) + '" style="width:42px;height:42px;object-fit:contain;background:#f9fafb;border-radius:3px;">' : '<span class="muted">-</span>') + '</td>' +
        '<td class="code">' + escapeHtml((p && p.code) || '-') + '</td>' +
        '<td>' + escapeHtml(it.productName || (p && p.nameEn) || '-') + '</td>' +
        '<td class="muted">' + escapeHtml(it.specs || '-') + '</td>' +
        '<td class="muted" style="max-width:240px;font-size:11px;">' + escapeHtml(truncate(it.productCraft || (p && (p.descriptionZh || p.description)) || '-', 60)) + '</td>' +
        '<td class="text-right">' + qty + '</td>' +
        '<td class="text-right">' + (up ? cur + ' ' + up.toFixed(2) : '-') + '</td>' +
        '<td class="text-right"><strong>' + (sub !== '0.00' ? cur + ' ' + sub : '-') + '</strong></td>' +
      '</tr>';
    }).join('') +
    '</tbody></table>';
}

function renderOrders() {
  document.getElementById('pageTitle').textContent = '订单管理';
  document.getElementById('topbarActions').innerHTML = `<button class="btn btn-primary" onclick="editOrder()">+ 新建订单</button>`;
  setTabs('');
  const kw = orderFilter.toLowerCase();
  const list = (DB.orders || []).filter(o => {
    const c = customerById(o.customerId);
    const items = o.items || [];
    const productMatch = items.some(it => (it.productName||'').toLowerCase().includes(kw));
    return (!kw || (o.orderNo||'').toLowerCase().includes(kw) || productMatch || (c && c.company.toLowerCase().includes(kw)))
        && (!orderPaymentFilter || o.paymentStatus === orderPaymentFilter)
        && (!orderCustomerFilter || o.customerId === orderCustomerFilter);
  }).sort((a,b) => (b.orderDate||'').localeCompare(a.orderDate||''));

  const total = list.reduce((s, o) => s + calcOrderTotal(o), 0);
  const unpaid = list.filter(o => o.paymentStatus !== '已结清').reduce((s, o) => s + calcOrderTotal(o), 0);

  document.getElementById('content').innerHTML = `
    <div class="table-wrap">
      <div class="table-toolbar">
        <input class="search-box" placeholder="搜索 订单号 / 产品 / 客户..." value="${escapeHtml(orderFilter)}" oninput="orderFilter=this.value;renderOrders()">
        <select class="btn" onchange="orderCustomerFilter=this.value;renderOrders()">
          <option value="">全部客户</option>
          ${DB.customers.map(c => `<option value="${c.id}" ${orderCustomerFilter===c.id?'selected':''}>${escapeHtml(c.company)}</option>`).join('')}
        </select>
        <select class="btn" onchange="orderPaymentFilter=this.value;renderOrders()">
          <option value="">全部付款状态</option>
          ${PAYMENT_STATUSES.map(s => `<option ${orderPaymentFilter===s.name?'selected':''}>${s.name}</option>`).join('')}
        </select>
        <span class="muted">共 ${list.length} 单 / 合计 ${total.toLocaleString()} / 未结清 ${unpaid.toLocaleString()}</span>
      </div>
      ${list.length === 0 ? '<div class="empty">暂无订单</div>' : `
      <table>
        <thead><tr>
          <th style="width:30px;"></th>
          <th style="width:50px;">图片</th>
          <th>订单号</th><th>客户</th><th>产品</th>
          <th class="text-right">产品数</th>
          <th class="text-right">金额</th><th>付款</th><th>生产</th><th>交期</th>
          <th class="text-right">操作</th>
        </tr></thead>
        <tbody>
        ${list.map(o => {
          const items = o.items || [];
          const firstP = items.length > 0 && items[0].productId ? productById(items[0].productId) : null;
          const amount = calcOrderTotal(o);
          const productNames = items.map(it => it.productName || (productById(it.productId)||{}).nameEn || '-').join('; ');
          const expanded = _expandedOrders.has(o.id);
          let html = `<tr>
            <td class="text-center" style="cursor:pointer;user-select:none;" onclick="toggleOrderExpand('${o.id}')" title="${expanded?'收起':'展开'}产品明细">
              <span style="display:inline-block;transition:transform 0.15s;transform:rotate(${expanded?'90deg':'0deg'});color:#6b7280;font-size:11px;">▶</span>
            </td>
            <td>${firstP && firstP.image ? '<img src="' + imgUrl(firstP.image) + '" class="product-thumb">' : '<div class="product-thumb"></div>'}</td>
            <td class="code"><strong>${escapeHtml(o.orderNo || '-')}</strong>
              <div class="muted" style="font-size:10px;">${fmtDate(o.orderDate)}</div></td>
            <td>${customerNameWithFlag(o.customerId)}</td>
            <td class="muted">${escapeHtml(truncate(productNames, 35))}</td>
            <td class="text-right">${items.length}</td>
            <td class="text-right no-wrap"><strong>${escapeHtml(o.currency || '')} ${amount.toLocaleString()}</strong></td>
            <td><span class="tag ${getStatus(PAYMENT_STATUSES, o.paymentStatus).tag}">${escapeHtml(o.paymentStatus || '-')}</span></td>
            <td><span class="tag ${getStatus(PRODUCTION_STATUSES, o.productionStatus).tag}">${escapeHtml(o.productionStatus || '-')}</span></td>
            <td class="no-wrap">${fmtDate(o.deliveryDate)}</td>
            <td class="text-right no-wrap">
              <button class="btn-link" onclick="editOrder('${o.id}')">编辑</button>
              <button class="btn-link" onclick="exportOrderPIZh('${o.id}')" title="导出中文订单确认书">↓中</button>
              <button class="btn-link" onclick="exportOrderPIEn('${o.id}')" title="导出英文 Proforma Invoice">↓EN</button>
              <button class="btn-link" onclick="createShipmentFromOrder('${o.id}')" title="基于此订单创建出货单">→出货</button>
              <button class="btn-link danger" onclick="deleteOrder('${o.id}')">删除</button>
            </td>
          </tr>`;
          if (expanded) {
            html += '<tr><td colspan="11" style="padding:0;background:#fafbfc;"><div style="padding:8px 12px;">' + renderOrderExpandedItems(o) + '</div></td></tr>';
          }
          return html;
        }).join('')}
        </tbody>
      </table>`}
    </div>
  `;
}

function calcOrderTotal(o) {
  return (o.items || []).reduce((s, it) => s + (Number(it.qty) || 0) * (Number(it.unitPrice) || 0), 0);
}

function editOrder(id, customerId, presetItems) {
  if (DB.customers.length === 0) { toast('请先添加客户', 'error'); return; }
  if (id) {
    const o = (DB.orders || []).find(x => x.id === id);
    if (!o) return;
    _editingOrder = JSON.parse(JSON.stringify(o));
    if (!_editingOrder.items) _editingOrder.items = [];
  } else {
    _editingOrder = {
      id: uid(),
      orderNo: nextCode('SO'),
      customerId: customerId || '',
      orderDate: todayStr(),
      deliveryDate: '',
      currency: 'USD',
      paymentStatus: '未付款',
      productionStatus: '未开始',
      paymentTerms: '',
      incoterms: 'FOB',
      destinationPort: '',
      marks: { mainText: '', mainImage: '', sideText: '', sideImage: '', notes: '' },
      notes: '',
      items: presetItems || [],
      createdAt: new Date().toISOString(),
    };
  }
  openModal((id ? '编辑订单 ' : '新建订单 ') + _editingOrder.orderNo,
    renderOrderForm(),
    `<button class="btn" onclick="closeModal()">取消</button>
     <button class="btn btn-primary" onclick="saveOrderForm('${id || ''}')">保存</button>`,
    'xl');
}

function renderOrderForm() {
  const o = _editingOrder;
  const INCOTERMS = ['EXW', 'FOB', 'CIF', 'CFR', 'DDP', 'DAP', 'FCA'];
  return `
    <div class="form-grid cols-3" style="margin-bottom:14px;">
      <div class="field"><label>订单号</label>
        <input value="${escapeHtml(o.orderNo || '')}" oninput="_editingOrder.orderNo=this.value"></div>
      <div class="field"><label>客户 <span class="req">*</span></label>
        <select onchange="_editingOrder.customerId=this.value">${customerOptions(o.customerId)}</select></div>
      <div class="field"><label>币种</label>
        <select onchange="_editingOrder.currency=this.value;refreshOrderTotal()">${CURRENCIES.map(c => `<option ${o.currency===c?'selected':''}>${c}</option>`).join('')}</select></div>
      <div class="field"><label>下单日期</label>
        <input type="date" value="${fmtDate(o.orderDate)}" onchange="_editingOrder.orderDate=this.value"></div>
      <div class="field"><label>交货日期</label>
        <input type="date" value="${fmtDate(o.deliveryDate)}" onchange="_editingOrder.deliveryDate=this.value"></div>
      <div class="field"><label>INCO Terms</label>
        <select onchange="_editingOrder.incoterms=this.value">${INCOTERMS.map(t => `<option ${o.incoterms===t?'selected':''}>${t}</option>`).join('')}</select></div>
      <div class="field"><label>付款状态</label>
        <select onchange="_editingOrder.paymentStatus=this.value">${PAYMENT_STATUSES.map(s => `<option ${o.paymentStatus===s.name?'selected':''}>${s.name}</option>`).join('')}</select></div>
      <div class="field"><label>生产状态</label>
        <select onchange="_editingOrder.productionStatus=this.value">${PRODUCTION_STATUSES.map(s => `<option ${o.productionStatus===s.name?'selected':''}>${s.name}</option>`).join('')}</select></div>
      <div class="field"><label>目的港</label>
        <input value="${escapeHtml(o.destinationPort||'')}" oninput="_editingOrder.destinationPort=this.value" placeholder="如 Los Angeles"></div>
      <div class="field full"><label>付款条款</label>
        <input value="${escapeHtml(o.paymentTerms||'')}" oninput="_editingOrder.paymentTerms=this.value" placeholder="如 TT 30% deposit, 70% before shipment"></div>
      <div class="field full"><label>唛头</label>
        ${orderMarksHtml()}
      </div>
      <div class="field full"><label>备注</label>
        <textarea oninput="_editingOrder.notes=this.value">${escapeHtml(o.notes||'')}</textarea></div>
    </div>

    <div style="margin:18px 0 8px;display:flex;justify-content:space-between;align-items:center;">
      <strong style="font-size:14px;">订单产品</strong>
      <button type="button" class="btn btn-sm btn-primary" onclick="addOrderItem()">+ 添加产品</button>
    </div>
    <div id="orderItems">${o.items.length === 0 ? '<div class="empty" style="padding:24px;background:#fafbfc;border-radius:6px;">暂无产品，点上方按钮添加</div>' : o.items.map(it => orderItemHtml(it)).join('')}</div>
    <div id="orderTotal" style="margin-top:14px;">${orderTotalHtml()}</div>
  `;
}

function orderItemHtml(item) {
  return `
    <div class="ship-item" data-order-item="${item.id}" style="border:1px solid #e5e7eb;border-radius:6px;padding:10px;margin-bottom:8px;background:#fff;">
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr auto;gap:10px;align-items:flex-end;">
        <div class="field">
          <label>产品</label>
          <div style="display:flex;gap:6px;align-items:stretch;">
            ${orderItemProductCardHtml(item)}
            <button type="button" class="btn btn-sm" onclick="openOrderItemPicker('${item.id}')" style="white-space:nowrap;">${item.productId ? '更换' : '选择'}</button>
          </div>
        </div>
        <div class="field">
          <label>数量</label>
          <input type="number" min="0" step="1" value="${escapeHtml(item.qty || '')}" oninput="changeOrderItem('${item.id}','qty',this.value)" placeholder="个数">
        </div>
        <div class="field">
          <label>单价</label>
          <input type="number" min="0" step="0.01" value="${escapeHtml(item.unitPrice||'')}" oninput="changeOrderItem('${item.id}','unitPrice',this.value)">
        </div>
        <div class="field">
          <label>小计</label>
          <input value="${orderItemSubtotal(item)}" disabled style="background:#f9fafb;">
        </div>
        <div>
          <button type="button" class="btn btn-sm" onclick="removeOrderItem('${item.id}')" style="color:#ef4444;">删除</button>
        </div>
      </div>
      <div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <div class="field">
          <label>产品名（可改）</label>
          <input value="${escapeHtml(item.productName||'')}" oninput="changeOrderItem('${item.id}','productName',this.value)">
        </div>
        <div class="field">
          <label>规格</label>
          <input value="${escapeHtml(item.specs||'')}" oninput="changeOrderItem('${item.id}','specs',this.value)">
        </div>
      </div>
      <div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <div class="field">
          <label>中文描述</label>
          <textarea rows="2" oninput="changeOrderItem('${item.id}','descriptionZh',this.value)">${escapeHtml(item.descriptionZh||'')}</textarea>
        </div>
        <div class="field">
          <label>英文描述</label>
          <textarea rows="2" oninput="changeOrderItem('${item.id}','descriptionEn',this.value)">${escapeHtml(item.descriptionEn||'')}</textarea>
        </div>
      </div>
      <div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <div class="field">
          <label>中文包装</label>
          <input value="${escapeHtml(item.packingZh||'')}" oninput="changeOrderItem('${item.id}','packingZh',this.value)">
        </div>
        <div class="field">
          <label>英文包装</label>
          <input value="${escapeHtml(item.packingEn||'')}" oninput="changeOrderItem('${item.id}','packingEn',this.value)">
        </div>
      </div>
    </div>
  `;
}

function orderItemProductCardHtml(item) {
  const p = productById(item.productId);
  if (!p) {
    return '<div class="ship-product-card"><div class="no-img">?</div><div class="info"><span class="empty-line">未选择</span></div></div>';
  }
  return '<div class="ship-product-card">' +
    (p.image ? '<img src="' + imgUrl(p.image) + '">' : '<div class="no-img">无图</div>') +
    '<div class="info">' +
      '<div class="code-line">' + escapeHtml(p.code || '-') + '</div>' +
      '<div class="name-line">' + escapeHtml(p.nameEn || p.nameZh || '-') + '</div>' +
    '</div>' +
  '</div>';
}

function orderItemSubtotal(item) {
  const sub = (Number(item.qty) || 0) * (Number(item.unitPrice) || 0);
  return sub > 0 ? sub.toFixed(2) : '';
}

function orderTotalHtml() {
  const total = calcOrderTotal(_editingOrder);
  const cur = (_editingOrder && _editingOrder.currency) || 'USD';
  return `
    <div style="border:2px solid #4a90e2;border-radius:6px;padding:12px 14px;background:#eff6ff;">
      <div style="font-weight:600;margin-bottom:8px;color:#1e40af;font-size:13px;">订单合计</div>
      <div style="font-size:16px;">总金额：<strong style="color:#1e40af;font-size:18px;">${cur} ${total.toFixed(2)}</strong></div>
    </div>
  `;
}

function removeOrderItem(itemId) {
  if (!confirm('确定删除该行？')) return;
  _editingOrder.items = _editingOrder.items.filter(x => x.id !== itemId);
  const el = document.querySelector('[data-order-item="' + itemId + '"]');
  if (el) el.remove();
  if (_editingOrder.items.length === 0) {
    document.getElementById('orderItems').innerHTML = '<div class="empty" style="padding:24px;background:#fafbfc;border-radius:6px;">暂无产品，点上方按钮添加</div>';
  }
  refreshOrderTotal();
}

function changeOrderItem(itemId, field, value) {
  const it = _editingOrder.items.find(x => x.id === itemId);
  if (!it) return;
  it[field] = value;
  if (field === 'qty' || field === 'unitPrice') {
    // 更新该行小计输入框
    const el = document.querySelector('[data-order-item="' + itemId + '"]');
    if (el) {
      const subs = el.querySelectorAll('input[disabled]');
      if (subs && subs.length > 0) subs[0].value = orderItemSubtotal(it);
    }
    refreshOrderTotal();
  }
}

function refreshOrderTotal() {
  const el = document.getElementById('orderTotal');
  if (el) el.innerHTML = orderTotalHtml();
}

function saveOrderForm(id) {
  const o = _editingOrder;
  if (!o) return;
  if (!o.customerId) { toast('请选择客户', 'error'); return; }
  if (o.items.length === 0) { toast('请添加至少一个产品', 'error'); return; }
  if (!o.orderNo) o.orderNo = nextCode('SO');
  for (const it of o.items) {
    if (!it.productId && !it.productName) { toast('每个产品行必须选产品或填产品名', 'error'); return; }
  }
  // 保存时同步 amount 字段（dashboard 等老逻辑用）
  o.amount = calcOrderTotal(o);
  if (!DB.orders) DB.orders = [];
  if (id) {
    const idx = DB.orders.findIndex(x => x.id === id);
    if (idx >= 0) DB.orders[idx] = o;
    else DB.orders.push(o);
  } else {
    DB.orders.push(o);
  }
  try { saveDB(); } catch(err) { toast('保存失败：' + err.message, 'error'); return; }
  _editingOrder = null;
  closeModal();
  renderOrders();
  toast('已保存', 'success');
}

// === 订单 PI 导出（中英文）===

async function exportOrderPIZh(id) {
  if (typeof ExcelJS === 'undefined') { toast('Excel 库未加载', 'error'); return; }
  const o = (DB.orders || []).find(x => x.id === id);
  if (!o) { toast('订单不存在', 'error'); return; }
  const c = customerById(o.customerId);
  if (!c) { toast('客户不存在', 'error'); return; }
  const items = o.items || [];
  if (items.length === 0) { toast('订单没有产品', 'error'); return; }
  const cur = o.currency || 'USD';

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('订单确认书', {
    pageSetup: { orientation: 'landscape', paperSize: 9, fitToPage: true, fitToWidth: 1, fitToHeight: 0, horizontalCentered: true },
    pageMargins: { left: 0.3, right: 0.3, top: 0.4, bottom: 0.4 }
  });

  // 列宽 10 列
  [6, 14, 14, 22, 26, 14, 18, 8, 12, 14].forEach((w, i) => { ws.getColumn(i + 1).width = w; });

  // 大标题（无 LOGO 无抬头）
  ws.mergeCells('A1:J1');
  const t = ws.getCell('A1');
  t.value = '订  单  确  认  书';
  t.font = { name: 'Microsoft YaHei', bold: true, size: 24, color: { argb: 'FF1F2937' } };
  t.alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(1).height = 42;

  const info = [
    ['客      户', c.company, '订单号', o.orderNo || '-'],
    ['下单日期', o.orderDate || '-', '交货日期', o.deliveryDate || '-'],
    ['币      种', cur, 'INCO Terms', o.incoterms || '-'],
    ['目  的  港', o.destinationPort || '-', '唛      头', (o.marks && typeof o.marks === 'object' ? o.marks.mainText : o.marks) || '-'],
    ['付款条款', o.paymentTerms || '-', '付款状态', o.paymentStatus || '-'],
  ];
  const infoStart = 3;
  info.forEach((row, i) => {
    const r = infoStart + i;
    ws.getRow(r).height = 22;
    const [l1, v1, l2, v2] = row;
    ws.getCell(r, 1).value = l1;
    ws.getCell(r, 1).font = { name: 'Microsoft YaHei', bold: true, size: 11, color: { argb: 'FF4B5563' } };
    ws.getCell(r, 1).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.mergeCells(r, 2, r, 5);
    ws.getCell(r, 2).value = v1;
    ws.getCell(r, 2).font = { name: 'Microsoft YaHei', size: 11 };
    ws.getCell(r, 2).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.getCell(r, 6).value = l2;
    ws.getCell(r, 6).font = { name: 'Microsoft YaHei', bold: true, size: 11, color: { argb: 'FF4B5563' } };
    ws.getCell(r, 6).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.mergeCells(r, 7, r, 10);
    ws.getCell(r, 7).value = v2;
    ws.getCell(r, 7).font = { name: 'Microsoft YaHei', size: 11 };
    ws.getCell(r, 7).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
  });

  const tableStart = infoStart + info.length + 2;
  const headers = ['序号', '产品图', '产品编号', '产品名', '中文描述', '规格', '中文包装', '数量', '单价(' + cur + ')', '金额(' + cur + ')'];
  ws.getRow(tableStart).height = 36;
  headers.forEach((h, i) => {
    const cell = ws.getCell(tableStart, i + 1);
    cell.value = h;
    cell.font = { name: 'Microsoft YaHei', bold: true, size: 10, color: { argb: 'FF1F2937' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8EFF7' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = thinBorderS();
  });

  let total = 0;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const p = it.productId ? productById(it.productId) : null;
    const r = tableStart + i + 1;
    ws.getRow(r).height = 80;
    ws.getCell(r, 1).value = i + 1;
    if (p && p.image) await addProductImage(wb, ws, 'B' + r, p.image, 70, 70);
    ws.getCell(r, 2).value = '';
    ws.getCell(r, 3).value = (p && p.code) || '-';
    ws.getCell(r, 4).value = (p && p.nameZh) || it.productName || (p && p.nameEn) || '';
    ws.getCell(r, 5).value = it.descriptionZh || (p && (p.descriptionZh || p.description)) || '';
    ws.getCell(r, 6).value = it.specs || (p && p.specs) || '';
    ws.getCell(r, 7).value = it.packingZh || (p && (p.packingZh || p.packing)) || '';
    const qty = Number(it.qty) || 0;
    const up = Number(it.unitPrice) || 0;
    ws.getCell(r, 8).value = qty;
    ws.getCell(r, 9).value = up;
    const amt = qty * up;
    ws.getCell(r, 10).value = amt;
    total += amt;

    for (let col = 1; col <= 10; col++) {
      const cell = ws.getCell(r, col);
      cell.font = { name: 'Microsoft YaHei', size: 10, color: { argb: 'FF1F2937' } };
      cell.border = thinBorderS();
      if ([1, 2, 3, 8].includes(col)) cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      else if (col === 9 || col === 10) {
        cell.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
        cell.numFmt = '0.00';
      } else cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };
    }
  }

  // 合计
  const totalRow = tableStart + items.length + 1;
  ws.getRow(totalRow).height = 30;
  ws.mergeCells(totalRow, 1, totalRow, 9);
  const tc = ws.getCell(totalRow, 1);
  tc.value = '总  金  额  TOTAL (' + cur + ')';
  tc.font = { name: 'Microsoft YaHei', bold: true, size: 13, color: { argb: 'FF1F2937' } };
  tc.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
  tc.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF4D6' } };
  tc.border = thinBorderS();
  const tv = ws.getCell(totalRow, 10);
  tv.value = total;
  tv.font = { name: 'Microsoft YaHei', bold: true, size: 13, color: { argb: 'FF1F2937' } };
  tv.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
  tv.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF4D6' } };
  tv.border = thinBorderS();
  tv.numFmt = '#,##0.00';

  // 备注 + 唛头详情
  let lastRow = totalRow;
  if (o.notes) {
    lastRow = totalRow + 2;
    ws.mergeCells(lastRow, 1, lastRow, 10);
    const nc = ws.getCell(lastRow, 1);
    nc.value = '备注：' + o.notes;
    nc.font = { name: 'Microsoft YaHei', size: 10, color: { argb: 'FF6B7280' } };
    nc.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };
  }
  const m = (o.marks && typeof o.marks === 'object') ? o.marks : {};
  if (m.mainText || m.mainImage || m.sideText || m.sideImage || m.notes) {
    const mhr = lastRow + 2;
    ws.mergeCells(mhr, 1, mhr, 10);
    const mh = ws.getCell(mhr, 1);
    mh.value = '唛头详情 SHIPPING MARKS';
    mh.font = { name: 'Microsoft YaHei', bold: true, size: 12, color: { argb: 'FF1E40AF' } };
    mh.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    mh.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8EFF7' } };
    ws.getRow(mhr).height = 26;
    const txtR = mhr + 1;
    ws.getRow(txtR).height = 22;
    ws.getCell(txtR, 1).value = '正唛';
    ws.getCell(txtR, 1).font = { name: 'Microsoft YaHei', bold: true, size: 11, color: { argb: 'FF4B5563' } };
    ws.getCell(txtR, 1).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.mergeCells(txtR, 2, txtR, 5);
    ws.getCell(txtR, 2).value = m.mainText || '-';
    ws.getCell(txtR, 2).font = { name: 'Microsoft YaHei', size: 11 };
    ws.getCell(txtR, 2).alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };
    ws.getCell(txtR, 6).value = '侧唛';
    ws.getCell(txtR, 6).font = { name: 'Microsoft YaHei', bold: true, size: 11, color: { argb: 'FF4B5563' } };
    ws.getCell(txtR, 6).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.mergeCells(txtR, 7, txtR, 10);
    ws.getCell(txtR, 7).value = m.sideText || '-';
    ws.getCell(txtR, 7).font = { name: 'Microsoft YaHei', size: 11 };
    ws.getCell(txtR, 7).alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };
    let bottomR = txtR;
    if (m.mainImage || m.sideImage) {
      const imgR = txtR + 1;
      ws.getRow(imgR).height = 130;
      if (m.mainImage) await addProductImage(wb, ws, 'B' + imgR, m.mainImage, 200, 120);
      if (m.sideImage) await addProductImage(wb, ws, 'G' + imgR, m.sideImage, 200, 120);
      bottomR = imgR;
    }
    if (m.notes) {
      const nnr = bottomR + 1;
      ws.mergeCells(nnr, 1, nnr, 10);
      const nnc = ws.getCell(nnr, 1);
      nnc.value = '唛头备注：' + m.notes;
      nnc.font = { name: 'Microsoft YaHei', size: 10, color: { argb: 'FF6B7280' }, italic: true };
      nnc.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };
    }
  }

  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const safeName = c.company.replace(/[\\/:*?"<>|]/g, '_').substring(0, 40);
  const filename = '订单确认书_' + safeName + '_' + (o.orderNo || todayStr()) + '.xlsx';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('已导出 ' + filename, 'success');
}

async function exportOrderPIEn(id) {
  if (typeof ExcelJS === 'undefined') { toast('Excel 库未加载', 'error'); return; }
  const o = (DB.orders || []).find(x => x.id === id);
  if (!o) { toast('订单不存在', 'error'); return; }
  const c = customerById(o.customerId);
  if (!c) { toast('客户不存在', 'error'); return; }
  const items = o.items || [];
  if (items.length === 0) { toast('订单没有产品', 'error'); return; }
  const cur = o.currency || 'USD';

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Proforma Invoice', {
    pageSetup: { orientation: 'landscape', paperSize: 9, fitToPage: true, fitToWidth: 1, fitToHeight: 0, horizontalCentered: true },
    pageMargins: { left: 0.3, right: 0.3, top: 0.4, bottom: 0.4 }
  });

  // 10 列宽
  [6, 14, 14, 22, 26, 14, 18, 8, 14, 14].forEach((w, i) => { ws.getColumn(i + 1).width = w; });
  ws.getColumn(2).width = 18;

  // 抬头 - LOGO + 公司信息
  for (let r = 1; r <= 5; r++) ws.getRow(r).height = 20;
  if (typeof COMPANY_LOGO_BASE64 !== 'undefined' && COMPANY_LOGO_BASE64) {
    try {
      const imgId = wb.addImage({ base64: 'data:image/png;base64,' + COMPANY_LOGO_BASE64, extension: 'png' });
      ws.addImage(imgId, { tl: { col: 0.2, row: 0.2 }, ext: { width: 210, height: 95 } });
    } catch (err) {}
  }

  ws.mergeCells('D1:J1');
  ws.getCell('D1').value = COMPANY_INFO.name;
  ws.getCell('D1').font = { name: 'Cambria', bold: true, size: 18, color: { argb: 'FF1F2937' } };
  ws.getCell('D1').alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };

  ws.mergeCells('D2:J2');
  ws.getCell('D2').value = COMPANY_INFO.salesEn;
  ws.getCell('D2').font = { name: 'Calibri', size: 9.5, color: { argb: 'FF6B7280' } };
  ws.getCell('D2').alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };

  ws.mergeCells('D3:J3');
  ws.getCell('D3').value = COMPANY_INFO.factoryEn;
  ws.getCell('D3').font = { name: 'Calibri', size: 9.5, color: { argb: 'FF6B7280' } };
  ws.getCell('D3').alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };

  ws.mergeCells('D4:J4');
  ws.getCell('D4').value = 'Website: ' + COMPANY_INFO.website;
  ws.getCell('D4').font = { name: 'Calibri', size: 9.5, italic: true, color: { argb: 'FF6B7280' } };
  ws.getCell('D4').alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };

  for (let col = 1; col <= 10; col++) {
    ws.getCell(5, col).border = { bottom: { style: 'thin', color: { argb: 'FF2D5C3F' } } };
  }

  // 大标题
  ws.mergeCells('A7:J7');
  const t = ws.getCell('A7');
  t.value = 'PROFORMA INVOICE';
  t.font = { name: 'Cambria', bold: true, size: 22, color: { argb: 'FF1F2937' } };
  t.alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(7).height = 36;

  // 订单信息
  const info = [
    ['To:', c.company, 'PI No.:', o.orderNo || '-'],
    ['Date:', o.orderDate || '-', 'Delivery:', o.deliveryDate || '-'],
    ['Currency:', cur, 'INCO Terms:', o.incoterms || '-'],
    ['Destination:', o.destinationPort || '-', 'Marks:', (o.marks && typeof o.marks === 'object' ? o.marks.mainText : o.marks) || '-'],
    ['Payment Terms:', o.paymentTerms || '-', 'Status:', o.paymentStatus || '-'],
  ];
  const infoStart = 9;
  info.forEach((row, i) => {
    const r = infoStart + i;
    ws.getRow(r).height = 22;
    const [l1, v1, l2, v2] = row;
    ws.getCell(r, 1).value = l1;
    ws.getCell(r, 1).font = { name: 'Cambria', bold: true, size: 11, color: { argb: 'FF4B5563' } };
    ws.getCell(r, 1).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.mergeCells(r, 2, r, 5);
    ws.getCell(r, 2).value = v1;
    ws.getCell(r, 2).font = { name: 'Calibri', size: 11 };
    ws.getCell(r, 2).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.getCell(r, 6).value = l2;
    ws.getCell(r, 6).font = { name: 'Cambria', bold: true, size: 11, color: { argb: 'FF4B5563' } };
    ws.getCell(r, 6).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.mergeCells(r, 7, r, 10);
    ws.getCell(r, 7).value = v2;
    ws.getCell(r, 7).font = { name: 'Calibri', size: 11 };
    ws.getCell(r, 7).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
  });

  const tableStart = infoStart + info.length + 1;
  const headers = ['No.', 'Picture', 'Item Code', 'Product Name', 'Description', 'Spec.', 'Packing', 'Qty', 'Unit Price (' + cur + ')', 'Amount (' + cur + ')'];
  ws.getRow(tableStart).height = 36;
  headers.forEach((h, i) => {
    const cell = ws.getCell(tableStart, i + 1);
    cell.value = h;
    cell.font = { name: 'Cambria', bold: true, size: 10, color: { argb: 'FF1F2937' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8EFF7' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = thinBorderS();
  });

  let total = 0;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const p = it.productId ? productById(it.productId) : null;
    const r = tableStart + i + 1;
    ws.getRow(r).height = 80;
    ws.getCell(r, 1).value = i + 1;
    if (p && p.image) await addProductImage(wb, ws, 'B' + r, p.image, 70, 70);
    ws.getCell(r, 2).value = '';
    ws.getCell(r, 3).value = (p && p.code) || '-';
    ws.getCell(r, 4).value = (p && p.nameEn) || it.productName || (p && p.nameZh) || '';
    ws.getCell(r, 5).value = it.descriptionEn || (p && p.descriptionEn) || '';
    ws.getCell(r, 6).value = it.specs || (p && p.specs) || '';
    ws.getCell(r, 7).value = it.packingEn || (p && p.packingEn) || '';
    const qty = Number(it.qty) || 0;
    const up = Number(it.unitPrice) || 0;
    ws.getCell(r, 8).value = qty;
    ws.getCell(r, 9).value = up;
    const amt = qty * up;
    ws.getCell(r, 10).value = amt;
    total += amt;

    for (let col = 1; col <= 10; col++) {
      const cell = ws.getCell(r, col);
      cell.font = { name: 'Calibri', size: 10, color: { argb: 'FF1F2937' } };
      cell.border = thinBorderS();
      if ([1, 2, 3, 8].includes(col)) cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      else if (col === 9 || col === 10) {
        cell.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
        cell.numFmt = '#,##0.00';
      } else cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };
    }
  }

  // TOTAL DUE
  const totalRow = tableStart + items.length + 1;
  ws.getRow(totalRow).height = 30;
  ws.mergeCells(totalRow, 1, totalRow, 9);
  const tc = ws.getCell(totalRow, 1);
  tc.value = 'TOTAL DUE (' + cur + ')';
  tc.font = { name: 'Cambria', bold: true, size: 13, color: { argb: 'FFFFFFFF' } };
  tc.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
  tc.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };
  tc.border = thinBorderS();
  const tv = ws.getCell(totalRow, 10);
  tv.value = total;
  tv.font = { name: 'Cambria', bold: true, size: 13, color: { argb: 'FFFFFFFF' } };
  tv.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
  tv.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };
  tv.border = thinBorderS();
  tv.numFmt = '#,##0.00';

  // PAYMENT INFORMATION
  const payStart = totalRow + 3;
  ws.mergeCells(payStart, 1, payStart, 10);
  const ph = ws.getCell(payStart, 1);
  ph.value = 'PAYMENT INFORMATION';
  ph.font = { name: 'Cambria', bold: true, size: 13, color: { argb: 'FFFFFFFF' } };
  ph.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
  ph.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };
  ws.getRow(payStart).height = 28;

  const bankInfo = [
    ['Account Name', COMPANY_INFO.name],
    ['Account Number', '9988001320867'],
    ['Account Type', 'Business Account'],
    ['Bank Name', 'Deutsche Bank AG, Hong Kong'],
    ['Bank Address', '57/F, International Commerce Centre, 1 Austin Road West, Kowloon, Hong Kong'],
    ['SWIFT/BIC Code', 'DEUTHKHHXXX'],
    ['Bank Code', '054'],
    ['Branch Code', '895'],
    ['Country/Region', 'Hong Kong (China)'],
    ['Payment Method', 'For the payment of goods, please make a SWIFT/CHATS Payment'],
  ];
  bankInfo.forEach((row, i) => {
    const r = payStart + 1 + i;
    ws.getRow(r).height = 22;
    ws.mergeCells(r, 1, r, 3);
    const lc = ws.getCell(r, 1);
    lc.value = row[0];
    lc.font = { name: 'Cambria', bold: true, size: 11, color: { argb: 'FF4B5563' } };
    lc.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    lc.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFB' } };
    lc.border = thinBorderS();
    ws.mergeCells(r, 4, r, 10);
    const vc = ws.getCell(r, 4);
    vc.value = row[1];
    vc.font = { name: 'Calibri', size: 11, color: { argb: 'FF1F2937' } };
    vc.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };
    vc.border = thinBorderS();
  });

  // 唛头详情 (在签字栏之前)
  const m = (o.marks && typeof o.marks === 'object') ? o.marks : {};
  let preSigRow = payStart + bankInfo.length + 1;
  if (m.mainText || m.mainImage || m.sideText || m.sideImage || m.notes) {
    const mhr = preSigRow + 2;
    ws.mergeCells(mhr, 1, mhr, 10);
    const mh = ws.getCell(mhr, 1);
    mh.value = 'SHIPPING MARKS';
    mh.font = { name: 'Cambria', bold: true, size: 13, color: { argb: 'FFFFFFFF' } };
    mh.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    mh.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };
    ws.getRow(mhr).height = 28;
    const txtR = mhr + 1;
    ws.getRow(txtR).height = 22;
    ws.getCell(txtR, 1).value = 'Main Mark';
    ws.getCell(txtR, 1).font = { name: 'Cambria', bold: true, size: 11, color: { argb: 'FF4B5563' } };
    ws.getCell(txtR, 1).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.mergeCells(txtR, 2, txtR, 5);
    ws.getCell(txtR, 2).value = m.mainText || '-';
    ws.getCell(txtR, 2).font = { name: 'Calibri', size: 11 };
    ws.getCell(txtR, 2).alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };
    ws.getCell(txtR, 6).value = 'Side Mark';
    ws.getCell(txtR, 6).font = { name: 'Cambria', bold: true, size: 11, color: { argb: 'FF4B5563' } };
    ws.getCell(txtR, 6).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.mergeCells(txtR, 7, txtR, 10);
    ws.getCell(txtR, 7).value = m.sideText || '-';
    ws.getCell(txtR, 7).font = { name: 'Calibri', size: 11 };
    ws.getCell(txtR, 7).alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };
    let bottomR = txtR;
    if (m.mainImage || m.sideImage) {
      const imgR = txtR + 1;
      ws.getRow(imgR).height = 130;
      if (m.mainImage) await addProductImage(wb, ws, 'B' + imgR, m.mainImage, 200, 120);
      if (m.sideImage) await addProductImage(wb, ws, 'G' + imgR, m.sideImage, 200, 120);
      bottomR = imgR;
    }
    if (m.notes) {
      const nnr = bottomR + 1;
      ws.mergeCells(nnr, 1, nnr, 10);
      const nnc = ws.getCell(nnr, 1);
      nnc.value = 'Note: ' + m.notes;
      nnc.font = { name: 'Calibri', size: 10, italic: true, color: { argb: 'FF6B7280' } };
      nnc.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };
      bottomR = nnr;
    }
    preSigRow = bottomR;
  }
  // 签字栏
  const sigRow = preSigRow + 2;
  ws.getRow(sigRow).height = 22;
  ws.getCell(sigRow, 1).value = 'Buyer Signature:';
  ws.getCell(sigRow, 1).font = { name: 'Cambria', bold: true, size: 11, color: { argb: 'FF4B5563' } };
  ws.getCell(sigRow, 1).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
  ws.getCell(sigRow, 6).value = 'Vendor Signature:';
  ws.getCell(sigRow, 6).font = { name: 'Cambria', bold: true, size: 11, color: { argb: 'FF4B5563' } };
  ws.getCell(sigRow, 6).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
  for (let col = 2; col <= 5; col++) ws.getCell(sigRow + 2, col).border = { bottom: { style: 'thin', color: { argb: 'FF9CA3AF' } } };
  for (let col = 7; col <= 10; col++) ws.getCell(sigRow + 2, col).border = { bottom: { style: 'thin', color: { argb: 'FF9CA3AF' } } };

  // Thank you
  const thankRow = sigRow + 4;
  ws.mergeCells(thankRow, 1, thankRow, 10);
  const tc2 = ws.getCell(thankRow, 1);
  tc2.value = 'Thank you for your business!';
  tc2.font = { name: 'Cambria', bold: true, italic: true, size: 13, color: { argb: 'FF1E3A8A' } };
  tc2.alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(thankRow).height = 28;

  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const safeName = c.company.replace(/[\\/:*?"<>|]/g, '_').substring(0, 40);
  const filename = 'PI_' + safeName + '_' + (o.orderNo || todayStr()) + '.xlsx';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('已导出 ' + filename, 'success');
}

// === 唛头扩展（正唛/侧唛文字+图片 + 唛头备注）===

function orderMarksObj() {
  if (!_editingOrder.marks || typeof _editingOrder.marks !== 'object') {
    _editingOrder.marks = { mainText: '', mainImage: '', sideText: '', sideImage: '', notes: '' };
  }
  return _editingOrder.marks;
}

function orderMarksHtml() {
  const m = orderMarksObj();
  return `
    <div id="orderMarksBlock" style="border:1px solid #e5e7eb;border-radius:4px;padding:10px;background:#fafbfc;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div>
          <label style="font-size:11px;color:#4b5563;font-weight:600;">正唛 (Main Mark)</label>
          <textarea rows="2" placeholder="输入正唛文字..." style="margin-top:4px;width:100%;" oninput="orderMarksChange('mainText',this.value)">${escapeHtml(m.mainText||'')}</textarea>
          <label style="font-size:11px;color:#6b7280;margin-top:6px;display:block;">正唛图片</label>
          <div tabindex="0" class="product-img-drop" style="margin-top:4px;"
               onpaste="orderMarksPaste(event,'main')"
               ondrop="orderMarksDrop(event,'main')"
               ondragover="event.preventDefault();this.classList.add('dragging')"
               ondragleave="this.classList.remove('dragging')">
            ${m.mainImage
              ? '<img src="' + imgUrl(m.mainImage) + '" style="max-width:100%;max-height:140px;display:block;cursor:pointer;border-radius:3px;" onclick="orderMarksUpload(\'main\')">'
              : '<div class="image-uploader" style="padding:18px;" onclick="orderMarksUpload(\'main\')">点击上传图片<br><span style="font-size:10px;color:#6b7280;">或拖入 / Ctrl+V</span></div>'}
          </div>
          ${m.mainImage ? '<button type="button" class="btn btn-sm" onclick="orderMarksClear(\'main\')" style="margin-top:4px;">移除图片</button>' : ''}
        </div>
        <div>
          <label style="font-size:11px;color:#4b5563;font-weight:600;">侧唛 (Side Mark)</label>
          <textarea rows="2" placeholder="输入侧唛文字..." style="margin-top:4px;width:100%;" oninput="orderMarksChange('sideText',this.value)">${escapeHtml(m.sideText||'')}</textarea>
          <label style="font-size:11px;color:#6b7280;margin-top:6px;display:block;">侧唛图片</label>
          <div tabindex="0" class="product-img-drop" style="margin-top:4px;"
               onpaste="orderMarksPaste(event,'side')"
               ondrop="orderMarksDrop(event,'side')"
               ondragover="event.preventDefault();this.classList.add('dragging')"
               ondragleave="this.classList.remove('dragging')">
            ${m.sideImage
              ? '<img src="' + imgUrl(m.sideImage) + '" style="max-width:100%;max-height:140px;display:block;cursor:pointer;border-radius:3px;" onclick="orderMarksUpload(\'side\')">'
              : '<div class="image-uploader" style="padding:18px;" onclick="orderMarksUpload(\'side\')">点击上传图片<br><span style="font-size:10px;color:#6b7280;">或拖入 / Ctrl+V</span></div>'}
          </div>
          ${m.sideImage ? '<button type="button" class="btn btn-sm" onclick="orderMarksClear(\'side\')" style="margin-top:4px;">移除图片</button>' : ''}
        </div>
      </div>
      <div style="margin-top:10px;">
        <label style="font-size:11px;color:#4b5563;font-weight:600;">唛头备注</label>
        <textarea rows="2" placeholder="补充说明..." style="margin-top:4px;width:100%;" oninput="orderMarksChange('notes',this.value)">${escapeHtml(m.notes||'')}</textarea>
      </div>
    </div>
  `;
}

function orderMarksChange(field, value) {
  const m = orderMarksObj();
  m[field] = value;
}

function orderMarksUpload(which) {
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = 'image/*';
  inp.onchange = e => {
    const file = e.target.files[0];
    if (file) processOrderMarksImage(file, which);
  };
  inp.click();
}

function orderMarksPaste(e, which) {
  const cd = e.clipboardData || window.clipboardData;
  if (!cd) return;
  for (let i = 0; i < cd.items.length; i++) {
    if (cd.items[i].type && cd.items[i].type.startsWith('image/')) {
      e.preventDefault();
      processOrderMarksImage(cd.items[i].getAsFile(), which);
      return;
    }
  }
}

function orderMarksDrop(e, which) {
  e.preventDefault();
  if (e.currentTarget) e.currentTarget.classList.remove('dragging');
  if (e.dataTransfer && e.dataTransfer.files.length > 0) {
    processOrderMarksImage(e.dataTransfer.files[0], which);
  }
}

function processOrderMarksImage(file, which) {
  if (!file || !file.type.startsWith('image/')) { toast('请选择图片', 'error'); return; }
  compressImgFile(file, async dataUrl => {
    const id = await saveImage(dataUrl);
    if (!id) return;
    orderMarksChange(which + 'Image', id);
    refreshOrderMarks();
    toast('图片已加载', 'success');
  });
}

function orderMarksClear(which) {
  const cur = orderMarksObj()[which + 'Image'];
  if (cur) deleteImage(cur);
  orderMarksChange(which + 'Image', '');
  refreshOrderMarks();
}

function refreshOrderMarks() {
  const el = document.getElementById('orderMarksBlock');
  if (el) el.outerHTML = orderMarksHtml();
}

function deleteOrder(id) {
  if (!confirm('确定删除该订单？')) return;
  DB.orders = (DB.orders || []).filter(x => x.id !== id);
  saveDB(); renderOrders(); toast('已删除');
}

// 占位 - 阶段 2/3 实现
function createShipmentFromOrder(id) {
  const o = (DB.orders || []).find(x => x.id === id);
  if (!o) { toast('订单不存在', 'error'); return; }
  if (!confirm('基于此订单创建出货单？产品和数量会自动带入。')) return;
  const shipItems = (o.items || []).map(it => ({
    id: uid(),
    productId: it.productId || '',
    qty: Number(it.qty) || 0,
    tailMode: 'whole',
  }));
  currentPage = 'shipments';
  renderNav();
  render();
  setTimeout(() => {
    _editingShipment = {
      id: uid(),
      code: nextCode('SHP'),
      customerId: o.customerId,
      date: todayStr(),
      status: '草稿',
      orderNo: o.orderNo || '',
      marks: (o.marks && typeof o.marks === 'object' ? o.marks.mainText : o.marks) || '',
      port: o.destinationPort || '',
      notes: '基于订单 ' + (o.orderNo || '') + ' 创建',
      items: shipItems,
      createdAt: new Date().toISOString()
    };
    openModal('新建出货单 ' + _editingShipment.code,
      renderShipmentForm(),
      '<button class="btn" onclick="closeModal()">取消</button>' +
      '<button class="btn btn-primary" onclick="saveShipmentForm(\'\')">保存</button>',
      'xl');
    toast('已从订单 ' + (o.orderNo || '') + ' 创建出货单', 'success');
  }, 100);
}

/* ============================================================
 * 出货单 (Shipments)
 * ============================================================ */

let shipmentFilter = '';
let shipmentStatusFilter = '';
let _editingShipment = null;

function calcShipmentItem(item) {
  const out = { valid: false, qty: 0, qpc: 0, fullCartons: 0, remainder: 0,
                totalCartons: 0, cbm: 0, gross: 0, net: 0, displayCartons: '-' };
  if (!item || !item.productId) return out;
  const p = productById(item.productId);
  if (!p || !hasPackingInfo(p)) return out;
  const qty = Number(item.qty) || 0;
  const qpc = Number(p.qtyPerCarton) || 0;
  if (qty <= 0 || qpc <= 0) return out;
  const cbm = calcCartonCBM(p);
  const gw = Number(p.cartonGrossWeight) || 0;
  const nw = Number(p.cartonNetWeight) || 0;
  const full = Math.floor(qty / qpc);
  const rem = qty % qpc;
  let cartons;
  if (item.tailMode === 'pro-rata') {
    cartons = qty / qpc;
  } else {
    cartons = full + (rem > 0 ? 1 : 0);
  }
  return {
    valid: true, qty, qpc, fullCartons: full, remainder: rem,
    totalCartons: cartons,
    cbm: cartons * cbm,
    gross: cartons * gw,
    net: cartons * nw,
    displayCartons: item.tailMode === 'pro-rata'
      ? cartons.toFixed(2) + ' 箱'
      : cartons + ' 箱' + (rem > 0 ? ' (' + full + ' 整 + 1 尾 ' + rem + ' 个)' : '')
  };
}

function calcShipmentTotal(shipment) {
  let cartons = 0, cbm = 0, gross = 0, net = 0, missing = 0;
  (shipment.items || []).forEach(it => {
    const r = calcShipmentItem(it);
    if (r.valid) {
      cartons += r.totalCartons;
      cbm += r.cbm;
      gross += r.gross;
      net += r.net;
    } else if (it.productId) {
      missing++;
    }
  });
  return { cartons, cbm, gross, net, missingProducts: missing };
}

function renderShipments() {
  document.getElementById('pageTitle').textContent = '出货单';
  document.getElementById('topbarActions').innerHTML = `<button class="btn btn-primary" onclick="editShipment()">+ 新建出货单</button>`;
  setTabs('');

  const kw = shipmentFilter.toLowerCase();
  const list = (DB.shipments || []).filter(s => {
    const c = customerById(s.customerId);
    const matchKw = !kw || (s.code || '').toLowerCase().includes(kw) ||
      (c && c.company.toLowerCase().includes(kw)) ||
      (s.orderNo || '').toLowerCase().includes(kw) ||
      (s.port || '').toLowerCase().includes(kw);
    const matchStatus = !shipmentStatusFilter || s.status === shipmentStatusFilter;
    return matchKw && matchStatus;
  }).sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  document.getElementById('content').innerHTML = `
    <div class="table-wrap">
      <div class="table-toolbar">
        <input class="search-box" placeholder="搜索 单号 / 客户 / 订单号 / 目的港..."
               value="${escapeHtml(shipmentFilter)}" oninput="shipmentFilter=this.value;renderShipments()">
        <select class="btn" onchange="shipmentStatusFilter=this.value;renderShipments()">
          <option value="">全部状态</option>
          ${SHIPMENT_STATUSES.map(s => `<option ${shipmentStatusFilter===s.name?'selected':''}>${s.name}</option>`).join('')}
        </select>
        <span class="muted">共 ${list.length} 单</span>
      </div>
      ${list.length === 0 ? '<div class="empty">暂无出货单</div>' : `
      <table>
        <thead><tr>
          <th>单号</th><th>日期</th><th>客户</th><th>关联订单</th>
          <th class="text-right">产品数</th><th class="text-right">总箱数</th>
          <th class="text-right">总CBM</th><th class="text-right">总毛重(kg)</th>
          <th>状态</th><th class="text-right">操作</th>
        </tr></thead>
        <tbody>
        ${list.map(s => {
          const t = calcShipmentTotal(s);
          return `<tr>
            <td class="code no-wrap">${escapeHtml(s.code || '')}</td>
            <td class="no-wrap">${fmtDate(s.date)}</td>
            <td>${customerNameWithFlag(s.customerId)}</td>
            <td class="muted">${escapeHtml(s.orderNo || '-')}</td>
            <td class="text-right">${(s.items || []).length}</td>
            <td class="text-right"><strong>${t.cartons.toFixed(2).replace(/\.00$/, '')}</strong></td>
            <td class="text-right">${t.cbm.toFixed(4)}</td>
            <td class="text-right">${t.gross.toFixed(1)}</td>
            <td><span class="tag ${getStatus(SHIPMENT_STATUSES, s.status).tag}">${escapeHtml(s.status || '-')}</span></td>
            <td class="text-right no-wrap">
              <button class="btn-link" onclick="viewShipment('${s.id}')">详情</button>
              <button class="btn-link" onclick="editShipment('${s.id}')">编辑</button>
              <button class="btn-link danger" onclick="deleteShipment('${s.id}')">删除</button>
            </td>
          </tr>`;
        }).join('')}
        </tbody>
      </table>`}
    </div>
  `;
}

function editShipment(id, customerId) {
  if (DB.customers.length === 0) { toast('请先添加客户', 'error'); return; }
  if (id) {
    const s = (DB.shipments || []).find(x => x.id === id);
    if (!s) { toast('出货单不存在', 'error'); return; }
    _editingShipment = JSON.parse(JSON.stringify(s));
    if (!_editingShipment.items) _editingShipment.items = [];
  } else {
    _editingShipment = {
      id: uid(),
      code: nextCode('SHP'),
      customerId: customerId || '',
      date: todayStr(),
      status: '草稿',
      orderNo: '',
      marks: '',
      port: '',
      notes: '',
      items: [],
      createdAt: new Date().toISOString()
    };
  }
  openModal((id ? '编辑出货单 ' : '新建出货单 ') + _editingShipment.code,
    renderShipmentForm(),
    `<button class="btn" onclick="closeModal()">取消</button>
     <button class="btn btn-primary" onclick="saveShipmentForm('${id || ''}')">保存</button>`,
    'xl');
}

function renderShipmentForm() {
  const s = _editingShipment;
  return `
    <div class="form-grid cols-3" style="margin-bottom:14px;">
      <div class="field"><label>出货日期 <span class="req">*</span></label>
        <input type="date" value="${fmtDate(s.date)}" onchange="_editingShipment.date=this.value"></div>
      <div class="field"><label>客户 <span class="req">*</span></label>
        <select onchange="_editingShipment.customerId=this.value">${customerOptions(s.customerId)}</select></div>
      <div class="field"><label>状态</label>
        <select onchange="_editingShipment.status=this.value">${SHIPMENT_STATUSES.map(st => `<option ${s.status===st.name?'selected':''}>${st.name}</option>`).join('')}</select></div>
      <div class="field"><label>关联订单号 (选填)</label>
        <input value="${escapeHtml(s.orderNo || '')}" oninput="_editingShipment.orderNo=this.value" placeholder="如 PO-12345"></div>
      <div class="field"><label>目的港 (选填)</label>
        <input value="${escapeHtml(s.port || '')}" oninput="_editingShipment.port=this.value" placeholder="如 Los Angeles"></div>
      <div class="field"><label>唛头 (选填)</label>
        <input value="${escapeHtml(s.marks || '')}" oninput="_editingShipment.marks=this.value"></div>
      <div class="field full"><label>备注</label>
        <textarea oninput="_editingShipment.notes=this.value">${escapeHtml(s.notes || '')}</textarea></div>
    </div>

    <div style="margin:18px 0 8px;display:flex;justify-content:space-between;align-items:center;">
      <strong style="font-size:14px;">出货产品</strong>
      <button type="button" class="btn btn-sm btn-primary" onclick="addShipmentItem()">+ 添加产品</button>
    </div>
    <div id="shipItems">${s.items.length === 0 ? '<div class="empty" style="padding:24px;background:#fafbfc;border-radius:6px;">暂无产品，点上方按钮添加</div>' : s.items.map(it => shipmentItemHtml(it)).join('')}</div>

    <div id="shipTotal" style="margin-top:14px;">${shipmentTotalHtml()}</div>
  `;
}

function shipmentItemSummary(item) {
  const p = productById(item.productId);
  const r = calcShipmentItem(item);
  if (!item.productId) return '<span class="muted">请先选择产品</span>';
  if (!p) return '<span style="color:#ef4444;">⚠ 产品已删除</span>';
  if (!hasPackingInfo(p)) {
    return '<span style="color:#ef4444;">⚠ 此产品未录入装箱信息 — <button type="button" class="btn-link" onclick="closeModal();editProduct(\'' + p.id + '\')" style="color:#4a90e2;">去补充</button></span>';
  }
  if (!r.valid) return '<span class="muted">填写数量后自动计算</span>';
  return '装箱数: <strong>' + p.qtyPerCarton + '/箱</strong> · 总箱数: <strong>' + r.displayCartons + '</strong> · 总体积: <strong>' + r.cbm.toFixed(4) + ' CBM</strong> · 总毛重: <strong>' + r.gross.toFixed(1) + ' kg</strong>' + (r.net > 0 ? ' · 总净重: ' + r.net.toFixed(1) + ' kg' : '');
}


function shipProductCardHtml(item) {
  const p = productById(item.productId);
  if (!p) {
    return '<div class="ship-product-card"><div class="no-img">?</div><div class="info"><span class="empty-line">未选择产品</span></div></div>';
  }
  return '<div class="ship-product-card">' +
    (p.image ? '<img src="' + imgUrl(p.image) + '">' : '<div class="no-img">无图</div>') +
    '<div class="info">' +
      '<div class="code-line">' + escapeHtml(p.code || '-') + '</div>' +
      '<div class="name-line">' + escapeHtml(p.nameEn || p.nameZh || '-') + '</div>' +
    '</div>' +
  '</div>';
}

function shipmentItemHtml(item) {
  return `
    <div class="ship-item" data-ship-item="${item.id}" style="border:1px solid #e5e7eb;border-radius:6px;padding:10px;margin-bottom:8px;background:#fff;">
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:10px;align-items:flex-end;">
        <div class="field">
          <label>产品 *</label>
          <div style="display:flex;gap:6px;align-items:stretch;">
            ${shipProductCardHtml(item)}
            <button type="button" class="btn btn-sm" onclick="openProductPicker('${item.id}')" style="white-space:nowrap;">${item.productId ? '更换' : '选择'}</button>
          </div>
        </div>
        <div class="field">
          <label>数量 *</label>
          <input type="number" min="0" step="1" value="${escapeHtml(item.qty || '')}" oninput="changeShipmentItem('${item.id}','qty',this.value)" placeholder="个数">
        </div>
        <div class="field">
          <label>尾箱处理</label>
          <select onchange="changeShipmentItem('${item.id}','tailMode',this.value)">
            <option value="whole" ${(item.tailMode || 'whole') === 'whole' ? 'selected' : ''}>按整箱算</option>
            <option value="pro-rata" ${item.tailMode === 'pro-rata' ? 'selected' : ''}>按比例算</option>
          </select>
        </div>
        <div>
          <button type="button" class="btn btn-sm" onclick="removeShipmentItem('${item.id}')" style="color:#ef4444;">删除</button>
        </div>
      </div>
      <div class="ship-item-summary" style="margin-top:8px;padding:8px 10px;background:#fafbfc;border-radius:4px;font-size:11.5px;">
        ${shipmentItemSummary(item)}
      </div>
    </div>
  `;
}

function shipmentTotalHtml() {
  const t = calcShipmentTotal(_editingShipment);
  return `
    <div style="border:2px solid #4a90e2;border-radius:6px;padding:12px 14px;background:#eff6ff;">
      <div style="font-weight:600;margin-bottom:8px;color:#1e40af;font-size:13px;">本次出货合计</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;font-size:13px;">
        <div>总箱数：<strong style="color:#1e40af;">${t.cartons.toFixed(2).replace(/\.00$/, '')}</strong></div>
        <div>总体积：<strong style="color:#1e40af;">${t.cbm.toFixed(4)} CBM</strong></div>
        <div>总毛重：<strong style="color:#1e40af;">${t.gross.toFixed(1)} kg</strong></div>
        <div>总净重：<strong style="color:#1e40af;">${t.net.toFixed(1)} kg</strong></div>
      </div>
      ${t.missingProducts > 0 ? '<div style="margin-top:8px;font-size:11px;color:#ef4444;">⚠ ' + t.missingProducts + ' 个产品缺装箱信息，未参与汇总</div>' : ''}
    </div>
  `;
}

function changeShipmentItem(itemId, field, value) {
  if (!_editingShipment) return;
  const it = _editingShipment.items.find(x => x.id === itemId);
  if (!it) return;
  it[field] = value;
  // 仅刷新摘要 + 合计，避免重建输入框导致丢光标
  const el = document.querySelector('[data-ship-item="' + itemId + '"]');
  if (el) {
    const summary = el.querySelector('.ship-item-summary');
    if (summary) summary.innerHTML = shipmentItemSummary(it);
  }
  refreshShipmentTotal();
}

function refreshShipmentTotal() {
  const el = document.getElementById('shipTotal');
  if (el) el.innerHTML = shipmentTotalHtml();
}

function removeShipmentItem(itemId) {
  if (!confirm('确定删除该行？')) return;
  _editingShipment.items = _editingShipment.items.filter(x => x.id !== itemId);
  const el = document.querySelector('[data-ship-item="' + itemId + '"]');
  if (el) el.remove();
  if (_editingShipment.items.length === 0) {
    document.getElementById('shipItems').innerHTML = '<div class="empty" style="padding:24px;background:#fafbfc;border-radius:6px;">暂无产品，点上方按钮添加</div>';
  }
  refreshShipmentTotal();
}

function saveShipmentForm(id) {
  const s = _editingShipment;
  if (!s) return;
  if (!s.customerId) { toast('请选择客户', 'error'); return; }
  if (!s.date) { toast('请填写出货日期', 'error'); return; }
  if (s.items.length === 0) { toast('请添加至少一个产品', 'error'); return; }
  for (const it of s.items) {
    if (!it.productId) { toast('每个产品行必须选择产品', 'error'); return; }
    const qty = Number(it.qty);
    if (!qty || qty <= 0) { toast('每个产品的数量必须大于 0', 'error'); return; }
    it.qty = qty;
  }
  if (!DB.shipments) DB.shipments = [];
  if (id) {
    const idx = DB.shipments.findIndex(x => x.id === id);
    if (idx >= 0) DB.shipments[idx] = s;
    else DB.shipments.push(s);
  } else {
    DB.shipments.push(s);
  }
  try {
    saveDB();
  } catch (err) {
    toast('保存失败：' + err.message, 'error');
    return;
  }
  _editingShipment = null;
  closeModal();
  renderShipments();
  toast('已保存', 'success');
}

function viewShipment(id) {
  const s = (DB.shipments || []).find(x => x.id === id);
  if (!s) return;
  const t = calcShipmentTotal(s);
  openModal('出货单 ' + s.code, `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:14px;">
      <dl class="detail-grid">
        <dt>出货单号</dt><dd class="code">${escapeHtml(s.code || '-')}</dd>
        <dt>出货日期</dt><dd>${fmtDate(s.date)}</dd>
        <dt>客户</dt><dd>${customerNameWithFlag(s.customerId)}</dd>
        <dt>状态</dt><dd><span class="tag ${getStatus(SHIPMENT_STATUSES, s.status).tag}">${escapeHtml(s.status || '-')}</span></dd>
      </dl>
      <dl class="detail-grid">
        <dt>关联订单</dt><dd>${escapeHtml(s.orderNo || '-')}</dd>
        <dt>目的港</dt><dd>${escapeHtml(s.port || '-')}</dd>
        <dt>唛头</dt><dd>${escapeHtml(s.marks || '-')}</dd>
        <dt>产品数</dt><dd>${(s.items || []).length}</dd>
      </dl>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">出货明细</div>
      <table>
        <thead><tr>
          <th style="width:50px;">图片</th><th>产品编号</th><th>品名</th>
          <th class="text-right">数量</th><th class="text-right">装箱数</th>
          <th class="text-right">箱数</th><th class="text-right">CBM</th>
          <th class="text-right">毛重(kg)</th><th class="text-right">净重(kg)</th>
        </tr></thead>
        <tbody>
          ${(s.items || []).map(it => {
            const p = productById(it.productId);
            const r = calcShipmentItem(it);
            const imgCell = p && p.image
              ? '<td><img src="' + imgUrl(p.image) + '" class="ship-detail-thumb"></td>'
              : '<td><div class="ship-detail-no-img">无图</div></td>';
            if (!r.valid) {
              return '<tr>' + imgCell + '<td colspan="8" style="color:#ef4444;font-size:11px;">⚠ ' + (p ? escapeHtml(p.nameEn || p.code || '') : '[产品已删除]') + ' (数量 ' + (it.qty || 0) + ') — 缺装箱信息，未计算</td></tr>';
            }
            return '<tr>' + imgCell +
              '<td class="code">' + escapeHtml(p.code || '-') + '</td>' +
              '<td>' + escapeHtml(p.nameEn || p.nameZh || '-') + '</td>' +
              '<td class="text-right">' + r.qty + '</td>' +
              '<td class="text-right">' + r.qpc + '/箱</td>' +
              '<td class="text-right"><strong>' + r.displayCartons + '</strong></td>' +
              '<td class="text-right">' + r.cbm.toFixed(4) + '</td>' +
              '<td class="text-right">' + r.gross.toFixed(1) + '</td>' +
              '<td class="text-right">' + (r.net > 0 ? r.net.toFixed(1) : '-') + '</td>' +
            '</tr>';
          }).join('')}
        </tbody>
        <tfoot>
          <tr style="background:#eff6ff;font-weight:600;">
            <td colspan="5" class="text-right">合计</td>
            <td class="text-right">${t.cartons.toFixed(2).replace(/\.00$/, '')}</td>
            <td class="text-right">${t.cbm.toFixed(4)}</td>
            <td class="text-right">${t.gross.toFixed(1)}</td>
            <td class="text-right">${t.net.toFixed(1)}</td>
          </tr>
        </tfoot>
      </table>
      ${t.missingProducts > 0 ? '<div style="margin-top:8px;font-size:11px;color:#ef4444;">⚠ ' + t.missingProducts + ' 个产品缺装箱信息，未参与汇总</div>' : ''}
    </div>

    ${s.notes ? '<div class="info-box" style="margin-top:14px;">备注：' + nl2br(s.notes) + '</div>' : ''}
  `, `
    <button class="btn" onclick="closeModal()">关闭</button>
    <button class="btn" onclick="exportPackingListZh('${id}')">↓ 国内装箱单 (中)</button>
    <button class="btn" onclick="exportPackingListEn('${id}')">↓ Packing List (EN)</button>
    <button class="btn btn-primary" onclick="closeModal();editShipment('${id}')">编辑</button>
  `, 'xl');
}

// === 装箱单导出（中英文双版本，基于 ExcelJS） ===

async function exportPackingList(id, lang) {
  if (typeof ExcelJS === 'undefined') {
    toast('Excel 库未加载，请检查网络后刷新页面', 'error'); return;
  }
  const s = (DB.shipments || []).find(x => x.id === id);
  if (!s) return;
  const c = customerById(s.customerId);
  const t = calcShipmentTotal(s);
  const isZh = (lang === 'zh');

  const titleFont = isZh ? 'Microsoft YaHei' : 'Cambria';
  const bodyFont = isZh ? 'Microsoft YaHei' : 'Calibri';

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet(isZh ? '装箱单' : 'Packing List', {
    pageSetup: { orientation: 'landscape', paperSize: 9, fitToPage: true, fitToWidth: 1, fitToHeight: 0, horizontalCentered: true },
    pageMargins: { left: 0.3, right: 0.3, top: 0.4, bottom: 0.4 }
  });

  // 列宽
  const widths = [6, 16, 32, 16, 11, 12, 8, 14, 12, 12, 13, 13];
  widths.forEach((w, i) => { ws.getColumn(i + 1).width = w; });

  // === LOGO + 公司抬头 ===
  for (let r = 1; r <= 5; r++) ws.getRow(r).height = 18;

  if (typeof COMPANY_LOGO_BASE64 !== 'undefined' && COMPANY_LOGO_BASE64) {
    try {
      const imgId = wb.addImage({ base64: 'data:image/png;base64,' + COMPANY_LOGO_BASE64, extension: 'png' });
      ws.addImage(imgId, { tl: { col: 0.2, row: 0.2 }, ext: { width: 210, height: 95 } });
    } catch (err) { console.warn('Logo embed failed', err); }
  }

  ws.mergeCells('D1:L1');
  const c1 = ws.getCell('D1');
  c1.value = COMPANY_INFO.name;
  c1.font = { name: titleFont, bold: true, size: 18, color: { argb: 'FF1F2937' } };
  c1.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };

  ws.mergeCells('D2:L2');
  const c2 = ws.getCell('D2');
  c2.value = isZh ? COMPANY_INFO.salesZh : COMPANY_INFO.salesEn;
  c2.font = { name: bodyFont, size: 9.5, color: { argb: 'FF6B7280' } };
  c2.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };

  ws.mergeCells('D3:L3');
  const c3 = ws.getCell('D3');
  c3.value = isZh ? COMPANY_INFO.factoryZh : COMPANY_INFO.factoryEn;
  c3.font = { name: bodyFont, size: 9.5, color: { argb: 'FF6B7280' } };
  c3.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };

  ws.mergeCells('D4:L4');
  const c4 = ws.getCell('D4');
  c4.value = (isZh ? '网址：' : 'Website: ') + COMPANY_INFO.website;
  c4.font = { name: bodyFont, size: 9.5, italic: true, color: { argb: 'FF6B7280' } };
  c4.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };

  // 分隔线（第 5 行底）
  for (let col = 1; col <= 12; col++) {
    ws.getCell(5, col).border = { bottom: { style: 'thin', color: { argb: 'FF2D5C3F' } } };
  }

  // === 大标题 ===
  ws.mergeCells('A7:L7');
  const title = ws.getCell('A7');
  title.value = isZh ? '装  箱  单' : 'PACKING LIST';
  title.font = { name: titleFont, bold: true, size: 22, color: { argb: 'FF1F2937' } };
  title.alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(7).height = 36;

  // === 出货信息 ===
  const info = isZh ? [
    ['出货单号', s.code || '-', '出货日期', s.date || '-'],
    ['客      户', c ? c.company : '-', '关联订单', s.orderNo || '-'],
    ['目  的  港', s.port || '-', '唛      头', s.marks || 'N/M'],
  ] : [
    ['Shipment No.', s.code || '-', 'Date', s.date || '-'],
    ['Customer', c ? c.company : '-', 'PO No.', s.orderNo || '-'],
    ['Destination', s.port || '-', 'Marks', s.marks || 'N/M'],
  ];
  const infoStart = 9;
  info.forEach((row, i) => {
    const r = infoStart + i;
    ws.getRow(r).height = 22;
    const [l1, v1, l2, v2] = row;
    const lc1 = ws.getCell(r, 1);
    lc1.value = l1;
    lc1.font = { name: titleFont, bold: true, size: 11, color: { argb: 'FF4B5563' } };
    lc1.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.mergeCells(r, 2, r, 6);
    const vc1 = ws.getCell(r, 2);
    vc1.value = v1;
    vc1.font = { name: bodyFont, size: 11, color: { argb: 'FF1F2937' } };
    vc1.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    const lc2 = ws.getCell(r, 7);
    lc2.value = l2;
    lc2.font = { name: titleFont, bold: true, size: 11, color: { argb: 'FF4B5563' } };
    lc2.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    ws.mergeCells(r, 8, r, 12);
    const vc2 = ws.getCell(r, 8);
    vc2.value = v2;
    vc2.font = { name: bodyFont, size: 11, color: { argb: 'FF1F2937' } };
    vc2.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
  });

  // === 表头 ===
  const tableStart = infoStart + info.length + 2;
  const headers = isZh
    ? ['序号', '产品编号', '品名', '规格', '数量(PCS)', '装箱数(个/箱)', '箱数', '单箱尺寸(cm)', '单箱体积(CBM)', '总体积(CBM)', '单箱毛重(KG)', '总毛重(KG)']
    : ['No.', 'Item No.', 'Description', 'Spec.', 'Qty (PCS)', 'Pcs/CTN', 'CTNS', 'Carton Size (cm)', 'CBM/CTN', 'Total CBM', 'GW/CTN (KG)', 'Total GW (KG)'];
  ws.getRow(tableStart).height = 36;
  headers.forEach((h, i) => {
    const cell = ws.getCell(tableStart, i + 1);
    cell.value = h;
    cell.font = { name: titleFont, bold: true, size: 10, color: { argb: 'FF1F2937' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8EFF7' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = thinBorder();
  });

  // === 数据行 ===
  (s.items || []).forEach((it, i) => {
    const p = productById(it.productId);
    const r = calcShipmentItem(it);
    const rowIdx = tableStart + i + 1;
    ws.getRow(rowIdx).height = 28;
    let nameStr, sizeStr, qpc, ctns, cbmPer, totalCbm, gwPer, totalGw;
    if (!p) { nameStr = '[已删除]'; }
    else if (!r.valid) {
      nameStr = isZh ? (p.nameZh ? p.nameZh + '\n' + (p.nameEn || '') : (p.nameEn || '')) : (p.nameEn || p.nameZh || '');
      sizeStr = ''; qpc = ''; ctns = isZh ? '缺装箱信息' : 'No packing info';
      cbmPer = ''; totalCbm = ''; gwPer = ''; totalGw = '';
    } else {
      nameStr = isZh ? (p.nameZh ? p.nameZh + '\n' + (p.nameEn || '') : (p.nameEn || '')) : (p.nameEn || p.nameZh || '');
      sizeStr = p.cartonLength + '×' + p.cartonWidth + '×' + p.cartonHeight;
      qpc = r.qpc;
      ctns = r.totalCartons;
      cbmPer = Number(calcCartonCBM(p).toFixed(4));
      totalCbm = Number(r.cbm.toFixed(4));
      gwPer = Number(p.cartonGrossWeight);
      totalGw = Number(r.gross.toFixed(1));
    }
    const rowData = [
      i + 1, p ? (p.code || '-') : '-', nameStr, p ? (p.specs || '-') : '-',
      it.qty || 0, qpc, ctns, sizeStr, cbmPer, totalCbm, gwPer, totalGw
    ];
    rowData.forEach((v, ci) => {
      const cell = ws.getCell(rowIdx, ci + 1);
      cell.value = v;
      cell.font = { name: bodyFont, size: 10, color: { argb: 'FF1F2937' } };
      cell.border = thinBorder();
      if ([1, 6, 7, 8].includes(ci + 1)) {
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      } else if ([5, 9, 10, 11, 12].includes(ci + 1)) {
        cell.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
      } else {
        cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true, indent: 1 };
      }
      if ([9, 10].includes(ci + 1)) cell.numFmt = '0.0000';
      if ([11, 12].includes(ci + 1)) cell.numFmt = '0.0';
    });
  });

  // === 合计行 ===
  const totalRow = tableStart + (s.items || []).length + 1;
  ws.getRow(totalRow).height = 30;
  ws.mergeCells(totalRow, 1, totalRow, 4);
  const totalQty = (s.items || []).reduce((sum, it) => sum + (Number(it.qty) || 0), 0);
  const totalCells = [
    { col: 1, val: isZh ? '合  计  TOTAL' : 'TOTAL', align: 'right' },
    { col: 5, val: totalQty, align: 'right' },
    { col: 6, val: '', align: 'center' },
    { col: 7, val: Number(t.cartons.toFixed(2)), align: 'center' },
    { col: 8, val: '', align: 'center' },
    { col: 9, val: '', align: 'right' },
    { col: 10, val: Number(t.cbm.toFixed(4)), align: 'right', fmt: '0.0000' },
    { col: 11, val: '', align: 'right' },
    { col: 12, val: Number(t.gross.toFixed(1)), align: 'right', fmt: '0.0' },
  ];
  totalCells.forEach(tc => {
    const cell = ws.getCell(totalRow, tc.col);
    if (tc.val !== '') cell.value = tc.val;
    cell.font = { name: titleFont, bold: true, size: 12, color: { argb: 'FF1F2937' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF4D6' } };
    cell.alignment = { horizontal: tc.align, vertical: 'middle', indent: tc.align !== 'center' ? 1 : 0 };
    cell.border = thinBorder();
    if (tc.fmt) cell.numFmt = tc.fmt;
  });

  // === 签字栏 ===
  const sigRow = totalRow + 3;
  ws.getRow(sigRow).height = 22;
  const sigL = ws.getCell(sigRow, 1);
  sigL.value = isZh ? '客户签字：' : 'Buyer Signature:';
  sigL.font = { name: titleFont, bold: true, size: 11, color: { argb: 'FF4B5563' } };
  sigL.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
  const sigR = ws.getCell(sigRow, 7);
  sigR.value = isZh ? '供应商签字：' : 'Vendor Signature:';
  sigR.font = { name: titleFont, bold: true, size: 11, color: { argb: 'FF4B5563' } };
  sigR.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
  // 签字底线
  for (let col = 2; col <= 5; col++) {
    ws.getCell(sigRow + 2, col).border = { bottom: { style: 'thin', color: { argb: 'FF9CA3AF' } } };
  }
  for (let col = 8; col <= 11; col++) {
    ws.getCell(sigRow + 2, col).border = { bottom: { style: 'thin', color: { argb: 'FF9CA3AF' } } };
  }

  // === 缺装箱信息提示 ===
  if (t.missingProducts > 0) {
    const warnRow = sigRow + 4;
    ws.mergeCells(warnRow, 1, warnRow, 12);
    const w = ws.getCell(warnRow, 1);
    w.value = isZh
      ? '⚠ 注意：有 ' + t.missingProducts + ' 个产品缺装箱信息，未参与汇总计算'
      : '⚠ Note: ' + t.missingProducts + ' product(s) missing packing info, excluded from totals';
    w.font = { name: bodyFont, size: 10, color: { argb: 'FFEF4444' }, italic: true };
    w.alignment = { horizontal: 'left', vertical: 'middle' };
  }

  // === 输出 ===
  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const safeName = ((c ? c.company : 'Unknown') + '').replace(/[\\/:*?"<>|]/g, '_').substring(0, 40);
  const dateStr = (s.date || todayStr()).replace(/-/g, '');
  const prefix = isZh ? '装箱单' : 'PackingList';
  const filename = prefix + '_' + safeName + '_' + dateStr + '.xlsx';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('已导出 ' + filename, 'success');
}

function thinBorder() {
  return {
    left: { style: 'thin', color: { argb: 'FFB0B7BD' } },
    right: { style: 'thin', color: { argb: 'FFB0B7BD' } },
    top: { style: 'thin', color: { argb: 'FFB0B7BD' } },
    bottom: { style: 'thin', color: { argb: 'FFB0B7BD' } },
  };
}

function exportPackingListZh(id) { exportPackingList(id, 'zh'); }
function exportPackingListEn(id) { exportPackingList(id, 'en'); }

function deleteShipment(id) {
  if (!confirm('确定删除该出货单？')) return;
  DB.shipments = (DB.shipments || []).filter(x => x.id !== id);
  saveDB();
  renderShipments();
  toast('已删除');
}


let followupFilter = '', followupTab = 'all';

function renderFollowups() {
  document.getElementById('pageTitle').textContent = '跟进记录';
  document.getElementById('topbarActions').innerHTML = `<button class="btn btn-primary" onclick="editFollowup()">+ 新建跟进</button>`;

  const today = todayStr();
  const tabs = [
    { id: 'all', name: '全部', f: () => true },
    { id: 'today', name: '今日待跟进', f: f => f.reminderDate === today && !f.done },
    { id: 'overdue', name: '已过期', f: f => f.reminderDate && f.reminderDate < today && !f.done },
    { id: 'done', name: '已处理', f: f => f.done },
  ];
  setTabs(tabs.map(t => `<div class="tab ${t.id===followupTab?'active':''}" onclick="followupTab='${t.id}';renderFollowups()">${t.name}${t.id==='today'||t.id==='overdue' ? ' (' + DB.followups.filter(t.f).length + ')' : ''}</div>`).join(''));

  const tabFilter = tabs.find(t => t.id === followupTab).f;
  const kw = followupFilter.toLowerCase();
  const list = DB.followups.filter(f => tabFilter(f) && (
    !kw || htmlToText(f.content||'').toLowerCase().includes(kw) || (f.nextAction||'').toLowerCase().includes(kw) ||
    (customerById(f.customerId) && customerById(f.customerId).company.toLowerCase().includes(kw))
  )).sort((a,b) => (b.date||'').localeCompare(a.date||''));

  document.getElementById('content').innerHTML = `
    <div class="table-wrap">
      <div class="table-toolbar">
        <input class="search-box" placeholder="搜索 客户 / 内容 / 下一步..." value="${escapeHtml(followupFilter)}" oninput="followupFilter=this.value;renderFollowups()">
        <span class="muted">共 ${list.length} 条</span>
      </div>
      ${list.length === 0 ? '<div class="empty">暂无跟进记录</div>' : `
      <table>
        <thead><tr><th>日期</th><th>客户</th><th>方式</th><th>沟通内容</th><th>下一步行动</th><th>提醒</th><th class="text-right">操作</th></tr></thead>
        <tbody>
        ${list.map(f => `<tr style="${f.done?'opacity:0.6;':''}">
          <td class="no-wrap">${fmtDate(f.date)}</td>
          <td>${customerNameWithFlag(f.customerId)}</td>
          <td><span class="tag tag-blue">${escapeHtml(f.channel || '-')}</span></td>
          <td>${escapeHtml(truncate(htmlToText(f.content), 50))}</td>
          <td class="muted">${escapeHtml(truncate(f.nextAction, 40))}</td>
          <td class="no-wrap">${f.reminderDate ?
            (f.done ? '<span class="tag tag-gray">已处理</span>' :
             f.reminderDate < today ? `<span class="tag tag-red">已过期 ${fmtDate(f.reminderDate)}</span>` :
             f.reminderDate === today ? '<span class="tag tag-orange">今日</span>' :
             `<span class="tag tag-blue">${fmtDate(f.reminderDate)}</span>`) : ''}</td>
          <td class="text-right no-wrap">
            ${f.reminderDate && !f.done ? `<button class="btn-link" onclick="markFollowupDone('${f.id}')">标记已处理</button>` : ''}
            <button class="btn-link" onclick="editFollowup('${f.id}')">编辑</button>
            <button class="btn-link danger" onclick="deleteFollowup('${f.id}')">删除</button>
          </td>
        </tr>`).join('')}
        </tbody>
      </table>`}
    </div>
  `;
}

function editFollowup(id, customerId) {
  if (DB.customers.length === 0) { toast('请先添加客户', 'error'); return; }
  const f = id ? DB.followups.find(x => x.id === id) : { customerId: customerId || '', date: todayStr(), channel: '邮件' };
  openModal(id ? '编辑跟进' : '新建跟进', `
    <form id="followupForm" onsubmit="return saveFollowup(event, '${id || ''}')">
      <div class="form-grid">
        <div class="field"><label>日期 <span class="req">*</span></label><input name="date" type="date" required value="${fmtDate(f.date)}"></div>
        <div class="field"><label>客户 <span class="req">*</span></label>
          <select name="customerId" required><option value="">请选择</option>${customerOptions(f.customerId)}</select></div>
        <div class="field"><label>沟通方式</label>
          <select name="channel">${CHANNELS.map(c => `<option ${f.channel===c?'selected':''}>${c}</option>`).join('')}</select></div>
        <div class="field"><label>下次跟进提醒</label><input name="reminderDate" type="date" value="${fmtDate(f.reminderDate)}"></div>
        <div class="field full"><label>沟通内容 <span class="req">*</span></label>
          ${richTextEditor('content', f.content || '', { minHeight: 160, placeholder: '记录沟通过程...支持 Ctrl+V 粘贴截图、拖入图片、文字格式' })}
        </div>
        <div class="field full"><label>下一步行动</label><textarea name="nextAction">${escapeHtml(f.nextAction || '')}</textarea></div>
      </div>
    </form>
  `, `<button class="btn" onclick="closeModal()">取消</button>
      <button class="btn btn-primary" onclick="document.getElementById('followupForm').requestSubmit()">保存</button>`);
  if (f.customerId) { const sel = document.querySelector('#followupForm [name=customerId]'); if (sel) sel.value = f.customerId; }
}

async function saveFollowup(e, id) {
  e.preventDefault();
  const form = e.target;
  if (rteIsEmpty(form, 'content')) { toast('请填写沟通内容', 'error'); return false; }
  const data = Object.fromEntries(new FormData(form).entries());
  data.content = rteGetValue(form, 'content');
  // 把内嵌 base64 图片搬到 IndexedDB
  data.content = await rewriteRichTextImages(data.content);
  if (id) Object.assign(DB.followups.find(x => x.id === id), data);
  else DB.followups.push({ id: uid(), createdAt: new Date().toISOString(), done: false, ...data });
  try {
    saveDB();
  } catch (err) {
    toast('保存失败：存储空间不足，请删除部分图片', 'error');
    return false;
  }
  closeModal(); renderNav(); render(); toast('已保存', 'success'); return false;
}

function deleteFollowup(id) {
  if (!confirm('确定删除？')) return;
  DB.followups = DB.followups.filter(x => x.id !== id);
  saveDB(); renderNav(); renderFollowups(); toast('已删除');
}

/* ============================================================
 * 邮件模板
 * ============================================================ */

function renderTemplates() {
  document.getElementById('pageTitle').textContent = '邮件模板';
  document.getElementById('topbarActions').innerHTML = `<button class="btn btn-primary" onclick="editTemplate()">+ 新建模板</button>`;
  setTabs('');

  document.getElementById('content').innerHTML = `
    <div class="info-box">
      💡 模板支持变量替换：<code>{{contact}}</code>(联系人) <code>{{company}}</code>(公司) <code>{{country}}</code>(国家)
      <code>{{productName}}</code>(产品) <code>{{orderNo}}</code>(订单号) <code>{{date}}</code>(日期) <code>{{myName}}</code>(您的名字)
      <br>在客户详情页点击"写邮件"可选择模板自动套用客户信息。
      <br><br>您的名字：<input type="text" id="myNameInput" value="${escapeHtml(DB.meta.myName)}" placeholder="设置您的名字（用于 {{myName}}）" style="padding:4px 8px;border:1px solid #d1d5db;border-radius:3px;width:200px;">
      <button class="btn btn-sm" onclick="DB.meta.myName=document.getElementById('myNameInput').value;saveDB();toast('已保存','success')">保存</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;">
      ${DB.templates.map(t => `
        <div class="panel">
          <div class="panel-header">
            <span><strong>${escapeHtml(t.name)}</strong></span>
            <div>
              <button class="btn-link" onclick="editTemplate('${t.id}')">编辑</button>
              <button class="btn-link danger" onclick="deleteTemplate('${t.id}')">删除</button>
            </div>
          </div>
          <div class="panel-body">
            <div class="muted" style="font-size:11px;margin-bottom:6px;">主题：</div>
            <div style="font-size:12px;margin-bottom:8px;">${escapeHtml(t.subject)}</div>
            <div class="muted" style="font-size:11px;margin-bottom:6px;">正文：</div>
            <div style="font-size:11px;color:#4b5563;white-space:pre-wrap;max-height:120px;overflow:hidden;">${escapeHtml(truncate(t.body, 200))}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function editTemplate(id) {
  const t = id ? DB.templates.find(x => x.id === id) : { name: '', subject: '', body: '' };
  openModal(id ? '编辑模板' : '新建模板', `
    <form id="templateForm" onsubmit="return saveTemplate(event, '${id || ''}')">
      <div class="form-grid cols-1">
        <div class="field"><label>模板名称 <span class="req">*</span></label>
          <input name="name" required value="${escapeHtml(t.name)}"></div>
        <div class="field"><label>邮件主题</label>
          <input name="subject" value="${escapeHtml(t.subject)}" placeholder="支持 {{company}} 等变量"></div>
        <div class="field"><label>邮件正文</label>
          <textarea name="body" rows="14" style="min-height:280px;font-family:ui-monospace,Consolas,monospace;">${escapeHtml(t.body)}</textarea></div>
      </div>
    </form>
  `, `<button class="btn" onclick="closeModal()">取消</button>
      <button class="btn btn-primary" onclick="document.getElementById('templateForm').requestSubmit()">保存</button>`, 'lg');
}

function saveTemplate(e, id) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  if (id) Object.assign(DB.templates.find(x => x.id === id), data);
  else DB.templates.push({ id: uid(), ...data });
  saveDB(); closeModal(); renderTemplates(); toast('已保存', 'success'); return false;
}

function deleteTemplate(id) {
  if (!confirm('确定删除该模板？')) return;
  DB.templates = DB.templates.filter(x => x.id !== id);
  saveDB(); renderTemplates(); toast('已删除');
}

function composeEmail(customerId) {
  const c = customerById(customerId);
  if (!c) return;
  const tplOptions = DB.templates.map(t => `<option value="${t.id}">${escapeHtml(t.name)}</option>`).join('');

  openModal('写邮件 给 ' + c.company, `
    <div class="form-grid cols-1">
      <div class="field"><label>选择模板</label>
        <select id="tplSelect" onchange="applyTemplate('${customerId}')">
          <option value="">-- 请选择模板 --</option>${tplOptions}
        </select></div>
      <div class="field"><label>产品名称（可选，用于 {{productName}}）</label>
        <input id="emailProduct" placeholder="产品名称">
      </div>
      <div class="field"><label>主题</label>
        <input id="emailSubject"></div>
      <div class="field"><label>正文</label>
        <textarea id="emailBody" rows="14" style="min-height:280px;font-family:ui-monospace,Consolas,monospace;"></textarea></div>
    </div>
    <div class="info-box" style="margin-top:10px;">
      📋 编辑完成后点击"复制内容"，到邮件客户端粘贴。或点"打开邮件客户端"用本地客户端发送。
    </div>
  `, `<button class="btn" onclick="closeModal()">关闭</button>
      <button class="btn" onclick="copyEmail()">📋 复制内容</button>
      <button class="btn btn-primary" onclick="openMailto('${customerId}')">✉ 打开邮件客户端</button>`, 'lg');
}

function applyTemplate(customerId) {
  const tplId = document.getElementById('tplSelect').value;
  if (!tplId) return;
  const t = DB.templates.find(x => x.id === tplId);
  const c = customerById(customerId);
  const product = document.getElementById('emailProduct').value || '[产品名称]';
  const vars = {
    contact: c.contact || '[联系人]',
    company: c.company || '',
    country: c.country || '',
    productName: product,
    orderNo: '[订单号]',
    date: todayStr(),
    myName: DB.meta.myName || '[您的名字]'
  };
  function replace(str) {
    return (str || '').replace(/\{\{(\w+)\}\}/g, (m, k) => vars[k] != null ? vars[k] : m);
  }
  document.getElementById('emailSubject').value = replace(t.subject);
  document.getElementById('emailBody').value = replace(t.body);
}

function copyEmail() {
  const subject = document.getElementById('emailSubject').value;
  const body = document.getElementById('emailBody').value;
  const text = '主题: ' + subject + '\n\n' + body;
  navigator.clipboard.writeText(text).then(() => toast('已复制到剪贴板', 'success'));
}

function openMailto(customerId) {
  const c = customerById(customerId);
  const subject = encodeURIComponent(document.getElementById('emailSubject').value);
  const body = encodeURIComponent(document.getElementById('emailBody').value);
  const to = encodeURIComponent(c.email || '');
  window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
}

/* ============================================================
 * 备份
 * ============================================================ */

function renderBackup() {
  document.getElementById('pageTitle').textContent = '数据备份';
  document.getElementById('topbarActions').innerHTML = '';
  setTabs('');

  const lastUpdate = DB.meta.updatedAt ? new Date(DB.meta.updatedAt).toLocaleString('zh-CN') : '从未';
  const sizeBytes = new Blob([JSON.stringify(DB)]).size;
  const sizeKB = (sizeBytes / 1024).toFixed(1);
  const sizeMB = (sizeBytes / 1024 / 1024).toFixed(2);

  document.getElementById('content').innerHTML = `
    <div class="warning-box">
      ⚠️ 重要：数据保存在浏览器本地存储中。请定期点击"导出 JSON 备份"保存文件。如果清除浏览器数据或换电脑，未导出的数据会丢失。
    </div>

    <div class="panel" style="margin-bottom:12px;">
      <div class="panel-header">数据概览</div>
      <div class="panel-body">
        <div class="detail-grid">
          <dt>客户</dt><dd>${DB.customers.length} 条</dd>
          <dt>询盘</dt><dd>${DB.leads.length} 条</dd>
          <dt>商机</dt><dd>${DB.opportunities.length} 条</dd>
          <dt>产品</dt><dd>${DB.products.length} 个 / ${DB.productCategories.length} 个分类</dd>
          <dt>报价单</dt><dd>${DB.quotations.length} 条</dd>
          <dt>样品</dt><dd>${DB.samples.length} 条</dd>
          <dt>订单</dt><dd>${DB.orders.length} 条</dd>
          <dt>跟进</dt><dd>${DB.followups.length} 条</dd>
          <dt>邮件模板</dt><dd>${DB.templates.length} 个</dd>
          <dt>最后更新</dt><dd>${lastUpdate}</dd>
          <dt>数据大小</dt><dd>${sizeMB} MB (${sizeKB} KB) ${sizeBytes > 4*1024*1024 ? ' <span class="tag tag-orange">接近浏览器存储上限</span>' : ''}</dd>
        </div>
      </div>
    </div>

    <div class="panel" style="margin-bottom:12px;">
      <div class="panel-header">导出备份</div>
      <div class="panel-body">
        <p class="muted" style="margin-bottom:10px;">建议每周导出一次。文件名自动加日期方便区分版本。</p>
        <button class="btn btn-primary" onclick="exportData()">↓ 导出 JSON 备份</button>
        <button class="btn" onclick="exportExcel()" style="margin-left:6px;">↓ 导出 Excel (CSV)</button>
      </div>
    </div>

    <div class="panel" style="margin-bottom:12px;">
      <div class="panel-header">⚙ 自动备份（推荐）</div>
      <div class="panel-body">
        ${(() => {
          const cfg = (DB.meta && DB.meta.autoBackup) || { enabled: false, intervalDays: 7, lastBackupAt: null };
          const lastStr = cfg.lastBackupAt ? new Date(cfg.lastBackupAt).toLocaleString('zh-CN') : '从未';
          return `
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px;">
                <input type="checkbox" ${cfg.enabled ? 'checked' : ''} onchange="toggleAutoBackup()">
                <strong>${cfg.enabled ? '✓ 已开启自动备份' : '开启自动备份'}</strong>
              </label>
              <span class="muted" style="font-size:11px;">上次备份：${lastStr}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
              <span style="font-size:12px;color:#4b5563;">频率：每</span>
              <select onchange="setAutoBackupInterval(this.value)" style="padding:4px 8px;border:1px solid #d1d5db;border-radius:3px;">
                <option value="1" ${cfg.intervalDays==1?'selected':''}>1</option>
                <option value="3" ${cfg.intervalDays==3?'selected':''}>3</option>
                <option value="7" ${cfg.intervalDays==7?'selected':''}>7</option>
                <option value="14" ${cfg.intervalDays==14?'selected':''}>14</option>
                <option value="30" ${cfg.intervalDays==30?'selected':''}>30</option>
              </select>
              <span style="font-size:12px;color:#4b5563;">天自动备份一次</span>
              <button class="btn btn-sm" onclick="doAutoBackup()" style="margin-left:10px;">立即备份一次</button>
            </div>
            <div class="info-box" style="font-size:12px;line-height:1.7;">
              <strong>使用步骤（一次性设置）：</strong><br>
              <strong>1.</strong> 开启上方"自动备份"复选框<br>
              <strong>2.</strong> 在浏览器里把"下载文件夹"改成 OneDrive 或百度网盘 的同步文件夹<br>
              　　・<strong>Chrome / Edge</strong>：右上角 ⋮ → 设置 → 下载 → 位置 → 更改 → 选 <code>OneDrive\\CRM备份</code> 或 <code>百度网盘\\我的应用数据\\CRM备份</code><br>
              　　・关闭"下载前询问每个文件保存位置"<br>
              <strong>3.</strong> 完成。以后每次打开本系统，超过设定天数会自动下载备份到云盘文件夹，自动同步上云。<br>
              <span style="color:#ef4444;">⚠ 不熟悉上述操作可以先选"立即备份一次"测试，看下载到哪个文件夹，确认那个文件夹是云盘同步范围。</span>
            </div>
          `;
        })()}
      </div>
    </div>

    <div class="panel" style="margin-bottom:12px;">
      <div class="panel-header">导入备份</div>
      <div class="panel-body">
        <p class="muted" style="margin-bottom:10px;">从 JSON 文件恢复。<strong style="color:#ef4444;">导入会覆盖当前所有数据！</strong></p>
        <input type="file" id="importFile" accept=".json" onchange="importData(event)" style="display:none;">
        <button class="btn" onclick="document.getElementById('importFile').click()">↑ 选择 JSON 文件导入</button>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">清空数据</div>
      <div class="panel-body">
        <p class="muted" style="margin-bottom:10px;">清空所有客户、产品、样品、订单等。<strong style="color:#ef4444;">请先导出备份！</strong></p>
        <button class="btn btn-danger" onclick="clearAllData()">⚠ 清空所有数据</button>
      </div>
    </div>
  `;
}

function checkAutoBackup() {
  const cfg = (DB.meta && DB.meta.autoBackup) || {};
  if (!cfg.enabled) return;
  const days = Number(cfg.intervalDays) || 7;
  const last = cfg.lastBackupAt ? new Date(cfg.lastBackupAt).getTime() : 0;
  const now = Date.now();
  const interval = days * 24 * 60 * 60 * 1000;
  if (now - last >= interval) {
    // 延迟 3 秒以免影响首屏
    setTimeout(() => doAutoBackup(), 3000);
  }
}

function doAutoBackup() {
  try {
    const data = JSON.stringify(DB, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '外贸CRM_自动备份_' + todayStr() + '.json';
    a.click();
    URL.revokeObjectURL(url);
    DB.meta.autoBackup.lastBackupAt = new Date().toISOString();
    saveDB();
    toast('已自动备份数据', 'success');
  } catch (e) {
    console.warn('自动备份失败', e);
  }
}

function toggleAutoBackup() {
  if (!DB.meta.autoBackup) DB.meta.autoBackup = { enabled: false, intervalDays: 7, lastBackupAt: null };
  DB.meta.autoBackup.enabled = !DB.meta.autoBackup.enabled;
  saveDB();
  renderBackup();
  if (DB.meta.autoBackup.enabled) toast('自动备份已开启', 'success');
  else toast('自动备份已关闭');
}

function setAutoBackupInterval(days) {
  if (!DB.meta.autoBackup) DB.meta.autoBackup = { enabled: false, intervalDays: 7, lastBackupAt: null };
  DB.meta.autoBackup.intervalDays = Number(days) || 7;
  saveDB();
  toast('已设置备份频率：每 ' + days + ' 天', 'success');
}

function exportData() {
  const data = JSON.stringify(DB, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '外贸CRM_备份_' + todayStr() + '.json';
  a.click();
  URL.revokeObjectURL(url);
  toast('已导出备份', 'success');
}

function exportCustomersCSV() {
  const rows = DB.customers.map(c => ({
    客户编号: c.code, 公司名称: c.company, 状态: c.status, 等级: c.rating,
    联系人: c.contact, 国家: c.country, 邮箱: c.email, 电话: c.phone,
    WhatsApp: c.whatsapp, 来源: c.source, 标签: (c.tags||[]).join('; '), 备注: c.notes
  }));
  downloadCSV(rows, '客户');
}

function exportExcel() {
  const sheets = {
    '客户': DB.customers.map(c => ({
      编号: c.code, 公司: c.company, 状态: c.status, 等级: c.rating,
      联系人: c.contact, 国家: c.country, 邮箱: c.email, 电话: c.phone,
      WhatsApp: c.whatsapp, 来源: c.source, 标签: (c.tags||[]).join('; '), 备注: c.notes
    })),
    '产品': DB.products.map(p => ({
      编号: p.code, 英文名: p.nameEn, 中文名: p.nameZh, 分类: p.category,
      销售价: p.price, 币种: p.currency, 规格: p.specs,
      工厂名: p.factoryName || '', 采购价不含税: p.purchasePriceNoTax || '', 采购价含税: p.purchasePriceWithTax || '',
      中文包装: p.packingZh || p.packing || '', 英文包装: p.packingEn || '',
      中文描述: p.descriptionZh || p.description || '', 英文描述: p.descriptionEn || ''
    })),
    '样品': DB.samples.map(s => ({
      编号: s.sampleNo, 客户: customerLookup(s.customerId), 产品: s.productName,
      规格: s.specs, 寄出日期: s.sentDate, 快递: s.trackingNo, 状态: s.status, 反馈: s.feedback
    })),
    '订单': DB.orders.map(o => ({
      订单号: o.orderNo, 客户: customerLookup(o.customerId), 下单: o.orderDate, 交期: o.deliveryDate,
      金额: o.amount, 币种: o.currency, 付款: o.paymentStatus, 生产: o.productionStatus,
      明细: o.items, 备注: o.notes
    })),
    '出货单': (() => {
      const out = [];
      (DB.shipments || []).forEach(s => {
        (s.items || []).forEach(it => {
          const p = productById(it.productId);
          const r = calcShipmentItem(it);
          out.push({
            出货单号: s.code, 出货日期: s.date, 客户: customerLookup(s.customerId),
            关联订单: s.orderNo || '', 目的港: s.port || '', 状态: s.status,
            产品编号: p ? (p.code || '') : '[已删除]',
            品名: p ? (p.nameEn || p.nameZh || '') : '',
            数量: it.qty, 装箱数: p ? (p.qtyPerCarton || '') : '',
            箱数: r.valid ? r.totalCartons : '',
            单箱CBM: p && hasPackingInfo(p) ? calcCartonCBM(p).toFixed(4) : '',
            总CBM: r.valid ? r.cbm.toFixed(4) : '',
            总毛重kg: r.valid ? r.gross.toFixed(1) : '',
            尾箱模式: it.tailMode === 'pro-rata' ? '按比例' : '按整箱'
          });
        });
      });
      return out;
    })(),
    '跟进': DB.followups.map(f => ({
      日期: f.date, 客户: customerLookup(f.customerId), 方式: f.channel,
      内容: htmlToText(f.content), 下一步: f.nextAction, 提醒日期: f.reminderDate, 已处理: f.done ? '是' : '否'
    })),
    '商机': DB.opportunities.map(o => ({
      标题: o.title, 客户: customerLookup(o.customerId),
      预计金额: o.expectedAmount, 币种: o.currency, 阶段: o.stage,
      概率: o.probability, 预计成交: o.expectedCloseDate, 下一步: o.nextStep
    })),
    '报价单': DB.quotations.map(q => ({
      编号: q.code, 日期: q.date, 客户: customerLookup(q.customerId),
      币种: q.currency, 总金额: q.totalAmount, 状态: q.status, 有效期: q.validUntil,
      项数: (q.items||[]).length, 付款方式: q.paymentTerms, 交货期: q.leadTime
    })),
    '询盘': DB.leads.map(l => ({
      日期: l.date, 来源: l.source, 询盘人: l.buyerName, 公司: l.company,
      国家: l.country, 邮箱: l.email, 询盘内容: l.message, 状态: l.status
    })),
  };
  Object.entries(sheets).forEach(([name, rows]) => {
    if (rows.length === 0) return;
    downloadCSV(rows, name);
  });
  toast('已导出 CSV 文件', 'success');
}

function customerLookup(id) {
  const c = customerById(id);
  return c ? c.company : '[已删除]';
}

function downloadCSV(rows, name) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const escape = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const csv = '﻿' + headers.join(',') + '\n' +
    rows.map(r => headers.map(h => escape(r[h])).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '外贸CRM_' + name + '_' + todayStr() + '.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (!confirm('导入会覆盖当前所有数据，确定继续？建议先导出当前数据备份。')) {
    e.target.value = ''; return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (!data.customers || !Array.isArray(data.customers)) throw new Error('文件格式不正确');
      DB = Object.assign({
        customers: [], leads: [], opportunities: [], products: [],
        productCategories: [], quotations: [], samples: [], orders: [],
        shipments: [], followups: [], templates: [],
        meta: { version: 2, updatedAt: null, counters: {}, myName: '', tags: [] }
      }, data);
      DB.shipments = DB.shipments || [];
      DB.meta = DB.meta || {};
      DB.meta.counters = DB.meta.counters || {};
      DB.meta.tags = DB.meta.tags || [];
      saveDB();
      renderNav();
      render();
      toast('导入成功！共 ' + DB.customers.length + ' 个客户', 'success');
    } catch (err) {
      toast('导入失败：' + err.message, 'error');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function clearAllData() {
  if (!confirm('⚠ 警告：将永久删除所有数据！')) return;
  if (!confirm('再次确认：真的要清空所有数据吗？此操作不可恢复！')) return;
  DB = {
    customers: [], leads: [], opportunities: [], products: [],
    productCategories: [], quotations: [], samples: [], orders: [],
    shipments: [], followups: [],
    templates: DEFAULT_TEMPLATES.map(t => ({ ...t, id: uid() })),
    meta: { version: 2, updatedAt: null, counters: {}, myName: '', tags: [] }
  };
  saveDB();
  renderNav();
  render();
  toast('已清空所有数据', 'success');
}

/* ============================================================
 * 启动
 * ============================================================ */

// === 产品选择弹窗 V2 - 分类树 + 多选 + 表格 ===

let _pickerSelectedIds = new Set();
let _pickerCategoryFilter = '';
let _pickerMode = null;  // 'sample-add' | 'order-add' | 'shipment-replace' | 'sample-replace' | 'order-replace'
let _pickerTargetItemId = null;  // 用于 replace 模式

// 统一的打开入口
function openProductPickerV2(mode, options) {
  if (DB.products.length === 0) { toast('请先添加产品', 'error'); return; }
  _pickerMode = mode;
  _pickerTargetItemId = (options && options.itemId) || null;
  _pickerSelectedIds = new Set();
  _pickerCategoryFilter = '';
  const search = document.getElementById('productPickerSearch');
  if (search) search.value = '';
  // 用 V2 渲染替换 picker 内部
  renderProductPickerV2Body();
  document.getElementById('productPickerMask').classList.add('show');
  setTimeout(() => { try { search.focus(); } catch (e) {} }, 80);
}

function renderProductPickerV2Body() {
  const isReplace = _pickerMode && _pickerMode.endsWith('-replace');
  const body = document.getElementById('productPickerBody');
  if (!body) return;

  // 分类列表（含全部 / 各分类 / 未分类）
  const noneCount = DB.products.filter(p => !p.category).length;
  const cats = [
    { key: '', name: '全部', count: DB.products.length },
    ...DB.productCategories.map(c => ({
      key: c, name: c, count: DB.products.filter(p => p.category === c).length
    })),
    ...(noneCount > 0 ? [{ key: '__none', name: '未分类', count: noneCount }] : [])
  ];

  // 过滤产品
  const kw = ((document.getElementById('productPickerSearch') || {}).value || '').toLowerCase();
  let list = DB.products;
  if (_pickerCategoryFilter === '__none') list = list.filter(p => !p.category);
  else if (_pickerCategoryFilter) list = list.filter(p => p.category === _pickerCategoryFilter);
  if (kw) list = list.filter(p =>
    (p.code || '').toLowerCase().includes(kw) ||
    (p.nameEn || '').toLowerCase().includes(kw) ||
    (p.nameZh || '').toLowerCase().includes(kw)
  );

  body.innerHTML = `
    <div style="display:flex;flex:1;min-height:0;overflow:hidden;">
      <div style="width:200px;border-right:1px solid #e5e7eb;background:#fafbfc;overflow-y:auto;">
        ${cats.map(c => `
          <div class="ppk-cat ${_pickerCategoryFilter === c.key ? 'active' : ''}"
               onclick="_pickerCategoryFilter='${c.key}';renderProductPickerV2Body()">
            📁 ${escapeHtml(c.name)} <span class="muted" style="font-size:11px;">(${c.count})</span>
          </div>
        `).join('')}
      </div>
      <div style="flex:1;overflow-y:auto;display:flex;flex-direction:column;">
        ${list.length === 0 ? '<div class="product-picker-empty">无匹配产品</div>' : `
        <table style="width:100%;">
          <thead><tr style="background:#f8fafb;position:sticky;top:0;z-index:1;">
            ${isReplace ? '' : '<th style="width:32px;"><input type="checkbox" id="ppkSelectAll" onchange="pickerToggleAll(this.checked)"></th>'}
            <th style="width:50px;">图</th>
            <th>编码</th>
            <th>中文名</th>
            <th>英文名</th>
            <th>规格</th>
            <th class="text-right">价格</th>
          </tr></thead>
          <tbody>
          ${list.map(p => {
            const checked = _pickerSelectedIds.has(p.id);
            const rowClick = isReplace
              ? `onclick="pickerReplaceConfirm('${p.id}')"`
              : `onclick="pickerToggleProduct('${p.id}', !${checked})"`;
            return `<tr style="cursor:pointer;${checked ? 'background:#eff6ff;' : ''}" ${rowClick}>
              ${isReplace ? '' : `<td onclick="event.stopPropagation()"><input type="checkbox" ${checked ? 'checked' : ''} onchange="pickerToggleProduct('${p.id}', this.checked)"></td>`}
              <td>${p.image ? `<img src="${imgUrl(p.image)}" style="width:40px;height:40px;object-fit:contain;background:#f9fafb;border-radius:3px;">` : '<div style="width:40px;height:40px;background:#f3f4f6;border-radius:3px;"></div>'}</td>
              <td class="code">${escapeHtml(p.code || '-')}</td>
              <td>${escapeHtml(p.nameZh || '-')}</td>
              <td class="muted">${escapeHtml(p.nameEn || '-')}</td>
              <td class="muted" style="font-size:11px;">${escapeHtml(p.specs || '-')}</td>
              <td class="text-right">${p.price ? (p.currency || '') + ' ' + p.price : '-'}</td>
            </tr>`;
          }).join('')}
          </tbody>
        </table>`}
      </div>
    </div>
    ${isReplace ? '' : `
    <div style="border-top:1px solid #e5e7eb;padding:10px 14px;background:#fafbfc;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;">
      <span class="muted">已选 <strong style="color:#1e40af;">${_pickerSelectedIds.size}</strong> 个产品</span>
      <div>
        <button class="btn" onclick="closeProductPicker()">取消</button>
        <button class="btn btn-primary" onclick="pickerConfirmAddAll()">确定添加</button>
      </div>
    </div>`}
  `;
}

function pickerToggleProduct(pid, checked) {
  if (checked) _pickerSelectedIds.add(pid);
  else _pickerSelectedIds.delete(pid);
  renderProductPickerV2Body();
}

function pickerToggleAll(checked) {
  // 仅作用于当前可见列表
  const kw = ((document.getElementById('productPickerSearch') || {}).value || '').toLowerCase();
  let list = DB.products;
  if (_pickerCategoryFilter === '__none') list = list.filter(p => !p.category);
  else if (_pickerCategoryFilter) list = list.filter(p => p.category === _pickerCategoryFilter);
  if (kw) list = list.filter(p =>
    (p.code || '').toLowerCase().includes(kw) ||
    (p.nameEn || '').toLowerCase().includes(kw) ||
    (p.nameZh || '').toLowerCase().includes(kw)
  );
  if (checked) list.forEach(p => _pickerSelectedIds.add(p.id));
  else list.forEach(p => _pickerSelectedIds.delete(p.id));
  renderProductPickerV2Body();
}

function pickerConfirmAddAll() {
  if (_pickerSelectedIds.size === 0) { toast('请至少勾选一个产品', 'error'); return; }
  const pids = [..._pickerSelectedIds];

  if (_pickerMode === 'sample-add') {
    pids.forEach(pid => {
      const p = productById(pid);
      const it = {
        id: uid(),
        productId: pid,
        productName: (p && (p.nameEn || p.nameZh)) || '',
        specs: (p && p.specs) || '',
        productCraft: '',
        qty: 1,
        factoryPrice: '',
        clientPrice: '',
      };
      _editingSample.items.push(it);
    });
    // 重渲染整个 items 容器
    const wrap = document.getElementById('sampleItems');
    if (wrap) wrap.innerHTML = _editingSample.items.map(it => sampleItemHtml(it)).join('');
    refreshSampleTotal();
  } else if (_pickerMode === 'order-add') {
    pids.forEach(pid => {
      const p = productById(pid);
      const it = {
        id: uid(),
        productId: pid,
        productName: (p && (p.nameEn || p.nameZh)) || '',
        specs: (p && p.specs) || '',
        descriptionZh: (p && (p.descriptionZh || p.description)) || '',
        descriptionEn: (p && p.descriptionEn) || '',
        packingZh: (p && (p.packingZh || p.packing)) || '',
        packingEn: (p && p.packingEn) || '',
        qty: 1,
        unitPrice: (p && p.price) || '',
      };
      _editingOrder.items.push(it);
    });
    const wrap = document.getElementById('orderItems');
    if (wrap) wrap.innerHTML = _editingOrder.items.map(it => orderItemHtml(it)).join('');
    refreshOrderTotal();
  } else if (_pickerMode === 'shipment-add') {
    pids.forEach(pid => {
      const it = { id: uid(), productId: pid, qty: '', tailMode: 'whole' };
      _editingShipment.items.push(it);
    });
    const wrap = document.getElementById('shipItems');
    if (wrap) wrap.innerHTML = _editingShipment.items.map(it => shipmentItemHtml(it)).join('');
    refreshShipmentTotal();
  }

  closeProductPicker();
  toast('已添加 ' + pids.length + ' 个产品', 'success');
}

function pickerReplaceConfirm(pid) {
  if (!_pickerTargetItemId) { closeProductPicker(); return; }
  const p = productById(pid);
  if (!p) return;
  if (_pickerMode === 'sample-replace') {
    const it = _editingSample.items.find(x => x.id === _pickerTargetItemId);
    if (it) {
      it.productId = pid;
      if (!it.productName) it.productName = p.nameEn || p.nameZh || '';
      if (!it.specs) it.specs = p.specs || '';
      const el = document.querySelector('[data-sample-item="' + _pickerTargetItemId + '"]');
      if (el) el.outerHTML = sampleItemHtml(it);
      refreshSampleTotal();
    }
  } else if (_pickerMode === 'order-replace') {
    const it = _editingOrder.items.find(x => x.id === _pickerTargetItemId);
    if (it) {
      it.productId = pid;
      if (!it.productName) it.productName = p.nameEn || p.nameZh || '';
      if (!it.specs) it.specs = p.specs || '';
      if (!it.descriptionZh) it.descriptionZh = p.descriptionZh || p.description || '';
      if (!it.descriptionEn) it.descriptionEn = p.descriptionEn || '';
      if (!it.packingZh) it.packingZh = p.packingZh || p.packing || '';
      if (!it.packingEn) it.packingEn = p.packingEn || '';
      if (!it.unitPrice && p.price) it.unitPrice = p.price;
      const el = document.querySelector('[data-order-item="' + _pickerTargetItemId + '"]');
      if (el) el.outerHTML = orderItemHtml(it);
      refreshOrderTotal();
    }
  } else if (_pickerMode === 'shipment-replace') {
    const it = _editingShipment.items.find(x => x.id === _pickerTargetItemId);
    if (it) {
      it.productId = pid;
      const el = document.querySelector('[data-ship-item="' + _pickerTargetItemId + '"]');
      if (el) el.outerHTML = shipmentItemHtml(it);
      refreshShipmentTotal();
    }
  }
  closeProductPicker();
}

// ============ 兼容旧入口 ============
function addSampleItem() {
  if (!_editingSample) return;
  openProductPickerV2('sample-add');
}

function openSampleItemPicker(itemId) {
  openProductPickerV2('sample-replace', { itemId });
}

function addOrderItem() {
  if (!_editingOrder) return;
  openProductPickerV2('order-add');
}

function openOrderItemPicker(itemId) {
  openProductPickerV2('order-replace', { itemId });
}

function addShipmentItem() {
  if (!_editingShipment) return;
  openProductPickerV2('shipment-add');
}

function openProductPicker(itemId) {
  // 出货单旧入口 → 改为 replace 模式
  openProductPickerV2('shipment-replace', { itemId });
}

// 旧的 close 函数兼容
function closeProductPicker() {
  document.getElementById('productPickerMask').classList.remove('show');
  _pickerSelectedIds = new Set();
  _pickerMode = null;
  _pickerTargetItemId = null;
}

(async () => {
  loadDB();
  try { await preloadAllImages(); } catch(e) { console.warn('preload failed', e); }
  // 第一次跑迁移
  try {
    if (DB.meta && !DB.meta.imageMigrationV1Done) {
      console.log('开始迁移图片到 IndexedDB...');
      await migrateAllImagesToIndexedDB();
      await preloadAllImages();  // 重新加载新存的图
    }
  } catch(e) { console.warn('migrate failed', e); }
  renderNav();
  render();
  checkAutoBackup();
})();

window.addEventListener('beforeunload', saveDB);
