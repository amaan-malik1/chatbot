// utils/msgDetector.js
export const msgDetector = (message) => {
  // make sure it's a string
  const text = String(message || "").toLowerCase();

  // DEALS intent
  if (
    text.includes("deal") ||
    text.includes("offer") ||
    text.includes("discount") ||
    text.includes("new deals")
  ) {
    return "DEALS";
  }

  // ORDERS intent
  if (
    text.includes("order") ||
    text.includes("orders") ||
    text.includes("order history") ||
    text.includes("my orders")
  ) {
    return "ORDERS";
  }

  // PAYMENT intent
  if (
    text.includes("payment") ||
    text.includes("pending") ||
    text.includes("pay status") ||
    text.includes("payment status")
  ) {
    return "PAYMENT";
  }

  // REGISTER intent
  if (
    text.includes("register") ||
    text.includes("sign up") ||
    text.includes("new user")
  ) {
    return "REGISTER";
  }

  // fallback
  return "UNKNOWN";
};
