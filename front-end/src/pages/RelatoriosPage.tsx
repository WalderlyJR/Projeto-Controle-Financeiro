import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { apiGet } from "../api/api";

import type {
  ReportPeople,
  ReportCats
} from "../types/Relatorios";

//componente página de relatórios
export default function RelatoriosPage() {
  const [reportPeople, setReportPeople] = useState<ReportPeople | null>(null);
  const [reportCats, setReportCats] = useState<ReportCats | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const pessoas = await apiGet<ReportPeople>("relatorios/pessoas");
        const categorias = await apiGet<ReportCats>("relatorios/categorias");

        setReportPeople(pessoas);
        setReportCats(categorias);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  return (
    <>
     
      <Header />

      <main className="container mt-4">

        {/* ===== POR PESSOA ===== */}
        <h4>Totais por Pessoa</h4>
        <div className="card p-3 mb-4">
          {!reportPeople ? (
            <div>Carregando...</div>
          ) : (
            <>
            <div className="scroll-icon d-md-none">
               ⇆ deslize para ver mais
                </div>
              <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Pessoa</th>
                    <th>Receitas</th>
                    <th>Despesas</th>
                    <th>Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {reportPeople.pessoas.map(p => {
                    const rec = Number(p.receitas);
                    const desp = Number(p.despesas);

                    return (
                      <tr key={p.pessoaId}>
                        <td>{p.pessoa}</td>
                        <td>{rec.toFixed(2)}</td>
                        <td>{desp.toFixed(2)}</td>
                        <td>{(rec - desp).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
</div>
              <div>
                <strong>Total Geral:</strong>{" "}
                Receitas: {reportPeople.totalGeral?.totalReceitas?.toFixed(2) ?? "0.00"} —{" "}
                Despesas: {reportPeople.totalGeral?.totalDespesas?.toFixed(2) ?? "0.00"} —{" "}
                Saldo: {reportPeople.totalGeral?.saldoLiquido?.toFixed(2) ?? "0.00"}
              </div>
            </>
          )}
        </div>

        {/* ===== POR CATEGORIA ===== */}
        <h4>Totais por Categoria</h4>
        <div className="card p-3">
          {!reportCats ? (
            <div>Carregando...</div>
          ) : (
            <> 
            <div className="scroll-icon d-md-none">
               ⇆ deslize para ver mais
                </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Categoria</th>
                    <th>Receitas</th>
                    <th>Despesas</th>
                    <th>Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {reportCats.categorias.map(c => {
                    const rec = Number(c.receitas);
                    const desp = Number(c.despesas);

                    return (
                      <tr key={c.categoriaId}>
                        <td>{c.categoria}</td>
                        <td>{rec.toFixed(2)}</td>
                        <td>{desp.toFixed(2)}</td>
                        <td>{(rec - desp).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
</div>
              <div>
                <strong>Total Geral:</strong>{" "}
                Receitas: {reportCats.totalGeral?.totalReceitas?.toFixed(2) ?? "0.00"} —{" "}
                Despesas: {reportCats.totalGeral?.totalDespesas?.toFixed(2) ?? "0.00"} —{" "}
                Saldo: {reportCats.totalGeral?.saldoLiquido?.toFixed(2) ?? "0.00"}
              </div>
            </>
          )}
        </div>

      </main>
    </>
  );
}
