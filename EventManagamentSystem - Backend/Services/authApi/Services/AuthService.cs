﻿using authApi.model;
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
            try { 
            //{   // Prepare user data for User API
            //    var userData = new User
            //    {
            //        IdentityUserId = user.Id,
            //        DisplayName = registrationRequestDto.Name
            //    };

            //    var StreakData = new StreakDto
            //    {
            //        IdentityUserId = user.Id,
            //        Streak = 0
            //    };

            //    // Call User API to save additional user information
            //    var userApiUrl = "https://localhost:7080/api/User"; // Replace with actual URL
            //    var userContent = new StringContent(JsonSerializer.Serialize(userData), Encoding.UTF8, "application/json");

            //    var response = await _httpClient.PostAsync(userApiUrl, userContent);

            //    if (!response.IsSuccessStatusCode)
            //    {
            //        return "Failed to save user info in User API.";
            //    }

            //    // Call Streak API to save additional user information
            //    var StreakApiUrl = "https://localhost:7055/api/Streak/Create"; // Replace with actual URL
            //    var StreakContent = new StringContent(JsonSerializer.Serialize(StreakData), Encoding.UTF8, "application/json");

            //    var respon = await _httpClient.PostAsync(StreakApiUrl, StreakContent);

            //    if (!respon.IsSuccessStatusCode)
            //    {
            //        return "Failed to save Streak info in Streak API.";
            //    }



                var result = await _userManager.CreateAsync(user, registrationRequestDto.Password);
                if (result.Succeeded)
                {
                    var userToReturn = _db.ApplicationUser.First(user => user.UserName == registrationRequestDto.Email);

                    //working on this
                    var roleExist = await _roleManager.RoleExistsAsync("User");
                    if (!roleExist)
                    {
                        await _roleManager.CreateAsync(new IdentityRole("User"));
                    }


                    var resp = await _userManager.AddToRoleAsync(userToReturn, "User");

                    if (!resp.Succeeded)
                    {
                        return "Failed to save user info in User API.";
                    }


                    //UserDto userDto = new()
                    //{
                    //    Email = userToReturn.Email,
                    //    Id = userToReturn.Id,
                    //    Name = userToReturn.Name,
                    //    PhoneNumber = userToReturn.PhoneNumber
                    //};



                    return "";
                }
                else
                {
                    return result.Errors.FirstOrDefault().Description;
                }

            }
            catch (Exception ex)
            {

            return (ex.ToString());
            }
            return "Error";

        }
    }
}

