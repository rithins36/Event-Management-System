using EventCreationService.Data;
using EventCreationService.models;
using EventCreationService.services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventCreationService.Controllers
{
    [Route("api/Event")]
    [ApiController]
    public class PlannerController : ControllerBase
    {
        private readonly IPlannerService _plannerService;

        public PlannerController(IPlannerService plannerService)
        {
            _plannerService = plannerService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var planners = await _plannerService.GetAllPlannersAsync();
            return Ok(planners);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var planner = await _plannerService.GetPlannerByIdAsync(id);
            if (planner == null)
            {
                return NotFound();
            }
            return Ok(planner);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PlannerDto planner)
        {
            var createdPlanner = await _plannerService.CreatePlannerAsync(planner);
            return CreatedAtAction(nameof(Get), new { id = createdPlanner.Id }, createdPlanner);
        }

        [HttpPut]
        [Route("changestatus/{id:int}")]
        public async Task<IActionResult> Put(int id, [FromBody] HostDto hostDto)
        {
            var updatedPlanner = await _plannerService.UpdatePlannerAsync(id, hostDto);
            if (updatedPlanner == null)
            {
                return NotFound();
            }
            return Ok(updatedPlanner);
        }

        [HttpPut]
        [Route("paymentstatus/{id:int}")]
        public async Task<IActionResult> Putu(int id, [FromBody] paymentstatusDto p)
        {
            var update = await _plannerService.UpdatePaymentStatus(id, p);
            if(update == null) { return NotFound(); }
            return Ok(update);

        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deletedPlanner = await _plannerService.DeletePlannerAsync(id);
            if (deletedPlanner == null)
            {
                return NotFound();
            }
            return Ok(deletedPlanner);
        }
        //private readonly PlannerDbContext _context;

        //public PlannerController(PlannerDbContext context)
        //{
        //    _context = context;
        //}
        //[HttpGet]
        //public IActionResult Get()
        //{

        //    return Ok(_context.Planners.ToList());
        //}

        //[HttpGet]
        //[Route("{id:int}")]
        //public IActionResult Get(int id)
        //{

        //    return Ok(_context.Planners.Find(id));
        //}

        //[HttpPost]
        //public IActionResult post(Planner planner)
        //{
        //     _context.Planners.Add(planner);
        //    _context.SaveChanges();
        //    return Ok();
        //}

        //[HttpPut]
        //[Route("{id:int}")]
        //public IActionResult put(int id, Planner planner)
        //{
        //    var u = _context.Planners.Find(id);
        //    if (u == null) { return BadRequest(); }
        //    u.Name=planner.Name;
        //    u.Status=planner.Status;
        //    u.PaymentStatus=planner.PaymentStatus;
        //    u.Date=planner.Date;
        //    u.VenueId=planner.VenueId;
        //    u.VendorIds=planner.VendorIds;
        //    u.Type=planner.Type;
        //    _context.SaveChanges();
        //    return Ok(u);
        //}



        //[HttpDelete]
        //[Route("{id:int}")]
        //public IActionResult delete(int id) {
        //    var y = _context.Planners.Find(id);
        //    if (y == null) { return NotFound(); }
        //    _context.Planners.Remove(y);
        //    _context.SaveChanges();
        //    return Ok(y);

        //}
    }
}
