using GenericAngularService.Api.Services.Abstract;

namespace GenericAngularService.Api.Services.Concrete
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
