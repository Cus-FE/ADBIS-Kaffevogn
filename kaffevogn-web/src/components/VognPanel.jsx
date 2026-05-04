import { Koordinat } from '../models/Koordinat';
import Badge from './Badge';

const C = { primary:'#C8603A', primaryDk:'#A04828', white:'#FFFFFF', textDk:'#1C1410', textGray:'#6B6560', border:'#EDE8E3', green:'#2D7A4F' };

export default function VognPanel({ vogn, bruger, onClose, onFavorit, valgtTid }) {
  const brugerKoord = new Koordinat(55.6761, 12.5683);
  const afstand = vogn.placering.koordinat.beregnAfstand(brugerKoord);
  const isFav = bruger.erFavorit(vogn.id);
  const varer = vogn.menu.tilgængeligeVarer();
  const pp = vogn.placeringsPlan;

  // Er vognen åben på det valgte tidspunkt?
  const åbenVedValgtTid = valgtTid ? vogn.erÅbenKl(valgtTid) : null;

  return (
    <div style={{width:320,background:C.white,borderLeft:`1px solid ${C.border}`,display:'flex',flexDirection:'column',height:'100%',animation:'slideIn 0.22s ease',overflow:'hidden',flexShrink:0}}>
      <style>{`@keyframes slideIn{from{transform:translateX(20px);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>

      {/* Foto */}
      <div style={{height:160,background:`linear-gradient(135deg,${vogn.billedFarve}22,${vogn.billedFarve}44)`,position:'relative',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center',color:vogn.billedFarve,opacity:0.5}}>
          <div style={{fontSize:40}}>☕</div>
          <div style={{fontSize:11,fontFamily:'monospace',marginTop:6,letterSpacing:'0.5px'}}>vogn foto</div>
        </div>
        <button onClick={onClose} style={{position:'absolute',top:12,right:12,width:30,height:30,borderRadius:'50%',background:'rgba(255,255,255,0.85)',border:'none',cursor:'pointer',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
        <button onClick={() => onFavorit(vogn.id)} style={{position:'absolute',top:12,left:12,width:30,height:30,borderRadius:'50%',background:'rgba(255,255,255,0.85)',border:'none',cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center'}}>
          {isFav ? '⭐' : '☆'}
        </button>
      </div>

      <div style={{padding:'16px 20px',flex:1,overflowY:'auto'}}>
        {/* Navn + badge */}
        <div style={{marginBottom:12}}>
          <h2 style={{fontSize:18,fontWeight:700,color:C.textDk,marginBottom:6,letterSpacing:'-0.3px'}}>{vogn.navn}</h2>
          <Badge aktiv={vogn.erAktiv()} planlagt={vogn.erPlanlagt()}/>
        </div>

        {/* Åbningstider */}
        {pp && (
          <div style={{background:'#F9F5F0',borderRadius:10,padding:'10px 14px',marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:600,color:C.textGray,textTransform:'uppercase',letterSpacing:'0.7px',marginBottom:6}}>Åbningstider</div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div style={{display:'flex',alignItems:'center',gap:8,fontSize:14,color:C.textDk,fontWeight:500}}>
                <span>🕐</span>
                <span>{pp.fraTidspunkt} – {pp.tilTidspunkt}</span>
              </div>
              {valgtTid && (
                <span style={{
                  fontSize:11,fontWeight:600,padding:'3px 8px',borderRadius:20,
                  background: åbenVedValgtTid ? '#E8F5EE' : '#FDE8E8',
                  color: åbenVedValgtTid ? C.green : '#C0392B'
                }}>
                  {åbenVedValgtTid ? `✓ Åben kl. ${valgtTid}` : `✗ Lukket kl. ${valgtTid}`}
                </span>
              )}
            </div>
          </div>
        )}

        <p style={{fontSize:13,color:C.textGray,marginBottom:14,lineHeight:1.5}}>{vogn.beskrivelse}</p>

        <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:18,fontSize:13,color:C.textGray}}>
          <span>📍</span>
          <span>{afstand < 1000 ? `${afstand} m fra dig` : `${(afstand/1000).toFixed(1)} km fra dig`}</span>
        </div>

        {/* Menu */}
        <div>
          <h3 style={{fontSize:12,fontWeight:600,color:C.textGray,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:10}}>Menu</h3>
          <div style={{display:'flex',flexDirection:'column',gap:2}}>
            {varer.map((v,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:i<varer.length-1?`1px solid ${C.border}`:'none'}}>
                <span style={{fontSize:14,color:C.textDk}}>{v.navn}</span>
                <span style={{fontSize:14,fontWeight:500,color:C.primary}}>{v.pris} kr</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{padding:'12px 20px',borderTop:`1px solid ${C.border}`}}>
        <button
          style={{width:'100%',padding:'12px',background:C.primary,color:'#fff',border:'none',borderRadius:10,fontSize:14,fontWeight:600,cursor:'pointer'}}
          onMouseEnter={e=>e.target.style.background=C.primaryDk}
          onMouseLeave={e=>e.target.style.background=C.primary}>
          🗺️ Få rutevejledning
        </button>
      </div>
    </div>
  );
}
