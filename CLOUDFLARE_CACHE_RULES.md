# Cloudflare Cache Rules Configuration
# Apply these rules in Cloudflare Dashboard → Caching → Cache Rules

# Rule 1: Static Assets (1 year cache)
# Condition: (cf.cache_status eq "HIT" or cf.cache_status eq "MISS") and 
#            (uri.path contains "/_next/static" or uri.path contains "/public")
# Cache TTL: 31536000 (1 year)
# Description: Cache Next.js static assets forever (content-hashed)

# Rule 2: Optimized Images (30 days cache)
# Condition: uri.path contains "/_next/image" or uri.path contains "/wp-images"
# Cache TTL: 2592000 (30 days)
# Description: Cache optimized images for 30 days with stale-while-revalidate

# Rule 3: HTML Pages (1 minute edge cache, 1 day SWR)
# Condition: uri.path eq "/" or 
#            (not uri.path contains "/api" and not uri.path contains "/admin")
# Cache TTL: 60 seconds at edge, 86400 seconds stale-while-revalidate
# Description: Short HTML cache with long SWR for background revalidation

# Rule 4: Bypass API Routes (never cache)
# Condition: uri.path contains "/api"
# Cache TTL: 0 (no cache)
# Description: API routes bypass cache entirely

# Rule 5: Sitemap & Robots (refresh daily)
# Condition: uri.path eq "/sitemap.xml" or uri.path eq "/robots.txt"
# Cache TTL: 86400 (24 hours)
# Description: Refresh sitemap & robots daily at edge

# Cloudflare Dashboard Setup Steps:
# 1. Go to: Caching → Cache Rules
# 2. Click "Create rule"
# 3. Set Expression, TTL, and Cache Eligibility as above
# 4. Enable all rules
