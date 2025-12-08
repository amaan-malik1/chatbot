// src/lib/api.js

// Adjust if your backend port changes
export const BASE_URL = "http://localhost:3000/api/v1";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  const {
    method = "GET",
    body,
    headers: customHeaders = {},
  } = options;

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
    // no JSON body (e.g. 204) – ignore
  }

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

/* ---------- AUTH ---------- */

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

/* ---------- CHAT ---------- */

// chat: send { message }
export function sendChat(message) {
  return request("/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}

/* ---------- (optional) data APIs if you ever need them directly ---------- */

export function fetchDeals() {
  return request("/data/deals");
}

export function fetchOrders() {
  return request("/data/orders");
}

export function fetchPayments() {
  return request("/data/payments");
}
