const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:5116/api";

async function handleRes(res: Response) {
  if (!res.ok) {
    const txt = await res.text().catch(()=>res.statusText);
    throw new Error(txt || "API error");
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return null;
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}/${endpoint}`);
  return handleRes(res) as Promise<T>;
}

export async function apiPost<T>(endpoint: string, data: T): Promise<T> {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleRes(res) as Promise<T>;
}

export async function apiDelete(endpoint: string) {
  const res = await fetch(`${API_URL}/${endpoint}`, { method: "DELETE" });
  return handleRes(res);
}
