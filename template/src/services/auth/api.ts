import api from "@/services/api";

export async function getCurrentUser() {
  const { data } = await api.get("/auth/me");
  return data;
}

export async function logIn(body: {
  email: string;
  password: string;
}): Promise<{ user: { id: string; email: string }; token: string }> {
  const { data } = await api.post("/auth/login", body);

  return {
    user: data.user,
    token: data.token,
  };
}

export function logOut() {
  return api.delete("/auth/me");
}

export async function forgotPassword(body: { email: string }) {
  return await api.post("/auth/forgot-password", body);
}

export function register(body: {
  email: string;
  password: string;
}) {
  return api.post("/auth/register", body);
}
