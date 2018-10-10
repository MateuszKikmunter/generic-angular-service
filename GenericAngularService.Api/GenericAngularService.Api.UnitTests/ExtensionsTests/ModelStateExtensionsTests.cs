using System.Linq;
using FluentAssertions;
using GenericAngularService.Api.Extensions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NUnit.Framework;

namespace GenericAngularService.Api.UnitTests.ExtensionsTests
{
    [TestFixture]
    public class ModelStateExtensionsTests
    {
        private ModelStateDictionary _modelState;

        [Test]
        public void GetValidationErrors_NoErrors_ShouldReturnEmptyCollection()
        {
            //arrange
            _modelState = new ModelStateDictionary();

            //act
            var result = _modelState.GetValidationErrors();

            //assert
            result.Should().BeEmpty();
        }

        [Test]
        public void GetValidationErrors_ModelStateInvalid_ShouldReturnCollectionOfStrings()
        {
            //arrange
            _modelState = new ModelStateDictionary();
            _modelState.AddModelError("Error", "Error1");
            _modelState.AddModelError("Ooops", "Error2");

            //act
            var result = _modelState.GetValidationErrors();

            //assert
            result.Should().NotBeNullOrEmpty();
            result.Count().Should().Be(2);
            result.First().Should().Be("Error1");
            result.Last().Should().Be("Error2");
        }
    }
}
