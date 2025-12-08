/* src/App.jsx  –  only UI changed */
import "./App.css";
import PhonePmt from "./components/PhonePmt";
import Chat from "./components/Chat";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const isAuthenticated = !!checkUser && !!token;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-100 relative overflow-hidden">
      {/* subtle animated blobs */}
      <motion.div
        className="absolute -top-24 -left-24 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-40"
        animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl opacity-40"
        animate={{ x: [0, -80, 0], y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="w-full max-w-4xl h-[88vh] bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-100 flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
      >
        {/* glass header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/30">
          <motion.div
            className="flex items-center gap-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">ShopBot</h1>
          </motion.div>

          {checkUser && (
            <motion.div
              className="flex items-center gap-3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <span className="text-sm text-gray-700 hidden sm:block">
                {checkUser.name} · {checkUser.phone}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm rounded-full px-4 py-2 bg-white/60 hover:bg-white text-purple-700 shadow-sm transition"
              >
                Logout
              </button>
            </motion.div>
          )}
        </header>

        {/* views */}
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div
              key="auth"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="flex-1 p-6"
            >
              <PhonePmt onAuthSuccess={handleAuthSuccess} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="flex-1 flex flex-col"
            >
              <Chat user={checkUser} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;