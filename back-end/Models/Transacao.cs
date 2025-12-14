using System.Text.Json.Serialization;

namespace projetotecnico.Models
{
    // Integração com o banco de dados para transações com categorias e pessoas
    public class Transacao
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public string Tipo { get; set; }

        public int CategoriaId { get; set; }

        [JsonIgnore] 
        public Categoria Categoria { get; set; }

        public int PessoaId { get; set; }

        [JsonIgnore]
        public Pessoa Pessoa { get; set; }
    }
}
