import { motion } from "framer-motion";
import { FiCreditCard } from "react-icons/fi";

const PaymentCard = ({ payment }) => {
  const order = payment.orderId || {};
  const label =
    order.productName || `Order #${String(payment.orderId).slice(-6)}`;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="
        w-full max-w-md
        rounded-[26px]
        bg-black/80
        border border-white/14
        backdrop-blur-3xl
        shadow-[0_26px_80px_rgba(0,0,0,0.95)]
        p-4 flex flex-col gap-2 text-left
      "
    >
      <div className="flex items-center gap-2">
        <FiCreditCard className="text-[#f5c98a]" size={16} />
        <h3 className="text-[14px] font-semibold text-slate-50">
          {label}
        </h3>
      </div>

      <p className="text-[12px] text-slate-100/90">
        Paid:{" "}
        <span className="font-semibold text-[#f6d29e]">
          ₹{payment.amountPaid}
        </span>
      </p>

      <p className="text-[12px] text-slate-100/90">
        Pending:{" "}
        <span
          className={`font-semibold ${
            payment.pendingAmount ? "text-amber-300" : "text-[#f6d29e]"
          }`}
        >
          ₹{payment.pendingAmount}
        </span>
      </p>
    </motion.div>
  );
};

export default PaymentCard;