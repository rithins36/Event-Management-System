using EventCreationService.Data;
using EventCreationService.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventCreationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlannerController : ControllerBase
    {
        private readonly PlannerDbContext _context;

        public PlannerController(PlannerDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult Get()
        {

            return Ok(_context.Planners.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult Get(int id)
        {

            return Ok(_context.Planners.Find(id));
        }

        [HttpPost]
        public IActionResult post(Planner planner)
        {
             _context.Planners.Add(planner);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult put(int id, Planner planner)
        {
            var u = _context.Planners.Find(id);
            if (u == null) { return BadRequest(); }
            u.Name=planner.Name;
            u.Status=planner.Status;
            u.PaymentStatus=planner.PaymentStatus;
            u.Date=planner.Date;
            u.VenueId=planner.VenueId;
            u.VendorIds=planner.VendorIds;
            u.Type=planner.Type;
            _context.SaveChanges();
            return Ok(u);
        }



        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult delete(int id) {
            var y = _context.Planners.Find(id);
            if (y == null) { return NotFound(); }
            _context.Planners.Remove(y);
            _context.SaveChanges();
            return Ok(y);
        
        }
    }
}
