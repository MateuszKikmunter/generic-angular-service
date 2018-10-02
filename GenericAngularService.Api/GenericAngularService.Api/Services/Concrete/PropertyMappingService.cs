﻿using System.Collections.Generic;
using System.Linq;
using GenericAngularService.Api.Services.Abstract;

namespace GenericAngularService.Api.Services.Concrete
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
            return _mappingCollections.FirstOrDefault(c => c.IsApplicable<TSource, TDestination>())?.GetAssociatedMappings() 
                   ?? new List<IPropertyMapping>();
        }
    }
}
