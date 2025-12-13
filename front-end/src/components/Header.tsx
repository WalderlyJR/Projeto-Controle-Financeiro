import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link to="/" className="brand" style={{ textDecoration: "none" }}>GastosResidenciais</Link>
          <span className="small-muted" style={{ fontSize: 13, color: "#16336eff" }}>Controle simples e profissional</span>
        </div>

        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/pessoas" className={({isActive}) => isActive ? "active" : ""}>Pessoas</NavLink>
          <NavLink to="/categorias" className={({isActive}) => isActive ? "active" : ""}>Categorias</NavLink>
          <NavLink to="/transacoes" className={({isActive}) => isActive ? "active" : ""}>Transações</NavLink>
          <NavLink to="/relatorios" className={({isActive}) => isActive ? "active" : ""}>Relatórios</NavLink>
        </nav>
      </div>
    </header>
  );
}
