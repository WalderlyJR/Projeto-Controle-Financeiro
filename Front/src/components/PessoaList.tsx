import { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../api/api";
import type { Pessoa } from "../types/Pessoa";

export default function PessoaList() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  async function load() {
    const data = await apiGet<Pessoa[]>("pessoas");
    setPessoas(data);
  }

  useEffect(() => {
    const fetchData = async () => { await load(); }
    fetchData();
  }, []);

  async function remover(id: number) {
    await apiDelete(`pessoas/${id}`);
    load();
  }

  return (
    <div>
      <h3>Pessoas cadastradas</h3>
      <ul>
        {pessoas.map((p) => (
          <li key={p.id}>
            {p.nome} — {p.idade} anos
            <button onClick={() => remover(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
