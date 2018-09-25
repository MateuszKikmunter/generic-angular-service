using AutoMapper;
using GenericAngularService.Api.Dtos.Company;
using GenericAngularService.Api.Dtos.Employee;
using GenericAngularService.Api.Entities;

namespace GenericAngularService.Api.Config
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Employee, EmployeeDto>().ForMember(e => e.Company, opts => opts.MapFrom(e => e.Company.Name));
            CreateMap<EmployeeForManipulationDto, Employee>();

            CreateMap<Company, CompanyDto>();
            CreateMap<CompanyForManipulationDto, Company>();
        }
    }
}
