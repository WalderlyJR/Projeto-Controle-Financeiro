using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetotecnico.Data;
using projetotecnico.Models;

namespace projetotecnico.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriasController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/categorias
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categorias = await _context.Categorias.ToListAsync();
            return Ok(categorias);
        }

        // POST api/categorias
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();
            return Ok(categoria);
        }
    }
}
