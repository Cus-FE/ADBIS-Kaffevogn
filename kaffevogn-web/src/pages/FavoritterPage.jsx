import { mockVogne } from '../data/mockData';
import Badge from '../components/Badge';

const C = { primary:'#C8603A', bg:'#FAFAF8', white:'#FFFFFF', textDk:'#1C1410', textGray:'#6B6560', border:'#EDE8E3' };

export default function FavoritterPage({ bruger, setPage, setFocusVogn, onFavorit }) {
  const favVogne = mockVogne.filter(v => bruger.erFavorit(v.id));

  return (
    <div style={{flex:1,background:C.bg,overflowY:'auto',padding:'32px 40px'}}>
      <div style={{maxWidth:720,margin:'0 auto'}}>
        <div style={{marginBottom:28}}>
          <h1 style={{fontSize:26,fontWeight:700,color:C.textDk,letterSpacing:'-0.5px',marginBottom:4}}>Mine favoritter</h1>
          <p style={{fontSize:14,color:C.textGray}}>{favVogne.length} gemte vogne</p>
        </div>
        {favVogne.length === 0 ? (
          <div style={{textAlign:'center',padding:'64px 0',color:C.textGray}}>
            <div style={{fontSize:48,marginBottom:12}}>⭐</div>
            <div style={{fontSize:16,fontWeight:500,marginBottom:6,color:C.textDk}}>Ingen favoritter endnu</div>
            <div style={{fontSize:14}}>Gem dine favoritvogne fra kortet</div>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {favVogne.map(vogn => {
              const varer = vogn.menu.tilgængeligeVarer().slice(0,2);
              return (
                <div key={vogn.id}
                  style={{background:C.white,borderRadius:14,border:`1px solid ${C.border}`,padding:'18px 20px',display:'flex',gap:16,alignItems:'center',cursor:'pointer',transition:'box-shadow 0.15s',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.09)'}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)'}
                  onClick={()=>{ setFocusVogn(vogn); setPage('kort'); }}>
                  <div style={{width:52,height:52,borderRadius:12,background:`${vogn.billedFarve}22`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0}}>☕</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4,flexWrap:'wrap'}}>
                      <span style={{fontSize:15,fontWeight:600,color:C.textDk}}>{vogn.navn}</span>
                      <Badge aktiv={vogn.erAktiv()} planlagt={vogn.erPlanlagt()}/>
                    </div>
                    <div style={{fontSize:12,color:C.textGray,marginBottom:6}}>{vogn.placering.adresse}</div>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                      {varer.map((v,i) => (
                        <span key={i} style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,padding:'2px 8px',fontSize:12,color:C.textGray}}>
                          {v.navn} · {v.pris} kr
                        </span>
                      ))}
                    </div>
                  </div>
                  <button onClick={e=>{ e.stopPropagation(); onFavorit(vogn.id); }}
                    style={{width:32,height:32,borderRadius:8,border:`1px solid ${C.border}`,background:'transparent',cursor:'pointer',fontSize:14,color:C.textGray,flexShrink:0}}
                    onMouseEnter={e=>{ e.currentTarget.style.background='#FEF2F2'; e.currentTarget.style.color='#B91C1C'; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color=C.textGray; }}>
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
