using System;
using System.Collections.Generic;
using System.Linq;
using GenericAngularService.Api.Entities;

namespace GenericAngularService.Api.UnitTests.TestHelpers
{
    internal static class TestSeed
    {
        public static List<Employee> GetEmployees()
        {
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
                new Company
                {
                    Name = "IBM",
                    Industry = "IT",
                    Founded = new DateTimeOffset(1911, 6, 16, 0, 0, 0, new TimeSpan())
                },
                new Company
                {
                    Name = "Amazon",
                    Industry = "IT",
                    Founded = new DateTimeOffset(1994, 7, 5, 0, 0, 0, new TimeSpan())
                },
                new Company
                {
                    Name = "Facebook",
                    Industry = "IT",
                    Founded = new DateTimeOffset(2004, 2, 4, 0, 0, 0, new TimeSpan())
                }
            };

            var employees = new List<Employee>
            {
                new Employee
                {
                    Id = 1,
                    FirstName = "Matt",
                    LastName = "Kick",
                    Email = "matt.kick@microsoft.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Microsoft"))
                },
                new Employee
                {
                    Id = 2,
                    FirstName = "Marcy",
                    LastName = "Grape",
                    Email = "marcy.grape@microsoft.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Microsoft"))
                },
                new Employee
                {
                    Id = 3,
                    FirstName = "John",
                    LastName = "Micro",
                    Email = "john.micro@microsoft.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Microsoft"))
                },
                new Employee
                {
                    Id = 4,
                    FirstName = "Kathy",
                    LastName = "Apple",
                    Email = "kathy.apple@appleinc.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Apple"))
                },
                new Employee
                {
                    Id = 5,
                    FirstName = "Conor",
                    LastName = "Bundy",
                    Email = "conor.bundy@appleinc.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Apple"))
                },
                new Employee
                {
                    Id = 6,
                    FirstName = "Tony",
                    LastName = "Goodman",
                    Email = "tony.Goodman@appleinc.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Apple"))
                },
                new Employee
                {
                    Id = 7,
                    FirstName = "Bill",
                    LastName = "Bell",
                    Email = "bill.bell@oracle.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Oracle"))
                },
                new Employee
                {
                    Id = 8,
                    FirstName = "John",
                    LastName = "Kemper",
                    Email = "john.kemper@oracle.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Oracle"))
                },
                new Employee
                {
                    Id = 9,
                    FirstName = "Mia",
                    LastName = "Oracleson",
                    Email = "Mia.Oracleson@microsoft.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Oracle"))
                },
                new Employee
                {
                    Id = 10,
                    FirstName = "Foo",
                    LastName = "Bar",
                    Email = "foo.bar@ibm.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("IBM"))
                },
                new Employee
                {
                    Id = 11,
                    FirstName = "Mike",
                    LastName = "Hannigan",
                    Email = "mike.Hannigan@ibm.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("IBM"))
                },
                new Employee
                {
                    Id = 12,
                    FirstName = "Phoebe",
                    LastName = "Gardner",
                    Email = "phoebe.gardner@ibm.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("IBM"))
                },
                new Employee
                {
                    Id = 13,
                    FirstName = "Markus",
                    LastName = "Zucker",
                    Email = "markus.zucker@facebook.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Facebook"))
                },
                new Employee
                {
                    Id = 14,
                    FirstName = "Zoe",
                    LastName = "Zuckerman",
                    Email = "zoe.zuckerman@facebook.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Facebook"))
                },
                new Employee
                {
                    Id = 15,
                    FirstName = "Bob",
                    LastName = "Bobbatron",
                    Email = "bob.bobbatron@facebook.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Facebook"))
                },
                new Employee
                {
                    Id = 16,
                    FirstName = "Jeff",
                    LastName = "Keff",
                    Email = "jeff.keff@amazon.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Amazon"))
                },
                new Employee
                {
                    Id = 17,
                    FirstName = "Kelly",
                    LastName = "Mills",
                    Email = "kelly.mills@amazon.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Amazon"))
                },
                new Employee
                {
                    Id = 18,
                    FirstName = "Bud",
                    LastName = "Weiser",
                    Email = "bud.weiser@amazon.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Amazon"))
                }
            };

            return employees;
        }

        public static IQueryable<Employee> GetQueryableEmployees()
        {
            return GetEmployees().AsQueryable();
        }
    }
}
