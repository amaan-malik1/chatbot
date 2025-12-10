// src/components/MessageBubble.jsx
import { motion } from "framer-motion";

function MessageBubble({ from, text, className = "" }) {
  const isUser = from === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={`
        max-w-[72%]
        px-4 py-2.5
        text-[13px] leading-snug
        rounded-[20px]
        border backdrop-blur-2xl
        shadow-[0_18px_45px_rgba(0,0,0,0.9)]
        ${isUser
          ? "bg-white/10 border-white/25 text-slate-50 rounded-br-[6px]"
          : "bg-black/80 border-white/15 text-slate-50 rounded-bl-[6px]"
        }
        ${className}
      `}
    >
      {text.split("\n").map((line, idx) => (
        <p key={idx} className={idx > 0 ? "mt-1" : ""}>
          {line}
        </p>
      ))}
    </motion.div>
  );
}

export default MessageBubble;
