const C = { green: '#2D7A4F', grayPin: '#B0A9A3' };

export default function Badge({ aktiv, planlagt }) {
  if (aktiv) return (
    <span style={{display:'inline-flex',alignItems:'center',gap:5,background:'#E8F5EE',color:C.green,borderRadius:20,padding:'3px 10px',fontSize:12,fontWeight:600}}>
      <span style={{width:7,height:7,borderRadius:'50%',background:C.green,display:'inline-block'}}/>Åben nu
    </span>
  );
  if (planlagt) return (
    <span style={{display:'inline-flex',alignItems:'center',gap:5,background:'#F5F3EE',color:'#8B7355',borderRadius:20,padding:'3px 10px',fontSize:12,fontWeight:600}}>
      ⏳ Planlagt
    </span>
  );
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:5,background:'#F0EEEC',color:C.grayPin,borderRadius:20,padding:'3px 10px',fontSize:12,fontWeight:600}}>
      Lukket
    </span>
  );
}
