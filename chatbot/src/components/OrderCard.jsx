import { motion } from "framer-motion";
import { FiPackage } from "react-icons/fi";

function OrderCard({ order }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="
        w-full max-w-md
        rounded-[26px]
        bg-black/80
        border border-white/14
        backdrop-blur-3xl
        shadow-[0_26px_80px_rgba(0,0,0,0.95)]
        p-3 flex gap-3 overflow-hidden
      "
    >
      {order.imageURL && (
        <img
          src={order.imageURL}
          alt={order.productName}
          onError={(e) => (e.target.style.display = "none")}
          className="h-16 w-16 rounded-[18px] object-cover"
        />
      )}

      <div className="flex flex-col justify-between text-left">
        <div className="flex items-center gap-2">
          <FiPackage className="text-[#f5c98a]" size={16} />
          <h3 className="text-[14px] font-semibold text-slate-50">
            {order.productName}
          </h3>
        </div>

        <p
          className="
            inline-flex w-fit rounded-full
            bg-white/8 text-[11px]
            px-3 py-0.5 font-medium
            text-slate-50 mt-1 border border-white/20
          "
        >
          Status: {order.status}
        </p>
      </div>
    </motion.div>
  );
}

export default OrderCard;
