using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineCrimeAPI.Data;
using OnlineCrimeAPI.Models;

namespace OnlineCrimeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CriminalUpdateController : ControllerBase
    {
        [HttpPut]
        public IActionResult Update(Criminal c)
        {
            try
            {
                CriminalData data = new CriminalData();

                bool result = data.UpdateCriminal(c);

                if (result)
                    return Ok("Criminal updated successfully");

                return NotFound("Criminal ID not found");


            } catch (Exception ex) 

            { 
              return BadRequest(ex.Message);
            }
        }
    }
}
