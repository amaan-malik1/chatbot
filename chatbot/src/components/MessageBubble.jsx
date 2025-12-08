// src/components/MessageBubble.jsx
import { motion } from "framer-motion";

function MessageBubble({ from, text }) {
  const isUser = from === "user";

  return (
    <motion.div
      className={`max-w-[72%] rounded-2xl px-4 py-2 text-[13px] leading-snug shadow-sm ${
        isUser
          ? "bg-slate-900 text-slate-50 rounded-br-md"
          : "bg-white text-slate-900 rounded-bl-md"
      }`}
    >
      {text.split("\n").map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </motion.div>
  );
}

export default MessageBubble;
