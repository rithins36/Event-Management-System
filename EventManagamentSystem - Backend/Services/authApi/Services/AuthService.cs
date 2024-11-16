using authApi.model;
using authApi.model.Dto;
using Microsoft.AspNetCore.Identity;
using static authApi.Data.authDbcontext;
using System.Text.Json;
using System.Text;

namespace authApi.Services
{
    public class AuthService : IAuthService
    {
        public readonly AppDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly HttpClient _httpClient;

        public AuthService(HttpClient httpClient, AppDbContext db, IJwtTokenGenerator jwtTokenGenerator, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _db = db;
            _userManager = userManager;
            _jwtTokenGenerator = jwtTokenGenerator;
            _roleManager = roleManager;
            _httpClient = httpClient;
        }

        public async Task<bool> AssignRole(string email, string roleName)
        {
            var user = _db.ApplicationUser.FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
            if (user != null)
            {
                //if (!_roleManager.RoleExistsAsync(roleName).GetAwaiter().GetResult())
                //{
                //    //create role if it is not in existance
                //    _roleManager.CreateAsync(new IdentityRole(roleName)).GetAwaiter().GetResult();
                //}
                //await _userManager.AddToRoleAsync(user, roleName);
                //return true;
                // Remove all existing roles
                var currentRoles = await _userManager.GetRolesAsync(user);
                var removeRolesResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
                
                if (!removeRolesResult.Succeeded)
                { // Log or handle failure in removing roles
                    return false;
                }

                // Ensure the role exists, and create it if necessary
                if (!await _roleManager.RoleExistsAsync(roleName))
                {
                    await _roleManager.CreateAsync(new IdentityRole(roleName));
                }

                // Add the new role to the user
                var addRoleResult = await _userManager.AddToRoleAsync(user, roleName);

                if (addRoleResult.Succeeded)
                {
                    return true;
                }
                else
                {
                    // Log or handle failure in assigning the role
                    return false;
                }

            }
            return false;

        }

        public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto)
        {
            var user = _db.ApplicationUser.FirstOrDefault(u => u.UserName.ToLower() == loginRequestDto.UserName.ToLower());
            bool isValid = await _userManager.CheckPasswordAsync(user, loginRequestDto.Password);
            //if role found ,generate token
            var token = await _jwtTokenGenerator.GenerateToken(user, _userManager);
            if (isValid == false || user == null)
            {
                return new LoginResponseDto() { User = null, Token = "" };
            }
            UserDto userDto = new()
            {
                Email = user.Email,
                Id = user.Id,
                Name = user.Name,
                PhoneNumber = user.PhoneNumber
            };
            LoginResponseDto loginResponseDto = new LoginResponseDto()
            {
                User = userDto,
                Token = token
            };
            return loginResponseDto;

        }

        public async Task<string> Register(RegistrationRequestDto registrationRequestDto)
        {
            ApplicationUser user = new()
            {
                UserName = registrationRequestDto.Email,
                Email = registrationRequestDto.Email,
                NormalizedEmail = registrationRequestDto.Email.ToUpper(),
                Name = registrationRequestDto.Name,
                PhoneNumber = registrationRequestDto.PhoneNumber,
            };

            try
            {
                // Create the user in the Identity framework
                var result = await _userManager.CreateAsync(user, registrationRequestDto.Password);
                if (!result.Succeeded)
                {
                    return result.Errors.FirstOrDefault()?.Description ?? "User creation failed.";
                }

                // Validate the role
                var roleName = registrationRequestDto.Role ?? "User"; // Default role if none provided
                if (!await _roleManager.RoleExistsAsync(roleName))
                {
                    await _roleManager.CreateAsync(new IdentityRole(roleName));
                }

                // Assign the role to the user
                var roleAssignmentResult = await _userManager.AddToRoleAsync(user, roleName);
                if (!roleAssignmentResult.Succeeded)
                {
                    return "Failed to assign role to the user.";
                }

                return "Registration successful.";
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return ex.ToString();
            }
        }

    }
}

