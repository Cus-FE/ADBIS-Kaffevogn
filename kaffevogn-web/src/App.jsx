import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import KortPage from './pages/KortPage';
import FavoritterPage from './pages/FavoritterPage';
import Sidebar from './components/Sidebar';
import { mockBruger } from './data/mockData';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('kv_loggedin') === 'true');
  const [page, setPage] = useState('kort');
  const [bruger] = useState(mockBruger);
  const [, forceUpdate] = useState(0);
  const [focusVogn, setFocusVogn] = useState(null);

  const handleFavorit = (id) => {
    if (bruger.erFavorit(id)) bruger.fjernFavorit(id);
    else bruger.tilfoejFavorit(id);
    forceUpdate(n => n+1);
  };

  if (!loggedIn) return <LoginPage onLogin={() => { sessionStorage.setItem('kv_loggedin','true'); setLoggedIn(true); }} />;

  return (
    <div style={{display:'flex',height:'100vh',overflow:'hidden'}}>
      <Sidebar page={page} setPage={setPage} bruger={bruger} onLogout={() => { sessionStorage.clear(); setLoggedIn(false); }} />
      {page === 'kort' && <KortPage bruger={bruger} onFavorit={handleFavorit} focusVogn={focusVogn} />}
      {page === 'favoritter' && <FavoritterPage bruger={bruger} setPage={setPage} setFocusVogn={setFocusVogn} onFavorit={handleFavorit} />}
    </div>
  );
}
