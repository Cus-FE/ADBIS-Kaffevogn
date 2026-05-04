import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import VognPanel from '../components/VognPanel';
import { mockVogne, mockKortvisning } from '../data/mockData';

const C = { primary:'#C8603A', white:'#FFFFFF', textDk:'#1C1410', textGray:'#6B6560', border:'#EDE8E3', bg:'#FAFAF8', amberLight:'#FDF3ED' };

const DEMO_TID = '12:00';

export default function KortPage({ bruger, onFavorit, focusVogn }) {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersRef = useRef({});
  const [valgteVogn, setValgteVogn] = useState(null);
  const [filter, setFilter] = useState('alle');
  const [søgning, setSøgning] = useState('');
  const [søgningFokus, setSøgningFokus] = useState(false);
  const [valgtTid, setValgtTid] = useState(DEMO_TID);
  const brugNuTid = false;

  useEffect(() => {
    if (leafletMap.current) return;
    const map = L.map(mapRef.current, { zoomControl: false }).setView([55.6761, 12.5683], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    leafletMap.current = map;
    return () => { map.remove(); leafletMap.current = null; };
  }, []);

  useEffect(() => {
    if (focusVogn) {
      setValgteVogn(focusVogn);
      if (leafletMap.current) {
        leafletMap.current.setView([focusVogn.placering.koordinat.lat, focusVogn.placering.koordinat.lng], 15);
      }
    }
  }, [focusVogn]);

  useEffect(() => {
    if (!leafletMap.current) return;
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    const tidspunkt = valgtTid;

    mockKortvisning.setFilter(filter);
    let visVogne = mockKortvisning.hentFilteredVogne().filter(v =>
      !søgning || v.navn.toLowerCase().includes(søgning.toLowerCase())
    );

    // Tidsbaseret filtrering: "Åbne nu" viser kun aktive vogne inden for åbningstid
    if (filter === 'aaben') {
      visVogne = mockVogne.filter(v =>
        v.status === 'aktiv' &&
        v.erÅbenKl(tidspunkt) &&
        (!søgning || v.navn.toLowerCase().includes(søgning.toLowerCase()))
      );
    }

    visVogne.forEach(vogn => {
      let html, size;
      const sel = valgteVogn?.id === vogn.id ? ' selected' : '';
      const åbenNu = vogn.erÅbenKl(tidspunkt);

      if (vogn.status === 'inaktiv') {
        html = `<div class="pin-inaktiv"></div>`;
        size = [12, 12];
      } else if (åbenNu) {
        html = `<div class="pin-aktiv${sel}">☕</div>`;
        size = [40, 40];
      } else {
        html = `<div class="pin-planlagt${sel}">⏳</div>`;
        size = [36, 36];
      }
      const icon = L.divIcon({ html, className: '', iconSize: size, iconAnchor: [size[0]/2, size[1]/2] });
      const marker = L.marker([vogn.placering.koordinat.lat, vogn.placering.koordinat.lng], { icon });
      if (vogn.status !== 'inaktiv') {
        marker.on('click', () => setValgteVogn(vogn));
      }
      marker.addTo(leafletMap.current);
      markersRef.current[vogn.id] = marker;
    });

    const userIcon = L.divIcon({
      html: `<div style="width:14px;height:14px;background:#3B82F6;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 3px rgba(59,130,246,0.3)"></div>`,
      className: '', iconSize: [14,14], iconAnchor: [7,7]
    });
    L.marker([55.6761, 12.5683], { icon: userIcon }).addTo(leafletMap.current);
  }, [filter, søgning, valgteVogn, valgtTid]);

  const filters = [
    { id: 'alle', label: 'Alle' },
    { id: 'aaben', label: '🟢 Åbne nu' },
    { id: 'planlagt', label: '⏳ Planlagte' },
  ];

  const chipStyle = (id) => ({
    padding:'7px 14px', borderRadius:20, border:`1.5px solid ${filter===id?C.primary:C.border}`,
    background:filter===id?C.amberLight:C.white, color:filter===id?C.primary:C.textGray,
    fontSize:13, fontWeight:filter===id?600:400, cursor:'pointer', transition:'all 0.15s', whiteSpace:'nowrap',
  });

  return (
    <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
      {/* Topbar */}
      <div style={{padding:'10px 16px',background:C.white,borderBottom:`1px solid ${C.border}`,display:'flex',alignItems:'center',gap:12,zIndex:50}}>
        <div style={{position:'relative',flex:1,maxWidth:340}}>
          <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',fontSize:15,zIndex:1}}>🔍</span>
          <input value={søgning} onChange={e=>setSøgning(e.target.value)} placeholder="Søg efter kaffevogn..."
            style={{width:'100%',padding:'9px 12px 9px 36px',borderRadius:10,border:`1.5px solid ${søgningFokus?C.primary:C.border}`,fontSize:13,color:C.textDk,background:C.bg,outline:'none',fontFamily:'Inter,sans-serif'}}
            onFocus={()=>setSøgningFokus(true)}
            onBlur={()=>setTimeout(()=>setSøgningFokus(false),150)}/>
          {søgning && søgningFokus && (() => {
            const resultater = mockVogne.filter(v => v.status !== 'inaktiv' && v.navn.toLowerCase().includes(søgning.toLowerCase()));
            return resultater.length > 0 ? (
              <div style={{position:'absolute',top:'calc(100% + 4px)',left:0,right:0,background:C.white,border:`1.5px solid ${C.border}`,borderRadius:10,boxShadow:'0 4px 16px rgba(0,0,0,0.1)',zIndex:200,overflow:'hidden'}}>
                {resultater.map(v => (
                  <div key={v.id}
                    onMouseDown={()=>{ setValgteVogn(v); setSøgning(''); if(leafletMap.current) leafletMap.current.setView([v.placering.koordinat.lat,v.placering.koordinat.lng],15); }}
                    style={{padding:'10px 14px',cursor:'pointer',fontSize:13,color:C.textDk,borderBottom:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}
                    onMouseEnter={e=>e.currentTarget.style.background=C.amberLight}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <span>{v.navn}</span>
                    <span style={{fontSize:11,color:C.textGray}}>{v.placering.adresse.split(',')[1]?.trim()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{position:'absolute',top:'calc(100% + 4px)',left:0,right:0,background:C.white,border:`1.5px solid ${C.border}`,borderRadius:10,padding:'10px 14px',fontSize:13,color:C.textGray,zIndex:200}}>
                Ingen resultater
              </div>
            );
          })()}
        </div>
        <div style={{display:'flex',gap:8}}>
          {filters.map(f => <button key={f.id} onClick={()=>setFilter(f.id)} style={chipStyle(f.id)}>{f.label}</button>)}
        </div>

        <div style={{display:'flex',alignItems:'center',gap:6,marginLeft:'auto',padding:'6px 12px',borderRadius:20,border:`1.5px solid ${C.border}`,background:C.white,color:C.textGray,fontSize:13}}>
          <span>🕐</span>
          <span>{valgtTid}</span>
        </div>
      </div>

      {/* Kort + Panel */}
      <div style={{flex:1,display:'flex',overflow:'hidden'}}>
        <div ref={mapRef} style={{flex:1}}/>
        {valgteVogn && (
          <VognPanel vogn={valgteVogn} bruger={bruger} onClose={()=>setValgteVogn(null)}
            valgtTid={valgtTid}
            onFavorit={onFavorit}/>
        )}
      </div>
    </div>
  );
}
