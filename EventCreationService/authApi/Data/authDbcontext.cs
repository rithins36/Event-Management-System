using authApi.model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace authApi.Data
{
    public class authDbcontext
    {
        public class AppDbContext : IdentityDbContext<ApplicationUser>
        {
            public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
            //public DbSet<Coupon> Coupons { get; set; }
            public DbSet<ApplicationUser> ApplicationUser { get; set; }

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder);

            }
        }
    }
}
