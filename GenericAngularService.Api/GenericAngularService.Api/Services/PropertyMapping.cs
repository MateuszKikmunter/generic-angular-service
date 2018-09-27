using System;

namespace GenericAngularService.Api.Services
{
    public class PropertyMapping : IPropertyMapping
    {
        public string SourceProperty { get; }
        public string DestinationProperty { get; }

        public PropertyMapping(string sourceProperty, string destinationProperty)
        {
            SourceProperty = sourceProperty;
            DestinationProperty = destinationProperty;
        }
    }
}
