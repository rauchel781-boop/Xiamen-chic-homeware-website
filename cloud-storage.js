// ============================================================
// 云端存储抽象层 — Supabase 封装
// ============================================================

let cloudClient = null;     // Supabase client（避免和 window.supabase 重名）
let currentUser = null;     // 当前登录用户

// 生成标准 UUID v4（用作云端表的 id）
function cloudUid() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }
  // 降级：手工生成 UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function isUuid(s) {
  return typeof s === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
}

// 初始化
function cloudInit() {
  if (typeof window.supabase === 'undefined' || !window.supabase.createClient) {
    console.error('Supabase SDK 未加载');
    return false;
  }
  if (typeof SUPABASE_CONFIG === 'undefined' || !SUPABASE_CONFIG.url || !SUPABASE_CONFIG.key) {
    console.error('Supabase 配置缺失');
    return false;
  }
  cloudClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
  return true;
}

// 获取当前 session
async function cloudGetSession() {
  if (!cloudClient) return null;
  try {
    const { data: { session } } = await cloudClient.auth.getSession();
    if (session && session.user) {
      currentUser = session.user;
      return session.user;
    }
  } catch (e) { console.warn('getSession failed', e); }
  return null;
}

// 登录
async function cloudLogin(email, password) {
  if (!cloudClient) throw new Error('Supabase 未初始化');
  const { data, error } = await cloudClient.auth.signInWithPassword({ email, password });
  if (error) throw error;
  currentUser = data.user;
  return data.user;
}

// 登出
async function cloudLogout() {
  if (!cloudClient) return;
  await cloudClient.auth.signOut();
  currentUser = null;
}

// ============================================================
// 客户 CRUD
// ============================================================
function customerToDb(c) {
  // 保证 id 是 UUID
  if (!isUuid(c.id)) c.id = cloudUid();
  return {
    id: c.id,
    code: c.code || null,
    company: c.company,
    contact: c.contact || null,
    country: c.country || null,
    email: c.email || null,
    phone: c.phone || null,
    address: c.address || null,
    status: c.status || null,
    grade: c.grade || null,
    source: c.source || null,
    notes: c.notes || null,
    dossier: c.dossier || null,
    data: extraCustomerFields(c),
    updated_at: new Date().toISOString(),
  };
}

function extraCustomerFields(c) {
  const known = ['id','code','company','contact','country','email','phone','address',
                 'status','grade','source','notes','dossier','createdAt','updated_at'];
  const extra = {};
  for (const k in c) {
    if (!known.includes(k)) extra[k] = c[k];
  }
  return Object.keys(extra).length > 0 ? extra : null;
}

function customerFromDb(row) {
  const c = {
    id: row.id,
    code: row.code || '',
    company: row.company || '',
    contact: row.contact || '',
    country: row.country || '',
    email: row.email || '',
    phone: row.phone || '',
    address: row.address || '',
    status: row.status || '',
    grade: row.grade || '',
    source: row.source || '',
    notes: row.notes || '',
    dossier: row.dossier || [],
    createdAt: row.created_at,
  };
  if (row.data && typeof row.data === 'object') {
    for (const k in row.data) c[k] = row.data[k];
  }
  return c;
}

async function cloudListCustomers() {
  if (!cloudClient) throw new Error('Supabase 未初始化');
  const { data, error } = await cloudClient.from('customers').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map(customerFromDb);
}

async function cloudUpsertCustomer(c) {
  if (!cloudClient) throw new Error('Supabase 未初始化');
  const row = customerToDb(c);
  const { data, error } = await cloudClient.from('customers').upsert(row).select().single();
  if (error) throw error;
  return customerFromDb(data);
}

async function cloudDeleteCustomer(id) {
  if (!cloudClient) throw new Error('Supabase 未初始化');
  const { error } = await cloudClient.from('customers').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// 把本地 DB.customers 迁移到云端（第一次切到云版时用）
async function cloudMigrateLocalCustomers(localCustomers) {
  if (!cloudClient) throw new Error('Supabase 未初始化');
  if (!Array.isArray(localCustomers) || localCustomers.length === 0) return { migrated: 0 };
  let migrated = 0;
  const failed = [];
  for (const c of localCustomers) {
    try {
      // 确保有 UUID
      if (!isUuid(c.id)) c.id = cloudUid();
      const row = customerToDb(c);
      const { error } = await cloudClient.from('customers').upsert(row);
      if (error) { failed.push(c.company + ': ' + error.message); }
      else migrated++;
    } catch (e) { failed.push(c.company + ': ' + e.message); }
  }
  return { migrated, failed };
}

// ============================================================
// 实时订阅
// ============================================================
let customerSubscription = null;
function cloudSubscribeCustomers(onChange) {
  if (!cloudClient) return;
  if (customerSubscription) cloudClient.removeChannel(customerSubscription);
  customerSubscription = cloudClient
    .channel('customers-realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'customers' }, payload => {
      onChange && onChange(payload);
    })
    .subscribe();
}

// ============================================================
// 日程 (Tasks) CRUD
// ============================================================
function taskToDb(t) {
  if (!isUuid(t.id)) t.id = cloudUid();
  return {
    id: t.id,
    date: t.date || null,
    customer_id: isUuid(t.customerId) ? t.customerId : null,
    customer_name: t.customerName || null,
    content: t.content || '',
    done: !!t.done,
    done_at: t.doneAt || null,
    source: t.source || null,
    data: null,
  };
}

function taskFromDb(row) {
  return {
    id: row.id,
    date: row.date || '',
    customerId: row.customer_id || '',
    customerName: row.customer_name || '',
    content: row.content || '',
    done: !!row.done,
    doneAt: row.done_at || null,
    source: row.source || '',
    createdAt: row.created_at,
  };
}

async function cloudListTasks() {
  if (!cloudClient) throw new Error('Supabase 未初始化');
  const { data, error } = await cloudClient.from('tasks').select('*').order('date', { ascending: false });
  if (error) throw error;
  return (data || []).map(taskFromDb);
}

async function cloudUpsertTask(t) {
  if (!cloudClient) throw new Error('Supabase 未初始化');
  const row = taskToDb(t);
  const { data, error } = await cloudClient.from('tasks').upsert(row).select().single();
  if (error) throw error;
  return taskFromDb(data);
}

async function cloudDeleteTask(id) {
  if (!cloudClient) throw new Error('Supabase 未初始化');
  const { error } = await cloudClient.from('tasks').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// ============================================================
// 通用 JSONB 模块：把整个对象塞 data 列，简单做法
// ============================================================
function genericToDb(obj, idField, fields) {
  if (!isUuid(obj[idField])) obj[idField] = cloudUid();
  const row = { id: obj[idField], data: { ...obj } };
  delete row.data[idField];
  for (const [col, key] of Object.entries(fields || {})) {
    let v = obj[key];
    if (v === '' || v === undefined) v = null;
    row[col] = v;
  }
  return row;
}

function genericFromDb(row, idField, fields) {
  const o = { ...(row.data || {}) };
  o[idField] = row.id;
  for (const [col, key] of Object.entries(fields || {})) {
    if (row[col] !== null && row[col] !== undefined) o[key] = row[col];
  }
  if (row.created_at) o.createdAt = row.created_at;
  return o;
}

async function cloudList(table, orderCol) {
  if (!cloudClient) throw new Error('Supabase 未初始化');
  let q = cloudClient.from(table).select('*');
  if (orderCol) q = q.order(orderCol, { ascending: false });
  const { data, error } = await q;
  if (error) throw error;
  return data || [];
}

async function cloudUpsert(table, row) {
  if (!cloudClient) throw new Error('Supabase 未初始化');
  const { data, error } = await cloudClient.from(table).upsert(row).select().single();
  if (error) throw error;
  return data;
}

async function cloudDelete(table, id) {
  if (!cloudClient) throw new Error('Supabase 未初始化');
  const { error } = await cloudClient.from(table).delete().eq('id', id);
  if (error) throw error;
  return true;
}

// ============================================================
// 各表的 toDb / fromDb 配置
// 把数据库列名（snake_case）映射到 JS 属性名（camelCase）
// ============================================================
const SAMPLE_FIELDS = {
  code: 'code', customer_id: 'customerId', order_date: 'orderDate',
  sent_date: 'sentDate', tracking_no: 'trackingNo', status: 'status',
  feedback: 'feedback', currency: 'currency', production_time: 'productionTime',
  items: 'items', notes: 'notes',
};
function sampleToDb(s) {
  const r = genericToDb(s, 'id', SAMPLE_FIELDS);
  if (!isUuid(r.customer_id)) r.customer_id = null;
  return r;
}
function sampleFromDb(row) { return genericFromDb(row, 'id', SAMPLE_FIELDS); }
async function cloudListSamples() {
  return (await cloudList('samples', 'created_at')).map(sampleFromDb);
}
async function cloudUpsertSample(s) { return sampleFromDb(await cloudUpsert('samples', sampleToDb(s))); }
async function cloudDeleteSample(id) { return await cloudDelete('samples', id); }

const ORDER_FIELDS = {
  order_no: 'orderNo', customer_id: 'customerId', order_date: 'orderDate',
  delivery_date: 'deliveryDate', currency: 'currency',
  payment_status: 'paymentStatus', production_status: 'productionStatus',
  payment_terms: 'paymentTerms', production_time: 'productionTime',
  incoterms: 'incoterms', destination_port: 'destinationPort',
  marks: 'marks', extra_fee_label: 'extraFeeLabel', extra_fee_amount: 'extraFeeAmount',
  amount: 'amount', items: 'items', notes: 'notes',
};
function orderToDb(o) {
  const r = genericToDb(o, 'id', ORDER_FIELDS);
  if (!isUuid(r.customer_id)) r.customer_id = null;
  return r;
}
function orderFromDb(row) { return genericFromDb(row, 'id', ORDER_FIELDS); }
async function cloudListOrders() { return (await cloudList('orders', 'created_at')).map(orderFromDb); }
async function cloudUpsertOrder(o) { return orderFromDb(await cloudUpsert('orders', orderToDb(o))); }
async function cloudDeleteOrder(id) { return await cloudDelete('orders', id); }

const QUOTATION_FIELDS = {
  code: 'code', customer_id: 'customerId', date: 'date', currency: 'currency',
  valid_until: 'validUntil', payment_terms: 'paymentTerms', lead_time: 'leadTime',
  trade_terms: 'tradeTerms', total_amount: 'totalAmount',
  extra_fee_label: 'extraFeeLabel', extra_fee_amount: 'extraFeeAmount',
  items: 'items', notes: 'notes',
};
function quotationToDb(q) {
  const r = genericToDb(q, 'id', QUOTATION_FIELDS);
  if (!isUuid(r.customer_id)) r.customer_id = null;
  return r;
}
function quotationFromDb(row) { return genericFromDb(row, 'id', QUOTATION_FIELDS); }
async function cloudListQuotations() { return (await cloudList('quotations', 'created_at')).map(quotationFromDb); }
async function cloudUpsertQuotation(q) { return quotationFromDb(await cloudUpsert('quotations', quotationToDb(q))); }
async function cloudDeleteQuotation(id) { return await cloudDelete('quotations', id); }

const PURCHASE_FIELDS = {
  code: 'code', factory_name: 'factoryName', date: 'date',
  expected_date: 'expectedDate', actual_date: 'actualDate', status: 'status',
  payment_terms: 'paymentTerms', items: 'items', notes: 'notes',
};
function purchaseToDb(p) { return genericToDb(p, 'id', PURCHASE_FIELDS); }
function purchaseFromDb(row) { return genericFromDb(row, 'id', PURCHASE_FIELDS); }
async function cloudListPurchases() { return (await cloudList('purchases', 'created_at')).map(purchaseFromDb); }
async function cloudUpsertPurchase(p) { return purchaseFromDb(await cloudUpsert('purchases', purchaseToDb(p))); }
async function cloudDeletePurchase(id) { return await cloudDelete('purchases', id); }

const PAYMENT_FIELDS = {
  code: 'code', type: 'type', date: 'date', amount: 'amount',
  fee_amount: 'feeAmount', net_amount: 'netAmount', currency: 'currency',
  method: 'method', counterparty: 'counterparty',
  related_type: 'relatedType', related_no: 'relatedNo',
  category: 'category', voucher_image: 'voucherImage', notes: 'notes',
};
function paymentToDb(p) {
  const r = genericToDb(p, 'id', PAYMENT_FIELDS);
  // related_id 不存（用 relatedNo 软关联即可）
  return r;
}
function paymentFromDb(row) { return genericFromDb(row, 'id', PAYMENT_FIELDS); }
async function cloudListPayments() { return (await cloudList('payments', 'date')).map(paymentFromDb); }
async function cloudUpsertPayment(p) { return paymentFromDb(await cloudUpsert('payments', paymentToDb(p))); }
async function cloudDeletePayment(id) { return await cloudDelete('payments', id); }

const SHIPMENT_FIELDS = {
  code: 'code', customer_id: 'customerId', order_id: 'orderId',
  ship_date: 'shipDate', status: 'status', items: 'items',
};
function shipmentToDb(s) {
  const r = genericToDb(s, 'id', SHIPMENT_FIELDS);
  if (!isUuid(r.customer_id)) r.customer_id = null;
  if (!isUuid(r.order_id)) r.order_id = null;
  return r;
}
function shipmentFromDb(row) { return genericFromDb(row, 'id', SHIPMENT_FIELDS); }
async function cloudListShipments() { return (await cloudList('shipments', 'created_at')).map(shipmentFromDb); }
async function cloudUpsertShipment(s) { return shipmentFromDb(await cloudUpsert('shipments', shipmentToDb(s))); }
async function cloudDeleteShipment(id) { return await cloudDelete('shipments', id); }

const PRODUCT_FIELDS = {
  code: 'code', name_en: 'nameEn', name_zh: 'nameZh', category: 'category',
  price: 'price', currency: 'currency', specs: 'specs',
  description_zh: 'descriptionZh', description_en: 'descriptionEn',
  packing_zh: 'packingZh', packing_en: 'packingEn',
  factory_name: 'factoryName',
  purchase_price_no_tax: 'purchasePriceNoTax', purchase_price_with_tax: 'purchasePriceWithTax',
  qty_per_carton: 'qtyPerCarton',
  carton_length: 'cartonLength', carton_width: 'cartonWidth', carton_height: 'cartonHeight',
  carton_gross_weight: 'cartonGrossWeight', carton_net_weight: 'cartonNetWeight',
  image: 'image',
};
function productToDb(p) { return genericToDb(p, 'id', PRODUCT_FIELDS); }
function productFromDb(row) { return genericFromDb(row, 'id', PRODUCT_FIELDS); }
async function cloudListProducts() { return (await cloudList('products', 'created_at')).map(productFromDb); }
async function cloudUpsertProduct(p) { return productFromDb(await cloudUpsert('products', productToDb(p))); }
async function cloudDeleteProduct(id) { return await cloudDelete('products', id); }

// ============================================================
// 图片：上传到 Supabase Storage
// 输入 base64 dataUrl，返回公开 URL
// ============================================================
async function cloudUploadImage(dataUrl, filename) {
  if (!cloudClient) throw new Error('Supabase 未初始化');
  if (!dataUrl || !dataUrl.startsWith('data:image/')) return dataUrl;
  const m = dataUrl.match(/^data:(image\/[^;]+);base64,(.+)$/);
  if (!m) return dataUrl;
  const mime = m[1];
  const b64 = m[2];
  const ext = mime.split('/')[1] || 'png';
  const path = (filename || 'img-' + cloudUid()) + '.' + ext;
  // base64 → Uint8Array
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const { error } = await cloudClient.storage.from('images').upload(path, bytes, {
    contentType: mime,
    upsert: true,
  });
  if (error) throw error;
  // 拿公开 URL
  const { data } = cloudClient.storage.from('images').getPublicUrl(path);
  return data.publicUrl;
}
