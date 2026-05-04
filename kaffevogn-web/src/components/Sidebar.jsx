import { useState } from 'react';

const C = { primary:'#C8603A', white:'#FFFFFF', textGray:'#6B6560', border:'#EDE8E3', amberLight:'#FDF3ED', textDk:'#1C1410' };

export default function Sidebar({ page, setPage, bruger, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const nav = [
    { id: 'kort', icon: '🗺️', label: 'Kort' },
    { id: 'favoritter', icon: '⭐', label: 'Favoritter' },
  ];

  return (
    <div style={{width:72,background:C.white,borderRight:`1px solid ${C.border}`,display:'flex',flexDirection:'column',alignItems:'center',padding:'16px 0',boxShadow:'2px 0 12px rgba(0,0,0,0.04)',zIndex:100,flexShrink:0}}>
      <div onClick={() => setPage('kort')} style={{width:42,height:42,background:C.amberLight,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,cursor:'pointer',marginBottom:24,boxShadow:'0 2px 8px rgba(200,96,58,0.15)'}}>☕</div>
      <div style={{display:'flex',flexDirection:'column',gap:4,flex:1}}>
        {nav.map(n => {
          const active = page === n.id;
          return (
            <button key={n.id} onClick={() => setPage(n.id)} title={n.label}
              style={{width:48,height:48,borderRadius:12,border:'none',background:active?C.amberLight:'transparent',color:active?C.primary:C.textGray,fontSize:20,cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2,transition:'all 0.15s',position:'relative'}}>
              <span>{n.icon}</span>
              <span style={{fontSize:9,fontWeight:active?600:400,color:active?C.primary:C.textGray}}>{n.label}</span>
              {active && <div style={{position:'absolute',right:0,top:'50%',transform:'translateY(-50%)',width:3,height:24,background:C.primary,borderRadius:'2px 0 0 2px'}}/>}
            </button>
          );
        })}
      </div>
      <div style={{position:'relative'}}>
        <button onClick={() => setProfileOpen(!profileOpen)} title="Profil"
          style={{width:36,height:36,borderRadius:'50%',border:`2px solid ${C.border}`,background:C.amberLight,fontSize:15,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:C.primary}}>
          {bruger.navn.charAt(0)}
        </button>
        {profileOpen && (
          <div style={{position:'absolute',bottom:44,left:52,background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:'12px 16px',boxShadow:'0 8px 24px rgba(0,0,0,0.1)',minWidth:180,zIndex:200}}>
            <div style={{fontWeight:600,fontSize:13,color:C.textDk,marginBottom:2}}>{bruger.navn}</div>
            <div style={{fontSize:12,color:C.textGray,marginBottom:12}}>{bruger.email}</div>
            <button onClick={onLogout} style={{width:'100%',padding:'7px 0',background:'#FEF2F2',color:'#B91C1C',border:'1px solid #FEE2E2',borderRadius:8,fontSize:12,fontWeight:500,cursor:'pointer'}}>Log ud</button>
          </div>
        )}
      </div>
    </div>
  );
}
