using Microsoft.AspNetCore.Mvc;
using OnlineCrimeAPI.Data;

namespace OnlineCrimeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public class LoginRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Username iyo Password labadaba waa loo baahan yahay");
            }

            UserData data = new UserData();
            var user = data.CheckLogin(request.Username, request.Password);

            if (user == null)
            {
                return Unauthorized("Username ama Password khaldan");
            }

            return Ok(user);
        }
    }
}