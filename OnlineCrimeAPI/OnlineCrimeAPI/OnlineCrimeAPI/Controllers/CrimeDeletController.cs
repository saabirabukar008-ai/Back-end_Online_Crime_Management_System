using Microsoft.AspNetCore.Mvc;
using OnlineCrimeAPI.Data;

namespace OnlineCrimeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrimeDeleteController : ControllerBase
    {
        [HttpDelete("{id}")]
        public IActionResult DeleteCrime(int id)
        {
            try
            {
                CrimeData data = new CrimeData();

                bool result = data.DeleteCrime(id);

                if (result)
                {
                    return Ok("Deleted Successfully");
                }
                else
                {
                    return NotFound("ID not found");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}