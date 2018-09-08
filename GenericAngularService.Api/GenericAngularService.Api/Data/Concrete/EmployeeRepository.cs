using System.Collections.Generic;
using System.Threading.Tasks;
using GenericAngularService.Api.Data.Abstract;
using GenericAngularService.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace GenericAngularService.Api.Data.Concrete
{
    public class EmployeeRepository : Repository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(ApplicationDbContext context) : base(context)
        {
        }

        public Task<List<Employee>> GetAllWithDependenciesAsync()
        {
            return _context.Employees.Include(e => e.Company).ToListAsync();
        }
    }
}
