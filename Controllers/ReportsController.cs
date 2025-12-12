using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetotecnico.Data;

namespace projetotecnico.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ReportsController(AppDbContext context) => _context = context;

        // GET api/reports/pessoas
        [HttpGet("pessoas")]
        public async Task<IActionResult> TotalsByPerson()
        {
            var pessoas = await _context.Pessoas
                .Select(p => new {
                    PessoaId = p.Id,
                    Pessoa = p.Nome,
                    Receitas = p.Transacoes.Where(t => t.Tipo == "receita").Sum(t => (decimal?)t.Valor) ?? 0m,
                    Despesas = p.Transacoes.Where(t => t.Tipo == "despesa").Sum(t => (decimal?)t.Valor) ?? 0m
                })
                .ToListAsync();

            var totalReceitas = pessoas.Sum(x => x.Receitas);
            var totalDespesas = pessoas.Sum(x => x.Despesas);
            var totalGeral = new { totalReceitas, totalDespesas, saldoLiquido = totalReceitas - totalDespesas };

            var result = new { pessoas, totalGeral };
            return Ok(result);
        }

        // GET api/reports/categorias
        [HttpGet("categorias")]
        public async Task<IActionResult> TotalsByCategory()
        {
            var categorias = await _context.Categorias
                .Select(c => new {
                    CategoriaId = c.Id,
                    Categoria = c.Descricao,
                    Receitas = _context.Transacoes.Where(t => t.CategoriaId == c.Id && t.Tipo == "receita").Sum(t => (decimal?)t.Valor) ?? 0m,
                    Despesas = _context.Transacoes.Where(t => t.CategoriaId == c.Id && t.Tipo == "despesa").Sum(t => (decimal?)t.Valor) ?? 0m
                })
                .ToListAsync();

            var totalReceitas = categorias.Sum(x => x.Receitas);
            var totalDespesas = categorias.Sum(x => x.Despesas);
            var totalGeral = new { totalReceitas, totalDespesas, saldoLiquido = totalReceitas - totalDespesas };

            return Ok(new { categorias, totalGeral });
        }
    }
}
