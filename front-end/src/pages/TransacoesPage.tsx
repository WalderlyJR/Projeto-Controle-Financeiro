import React, { useEffect, useState, startTransition } from "react";
import Header from "../components/Header";
import type { Transacao } from "../types/Transacao";
import type { Categoria } from "../types/Categoria";
import type { Pessoa } from "../types/Pessoa";
import { apiGet, apiPost } from "../api/api";

//componente página de transações
export default function TransacoesPage(){
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number | "">("");
  const [tipo, setTipo] = useState<Transacao["tipo"]>("despesa");
  const [categoriaId, setCategoriaId] = useState<number | "">("");
  const [pessoaId, setPessoaId] = useState<number | "">("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [lista, setLista] = useState<Transacao[]>([]);

 //Listagem de transações, pessoas e categorias
  async function loadAll(){
    try {
      const [c, p, t] = await Promise.all([
        apiGet<Categoria[]>("categorias"),
        apiGet<Pessoa[]>("pessoas"),
        apiGet<Transacao[]>("transacoes")
      ]);
      startTransition(() => {
        setCategorias(c || []); setPessoas(p || []); setLista(t || []);
      });
    } catch (err) { console.error(err); }
  }
  useEffect(()=>{ loadAll(); }, []);

   //função para salvar transação
  async function salvar(e?:React.FormEvent){
    e?.preventDefault();
    if(!descricao || valor === "" || pessoaId === "" || categoriaId === "") return alert("Preencha todos os campos");
    const pessoa = pessoas.find(x=> x.id === Number(pessoaId));
    if(!pessoa) return alert("Pessoa inválida");
    if(pessoa.idade < 18 && tipo === "receita") return alert("Menor de idade só pode registrar despesas.");
    const categoria = categorias.find(x=> x.id === Number(categoriaId));
    if(!categoria) return alert("Categoria inválida");
    if(tipo === "despesa" && categoria.finalidade === "receita") return alert("Categoria não permite despesas");
    if(tipo === "receita" && categoria.finalidade === "despesa") return alert("Categoria não permite receitas");
    if(Number(valor) <= 0) return alert("Valor deve ser positivo");
    await apiPost<Transacao>("transacoes", { id:0, descricao, valor: Number(valor), tipo, categoriaId: Number(categoriaId), pessoaId: Number(pessoaId) });
    setDescricao(""); setValor(""); setCategoriaId(""); setPessoaId("");
    loadAll();
    window.dispatchEvent(new CustomEvent("transacoes:changed"));
  }

  return (
    <>
      <Header />
      <main className="container mt-4">
        <div className="row gx-3">
          <div className="col-md-4">
            <div className="card p-3">
              <h5>Nova Transação</h5>
              <form onSubmit={salvar}>
                <div className="mb-2">
                  <label htmlFor="descricao" className="form-label">Descrição</label>
                  <input
                    id="descricao"
                    className="form-control"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="valor" className="form-label">Valor</label>
                  <input
                    id="valor"
                    className="form-control"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    value={valor === "" ? "" : valor}
                    onChange={e => setValor(e.target.value === "" ? "" : Number(e.target.value))}
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="tipo" className="form-label">Tipo</label>
                  <select
                    id="tipo"
                    className="form-select"
                    value={tipo}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTipo(e.target.value as Transacao["tipo"])}
                  >
                    <option value="despesa">Despesa</option>
                    <option value="receita">Receita</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label htmlFor="pessoa" className="form-label">Pessoa</label>
                  <select
                    id="pessoa"
                    className="form-select"
                    value={pessoaId === "" ? "" : String(pessoaId)}
                    onChange={e => setPessoaId(e.target.value === "" ? "" : Number(e.target.value))}
                  >
                    <option value="">-- selecione --</option>
                    {pessoas.map(p=> <option value={String(p.id)} key={p.id}>{p.nome} ({p.idade})</option>)}
                  </select>
                </div>

                <div className="mb-2">
                  <label htmlFor="categoria" className="form-label">Categoria</label>
                  <select
                    id="categoria"
                    className="form-select"
                    value={categoriaId === "" ? "" : String(categoriaId)}
                    onChange={e => setCategoriaId(e.target.value === "" ? "" : Number(e.target.value))}
                  >
                    <option value="">-- selecione --</option>
                    {categorias.map(c=> <option value={String(c.id)} key={c.id}>{c.descricao} ({c.finalidade})</option>)}
                  </select>
                </div>

                <button className="btn btn-primary">Salvar</button>
              </form>
            </div>
          </div>
           
          <div className="col-md-8">
            <div className="card p-3">
              <h5>Transações</h5>
              <div className="scroll-icon d-md-none">
               ⇆ deslize para ver mais
                </div>
              <div className="table-responsive">
              <table className="table table-striped">
                <thead><tr><th>Descrição</th><th>Valor</th><th>Tipo</th><th>Pessoa</th><th>Categoria</th></tr></thead>
                <tbody>
                  {lista.map(t=>(
                    <tr key={t.id}>
                      <td>{t.descricao}</td>
                      <td>{Number(t.valor).toFixed(2)}</td>
                      <td>{t.tipo}</td>
                      <td>{pessoas.find(p=>p.id===t.pessoaId)?.nome || t.pessoaId}</td>
                      <td>{categorias.find(c=>c.id===t.categoriaId)?.descricao || t.categoriaId}</td>
                    </tr>
                  ))}
                  {lista.length===0 && <tr><td colSpan={5}>Sem transações</td></tr>}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}