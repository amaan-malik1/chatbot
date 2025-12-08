// src/components/DealCard.jsx
import { motion } from "framer-motion";
import { FiTag } from "react-icons/fi";

function DealCard({ deal }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -3 }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      className="
        w-64 shrink-0 rounded-2xl
        bg-[#0e141f]/80 backdrop-blur-xl
        border border-slate-700/60
        shadow-[0_8px_30px_rgba(0,0,0,0.45)]
        p-4 flex flex-col gap-3
      "
    >
      {deal.imageURL && (
        <img
          src={deal.imageURL}
          alt={deal.title}
          onError={(e) => (e.target.style.display = "none")}
          className="h-32 w-full rounded-xl object-cover"
        />
      )}

      <div className="flex items-start gap-2">
        <FiTag className="mt-0.5 text-emerald-400" size={15} />
        <h3 className="text-[14px] font-semibold text-slate-100">
          {deal.title}
        </h3>
      </div>

      <p className="text-[12px] text-slate-400 line-clamp-2">
        {deal.description}
      </p>

      <p className="text-sm font-bold text-emerald-400">₹{deal.price}</p>

      <button
        type="button"
        className="
          mt-1 rounded-full bg-emerald-500 
          text-slate-900 text-[11px] font-semibold
          py-1.5 px-4 self-start
          hover:bg-emerald-400 transition
        "
      >
        View Offer
      </button>
    </motion.div>
  );
}

export default DealCard;
