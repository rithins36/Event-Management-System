using Microsoft.AspNetCore.Identity;

namespace authApi.model
{
    public class ApplicationUser : IdentityUser
    {
        public string? Name { get; set; }
    }
    
}
