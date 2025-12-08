import { motion } from "framer-motion";

function MessageBubble({ from, text }) {
  const isUser = from === "user";

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 30 : -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 180 }}
      className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow ${
        isUser
          ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-br-md"
          : "bg-white/90 text-gray-800 rounded-bl-md"
      }`}
    >
      {text.split("\n").map((l, i) => (
        <p key={i}>{l}</p>
      ))}
    </motion.div>
  );
}

export default MessageBubble;