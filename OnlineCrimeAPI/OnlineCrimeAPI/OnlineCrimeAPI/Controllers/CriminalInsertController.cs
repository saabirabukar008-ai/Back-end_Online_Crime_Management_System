using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineCrimeAPI.Data;
using OnlineCrimeAPI.Models;

namespace OnlineCrimeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CriminalInsertController : ControllerBase
    {
        [HttpPost]
        public IActionResult Insert(Criminal c)
        {
            try
            {
                CriminalData data = new CriminalData();
                data.InsertCriminal(c);

                return Ok("Criminal inserted successfully");
            }
            catch (Exception ex) 
            {
               return BadRequest(ex.Message);
            }
            }
    }
}
