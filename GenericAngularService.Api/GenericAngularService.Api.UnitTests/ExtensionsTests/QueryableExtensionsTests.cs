using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using GenericAngularService.Api.Extensions;
using GenericAngularService.Api.Helpers.DataTablesServerSideHelpers;
using GenericAngularService.Api.Services.Abstract;
using GenericAngularService.Api.Services.Concrete;
using GenericAngularService.Api.UnitTests.TestHelpers;
using NUnit.Framework;

namespace GenericAngularService.Api.UnitTests.ExtensionsTests
{
    [TestFixture]
    public class QueryableExtensionsTests
    {
        private IList<IPropertyMapping> _propertyMappings;

        [SetUp]
        public void SetUp()
        {
            _propertyMappings = new List<IPropertyMapping>
            {
                new PropertyMapping("Id", "Id"),
                new PropertyMapping("FirstName", "FirstName"),
                new PropertyMapping("LastName", "LastName"),
                new PropertyMapping("Company.Name", "Company.Name"),
            };
        }

        [TearDown]
        public void TearDown()
        {
            _propertyMappings.Clear();
            _propertyMappings = null;
        }

        [Test]
        public void ApplySort_NoOrderDefined_ShouldReturnQuery()
        {
            //arrange
            var query = TestSeed.GetQueryableEmployees();
            var dtPostModel = new DataTablesOptions();

            //act
            var result = query.ApplySort(dtPostModel, _propertyMappings).ToList();


            //assert
            result.Should().BeEquivalentTo(query);
        }

        [Test]
        public void ApplySort_NoOrderableColumnsDefined_ShouldReturnQuery()
        {
            //arrange
            var query = TestSeed.GetQueryableEmployees();
            var dtPostModel = new DataTablesOptions
            {
                Order = new List<Order>
                {
                    new Order
                    {
                        Column = 0,
                        Dir = "asc"
                    }
                },
                Columns = new List<Column>
                {
                    new Column
                    {
                        Orderable = false
                    }
                }
            };

            //act
            var result = query.ApplySort(dtPostModel, _propertyMappings).ToList();

            //assert
            result.Should().BeEquivalentTo(query);
        }

        [Test]
        public void ApplySort_SortByDescending_ShouldReturnSortedEntities()
        {
            //arrange
            var query = TestSeed.GetQueryableEmployees();
            var dtPostModel = new DataTablesOptions
            {
                Columns = new List<Column>
                {
                    new Column
                    {
                        Data = "FirstName",
                        Orderable = true
                    }
                },
                Order = new List<Order>
                {
                    new Order
                    {
                        Column = 0,
                        Dir = "desc"
                    }
                }
            };

            //act
            var result = query.ApplySort(dtPostModel, _propertyMappings).ToList();

            //assert
            result.Should().BeInDescendingOrder(e => e.FirstName);
        }

        [Test]
        public void ApplySort_SortByAscending_ShouldReturnSortedEntities()
        {
            //arrange
            var query = TestSeed.GetQueryableEmployees();
            var dtPostModel = new DataTablesOptions
            {
                Columns = new List<Column>
                {
                    new Column
                    {
                        Data = "FirstName",
                        Orderable = true
                    }
                },
                Order = new List<Order>
                {
                    new Order
                    {
                        Column = 0,
                        Dir = "asc"
                    }
                }
            };

            //act
            var result = query.ApplySort(dtPostModel, _propertyMappings).ToList();

            //assert
            result.Should().BeInAscendingOrder(e => e.FirstName);
        }

        [Test]
        public void ApplySort_SortByAscending_NestedClassProperty_ShouldReturnSortedEntities()
        {
            //arrange
            var query = TestSeed.GetQueryableEmployees();
            var dtPostModel = new DataTablesOptions
            {
                Columns = new List<Column>
                {
                    new Column
                    {
                        Data = "Company.Name",
                        Orderable = true
                    }
                },
                Order = new List<Order>
                {
                    new Order
                    {
                        Column = 0,
                        Dir = "asc"
                    }
                }
            };

            //act
            var result = query.ApplySort(dtPostModel, _propertyMappings).ToList();

            //assert
            result.Should().BeInAscendingOrder(e => e.Company.Name);
        }

        [Test]
        public void ApplySort_SortByDescending_NestedClassProperty_ShouldReturnSortedEntities()
        {
            //arrange
            var query = TestSeed.GetQueryableEmployees();
            var dtPostModel = new DataTablesOptions
            {
                Columns = new List<Column>
                {
                    new Column
                    {
                        Data = "Company.Name",
                        Orderable = true
                    }
                },
                Order = new List<Order>
                {
                    new Order
                    {
                        Column = 0,
                        Dir = "desc"
                    }
                }
            };

            //act
            var result = query.ApplySort(dtPostModel, _propertyMappings).ToList();

            //assert
            result.Should().BeInDescendingOrder(e => e.Company.Name);
        }
    }
}
