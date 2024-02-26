using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace persistence.Migrations
{
    /// <inheritdoc />
    public partial class update3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Roles_RoleId",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_RoleId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "Books");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "Books",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Books_RoleId",
                table: "Books",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Roles_RoleId",
                table: "Books",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id");
        }
    }
}
