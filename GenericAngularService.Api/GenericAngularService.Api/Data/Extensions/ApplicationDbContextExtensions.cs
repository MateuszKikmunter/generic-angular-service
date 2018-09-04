using GenericAngularService.Api.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GenericAngularService.Api.Data.Extensions
{
    public static class ApplicationDbContextExtensions
    {
        public static void EnsureSeedDataForContext(this ApplicationDbContext context)
        {
            context.Employees.RemoveRange(context.Employees);
            context.Companies.RemoveRange(context.Companies);
            context.SaveChanges();

            var companies = new List<Company>
            {
                new Company
                {
                    Name = "Microsoft",
                    Industry = "IT",
                    Founded = new DateTimeOffset(1975, 4, 4, 0, 0, 0, new TimeSpan())
                },
                new Company
                {
                    Name = "Apple",
                    Industry = "IT",
                    Founded = new DateTimeOffset(1976, 4, 1, 0, 0, 0, new TimeSpan())
                },
                new Company
                {
                    Name = "Oracle",
                    Industry = "IT",
                    Founded = new DateTimeOffset(1977, 6, 16, 0, 0, 0, new TimeSpan())
                },
            };

            var employees = new List<Employee>
            {
                new Employee
                {
                    FirstName = "Matt",
                    LastName = "Kick",
                    Email = "matt.kick@microsoft.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Microsoft"))
                },
                new Employee
                {
                    FirstName = "John",
                    LastName = "Micro",
                    Email = "john.micro@microsoft.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Microsoft"))
                },
                new Employee
                {
                    FirstName = "Kathy",
                    LastName = "Apple",
                    Email = "kathy.apple@appleinc.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Apple"))
                },
                new Employee
                {
                    FirstName = "Tony",
                    LastName = "Goodman",
                    Email = "tony.Goodman@appleinc.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Apple"))
                },
                new Employee
                {
                    FirstName = "Bill",
                    LastName = "Bell",
                    Email = "bill.bell@oracle.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Oracle"))
                },
                new Employee
                {
                    FirstName = "Mia",
                    LastName = "Oracleson",
                    Email = "Mia.Oracleson@microsoft.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Oracle"))
                }
            };

            context.Companies.AddRange(companies);
            context.Employees.AddRange(employees);
            context.SaveChanges();
        }
    }
}
