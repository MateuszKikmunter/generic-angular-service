using System.Collections.Generic;
using System.Linq;

namespace GenericAngularService.Api.Services
{
    public class PropertyMappingService : IPropertyMappingService
    {
        private readonly IEnumerable<IPropertyMappingCollection> _mappingCollections;

        public PropertyMappingService(IEnumerable<IPropertyMappingCollection> mappingCollections)
        {
            _mappingCollections = mappingCollections;
        }

        public IList<IPropertyMapping> GetMappings<TSource, TDestination>()
        {
            return _mappingCollections.First(c => c.IsApplicable<TSource, TDestination>()).GetAssociatedMappings();
        }
    }
}
