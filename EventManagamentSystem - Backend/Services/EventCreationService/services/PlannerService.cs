using EventCreationService.Data;
using EventCreationService.models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace EventCreationService.services
{
    public class PlannerService : IPlannerService
    {
        private readonly PlannerDbContext _context;

        public PlannerService(PlannerDbContext context)
        {
            _context = context;
        }

        public async Task<List<Planner>> GetAllPlannersAsync()
        {
            return await _context.Planners.ToListAsync();
        }

        public async Task<Planner> GetPlannerByIdAsync(int id)
        {
            return await _context.Planners.FindAsync(id);
        }

        public async Task<PlannerDto> CreatePlannerAsync(PlannerDto plannerdto)
        {
            Planner p = new Planner()
            {  Id = plannerdto.Id,
                Name = plannerdto.Name,
                Date = DateTime.Now,
                VendorIds = plannerdto.VendorIds,
                VenueId = plannerdto.VenueId,
                Type = plannerdto.Type,
                UserId = plannerdto.UserId,
                PaymentStatus=false,
            };
            await _context.Planners.AddAsync(p);
            await _context.SaveChangesAsync();
            return plannerdto;
        }

        public async Task<Planner> UpdatePlannerAsync(int id, HostDto hostDto)
        {
            var existingPlanner = await _context.Planners.FindAsync(id);
            if (existingPlanner == null)
            {
                return null; // Or you can throw an exception if you want
            }
    
            existingPlanner.Status = hostDto.Status;
           

            await _context.SaveChangesAsync();
            return existingPlanner;
        }

        public async Task<Planner> UpdatePaymentStatus(int id, paymentstatusDto paymentstatusdto)
        {
            var exits = await _context.Planners.FindAsync(id);
            if(exits == null) { return null; }
            exits.PaymentStatus= paymentstatusdto.PaymentStatus;
            await _context.SaveChangesAsync();
            return exits;
        }

        public async Task<Planner> DeletePlannerAsync(int id)
        {
            var planner = await _context.Planners.FindAsync(id);
            if (planner == null)
            {
                return null; // Or throw an exception
            }

            _context.Planners.Remove(planner);
            await _context.SaveChangesAsync();
            return planner;
        }
    }

}
