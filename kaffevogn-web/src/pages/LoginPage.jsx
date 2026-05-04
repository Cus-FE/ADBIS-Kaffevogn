import { useState } from 'react';

const C = { primary:'#C8603A', bg:'#FAFAF8', white:'#FFFFFF', textDk:'#1C1410', textGray:'#6B6560', border:'#EDE8E3', grayPin:'#B0A9A3' };

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (email === 'frederik@example.dk' && pw === '1234') {
        onLogin();
      } else {
        setError('Forkert email eller adgangskode. Prøv: frederik@example.dk / 1234');
        setLoading(false);
      }
    }, 700);
  };

  const inputStyle = {
    width:'100%', padding:'11px 14px', borderRadius:10, border:`1.5px solid ${C.border}`,
    fontSize:14, color:C.textDk, background:C.white, outline:'none', fontFamily:'Inter,sans-serif', transition:'border-color 0.15s',
  };

  return (
    <div style={{display:'flex',height:'100vh',background:C.bg}}>
      {/* Venstre: mørk panel */}
      <div style={{flex:1,position:'relative',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center',background:'#2A1A10'}}>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,#4A2810 0%,#2A1408 40%,#1A0C06 100%)',opacity:0.95}}/>
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(ellipse at 30% 40%, rgba(200,96,58,0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(90,62,43,0.4) 0%, transparent 50%)'}}/>
        <div style={{position:'absolute',top:'20%',left:'15%',width:180,height:180,borderRadius:'50%',background:'rgba(200,96,58,0.08)',border:'1px solid rgba(200,96,58,0.15)'}}/>
        <div style={{position:'absolute',bottom:'15%',right:'10%',width:120,height:120,borderRadius:'50%',background:'rgba(200,96,58,0.06)',border:'1px solid rgba(200,96,58,0.1)'}}/>
        <div style={{position:'relative',zIndex:1,textAlign:'center',padding:'0 48px',maxWidth:420}}>
          <div style={{fontSize:64,marginBottom:24}}>☕</div>
          <blockquote style={{fontStyle:'italic',fontSize:22,fontWeight:300,color:'rgba(255,255,255,0.92)',lineHeight:1.5,letterSpacing:'-0.3px'}}>
            "Din daglige kop,<br/>altid et klik væk"
          </blockquote>
          <div style={{marginTop:28,display:'flex',justifyContent:'center',gap:8}}>
            {[1,2,3,4,5].map(i => <div key={i} style={{width:6,height:6,borderRadius:'50%',background:i<=4?C.primary:'rgba(255,255,255,0.2)'}}/>)}
          </div>
        </div>
      </div>

      {/* Højre: login form */}
      <div style={{width:460,display:'flex',alignItems:'center',justifyContent:'center',background:C.white,padding:48}}>
        <div style={{width:'100%',maxWidth:340}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
            <span style={{fontSize:28}}>☕</span>
            <span style={{fontSize:26,fontWeight:700,color:C.textDk,letterSpacing:'-0.5px'}}>KaffeVogn</span>
          </div>
          <p style={{color:C.textGray,fontSize:15,marginBottom:36}}>Find din næste kop kaffe</p>
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:16}}>
              <label style={{display:'block',fontSize:13,fontWeight:500,color:C.textDk,marginBottom:6}}>Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="din@email.dk" style={inputStyle}
                onFocus={e=>e.target.style.borderColor=C.primary} onBlur={e=>e.target.style.borderColor=C.border}/>
            </div>
            <div style={{marginBottom:24,position:'relative'}}>
              <label style={{display:'block',fontSize:13,fontWeight:500,color:C.textDk,marginBottom:6}}>Adgangskode</label>
              <input type={showPw?'text':'password'} value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" style={{...inputStyle,paddingRight:40}}
                onFocus={e=>e.target.style.borderColor=C.primary} onBlur={e=>e.target.style.borderColor=C.border}/>
              <button type="button" onClick={()=>setShowPw(!showPw)} style={{position:'absolute',right:12,top:33,background:'none',border:'none',cursor:'pointer',fontSize:16,color:C.textGray}}>
                {showPw?'🙈':'👁️'}
              </button>
            </div>
            {error && <div style={{background:'#FEF2F2',border:'1px solid #FEE2E2',borderRadius:8,padding:'10px 12px',fontSize:12,color:'#B91C1C',marginBottom:16}}>{error}</div>}
            <button type="submit" disabled={loading} style={{width:'100%',padding:'13px',background:loading?C.grayPin:C.primary,color:'#fff',border:'none',borderRadius:10,fontSize:15,fontWeight:600,cursor:loading?'default':'pointer',transition:'background 0.2s'}}>
              {loading?'Logger ind...':'Log ind'}
            </button>
          </form>
          <p style={{textAlign:'center',marginTop:20,fontSize:13,color:C.textGray}}>
            Ny bruger? <span style={{color:C.primary,fontWeight:500,cursor:'pointer'}}>Opret konto →</span>
          </p>
          <p style={{textAlign:'center',marginTop:24,fontSize:11,color:C.grayPin,background:C.bg,borderRadius:8,padding:'8px 12px'}}>
            Demo: frederik@example.dk / 1234
          </p>
        </div>
      </div>
    </div>
  );
}
