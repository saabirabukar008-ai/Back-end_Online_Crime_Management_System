using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineCrimeAPI.Data;

namespace OnlineCrimeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrimeGetController : ControllerBase
    {
        [HttpGet]

        public IActionResult GetData()
        {
            CrimeData data = new CrimeData();

            return Ok(data.GetData());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            CrimeData data = new CrimeData();

            var result = data.GetById(id);

            if (result == null)
                return NotFound("Crime Report not found");

            return Ok(result);
        }

    }
}
