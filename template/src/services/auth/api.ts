import api from "@/services/api";

export async function getCurrentUser() {
  const { data } = await api.get("/users/me");
  return data;
}

export async function logIn(body: {
  email: string;
  password: string;
}): Promise<{ user: {}; token: string | null }> {
  const { data } = await api.post("/login", body);

  return {
    user: data.user,
    token: data.token,
  };
}

export function logOut() {
  return api.delete("/logout");
}
