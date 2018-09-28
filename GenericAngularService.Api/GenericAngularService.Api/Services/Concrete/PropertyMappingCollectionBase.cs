using System.Collections.Generic;
using GenericAngularService.Api.Services.Abstract;

namespace GenericAngularService.Api.Services.Concrete
{
    public abstract class PropertyMappingCollectionBase<TSource, TDestination> : IPropertyMappingCollection
    {
        protected virtual IList<IPropertyMapping> _mappings { get; } = new List<IPropertyMapping>();

        public abstract IList<IPropertyMapping> GetAssociatedMappings();

        public virtual bool IsApplicable<TMappingSource, TMappingDestination>()
        {
            return typeof(TMappingSource) == typeof(TSource) && typeof(TMappingDestination) == typeof(TDestination);
        }
    }
}
