using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineCrimeAPI.Data;
using OnlineCrimeAPI.Models;

namespace OnlineCrimeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvestigationUpdateController : ControllerBase
    {
        [HttpPut]
        public IActionResult Update(Investigation i)
        {
            try
            {
                InvestigationData data = new InvestigationData();

                bool result = data.UpdateInvestigation(i);

                if (result)
                    return Ok("Investigation updated successfully");

                return NotFound("Investigation ID not found");

            }
            catch (Exception ex)
            { 
                return BadRequest(ex.Message);
            }
           
        }
    }
}
