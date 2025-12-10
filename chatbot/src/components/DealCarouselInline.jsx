import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const DealCarouselInline = ({ deals = [] }) => {
  const [index, setIndex] = useState(0);
  if (!deals.length) return null;

  const len = deals.length;

  const clampIndex = (value) => {
    if (!len) return 0;
    return ((value % len) + len) % len;
  };

  const goPrev = (e) => {
    e.stopPropagation();
    setIndex((prev) => clampIndex(prev - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setIndex((prev) => clampIndex(prev + 1));
  };

  return (
    <div
      className="
        relative w-full max-w-4xl
        h-[260px] md:h-[320px]
        flex items-center justify-center
        overflow-hidden
      "
      style={{ perspective: "1200px" }}
    >
      {/* arrows OUTSIDE the card */}
      <button
        type="button"
        onClick={goPrev}
        className="
          absolute left-2 md:left-4
          h-9 w-9 rounded-full
          flex items-center justify-center
          border border-white/40
          bg-black/80
          text-slate-50
          shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_16px_36px_rgba(0,0,0,0.95)]
          hover:bg-white/10 hover:border-white/80
          transition-all duration-200
          z-30
        "
      >
        <FiChevronLeft size={18} />
      </button>

      <button
        type="button"
        onClick={goNext}
        className="
          absolute right-2 md:right-4
          h-9 w-9 rounded-full
          flex items-center justify-center
          border border-white/40
          bg-black/80
          text-slate-50
          shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_16px_36px_rgba(0,0,0,0.95)]
          hover:bg-white/10 hover:border-white/80
          transition-all duration-200
          z-30
        "
      >
        <FiChevronRight size={18} />
      </button>

      {/* cards with 3D effect */}
      <div className="relative w-full h-full flex items-center justify-center">
        {deals.map((deal, i) => {
          // normalized offset based on current index
          const rawOffset = i - index;
          const wrappedOffset =
            ((rawOffset + len + Math.floor(len / 2)) % len) -
            Math.floor(len / 2); // keeps offsets in small range

          if (wrappedOffset < -2 || wrappedOffset > 2) return null;

          const abs = Math.abs(wrappedOffset);
          const x = wrappedOffset * 260;
          const scale = wrappedOffset === 0 ? 1 : 0.78;
          const rotateY = wrappedOffset * -18;
          const opacity = wrappedOffset === 0 ? 1 : 0.5;
          const blur = wrappedOffset === 0 ? "0px" : "1.5px";

          return (
            <motion.div
              key={deal._id || i}
              className="
                absolute
                w-[60%] md:w-[320px]
                h-[92%]
                rounded-[26px]
                overflow-hidden
                border border-white/16
                bg-black/85
                backdrop-blur-3xl
                shadow-[0_32px_110px_rgba(0,0,0,0.95)]
                flex flex-col
              "
              style={{
                filter: `blur(${blur})`,
                zIndex: 20 - abs,
              }}
              animate={{
                x,
                scale,
                rotateY,
                opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 20,
              }}
            >
              {deal.imageURL && (
                <div className="relative h-[70%] w-full overflow-hidden">
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
                    View Offer
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DealCarouselInline;
