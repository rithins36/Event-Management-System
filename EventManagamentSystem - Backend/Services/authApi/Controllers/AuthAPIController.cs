using authApi.model.Dto;
using authApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace authApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthAPIController : ControllerBase
    {
        private readonly IAuthService _authService;
        protected ResponseDto _response;


        public AuthAPIController(IAuthService authService)
        {
            _authService = authService;
            _response = new();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequestDto model)
        {
            var errorMessage = await _authService.Register(model);
            if (!string.IsNullOrEmpty(errorMessage))
            {
                _response.Issuccess = true;
                _response.Message = errorMessage;
               
                return Ok(_response);
            }
            else
            { // Added more information into the response
                _response.Issuccess = false;
                _response.Message = "Registration not successful";
                //////}

                return BadRequest(_response);
            }
        }
            [HttpPost("login")]
            public async Task<IActionResult> Login([FromBody] LoginRequestDto model)
            {
                var loginResponse = await _authService.Login(model);
                if (loginResponse.User == null)
                {
                    _response.Issuccess = false;
                    _response.Message = "Username and password incorrect";
                    return BadRequest(_response);
                }
                _response.Result = loginResponse;
                return Ok(_response);
            }

            [HttpPost("AssignRole")]
            public async Task<IActionResult> AssignRole([FromBody] RoleRequestDto model)
            {
                var assignRoleSucessful = await _authService.AssignRole(model.Email, model.Role.ToUpper());
                if (!assignRoleSucessful)
                {
                    _response.Issuccess = false;
                    _response.Message = "Error Encountered";
                    return BadRequest(_response);
                }
                return Ok(_response);

            }
        }
    } 

