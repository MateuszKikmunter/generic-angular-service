using System.Collections.Generic;

namespace GenericAngularService.Api.Services.Abstract
{
    public interface IPropertyMappingCollection
    {
        IList<IPropertyMapping> GetAssociatedMappings();
        bool IsApplicable<TSource, TDestination>();
    }
}
