import api from "../api/axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// ─── Chat API ───

/**
 * Send a message and get a streaming response.
 * Returns a ReadableStream reader for SSE consumption.
 */
export const sendMessageStream = async (message, chatId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message, chatId }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response;
};

/** Get all chats for the sidebar (sorted by updatedAt) */
export const getAllChats = async () => {
  const res = await api.get("/chat");
  return res.data;
};

/** Get a single chat by ID (with full messages) */
export const getChatById = async (chatId) => {
  const res = await api.get(`/chat/${chatId}`);
  return res.data;
};

/** Create a new empty chat */
export const createNewChat = async () => {
  const res = await api.post("/chat/new");
  return res.data;
};

// ─── Upload API ───

/** Upload a file (PDF) */
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ─── Auth API ───

export const loginUser = async (email, password) => {
  const res = await api.post("/login", { email, password });
  return res.data;
};

export const registerUser = async (name, email, password) => {
  const res = await api.post("/register", { name, email, password });
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/logout");
  return res.data;
};
