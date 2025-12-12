
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { apiGet } from "../api/api";

type ReportPersonItem = {
  PessoaId: number;
  Pessoa: string;
  Receitas: number | string;
  Despesas: number | string;
};

type ReportPeople = {
  pessoas: ReportPersonItem[];
  totalGeral?: {
    totalReceitas?: number;
    totalDespesas?: number;
    saldoLiquido?: number;
  } | null;
};

type ReportCatItem = {
  CategoriaId: number;
  Categoria: string;
  Receitas: number | string;
  Despesas: number | string;
};

type ReportCats = {
  categorias: ReportCatItem[];
  totalGeral?: {
    totalReceitas?: number;
    totalDespesas?: number;
    saldoLiquido?: number;
  } | null;
};

export default function RelatoriosPage(){
  const [reportPeople, setReportPeople] = useState<ReportPeople | null>(null);
  const [reportCats, setReportCats] = useState<ReportCats | null>(null);

  useEffect(()=> {
    (async ()=>{
      try {
        const p = await apiGet<ReportPeople>("reports/pessoas");
        setReportPeople(p || null);
        const c = await apiGet<ReportCats>("reports/categorias");
        setReportCats(c || null);
      } catch (err) { console.error(err); }
    })();
  }, []);

  return (
    <>
      <Header />
      <main className="container mt-4">
        <h4>Totais por Pessoa</h4>
        <div className="card p-3 mb-3">
          {!reportPeople ? <div>Carregando...</div> : (
            <>
              <table className="table table-striped">
                <thead><tr><th>Pessoa</th><th>Receitas</th><th>Despesas</th><th>Saldo</th></tr></thead>
                <tbody>
                  {reportPeople.pessoas.map(p => {
                    const rec = Number(p.Receitas || 0);
                    const desp = Number(p.Despesas || 0);
                    return (
                      <tr key={p.PessoaId}>
                        <td>{p.Pessoa}</td>
                        <td>{rec.toFixed(2)}</td>
                        <td>{desp.toFixed(2)}</td>
                        <td>{(rec - desp).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div>
                <strong>Total Geral:</strong>{" "}
                Receitas: {Number(reportPeople.totalGeral?.totalReceitas ?? 0).toFixed(2)} —{" "}
                Despesas: {Number(reportPeople.totalGeral?.totalDespesas ?? 0).toFixed(2)} —{" "}
                Saldo: {Number(reportPeople.totalGeral?.saldoLiquido ?? 0).toFixed(2)}
              </div>
            </>
          )}
        </div>

        <h4>Totais por Categoria</h4>
        <div className="card p-3">
          {!reportCats ? <div>Carregando...</div> : (
            <>
              <table className="table table-striped">
                <thead><tr><th>Categoria</th><th>Receitas</th><th>Despesas</th><th>Saldo</th></tr></thead>
                <tbody>
                  {reportCats.categorias.map(c => {
                    const rec = Number(c.Receitas || 0);
                    const desp = Number(c.Despesas || 0);
                    return (
                      <tr key={c.CategoriaId}>
                        <td>{c.Categoria}</td>
                        <td>{rec.toFixed(2)}</td>
                        <td>{desp.toFixed(2)}</td>
                        <td>{(rec - desp).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div>
                <strong>Total Geral:</strong>{" "}
                Receitas: {Number(reportCats.totalGeral?.totalReceitas ?? 0).toFixed(2)} —{" "}
                Despesas: {Number(reportCats.totalGeral?.totalDespesas ?? 0).toFixed(2)} —{" "}
                Saldo: {Number(reportCats.totalGeral?.saldoLiquido ?? 0).toFixed(2)}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
