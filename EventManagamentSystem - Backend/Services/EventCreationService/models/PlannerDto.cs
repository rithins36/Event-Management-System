namespace EventCreationService.models
{
    public class PlannerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; }
        public int UserId { get; set; }
        public int VenueId { get; set; }
        public string VendorIds { get; set; }
    }
}
