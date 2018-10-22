using System.Linq;
using GenericAngularService.Api.Entities;

namespace GenericAngularService.Api.Data.Abstract
{
    public interface ICompanyRepository : IRepository<Company>
    {
        IQueryable<Company> GetCompanies();
    }
}
