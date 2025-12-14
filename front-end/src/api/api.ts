//conexão com a api back-end
const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:5116/api";

// Função para lidar com a resposta da API
async function handleRes(res: Response) {
  if (!res.ok) {
    const txt = await res.text().catch(()=>res.statusText);
    throw new Error(txt || "API error");
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return null;
}

// Funções para fazer requisições GET, POST e DELETE
export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}/${endpoint}`);
  return handleRes(res) as Promise<T>;
}

// Função para fazer requisições POST
export async function apiPost<T>(endpoint: string, data: T): Promise<T> {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleRes(res) as Promise<T>;
}

// Função para fazer requisições DELETE
export async function apiDelete(endpoint: string) {
  const res = await fetch(`${API_URL}/${endpoint}`, { method: "DELETE" });
  return handleRes(res);
}
