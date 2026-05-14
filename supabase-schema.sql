-- ====================================================================
-- 外贸 CRM 云端数据库 Schema
-- 把这整个文件粘贴到 Supabase SQL Editor 一键执行
-- ====================================================================
-- 使用方法：
-- 1. 进入 Supabase Dashboard → 左侧 SQL Editor
-- 2. 点 + New query
-- 3. 把这个文件全部复制粘贴进去
-- 4. 点右下角 Run（或 Ctrl+Enter）
-- 5. 看到 "Success. No rows returned" 就成功
-- ====================================================================

-- 启用 UUID 生成
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================
-- 客户表
-- =========================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT,
  company TEXT NOT NULL,
  contact TEXT,
  country TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  status TEXT,
  grade TEXT,
  source TEXT,
  notes TEXT,
  dossier JSONB,
  data JSONB,  -- 兜底字段：放其他不规则数据
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- 产品表
-- =========================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT,
  name_en TEXT,
  name_zh TEXT,
  category TEXT,
  price NUMERIC,
  currency TEXT,
  specs TEXT,
  description_zh TEXT,
  description_en TEXT,
  packing_zh TEXT,
  packing_en TEXT,
  factory_name TEXT,
  purchase_price_no_tax NUMERIC,
  purchase_price_with_tax NUMERIC,
  qty_per_carton INTEGER,
  carton_length NUMERIC,
  carton_width NUMERIC,
  carton_height NUMERIC,
  carton_gross_weight NUMERIC,
  carton_net_weight NUMERIC,
  image TEXT,  -- 图片 URL 或 Supabase Storage path
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- 报价单（含阶梯价格、附加费）
-- =========================
CREATE TABLE IF NOT EXISTS quotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  date DATE,
  currency TEXT,
  valid_until DATE,
  payment_terms TEXT,
  lead_time TEXT,
  trade_terms TEXT,
  total_amount NUMERIC,
  extra_fee_label TEXT,
  extra_fee_amount NUMERIC,
  items JSONB,  -- 阶梯报价 items 数组（含 tiers）
  notes TEXT,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- 样品单
-- =========================
CREATE TABLE IF NOT EXISTS samples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  order_date DATE,
  sent_date DATE,
  tracking_no TEXT,
  status TEXT,
  feedback TEXT,
  currency TEXT,
  production_time TEXT,
  items JSONB,
  notes TEXT,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- 订单（含运费）
-- =========================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_no TEXT,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  order_date DATE,
  delivery_date DATE,
  currency TEXT,
  payment_status TEXT,
  production_status TEXT,
  payment_terms TEXT,
  production_time TEXT,
  incoterms TEXT,
  destination_port TEXT,
  marks JSONB,
  extra_fee_label TEXT,
  extra_fee_amount NUMERIC,
  amount NUMERIC,
  items JSONB,
  notes TEXT,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- 采购单
-- =========================
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT,
  factory_name TEXT,
  date DATE,
  expected_date DATE,
  actual_date DATE,
  status TEXT,
  payment_terms TEXT,
  items JSONB,
  notes TEXT,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- 收付款（财务）
-- =========================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT,
  type TEXT,  -- 'income' | 'expense'
  date DATE,
  amount NUMERIC,
  fee_amount NUMERIC,
  net_amount NUMERIC,
  currency TEXT,
  method TEXT,
  counterparty TEXT,
  related_type TEXT,  -- 'order' | 'sample' | 'purchase' | 'other'
  related_no TEXT,
  related_id UUID,
  category TEXT,
  voucher_image TEXT,
  notes TEXT,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- 出货单
-- =========================
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  ship_date DATE,
  status TEXT,
  items JSONB,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- 跟进（保留，兼容老数据）
-- =========================
CREATE TABLE IF NOT EXISTS followups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  channel TEXT,
  date DATE,
  content TEXT,
  next_date DATE,
  done BOOLEAN DEFAULT FALSE,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- 日程
-- =========================
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_name TEXT,
  content TEXT,
  done BOOLEAN DEFAULT FALSE,
  done_at TIMESTAMPTZ,
  source TEXT,  -- 'quotation' | 'sample' | 'order' | 'followup' | manual
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- 邮件模板
-- =========================
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  subject TEXT,
  body TEXT,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- 系统元数据（计数器、设置等）
-- =========================
CREATE TABLE IF NOT EXISTS app_meta (
  key TEXT PRIMARY KEY,
  value JSONB
);

-- =========================
-- 索引（加速查询）
-- =========================
CREATE INDEX IF NOT EXISTS idx_quotations_customer ON quotations(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_samples_customer ON samples(customer_id);
CREATE INDEX IF NOT EXISTS idx_followups_customer ON followups(customer_id);
CREATE INDEX IF NOT EXISTS idx_tasks_customer ON tasks(customer_id);
CREATE INDEX IF NOT EXISTS idx_tasks_date ON tasks(date);
CREATE INDEX IF NOT EXISTS idx_payments_related ON payments(related_type, related_no);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(date);

-- =========================
-- Row Level Security（RLS）配置
-- 策略：只要登录就能读写所有数据（适合小团队共享）
-- 以后想分权限的话可以改这里
-- =========================
ALTER TABLE customers          ENABLE ROW LEVEL SECURITY;
ALTER TABLE products           ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations         ENABLE ROW LEVEL SECURITY;
ALTER TABLE samples            ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders             ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases          ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments           ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments          ENABLE ROW LEVEL SECURITY;
ALTER TABLE followups          ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks              ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates          ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_meta           ENABLE ROW LEVEL SECURITY;

-- 通用策略生成器：每个表加 4 个策略（SELECT/INSERT/UPDATE/DELETE），只要登录就能做
DO $$
DECLARE
  t TEXT;
  tables TEXT[] := ARRAY[
    'customers','products','product_categories','quotations','samples',
    'orders','purchases','payments','shipments','followups','tasks',
    'templates','app_meta'
  ];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format('DROP POLICY IF EXISTS auth_select ON %I', t);
    EXECUTE format('DROP POLICY IF EXISTS auth_insert ON %I', t);
    EXECUTE format('DROP POLICY IF EXISTS auth_update ON %I', t);
    EXECUTE format('DROP POLICY IF EXISTS auth_delete ON %I', t);

    EXECUTE format('CREATE POLICY auth_select ON %I FOR SELECT TO authenticated USING (true)', t);
    EXECUTE format('CREATE POLICY auth_insert ON %I FOR INSERT TO authenticated WITH CHECK (true)', t);
    EXECUTE format('CREATE POLICY auth_update ON %I FOR UPDATE TO authenticated USING (true) WITH CHECK (true)', t);
    EXECUTE format('CREATE POLICY auth_delete ON %I FOR DELETE TO authenticated USING (true)', t);
  END LOOP;
END$$;

-- =========================
-- Storage Bucket（图片存储）
-- =========================
-- 创建一个 public bucket 用来存图片
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- 允许已登录用户上传/读取/删除图片
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can read images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can read images"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can delete images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'images');

-- =========================
-- 完成！
-- =========================
-- 现在你的数据库已经准备好了。下一步：
-- 1. 左侧 Authentication → Users → Add user，创建 2 个账号（你自己 + 同事）
-- 2. 把你的账号邮箱告诉我，我开始接代码
-- =========================
