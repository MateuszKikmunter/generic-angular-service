using System.Collections.Generic;
using GenericAngularService.Api.Services.Abstract;

namespace GenericAngularService.Api.Services.Concrete
{
    public class CompanyToCompanyDtoMappingCollection<TSource, TDestination> : PropertyMappingCollectionBase<TSource, TDestination>
    {
        protected override IList<IPropertyMapping> _mappings => new List<IPropertyMapping>
        {
            new PropertyMapping("Id", "Id"),
            new PropertyMapping("Name", "Name"),
            new PropertyMapping("Industry", "Industry"),
            new PropertyMapping("Founded", "Founded")
        };

        public override IList<IPropertyMapping> GetAssociatedMappings()
        {
            return _mappings;
        }
    }
}
