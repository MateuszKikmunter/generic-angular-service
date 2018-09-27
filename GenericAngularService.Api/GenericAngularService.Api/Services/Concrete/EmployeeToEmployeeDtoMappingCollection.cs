using System.Collections.Generic;
using GenericAngularService.Api.Services.Abstract;

namespace GenericAngularService.Api.Services.Concrete
{
    public class EmployeeToEmployeeDtoMappingCollection<TSource, TDestination> : IPropertyMappingCollection
    {
        private IList<IPropertyMapping> _mappings => new List<IPropertyMapping>
        {
            new PropertyMapping("Active", "Active"),
            new PropertyMapping("Company.Name", "Company"),
            new PropertyMapping("Email", "Email"),
            new PropertyMapping("FirstName", "FirstName"),
            new PropertyMapping("Id", "Id"),
            new PropertyMapping("LastName", "LastName"),
        };

        public IList<IPropertyMapping> GetAssociatedMappings()
        {
            return _mappings;
        }

        public bool IsApplicable<TMappingSource, TMappingDestination>()
        {
            return typeof(TMappingSource) == typeof(TSource) && typeof(TMappingDestination) == typeof(TDestination);
        }
    }
}
