// src/components/PaymentCard.jsx
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
        w-full max-w-md rounded-2xl
        bg-[#0d121b]/80 backdrop-blur-xl
        border border-slate-700/60
        shadow-[0_8px_25px_rgba(0,0,0,0.35)]
        p-4 flex flex-col gap-2 text-left
      "
    >
      <div className="flex items-center gap-2">
        <FiCreditCard className="text-emerald-400" size={15} />
        <h3 className="text-[14px] font-semibold text-slate-100">
          {label}
        </h3>
      </div>

      <p className="text-[12px] text-slate-300">
        Paid:{" "}
        <span className="font-semibold text-emerald-400">
          ₹{payment.amountPaid}
        </span>
      </p>

      <p className="text-[12px] text-slate-300">
        Pending:{" "}
        <span
          className={`font-semibold ${
            payment.pendingAmount
              ? "text-amber-400"
              : "text-emerald-400"
          }`}
        >
          ₹{payment.pendingAmount}
        </span>
      </p>
    </motion.div>
  );
};

export default PaymentCard;
