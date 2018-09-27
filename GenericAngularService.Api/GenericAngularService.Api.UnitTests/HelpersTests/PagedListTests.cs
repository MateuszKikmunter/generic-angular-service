using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using GenericAngularService.Api.Entities;
using GenericAngularService.Api.Extensions;
using GenericAngularService.Api.Helpers.DataTablesServerSideHelpers;
using GenericAngularService.Api.UnitTests.Helpers;
using NUnit.Framework;

namespace GenericAngularService.Api.UnitTests.HelpersTests
{
    [TestFixture]
    public class PagedListTests
    {
        private List<Employee> _employees;

        [SetUp]
        public void SetUp()
        {
            _employees = TestSeed.GetEmployees();
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
    }
}

