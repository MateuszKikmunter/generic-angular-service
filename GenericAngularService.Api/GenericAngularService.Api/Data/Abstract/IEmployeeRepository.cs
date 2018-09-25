using GenericAngularService.Api.Entities;
using System.Linq;

namespace GenericAngularService.Api.Data.Abstract
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        IQueryable<Employee> GetEmployees();
    }
}
