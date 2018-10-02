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

        #region Sorting Tests

        [Test]
        public void ApplySort_NoOrderDefined_ShouldReturnQuery()
        {
            //arrange
            var query = TestSeed.GetQueryableEmployees();
            var dtPostModel = new DataTablesOptions();

            //act
            var result = query.ApplySort(dtPostModel, _propertyMappings).ToList();

            //assert
            result.Should().BeEquivalentTo(query.ToList());
        }

        [Test]
        public void ApplySort_NoMappings_ShouldReturnQuery()
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
            var result = query.ApplySort(dtPostModel, new List<IPropertyMapping>()).ToList();

            //assert
            result.Should().BeEquivalentTo(query.ToList());
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
            result.Should().BeEquivalentTo(query.ToList());
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

        #endregion

        #region Dynamic Search Tests

        [Test]
        public void ApplySearch_NoMappings_ShouldReturnQuery()
        {
            //arrange
            var mappings = new List<IPropertyMapping>();
            var query = TestSeed.GetQueryableEmployees();

            //act
            var result = query.ApplySearch(new DataTablesOptions(), mappings).ToList();

            //assert
            result.Should().BeEquivalentTo(query.ToList());
        }

        [Test]
        public void ApplySearch_NoSearchableColumns_ShouldReturnQuery()
        {
            //arrange
            var query = TestSeed.GetQueryableEmployees();

            //act
            var result = query.ApplySearch(new DataTablesOptions(), _propertyMappings).ToList();

            //assert
            result.Should().BeEquivalentTo(query.ToList());
        }

        [Test]
        public void ApplySearch_NoMatchingSearchValue_ShouldReturnQuery()
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
                        Searchable = true
                    },
                    new Column
                    {
                        Data = "LastName",
                        Searchable = true
                    }
                },
                Search = new Search
                {
                    Regex = string.Empty,
                    Value = "Oh my God, zombies!"
                }
            };

            //act
            var result = query.ApplySearch(dtPostModel, _propertyMappings).ToList();

            //assert
            result.Should().BeNullOrEmpty();
        }

        [Test]
        public void ApplySearch_MatchingSearchValue_ShouldReturnAllMatchingEntities()
        {
            //arrange
            var query = TestSeed.GetQueryableEmployees();
            var expected = query.Where(e => e.FirstName.Equals("John")).ToList();
            var dtPostModel = new DataTablesOptions
            {
                Columns = new List<Column>
                {
                    new Column
                    {
                        Data = "FirstName",
                        Searchable = true
                    },
                    new Column
                    {
                        Data = "LastName",
                        Searchable = true
                    }
                },
                Search = new Search
                {
                    Regex = string.Empty,
                    Value = "John"
                }
            };

            //act
            var result = query.ApplySearch(dtPostModel, _propertyMappings).ToList();

            //assert
            result.Should().NotBeNullOrEmpty();
            result.Count.Should().Be(expected.Count);
            result.Select(e => e.FirstName.Should().Be("John"));
        }

        [Test]
        public void ApplySearch_NestedProperty_ShouldReturnAllMatchingEntities()
        {
            //arrange
            var query = TestSeed.GetQueryableEmployees();
            var expected = query.Where(e => e.Company.Name.Equals("Microsoft")).ToList();
            var dtPostModel = new DataTablesOptions
            {
                Columns = new List<Column>
                {
                    new Column
                    {
                        Data = "Company.Name",
                        Searchable = true
                    }
                },
                Search = new Search
                {
                    Regex = string.Empty,
                    Value = "Microsoft"
                }
            };

            //act
            var result = query.ApplySearch(dtPostModel, _propertyMappings).ToList();

            //assert
            result.Should().NotBeNullOrEmpty();
            result.Count.Should().Be(expected.Count);
            result.Select(e => e.Company.Name.Should().Be("Microsoft"));
        }

        [Test]
        public void ApplySearch_NonStringValue_MatchingSearchValue_ShouldReturnAllMatchingEntities()
        {
            //arrange
            var query = TestSeed.GetQueryableEmployees();
            var expectedId = query.First().Id;
            var dtPostModel = new DataTablesOptions
            {
                Columns = new List<Column>
                {
                    new Column
                    {
                        Data = "Id",
                        Searchable = true
                    }
                },
                Search = new Search
                {
                    Regex = string.Empty,
                    Value = expectedId.ToString()
                }
            };

            //act
            var result = query.ApplySearch(dtPostModel, _propertyMappings).ToList();

            //assert
            result.Should().NotBeNullOrEmpty();
            result.Count.Should().Be(1);
            result.First().Id.Should().Be(expectedId);
        }

        #endregion
    }
}
