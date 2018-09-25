using System.Linq;
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

        public IQueryable<Employee> GetEmployees()
        {
            return _context.Employees.Include(e => e.Company);
        }
    }
}
