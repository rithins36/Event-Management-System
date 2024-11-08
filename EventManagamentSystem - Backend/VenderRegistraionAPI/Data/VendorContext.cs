using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VenderRegistraionAPI.Models;

namespace VenderRegistraionAPI.Data
{
    public class VendorContext : DbContext
    {
        public VendorContext (DbContextOptions<VendorContext> options)
            : base(options)
        {
        }

        public DbSet<Vendor> Vendors { get; set; } = default!;
    }
}
