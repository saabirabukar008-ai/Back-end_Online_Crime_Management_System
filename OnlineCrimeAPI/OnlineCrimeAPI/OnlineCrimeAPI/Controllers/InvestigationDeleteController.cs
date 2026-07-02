using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineCrimeAPI.Data;

namespace OnlineCrimeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvestigationDeleteController : ControllerBase
    {
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                InvestigationData data = new InvestigationData();

                bool result = data.DeleteInvestigation(id);

                if (result)
                    return Ok("Investigation deleted successfully");

                return NotFound("Investigation ID not found");
            }
            catch (Exception ex) 
            { 
                return BadRequest(ex.Message);
            }
            }
    }
}
