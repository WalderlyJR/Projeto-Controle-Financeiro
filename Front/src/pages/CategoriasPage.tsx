
import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import { apiGet, apiPost } from "../api/api";
import type { Categoria } from "../types/Categoria";

export default function CategoriasPage(){
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState<Categoria["finalidade"]>("despesa");
  const [items, setItems] = useState<Categoria[]>([]);
  const isMountedRef = useRef(true);

  async function load() {
    try {
      const d = await apiGet<Categoria[]>("categorias");
      if (isMountedRef.current) setItems(d || []);
    } catch (err) {
      console.error("Erro ao carregar categorias:", err);
    }
  }

  useEffect(() => {
    isMountedRef.current = true;
    // call load asynchronously to avoid triggering setState synchronously within the effect
    const init = async () => {
      await load();
    };
    void init();
    return () => { isMountedRef.current = false; };
  }, []);

  async function salvar(e?:React.FormEvent){
    e?.preventDefault();
    if(!descricao) return alert("Informe a descrição");
    try {
      await apiPost<Categoria>("categorias", { id:0, descricao, finalidade });
      setDescricao(""); setFinalidade("despesa");
      await load();
    } catch (err) {
      console.error("Erro ao salvar categoria:", err);
      alert("Erro ao salvar categoria");
    }
  }

  return (
    <>
      <Header />
      <main className="container mt-4">
        <div className="row gx-3">
          <div className="col-md-4">
            <div className="card p-3">
              <h5>Nova Categoria</h5>
              <form onSubmit={salvar}>
                <div className="mb-2">
                  <label htmlFor="descricao" className="form-label">Descrição</label>
                  <input
                    id="descricao"
                    className="form-control"
                    placeholder="Descrição"
                    title="Descrição"
                    value={descricao}
                    onChange={e=>setDescricao(e.target.value)}
                  />
                </div>
                 <div className="mb-2">
                  <label htmlFor="finalidade" className="form-label">Finalidade</label>
                  <select
                    id="finalidade"
                    className="form-select"
                    value={finalidade}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFinalidade(e.target.value as Categoria["finalidade"])}
                  >
                    <option value="despesa">Despesa</option>
                    <option value="receita">Receita</option>
                    <option value="ambas">Ambas</option>
                  </select>
                </div>
                <button className="btn btn-primary">Salvar</button>
              </form>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card p-3">
              <h5>Categorias</h5>
              <table className="table table-striped">
                <thead><tr><th>Descrição</th><th>Finalidade</th></tr></thead>
                <tbody>
                  {items.map(c => <tr key={c.id}><td>{c.descricao}</td><td>{c.finalidade}</td></tr>)}
                  {items.length===0 && <tr><td colSpan={2}>Sem categorias</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
