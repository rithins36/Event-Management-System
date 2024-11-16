
using EventCreationService.Data;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using EventCreationService.services;

namespace EventCreationService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<PlannerDbContext>(Options => Options.UseSqlServer(builder.Configuration.GetConnectionString("Planner")));
            // Add services to the container.
            builder.Services.AddScoped <IPlannerService, PlannerService>() ;

            builder.Services.AddControllers();
            

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options =>

            {

                options.AddPolicy("AllowSpecificOrigin", builder =>

                {

                    builder.WithOrigins("http://localhost:4200") // Allow requests from Angular app

                       .AllowAnyMethod()

                       .AllowAnyHeader();

                });

            });

            var app = builder.Build();
            // Configure the HTTP request pipeline.
            app.UseCors("AllowSpecificOrigin");  // Apply the CORS policy here globally
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
