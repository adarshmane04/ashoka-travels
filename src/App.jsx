import { useState } from 'react';

const PHONE = '919800000000'; // your WhatsApp number with country code
const TRIPS = [
  { name: 'Goa Beach Break', type: 'Beach', days: '3N/4D', price: 14500 },
  { name: 'Manali and Kasol', type: 'Hills', days: '6N/7D', price: 24900 },
  { name: 'Kerala Backwaters', type: 'Beach', days: '5N/6D', price: 21800 },
  { name: 'Rajasthan Royal Circuit', type: 'Heritage', days: '7N/8D', price: 32500 },
  { name: 'Shirdi Darshan Express', type: 'Pilgrimage', days: '2N/3D', price: 6800 },
  { name: 'Leh and Ladakh', type: 'Hills', days: '7N/8D', price: 36400 },
];
const TYPES = ['All', ...new Set(TRIPS.map(t => t.type))];

export default function App() {
  const [type, setType] = useState('All');
  const [q, setQ] = useState('');
  const list = TRIPS.filter(t => (type === 'All' || t.type === type) && t.name.toLowerCase().includes(q.toLowerCase()));
  const book = t => window.open(`https://wa.me/${PHONE}?text=` + encodeURIComponent(`Hello Ashoka Travels, I want to enquire about ${t.name} (${t.days}).`), '_blank');

  return (
    <>
      <style>{`
        *{box-sizing:border-box} body{margin:0;font-family:system-ui,sans-serif;background:#f3f7f6;color:#10282b}
        header{background:#1d4ed8;color:#fff;padding:48px 20px;text-align:center}
        header h1{margin:0 0 8px;font-size:2.2rem;color:#e11d48} header p{margin:0;opacity:.9}
        main{max-width:1000px;margin:auto;padding:24px 16px}
        .bar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
        .bar input{flex:1 1 200px;padding:10px;border:1px solid #c5d3d1;border-radius:8px;font:inherit}
        button{font:inherit;cursor:pointer;border-radius:8px;border:1px solid #0b6e78;padding:10px 14px;background:#fff;color:#0b6e78}
        button.on,.book{background:#0b6e78;color:#fff}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
        .card{background:#fff;border:1px solid #dbe5e3;border-radius:12px;padding:18px;display:flex;flex-direction:column;gap:6px}
        .card small{color:#5b7377} .card b{font-size:1.3rem}
        footer{text-align:center;padding:24px;color:#5b7377}
      `}</style>

      <header>
        <h1>Ashoka Travels</h1>
        <p>Tour packages across India. Hotels, transport and guides included.</p>
      </header>

      <main>
        <div className="bar">
          <input placeholder="Search destination" value={q} onChange={e => setQ(e.target.value)} />
          {TYPES.map(t => <button key={t} className={t === type ? 'on' : ''} onClick={() => setType(t)}>{t}</button>)}
        </div>

        <div className="grid">
          {list.map(t => (
            <div className="card" key={t.name}>
              <small>{t.type} · {t.days}</small>
              <h3 style={{ margin: 0 }}>{t.name}</h3>
              <b>₹{t.price.toLocaleString('en-IN')} <small>per person</small></b>
              <button className="book" onClick={() => book(t)}>Enquire on WhatsApp</button>
            </div>
          ))}
          {!list.length && <p>No trips found.</p>}
        </div>
      </main>

      <footer>© 2026 Ashoka Travels · +91 98000 00000</footer>
    </>
  );
}
