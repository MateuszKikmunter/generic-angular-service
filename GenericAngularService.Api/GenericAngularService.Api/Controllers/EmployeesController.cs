using AutoMapper;
using GenericAngularService.Api.Data.Abstract;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using GenericAngularService.Api.Dtos.Employee;
using GenericAngularService.Api.Entities;
using GenericAngularService.Api.Extensions;
using GenericAngularService.Api.Helpers.DataTablesServerSideHelpers;
using GenericAngularService.Api.Services.Abstract;

namespace GenericAngularService.Api.Controllers
{
    [Route("api/employees")]
    public class EmployeesController : BaseController
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IPropertyMappingService _propertyMappingService;

        public EmployeesController(IMapper mapper, IEmployeeRepository employeeRepository, IPropertyMappingService propertyMappingService) : base(mapper)
        {
            _employeeRepository = employeeRepository;
            _propertyMappingService = propertyMappingService;
        }

        [HttpPost]
        [Route("GetTableData")]
        public IActionResult GetEmployees([FromBody] DataTablesOptions model)
        {
            var propertyMappings = _propertyMappingService.GetMappings<Employee, EmployeeDto>();
            var employees = _employeeRepository.GetEmployees()
             //   .ApplySearch(model)
                .ApplySort(model, propertyMappings)
                .ProjectTo<EmployeeDto>(_mapper.ConfigurationProvider)
                .ToPagedList(model);

            return DataTablesResult(employees);
        }

        [HttpGet("{id}", Name = "GetEmployee")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employee = await _employeeRepository.GetSingleAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            var result = _mapper.Map<EmployeeDto>(employee);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var employeeToDelete = await _employeeRepository.GetSingleAsync(id);
            if (employeeToDelete == null)
            {
                return NotFound();
            }

            await _employeeRepository.DeleteAsync(employeeToDelete);
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeeForManipulationDto employee)
        {
            if (employee == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                BadRequest(ModelState);
            }

            var employeeToAdd = _mapper.Map<Employee>(employee);

            await _employeeRepository.AddAsync(employeeToAdd);
            return CreatedAtRoute("GetEmployee", employeeToAdd, new { id = employeeToAdd.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] EmployeeForManipulationDto employee)
        {
            var employeeToUpdate = await _employeeRepository.GetSingleAsync(id);
            if (employeeToUpdate == null)
            {
                return NotFound();
            }

            if (employee == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _mapper.Map(employee, employeeToUpdate);
            await _employeeRepository.UpdateAsync(employeeToUpdate);

            return Ok();
        }
    }
}
