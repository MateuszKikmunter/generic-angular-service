namespace GenericAngularService.Api.Services
{
    public interface IPropertyMapping
    {
        string SourceProperty { get; }
        string DestinationProperty { get; }
    }
}
