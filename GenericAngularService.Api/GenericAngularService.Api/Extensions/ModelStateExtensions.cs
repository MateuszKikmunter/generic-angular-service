using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace GenericAngularService.Api.Extensions
{
    public static class ModelStateExtensions
    {
        public static IEnumerable<string> GetValidationErrors(this ModelStateDictionary modelState)
        {
            return modelState.Values.SelectMany(modelStateEntry => modelStateEntry.Errors).Select(error => error.ErrorMessage);
        }
    }
}
