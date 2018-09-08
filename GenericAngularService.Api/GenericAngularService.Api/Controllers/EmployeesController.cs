using AutoMapper;
using GenericAngularService.Api.Data.Abstract;
using GenericAngularService.Api.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GenericAngularService.Api.Controllers
{
    [Route("api/employees")]
    public class EmployeesController : BaseController
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeesController(IMapper mapper, IEmployeeRepository employeeRepository) : base(mapper)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await _employeeRepository.GetAllWithDependenciesAsync();
            var result = _mapper.Map<List<EmployeeDto>>(employees);
            return Ok(result);
        }
    }
}
