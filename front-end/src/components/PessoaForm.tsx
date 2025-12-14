import React, { useState } from "react";
import { apiPost } from "../api/api";
import type { Pessoa } from "../types/Pessoa";

//componente formulário para adicionar pessoa
export default function PessoaForm() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number | "">("");
  const [saving, setSaving] = useState(false);

  async function salvar(e?: React.FormEvent) {
    e?.preventDefault();
    if (!nome || idade === "" || Number(idade) <= 0) return alert("Preencha nome e idade (idade > 0)");
    setSaving(true);
    try {
      await apiPost<Pessoa>("pessoas", { id: 0, nome, idade: Number(idade) });
      setNome(""); setIdade("");
      window.dispatchEvent(new CustomEvent("pessoas:changed"));
    } catch (err: unknown) {
      alert("Erro: " + (err instanceof Error ? err.message : err));
    } finally { setSaving(false); }
  }

  return (
    <form onSubmit={salvar} className="card p-3">
      <h5>Adicionar Pessoa</h5>
      <div className="mb-2">
        <label htmlFor="nome" className="form-label">Nome</label>
        <input id="nome" className="form-control" placeholder="Digite o nome" title="Nome" value={nome} onChange={e=>setNome(e.target.value)} />
      </div>
      <div className="mb-2">
        <label htmlFor="idade" className="form-label">Idade</label>
        <input id="idade" className="form-control" type="number" placeholder="Digite a idade" title="Idade" value={idade || ""} onChange={e=>setIdade(e.target.value === "" ? "" : Number(e.target.value))} />
      </div>
      <div>
        <button className="btn btn-primary me-2" type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar"}</button>
        <button className="btn btn-outline-secondary" type="button" onClick={()=>{ setNome(""); setIdade(""); }}>Limpar</button>
      </div>
    </form>
  );
}
