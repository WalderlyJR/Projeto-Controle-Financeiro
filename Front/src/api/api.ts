const API_URL = "http://localhost:5116/api";

export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}/${endpoint}`);
  return res.json();
}

export async function apiPost<T>(endpoint: string, data: T): Promise<T> {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function apiDelete(endpoint: string) {
  return fetch(`${API_URL}/${endpoint}`, { method: "DELETE" });
}
