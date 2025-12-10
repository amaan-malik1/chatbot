import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { login, signup } from "../lib/api";

const PhonePmt = ({ onAuthSuccess }) => {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(phone);
      if (res.needsRegistration) setStep("register");
      else onAuthSuccess(res.checkUser, res.token);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = { ...form, phone };
      const res = await signup(payload);
      onAuthSuccess(res.checkUser, res.token);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <motion.div
      className="
        relative w-full max-w-lg
        rounded-[30px]
        border border-white/14
        bg-white/6
        backdrop-blur-3xl
        px-8 py-9
        shadow-[0_40px_120px_rgba(0,0,0,0.95)]
        overflow-hidden
      "
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* warm blobs like the reference card */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,179,107,0.27),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(245,138,69,0.25),transparent_55%)] opacity-90" />

      <AnimatePresence mode="wait">
        {step === "phone" && (
          <motion.div
            key="phone-step"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 text-center"
          >
            <p className="inline-flex rounded-full border border-white/20 px-3 py-1 text-[10px] tracking-[0.18em] uppercase text-[#f5c98a] bg-black/40 mb-4">
              Welcome Back!
            </p>
            {/* <h2 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Welcome 
            </h2> */}
            <p className="mt-2 text-xs md:text-sm text-slate-200/80 max-w-md mx-auto">
              Sign in with your phone to access your personalized deals, orders
              and payments. Be the first to experience what&apos;s next.
            </p>

            <form
              onSubmit={handlePhoneSubmit}
              className="mt-7 space-y-3.5 max-w-sm mx-auto text-left"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-slate-100/90">
                  Phone number
                </label>
                <input
                  type="tel"
                  className="
                    rounded-[999px] border border-white/18
                    bg-black/70
                    px-4 py-2.5 text-sm text-slate-50
                    outline-none
                    placeholder:text-slate-400/80
                    focus:border-white/70 focus:ring-2 focus:ring-white/30
                  "
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="
                  w-full rounded-[999px]
                  border border-white/40
                  bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)]
                  bg-black/80
                  text-slate-50
                  py-2.5 text-sm font-semibold
                  shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_24px_60px_rgba(0,0,0,0.95)]
                  hover:bg-white/8 hover:border-white/80
                  disabled:opacity-60 disabled:shadow-none
                  transition-all duration-200
                "
              >
                {loading ? "Checking..." : "Submit"}
              </motion.button>
            </form>

            {error && (
              <p className="mt-3 text-xs text-red-300 text-center">{error}</p>
            )}

            <p className="mt-6 text-[11px] text-slate-200/80">
              Already used ShopBot before? Enter your phone and we will bring
              your account back.
            </p>
          </motion.div>
        )}

        {step === "register" && (
          <motion.div
            key="register-step"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 text-left"
          >
            <h2 className="text-2xl font-semibold text-slate-50">
              Create account
            </h2>
            <p className="mt-2 text-xs md:text-sm text-slate-200/80 max-w-md">
              We couldn&apos;t find this phone number. Complete your details to
              continue.
            </p>

            <form
              onSubmit={handleRegisterSubmit}
              className="mt-6 space-y-3.5"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-slate-100/90">
                  Full name
                </label>
                <input
                  type="text"
                  className="
                    rounded-[14px] border border-white/18
                    bg-black/70
                    px-3.5 py-2.5 text-sm text-slate-50
                    outline-none
                    placeholder:text-slate-400/80
                    focus:border-white/70 focus:ring-2 focus:ring-white/30
                  "
                  value={form.name}
                  onChange={handleChange("name")}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-slate-100/90">
                  Email (optional)
                </label>
                <input
                  type="email"
                  className="
                    rounded-[14px] border border-white/18
                    bg-black/70
                    px-3.5 py-2.5 text-sm text-slate-50
                    outline-none
                    placeholder:text-slate-400/80
                    focus:border-white/70 focus:ring-2 focus:ring-white/30
                  "
                  value={form.email}
                  onChange={handleChange("email")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-slate-100/90">
                  Address (optional)
                </label>
                <input
                  type="text"
                  className="
                    rounded-[14px] border border-white/18
                    bg-black/70
                    px-3.5 py-2.5 text-sm text-slate-50
                    outline-none
                    placeholder:text-slate-400/80
                    focus:border-white/70 focus:ring-2 focus:ring-white/30
                  "
                  value={form.address}
                  onChange={handleChange("address")}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="
                  w-full rounded-[999px]
                  border border-white/40
                  bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)]
                  bg-black/80
                  text-slate-50
                  py-2.5 text-sm font-semibold
                  shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_24px_60px_rgba(0,0,0,0.95)]
                  hover:bg-white/8 hover:border-white/80
                  disabled:opacity-60 disabled:shadow-none
                  transition-all duration-200
                "
              >
                {loading ? "Registering..." : "Register"}
              </motion.button>
            </form>

            <button
              type="button"
              onClick={() => setStep("phone")}
              className="mt-5 text-[11px] text-[#f5c98a] hover:text-white/90 transition-colors"
            >
              ← Back to phone
            </button>

            {error && (
              <p className="mt-3 text-xs text-red-300 text-center">{error}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PhonePmt;