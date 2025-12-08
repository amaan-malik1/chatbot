/* src/components/Chat.jsx  –  only UI changed */
import { useEffect, useRef, useState } from "react";
import { sendChat } from "../lib/api";
import MessageBubble from "./MessageBubble";
import DealCard from "./DealCard";
import OrderCard from "./OrderCard";
import PaymentCard from "./PaymentCard";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";

let msgId = 0;
const nextId = () => ++msgId;

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    setMessages([{
      id: nextId(), from: "bot", type: "text",
      text: `Hi ${user.name}! 👋\nI’m your shopping assistant.\nChoose an option:\n1. New Deals\n2. Orders\n3. Payment Status\n4. Others`,
      buttons: ["New Deals", "Orders", "Payment Status", "Others"],
    }]);
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (msg) => setMessages((prev) => [...prev, { ...msg, id: nextId() }]);

  const handleSend = async (text) => {
    const trimmed = text.trim(); if (!trimmed || sending) return;
    addMessage({ from: "user", type: "text", text: trimmed });
    setInput(""); setSending(true);
    try {
      const res = await sendChat(trimmed);
      addMessage({ from: "bot", type: "text", text: res.reply, buttons: res.buttons || [] });
      if (res.deals?.length) addMessage({ from: "bot", type: "deals", deals: res.deals });
      if (res.orders?.length) addMessage({ from: "bot", type: "orders", orders: res.orders });
      if (res.payments?.length) addMessage({ from: "bot", type: "payments", payments: res.payments });
    } catch (err) {
      addMessage({ from: "bot", type: "text", text: "Oops, something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e) => { e.preventDefault(); handleSend(input); };
  const handleQuickReply = (text) => handleSend(text);

  if (!user) return <div className="p-6">Loading user…</div>;

  return (
    <motion.div
      className="flex-1 flex flex-col bg-white/50 rounded-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              {msg.type === "text" && (
                <div className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <MessageBubble from={msg.from} text={msg.text} />
                </div>
              )}
              {msg.type === "deals" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {msg.deals.map((d) => <DealCard key={d._id} deal={d} />)}
                </div>
              )}
              {msg.type === "orders" && (
                <div className="space-y-3">
                  {msg.orders.map((o) => <OrderCard key={o._id} order={o} />)}
                </div>
              )}
              {msg.type === "payments" && (
                <div className="space-y-3">
                  {msg.payments.map((p) => <PaymentCard key={p._id} payment={p} />)}
                </div>
              )}
              {msg.buttons?.length > 0 && msg.from === "bot" && (
                <div className="flex flex-wrap gap-2">
                  {msg.buttons.map((b) => (
                    <motion.button
                      key={b}
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickReply(b)}
                      className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium"
                    >
                      {b}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-md border-t border-white/30">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message (e.g. show deals)"
          className="flex-1 px-4 py-3 rounded-2xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          disabled={sending}
          className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md"
        >
          {sending ? <span className="dots">…</span> : <FiSend />}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Chat;