using Mailjet.Client;
using Mailjet.Client.Resources;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
namespace PlannerAPI.Services
{
    public class MailjetService
    {
        private readonly MailjetClient _client;
        private readonly string _senderEmail;
        private readonly string _senderName;

        public MailjetService(IConfiguration configuration)
        {
            var apiKey = configuration["Mailjet:ApiKey"];
            var apiSecret = configuration["Mailjet:ApiSecret"];
            _senderEmail = configuration["Mailjet:SenderEmail"];
            _senderName = configuration["Mailjet:SenderName"];

            _client = new MailjetClient(apiKey, apiSecret);
        }

        public async Task<bool> SendEmailAsync(string recipientEmail, string recipientName, string subject, string textContent, string htmlContent)
        {

            var request = new MailjetRequest
            {
                Resource = Send.Resource
            }
            .Property(Send.Messages, new JArray {
             new JObject {
                        {"FromEmail", _senderEmail},
                        {"FromName", _senderName},
                        {"Recipients", new JArray {
                            new JObject {
                                {"Email", recipientEmail},
                                {"Name", recipientName}
                            }
                        }},
                        {"Subject", subject},
                        {"TextPart", textContent},
                        {"HTMLPart", htmlContent}
                    }       
            });

            MailjetResponse response = await _client.PostAsync(request);

            if (response.IsSuccessStatusCode)
            {
                return true;
            }
            else
            {
                Console.WriteLine($"Failed to send email. Status: {response.StatusCode}");
                if (response.GetData() != null)
                {
                    Console.WriteLine("Error Data: " + response.GetData().ToString());
                }
                if (!string.IsNullOrEmpty(response.GetErrorMessage()))
                {
                    Console.WriteLine("Error Message: " + response.GetErrorMessage());
                }
                return false;
            }
        }
    }
}
