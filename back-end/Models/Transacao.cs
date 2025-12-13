namespace projetotecnico.Models
{
    public class Transacao
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public string Tipo { get; set; } // "receita" ou "despesa"

        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; }

        public int PessoaId { get; set; }
        public Pessoa Pessoa { get; set; }
    }
}
