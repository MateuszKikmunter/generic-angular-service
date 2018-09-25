using System;
using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using GenericAngularService.Api.Entities;
using GenericAngularService.Api.Extensions;
using GenericAngularService.Api.Helpers.DataTablesServerSideHelpers;
using NUnit.Framework;

namespace GenericAngularService.Api.UnitTests
{
    [TestFixture]
    public class PagedListTests
    {
        private List<Employee> _employees;

        [SetUp]
        public void SetUp()
        {
            _employees = new List<Employee>();
            Seed();
        }

        [TearDown]
        public void TearDown()
        {
            _employees.Clear();
            _employees = null;
        }


        [Test]
        public void ToPagedList_Should_CreatePagedListWithDataOnlyForTheFirstPage()
        {
            //arrange
            var paginationData = new DataTableAjaxPostModel
            {
                Length = 5,
                Start = 0
            };

            //act
            var result = _employees.AsQueryable().ToPagedList(paginationData);

            //assert
            result.Count.Should().Be(paginationData.Length);
            result.PageSize.Should().Be(paginationData.Length);
            result.PageNumber.Should().Be(1);
            result.TotalCount.Should().Be(_employees.Count);
        }

        [Test]
        public void ToPagedList_Should_CreatePagedListWithDataForTheNextPage()
        {
            //arrange
            var paginationData = new DataTableAjaxPostModel
            {
                Length = 5,
                Start = 5
            };

            //act
            var result = _employees.AsQueryable().ToPagedList(paginationData);

            //assert
            result.Count.Should().Be(paginationData.Length);
            result.PageSize.Should().Be(paginationData.Length);
            result.PageNumber.Should().Be(2);
            result.TotalCount.Should().Be(_employees.Count);
        }

        [Test]
        public void ToPagedList_ShouldReturnDataForTheLastPage()
        {
            //arrange
            var sourceCount = _employees.Count;
            var paginationData = new DataTableAjaxPostModel
            {
                Length = 5,
                Start = 15
            };

            //act
            var result = _employees.AsQueryable().ToPagedList(paginationData);

            //assert
            result.Count.Should().Be(sourceCount - paginationData.Start);
            result.PageSize.Should().Be(paginationData.Length);
            result.PageNumber.Should().Be(4);
            result.TotalCount.Should().Be(sourceCount);
        }

        private void Seed()
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
                    FirstName = "Matt",
                    LastName = "Kick",
                    Email = "matt.kick@microsoft.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Microsoft"))
                },
                new Employee
                {
                    FirstName = "Marcy",
                    LastName = "Grape",
                    Email = "marcy.grape@microsoft.com",
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
                    FirstName = "Conor",
                    LastName = "Bundy",
                    Email = "conor.bundy@appleinc.com",
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
                    FirstName = "John",
                    LastName = "Kemper",
                    Email = "john.kemper@oracle.com",
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
                },
                new Employee
                {
                    FirstName = "Foo",
                    LastName = "Bar",
                    Email = "foo.bar@ibm.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("IBM"))
                },
                new Employee
                {
                    FirstName = "Mike",
                    LastName = "Hannigan",
                    Email = "mike.Hannigan@ibm.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("IBM"))
                },
                new Employee
                {
                    FirstName = "Phoebe",
                    LastName = "Gardner",
                    Email = "phoebe.gardner@ibm.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("IBM"))
                },
                new Employee
                {
                    FirstName = "Markus",
                    LastName = "Zucker",
                    Email = "markus.zucker@facebook.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Facebook"))
                },
                new Employee
                {
                    FirstName = "Zoe",
                    LastName = "Zuckerman",
                    Email = "zoe.zuckerman@facebook.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Facebook"))
                },
                new Employee
                {
                    FirstName = "Bob",
                    LastName = "Bobbatron",
                    Email = "bob.bobbatron@facebook.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Facebook"))
                },
                new Employee
                {
                    FirstName = "Jeff",
                    LastName = "Keff",
                    Email = "jeff.keff@amazon.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Amazon"))
                },
                new Employee
                {
                    FirstName = "Kelly",
                    LastName = "Mills",
                    Email = "kelly.mills@amazon.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Amazon"))
                },
                new Employee
                {
                    FirstName = "Bud",
                    LastName = "Weiser",
                    Email = "bud.weiser@amazon.com",
                    Active = true,
                    Company = companies.First(c => c.Name.Equals("Amazon"))
                }
            };

            _employees.AddRange(employees);
        }
    }
}

