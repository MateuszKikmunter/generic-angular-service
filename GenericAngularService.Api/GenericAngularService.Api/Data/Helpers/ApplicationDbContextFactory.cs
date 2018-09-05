using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace GenericAngularService.Api.Data.Helpers
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var configBuilder = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json", true, true)
                .Build()
                .GetConnectionString("ApiConnection");

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>().UseSqlServer(configBuilder);

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
