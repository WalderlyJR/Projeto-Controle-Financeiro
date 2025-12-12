import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import PessoasPage from "./pages/PessoasPage";
import CategoriasPage from "./pages/CategoriasPage";
import TransacoesPage from "./pages/TransacoesPage";
import RelatoriosPage from "./pages/RelatoriosPage";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/pessoas", element: <PessoasPage /> },
  { path: "/categorias", element: <CategoriasPage /> },
  { path: "/transacoes", element: <TransacoesPage /> },
  { path: "/relatorios", element: <RelatoriosPage /> },
]);
