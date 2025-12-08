import { msgDetector } from "../utils/msgDetector.js";
import { dealsModel, orderModel, paymentModel } from "../model/user.js";

export const handleChat = async (req, res) => {
  const { message } = req.body;
  const userId = req.user?._id;

  try {
    console.log("📩 /chat called with:", { message, userId });

    if (!message) {
      return res.status(400).json({
        message: "Message is required!",
      });
    }

    const intent = msgDetector(message);
    console.log("🎯 Detected intent:", intent);

    let reply =
      "Sorry, I did not understand that. Please choose: New Deals, Orders, Payment Status or Others.";
    let deals = [];
    let orders = [];
    let payments = [];
    const buttons = ["New Deals", "Orders", "Payment Status", "Others"];

    switch (intent) {
      case "DEALS": {
        if (dealsModel?.find) {
          deals = await dealsModel.find({});
        }
        reply = "Here are our latest deals:";
        break;
      }

      case "ORDERS": {
        if (!userId) {
          reply = "Could not find your user. Please log in again.";
          break;
        }
        if (orderModel?.find) {
          orders = await orderModel.find({ userId });
        }
        reply =
          orders.length > 0 ? "Here is your order history:" : "No orders yet.";
        break;
      }

      case "PAYMENT": {
        if (!userId) {
          reply = "Could not find your user. Please log in again.";
          break;
        }

        // 1) orders for this user
        const userOrders = await orderModel
          .find({ userId })
          .select("_id productName");

        if (!userOrders.length) {
          reply = "You have no orders yet, so no payment records.";
          break;
        }

        const orderIds = userOrders.map((o) => o._id);

        // 2) payments for those orders
        payments = await paymentModel
          .find({ orderId: { $in: orderIds } })
          .populate("orderId"); // only if paymentSchema.orderId has ref: "Order"

        reply =
          payments.length > 0
            ? "Here is your payment status:"
            : "No payment records found.";
        break;
      }

      case "REGISTER": {
        reply =
          "You are already logged in. To register a new user, please log out.";
        break;
      }

      default: {
        // keep default reply
        break;
      }
    }

    return res.json({
      intent,
      reply,
      buttons,
      deals,
      orders,
      payments,
    });
  } catch (error) {
    console.log("❌ Error while handling Chat:", error);
    return res.status(500).json({
      message: error.message || "Internal Server error in handle chat",
    });
  }
};
