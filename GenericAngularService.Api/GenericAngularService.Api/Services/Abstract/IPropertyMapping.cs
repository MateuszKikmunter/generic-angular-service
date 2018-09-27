namespace GenericAngularService.Api.Services.Abstract
{
    public interface IPropertyMapping
    {
        string SourceProperty { get; }
        string DestinationProperty { get; }
    }
}
