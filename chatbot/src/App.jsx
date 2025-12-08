// src/App.jsx
import { useEffect, useState } from "react";
import PhonePmt from "./components/PhonePmt";
import Chat from "./components/Chat";

function App() {
  const [checkUser, setCheckUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("checkUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setCheckUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuthSuccess = (userData, jwtToken) => {
    setCheckUser(userData);
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("checkUser", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCheckUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("checkUser");
  };

  const isAuthed = !!checkUser && !!token;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* soft neon glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-emerald-500/10 via-slate-900 to-slate-950" />

      <div className="relative w-full max-w-5xl">
        <div className="relative rounded-[36px] bg-slate-900/80 border border-slate-800 shadow-[0_40px_120px_rgba(15,23,42,0.85)] overflow-hidden">
          {/* fake notch */}
          <div className="absolute left-1/2 -top-3 h-6 w-40 -translate-x-1/2 rounded-b-3xl bg-slate-900" />

          {/* header */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                
              </div>
              <div>
                <p className="text-sm font-semibold">ShopBot</p>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                  Online
                </p>
              </div>
            </div>

            {checkUser && (
              <div className="flex items-center gap-3">
                <div className="text-xs text-slate-300 text-right">
                  <p className="font-medium truncate max-w-[140px]">
                    {checkUser.name}
                  </p>
                  <p className="text-slate-400">{checkUser.phone}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-[11px] text-slate-200 hover:bg-slate-700 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </header>

          {/* content */}
          <main className="flex items-stretch justify-center px-3 pb-4 pt-2">
            {!isAuthed ? (
              <PhonePmt onAuthSuccess={handleAuthSuccess} />
            ) : (
              <Chat user={checkUser} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
