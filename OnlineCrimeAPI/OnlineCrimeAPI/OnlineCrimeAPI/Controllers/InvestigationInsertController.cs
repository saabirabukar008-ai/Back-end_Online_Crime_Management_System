using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineCrimeAPI.Data;
using OnlineCrimeAPI.Models;

namespace OnlineCrimeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvestigationInsertController : ControllerBase
    {
        [HttpPost]
        public IActionResult Insert(Investigation i)
        {
            try
            {
                InvestigationData data = new InvestigationData();
                data.InsertInvestigation(i);

                return Ok("Investigation inserted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}