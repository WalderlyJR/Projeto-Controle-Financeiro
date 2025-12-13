using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetotecnico.Data;
using projetotecnico.Models;

namespace projetotecnico.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PessoasController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var pessoas = await _context.Pessoas.ToListAsync();
            return Ok(pessoas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var pessoa = await _context.Pessoas.Include(p => p.Transacoes).FirstOrDefaultAsync(p => p.Id == id);
            if (pessoa == null) return NotFound();
            return Ok(pessoa);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Pessoa pessoa)
        {
            if (string.IsNullOrWhiteSpace(pessoa.Nome) || pessoa.Idade <= 0)
                return BadRequest("Nome e idade válidos são obrigatórios.");
            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = pessoa.Id }, pessoa);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var pessoa = await _context.Pessoas.Include(p => p.Transacoes).FirstOrDefaultAsync(p => p.Id == id);
            if (pessoa == null) return NotFound();
            _context.Pessoas.Remove(pessoa); // cascade delete via FK
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
