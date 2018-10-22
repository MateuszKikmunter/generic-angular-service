using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using GenericAngularService.Api.Data.Abstract;
using GenericAngularService.Api.Dtos.Company;
using GenericAngularService.Api.Entities;
using GenericAngularService.Api.Extensions;
using GenericAngularService.Api.Helpers.DataTablesServerSideHelpers;
using GenericAngularService.Api.Services.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace GenericAngularService.Api.Controllers
{
    [Route("api/companies")]
    public class CompaniesController : BaseController
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly IPropertyMappingService _propertyMappingService;

        public CompaniesController(IMapper mapper, ICompanyRepository companyRepository, IPropertyMappingService propertyMappingService) : base(mapper)
        {
            _companyRepository = companyRepository;
            _propertyMappingService = propertyMappingService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCompanies()
        {
            var companies = await _companyRepository.GetAllAsync();
            return Ok(_mapper.Map<List<CompanyDto>>(companies));
        }

        [HttpPost]
        [Route("GetTableData")]
        public IActionResult GetCompanies([FromBody] DataTablesOptions options)
        {
            var mappings = _propertyMappingService.GetMappings<Company, CompanyDto>();
            var companies = _companyRepository.GetCompanies()
                .ApplySearch(options, mappings)
                .ApplySort(options, mappings)
                .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
                .ToPagedList(options);

            return DataTablesResult(companies);
        }

        [HttpGet("{id}", Name = "GetCompany")]
        public async Task<IActionResult> GetCompany(int id)
        {
            var company = await _companyRepository.GetSingleAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            var result = _mapper.Map<CompanyDto>(company);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var companyToDelete = await _companyRepository.GetSingleAsync(id);
            if (companyToDelete == null)
            {
                return NotFound();
            }

            await _companyRepository.DeleteAsync(companyToDelete);
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CompanyForManipulationDto company)
        {
            if (company == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState.GetValidationErrors());
            }

            var companyToAdd = _mapper.Map<Company>(company);

            await _companyRepository.AddAsync(companyToAdd);
            return CreatedAtRoute("GetCompany", companyToAdd, new { id = companyToAdd.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CompanyForManipulationDto company)
        {
            var companyToUpdate = await _companyRepository.GetSingleAsync(id);
            if (companyToUpdate == null)
            {
                return NotFound();
            }

            if (company == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState.GetValidationErrors());
            }

            _mapper.Map(company, companyToUpdate);
            await _companyRepository.UpdateAsync(companyToUpdate);

            return Ok();
        }
    }
}
