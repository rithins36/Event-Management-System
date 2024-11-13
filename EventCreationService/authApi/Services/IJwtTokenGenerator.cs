using authApi.model;
using Microsoft.AspNetCore.Identity;

namespace authApi.Services
{
    public interface IJwtTokenGenerator
    {
        Task<string> GenerateToken(ApplicationUser applicationUser, UserManager<ApplicationUser> userManager);
    }
}
