using EventCreationService.models;

namespace EventCreationService.services
{
    public interface IPlannerService
    {
        Task<List<Planner>> GetAllPlannersAsync();
        Task<Planner> GetPlannerByIdAsync(int id);
        Task<PlannerDto> CreatePlannerAsync(PlannerDto plannerdto);
        Task<Planner> UpdatePlannerAsync(int id, HostDto hostdto);
        Task<Planner> UpdatePaymentStatus(int id, paymentstatusDto paymentstatusdto);

        Task<Planner> DeletePlannerAsync(int id);
    }
}
