# Rewrite the Q4 wooden-gift-box post as Industry Brief Vol. 01 — a real
# newsletter-style brief, not a long-form blog. Stores structured fields
# (briefNumber, tldr[], bigNumber, outsideSignal, fromTheFloor, actionItems[])
# instead of one big content blob, so the /briefs/[slug] template can lay
# them out as a newsletter.

import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS = os.path.join(ROOT, 'wp-data', 'posts.json')
SLUG = 'q4-wooden-gift-box-inquiry-timeline-2026'

brief = {
    'id': 6800,
    'slug': SLUG,
    'type': 'brief',
    'briefNumber': 1,
    'weekOf': 'May 26–29, 2026',
    'readTime': 3,

    'title': 'Q4 Wooden Gift Box Inquiries Up 244% This Month',
    'meta_title': 'Q4 Wooden Gift Box Inquiries Up 244% | CHIC Industry Brief Vol. 01',
    'meta_desc': (
        'Industry Brief Vol. 01 — Q4 wooden gift box inquiry volume tripled '
        'in four weeks on our quote desk. EU EUDR enforcement is real at port. '
        'Spec lock deadline for sea freight is June 15.'
    ),
    'excerpt': '<p>Industry Brief Vol. 01 — Q4 wooden gift box inquiries on our quote desk are up 244% versus April. Spec lock deadline for a full sea-freight window is June 15. EU EUDR enforcement is now actually holding containers at port.</p>',

    'tldr': [
        'Q4-flagged inquiries on our quote desk tripled in 4 weeks (April → May).',
        'Spec lock deadline for a full sea-freight window is <strong>June 15</strong>.',
        'Red Sea routing + EU EUDR + US tariff uncertainty are all compressing the calendar.',
    ],

    'bigNumber': {
        'value': '76',
        'label': 'Q4-flagged inquiries this month',
        'context': 'up 244% from April · average target qty 4,200 pcs',
    },

    'outsideSignal': {
        'icon': 'globe',
        'headline': 'EU EUDR enforcement is now real at port',
        'body': (
            'The EU Deforestation Regulation became applicable December 30, 2025 '
            'and is now actually being enforced at EU port of entry. Wooden '
            'products without FSC chain-of-custody documentation are being '
            'held 5–7 days. Add this to your in-transit math for EU buyers.'
        ),
    },

    'fromTheFloor': {
        'icon': 'factory',
        'headline': 'Corporate-gift program managers are the biggest cohort',
        'body': (
            'Week 22–27 May brought 31 Q4 inquiries averaging 4,600 pcs. '
            'Hospitality buyers (hotel turn-down kits) entered week four — '
            'right on the calendar we expected. High-volume bookings (10k+) '
            'closed in March/April and are already in production, so factory '
            'capacity for late comers will tighten progressively from end of June.'
        ),
    },

    'actionItems': [
        'Lock your target on-shelf date (work backwards from December 1, not forwards from today).',
        'Decide your lid style (hinged window / sliding / magnetic) before sampling — changing later costs 10 days.',
        'Send your insert dimensions (bottle, sachet, candle) to the factory so compartments are sized right.',
        'EU shipments: request FSC chain-of-custody documentation upfront from your factory.',
    ],

    'nextWeek': 'Vol. 02 will go deep on EU EUDR enforcement — what an FSC chain-of-custody packet actually contains, and how to request one without slowing down your PO.',

    'date': '2026-05-29T09:00:00',
    'author': 'rauchel1@hotmail.com',
    'categories': [
        {'slug': 'industry-brief', 'name': 'Industry Brief'},
    ],
    'tags': [],
    'featured_image': '/wp-images/2026/02/wooden-gift-box-1.jpg',

    # Keep faq as 3 short Qs — brief, not full article
    'faq': [
        {
            'q': 'How late can I still book a Q4 wooden gift box program?',
            'a': '<p>Spec lock by June 15 keeps a full sea-freight window. After mid-July, air freight is still possible but pushes unit cost up 4×.</p>',
        },
        {
            'q': 'Do I really need FSC documents for EU shipments now?',
            'a': '<p>Yes. EU EUDR became enforceable December 30, 2025 and ports are now actively holding non-compliant containers 5–7 days for verification.</p>',
        },
        {
            'q': 'What MOQ is still bookable this late?',
            'a': '<p>300–500 pcs for simple corporate gifts (sliding lid, laser logo). 1,000–5,000 pcs needs to be quoted within 2 weeks. Multi-SKU above 5,000 pcs should be in sampling by mid-June.</p>',
        },
    ],
}

# Merge into posts.json — replace existing post by same slug
posts = json.load(open(POSTS, encoding='utf-8'))
replaced = False
for i, p in enumerate(posts):
    if p['slug'] == SLUG:
        posts[i] = brief
        replaced = True
        break

if not replaced:
    posts.append(brief)
    print('Appended (no existing slug found)')
else:
    print(f'Replaced existing post: {SLUG}')

with open(POSTS, 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print(f'Total posts: {len(posts)}')
print(f'Brief Vol. {brief["briefNumber"]} ready: {brief["title"]}')
