import { motion } from "framer-motion";
import { FiTag } from "react-icons/fi";

function DealCard({ deal, onView }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="
        w-64 shrink-0
        rounded-[26px]
        bg-black/80
        border border-white/14
        backdrop-blur-3xl
        shadow-[0_26px_80px_rgba(0,0,0,0.95)]
        overflow-hidden
        flex flex-col
      "
    >
      {deal.imageURL && (
        <img
          src={deal.imageURL}
          alt={deal.title}
          onError={(e) => (e.target.style.display = "none")}
          className="h-40 w-full object-cover"
        />
      )}

      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start gap-2">
          <FiTag className="mt-0.5 text-[#f5c98a]" size={16} />
          <h3 className="text-[14px] font-semibold text-slate-50">
            {deal.title}
          </h3>
        </div>

        <p className="text-[12px] text-slate-200/80 line-clamp-2">
          {deal.description}
        </p>

        <p className="text-sm font-bold text-[#f6d29e]">₹{deal.price}</p>

        <button
          type="button"
          onClick={onView}
          className="
            mt-1 self-start
            rounded-full
            border border-white/40
            bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_55%)]
            bg-black/80
            text-[11px] font-semibold text-slate-50
            py-1.5 px-4
            shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_16px_40px_rgba(0,0,0,0.9)]
            hover:bg-white/8 hover:border-white/75
            transition-all duration-200
          "
        >
          View Offer
        </button>
      </div>
    </motion.div>
  );
}

export default DealCard;
