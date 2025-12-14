using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetotecnico.Data;
using projetotecnico.Models;
using projetotecnico.Models.DTOs;
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

        // listando todas as transacoes
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var lista = await _context.Transacoes
                .Include(t => t.Pessoa)
                .Include(t => t.Categoria)
                .ToListAsync();

            return Ok(lista);
        }

        // criando uma nova transacao
        
[HttpPost]
public async Task<IActionResult> Create([FromBody] TransacaoCreateDto dto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId);
    if (pessoa == null)
        return BadRequest("Pessoa não encontrada.");

    var categoria = await _context.Categorias.FindAsync(dto.CategoriaId);
    if (categoria == null)
        return BadRequest("Categoria não encontrada.");

    if (pessoa.Idade < 18 && dto.Tipo == "receita")
        return BadRequest("Menor de idade só pode registrar despesas.");

    if (dto.Tipo == "despesa" && categoria.Finalidade == "receita")
        return BadRequest("Categoria não permite despesas.");

    if (dto.Tipo == "receita" && categoria.Finalidade == "despesa")
        return BadRequest("Categoria não permite receitas.");

    if (dto.Valor <= 0)
        return BadRequest("Valor deve ser maior que zero.");

    var transacao = new Transacao
    {
        Descricao = dto.Descricao,
        Valor = dto.Valor,
        Tipo = dto.Tipo,
        PessoaId = dto.PessoaId,
        CategoriaId = dto.CategoriaId
    };

    _context.Transacoes.Add(transacao);
    await _context.SaveChangesAsync();

    return Ok(transacao);
}

        }
    }

