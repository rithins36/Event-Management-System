using System.ComponentModel.DataAnnotations.Schema;

namespace VenderRegistraionAPI.Models
{
    public class Vendor
    {
        public int VendorID { get; set; }
        public string Name { get; set; }
        //public string Email { get; set; }
        public string ContactInfo { get; set; }
        public string ServiceType { get; set; }
        //public string ServiceDescription { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal Cost { get; set; }
        //public string Status { get; set; }
    }
}
