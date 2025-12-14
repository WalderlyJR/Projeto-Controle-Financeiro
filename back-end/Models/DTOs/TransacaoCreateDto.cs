namespace projetotecnico.Models.DTOs
{
    public class TransacaoCreateDto
    {
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public string Tipo { get; set; }
        public int PessoaId { get; set; }
        public int CategoriaId { get; set; }
    }
}
