import React from "react";
import Header from "../components/Header";
import PessoaForm from "../components/PessoaForm";
import PessoaList from "../components/PessoaList";

export default function PessoasPage(){
  return (
    <>
      <Header />
      <main className="container mt-4">
        <div className="row gx-3">
          <div className="col-md-4"><PessoaForm/></div>
          <div className="col-md-8"><PessoaList/></div>
        </div>
      </main>
    </>
  );
}
