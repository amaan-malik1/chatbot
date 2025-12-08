import { motion } from "framer-motion";
import { FiCreditCard } from "react-icons/fi";

const PaymentCard = ({ payment }) => {
  const order = payment.orderId || {};
  const label =
    order.productName || `Order #${String(payment.orderId).slice(-6)}`;

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow hover:shadow-lg transition"
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
    >
      <h3 className="flex items-center gap-2 text-gray-800 font-semibold">
        <FiCreditCard className="text-purple-500" />
        {label}
      </h3>

      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p>Paid: <span className="font-medium text-green-600">₹{payment.amountPaid}</span></p>
        <p>Pending: <span className="font-medium text-amber-600">₹{payment.pendingAmount}</span></p>
      </div>
    </motion.div>
  );
};

export default PaymentCard;