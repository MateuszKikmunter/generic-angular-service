using System.Collections.Generic;

namespace GenericAngularService.Api.Services
{
    public interface IPropertyMappingService
    {
        IList<IPropertyMapping> GetMappings<TSource, TDestination>();
    }
}
