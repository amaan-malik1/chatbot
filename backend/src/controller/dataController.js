import { dealsModel, orderModel, paymentModel } from "../model/user.js";

export const getDeals = async (req, res) => {
  try {
    const allDeals = await dealsModel.find({});
    res.json({
      success: true,
      dealsList: allDeals,
    });
  } catch (error) {
    console.error("Get deals error", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await orderModel.find({ userId });

    res.json({
      success: true,
      forHimAllOrders: orders,
    });
  } catch (error) {
    console.error("Get orders error", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await paymentModel.find({}).populate("orderId");
    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error("Get payments error", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
