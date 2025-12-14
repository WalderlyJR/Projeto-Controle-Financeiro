export type ReportPersonItem = {
  pessoaId: number;
  pessoa: string;
  receitas: number;
  despesas: number;
};

export type ReportPeople = {
  pessoas: ReportPersonItem[];
  totalGeral?: {
    totalReceitas?: number;
    totalDespesas?: number;
    saldoLiquido?: number;
  };
};

export type ReportCatItem = {
  categoriaId: number;
  categoria: string;
  receitas: number;
  despesas: number;
};

export type ReportCats = {
  categorias: ReportCatItem[];
  totalGeral?: {
    totalReceitas?: number;
    totalDespesas?: number;
    saldoLiquido?: number;
  };
};
