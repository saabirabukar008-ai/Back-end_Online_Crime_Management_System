using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineCrimeAPI.Data;

namespace OnlineCrimeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvestigationGetController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            InvestigationData data = new InvestigationData();
            return Ok(data.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            InvestigationData data = new InvestigationData();

            var result = data.GetById(id);

            if (result == null)
                return NotFound("Investigation not found");

            return Ok(result);
        }
    }
}
