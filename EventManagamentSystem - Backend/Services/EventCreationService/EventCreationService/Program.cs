
using EventCreationService.Data;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;

namespace EventCreationService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<PlannerDbContext>(Options => Options.UseSqlServer(builder.Configuration.GetConnectionString("Planner")));
            // Add services to the container.
            builder.Services.AddControllers();
           

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
