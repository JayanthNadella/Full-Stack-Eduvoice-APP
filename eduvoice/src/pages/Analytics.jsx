import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

const STATUS_COLORS = {
  Pending: '#f7971e',
  'Under Review': '#7c5cfc',
  'In Progress': '#00b4d8',
  Resolved: '#43e97b',
  Rejected: '#ff6584',
};
const CAT_COLORS = ['#6c63ff','#ff6584','#43e97b','#f7971e','#00b4d8','#7c5cfc','#ff3366','#ffd166','#06d6a0'];

function buildDonutPaths(data, colors, cx, cy, outerR, innerR) {
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  if (total === 0) return '';
  let startAngle = -Math.PI / 2;
  let paths = '';
  Object.entries(data).forEach(([key, value]) => {
    if (value === 0) return;
    const angle = (value / total) * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const x1 = cx + outerR * Math.cos(startAngle), y1 = cy + outerR * Math.sin(startAngle);
    const x2 = cx + outerR * Math.cos(endAngle), y2 = cy + outerR * Math.sin(endAngle);
    const ix1 = cx + innerR * Math.cos(endAngle), iy1 = cy + innerR * Math.sin(endAngle);
    const ix2 = cx + innerR * Math.cos(startAngle), iy2 = cy + innerR * Math.sin(startAngle);
    const large = angle > Math.PI ? 1 : 0;
    paths += `<path d="M${x1},${y1} A${outerR},${outerR} 0 ${large},1 ${x2},${y2} L${ix1},${iy1} A${innerR},${innerR} 0 ${large},0 ${ix2},${iy2} Z" fill="${colors[key]}" opacity="0.9"/>`;
    startAngle = endAngle;
  });
  return paths;
}

export default function Analytics() {
  const { complaints } = useApp();
  const barsRef = useRef(null);
  const total = complaints.length;

  const byCategory = {};
  const byStatus = { Pending:0, 'Under Review':0, 'In Progress':0, Resolved:0, Rejected:0 };
  complaints.forEach(c => {
    byCategory[c.category] = (byCategory[c.category] || 0) + 1;
    byStatus[c.status] = (byStatus[c.status] || 0) + 1;
  });

  const resolvedRate = total > 0 ? Math.round((byStatus.Resolved / total) * 100) : 0;
  const critical = complaints.filter(c => c.priority === 'Critical').length;

  const sortedCats = Object.entries(byCategory).sort((a,b) => b[1]-a[1]);
  const donutPaths = buildDonutPaths(byStatus, STATUS_COLORS, 80, 80, 60, 40);

  useEffect(() => {
    if (!barsRef.current) return;
    const bars = barsRef.current.querySelectorAll('.bar-fill');
    bars.forEach(b => {
      const w = b.style.width;
      b.style.width = '0';
      setTimeout(() => { b.style.width = w; }, 100);
    });
  }, [complaints.length]);

  return (
    <div>
      <div className="stats-grid" style={{ gridTemplateColumns:'repeat(3,1fr)' }}>
        <div className="stat-card">
          <div className="stat-glow" style={{ background:'#6c63ff' }} />
          <div className="stat-icon" style={{ background:'rgba(108,99,255,.15)', color:'#6c63ff' }}>📊</div>
          <div className="stat-value" style={{ color:'#6c63ff' }}>{total}</div>
          <div className="stat-label">Total Complaints</div>
        </div>
        <div className="stat-card">
          <div className="stat-glow" style={{ background:'#43e97b' }} />
          <div className="stat-icon" style={{ background:'rgba(67,233,123,.15)', color:'#43e97b' }}>✅</div>
          <div className="stat-value" style={{ color:'#43e97b' }}>{resolvedRate}%</div>
          <div className="stat-label">Resolution Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-glow" style={{ background:'#ff3366' }} />
          <div className="stat-icon" style={{ background:'rgba(255,51,102,.15)', color:'#ff3366' }}>🚨</div>
          <div className="stat-value" style={{ color:'#ff3366' }}>{critical}</div>
          <div className="stat-label">Critical Issues</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-title">📊 Complaints by Category</div>
          <div className="bar-chart" ref={barsRef}>
            {sortedCats.map(([cat, count], i) => {
              const pct = Math.round((count / total) * 100);
              return (
                <div key={cat} className="bar-row">
                  <div className="bar-label">{cat}</div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width:`${pct}%`, background: CAT_COLORS[i % CAT_COLORS.length] }} />
                  </div>
                  <div className="bar-count">{count}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-title">📈 Status Overview</div>
          <div className="donut-wrapper">
            <svg width="160" height="160" viewBox="0 0 160 160" dangerouslySetInnerHTML={{
              __html: donutPaths +
                `<text x="80" y="76" text-anchor="middle" fill="var(--text)" font-family="Syne" font-size="22" font-weight="800">${total}</text>` +
                `<text x="80" y="94" text-anchor="middle" fill="var(--text2)" font-family="DM Sans" font-size="11">total</text>`
            }} />
            <div className="donut-legend">
              {Object.entries(byStatus).map(([s, count]) => (
                <div key={s} className="legend-row">
                  <div className="legend-dot" style={{ background: STATUS_COLORS[s] }} />
                  <span>{s}</span>
                  <span style={{ marginLeft:'auto', fontWeight:600 }}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
