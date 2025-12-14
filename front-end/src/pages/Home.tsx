import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <div>
          <h2>Controle Financeiro Pessoal</h2>
          <p className="text-muted">
            Cadastre pessoas, categorias e transações para gerar relatórios financeiros completos.
          </p>

          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/pessoas")}
          >
            Começar passo a passo
          </button>
        </div>
      </section>

      <section className="grid cols-2 mt-4">
        <div className="card-modern">
          <h4>1️⃣ Pessoas</h4>
          <p>Cadastre quem participa das transações.</p>
        </div>

        <div className="card-modern">
          <h4>2️⃣ Categorias</h4>
          <p>Defina tipos de receitas e despesas.</p>
        </div>

        <div className="card-modern">
          <h4>3️⃣ Transações</h4>
          <p>Registre entradas e saídas.</p>
        </div>

        <div className="card-modern">
          <h4>4️⃣ Relatórios</h4>
          <p>Visualize totais e saldos.</p>
        </div>
      </section>
    </>
  );
}
