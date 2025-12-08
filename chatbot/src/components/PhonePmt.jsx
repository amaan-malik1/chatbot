/* src/components/PhonePmt.jsx */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiPhone, FiUser, FiMail, FiMapPin } from "react-icons/fi";
import { login, signup } from "../lib/api.js";

const PhonePmt = ({ onAuthSuccess }) => {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await login(phone);
      res.needsRegistration ? setStep("register") : onAuthSuccess(res.checkUser, res.token);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await signup({ ...form, phone });
      onAuthSuccess(res.checkUser, res.token);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const Input = ({ icon, ...rest }) => (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
      <input
        {...rest}
        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/70 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
  );

  return (
    <motion.div
      className="max-w-md mx-auto bg-white/60 backdrop-blur-lg rounded-3xl shadow-lg p-8"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <AnimatePresence mode="wait">
        {step === "phone" && (
          <motion.form
            key="phone"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.25 }}
            onSubmit={handlePhoneSubmit}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-800">Welcome back 👋</h2>
            <p className="text-sm text-gray-500">Sign in with your phone number to continue.</p>
            <Input icon={<FiPhone />} type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-md"
            >
              {loading ? "Checking…" : <>Continue <FiArrowRight /></>}
            </motion.button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </motion.form>
        )}

        {step === "register" && (
          <motion.form
            key="register"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleRegisterSubmit}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-800">Create account ✨</h2>
            <p className="text-sm text-gray-500">We couldn’t find that number. Fill in a few details.</p>
            <Input icon={<FiUser />} placeholder="Full name" value={form.name} onChange={handleChange("name")} required />
            <Input icon={<FiMail />} type="email" placeholder="Email (optional)" value={form.email} onChange={handleChange("email")} />
            <Input icon={<FiMapPin />} placeholder="Address (optional)" value={form.address} onChange={handleChange("address")} />
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-md"
            >
              {loading ? "Registering…" : "Register"}
            </motion.button>
            <button type="button" onClick={() => setStep("phone")} className="text-sm text-purple-600">← Back to phone</button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PhonePmt;