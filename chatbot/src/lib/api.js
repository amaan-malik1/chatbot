export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://chatbot-psrv.onrender.com";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  const { method = "GET", body, headers: customHeaders = {} } = options;

  const headers = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  // send JWT in header as well (backend supports Bearer or cookie)
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body,
    credentials: "include", // so cookie 'jwt' is sent too
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    // no
  }

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

// login: send { phone }
export function login(phone) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
}

// signup: send { name, phone, email, address }
export function signup(signupData) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(signupData),
  });
}

// chat: send { message }
export function sendChat(message) {
  return request("/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}

export function fetchDeals() {
  return request("/data/deals");
}

export function fetchOrders() {
  return request("/data/orders");
}

export function fetchPayments() {
  return request("/data/payments");
}
