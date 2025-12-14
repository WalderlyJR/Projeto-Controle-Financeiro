import { createBrowserRouter } from "react-router-dom";
import React from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import PessoasPage from "./pages/PessoasPage";
import CategoriasPage from "./pages/CategoriasPage";
import TransacoesPage from "./pages/TransacoesPage";
import RelatoriosPage from "./pages/RelatoriosPage";

/* menu guia*/
function withLayout(page: React.ReactNode) {
  return (
    <>
      <Header />
      <main className="container mt-4">
        {page}
      </main>
    </>
  );
}

//definição das rotas da aplicação
export const router = createBrowserRouter([
  {
    path: "/",
    element: withLayout(<Home />),
  },
  {
    path: "/pessoas",
    element: withLayout(<PessoasPage />),
  },
  {
    path: "/categorias",
    element: withLayout(<CategoriasPage />),
  },
  {
    path: "/transacoes",
    element: withLayout(<TransacoesPage />),
  },
  {
    path: "/relatorios",
    element: withLayout(<RelatoriosPage />),
  },
]);
