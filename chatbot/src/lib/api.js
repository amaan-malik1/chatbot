export const BASE_URL = "http://localhost:3000/api/v1"; // matches backend

async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`; // ✅ correct format
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export function login(phone) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
}

export function signup(signupData) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(signupData),
  });
}

export function sendChat(message) {
  return request("/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}
