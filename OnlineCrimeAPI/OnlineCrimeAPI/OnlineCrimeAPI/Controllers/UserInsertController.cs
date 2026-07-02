using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineCrimeAPI.Data;
using OnlineCrimeAPI.Models;

namespace OnlineCrimeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserInsertController : ControllerBase
    {

        [HttpPost]

        public IActionResult InsertUser(Users add)
        {
            try
            {
                UserData data = new UserData();

                data.InsertUser(add);

                return Ok("User inserted successfully");
            } 

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
