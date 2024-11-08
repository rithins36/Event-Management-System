
using EventCreationService.models;
using Microsoft.EntityFrameworkCore;

namespace EventCreationService.Data
{
    public class PlannerDbContext : DbContext
    {
        public PlannerDbContext( DbContextOptions<PlannerDbContext> options) : base(options)
        {
        }
        public DbSet<Planner> Planners { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Planner>().HasData(new Planner { Id = 1, Name = "srinu", Type = "birthday", UserId = 1, VenueId = 1, VendorIds = "1,2,3,4",PaymentStatus="na",Status="Done" });
        }


    }
}
