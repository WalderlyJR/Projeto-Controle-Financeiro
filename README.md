# 🏠 Sistema de Controle de Gastos Residenciais

Este projeto consiste em um **sistema de controle de gastos residenciais**, permitindo o gerenciamento de pessoas, categorias e transações financeiras (receitas e despesas), além de consultas de totais consolidados.

O objetivo do sistema é facilitar o acompanhamento financeiro individual e geral, aplicando regras de negócio para garantir a consistência dos dados.

---

## ⚙️ Funcionalidades

### 👤 Cadastro de Pessoas

Implementa as funcionalidades básicas de gerenciamento:

* Criação
* Listagem
* Deleção

#### Regras de negócio

* Ao deletar uma pessoa, **todas as transações associadas a ela são automaticamente removidas**.

#### Campos da Pessoa

* **Identificador**: valor único gerado automaticamente
* **Nome**: texto
* **Idade**: número inteiro positivo

---

### 🗂️ Cadastro de Categorias

Permite o gerenciamento de categorias financeiras.

#### Funcionalidades

* Criação
* Listagem

#### Campos da Categoria

* **Identificador**: valor único gerado automaticamente
* **Descrição**: texto
* **Finalidade**:

  * despesa
  * receita
  * ambas

---

### 💰 Cadastro de Transações

Gerencia as movimentações financeiras do sistema.

#### Funcionalidades

* Criação
* Listagem

#### Regras de negócio

* Caso a pessoa associada à transação seja **menor de 18 anos**, apenas transações do tipo **despesa** são permitidas.
* A categoria utilizada deve ser compatível com o tipo da transação:

  * Transações do tipo **despesa** não podem utilizar categorias com finalidade **receita**.
  * Transações do tipo **receita** não podem utilizar categorias com finalidade **despesa**.

#### Campos da Transação

* **Identificador**: valor único gerado automaticamente
* **Descrição**: texto
* **Valor**: número decimal positivo
* **Tipo**:

  * despesa
  * receita
* **Categoria**: identificador da categoria cadastrada
* **Pessoa**: identificador da pessoa cadastrada

---

## 📊 Consultas

### 📌 Consulta de Totais por Pessoa

Exibe:

* Todas as pessoas cadastradas
* Total de **receitas**
* Total de **despesas**
* **Saldo individual** (receitas − despesas)

Ao final da listagem, apresenta:

* Total geral de receitas
* Total geral de despesas
* **Saldo líquido geral**

---

### 📌 Consulta de Totais por Categoria

Exibe:

* Todas as categorias cadastradas
* Total de **receitas**
* Total de **despesas**
* **Saldo por categoria** (receitas − despesas)

Ao final da listagem, apresenta:

* Total geral de receitas
* Total geral de despesas
* **Saldo líquido geral**

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* React
* TypeScript
* HTML
* CSS
* Bootstrap

### Backend

* C#
* .NET 8 (ASP.NET Core)
* Entity Framework Core
* MySQL / MariaDB

---

## ▶️ Como Executar o Projeto

### Pré-requisitos

* .NET SDK 8
* Node.js + NPM
* Git
* MySQL ou MariaDB

### Execução do Backend (.NET)

```bash
cd backend
dotnet restore
dotnet run
```

### Execução do Frontend (React + TypeScript)

```bash
cd frontend
npm install
npm run dev
```
## Banco de Dados

Dentro da pasta `backend` execute:

```bash
dotnet ef database update



---

## 🏗️ Arquitetura do Projeto

### 🔹 Backend – C# / .NET

* **Framework**: ASP.NET Core (.NET 8)
* **Arquitetura**: API REST em camadas
* **ORM**: Entity Framework Core
* **Banco de Dados**: MySQL / MariaDB

#### Padrões adotados

* Separação por **Controllers**
* **Models** fortemente tipados
* **Regras de negócio** centralizadas
* **DTOs / ViewModels** para relatórios

#### Controllers

* PessoasController
* CategoriasController
* TransacoesController
* RelatoriosController

#### Models Principais

* Pessoa
* Categoria
* Transacao

---

### 🔹 Frontend – React + TypeScript

* **Framework**: React
* **Build Tool**: Vite
* **Linguagem**: TypeScript
* **Estilização**: CSS + Bootstrap
* **Roteamento**: React Router

#### Páginas

* PessoasPage
* CategoriasPage
* TransacoesPage
* RelatoriosPage

#### Componentes

* Header (menu responsivo com botão hambúrguer)
* Formulários e listas separados por responsabilidade
* Tipagem forte com `types/*.ts`

#### 📱 Responsividade

* Menu adaptado para mobile com botão hambúrguer
* Tabelas com scroll horizontal controlado
* Indicação visual ao usuário:

  * “⇆ Deslize para ver mais”
* Layout adaptado para telas pequenas sem quebra de conteúdo

---

## 🔗 Endpoints da API (Backend)

### Pessoas

* `POST /api/pessoas` – Criar pessoa
* `GET /api/pessoas` – Listar pessoas
* `DELETE /api/pessoas/{id}` – Remover pessoa

### Categorias

* `POST /api/categorias` – Criar categoria
* `GET /api/categorias` – Listar categorias

### Transações

* `POST /api/transacoes` – Criar transação
* `GET /api/transacoes` – Listar transações

### Relatórios

* `GET /api/relatorios/pessoas` – Totais por pessoa
* `GET /api/relatorios/categorias` – Totais por categoria


# Projeto-Controle-Financeiro
