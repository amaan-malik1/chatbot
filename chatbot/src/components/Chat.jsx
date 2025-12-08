// src/components/Chat.jsx
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { sendChat } from "../lib/api";
import MessageBubble from "./MessageBubble";
import DealCard from "./DealCard";
import OrderCard from "./OrderCard";
import PaymentCard from "./PaymentCard";

let msgId = 0;
const nextId = () => ++msgId;

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  // initial bot msg
  useEffect(() => {
    if (!user) return;

    setMessages([
      {
        id: nextId(),
        from: "bot",
        type: "text",
        text: `Hi ${user.name}! 👋
I'm Mobo, your shopping assistant.
Try "New Deals", "Orders", "Payment Status" or "Others".`,
        buttons: ["New Deals", "Orders", "Payment Status", "Others"],
      },
    ]);
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (msg) =>
    setMessages((prev) => [...prev, { ...msg, id: nextId() }]);

  const handleSend = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    addMessage({ from: "user", type: "text", text: trimmed });
    setInput("");
    setSending(true);

    try {
      const res = await sendChat(trimmed);

      addMessage({
        from: "bot",
        type: "text",
        text: res.reply,
        buttons: res.buttons || [],
      });

      if (res.deals?.length)
        addMessage({ from: "bot", type: "deals", deals: res.deals });
      if (res.orders?.length)
        addMessage({ from: "bot", type: "orders", orders: res.orders });
      if (res.payments?.length)
        addMessage({ from: "bot", type: "payments", payments: res.payments });
    } catch {
      addMessage({
        from: "bot",
        type: "text",
        text: "Something went wrong. Try again.",
      });
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
  };

  if (!user) return null;

  return (
    <motion.div
      className="
        flex flex-col h-[75vh] max-w-3xl w-full mx-auto
        bg-[#111318] rounded-[28px] border border-slate-800 shadow-xl
      "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* chat messages */}
      <div
        className="
          flex-1 min-h-0 overflow-y-auto px-4 md:px-6 py-4
          space-y-3 scrollbar-thin scrollbar-track-[#0d0f12] scrollbar-thumb-slate-600
        "
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: msg.from === "user" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* text bubble */}
            {msg.type === "text" && (
              <div
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <MessageBubble from={msg.from} text={msg.text} />
              </div>
            )}

            {/* deals slider */}
            {msg.type === "deals" && (
              <div className="flex justify-start">
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {msg.deals.map((deal) => (
                    <DealCard key={deal._id} deal={deal} />
                  ))}
                </div>
              </div>
            )}

            {/* orders */}
            {msg.type === "orders" && (
              <div className="flex justify-start">
                <div className="flex flex-col gap-3">
                  {msg.orders.map((order) => (
                    <OrderCard key={order._id} order={order} />
                  ))}
                </div>
              </div>
            )}

            {/* payments */}
            {msg.type === "payments" && (
              <div className="flex justify-start">
                <div className="flex flex-col gap-3">
                  {msg.payments.map((payment) => (
                    <PaymentCard key={payment._id} payment={payment} />
                  ))}
                </div>
              </div>
            )}

            {/* quick reply buttons */}
            {msg.buttons?.length > 0 && msg.from === "bot" && (
              <div className="mt-2 flex flex-wrap gap-2">
                {msg.buttons.map((b) => (
                  <motion.button
                    key={b}
                    onClick={() => handleSend(b)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.92 }}
                    className="
                      px-3 py-1 rounded-full
                      bg-[#1a1d22] text-slate-200 text-[12px]
                      border border-slate-700
                      hover:bg-[#272b30] transition
                    "
                  >
                    {b}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <form
        onSubmit={handleSubmit}
        className="
          flex items-center gap-3 px-4 md:px-6 py-4
          border-t border-slate-800 bg-[#0d0f12]/80 backdrop-blur-md
        "
      >
        <div
          className="
            flex-1 flex items-center rounded-full
            bg-[#1a1d22] border border-slate-700 px-4 py-2
            shadow-inner
          "
        >
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="
              flex-1 bg-transparent text-[14px] text-slate-200 outline-none
              placeholder:text-slate-500
            "
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={sending}
          className="
            px-5 py-2 rounded-full
            bg-[#4ade80] text-black font-semibold text-sm
            hover:bg-[#22c55e] transition disabled:opacity-50
          "
        >
          {sending ? "..." : "Send"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Chat;
