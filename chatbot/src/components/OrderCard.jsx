import { motion } from "framer-motion";
import { FiPackage } from "react-icons/fi";

function OrderCard({ order }) {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow hover:shadow-lg transition"
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
    >
      {order.imageURL && (
        <img
          src={order.imageURL}
          alt={order.productName}
          className="w-full h-32 object-cover rounded-xl mb-3"
          onError={(e) => (e.target.style.display = "none")}
        />
      )}

      <h3 className="flex items-center gap-2 text-gray-800 font-semibold">
        <FiPackage className="text-indigo-500" />
        {order.productName}
      </h3>

      <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
        Status: {order.status}
      </span>
    </motion.div>
  );
}

export default OrderCard;