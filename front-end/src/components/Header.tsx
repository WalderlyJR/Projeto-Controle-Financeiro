import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

//componente header do site
export default function Header() {
  const [open, setOpen] = useState(false);
 
  return (
    <header className="header">
      <div className="container header-content">

        <div className="brand-area">
          <Link to="/" className="brand">GastosResidenciais</Link>
          <span className="subtitle">Controle simples e profissional</span>
        </div>

        {/* BOTÃO HAMBURGER (SÓ MOBILE) */}
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          ☰
        </button>

        {/* MENU */}
        <nav className={`nav ${open ? "open" : ""}`}>
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/pessoas" onClick={() => setOpen(false)}>Pessoas</NavLink>
          <NavLink to="/categorias" onClick={() => setOpen(false)}>Categorias</NavLink>
          <NavLink to="/transacoes" onClick={() => setOpen(false)}>Transações</NavLink>
          <NavLink to="/relatorios" onClick={() => setOpen(false)}>Relatórios</NavLink>
        </nav>

      </div>
    </header>
  );
}
