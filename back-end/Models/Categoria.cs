namespace projetotecnico.Models
{
    public class Categoria
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public string Finalidade { get; set; } // "despesa", "receita", "ambas"
    }
}
