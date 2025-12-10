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
    <div className="min-h-screen w-full bg-black text-slate-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* background glows */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-br from-black via-[#05030a] to-black" />
      <div className="pointer-events-none fixed -left-40 top-10 h-80 w-80 rounded-full bg-[#f5b36b]/20 blur-3xl -z-10" />
      <div className="pointer-events-none fixed right-[-120px] bottom-[-60px] h-96 w-96 rounded-full bg-[#f58a45]/18 blur-3xl -z-10" />

      <div className="relative w-full max-w-5xl">
        <div
          className="
            relative mx-auto
            min-h-[80vh] w-full
            rounded-[32px]
            border border-white/12
            bg-white/4
            backdrop-blur-3xl
            shadow-[0_40px_140px_rgba(0,0,0,0.95)]
            overflow-hidden
          "
        >
          {/* subtle inner warm glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,179,107,0.22),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(245,138,69,0.2),transparent_55%)] opacity-90" />

          {/* header */}
          <header
            className="
              relative z-10 flex items-center justify-between
              px-7 py-4
              border-b border-white/10
              bg-black/40
              backdrop-blur-3xl
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-2xl bg-white/5 border border-white/20
                  shadow-[0_0_0_1px_rgba(255,255,255,0.16),0_14px_30px_rgba(0,0,0,0.9)]
                "
              >
                <span className="text-[11px] tracking-[0.15em] uppercase text-white/70">
                  AI
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide">ShopBot</p>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
                  Online personal shopping assistant
                </p>
              </div>
            </div>

            {checkUser && (
              <div className="flex items-center gap-4">
                <div className="text-xs text-right">
                  <p className="font-medium truncate max-w-[160px]">
                    {checkUser.name}
                  </p>
                  <p className="text-slate-300/80">{checkUser.phone}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="
                    rounded-full px-4 py-1.5 text-[11px] font-medium
                    border border-white/40
                    bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)]
                    bg-black/80
                    text-slate-50
                    shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_20px_40px_rgba(0,0,0,0.9)]
                    hover:bg-white/6 hover:border-white/70
                    transition-all duration-200
                  "
                >
                  Logout
                </button>
              </div>
            )}
          </header>

          {/* content */}
          <main className="relative z-10 h-[calc(80vh-4rem)] px-6 py-6 flex items-center justify-center">
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