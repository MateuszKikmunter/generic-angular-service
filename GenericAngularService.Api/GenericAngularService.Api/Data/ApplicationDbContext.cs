using GenericAngularService.Api.Entities;
using GenericAngularService.Api.Entities.Config;
using Microsoft.EntityFrameworkCore;

namespace GenericAngularService.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CompanyConfig());
            modelBuilder.ApplyConfiguration(new EmployeeConfig());
        }
    }
}
