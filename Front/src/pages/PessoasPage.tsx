import Header from "../components/Header";
import PessoaForm from "../components/PessoaForm";
import PessoaList from "../components/PessoaList";

export default function PessoasPage() {
  return (
    <>
      <Header />
      <div className="container">
        <h1>Cadastro de Pessoas</h1>

        <PessoaForm />

        <h3>Pessoas cadastradas</h3>
        <PessoaList />
      </div>
    </>
  );
}
