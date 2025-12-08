// src/components/OrderCard.jsx
import { motion } from "framer-motion";
import { FiPackage } from "react-icons/fi";

function OrderCard({ order }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="
        w-full max-w-md rounded-2xl
        bg-[#0d121b]/80 backdrop-blur-xl
        border border-slate-700/60
        shadow-[0_8px_25px_rgba(0,0,0,0.35)]
        p-3 flex gap-3
      "
    >
      {order.imageURL && (
        <img
          src={order.imageURL}
          alt={order.productName}
          onError={(e) => (e.target.style.display = "none")}
          className="h-16 w-16 rounded-xl object-cover"
        />
      )}

      <div className="flex flex-col justify-between text-left">
        <div className="flex items-center gap-2">
          <FiPackage className="text-emerald-400" size={15} />
          <h3 className="text-[14px] font-semibold text-slate-100">
            {order.productName}
          </h3>
        </div>

        <p
          className="
            inline-flex w-fit rounded-full
            bg-slate-800/70 text-[11px]
            px-3 py-0.5 font-medium
            text-slate-200 mt-1
          "
        >
          Status: {order.status}
        </p>
      </div>
    </motion.div>
  );
}

export default OrderCard;
