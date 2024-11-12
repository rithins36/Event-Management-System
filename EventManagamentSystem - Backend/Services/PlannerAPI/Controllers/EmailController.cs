using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlannerAPI.Services;

namespace PlannerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly MailjetService _mailjetService;

        public EmailController(MailjetService mailjetService)
        {
            _mailjetService = mailjetService;
        }

        public class EmailRequest
        {
            public string ToEmail { get; set; }
            public string ToName { get; set; }
            public string Subject { get; set; }
            public string Text { get; set; }
            public string Html { get; set; }
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmail([FromBody] EmailRequest emailRequest)
        {
            bool result = await _mailjetService.SendEmailAsync(
                emailRequest.ToEmail,
                emailRequest.ToName,
                emailRequest.Subject,
                emailRequest.Text,
                emailRequest.Html
            );
            if (result)
            {
                Console.WriteLine("Email sent successfully!");
                return Ok("Email sent successfully!");
            }
            else
            {
                Console.WriteLine("Failed to send email.");
                return StatusCode(500, "Failed to send email.");
            }
        }
    }
}
