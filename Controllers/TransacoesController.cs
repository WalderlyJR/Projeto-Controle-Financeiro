using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetotecnico.Data;
using projetotecnico.Models;

namespace projetotecnico.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransacoesController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/transacoes
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var lista = await _context.Transacoes
                .Include(t => t.Pessoa)
                .Include(t => t.Categoria)
                .ToListAsync();

            return Ok(lista);
        }

        // POST api/transacoes
        [HttpPost]
        public async Task<IActionResult> Create(Transacao transacao)
        {
            // Verificar se pessoa existe
            var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);
            if (pessoa == null)
                return BadRequest("Pessoa não encontrada.");

            // Verificar se categoria existe
            var categoria = await _context.Categorias.FindAsync(transacao.CategoriaId);
            if (categoria == null)
                return BadRequest("Categoria não encontrada.");

            // Regra 1: Menor de idade só pode ter DESPESA
            if (pessoa.Idade < 18 && transacao.Tipo == "receita")
                return BadRequest("Menor de idade só pode registrar despesas.");

            // Regra 2: Categoria deve respeitar sua finalidade
            if (transacao.Tipo == "despesa" && categoria.Finalidade == "receita")
                return BadRequest("Categoria não permite transações de despesas.");

            if (transacao.Tipo == "receita" && categoria.Finalidade == "despesa")
                return BadRequest("Categoria não permite transações de receitas.");

            // Regra 3: Valor deve ser positivo
            if (transacao.Valor <= 0)
                return BadRequest("O valor deve ser maior que zero.");

            // Criar
            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();

            return Ok(transacao);
        }
    }
}
