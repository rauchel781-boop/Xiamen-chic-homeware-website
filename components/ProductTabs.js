'use client';
import { useState } from 'react';

const CSS = `
.tabs {
  --tabs-border: #DDE5EE;
  --tabs-blue-dark: #0E1E3D;
  --tabs-blue-mid: #1E4A7B;
  --tabs-blue-warm: #4A8AC4;
  --tabs-cream: #EFF5FB;
  --tabs-text-muted: #6B7B8C;
}
.tabs-nav {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--tabs-border);
  margin-bottom: 32px;
  overflow-x: auto;
}
.tabs-btn {
  background: transparent;
  border: none;
  padding: 14px 28px;
  font-family: inherit;
  font-size: 0.78rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--tabs-text-muted);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  white-space: nowrap;
  transition: color .15s, border-color .15s;
}
.tabs-btn:hover { color: var(--tabs-blue-mid); }
.tabs-btn.is-active { color: var(--tabs-blue-dark); border-bottom-color: var(--tabs-blue-warm); }

.tabs-panel { font-size: 0.92rem; color: #2C3E5C; line-height: 1.8; font-weight: 300; }
.tabs-panel p { margin: 0 0 16px; }
.tabs-panel p:last-child { margin-bottom: 0; }

.spec-table { width: 100%; border-collapse: collapse; }
.spec-table tr { border-bottom: 1px solid var(--tabs-border); }
.spec-table tr:last-child { border-bottom: none; }
.spec-table th, .spec-table td { padding: 14px 0; text-align: left; vertical-align: top; }
.spec-table th {
  width: 32%;
  font-size: 0.78rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--tabs-text-muted);
  font-weight: 500;
}
.spec-table td {
  font-size: 0.9rem;
  color: var(--tabs-blue-dark);
  font-weight: 400;
}

.cust-list { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 14px 32px; }
.cust-item {
  display: flex; gap: 12px; align-items: flex-start;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--tabs-blue-dark);
}
.cust-item::before {
  content: '✓';
  color: var(--tabs-blue-warm);
  font-weight: 700;
  flex-shrink: 0;
}

@media (max-width: 800px) {
  .cust-list { grid-template-columns: 1fr; }
  .spec-table th { width: 40%; font-size: 0.72rem; }
  .spec-table td { font-size: 0.85rem; }
  .tabs-btn { padding: 12px 18px; font-size: 0.72rem; letter-spacing: 1.5px; }
}
`;

export default function ProductTabs({ description, specs, customization, packaging }) {
  const [tab, setTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'customization', label: 'Customization' },
    { id: 'packaging', label: 'Packaging & Shipping' },
  ];

  return (
    <div className="tabs">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="tabs-nav">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`tabs-btn${tab === t.id ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="tabs-panel">
        {tab === 'description' && (
          <div>
            <p>{description}</p>
            <p>
              All boxes are built to your specifications — wood species, dimensions,
              finish, hardware, lining, and branding can all be customized for your project.
              Sample available within 7 days of confirmed quote.
            </p>
          </div>
        )}

        {tab === 'specifications' && (
          <table className="spec-table">
            <tbody>
              {Object.entries(specs).map(([key, value]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'customization' && (
          <ul className="cust-list">
            {customization.map((c, i) => (
              <li key={i} className="cust-item">{c}</li>
            ))}
          </ul>
        )}

        {tab === 'packaging' && (
          <div>
            <p>{packaging}</p>
            <p>
              We handle all export documentation: commercial invoice, packing list,
              certificate of origin, phytosanitary certificate (for solid wood), and
              fumigation as required. Shipping by FCL, LCL, or air express depending
              on volume and urgency.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
