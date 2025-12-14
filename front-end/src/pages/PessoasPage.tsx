import PessoaForm from "../components/PessoaForm";
import PessoaList from "../components/PessoaList";

export default function PessoasPage() {
  return (
    <>
      <section className="hero">
        <div>
          <h2>Pessoas</h2>
          <p className="text-muted">
            Cadastre as pessoas que participarão das transações financeiras.
          </p>
        </div>
      </section>

      <section className="grid cols-2 mt-4">
        <div className="card-modern">
          <h4>Nova Pessoa</h4>
          <PessoaForm />
        </div>

        <div className="card-modern">
          <h4>Pessoas Cadastradas</h4>
          <PessoaList />
        </div>
      </section>
    </>
  );
}
