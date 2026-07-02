using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineCrimeAPI.Data;

namespace OnlineCrimeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserGetController : ControllerBase
    {
        [HttpGet]

        public IActionResult GetUsers()
        {
            UserData data = new UserData();

            return Ok(data.GetUsers());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            UserData data = new UserData();

            var result = data.GetById(id);

            if (result == null)
                return NotFound("User not found");

            return Ok(result);
        }
    }
}
