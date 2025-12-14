namespace projetotecnico.Models
{
    // Integração com o banco de dados para categorias
    public class Categoria
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public string Finalidade { get; set; } // "despesa", "receita", "ambas"
    }
}
