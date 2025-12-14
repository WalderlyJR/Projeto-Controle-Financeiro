using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetotecnico.Data;

namespace projetotecnico.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatoriosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RelatoriosController(AppDbContext context)
        {
            _context = context;
        }

        // relatorios por pessoa
        [HttpGet("pessoas")]
public async Task<IActionResult> PorPessoa()
{
    var dados = await (
        from t in _context.Transacoes
        join p in _context.Pessoas on t.PessoaId equals p.Id
        group t by new { p.Id, p.Nome } into g
        select new
        {
            PessoaId = g.Key.Id,
            Pessoa = g.Key.Nome,
            Receitas = g.Where(x => x.Tipo == "receita").Sum(x => x.Valor),
            Despesas = g.Where(x => x.Tipo == "despesa").Sum(x => x.Valor)
        }
    ).ToListAsync();

    var totalReceitas = dados.Sum(x => x.Receitas);
    var totalDespesas = dados.Sum(x => x.Despesas);

    return Ok(new
    {
        pessoas = dados,
        totalGeral = new
        {
            totalReceitas,
            totalDespesas,
            saldoLiquido = totalReceitas - totalDespesas
        }
    });
}


        // relatorios por categoria
     [HttpGet("categorias")]
public async Task<IActionResult> PorCategoria()
{
    var dados = await (
        from t in _context.Transacoes
        join c in _context.Categorias on t.CategoriaId equals c.Id
        group t by new { c.Id, c.Descricao } into g
        select new
        {
            CategoriaId = g.Key.Id,
            Categoria = g.Key.Descricao,
            Receitas = g.Where(x => x.Tipo == "receita").Sum(x => x.Valor),
            Despesas = g.Where(x => x.Tipo == "despesa").Sum(x => x.Valor)
        }
    ).ToListAsync();

    var totalReceitas = dados.Sum(x => x.Receitas);
    var totalDespesas = dados.Sum(x => x.Despesas);

    return Ok(new
    {
        categorias = dados,
        totalGeral = new
        {
            totalReceitas,
            totalDespesas,
            saldoLiquido = totalReceitas - totalDespesas
        }
    });
}
    }
}
