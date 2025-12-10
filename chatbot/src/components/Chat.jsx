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
        text: `Hi ${user.name}! 
I'm ShopBot, your shopping assistant.
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
        flex flex-col
        h-full w-full
      "
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* chat messages */}
      <div
        className="
          flex-1 min-h-0 overflow-y-auto
          px-3 md:px-4 py-3
          space-y-3
          scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/15
        "
      >
        {messages.map((msg, idx) => (
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
                {/* you can plug your TypewriterEffect component around MessageBubble for the first bot msg if desired */}
                <MessageBubble
                  from={msg.from}
                  text={msg.text}
                  className={
                    idx === 0 && msg.from === "bot" ? "typewriter" : ""
                  }
                />
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

            {/* quick reply buttons – like “Book a Free Call / See Projects” */}
            {msg.buttons?.length > 0 && msg.from === "bot" && (
              <div className="mt-1 flex flex-wrap gap-2">
                {msg.buttons.map((b) => (
                  <motion.button
                    key={b}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSend(b)}
                    className="
                      px-4 py-2 text-[12px] font-medium
                      rounded-full
                      border border-white/40
                      bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)]
                      bg-black/80
                      text-slate-50
                      shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_18px_40px_rgba(0,0,0,0.9)]
                      hover:bg-white/6 hover:border-white/70
                      transition-all duration-200
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

      {/* Input bar – glass like waitlist form */}
      <form
        onSubmit={handleSubmit}
        className="
          flex items-center gap-3
          px-4 py-3
          border-t border-white/10
          bg-black/60
          backdrop-blur-2xl
        "
      >
        <div
          className="
            flex-1 flex items-center
            rounded-full
            border border-white/20
            bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]
            bg-black/80
            px-4 py-[10px]
            shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_24px_60px_rgba(0,0,0,0.95)]
          "
        >
          <input
            type="text"
            placeholder="Type your request…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="
              flex-1 bg-transparent text-[14px] text-slate-50 outline-none
              placeholder:text-slate-400/80
            "
          />
        </div>

        <motion.button
          whileHover={{ scale: sending ? 1 : 1.03 }}
          whileTap={{ scale: sending ? 1 : 0.95 }}
          type="submit"
          disabled={sending}
          className="
            px-5 py-2 text-sm font-medium
            rounded-full
            border border-white/40
            bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)]
            bg-black/80
            text-slate-50
            shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_20px_45px_rgba(0,0,0,0.95)]
            hover:bg-white/8 hover:border-white/80
            disabled:opacity-50 disabled:shadow-none
            transition-all duration-200
          "
        >
          {sending ? "…" : "Send"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Chat;
