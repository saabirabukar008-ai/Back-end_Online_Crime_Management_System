using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineCrimeAPI.Data;

namespace OnlineCrimeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDeleteController : ControllerBase
    {
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                UserData data = new UserData();

                bool result = data.DeleteUser(id);

                if (result)
                {
                    return Ok("User deleted successfully");
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

