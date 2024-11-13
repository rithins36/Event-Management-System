using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EventCreationService.Migrations
{
    /// <inheritdoc />
    public partial class lkl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Planners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    VenueId = table.Column<int>(type: "int", nullable: false),
                    VendorIds = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaymentStatus = table.Column<bool>(type: "bit", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Planners", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Planners",
                columns: new[] { "Id", "Date", "Name", "PaymentStatus", "Status", "Type", "UserId", "VendorIds", "VenueId" },
                values: new object[] { 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "srinu", false, false, "birthday", 1, "1,2,3,4", 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Planners");
        }
    }
}
