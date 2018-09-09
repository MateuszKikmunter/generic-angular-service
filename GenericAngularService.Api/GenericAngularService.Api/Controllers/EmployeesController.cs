using AutoMapper;
using GenericAngularService.Api.Data.Abstract;
using GenericAngularService.Api.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using GenericAngularService.Api.Entities;

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
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeeForCreationDto employee)
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
        public async Task<IActionResult> Update(int id, [FromBody] EmployeeForUpdateDto employee)
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
