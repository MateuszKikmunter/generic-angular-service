using AutoMapper;
using GenericAngularService.Api.Dtos.Company;
using GenericAngularService.Api.Dtos.Employee;
using GenericAngularService.Api.Entities;

namespace GenericAngularService.Api.Helpers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Employee, EmployeeDto>().ForMember(e => e.Company, opts => opts.MapFrom(e => e.Company.Name));
            CreateMap<EmployeeForCreationDto, Employee>();
            CreateMap<EmployeeForUpdateDto, Employee>();

            CreateMap<Company, CompanyDto>();
            CreateMap<CompanyForManipulationDto, Company>();
        }
    }
}
