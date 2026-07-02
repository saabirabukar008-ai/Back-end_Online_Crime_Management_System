using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineCrimeAPI.Data;
using OnlineCrimeAPI.Models;

namespace OnlineCrimeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrimeUpdateController : ControllerBase
    {
        [HttpPut]

        public IActionResult UpdateData(CrimeReport update)
        {
            try
            {
                CrimeData data = new CrimeData();

                bool result = data.UpdateData(update);

                if (result)
                {
                    return Ok("Data updated successfully");
                }
                else
                {
                    return NotFound("ID not found");
                }
            } catch (Exception ex)
            { 
                return BadRequest(ex.Message);
            }
        }
    }
}  
