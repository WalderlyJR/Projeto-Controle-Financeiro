namespace projetotecnico.Models
{
    // Integração com o banco de dados para pessoas
    public class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }

        // Relação → Pessoa tem muitas transações
        public List<Transacao> Transacoes { get; set; } = new();
    }
}
