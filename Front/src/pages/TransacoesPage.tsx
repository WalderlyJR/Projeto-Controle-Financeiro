import PessoaForm from "../components/PessoaForm";
import PessoaList from "../components/PessoaList";

export default function TransacaoPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Cadastro de Pessoas</h1>
      <PessoaForm />
      <PessoaList />
    </div>
  );
}
