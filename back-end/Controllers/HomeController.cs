using Microsoft.AspNetCore.Mvc;

namespace projetotecnico.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("API de Gestão de Gastos está funcionando!");
        }
    }
}
