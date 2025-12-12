import { useState } from "react";
import { apiPost } from "../api/api";
import type { Pessoa } from "../types/Pessoa";

export default function PessoaForm() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number>(0);

  async function salvar() {
    if (!nome || idade <= 0) return alert("Preencha os campos corretamente");
    await apiPost<Pessoa>("pessoas", { nome, idade, id: 0 });
    setNome("");
    setIdade(0);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="number"
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(Number(e.target.value))}
      />
      <button onClick={salvar}>Salvar</button>
    </div>
  );
}
