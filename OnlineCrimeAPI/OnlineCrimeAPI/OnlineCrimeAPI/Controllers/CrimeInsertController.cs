using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineCrimeAPI.Data;
using OnlineCrimeAPI.Models;

namespace OnlineCrimeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrimeInsertController : ControllerBase
    {
        [HttpPost]

        public IActionResult InsertData(CrimeReport add)
        {
            try
            {
                CrimeData data = new CrimeData();

                data.InsertData(add);

                return Ok("Data inserted successfully");
            }
            catch (Exception ex)
            { 
                return BadRequest(ex.Message);
            }
            } 
    }
}
