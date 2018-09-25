using GenericAngularService.Api.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GenericAngularService.Api.Data.Abstract
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        Task<List<Employee>> GetAllWithDependenciesAsync();
        IQueryable<Employee> GetEmployees();
    }
}
