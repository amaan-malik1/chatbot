import { motion } from "framer-motion";
import { FiTag } from "react-icons/fi";

function DealCard({ deal }) {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow hover:shadow-lg transition flex flex-col"
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
    >
      {deal.imageURL && (
        <div className="mb-3">
          <img
            src={deal.imageURL}
            alt={deal.title}
            className="w-full h-32 object-cover rounded-xl"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
      )}

      <h3 className="flex items-center gap-2 text-gray-800 font-semibold">
        <FiTag className="text-purple-500" />
        {deal.title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">{deal.description}</p>

      <p className="text-lg font-bold text-purple-600 mt-2">₹{deal.price}</p>

      <motion.button
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.05 }}
        type="button"
        className="mt-3 ml-auto px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-semibold shadow"
      >
        View Offer
      </motion.button>
    </motion.div>
  );
}

export default DealCard;