// src/components/PhonePmt.jsx
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
        w-full max-w-md mt-4
        rounded-3xl border border-slate-800 bg-[#0b0f17]
        px-7 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.8)]
      "
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      <AnimatePresence mode="wait">
        {step === "phone" && (
          <motion.div
            key="phone-step"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-xs font-medium text-emerald-400 mb-1">
              Best Personal Shoping Assistant
            </p>
            <h2 className="text-xl font-semibold text-slate-50">
              Welcome back
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Sign in with your phone number to view deals, orders & payments.
            </p>

            <form onSubmit={handlePhoneSubmit} className="mt-5 space-y-3.5">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-medium text-slate-300">
                  Phone number
                </label>
                <input
                  type="tel"
                  className="
                    rounded-full border border-slate-700 bg-[#050812]
                    px-4 py-2.5 text-sm text-slate-100
                    outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400
                    placeholder:text-slate-500
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
                  w-full rounded-full
                  bg-emerald-500 text-slate-950
                  py-2.5 text-sm font-semibold
                  shadow-[0_12px_30px_rgba(16,185,129,0.4)]
                  hover:bg-emerald-400 disabled:opacity-60
                  transition
                "
              >
                {loading ? "Checking..." : "Continue"}
              </motion.button>
            </form>

            {error && (
              <p className="mt-3 text-xs text-red-400 text-center">{error}</p>
            )}

            <p className="mt-5 text-[11px] text-center text-slate-500">
              New here? We’ll help you create an account in the next step.
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
          >
            <h2 className="text-xl font-semibold text-slate-50">
              Create account
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              We couldn&apos;t find this phone number. Complete your details to
              continue.
            </p>

            <form
              onSubmit={handleRegisterSubmit}
              className="mt-5 space-y-3.5 text-left"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Full name
                </label>
                <input
                  type="text"
                  className="
                    rounded-xl border border-slate-700 bg-[#050812]
                    px-3.5 py-2.5 text-sm text-slate-100
                    outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400
                    placeholder:text-slate-500
                  "
                  value={form.name}
                  onChange={handleChange("name")}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Email (optional)
                </label>
                <input
                  type="email"
                  className="
                    rounded-xl border border-slate-700 bg-[#050812]
                    px-3.5 py-2.5 text-sm text-slate-100
                    outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400
                    placeholder:text-slate-500
                  "
                  value={form.email}
                  onChange={handleChange("email")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Address (optional)
                </label>
                <input
                  type="text"
                  className="
                    rounded-xl border border-slate-700 bg-[#050812]
                    px-3.5 py-2.5 text-sm text-slate-100
                    outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400
                    placeholder:text-slate-500
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
                  w-full rounded-full
                  bg-emerald-500 text-slate-950
                  py-2.5 text-sm font-semibold
                  shadow-[0_12px_30px_rgba(16,185,129,0.4)]
                  hover:bg-emerald-400 disabled:opacity-60
                  transition
                "
              >
                {loading ? "Registering..." : "Register"}
              </motion.button>
            </form>

            <button
              type="button"
              onClick={() => setStep("phone")}
              className="mt-4 text-xs text-emerald-400 hover:text-emerald-300"
            >
              ← Back to phone
            </button>

            {error && (
              <p className="mt-2 text-xs text-red-400 text-center">{error}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PhonePmt;