namespace EventCreationService.models
{
    public class Planner
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; }
        public int UserId { get; set; }
        public int VenueId { get; set; }
        public string VendorIds { get; set; } // Assuming VendorIds are stored as a list of integers
        public string PaymentStatus { get; set; }
        public string Status { get; set; }
    }
}
