using System.Collections.Generic;

namespace GenericAngularService.Api.Services.Abstract
{
    public interface IPropertyMappingService
    {
        IList<IPropertyMapping> GetMappings<TSource, TDestination>();
    }
}
