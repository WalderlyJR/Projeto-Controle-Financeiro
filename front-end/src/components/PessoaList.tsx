import React, { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../api/api";
import type { Pessoa } from "../types/Pessoa";

export default function PessoaList() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await apiGet<Pessoa[]>("pessoas");
      setPessoas(data || []);
    } catch (err) {
      setPessoas([]);
      console.error(err);
    } finally { setLoading(false); }
  }

  useEffect(()=> {
    load();
    const h = ()=> load();
    window.addEventListener("pessoas:changed", h);
    return ()=> window.removeEventListener("pessoas:changed", h);
  }, []);

  async function remover(id:number) {
    if (!confirm("Confirma exclusão?")) return;
    try {
      await apiDelete(`pessoas/${id}`);
      load();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      alert("Erro ao excluir: " + message);
    }
  }

  return (
    <div className="card p-3">
      <h5>Pessoas</h5>
      {loading ? <div>Carregando...</div> : (
        <table className="table table-striped">
          <thead><tr><th>Nome</th><th>Idade</th><th style={{width:150}}>Ações</th></tr></thead>
          <tbody>
            {pessoas.map(p => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.idade}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>alert("Editar opcional")}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>remover(p.id)}>Excluir</button>
                </td>
              </tr>
            ))}
            {pessoas.length === 0 && <tr><td colSpan={3}>Sem pessoas</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  );
}
