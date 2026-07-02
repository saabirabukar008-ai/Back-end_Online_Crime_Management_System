using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineCrimeAPI.Data;
using OnlineCrimeAPI.Models;

namespace OnlineCrimeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserUpdateController : ControllerBase
    {
        [HttpPut]
        public IActionResult UpdateUser(Users update)
        {
            try
            {
                UserData data = new UserData();

                bool result = data.UpdateUser(update);

                if (result)
                {
                    return Ok("User updated successfully");
                }
                else
                {
                    return NotFound("User ID not found");
                }
            }
            catch (Exception ex) 
            { 
                return BadRequest(ex.Message);
            }
        }

    }
}
