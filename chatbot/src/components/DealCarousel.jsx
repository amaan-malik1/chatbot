import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const DealCarousel = ({ deals = [], initialIndex = 0, onClose }) => {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  if (!deals.length) return null;

  const goPrev = () =>
    setIndex((prev) => (prev - 1 + deals.length) % deals.length);
  const goNext = () => setIndex((prev) => (prev + 1) % deals.length);

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed inset-0 z-40
          flex items-center justify-center
          bg-black/80
          backdrop-blur-3xl
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* background glows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(245,179,107,0.22),transparent_55%),radial-gradient(circle_at_right,rgba(245,138,69,0.2),transparent_55%)] opacity-80" />

        {/* close button */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute top-6 right-6
            h-9 w-9 rounded-full
            flex items-center justify-center
            border border-white/40
            bg-black/80
            text-slate-50
            shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_20px_45px_rgba(0,0,0,0.95)]
            hover:bg-white/10 hover:border-white/80
            transition-all duration-200
          "
        >
          <FiX size={16} />
        </button>

        <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
          {/* arrows outside the card */}
          <button
            type="button"
            onClick={goPrev}
            className="
              absolute left-6 md:left-10
              h-10 w-10 rounded-full
              flex items-center justify-center
              border border-white/40
              bg-black/80
              text-slate-50
              shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_20px_45px_rgba(0,0,0,0.95)]
              hover:bg-white/10 hover:border-white/80
              transition-all duration-200
            "
          >
            <FiChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="
              absolute right-6 md:right-10
              h-10 w-10 rounded-full
              flex items-center justify-center
              border border-white/40
              bg-black/80
              text-slate-50
              shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_20px_45px_rgba(0,0,0,0.95)]
              hover:bg-white/10 hover:border-white/80
              transition-all duration-200
            "
          >
            <FiChevronRight size={18} />
          </button>

          {/* 3D carousel cards */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {deals.map((deal, i) => {
              const offset = i - index;
              if (offset < -2 || offset > 2) return null; // only show near cards

              const abs = Math.abs(offset);
              const x = offset * 260;
              const scale = offset === 0 ? 1 : 0.78;
              const rotateY = offset * -18;
              const opacity = offset === 0 ? 1 : 0.5;
              const blur = offset === 0 ? "0px" : "1.5px";

              return (
                <motion.div
                  key={deal._id || i}
                  className="
                    absolute
                    w-[65%] max-w-md
                    h-[75%]
                    rounded-[28px]
                    border border-white/16
                    bg-black/85
                    backdrop-blur-3xl
                    overflow-hidden
                    shadow-[0_40px_120px_rgba(0,0,0,0.95)]
                    flex flex-col
                  "
                  style={{
                    filter: `blur(${blur})`,
                    zIndex: 20 - abs,
                  }}
                  animate={{
                    x,
                    scale,
                    opacity,
                    rotateY,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 20,
                  }}
                >
                  {deal.imageURL && (
                    <div className="relative h-3/4 w-full overflow-hidden">
                      <img
                        src={deal.imageURL}
                        alt={deal.title}
                        onError={(e) => (e.target.style.display = "none")}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                    </div>
                  )}

                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-[15px] font-semibold text-slate-50">
                        {deal.title}
                      </h3>
                      <p className="mt-2 text-[12px] text-slate-200/85 line-clamp-3">
                        {deal.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-[#f6d29e]">
                        ₹{deal.price}
                      </span>
                      <button
                        type="button"
                        className="
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
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DealCarousel;